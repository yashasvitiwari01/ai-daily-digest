/**
 * Simple logger utility for consistent logging across the application
 */

export const logger = {
  info: (message) => console.log(`ℹ️  ${message}`),
  success: (message) => console.log(`✅ ${message}`),
  warn: (message) => console.warn(`⚠️  ${message}`),
  error: (message) => console.error(`❌ ${message}`),
  debug: (message) => console.log(`🔍 ${message}`)
};
