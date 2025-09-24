import express from "express";
import upload from "../config/multer.js";
import { getLeads, uploadLeads } from "../controllers/lead.controller.js";

const leadRouter = express.Router();

leadRouter.post("/upload", upload.single("file"), uploadLeads);
leadRouter.get("/", getLeads);

export default leadRouter;
