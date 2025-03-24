import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { auth, signIn } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="flex flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Choose one of our providers to login or register.
          </p>
        </div>

        <div className="flex items-center flex-col gap-4">
          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("google", {
                redirectTo: "/dashboard",
              });
            }}
          >
            <Button type="submit" className="w-full" variant={"outline"}>
              <FcGoogle />
              Authenticate with Google
            </Button>
          </form>

          <form
            className="w-full"
            action={async () => {
              "use server";
              await signIn("github", {
                redirectTo: "/dashboard",
              });
            }}
          >
            <Button type="submit" className="w-full" variant={"outline"}>
              <FaGithub />
              Authenticate with Github
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
