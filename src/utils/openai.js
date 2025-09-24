import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ quiet: true });

// Create a new OpenAI client instance using your API key
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Must be set in .env
});

// Export the client instance for use in controllers
export default client;
