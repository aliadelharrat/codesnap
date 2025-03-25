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
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { EyeIcon, Loader2, LockIcon } from "lucide-react";
import { InferSelectModel } from "drizzle-orm";
import { snippetsTable } from "@/server/schema";
import { updateSnippet } from "@/server/actions/update-snippet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type EditSnippetFormProps = {
  snippet: InferSelectModel<typeof snippetsTable>;
};

const EditSnippetForm = ({ snippet }: EditSnippetFormProps) => {
  const { id, title, code, description, visibility } = snippet;
  // 1. Define your form.
  const form = useForm<z.infer<typeof snippetSchema>>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title,
      code,
      description,
      visibility,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof snippetSchema>) {
    const extendedValues = {
      ...values,
      id,
    };
    const res = await updateSnippet(extendedValues);
    if (res?.data?.success) {
      toast(res.data.success, {
        icon: "👏",
      });
      redirect(`/dashboard/snippets/${id}`);
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

        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex gap-4"
                    {...field}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="private" />
                      <Label
                        htmlFor="private"
                        className="flex items-center gap-1 cursor-pointer"
                      >
                        <LockIcon className="h-4 w-4" />
                        Private
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label
                        htmlFor="public"
                        className="flex items-center gap-1 cursor-pointer"
                      >
                        <EyeIcon className="h-4 w-4" />
                        Public
                      </Label>
                    </div>
                  </RadioGroup>
                  <p className="text-sm text-muted-foreground">
                    {field.value === "private"
                      ? "Only you can view this snippet"
                      : "Anyone with the link can view this snippet"}
                  </p>
                </div>
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

export default EditSnippetForm;
