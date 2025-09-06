import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./config/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_u4WkxdTI2ciz@ep-wild-grass-a1eh59kt-pooler.ap-southeast-1.aws.neon.tech/cliptic-ai-video-generation?sslmode=require&channel_binding=require",
  },
});
