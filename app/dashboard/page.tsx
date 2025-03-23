import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeIcon, PlusIcon, SearchIcon } from "lucide-react";
import SnippetBox from "@/components/snippets/snippet-box";
import { getSnippets } from "@/server/actions/get-snippets";

export default async function DashboardPage() {
  const snippets = await getSnippets();

  // const [searchQuery, setSearchQuery] = useState("");

  // const filteredSnippets = mySnippets.filter(
  //   (snippet) =>
  //     snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     snippet.description.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="container py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Snippets</h1>
        <div className="relative w-64">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search snippets..."
            className="pl-8"
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Snippets</TabsTrigger>
          <TabsTrigger value="public">Public</TabsTrigger>
          <TabsTrigger value="private">Private</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {snippets.length === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <CodeIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">No snippets found</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                You don't have any snippets yet. Create your first one!
              </p>
              <Link href="/dashboard/new">
                <Button size="sm" className="gap-1">
                  <PlusIcon className="h-4 w-4" />
                  New Snippet
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {snippets.map((snippet) => (
                <SnippetBox key={snippet.id} snippet={snippet} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
