import { CodeIcon, Menu, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { auth, signOut } from "@/server/auth";
import { ModeToggle } from "../mode-toggle";
import { MobileDrawer } from "./mobile-drawer";
import UserButton from "./user-button";

const links = {
  dashboard: (
    <Link href="/dashboard">
      <Button variant={"link"} size="sm" className="gap-1">
        Dashboard
      </Button>
    </Link>
  ),
  newSnippet: (
    <Link href="/dashboard/new">
      <Button size="sm" className="gap-1">
        <PlusIcon className="h-4 w-4" />
        New Snippet
      </Button>
    </Link>
  ),
  logIn: (
    <Link href="/auth">
      <Button>Log in</Button>
    </Link>
  ),
};

const logo = (
  <Link href="/" className="flex items-center gap-2">
    <CodeIcon className="h-6 w-6" />
    <span className="text-xl font-bold">
      {process.env.NEXT_PUBLIC_WEBSITE_NAME}
    </span>
  </Link>
);

const Nav = async () => {
  const session = await auth();

  const userButton = (
    <UserButton
      action={async () => {
        "use server";
        await signOut({
          redirectTo: "/",
        });
      }}
    />
  );

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-5xl px-5 mx-auto flex h-16 items-center justify-between">
        {logo}

        <div className="hidden md:flex gap-4 items-center">
          <ModeToggle />

          {session && (
            <div className="flex items-center gap-4">
              {links.dashboard}

              {links.newSnippet}

              {userButton}
            </div>
          )}

          {!session && (
            <div className="flex items-center gap-4">{links.logIn}</div>
          )}
        </div>

        <div className="block md:hidden">
          <MobileDrawer
            logo={logo}
            dashboard={links.dashboard}
            newSnippet={links.newSnippet}
            isAuthenticated={session!?.user ? true : false}
            logIn={links.logIn}
          >
            {userButton}
          </MobileDrawer>
        </div>
      </div>
    </header>
  );
};

export default Nav;
