import { boolean, pgTable, serial, varchar, json } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  imageUrl: varchar("image_url"),
  subscription: boolean("subscription").default(false),
});

export const VideoData = pgTable("video_data", {
  id: serial("id").primaryKey(),
  videoScript: json("video_script").notNull(),
  audioURL: varchar("audio_url").notNull(),
  captions: json("captions").notNull(),
  imageURLs: varchar("image_urls").array().notNull(),
  createdBy: varchar("created_by").notNull(),
});
