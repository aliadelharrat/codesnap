import { languagesTable, snippetsTable } from "@/server/schema";
import { InferSelectModel } from "drizzle-orm";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EyeIcon, LockIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { formatTime } from "@/lib/format-time";
import DeleteSnippetComponent from "./delete-snippet";
import EditSnippetButton from "./edit-snippet-button";

import SyntaxHighlighter from "react-syntax-highlighter";
import { gruvboxDark as theme } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Fira_Code } from "next/font/google";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ViewCode from "./view-code";

const codeFont = Fira_Code({
  weight: ["400"],
  subsets: ["latin"],
});

type snippetBoxProps = {
  snippet: InferSelectModel<typeof snippetsTable>;
  language: InferSelectModel<typeof languagesTable>;
};

const SnippetBox = ({ snippet, language }: snippetBoxProps) => {
  return (
    <div
      key={snippet.id}
      className="group relative overflow-hidden rounded-lg border bg-background p-4 transition-all hover:shadow-md"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium line-clamp-2">
          <Link href={`/dashboard/snippets/${snippet.id}`}>
            {snippet.title}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {snippet.visibility === "public" ? (
            <div className="flex !text-emerald-700 dark:!text-emerald-500 items-center text-sm text-muted-foreground">
              <EyeIcon className="mr-1 h-4 w-4" />
              <span>Public</span>
            </div>
          ) : (
            <div className="flex items-center text-sm text-muted-foreground">
              <LockIcon className="mr-1 h-4 w-4" />
              <span>Private</span>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="z-50">
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
      <div
        className={cn(
          "rounded bg-muted text-sm mb-3 max-h-[150px] overflow-hidden",
          codeFont.className
        )}
      >
        <ViewCode code={snippet?.code} name={language?.name} />
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {snippet.description}
      </p>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span className="capitalize font-bold">{language.name}</span>
        <span>Created {formatTime(snippet.createdAt)}</span>
      </div>
      <Link
        href={`/dashboard/snippets/${snippet.id}`}
        className="absolute inset-0 z-40"
      >
        <span className="sr-only">View snippet</span>
      </Link>
    </div>
  );
};

export default SnippetBox;
