import Lead from "../models/lead.model.js";
import Offer from "../models/offer.model.js";
import Result from "../models/result.model.js";
import { calculateRuleScore } from "../utils/scoring.js";
import client from "../utils/openai.js";
import { exportResultsToCSV } from "../utils/csv.js";

export const scoreLeads = async (req, res) => {
  try {
    const leads = await Lead.find();

    const offer = await Offer.findOne().sort({ createdAt: -1 });

    if (!offer) {
      return res
        .status(400)
        .json({ message: "No offer found to score against" });
    }

    const results = [];

    for (const lead of leads) {
      const ruleScore = calculateRuleScore(lead, offer);

      const prompt = `You are a saled assistant, Guven the following prospect and product data, analyze if the lead is intrested.
      
      Prospect Data:${JSON.stringify(lead)}
      Product Data:${JSON.stringify(offer)}

      Return a JSON: { "intent": "High/Medium/Low", "reasoning": "1-2 sentence explanation" }
      `;

      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      });

      let aiIntent = "Low";
      let aiPoints = 10;
      let resoning = "AI could not classify";

      try {
        let message = response.choices[0].message.content.trim();
        if (message.startsWith("```")) {
          message = message.replace(/```(json)?/g, "").trim();
        }

        const parsed = JSON.parse(message);

        aiIntent = parsed.intent || "Low";
        resoning = parsed.reasoning || resoning;

        if (aiIntent === "High") aiPoints = 50;
        else if (aiIntent === "Medium") aiPoints = 30;
        else aiPoints = 10;
      } catch (error) {
        console.error("AI parsing error:", error.message);
      }

      const finalScore = ruleScore + aiPoints;

      const result = await Result.create({
        lead,
        offer,
        intent: aiIntent,
        score: finalScore,
        reasoning: resoning,
      });

      results.push(result);
    }

    res.status(200).json({
      message: "Leads scored successfully",
      data: results,
      count: results.length,
      success: true,
    });
  } catch (error) {
    console.error("Error scoring leads:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .sort({ createdAt: -1 })
      .populate("lead offer");

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const exportResults = async (req, res) => {
  try {
    const results = await Result.find()
      .sort({ createdAt: -1 })
      .populate("lead offer");

    if (!results.length) {
      return res.status(404).json({ message: "No results found" });
    }

    const rows = results.map((r) => ({
      name: r.lead.name,
      role: r.lead.role,
      company: r.lead.company,
      industry: r.lead.industry,
      location: r.lead.location,
      linkedin_bio: r.lead.linkedin_bio,
      offer: r.offer.name,
      intent: r.intent,
      score: r.score,
      reasoning: r.reasoning,
    }));

    const csvString = exportResultsToCSV(rows);
    res.header("Content-Type", "text/csv");
    res.attachment("results.csv");
    return res.send(csvString);
  } catch (error) {
    console.error("Error exporting results:", error);
    res.status(500).json({ message: "Server error" });
  }
};
