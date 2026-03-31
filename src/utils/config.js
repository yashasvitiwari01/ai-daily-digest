import dotenv from "dotenv";

dotenv.config();

/**
 * RSS Feed URLs - sources for AI and tech news
 */
export const RSS_FEEDS = [
  // Major Tech News Outlets
  "https://feeds.bbci.co.uk/news/technology/rss.xml",
  "https://www.theverge.com/rss/index.xml",
  "https://techcrunch.com/feed/",
  "https://www.wired.com/feed/rss",
  "https://arstechnica.com/feed/",
  "https://feeds.feedburner.com/venturebeat/SZYF",
  "https://www.engadget.com/rss.xml",
  
  // AI Company Blogs
  "https://openai.com/blog/rss.xml",
  "https://deepmind.google/blog/feed.xml",
  "https://huggingface.co/blog/feed.xml",
  
  // Global Tech News
  "https://thewire.in/technology/feed", // India
  "https://www.cnbc.com/id/100003114/device/rss/rss.html", // Business/Tech
  "https://www.tomsguide.com/news/feed", // USA
  "https://feeds.bloomberg.com/markets/news.rss", // Business/Tech
  "https://feeds.reuters.com/reuters/technologyNews", // Global
  
  // Trending & Community
  "https://news.ycombinator.com/rss", // HackerNews - trending tech
  "https://www.reddit.com/r/MachineLearning/.rss", // ML Community
  "https://www.reddit.com/r/artificial/.rss", // AI Community
  "https://www.reddit.com/r/technology/.rss", // Tech Community
  
  // Google News AI/ML Feeds
  "https://news.google.com/rss/search?q=artificial+intelligence&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=AI+news",
  "https://news.google.com/rss/search?q=machine+learning",
  "https://news.google.com/rss/search?q=technology+startup",
  "https://news.google.com/rss/search?q=generative+AI",
  "https://news.google.com/rss/search?q=GPT+LLM",
  "https://news.google.com/rss/search?q=neural+network",
  
  // YouTube Tech Channels
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCVHFbqXqoYvEWM1Ddxl0QDg", // Lex Fridman
  
  // Podcasts
  "https://feeds.megaphone.fm/lexfridman", // Lex Fridman
  "https://feeds.simplecast.com/54nAGcIl", // AI-related
  "https://rss.art19.com/twist", // TWIST
  
  // Research & Academic
  "https://arxiv.org/list/cs.AI/recent.rss", // ArXiv AI Papers
  "https://arxiv.org/list/cs.LG/recent.rss", // ArXiv Machine Learning
  
  // Developer & Technical
  "https://github.blog/feed.xml", // GitHub Blog
  "https://www.infoq.com/feed/", // Software Development
  "https://www.hackernoon.com/feed", // HackerNoon
  
  // Startup & Innovation
  "https://www.producthunt.com/feed", // Product Hunt (new tech)
  "https://www.slashslot.io/latest/rss", // Startup news (if available)
  
  // International Tech News
  "https://www.ft.com/?format=rss", // Financial Times (Tech coverage)
  "https://www.zdnet.com/topic/artificial-intelligence/feed/", // ZDNet AI
  "https://www.infoworld.com/feed/", // InfoWorld Tech
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
export const AI_KEYWORDS = /openai|gemini|claude|groq|perplexity|gpt|mistral|llama|anthropic|copilot|hugging face|deepseek|xi-api|cortex|phi|davinci|codestral|neural|ai|artificial intelligence|machine learning|deep learning|neural network|transformer|llm|large language model/i;
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