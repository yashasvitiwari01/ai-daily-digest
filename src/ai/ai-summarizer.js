import axios from "axios";
import { AI_MODEL, getGeminiApiKey } from "../utils/config.js";
import { logger } from "../utils/logger.js";

/**
 * Summarizes news content using Google Gemini API
 * @param {string} content - The news content to summarize
 * @returns {Promise<string>} The AI-generated summary
 * @throws {Error} If API call fails
 */
export async function summarizeWithGemini(content) {
  try {
    const apiKey = getGeminiApiKey();

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/${AI_MODEL}:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are an AI expert.

From the following news headlines:
${content}

Do:
1. Filter only important AI/tech news
2. Group into categories:
   - Breaking News
   - Tools
   - Research & Trends
   - Must Read
3. Summarize each in 1-2 lines
4. Give links to read article further
5. Give "Top 3 insights"
6. Format as a clean LinkedIn post:
   - Engaging hook
   - Emojis
   - Clean spacing
   - Professional tone
   - End with a question + hashtags

Keep it concise and engaging.
              `
              }
            ]
          }
        ]
      }
    );

    return response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (err) {
    logger.error(
      `Failed to generate summary: ${
        err.response?.data?.error?.message || err.message
      }`
    );
    throw err;
  }
}