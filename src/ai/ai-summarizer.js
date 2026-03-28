import axios from "axios";
import { AI_MODEL, getGeminiApiKey } from "../utils/config.js";
import { logger } from "../utils/logger.js";

/**
 * Summarizes news content into structured JSON for multi-channel use
 * @param {string} content
 * @returns {Promise<Object>} structured data
 */
export async function summarizeWithGemini(content) {
  try {
    const apiKey = getGeminiApiKey();

    const prompt = `
You are an AI news curator.

From the following news headlines:
${content}

Return ONLY valid JSON (no markdown, no explanation).

Format:
{
  "headline": "short exciting title",
  "breaking": [
    { "title": "", "summary": "", "link": "" }
  ],
  "tools": [
    { "title": "", "summary": "", "link": "" }
  ],
  "trends": [
    { "title": "", "summary": "", "link": "" }
  ],
  "must_read": [
    { "title": "", "summary": "", "link": "" }
  ],
  "insights": [
    "insight 1",
    "insight 2",
    "insight 3"
  ]
}

Rules:
- Keep summaries 1 line
- Pick only important AI/tech news
- Max 5 items per section
- Insights must be sharp and meaningful
- If link not available, return empty string
- Output MUST be valid JSON
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/${AI_MODEL}:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      }
    );

    const rawText =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // 🧠 Clean response (Gemini sometimes wraps JSON in ```json)
    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch (parseErr) {
      logger.error("❌ JSON parse failed. Raw response:");
      console.log(cleaned);
      throw new Error("Invalid JSON from Gemini");
    }
  } catch (err) {
    logger.error(
      `Failed to generate summary: ${
        err.response?.data?.error?.message || err.message
      }`
    );
    throw err;
  }
}