import fs from "fs";
import Lead from "../models/lead.model.js";
import { parseCSV } from "../utils/csv.js";

// Upload CSV file and save leads to DB
export const uploadLeads = async (req, res) => {
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    // Parse CSV to JSON
    const rows = await parseCSV(filePath);

    // Map CSV rows to Lead schema
    const leads = rows.map((r) => ({
      name: r.name?.trim() || "",
      role: r.role?.trim() || "",
      company: r.company?.trim() || "",
      industry: r.industry?.trim() || "",
      location: r.location?.trim() || "",
      linkedin_bio: r.linkedin_bio?.trim() || "",
    }));

    // Insert leads into MongoDB
    const inserted = await Lead.insertMany(leads);

    // Delete uploaded CSV after processing
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting CSV file:", err);
    });

    // Return success response
    return res.status(201).json({
      message: "Leads uploaded successfully",
      insertedCount: inserted.length,
    });
  } catch (error) {
    console.error("Error uploading leads:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch all leads from DB
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });

    // Return leads as JSON
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
