import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { useDarkMode } from "@/lib/utils";
const NextNProgress = dynamic(() => import("nextjs-progressbar"), { loading: () => <div /> });

export default function App({ Component, pageProps }) {
  const darkMode = useDarkMode();

  return (
    <>
      <NextNProgress color={darkMode ? "#eee" : "#111"} />
      <Component {...pageProps} />
    </>
  );
}
