"use client";

import React from "react";
import { ShareIcon } from "lucide-react";
import toast from "react-hot-toast";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ShareSnippet = ({
  id,
  visibility,
}: {
  id: string;
  visibility: "private" | "public";
}) => {
  const link = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/s/${id}`;

  const copyToClipboard = () => {
    if (visibility === "private") {
      toast("Private snippets can’t be shared!", {
        icon: "🙅‍♂️",
      });
      return;
    }

    navigator.clipboard.writeText(link);
    toast("Link copied to clipboard!", {
      icon: "🚀",
    });
  };

  if (visibility === "private") {
    return (
      <Button disabled variant="outline" size="sm" className="gap-1">
        <ShareIcon className="h-4 w-4" />
        Share
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ShareIcon className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={link} readOnly />
          </div>
          <Button
            onClick={copyToClipboard}
            type="submit"
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            <Copy />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareSnippet;
