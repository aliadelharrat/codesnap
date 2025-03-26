import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeft,
  EyeIcon,
  LockIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { getSnippet } from "@/server/actions/get-snippet";
import { redirect } from "next/navigation";
import { formatTime } from "@/lib/format-time";
import DeleteSnippetComponent from "@/components/snippets/delete-snippet";
import EditSnippetButton from "@/components/snippets/edit-snippet-button";
import { auth } from "@/server/auth";
import CopySnippet from "@/components/snippets/copy-snippet";
import ShareSnippet from "@/components/snippets/share-snippet";
import { cn } from "@/lib/utils";

import { Metadata } from "next";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ViewCode from "@/components/snippets/view-code";
import { Fira_Code } from "next/font/google";
const codeFont = Fira_Code({
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "View snippet",
};

export default async function SnippetDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = (await params).id;
  const user = (await auth())?.user;

  const snippetObj = await getSnippet(id);

  const { snippet, language } = snippetObj;

  // check if the user own the snippet
  if (user?.id !== snippet.userId) {
    return redirect("/dashboard");
  }

  return (
    <div className="container max-w-4xl py-6 mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-6 flex flex-col md:flex-row gap-5 items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold pr-5">{snippet.title}</h1>
          <div className="mt-5 sm:mt-1 flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted-foreground">
            <span className="capitalize">{language?.name}</span>
            <span className="hidden sm:inline">•</span>
            <span>Created {formatTime(snippet.createdAt)}</span>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center">
              {snippet.visibility === "public" ? (
                <div className="text-emerald-700 dark:text-emerald-500 flex items-center">
                  <EyeIcon className="mr-1 h-4 w-4" />
                  <span>Public</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <LockIcon className="mr-1 h-4 w-4" />
                  <span>Private</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CopySnippet code={snippet.code} />
          <ShareSnippet id={snippet.id} visibility={snippet.visibility} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>

            <Dialog>
              <DropdownMenuContent align="end">
                <EditSnippetButton id={snippet.id} />

                <DialogTrigger asChild>
                  <DropdownMenuItem className="gap-2 text-destructive cursor-pointer">
                    <TrashIcon className="h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your snippet.
                  </DialogDescription>

                  <div className="flex items-center justify-end gap-5 mt-5">
                    <DialogClose asChild>
                      <Button variant={"outline"}>Cancel</Button>
                    </DialogClose>

                    <DeleteSnippetComponent id={snippet.id} />
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </DropdownMenu>
        </div>
      </div>

      <Card className="mb-6 overflow-hidden">
        <div className={cn("text-sm overflow-x-auto", codeFont.className)}>
          <ViewCode name={language?.name!} code={snippet?.code} />
        </div>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <div className="text-muted-foreground">
          <p>{snippet.description}</p>
        </div>
      </div>
    </div>
  );
}
