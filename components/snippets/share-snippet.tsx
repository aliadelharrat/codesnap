"use client";

import React from "react";
import { Button } from "../ui/button";
import { ShareIcon } from "lucide-react";
import toast from "react-hot-toast";

const ShareSnippet = ({
  id,
  visibility,
}: {
  id: string;
  visibility: "private" | "public";
}) => {
  const copyToClipboard = () => {
    if (visibility === "private") {
      toast("Private snippets can’t be shared!", {
        icon: "🙅‍♂️",
      });
      return;
    }

    const link = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/s/${id}`;
    navigator.clipboard.writeText(link);
    toast("Link copied to clipboard!", {
      icon: "🚀",
    });
  };

  return (
    <Button
      onClick={copyToClipboard}
      variant="outline"
      size="sm"
      className="gap-1"
    >
      <ShareIcon className="h-4 w-4" />
      Share
    </Button>
  );
};

export default ShareSnippet;
