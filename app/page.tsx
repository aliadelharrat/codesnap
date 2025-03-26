import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { auth } from "@/server/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_WEBSITE_NAME,
};

export default async function HomePage() {
  const user = (await auth())?.user;

  return (
    <>
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Store and Share Your Code Snippets
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Save your code snippets with explanations and share them with
                the world or keep them private.
              </p>
            </div>
            <div className="space-x-4">
              {!user && (
                <>
                  <Link href="/auth">
                    <Button size="lg">Get Started</Button>
                  </Link>

                  <Link href="/">
                    <Button variant="outline" size="lg">
                      Explore Snippets
                    </Button>
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link href="/dashboard">
                    <Button size="lg">Visit your dashboard</Button>
                  </Link>

                  <Link href="/">
                    <Button variant="outline" size="lg">
                      Explore Snippets
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20 bg-muted/50 relative">
        <div className="container px-4 md:px-6 blur-[0.05rem]">
          <h2 className="mb-8 text-2xl font-bold text-center">
            Featured Snippets
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Link href={`/snippets/${i}`} key={i} className="group">
                <div className="overflow-hidden rounded-lg border bg-background p-4 transition-all hover:shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">React Hooks Example</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <EyeIcon className="mr-1 h-4 w-4" />
                      <span>Public</span>
                    </div>
                  </div>
                  <div className="rounded bg-muted p-3 font-mono text-sm mb-3">
                    <pre>
                      <code>{`const [count, setCount] = useState(0);

useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);`}</code>
                    </pre>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A simple example of useState and useEffect hooks in React.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 grid place-items-center z-50">
          <p className="font-bold text-3xl tracking-tight text-red-500">
            Coming Soon...
          </p>
        </div>
      </section>
    </>
  );
}
