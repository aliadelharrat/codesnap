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
import { formatTime } from "@/lib/format-time";
import DeleteSnippetComponent from "@/components/snippets/delete-snippet";
import EditSnippetButton from "@/components/snippets/edit-snippet-button";
import CopySnippet from "@/components/snippets/copy-snippet";
import ShareSnippet from "@/components/snippets/share-snippet";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gruvboxDark as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Fira_Code } from "next/font/google";
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

export const metadata: Metadata = {
  title: "View snippet",
};

const codeFont = Fira_Code({
  weight: ["400"],
  subsets: ["latin"],
});

import { getSnippet } from "@/server/actions/get-snippet";
import { notFound } from "next/navigation";

type ShowSnippetProps = {
  params: Promise<{ id: string }>;
};

const ShowSnippet = async ({ params }: ShowSnippetProps) => {
  const id = (await params).id;
  const res = await getSnippet(id);

  if (res.snippet.visibility === "private") {
    return notFound();
  }

  const { snippet, language } = res;

  return (
    <div className="container max-w-4xl py-6 mx-auto">
      <div className="mb-6">
        <Link
          href="/explore"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold pr-5">{snippet.title}</h1>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="capitalize">{language?.name}</span>
            <span>•</span>
            <span>Created {formatTime(snippet.createdAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CopySnippet code={snippet.code} />
          <ShareSnippet id={snippet.id} visibility={snippet.visibility} />
        </div>
      </div>

      <Card className="mb-6 overflow-hidden">
        <div className={cn("text-sm overflow-x-auto", codeFont.className)}>
          <SyntaxHighlighter language={language?.name} style={theme}>
            {snippet.code}
          </SyntaxHighlighter>
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
};

export default ShowSnippet;
