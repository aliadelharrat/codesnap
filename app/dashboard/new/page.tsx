import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import SnippetForm from "./snippet-form";
import { auth } from "@/server/auth";
import { notFound, redirect } from "next/navigation";
import { getLanguages } from "@/server/actions/languages/get-languages";

export default async function NewSnippetPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return redirect("/auth");
  }

  const languages = await getLanguages();

  if (languages.length === 0) {
    return (
      <p className="py-5">
        Languages not found, Make sure they exist in the db.
      </p>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 py-6">
        <div className="container max-w-2xl mx-auto">
          <div className="mb-6">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>

          <h1 className="mb-6 text-2xl font-bold">Create New Snippet</h1>

          <div className="space-y-6">
            <SnippetForm id={session?.user.id} languages={languages} />
            {/* <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter a descriptive title" />
            </div> */}

            {/* TODO: Category */}
            {/* <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select defaultValue="javascript">
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                  <SelectItem value="php">PHP</SelectItem>
                  <SelectItem value="ruby">Ruby</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                  <SelectItem value="swift">Swift</SelectItem>
                  <SelectItem value="kotlin">Kotlin</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            {/* <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Textarea
                id="code"
                placeholder="Paste your code here"
                className="font-mono min-h-[200px]"
              />
            </div> */}

            {/* <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add a description or notes about this code snippet"
                className="min-h-[100px]"
              />
            </div> */}

            {/* TODO: Visibility */}
            {/* <div className="space-y-2">
              <Label>Visibility</Label>
              <RadioGroup
                defaultValue="private"
                className="flex gap-4"
                value={visibility}
                onValueChange={setVisibility}
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
                {visibility === "private"
                  ? "Only you can view this snippet"
                  : "Anyone with the link can view this snippet"}
              </p>
            </div> */}

            {/* <div className="flex gap-2">
              <Button>Save Snippet</Button>
              <Link href="/dashboard">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
