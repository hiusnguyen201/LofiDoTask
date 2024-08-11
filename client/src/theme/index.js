import { useMemo } from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import useTheme from "~/hooks/useTheme";
import palette from "./palatte";

export default function ThemeConfig({ children }) {
  const themeMode = useTheme();

  const isDark = themeMode === "dark";

  const themeOptions = useMemo(
    () => ({
      palette: isDark
        ? { ...palette.dark, mode: "dark" }
        : { ...palette.light, mode: "light" },
    }),
    [themeMode, isDark]
  );

  const theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
