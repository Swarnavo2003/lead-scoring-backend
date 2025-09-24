import fs from "fs";
import Lead from "../models/lead.model.js";
import { parseCSV } from "../utils/csv.js";

export const uploadLeads = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    const rows = await parseCSV(filePath);
    console.log(rows);

    const leads = rows.map((r) => ({
      name: r.name?.trim() || "",
      role: r.role?.trim() || "",
      company: r.company?.trim() || "",
      industry: r.industry?.trim() || "",
      location: r.location?.trim() || "",
      linkedin_bio: r.linkedin_bio?.trim() || "",
    }));
    console.log(leads);

    const inserted = await Lead.insertMany(leads);

    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting CSV file:", err);
    });

    return res.status(201).json({
      message: "Leads uploaded successfully",
      insertedCount: inserted.length,
    });
  } catch (error) {
    console.error("Error uploading leads:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Leads fetched successfully",
      data: leads,
      count: leads.length,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({ message: "Server error" });
  }
};
