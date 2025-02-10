import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: "./drizzle",
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_US02oLOBczXG@ep-odd-breeze-a471n7b4-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
});
