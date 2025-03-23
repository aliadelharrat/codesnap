import { pgTable, text, date, serial } from "drizzle-orm/pg-core";

export const users = pgTable("snippets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  code: text("code").notNull(),
  description: text("description"),
  createdAt: date("created_at").defaultNow(),
});
