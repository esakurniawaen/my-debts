import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="overflow-x-hidden bg-slate-950 text-sm font-medium text-slate-400">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
