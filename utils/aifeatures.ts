import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  throw new Error("GROQ_API_KEY is not set in .env");
}

const groqClient = axios.create({
  baseURL: "https://api.groq.com/openai/v1",
  headers: {
    Authorization: `Bearer ${GROQ_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export async function suggestPriority(description: any) {
  const prompt = `Classify the priority (low, medium, high) for this task:\n${description}\nReturn only one word.`;

  try {
    const res = await groqClient.post("/chat/completions", {
      model: "llama-3.1-8b-instant", 
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    });

    const result = res.data.choices[0].message.content.trim().toLowerCase();
    console.log("Priority:", result);
    return result;

  } catch (err: any) {
    console.error("AI Error:", err.response?.data || err.message);
    throw new Error("AI priority generation failed");
  }
}

export async function generateSummary(description: any) {
  const prompt = `Summarize this task in one short sentence:\n${description}`;

  try {
    const res = await groqClient.post("/chat/completions", {
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    const result = res.data.choices[0].message.content.trim();
    console.log("Summary:", result);
    return result;

  } catch (err: any) {
    console.error("AI Error:", err.response?.data || err.message);
    throw new Error("AI summary generation failed");
  }
}