import type { Request, Response } from "express";
import { pool } from "../../config/db.js";
import { parseToAST } from "../../utils/parseToAST.js";
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
    );

    const AST = parseToAST(file.path);
    const functions = extractFunctions(AST);

    if (!functions || functions.length === 0) {
      return res.status(400).json({
        message: "No functions found in the uploaded file",
        data: dataStored.rows[0],
      });
    }

    const testCases = await generateTestCases(functions);

    return res.status(200).json({
      message: "File uploaded and test cases generated successfully",
      data: dataStored.rows[0],
      testCases,
    });

  } catch (error: any) {
    console.error("Upload error:", error.message);
    return res.status(500).json({
      message: "Upload failed",
      error: error.message,
    });
  }
};