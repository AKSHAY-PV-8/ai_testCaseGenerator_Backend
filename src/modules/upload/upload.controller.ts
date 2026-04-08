import type { Request, Response } from "express";
import { pool } from "../../config/db.js";
import { extractFunctions } from "../../utils/etractFunctions.js";
import { generateTestCases } from "../ai/ai.service.js";

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const dataStored = await pool.query(
      "INSERT INTO uploads (filename, filepath) VALUES ($1, $2) RETURNING *",
      [file.filename, file.path]
    )

    const functions = await extractFunctions(file.path);
    const testCode = await generateTestCases(functions);

    console.log("functions", functions);
    console.log("testCases", testCode);

    res.json({
      message: "File uploaded successfully",
      data: dataStored.rows[0]
      
    })
  } catch (error) {
    res.status(500).json({ message: "Upload failed" });
  }
}