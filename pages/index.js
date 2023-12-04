import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import hljs from "highlight.js/lib/common";
import "highlight.js/styles/github.css";

const inter = Inter({ subsets: ["latin"] });

const placeholder = "Enter website URL";
const defaultUrl = "google.nl";
const baseUrl = "everyorigin.jwvbremen.nl";

export default function Home() {
  const [url, setUrl] = useState(defaultUrl);
  const [htmlContent, setHtmlContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    hljs.highlightAll();
  }, [htmlContent]);

  const fetchHtml = async () => {
    setLoading(true);
    setKey(Date.now());
    try {
      const response = await fetch(`/api/get?url=${encodeURIComponent(url)}`);
      const { html } = await response.json();
      setHtmlContent(html);
    } catch (error) {
      console.error("Error fetching HTML:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between gap-8 p-24 text-neutral-900 dark:text-neutral-100 ${inter.className}`}
    >
      <div className="relative m-auto place-items-center after:absolute after:top-0 after:-z-20 after:h-[180px] after:w-[360px] after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <h1 className="inline-block text-6xl font-bold">EveryOrigin</h1>
        <h2 className="text-4xl font-bold">The free CORS proxy</h2>
      </div>

      <div className="flex flex-col items-center gap-8">
        <p>
          EveryOrigin is a free CORS proxy that allows you to access any website from any origin. Inspired by
          allorigins.win and whateverorigin.org which was a humble open source clone of AnyOrigin.com. All of them are
          either died or dead slow now. 🩻 So I decided to make my own version. It's free and open source. No Api key
          required. No rate limit. No annoying ads. No tracking. No bullshit. Just a simple CORS proxy. Enjoy!
        </p>
      </div>

      <div className="font-sans">
        <h2 className="mb-2 text-4xl font-bold">Usage</h2>
        <div className="flex rounded p-2 text-neutral-900 dark:bg-neutral-100">
          {`http://${baseUrl}/get?url=`}
          <div
            contentEditable
            className="flex-grow outline-none"
            onInput={(e) => setUrl(e.currentTarget.textContent.replace(placeholder, ""))}
          >
            {defaultUrl}
            {!url && <span className="pointer-events-none text-neutral-400">{placeholder}</span>}
          </div>
          <button
            className="-m-2 ml-2 rounded-r bg-blue-600 px-4 font-bold text-neutral-50 transition-colors hover:bg-blue-800 active:bg-blue-500"
            onClick={fetchHtml}
          >
            Fetch
          </button>
        </div>
      </div>

      <div>
        {loading && <p>Loading...</p>}
        {htmlContent && (
          <pre key={key}>
            <code className="language-html max-w-[calc(100vw-4em)] overflow-hidden rounded bg-neutral-200 p-2 text-neutral-800">
              {htmlContent}
            </code>
          </pre>
        )}
      </div>
    </main>
  );
}
