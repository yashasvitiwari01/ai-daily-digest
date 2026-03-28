import dotenv from "dotenv";
import { fetchNews } from "./services/rss-service.js";
import { deduplicateArticles } from "./services/dedup-service.js";
import { rankArticles } from "./services/ranking-service.js";
import { summarizeWithGemini } from "./ai/ai-summarizer.js";
import { RANKING } from "./utils/config.js";
import { logger } from "./utils/logger.js";
import { sendMessage, bot } from "./services/telegram-bot.js";
import { sendEmail } from "./services/email-service.js";
import { buildEmailTemplate } from "./utils/email-template.js";

dotenv.config();

/**
 * Format Telegram message from structured data
 */
function formatTelegramMessage(data) {
  return `
🤖 ${data.headline}

⚡ *Breaking News*
${data.breaking.map(i => `• ${i.title}`).join("\n")}

🛠️ *Tools*
${data.tools.map(i => `• ${i.title}`).join("\n")}

📈 *Trends*
${data.trends.map(i => `• ${i.title}`).join("\n")}

📚 *Must Read*
${data.must_read.map(i => `• ${i.title}`).join("\n")}

💡 *Top Insights*
${data.insights.map(i => `• ${i}`).join("\n")}
`;
}

/**
 * Main orchestration function
 */
async function main() {
  try {
    let articles = await fetchNews();

    if (!articles || articles.length === 0) {
      logger.warn("No news available. Using fallback.");

      const fallbackContent = "Give a short AI trends update for today.";

      const structured = await summarizeWithGemini(fallbackContent);

      console.log('structured', structured);
      const telegramMsg = formatTelegramMessage(structured);
      const emailHtml = buildEmailTemplate(structured);

      let telegramSuccess = false;
      let emailSuccess = false;

      // Try sending Telegram
      try {
        await sendMessage(telegramMsg);
        telegramSuccess = true;
        logger.success("Telegram message sent ✅");
      } catch (err) {
        logger.error(`Telegram failed: ${err.message}`);
      }

      // Try sending Email
      const subject =
        typeof structured.headline === "string"
          ? structured.headline
          : "🤖 AI Daily Digest";

      try {
        await sendEmail({
          subject: subject,
          html: emailHtml
        });
        emailSuccess = true;
        logger.success("Email sent ✅");
      } catch (err) {
        logger.error(`Email failed: ${err.message}`);
      }

      // Log final status
      if (telegramSuccess && emailSuccess) {
        logger.success("✅ Digest sent via Telegram + Email");
      } else if (telegramSuccess && !emailSuccess) {
        logger.warn("⚠️ Digest sent via Telegram only (Email failed)");
      } else if (!telegramSuccess && emailSuccess) {
        logger.warn("⚠️ Digest sent via Email only (Telegram failed)");
      } else {
        logger.error("❌ Failed to send digest via both channels");
      }

      return;
    }

    // Deduplicate
    articles = deduplicateArticles(articles);

    // Rank
    const ranked = rankArticles(articles);
    logger.info(`Ranked by relevance: ${ranked.length} articles`);

    const topArticles = ranked.slice(0, RANKING.TOP_ARTICLES_COUNT);
    const otherArticles = ranked.slice(
      RANKING.TOP_ARTICLES_COUNT,
      RANKING.SECONDARY_ARTICLES_COUNT
    );

    const content = `
🔥 MOST IMPORTANT NEWS:
${topArticles.map(a => `- ${a.title}`).join("\n")}

📰 OTHER NEWS:
${otherArticles.map(a => `- ${a.title}`).join("\n")}
`;

    logger.info("Generating AI summary...");

    const structured = await summarizeWithGemini(content);

    if (!structured.headline) {
      throw new Error("Invalid AI response structure");
    }

    // ✅ Format outputs
    const telegramMsg = formatTelegramMessage(structured);
    const emailHtml = buildEmailTemplate(structured);

    let telegramSuccess = false;
    let emailSuccess = false;

    // Try sending Email
    const subject =
      typeof structured.headline === "string"
        ? structured.headline
        : "🤖 AI Daily Digest";

    try {
      await sendEmail({
        subject: subject,
        html: emailHtml
      });
      emailSuccess = true;
      logger.success("Email sent ✅");
    } catch (err) {
      logger.error(`Email failed: ${err.message}`);
    }

    // Try sending Telegram
    try {
      await sendMessage(telegramMsg);
      telegramSuccess = true;
      logger.success("Telegram message sent ✅");
    } catch (err) {
      logger.error(`Telegram failed: ${err.message}`);
    }

    // Log final status
    if (telegramSuccess && emailSuccess) {
      logger.success("✅ Digest sent via Telegram + Email");
    } else if (telegramSuccess && !emailSuccess) {
      logger.warn("⚠️ Digest sent via Telegram only (Email failed)");
    } else if (!telegramSuccess && emailSuccess) {
      logger.warn("⚠️ Digest sent via Email only (Telegram failed)");
    } else {
      logger.error("❌ Failed to send digest via both channels");
    }
  } catch (err) {
    logger.error(`Main process failed: ${err.message}`);
    process.exit(1);
  }
}

main();