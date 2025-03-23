"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  ArrowLeft,
  ClipboardCopyIcon,
  CodeIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "lucide-react"

export default function SnippetDetailPage({ params }: { params: { id: string } }) {
  // Mock data for a single snippet
  const snippet = {
    id: params.id,
    title: "React useEffect Hook",
    language: "javascript",
    visibility: "public",
    createdAt: "May 15, 2023",
    updatedAt: "May 16, 2023",
    code: `import { useEffect, useState } from 'react';

function ExampleComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // This effect runs after the component mounts
    // and after every update where the dependencies change
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/data');
      const result = await response.json();
      setData(result);
    };
    
    fetchData();
    
    // Return a cleanup function that runs before the component unmounts
    // or before the effect runs again
    return () => {
      // Cleanup code here (e.g., cancel subscriptions)
      console.log('Cleaning up');
    };
  }, [/* dependencies array */]);
  
  return (
    <div>{data ? 'Data loaded' : 'Loading...'}</div>
  );
}`,
    description:
      'A comprehensive example of the useEffect hook in React, including fetching data and cleanup function. The useEffect hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React class components, but unified into a single API."  and componentWillUnmount in React class components, but unified into a single API.',
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(snippet.code)
    // You would add a toast notification here in a real app
  }

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
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container max-w-4xl">
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
                <span>{snippet.language}</span>
                <span>•</span>
                <span>Created {snippet.createdAt}</span>
                <span>•</span>
                <div className="flex items-center">
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
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-1">
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
      </main>
    </div>
  )
}

