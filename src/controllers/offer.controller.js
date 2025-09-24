import Offer from "../models/offer.model.js";

export const createOffer = async (req, res) => {
  try {
    const { name, value_props, ideal_use_cases } = req.body;

    if (
      !name ||
      !Array.isArray(value_props) ||
      !Array.isArray(ideal_use_cases)
    ) {
      return res.status(400).json({ message: "Invalid offer data" });
    }

    const newOffer = await Offer.create({
      name,
      value_props,
      ideal_use_cases,
    });
    return res
      .status(201)
      .json({ newOffer, message: "Offer created successfully", success: true });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLatestOffer = async (req, res) => {
  try {
    const latestOffer = await Offer.findOne().sort({ createdAt: -1 });
    if (!latestOffer) {
      return res.status(404).json({ message: "No offers found" });
    }

    res
      .status(200)
      .json({
        latestOffer,
        success: true,
        message: "Latest offer fetched successfully",
      });
  } catch (error) {
    console.error("Error fetching latest offer:", error);
    res.status(500).json({ message: "Server error" });
  }
};
