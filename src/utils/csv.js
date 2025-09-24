import fs from "fs";
import csv from "csv-parser";

export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", () => resolve(rows))
      .on("error", (error) => reject(error));
  });
};

export const exportResultsToCSV = (rows) => {
  if (!rows.length) return "";

  const headers = Object.keys(rows[0]);
  const escape = (str) => `"${String(str).replace(/"/g, '""')}"`;

  const csvString = [
    headers.join(","),
    ...rows.map((row) => headers.map((h) => escape(row[h])).join(",")),
  ].join("\n");

  return csvString;
};
