import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an email with the AI digest
 * @param {Object} options - Email options
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML content
 */
export async function sendEmail({ subject, html }) {
  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: subject || "🤖 AI Daily Digest",
      html,
    });

    console.log("📧 Email sent to the configured email id");
  } catch (err) {
    console.error("❌ Email failed:", err.message);
    throw err;
  }
}