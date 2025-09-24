import { body } from "express-validator";

export const createOfferValidator = [
  body("name").notEmpty().withMessage("Offer name is required"),
  body("value_props")
    .isArray({ min: 1 })
    .withMessage("value_props must be an array with at least 1 item"),
  body("ideal_use_cases")
    .isArray({ min: 1 })
    .withMessage("ideal_use_cases must be an array with at least 1 item"),
];
