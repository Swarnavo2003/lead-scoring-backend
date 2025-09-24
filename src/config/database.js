import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log successful connection
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log any errors and exit the process
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

// Export the connectDB function for use in index.js
export default connectDB;
