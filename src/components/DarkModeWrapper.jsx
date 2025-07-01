"use client";

import { useEffect } from "react";

export default function DarkModeWrapper({ children }) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  return <div>{children}</div>;
}
