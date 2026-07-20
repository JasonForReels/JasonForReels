import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Search for the most recent tweets from the Twitter user @jasonforreels and return just the numerical IDs of their 5 most recent tweets as a JSON array of strings.",
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    console.log("gemini-2.0-flash:", response.text);
  } catch (err) {
    console.error("gemini-2.0-flash error:", err.message);
  }
}
run();
