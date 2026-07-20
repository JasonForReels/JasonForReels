import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  const models = ["gemini-3.1-flash-lite", "gemini-flash-latest"];
  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: "Find the most recent tweets from the Twitter user @jasonforreels and return just the numerical IDs of their 5 most recent tweets as a JSON array of strings. Do not return anything else.",
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      console.log(`${model}:`, response.text);
    } catch (err) {
      console.error(`${model} error:`, err.message);
    }
  }
}
run();
