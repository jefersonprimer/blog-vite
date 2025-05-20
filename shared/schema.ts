import { pgTable, text, serial, integer, boolean, jsonb, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model - keeping the existing schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Blog post model
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  titleEn: text("title_en").notNull(),
  titlePtBr: text("title_pt_br").notNull(),
  descriptionEn: text("description_en").notNull(),
  descriptionPtBr: text("description_pt_br").notNull(),
  date: timestamp("date").notNull(),
  tags: text("tags").array().notNull(),
  coverImage: text("cover_image").notNull(),
  folder: varchar("folder", { length: 255 }).notNull(),
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;
