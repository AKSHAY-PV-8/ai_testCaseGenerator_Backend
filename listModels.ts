import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

async function test() {
    const result = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: "Say hello" }],
        max_tokens: 10,
    });
    console.log("✅ Groq works:", result.choices[0]?.message?.content);
}

test().catch(err => console.error("❌ Groq failed:", err.message));

// import { GoogleGenAI } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// export const generateTestCases = async (functions: any[]): Promise<string> => {
//     try {
//         const prompt = `
// You are a Jest expert.

// Generate Jest test cases.

// Rules:
// - Include edge cases
// - Include invalid inputs
// - Use describe/test
// - Return only code

// Functions:
// ${JSON.stringify(functions.slice(0, 3), null, 2)}
// `;

//         const response = await ai.models.generateContent({
//             model: "gemini-2.0-flash-lite",  // ✅ use this
//             contents: prompt,
//         });

//         return response.text || "";

//     } catch (error: any) {
//         console.error("🔥 GEMINI ERROR:", error.message);
//         throw new Error(`Failed to generate test cases: ${error.message}`);
//     }
// };