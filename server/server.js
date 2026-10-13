
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...history.map((msg) => ({
          role: msg.role === "ai" ? "model" : "user",
          parts: [{ text: msg.text }],
        })),
        {
          role: "user",
          parts: [{ text: message }],
        },  
      ],
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API error:", error.message);

    res.status(500).json({
      error: "Unable to get a response. Please try again.",
    });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
