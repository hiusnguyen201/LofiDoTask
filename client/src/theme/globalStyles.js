const globalStyles = {
  a: {
    textDecoration: "none",
    color: "#fff",
  },
  "a:hover": {
    textDecoration: "underline",
  },

  ".smooth-underline": {
    position: "relative",
    textDecoration: "none",
  },
  ".smooth-underline:hover": {
    textDecoration: "none",
  },
  ".smooth-underline::after": {
    content: '""',
    position: "absolute",
    width: "0%",
    height: "1px",
    backgroundColor: "#fff",
    bottom: "-4px",
    left: 0,
  },
  ".smooth-underline:hover::after": {
    width: "100%",
    transition: "width .3s",
  },
  ".smooth-underline:not(:hover)::after": {
    width: "0%",
    transition: "width .3s",
  },
};

export default globalStyles;
