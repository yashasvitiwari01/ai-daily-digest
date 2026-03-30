# ai-daily-digest
------------------
An automated Node.js application that runs daily and:
* fetches news from RSS feeds
* filters out only AI and tech news from the plathora of data
* removes duplicate news and ranks articles
* generates a concise summary giving you a daily dose of tech news from around the globe using AI.

🚀 Features
-------------

📰 Fetch latest AI news from RSS feeds (e.g., Google News, News channels, youtube)
🧹 Deduplicate similar articles
📊 Rank articles by recency or relevance
🤖 Generate AI-powered summaries
⏱️ Automate daily runs with GitHub Actions
🔌 Easily extendable (email alerts, dashboards, APIs)


�️ Tech Stack
--------------

**Core Runtime:**
- Node.js v18+
- JavaScript (ES Modules)

**Key Dependencies:**
- **@google/generative-ai** - Google Gemini API for AI-powered text summarization
- **rss-parser** - Parse RSS feeds for news articles
- **axios** - HTTP client for API requests
- **resend** - Email delivery service for newsletters
- **node-telegram-bot-api** - Telegram bot integration for alerts
- **dotenv** - Environment variable management

**DevTools:**
- jest - Testing framework
- nodemon - Development server with auto-reload

**Automation:**
- GitHub Actions - Scheduled daily workflows with cron expressions


⚙️ GitHub Actions Scheduler Setup
----------------------------------

This project uses **GitHub Actions** to run the news digest scheduler automatically on a fixed schedule.

**Workflow Configuration:**
The scheduler is defined in `.github/workflows/ai-news.yml` and runs:
- **Daily at 6:00 AM IST** (0:30 AM UTC)
- **Daily at 6:00 PM IST** (12:30 PM UTC)
- **Manual trigger** available via workflow_dispatch

**Required Secrets:**
To enable the workflow, add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):
- `GEMINI_API_KEY` - Google Gemini API key for summarization
- `RESEND_API_KEY` - Resend API key for email delivery
- `TELEGRAM_BOT_TOKEN` - Telegram bot token for alerts
- `TELEGRAM_CHAT_ID` - Telegram chat ID for notifications
- `EMAIL_FROM` - Sender email address
- `EMAIL_TO` - Recipient email address

**Running Manually:**
You can trigger the workflow manually from the Actions tab on GitHub without waiting for the scheduled time.



📬 Contact / Contribute
------------------------

For suggestions or issues, open an issue in the repository.
For Contributing: 
* Fork the repository
* Create a new branch
* Make your changes
* Submit a pull request


💡 Author
----------

Created by Yashasvi Tiwari
