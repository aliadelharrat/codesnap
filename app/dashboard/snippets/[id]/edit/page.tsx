import { getSnippet } from "@/server/actions/get-snippet";
import EditSnippetForm from "./edit-snippet-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type EditSnippetPageProps = {
  params: { id: string };
};

const EditSnippetPage = async ({ params }: EditSnippetPageProps) => {
  const id = (await params).id;

  const snippet = await getSnippet(id);

  if (!snippet) return notFound();

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
            <EditSnippetForm snippet={snippet} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSnippetPage;
