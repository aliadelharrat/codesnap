"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CodeIcon, EyeIcon, LockIcon, MoreHorizontalIcon, PlusIcon, SearchIcon, UserIcon } from "lucide-react"

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for snippets
  const mySnippets = [
    {
      id: 1,
      title: "React useEffect Hook",
      language: "javascript",
      visibility: "public",
      createdAt: "2023-05-15",
      code: `useEffect(() => {
  // This runs after every render
  return () => {
    // This is the cleanup function
  };
}, [dependency]);`,
      description: "A simple example of the useEffect hook in React with cleanup function.",
    },
    {
      id: 2,
      title: "Python List Comprehension",
      language: "python",
      visibility: "private",
      createdAt: "2023-05-10",
      code: `# Create a list of squares
squares = [x**2 for x in range(10)]
print(squares)`,
      description: "A concise way to create lists in Python using list comprehension.",
    },
    {
      id: 3,
      title: "CSS Flexbox Layout",
      language: "css",
      visibility: "public",
      createdAt: "2023-05-05",
      code: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
      description: "Basic flexbox layout with centered items and space between.",
    },
  ]

  const filteredSnippets = mySnippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <CodeIcon className="h-6 w-6" />
              <span className="text-xl font-bold">CodeSnap</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/new">
              <Button size="sm" className="gap-1">
                <PlusIcon className="h-4 w-4" />
                New Snippet
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <UserIcon className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
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
                  {filteredSnippets.map((snippet) => (
                    <div
                      key={snippet.id}
                      className="group relative overflow-hidden rounded-lg border bg-background p-4 transition-all hover:shadow-md"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{snippet.title}</div>
                        <div className="flex items-center gap-2">
                          {snippet.visibility === "public" ? (
                            <div className="flex items-center text-sm text-muted-foreground">
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
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontalIcon className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="rounded bg-muted p-3 font-mono text-sm mb-3 max-h-[150px] overflow-hidden">
                        <pre>
                          <code>{snippet.code}</code>
                        </pre>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{snippet.description}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{snippet.language}</span>
                        <span>Created {snippet.createdAt}</span>
                      </div>
                      <Link href={`/dashboard/snippets/${snippet.id}`} className="absolute inset-0">
                        <span className="sr-only">View snippet</span>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="public">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSnippets
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
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontalIcon className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="rounded bg-muted p-3 font-mono text-sm mb-3 max-h-[150px] overflow-hidden">
                        <pre>
                          <code>{snippet.code}</code>
                        </pre>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{snippet.description}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{snippet.language}</span>
                        <span>Created {snippet.createdAt}</span>
                      </div>
                      <Link href={`/dashboard/snippets/${snippet.id}`} className="absolute inset-0">
                        <span className="sr-only">View snippet</span>
                      </Link>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="private">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSnippets
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
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontalIcon className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="rounded bg-muted p-3 font-mono text-sm mb-3 max-h-[150px] overflow-hidden">
                        <pre>
                          <code>{snippet.code}</code>
                        </pre>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{snippet.description}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{snippet.language}</span>
                        <span>Created {snippet.createdAt}</span>
                      </div>
                      <Link href={`/dashboard/snippets/${snippet.id}`} className="absolute inset-0">
                        <span className="sr-only">View snippet</span>
                      </Link>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

