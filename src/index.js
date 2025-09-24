import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import offerRouter from "./routes/offer.routes.js";
import leadRouter from "./routes/lead.routes.js";
dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/offers", offerRouter);
app.use("/api/v1/leads", leadRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
