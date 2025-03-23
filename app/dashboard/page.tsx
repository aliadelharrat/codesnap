import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeIcon, PlusIcon, SearchIcon } from "lucide-react";
import SnippetBox from "@/components/snippets/snippet-box";
import { getSnippets } from "@/server/actions/get-snippets";

export default async function DashboardPage() {
  const snippets = await getSnippets();

  // const [searchQuery, setSearchQuery] = useState("");

  // const filteredSnippets = mySnippets.filter(
  //   (snippet) =>
  //     snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     snippet.description.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Snippets</h1>
        <div className="relative w-64">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search snippets..."
            className="pl-8"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
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
          {snippets.length === 0 ? (
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
              {snippets.map((snippet) => (
                <SnippetBox key={snippet.id} snippet={snippet} />
              ))}
            </div>
          )}
        </TabsContent>
        {/* <TabsContent value="public">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {snippets
              .filter((snippet) => snippet.visibility === "public")
              .map((snippet) => (
                <div
                  key={snippet.id}
                  className="group relative overflow-hidden rounded-lg border bg-background p-4 transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{snippet.title}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <EyeIcon className="mr-1 h-4 w-4" />
                        <span>Public</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
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
                    <span>{snippet.language}</span>
                    <span>Created {snippet.createdAt}</span>
                  </div>
                  <Link
                    href={`/dashboard/snippets/${snippet.id}`}
                    className="absolute inset-0"
                  >
                    <span className="sr-only">View snippet</span>
                  </Link>
                </div>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="private">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {snippets
              .filter((snippet) => snippet.visibility === "private")
              .map((snippet) => (
                <div
                  key={snippet.id}
                  className="group relative overflow-hidden rounded-lg border bg-background p-4 transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{snippet.title}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <LockIcon className="mr-1 h-4 w-4" />
                        <span>Private</span>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
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
                    <span>{snippet.language}</span>
                    <span>Created {snippet.createdAt}</span>
                  </div>
                  <Link
                    href={`/dashboard/snippets/${snippet.id}`}
                    className="absolute inset-0"
                  >
                    <span className="sr-only">View snippet</span>
                  </Link>
                </div>
              ))}
          </div>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
