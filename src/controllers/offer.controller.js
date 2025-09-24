import Offer from "../models/offer.model.js";

// Create a new offer in the database
export const createOffer = async (req, res) => {
  try {
    const { name, value_props, ideal_use_cases } = req.body;

    // Create a new offer in the database
    if (
      !name ||
      !Array.isArray(value_props) ||
      !Array.isArray(ideal_use_cases)
    ) {
      return res.status(400).json({ message: "Invalid offer data" });
    }

    // Insert new offer into MongoDB
    const newOffer = await Offer.create({
      name,
      value_props,
      ideal_use_cases,
    });

    // Return success response with the created offer
    return res
      .status(201)
      .json({ newOffer, message: "Offer created successfully", success: true });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch the latest offer from the database
export const getLatestOffer = async (req, res) => {
  try {
    const latestOffer = await Offer.findOne().sort({ createdAt: -1 });

    // Handle case when no offers exist
    if (!latestOffer) {
      return res.status(404).json({ message: "No offers found" });
    }

    // Return the latest offer
    res.status(200).json({
      latestOffer,
      success: true,
      message: "Latest offer fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching latest offer:", error);
    res.status(500).json({ message: "Server error" });
  }
};
