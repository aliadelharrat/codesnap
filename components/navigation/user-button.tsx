import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth, signOut } from "@/server/auth";
import { Button } from "../ui/button";
import { UserIcon } from "lucide-react";

const UserButton = async ({ action }: { action: () => void }) => {
  const session = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            {session?.user!?.image ? (
              <AvatarImage src={session?.user?.image} />
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
        <p className="text-sm p-2 flex items-center gap-1 bg-muted">
          <UserIcon className="size-4" />
          {session?.user?.name}
        </p>

        <form className="w-full cursor-pointer" action={action}>
          <button className="w-full" type="submit">
            <DropdownMenuItem className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
