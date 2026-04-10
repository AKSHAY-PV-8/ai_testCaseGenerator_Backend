import fs from "fs";
import type { Request, Response } from "express";
import { pool } from "../../config/db.js";

import { parseToAST } from "../../utils/parseToAST.js";
import { extractFunctions } from "../../utils/etractFunctions.js";

import { generateTestCases } from "../ai/ai.service.js";
import { parseJestResult } from "../../utils/parseJestResult.js";
import { runTestInSandbox } from "../sandbox/sandbox.Service.js";

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

    const code = fs.readFileSync(file.path, "utf-8");

    const AST = parseToAST(file.path);
    const functions = extractFunctions(AST);

    if (!functions.length) {
      return res.status(400).json({ message: "No functions found" });
    }

    const testCases = await generateTestCases(functions);

    const rawResult = await runTestInSandbox(code, testCases);

    const parsedResult = parseJestResult(rawResult);

    return res.json({
      message: "Success",
      testCases,
      result: parsedResult,
      debug: rawResult 
    });

  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: "Error",
      error: error.message
    });
  }
};