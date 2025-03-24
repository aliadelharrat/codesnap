import Link from "next/link";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { PencilIcon } from "lucide-react";

type EditSnippetButtonProps = {
  id: string;
};

const EditSnippetButton = ({ id }: EditSnippetButtonProps) => {
  return (
    <Link href={`/dashboard/snippets/${id}/edit`}>
      <DropdownMenuItem className="cursor-pointer gap-2">
        <PencilIcon className="h-4 w-4" />
        Edit
      </DropdownMenuItem>
    </Link>
  );
};

export default EditSnippetButton;
