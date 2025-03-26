"use client";

import { TrashIcon } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { deleteSnippet } from "@/server/actions/delete-snippet";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

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
    <DialogClose asChild>
      <Button onClick={handleClick} variant="destructive">
        Confirm
      </Button>
    </DialogClose>
  );
};

export default DeleteSnippetComponent;
