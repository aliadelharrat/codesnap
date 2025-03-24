import { redirect } from "next/navigation";
import { auth } from "./auth";

export default async function guard() {
  const session = await auth();
  if (!session) return redirect("/auth");
}
