import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  const models = await ai.models.list();
  const modelsToTest = [];
  for await (const model of models) {
    if (model.name.includes("flash")) modelsToTest.push(model.name.replace("models/", ""));
  }
  console.log(modelsToTest);
}
run();
