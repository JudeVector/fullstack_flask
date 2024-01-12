import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "@/components/Navbar";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body>
        <div className="max-w-3xl mx-auto p-4">
          <Navbar />
          <div className="mt-8"></div>
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
