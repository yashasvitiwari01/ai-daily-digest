import TelegramBot from "node-telegram-bot-api";

export const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN);

export async function sendMessage(message) {
    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message, { parse_mode: "Markdown", });
}