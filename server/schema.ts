import { pgTable, text, date, serial, timestamp } from "drizzle-orm/pg-core";

export const snippetsTable = pgTable("snippets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  code: text("code").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
