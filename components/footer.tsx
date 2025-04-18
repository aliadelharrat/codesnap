import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container max-w-5xl px-5 mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © 2025 {process.env.NEXT_PUBLIC_WEBSITE_NAME}. All rights reserved.
          
        </p>
        <div className="flex items-center gap-4">
          <Link
            target="_blank"
            href="https://github.com/aliadelharrat"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline flex gap-1 items-center"
          >
            <span>Developed by Adel Harrat</span>{" "}
            <ArrowUpRight className="size-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
