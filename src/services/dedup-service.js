/**
 * Removes duplicate articles based on title
 * @param {Array} articles - Articles to deduplicate
 * @returns {Array} Filtered array with unique articles
 */
export function deduplicateArticles(articles) {
  const seen = new Set();

  return articles.filter(article => {
    const key = article.title.toLowerCase().trim();

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
}
