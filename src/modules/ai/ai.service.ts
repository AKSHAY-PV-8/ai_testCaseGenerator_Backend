import { openai } from "../../config/openai.js";

export const generateTestCases = async (functions: any[]) => {
    const prompt = `
    Generate Jest test cases for the following functions.
    
    Rules: 
    -Include edge cases
    -Include invalid inputs
    -Use describe/test
    -Return only code
    
    Functions:
    ${JSON.stringify(functions, null, 2)}`;

    const aiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {role: "system", content: "You are a Jest expert."},
            {role: "user", content: prompt},
        ],
        temperature: 0.3,
    });

    return aiResponse.choices[0]?.message.content;
}