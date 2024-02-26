import { useEffect, useState } from "react";

export function useDarkMode(options = { initialMode: null }) {
  const [darkMode, setDarkMode] = useState(options.initialMode);

  useEffect(() => {
    const onColorSchemeChange = ({ matches }) => setDarkMode(matches);
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    matchMedia.addEventListener("change", onColorSchemeChange);
    setDarkMode(matchMedia.matches); // set initial state

    return () => matchMedia.removeEventListener("change", onColorSchemeChange);
  }, []);

  return darkMode;
}
