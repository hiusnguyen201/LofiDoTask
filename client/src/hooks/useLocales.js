import { useState } from "react";

const LANGS = [
  {
    value: "vi",
    label: "Tiếng Việt",
  },
  {
    value: "en",
    label: "English",
  },
];

export default function useLocales() {
  const langStorage = localStorage.getItem("lang");
  const [lang, setLang] = useState(langStorage);

  const handleChangeLanguage = (newLang) => {
    setLang(newLang);
  };

  const currentLang = LANGS.find((item) => item.value === lang);
  if (!currentLang) {
    localStorage.setItem("lang", "en");
    handleChangeLanguage("en");
  }

  return {
    currentLang,
    allLang: LANGS,
  };
}
