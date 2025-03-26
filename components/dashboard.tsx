"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeIcon, PlusIcon, SearchIcon } from "lucide-react";
import SnippetBox from "@/components/snippets/snippet-box";
import { useState } from "react";
import { InferSelectModel } from "drizzle-orm";
import { languagesTable, snippetsTable } from "@/server/schema";

type DashboardComponentProps = {
  snippets: {
    snippet: InferSelectModel<typeof snippetsTable>;
    language: InferSelectModel<typeof languagesTable> | null;
  }[];
};

const DashboardComponent = ({ snippets }: DashboardComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSnippets = snippets.filter(
    (item) =>
      item.snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.snippet.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-6">
      <div className="mb-6 flex flex-col md:flex-row gap-2 items-center justify-between">
        <h1 className="text-2xl font-bold">My Snippets</h1>
        <div className="relative w-64">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search snippets..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Snippets</TabsTrigger>
          <TabsTrigger value="public">Public</TabsTrigger>
          <TabsTrigger value="private">Private</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {filteredSnippets.length === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <CodeIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No snippets found</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                You don't have any snippets yet. Create your first one!
              </p>
              <Link href="/dashboard/new">
                <Button size="sm" className="gap-1">
                  <PlusIcon className="h-4 w-4" />
                  New Snippet
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSnippets.map((item) => (
                <SnippetBox
                  key={item.snippet.id}
                  snippet={item.snippet}
                  language={item.language!}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="public">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSnippets
              .filter((item) => item.snippet.visibility === "public")
              .map((item) => (
                <SnippetBox
                  key={item.snippet.id}
                  snippet={item.snippet}
                  language={item.language!}
                />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="private">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSnippets
              .filter((item) => item.snippet.visibility === "private")
              .map((item) => (
                <SnippetBox
                  key={item.snippet.id}
                  snippet={item.snippet}
                  language={item.language!}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardComponent;
