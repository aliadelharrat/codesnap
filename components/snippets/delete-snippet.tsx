"use client";

import { TrashIcon } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { deleteSnippet } from "@/server/actions/delete-snippet";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

type deleteSnippetProps = {
  id: string;
};

const DeleteSnippetComponent = ({ id }: deleteSnippetProps) => {
  const handleClick = async () => {
    const res = await deleteSnippet(id);
    if (res?.success) {
      toast(res?.success, {
        icon: "👏",
      });
      return redirect("/dashboard");
    } else {
      toast(res?.failure!, {
        icon: "👎",
      });
    }
  };

  return (
    <DropdownMenuItem onClick={handleClick} className="gap-2 text-destructive cursor-pointer">
      <TrashIcon className="h-4 w-4" />
      Delete
    </DropdownMenuItem>
  );
};

export default DeleteSnippetComponent;
