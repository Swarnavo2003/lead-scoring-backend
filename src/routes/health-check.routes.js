import express from "express";
import { healthCheck } from "../controllers/health-check.controller.js";

const healthCheckRouter = express.Router();

healthCheckRouter.get("/", healthCheck);

export default healthCheckRouter;
