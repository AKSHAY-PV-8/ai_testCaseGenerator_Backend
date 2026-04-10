import Groq from "groq-sdk";

export const generateTestCases = async (functions: any[]): Promise<string> => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

  try {
    const prompt = `
You are a Jest expert.
Generate Jest test cases for the following functions.

Rules:
- Include edge cases
- Include invalid inputs
- Use describe/test blocks
- Return ONLY the describe(...) block — no imports, no require statements, no module.exports
- The function will already be available in scope, do not import it
- Return only code, no markdown

Functions:
${JSON.stringify(functions.slice(0, 3), null, 2)}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2048,
    });

    let output = completion.choices[0]?.message?.content ?? "";

    // 🔥 CLEAN MARKDOWN
    output = output
      .replace(/```javascript/g, "")
      .replace(/```/g, "")
      .trim();

    if (!output.includes("describe")) {
      throw new Error("Invalid test cases generated");
    }

    return output;

  } catch (error: any) {
    console.error("GROQ ERROR:", error.message);
    throw new Error(`Failed to generate test cases: ${error.message}`);
  }
};