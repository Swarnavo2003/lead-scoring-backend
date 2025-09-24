import express from "express";
import {
  exportResults,
  getResults,
  scoreLeads,
} from "../controllers/result.controller.js";

const resultRouter = express.Router();

resultRouter.post("/score", scoreLeads);
resultRouter.get("/", getResults);
resultRouter.get("/export/csv", exportResults);

export default resultRouter;
