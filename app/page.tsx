import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import { auth } from "@/server/auth";
import { Metadata } from "next";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_WEBSITE_NAME,
};

const langs = [
  "abap",
  "abnf",
  "actionscript",
  "ada",
  "agda",
  "al",
  "antlr4",
  "apacheconf",
  "apex",
  "apl",
  "applescript",
  "aql",
  "arduino",
  "arff",
  "asciidoc",
  "asm6502",
  "asmatmel",
  "aspnet",
  "autohotkey",
  "autoit",
  "avisynth",
  "avroIdl",
  "bash",
  "basic",
  "batch",
  "bbcode",
  "bicep",
  "birb",
  "bison",
  "bnf",
  "brainfuck",
  "brightscript",
  "bro",
  "bsl",
  "c",
  "cfscript",
  "chaiscript",
  "cil",
  "clike",
  "clojure",
  "cmake",
  "cobol",
  "coffeescript",
  "concurnas",
  "coq",
  "cpp",
  "crystal",
  "csharp",
  "cshtml",
  "csp",
  "cssExtras",
  "css",
  "csv",
  "cypher",
  "d",
  "dart",
  "dataweave",
  "dax",
  "dhall",
  "diff",
  "django",
  "dnsZoneFile",
  "docker",
  "dot",
  "ebnf",
  "editorconfig",
  "eiffel",
  "ejs",
  "elixir",
  "elm",
  "erb",
  "erlang",
  "etlua",
  "excelFormula",
  "factor",
  "falselang",
  "firestoreSecurityRules",
  "flow",
  "fortran",
  "fsharp",
  "ftl",
  "gap",
  "gcode",
  "gdscript",
  "gedcom",
  "gherkin",
  "git",
  "glsl",
  "gml",
  "gn",
  "goModule",
  "go",
  "graphql",
  "groovy",
  "haml",
  "handlebars",
  "haskell",
  "haxe",
  "hcl",
  "hlsl",
  "hoon",
  "hpkp",
  "hsts",
  "http",
  "ichigojam",
  "icon",
  "icuMessageFormat",
  "idris",
  "iecst",
  "ignore",
  "inform7",
  "ini",
  "io",
  "j",
  "java",
  "javadoc",
  "javadoclike",
  "javascript",
  "javastacktrace",
  "jexl",
  "jolie",
  "jq",
  "jsExtras",
  "jsTemplates",
  "jsdoc",
  "json",
  "json5",
  "jsonp",
  "jsstacktrace",
  "jsx",
  "julia",
  "keepalived",
  "keyman",
  "kotlin",
  "kumir",
  "kusto",
  "latex",
  "latte",
  "less",
  "lilypond",
  "liquid",
  "lisp",
  "livescript",
  "llvm",
  "log",
  "lolcode",
  "lua",
  "magma",
  "makefile",
  "markdown",
  "markupTemplating",
  "markup",
  "matlab",
  "maxscript",
  "mel",
  "mermaid",
  "mizar",
  "mongodb",
  "monkey",
  "moonscript",
  "n1ql",
  "n4js",
  "nand2tetrisHdl",
  "naniscript",
  "nasm",
  "neon",
  "nevod",
  "nginx",
  "nim",
  "nix",
  "nsis",
  "objectivec",
  "ocaml",
  "opencl",
  "openqasm",
  "oz",
  "parigp",
  "parser",
  "pascal",
  "pascaligo",
  "pcaxis",
  "peoplecode",
  "perl",
  "phpExtras",
  "php",
  "phpdoc",
  "plsql",
  "powerquery",
  "powershell",
  "processing",
  "prolog",
  "promql",
  "properties",
  "protobuf",
  "psl",
  "pug",
  "puppet",
  "pure",
  "purebasic",
  "purescript",
  "python",
  "q",
  "qml",
  "qore",
  "qsharp",
  "r",
  "racket",
  "reason",
  "regex",
  "rego",
  "renpy",
  "rest",
  "rip",
  "roboconf",
  "robotframework",
  "ruby",
  "rust",
  "sas",
  "sass",
  "scala",
  "scheme",
  "scss",
  "shellSession",
  "smali",
  "smalltalk",
  "smarty",
  "sml",
  "solidity",
  "solutionFile",
  "soy",
  "sparql",
  "splunkSpl",
  "sqf",
  "sql",
  "squirrel",
  "stan",
  "stylus",
  "swift",
  "systemd",
  "t4Cs",
  "t4Templating",
  "t4Vb",
  "tap",
  "tcl",
  "textile",
  "toml",
  "tremor",
  "tsx",
  "tt2",
  "turtle",
  "twig",
  "typescript",
  "typoscript",
  "unrealscript",
  "uorazor",
  "uri",
  "v",
  "vala",
  "vbnet",
  "velocity",
  "verilog",
  "vhdl",
  "vim",
  "visualBasic",
  "warpscript",
  "wasm",
  "webIdl",
  "wiki",
  "wolfram",
  "wren",
  "xeora",
  "xmlDoc",
  "xojo",
  "xquery",
  "yaml",
  "yang",
  "zig",
];

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
            <div className="flex gap-2 flex-col md:flex-row">
              {!user && (
                <>
                  <Link
                    href="/auth"
                    className={cn(
                      buttonVariants({
                        size: "lg",
                      }),
                      "w-full"
                    )}
                  >
                    Get Started
                  </Link>

                  <Link
                    href="/"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "lg",
                      }),
                      "w-full"
                    )}
                  >
                    Explore Snippets
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link
                    href="/dashboard"
                    className={cn(
                      buttonVariants({
                        size: "lg",
                      }),
                      "w-full"
                    )}
                  >
                    Visit your dashboard
                  </Link>

                  <Link
                    href="/"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "lg",
                      }),
                      "w-full"
                    )}
                  >
                    Explore Snippets
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="hidden py-12 md:py-16 lg:py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
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
      </section>
    </>
  );
}
