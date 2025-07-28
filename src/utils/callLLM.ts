import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function callLLM(diff: string): Promise<string> {
  const prompt = `
You are a GraphQL expert. Given the following schema diff, classify the changes as breaking or non-breaking. For each change explain briefly why. also fomrat the output in markdown format with appropriate headings.

DIFF:
${diff}

Please return your answer in this format:

BREAKING CHANGES:
- ...

NON-BREAKING CHANGES:
- ...
Please provide Jest test stubs for the schema changes, and format your response as a TypeScript code block.
`;

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    // Gemini returns the result in response.data.candidates[0].content.parts[0].text
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini";
  } catch (error: any) {
    console.error('Gemini API call failed:', error?.response?.data || error?.message || error);
    throw new Error('Gemini API call failed: ' + (error?.response?.data?.error?.message || error?.message || error));
  }
}