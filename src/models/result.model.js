import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    intent: { type: String, enum: ["High", "Medium", "Low"], required: true },
    score: { type: Number, required: true },
    reasoning: { type: String, required: true },
  },
  { timestamps: true },
);

const Result = mongoose.model("Result", ResultSchema);
export default Result;
