import { validationResult } from "express-validator";

// Middleware to handle validation errors from express-validator
const validateRequest = (req, res, next) => {
  // Get validation results from the request
  const errors = validationResult(req);

  // If errors exist, return a 400 response with details
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({
        field: e.param, // Field that failed validation
        message: e.msg, // Validation error message
      })),
    });
  }

  // If no errors, proceed to the next middleware/controller
  next();
};

export default validateRequest;
