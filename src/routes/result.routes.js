import express from "express";
import { getResults, scoreLeads } from "../controllers/result.controller.js";

const resultRouter = express.Router();

resultRouter.post("/score-leads", scoreLeads);
resultRouter.get("/", getResults);

export default resultRouter;
