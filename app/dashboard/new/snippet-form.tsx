"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { snippetSchema } from "@/lib/zod-schemas/snippet-schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { createSnippet } from "@/server/actions/create-snippet";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

const SnippetForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof snippetSchema>>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title: "",
      code: "",
      description: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof snippetSchema>) {
    const res = await createSnippet(values);
    if (res?.data?.success) {
      toast(res.data.success, {
        icon: "👏",
      });
      redirect("/dashboard");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Textarea
                  id="code"
                  placeholder="Paste your code here"
                  className="font-mono min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  id="description"
                  placeholder="Add a description or notes about this code snippet"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button
            className="relative"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            <span>Save Snippet</span>

            {form.formState.isSubmitting && (
              <div className="absolute rounded-md inset-0 bg-foreground grid place-items-center">
                <Loader2 className="animate-spin !size-5" />
              </div>
            )}
          </Button>
          <Link href="/dashboard">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SnippetForm;
