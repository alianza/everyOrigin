import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { useDarkMode } from "@/lib/utils";
const NextNProgress = dynamic(() => import("nextjs-progressbar"), { loading: () => <div /> });

// import { ToastContainer } from "react-toastify";
const ToastContainer = dynamic(() => import("react-toastify").then((mod) => mod.ToastContainer), {
  ssr: false,
  loading: () => <div />,
});
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const darkMode = useDarkMode();

  return (
    <>
      <NextNProgress color={darkMode ? "#eee" : "#111"} />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
