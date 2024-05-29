// components/DarkThemeHandler.js
"use client";

import { useState, useEffect } from "react";

const DarkThemeHandler = () => {
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    const isUserColorTheme = localStorage.getItem("color-theme");
    const isOsColorTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
    const userTheme = isUserColorTheme
      ? isUserColorTheme
      : isOsColorTheme;

    setThemeMode(userTheme);
    document.documentElement.setAttribute("color-theme", userTheme);
  }, []);

  const toggleThemeMode = () => {
    const newTheme = themeMode === "dark" ? "light" : "dark";
    setThemeMode(newTheme);
    localStorage.setItem("color-theme", newTheme);
    document.documentElement.setAttribute("color-theme", newTheme);
  };

  return (
    <div>
      <button onClick={toggleThemeMode}>
        {themeMode === "dark" ? "라이트" : "다크"} 모드
      </button>
    </div>
  );
};

export default DarkThemeHandler;
