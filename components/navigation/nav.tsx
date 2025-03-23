import { CodeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Nav = () => {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <CodeIcon className="h-6 w-6" />
          <span className="text-xl font-bold">CodeSnap</span>
        </Link>
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
//           <div className="flex items-center gap-4">
//             <Link href="/dashboard/new">
//               <Button size="sm" className="gap-1">
//                 <PlusIcon className="h-4 w-4" />
//                 New Snippet
//               </Button>
//             </Link>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="rounded-full">
//                   <UserIcon className="h-5 w-5" />
//                   <span className="sr-only">User menu</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem>Profile</DropdownMenuItem>
//                 <DropdownMenuItem>Settings</DropdownMenuItem>
//                 <DropdownMenuItem>Logout</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </header>
