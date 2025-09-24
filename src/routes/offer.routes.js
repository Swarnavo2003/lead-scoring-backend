import express from "express";
import {
  createOffer,
  getLatestOffer,
} from "../controllers/offer.controller.js";
import { createOfferValidator } from "../validations/offer.validators.js";
import validateRequest from "../middlewares/validateRequest.js";

const offerRouter = express.Router();

offerRouter.post("/", createOfferValidator, validateRequest, createOffer);
offerRouter.get("/latest", getLatestOffer);

export default offerRouter;
