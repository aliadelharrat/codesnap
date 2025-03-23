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
  ClipboardCopyIcon,
  CodeIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react";
import { getSnippet } from "@/server/actions/get-snippet";
import { notFound } from "next/navigation";
import { formatTime } from "@/lib/format-time";

export default async function SnippetDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = (await params).id;

  // const copyToClipboard = () => {
  //   navigator.clipboard.writeText(snippet.code);
  //   // You would add a toast notification here in a real app
  // };

  let snippet;

  try {
    snippet = await getSnippet(id);
  } catch {
    return notFound();
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

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{snippet.title}</h1>
          <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
            <span>{"Langauge"}</span>
            <span>•</span>
            <span>Created {formatTime(snippet.createdAt)}</span>
            <span>•</span>
            {/* <div className="flex items-center">
              {snippet.visibility === "public" ? (
                <div className="flex items-center">
                  <EyeIcon className="mr-1 h-4 w-4" />
                  <span>Public</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <EyeIcon className="mr-1 h-4 w-4" />
                  <span>Private</span>
                </div>
              )}
            </div> */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            // onClick={copyToClipboard}
            className="gap-1"
          >
            <ClipboardCopyIcon className="h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <ShareIcon className="h-4 w-4" />
            Share
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <PencilIcon className="h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-destructive">
                <TrashIcon className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="mb-6 overflow-hidden">
        <div className="bg-muted p-4 font-mono text-sm overflow-x-auto">
          <pre>
            <code>{snippet.code}</code>
          </pre>
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
