import dotenv from "dotenv";

dotenv.config();

/**
 * RSS Feed URLs - sources for AI and tech news
 */
export const RSS_FEEDS = [
  "https://feeds.bbci.co.uk/news/technology/rss.xml",
  "https://www.theverge.com/rss/index.xml",
  "https://openai.com/blog/rss.xml",
  "https://techcrunch.com/feed/",
  "https://www.wired.com/feed/rss",
  "https://arstechnica.com/feed/",
  "https://feeds.feedburner.com/venturebeat/SZYF",
  "https://www.engadget.com/rss.xml",
  "https://thewire.in/technology/feed",
  "https://news.google.com/rss/search?q=artificial+intelligence&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=AI+tools",
  "https://news.google.com/rss/search?q=machine+learning",
  "https://news.google.com/rss/search?q=technology+startup",
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCVHFbqXqoYvEWM1Ddxl0QDg",
  "https://feeds.megaphone.fm/lexfridman",
  "https://feeds.simplecast.com/54nAGcIl",
  "https://rss.art19.com/twist"
];

/**
 * Article ranking configuration
 */
export const RANKING = {
  TOP_ARTICLES_COUNT: 5,
  SECONDARY_ARTICLES_COUNT: 20,
  AI_KEYWORD_BOOST: 3,
  ANNOUNCEMENT_BOOST: 2,
  RESEARCH_BOOST: 1
};

/**
 * Keyword patterns for article ranking
 */
export const AI_KEYWORDS = /openai|gemini|claude|groq|antigravity|perplexity|gpt|google|ai|artificial intelligence|llm/i;
export const ANNOUNCEMENT_KEYWORDS = /launch|release|announce|breaking/i;
export const RESEARCH_KEYWORDS = /research|study|paper/i;

/**
 * Validates that required environment variables are present
 * @throws {Error} If GEMINI_API_KEY is not set
 */
export function validateEnv() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY environment variable is not set. Please configure it in your .env file."
    );
  }
  return apiKey;
}

/**
 * Gets the Gemini API key from environment
 * @returns {string} The API key
 * @throws {Error} If API key is not configured
 */
export function getGeminiApiKey() {
  return validateEnv();
}

export const AI_MODEL = "gemini-2.5-flash";