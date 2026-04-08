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
- Return only the code, no explanation

Functions:
${JSON.stringify(functions.slice(0, 3), null, 2)}
`;
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 2048,
        });

        return completion.choices[0]?.message?.content ?? "";

    } catch (error: any) {
        console.error("GROQ ERROR:", error.message);
        throw new Error(`Failed to generate test cases: ${error.message}`);
    }
};