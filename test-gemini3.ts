import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  const modelsToTest = ["gemini-1.5-pro", "gemini-1.5-pro-latest", "gemini-1.5-flash"];
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
