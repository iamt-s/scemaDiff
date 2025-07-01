import dotenv from "dotenv";
import {Ollama} from "ollama-node";
dotenv.config();
 const ollama =new Ollama();
  ollama.setModel("llama2");

export async function summarizeDiff(diff: string): Promise<string> {
  const prompt = `
You are a GraphQL expert. Given the following schema diff, classify the changes as breaking or non-breaking. For each change explain briefly why.

DIFF:
${diff}

Please return your answer in this format:

BREAKING CHANGES:
- ...

NON-BREAKING CHANGES:
- ...
  `;

//   const completion = await openai.chat.completions.create({
//     model: "gpt-4o",  // Or "gpt-4"
//     messages: [
//       { role: "system", content: "You are an expert GraphQL API reviewer." },
//       { role: "user", content: prompt }
//     ],
//     temperature: 0
//   });

 const response = await ollama.generate(prompt);
  return response.output ?? ""; // Ensure a string is always returned
}
