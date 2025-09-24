import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    industry: { type: String, required: true },
    location: { type: String, required: true },
    linkedin_bio: { type: String, required: true },
  },
  { timestamps: true },
);

const Lead = mongoose.model("Lead", LeadSchema);
export default Lead;
