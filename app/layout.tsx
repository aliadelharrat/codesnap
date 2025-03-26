import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Nav from "@/components/navigation/nav";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_WEBSITE_NAME ?? "CODESNNAP",
    template: `%s — ${process.env.NEXT_PUBLIC_WEBSITE_NAME}`,
  },
  description: "A place to share your code snippets with ease!",
};

const font = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="container mx-auto">
            <div className="flex min-h-screen flex-col">
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
