"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CodeIcon, SearchIcon, HomeIcon, ArrowLeftIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-md w-full mx-auto text-center py-12">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <SearchIcon className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-2">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Snippet not found</h2>

      <p className="text-muted-foreground mb-6">
        The snippet you're looking for doesn't exist or may be private.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => window.history.back()}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Go back
        </Button>
        <Button className="gap-2" asChild>
          <Link href="/">
            <HomeIcon className="h-4 w-4" />
            Return home
          </Link>
        </Button>
      </div>
    </div>
  );
}
