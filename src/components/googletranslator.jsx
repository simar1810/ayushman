"use client";

import { useEffect, useRef, useState } from "react";

export default function GoogleTranslate() {
  const loaded = useRef(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (!loaded.current) {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };

      loaded.current = true;
    }
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);

    setTimeout(() => {
      const select = document.querySelector("#google_translate_element select");
      if (select) {
        if (selectedLang === "hi") {
          select.value = "hi";
        } else {
          select.value = "en";
        }
        select.dispatchEvent(new Event("change"));
      }
    }, 100);
  };

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }}></div>
      <div className="flex items-center space-x-3">
        <label
          htmlFor="language-select"
          className="text-sm font-medium text-gray-700"
        >
          Select Language:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 bg-white"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>
    </>
  );
}
