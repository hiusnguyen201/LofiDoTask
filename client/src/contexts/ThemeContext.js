const { createContext, useState } = require("react");

const ThemeContext = createContext("dark");

function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const values = { themeMode, setThemeMode };

  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
