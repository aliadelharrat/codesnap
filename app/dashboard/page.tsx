import { auth } from "@/server/auth";
import { getSnippetsByUserId } from "@/server/actions/get-snippets-by-user-id";
import { redirect } from "next/navigation";
import DashboardComponent from "@/components/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = (await auth())?.user;

  if (!user?.id) return redirect("/auth");

  const snippets = await getSnippetsByUserId(user?.id);
  return <DashboardComponent snippets={snippets} />;
}
