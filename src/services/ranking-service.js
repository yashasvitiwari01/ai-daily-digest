import {
  AI_KEYWORDS,
  ANNOUNCEMENT_KEYWORDS,
  RESEARCH_KEYWORDS,
  RANKING
} from "../utils/config.js";

/**
 * Ranks articles by relevance using keyword boosting
 * @param {Array} articles - Articles to rank
 * @returns {Array} Ranked articles with scores
 */
export function rankArticles(articles) {
  return articles
    .map(article => {
      let score = 0;
      const title = article.title.toLowerCase();

      // Keyword boost
      if (AI_KEYWORDS.test(title)) score += RANKING.AI_KEYWORD_BOOST;
      if (ANNOUNCEMENT_KEYWORDS.test(title)) score += RANKING.ANNOUNCEMENT_BOOST;
      if (RESEARCH_KEYWORDS.test(title)) score += RANKING.RESEARCH_BOOST;

      return { ...article, score };
    })
    .sort((a, b) => b.score - a.score);
}
