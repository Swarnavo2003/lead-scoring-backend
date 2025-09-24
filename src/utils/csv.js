import fs from "fs";
import csv from "csv-parser";

// Function to parse a CSV file and return an array of objects
export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    // Read the CSV file as a stream
    fs.createReadStream(filePath)
      .pipe(csv()) // Parse CSV
      .on("data", (data) => rows.push(data)) // Push each row to array
      .on("end", () => resolve(rows)) // Resolve promise when done
      .on("error", (error) => reject(error)); // Reject promise on error
  });
};

// Function to convert an array of objects to CSV string
export const exportResultsToCSV = (rows) => {
  if (!rows.length) return ""; // Return empty string if no data

  const headers = Object.keys(rows[0]); // Extract headers from first row
  const escape = (str) => `"${String(str).replace(/"/g, '""')}"`; // Escape quotes

  // Build CSV string: headers + rows
  const csvString = [
    headers.join(","), // First line: headers
    ...rows.map(
      (row) => headers.map((h) => escape(row[h])).join(","), // Map each row to CSV format
    ),
  ].join("\n");

  return csvString;
};
