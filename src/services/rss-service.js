import Parser from "rss-parser";
import { RSS_FEEDS } from "../utils/config.js";
import { logger } from "../utils/logger.js";

const parser = new Parser();

/**
 * Fetches news from all configured RSS feeds in parallel
 * @returns {Promise<Array>} Array of articles with title and link
 */
export async function fetchNews() {
  try {
    logger.info(`Fetching news from ${RSS_FEEDS.length} feeds...`);

    // Fetch all feeds in parallel
    const fetchPromises = RSS_FEEDS.map(url =>
      parser
        .parseURL(url)
        .then(feed =>
          feed.items.map(item => ({
            title: item.title || item.contentSnippet || "",
            link: item.link || ""
          }))
        )
        .catch(err => {
          logger.warn(`Skipped: ${url}`);
          return [];
        })
    );

    const results = await Promise.allSettled(fetchPromises);

    // Flatten results and filter out failures
    const articles = results
      .filter(r => r.status === "fulfilled" && r.value)
      .flatMap(r => r.value);

    const successCount = results.filter(r => r.status === "fulfilled").length;
    logger.success(
      `Fetched ${articles.length} articles from ${successCount}/${RSS_FEEDS.length} feeds`
    );

    return articles;
  } catch (err) {
    logger.error(`fetchNews failed: ${err.message}`);
    return [];
  }
}