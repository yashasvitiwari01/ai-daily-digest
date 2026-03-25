import { fetchNews } from "./services/rss-service.js";
import { deduplicateArticles } from "./services/dedup-service.js";
import { rankArticles } from "./services/ranking-service.js";
import { summarizeWithGemini } from "./ai/ai-summarizer.js";
import { RANKING } from "./utils/config.js";
import { logger } from "./utils/logger.js";

/**
 * Main orchestration function that fetches, processes, and summarizes news
 */
async function main() {
  try {
    let articles = await fetchNews();

    if (!articles || articles.length === 0) {
      logger.warn("No news available. Using fallback.");

      const fallbackContent = "Give a short AI trends update for today.";

      try {
        const summary = await summarizeWithGemini(fallbackContent);
        logger.info("🧠 AI Daily Digest:");
        console.log(summary);
      } catch (err) {
        logger.error(`Fallback summary failed: ${err.message}`);
      }
      return;
    }

    // Deduplicate articles
    articles = deduplicateArticles(articles);
    logger.info(`After deduplication: ${articles.length} articles`);

    // Rank by relevance
    const ranked = rankArticles(articles);
    logger.info(`Ranked by relevance: ${ranked.length} articles`);

    // Split into top and secondary articles
    const topArticles = ranked.slice(0, RANKING.TOP_ARTICLES_COUNT);
    const otherArticles = ranked.slice(
      RANKING.TOP_ARTICLES_COUNT,
      RANKING.SECONDARY_ARTICLES_COUNT
    );

    // Build structured content for summarization
    const content = `
🔥 MOST IMPORTANT NEWS:
${topArticles.map(a => `- ${a.title}`).join("\n")}

📰 OTHER NEWS:
${otherArticles.map(a => `- ${a.title}`).join("\n")}
`;

    logger.info("Generating AI summary...");

    const summary = await summarizeWithGemini(content);

    logger.success("🧠 AI Daily Digest:");
    console.log(summary);
  } catch (err) {
    logger.error(`Main process failed: ${err.message}`);
    process.exit(1);
  }
}

main();