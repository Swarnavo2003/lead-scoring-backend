import express from "express";
import {
  createOffer,
  getLatestOffer,
} from "../controllers/offer.controller.js";

const offerRouter = express.Router();

offerRouter.post("/", createOffer);
offerRouter.get("/latest", getLatestOffer);

export default offerRouter;
