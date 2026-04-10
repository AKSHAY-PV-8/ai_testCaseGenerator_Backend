import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";

export const runTestInSandbox = async (
  code: string,
  testCases: string
): Promise<string> => {
  return new Promise((resolve) => {
    const id = uuidv4();
    const dir = path.join("temp", id);

    fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(
      path.join(dir, "package.json"),
      JSON.stringify({
        name: "sandbox",
        version: "1.0.0",
        type: "commonjs",
        scripts: { test: "jest" },
      })
    );

    const exportableCode = code + "\n\nmodule.exports = { fun };";
    fs.writeFileSync(path.join(dir, "code.js"), exportableCode);

    const importLine = `const { fun } = require('./code');\n\n`;
    fs.writeFileSync(path.join(dir, "code.test.js"), importLine + testCases);

    const absoluteDir = path.resolve(dir);

    // ✅ Run Jest directly — no docker run needed
    // Render's Docker container already has Node 18
    const command = `cd "${absoluteDir}" && npm install jest --save-dev && npx jest --runInBand --json --outputFile=result.json || true`;

    exec(
      command,
      { timeout: 120000 },
      (error, stdout, stderr) => {
        console.log("🟢 STDOUT:", stdout);
        console.log("🔴 STDERR:", stderr);
        if (error) console.log("❌ Error:", error.message);

        const resultPath = path.join(dir, "result.json");

        if (!fs.existsSync(resultPath)) {
          return resolve(
            JSON.stringify({
              error: "Jest failed",
              stdout,
              stderr,
              note: "result.json not generated",
            })
          );
        }

        const result = fs.readFileSync(resultPath, "utf-8");
        fs.rmSync(dir, { recursive: true, force: true });
        resolve(result);
      }
    );
  });
};