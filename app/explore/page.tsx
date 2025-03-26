"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CodeIcon, SearchIcon } from "lucide-react";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("all");

  // Mock data for public snippets
  const publicSnippets = [
    {
      id: 1,
      title: "React useEffect Hook",
      language: "javascript",
      author: "johndoe",
      createdAt: "2023-05-15",
      code: `useEffect(() => {
  // This runs after every render
  return () => {
    // This is the cleanup function
  };
}, [dependency]);`,
      description:
        "A simple example of the useEffect hook in React with cleanup function.",
    },
    {
      id: 2,
      title: "Python List Comprehension",
      language: "python",
      author: "janedoe",
      createdAt: "2023-05-10",
      code: `# Create a list of squares
squares = [x**2 for x in range(10)]
print(squares)`,
      description:
        "A concise way to create lists in Python using list comprehension.",
    },
    {
      id: 3,
      title: "CSS Flexbox Layout",
      language: "css",
      author: "webdev123",
      createdAt: "2023-05-05",
      code: `.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
      description:
        "Basic flexbox layout with centered items and space between.",
    },
    {
      id: 4,
      title: "TypeScript Interface",
      language: "typescript",
      author: "tsdev",
      createdAt: "2023-05-20",
      code: `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
}`,
      description:
        "TypeScript interface for a user object with type definitions.",
    },
    {
      id: 5,
      title: "Go Error Handling",
      language: "go",
      author: "gopher",
      createdAt: "2023-05-18",
      code: `func readFile(path string) ([]byte, error) {
  file, err := os.Open(path)
  if err != nil {
    return nil, err
  }
  defer file.Close()
  
  return io.ReadAll(file)
}`,
      description:
        "Idiomatic error handling in Go with defer for resource cleanup.",
    },
    {
      id: 6,
      title: "SQL Join Query",
      language: "sql",
      author: "dbadmin",
      createdAt: "2023-05-12",
      code: `SELECT 
  users.name, 
  orders.order_date,
  orders.amount
FROM users
JOIN orders ON users.id = orders.user_id
WHERE orders.amount > 100
ORDER BY orders.order_date DESC;`,
      description:
        "SQL query joining users and orders tables with filtering and sorting.",
    },
  ];

  const filteredSnippets = publicSnippets.filter(
    (snippet) =>
      (language === "all" || snippet.language === language) &&
      (snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        snippet.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <CodeIcon className="h-6 w-6" />
              <span className="text-xl font-bold">
                {process.env.NEXT_PUBLIC_WEBSITE_NAME}
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Explore Code Snippets</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover and learn from public code snippets shared by the
              community
            </p>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search snippets..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredSnippets.length === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <SearchIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No snippets found</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                Try adjusting your search or filter to find what you're looking
                for
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSnippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="group relative overflow-hidden rounded-lg border bg-background p-4 transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{snippet.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {snippet.language}
                    </div>
                  </div>
                  <div className="rounded bg-muted p-3 font-mono text-sm mb-3 max-h-[150px] overflow-hidden">
                    <pre>
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {snippet.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>By @{snippet.author}</span>
                    <span>Created {snippet.createdAt}</span>
                  </div>
                  <Link
                    href={`/explore/${snippet.id}`}
                    className="absolute inset-0"
                  >
                    <span className="sr-only">View snippet</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_WEBSITE_NAME}.
            All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
