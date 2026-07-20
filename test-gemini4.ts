import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  const modelsToTest = ["gemini-flash-latest", "gemini-3.1-flash-lite", "gemini-2.0-flash-lite"];
  for (const model of modelsToTest) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: "Hello",
      });
      console.log(`${model}:`, response.text);
    } catch (err) {
      console.error(`${model} error:`, err.message);
    }
  }
}
run();
