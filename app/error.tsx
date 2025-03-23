"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  CodeIcon,
  AlertCircleIcon,
  HomeIcon,
  ArrowLeftIcon,
  RefreshCwIcon,
} from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-md w-full mx-auto text-center py-12">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
            <AlertCircleIcon className="h-12 w-12 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>

      <p className="text-muted-foreground mb-6">
        {error?.message ||
          "We encountered an unexpected error. Please try again later."}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" className="gap-2" onClick={() => reset()}>
          <RefreshCwIcon className="h-4 w-4" />
          Try again
        </Button>
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

      {error.digest && (
        <p className="text-xs text-muted-foreground mt-8">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
