"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark as darkTheme,
  a11yLight as lightTheme,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useTheme } from "next-themes";

const ViewCode = ({ code, name }: { code: string; name: string }) => {
  const { theme } = useTheme();

  return (
    <SyntaxHighlighter
      language={name}
      style={theme === "light" ? lightTheme : darkTheme}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default ViewCode;
