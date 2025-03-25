"use client";

import React from "react";
import { Button } from "../ui/button";
import { ClipboardCopyIcon } from "lucide-react";
import toast from "react-hot-toast";

const CopySnippet = ({ code }: { code: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast("Code copied to clipboard!", {
      icon: "✨",
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={copyToClipboard}
      className="gap-1"
    >
      <ClipboardCopyIcon className="h-4 w-4" />
      Copy
    </Button>
  );
};

export default CopySnippet;
