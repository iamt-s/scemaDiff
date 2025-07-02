import dotenv from "dotenv";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({apiKey: "AIzaSyArtrtopQShoclZZ3tpblLUdvrh_zdSGJA"});

dotenv.config();
  

export async function callLLM(diff: string): Promise<string> {
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
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
  if (!response.text) {
      throw new Error("Gemini API did not return a response text.");
    }
    return response.text;
  } catch (error: any) {
    console.error('Gemini API call failed:', error?.response?.data || error?.message || error);
    throw new Error('Gemini API call failed: ' + (error?.response?.data?.error || error?.message || error));
  }
}
   