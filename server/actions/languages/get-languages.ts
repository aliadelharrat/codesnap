"use server";

import { db } from "@/server";
import { languagesTable } from "@/server/schema";
import { desc } from "drizzle-orm";

export async function getLanguages() {
  const languages = await db.query.languagesTable.findMany({
    orderBy: [desc(languagesTable.createdAt)],
  });
  return languages;
}
