import { alpha } from "@mui/material";

const PRIMARY = {
  main: "#B03860",
  darker: "#8E3150",
};

const COMMON = {
  common: {
    black: "#000",
    white: "#fff",
  },
  primary: { ...PRIMARY },
};

const BLACK = {
  0: "#000000",
  100: "#222222",
  200: "#262626",
  300: "#474747",
  400: "#0A101B",
  400_95: alpha("#0A101B", 0.95),
};

const palette = {
  light: {
    ...COMMON,
    primary: PRIMARY,
    text: {
      primary: "#0A101B",
    },
  },
  dark: {
    ...COMMON,
    text: {
      primary: "#f5f5f5",
    },
    primary: PRIMARY,
    backgroundColor: BLACK[400_95],
    inputBgColor: BLACK[200],
    borderColor: BLACK[300],
  },
};

export default palette;
