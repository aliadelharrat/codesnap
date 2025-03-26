import { getSnippet } from "@/server/actions/get-snippet";
import EditSnippetForm from "./edit-snippet-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { getLanguages } from "@/server/actions/languages/get-languages";

type EditSnippetPageProps = {
  params: { id: string };
};

const EditSnippetPage = async ({ params }: EditSnippetPageProps) => {
  const id = (await params).id;
  const user = (await auth())?.user;
  const res = await getSnippet(id);
  const { snippet, language } = res;

  if (!snippet) return notFound();

  // Check if snippet belongs to current user
  if (snippet.userId !== user?.id) {
    return redirect("/dashboard");
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
              href={`/dashboard/snippets/${snippet.id}`}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Snippet
            </Link>
          </div>

          <h1 className="mb-6 text-2xl font-bold">
            Edit Snippet ~ {snippet.title}
          </h1>

          <div className="space-y-6">
            <EditSnippetForm snippet={snippet} languages={languages} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSnippetPage;
