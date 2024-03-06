import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import hljs from "highlight.js/lib/common";
import "highlight.js/styles/github.css";
import Loader from "@/components/loader";
import Head from "next/head";
import TransitionScroll from "react-transition-scroll";
import { useRouter } from "next/router";
import { triggerLoader } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

const defaultUrl = "google.nl";
const baseUrl = "everyorigin.jwvbremen.nl";

export const baseStyle = { transitionDuration: "650ms", transitionTimingFunction: "ease-out" };
export const hiddenStyle = { opacity: 0, transform: "translateY(3em)", filter: "blur(4px)" };

export default function Home() {
  const [url, setUrl] = useState(defaultUrl);
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [key, setKey] = useState(Date.now());
  const router = useRouter();

  useEffect(() => {
    if (!htmlContent) return;
    hljs.highlightAll();
  }, [htmlContent, loading]);

  const fetchHtml = async () => {
    setError(null);
    const start = Date.now();
    try {
      if (!url) throw new Error("URL is required");
      const validUrl = new URL(!url.includes("http://") && !url.includes("https://") ? `https://${url}` : url);
      setLoading(true);
      const response = await fetch(`/api/get?url=${encodeURIComponent(validUrl.toString())}`);
      const { html } = await response.json();
      if (!html) throw new Error("No HTML content found");
      if (html === htmlContent) return;
      triggerLoader(router);
      setKey(Date.now());
      setHtmlContent(html);
    } catch (error) {
      console.error("Error fetching HTML:", error);
      setError(error);
      setHtmlContent("");
    } finally {
      const end = Date.now();
      const duration = end - start;
      if (duration < 1000) await new Promise((resolve) => setTimeout(resolve, 1000 - duration));
      setLoading(false);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between gap-8 p-4 pt-12 text-neutral-900 sm:p-24 dark:text-neutral-100 ${inter.className}`}
    >
      <Head>
        <title>EveryOrigin</title>
        <meta
          name="description"
          content="
        EveryOrigin is a free CORS proxy that allows you to access the HTML content of any website from any origin.
        Free and open source. No Api keyrequired. No rate limit. No annoying ads. No tracking. No bullshit. Just a simple CORS proxy. Enjoy!
        "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="absolute top-0 flex w-full justify-end p-2 ">
        <p>
          Authored by:&nbsp;
          <a href="https://jwvbremen.nl" rel=" noopener noreferrer" target="_blank">
            Jan-Willem van Bremen
          </a>
        </p>
      </header>

      <div className="relative m-auto place-items-center after:absolute after:top-0 after:-z-20 after:h-[180px] after:w-[180px] after:animate-[pulse_10s_ease-in-out_infinite] after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] after:sm:w-[360px] before:lg:h-[360px] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40">
        <h1 className="inline-block text-4xl font-bold sm:text-6xl" style={{ overflowWrap: "anywhere" }}>
          EveryOrigin
        </h1>
        <h2 className="text-xl font-bold sm:text-3xl">The free CORS proxy</h2>
      </div>

      <div className="flex flex-col items-center gap-8">
        <p>
          EveryOrigin is a free CORS proxy that allows you to access any website from any origin. Inspired by{" "}
          <a href="https://allorigins.win" target="_blank">
            allorigins.win
          </a>{" "}
          and{" "}
          <a href="https://whateverorigin.org" target="_blank">
            whateverorigin.org
          </a>
          {", "}
          which was a humble open source clone of{" "}
          <a href=" https://anyorigin.com" target="_blank">
            AnyOrigin.com
          </a>
          . All of them are either dead 🪦 or dead slow now. 🩻 So I decided to make my own version. It's free and open
          source. No Api key required. No rate limit. No annoying ads. No tracking. No bullshit. Just a simple CORS
          proxy. Enjoy!
        </p>
      </div>

      <div className="font-sans">
        <h2 className="text-4xl font-bold">Usage</h2>
        <h3 className="text-lg font-bold">Fill in the URL you want to fetch</h3>
        <div className="flex flex-col rounded bg-neutral-100 p-2 text-neutral-900 shadow-md xs:flex-row">
          <span style={{ overflowWrap: "anywhere" }}>{`https://${baseUrl}/get?url=`}</span>
          <span
            className={`flex-grow ${
              url === defaultUrl ? "font-bold italic" : ""
            } outline-none empty:before:cursor-text empty:before:text-neutral-400 empty:before:content-['Enter_website_URL']`}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setUrl(e.currentTarget.textContent.replaceAll(" ", "").replaceAll("\n", ""))}
            onKeyDown={async (e) => {
              if (e.key !== "Enter") return;
              e.preventDefault();
              await fetchHtml();
            }}
          >
            {defaultUrl}
          </span>

          <button
            className="-m-2 mt-0 rounded-b bg-blue-600 px-4 font-bold text-neutral-50 transition-colors hover:bg-blue-800 active:bg-blue-500 xs:-mt-2 xs:ml-2 xs:rounded-r xs:rounded-bl-none"
            onClick={fetchHtml}
          >
            Fetch
          </button>
        </div>
      </div>

      {loading && <Loader className="m-4" />}

      {error && !loading && <p className="p-4">Error fetching HTML content: {error.message}</p>}
      {htmlContent && !loading && (
        <TransitionScroll baseStyle={baseStyle} hiddenStyle={hiddenStyle} className="flex flex-col items-center">
          <h2 className="my-2 text-lg font-bold">HTML Content:</h2>
          <pre key={key} className="relative shadow-lg">
            <button
              className="absolute right-2 top-2 origin-center transition-transform hover:scale-110 active:scale-95"
              onClick={() => setHtmlContent("")}
            >
              ✖️
            </button>
            <code className="language-html max-w-[calc(100vw-4em)] overflow-hidden rounded bg-neutral-100 p-2 text-neutral-800">
              {htmlContent}
            </code>
          </pre>

          <h2 className="mb-2 mt-6 text-lg font-bold">Node Fetch Example Code:</h2>
          <pre className="relative shadow-lg">
            <code className="language-javascript overflow-hidden rounded bg-neutral-100 p-2 text-neutral-800">
              {`const response = await fetch("https://${baseUrl}/get?url=${encodeURIComponent(url)}"); \n`}
              {`const result = await response.text();`}
            </code>
          </pre>
        </TransitionScroll>
      )}
    </main>
  );
}
