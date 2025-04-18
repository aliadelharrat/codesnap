"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <React.Suspense>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </React.Suspense>
  );
}
