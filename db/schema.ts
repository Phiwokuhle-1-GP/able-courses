import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const enquiries = sqliteTable("enquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  course: text("course").notNull(),
  message: text("message"),
  status: text("status").notNull().default("New"),
});

export const pageViews = sqliteTable("page_views", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  createdAt: text("created_at").notNull(),
  path: text("path").notNull(),
  source: text("source").notNull(),
  campaign: text("campaign"),
});
