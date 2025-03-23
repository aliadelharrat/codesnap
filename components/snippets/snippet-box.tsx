import { snippetsTable } from "@/server/schema";
import { InferSelectModel } from "drizzle-orm";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import { formatTime } from "@/lib/format-time";
import DeleteSnippetComponent from "./delete-snippet";

type snippetBoxProps = {
  snippet: InferSelectModel<typeof snippetsTable>;
};

const SnippetBox = ({ snippet }: snippetBoxProps) => {
  return (
    <div
      key={snippet.id}
      className="group relative overflow-hidden rounded-lg border bg-background p-4 transition-all hover:shadow-md"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">
          <Link href={`/dashboard/snippets/${snippet.id}`}>
            {snippet.title}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {/* {snippet.visibility === "public" ? (
            <div className="flex items-center text-sm text-muted-foreground">
              <EyeIcon className="mr-1 h-4 w-4" />
              <span>Public</span>
            </div>
          ) : (
            <div className="flex items-center text-sm text-muted-foreground">
              <LockIcon className="mr-1 h-4 w-4" />
              <span>Private</span>
            </div>
          )} */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontalIcon className="h-4 w-4" />
                <span className="sr-only">More</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DeleteSnippetComponent id={snippet.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded bg-muted p-3 font-mono text-sm mb-3 max-h-[150px] overflow-hidden">
        <pre>
          <code>{snippet.code}</code>
        </pre>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {snippet.description}
      </p>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {/* {snippet.language} */}
          Language
        </span>
        <span>Created {formatTime(snippet.createdAt)}</span>
      </div>
      {/* <Link
        href={`/dashboard/snippets/${snippet.id}`}
        className="absolute inset-0"
      >
        <span className="sr-only">View snippet</span>
      </Link> */}
    </div>
  );
};

export default SnippetBox;
