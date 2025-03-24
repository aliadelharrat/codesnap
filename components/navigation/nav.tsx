import { CodeIcon, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth, signOut } from "@/server/auth";

const Nav = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <CodeIcon className="h-6 w-6" />
          <span className="text-xl font-bold">CodeSnap</span>
        </Link>

        {session ? (
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
                  <Avatar>
                    {session.user!?.image ? (
                      <AvatarImage src={session.user?.image} />
                    ) : (
                      <UserIcon className="h-5 w-5" />
                    )}
                    <AvatarFallback>
                      {session?.user?.name?.toUpperCase().slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <p className="text-sm p-2 flex items-center gap-1 bg-zinc-50">
                  <UserIcon className="size-4" />
                  {session.user?.name}
                </p>

                <form
                  className="w-full cursor-pointer"
                  action={async () => {
                    "use server";
                    await signOut({
                      redirectTo: "/dashboard",
                    });
                  }}
                >
                  <button className="w-full" type="submit">
                    <DropdownMenuItem className="cursor-pointer">
                      Logout
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <Button>Login or Register</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Nav;

//  <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Link href="/" className="flex items-center gap-2">
//               <CodeIcon className="h-6 w-6" />
//               <span className="text-xl font-bold">CodeSnap</span>
//             </Link>
//           </div>

//         </div>
//       </header>
