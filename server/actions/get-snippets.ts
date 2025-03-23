"use server";

import { db } from "@/server";

export async function getSnippets() {
  const snippets = await db.query.users.findMany();
  return snippets;
}
