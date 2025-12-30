import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/hint", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a competitive programming mentor." },
        { role: "user", content: prompt }
      ],
      temperature: 0.4
    });

    res.json({
      hint: response.choices[0].message.content
    });
  } catch (err) {
    res.status(500).json({ error: "LLM error" });
  }
});

app.listen(3001, () => {
  console.log("HintYAI backend running on http://localhost:3001");
});
