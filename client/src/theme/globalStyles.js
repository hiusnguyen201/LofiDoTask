const globalStyles = {
  "p, span": {
    textOverflow: "ellipsis",
    overflow: "hidden",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },

  "a.active .MuiButtonBase-root": {
    backgroundColor: "#f0f0f04d",
  },
  ".MuiInputBase-root": {
    width: 250,
  },
  ".MuiListItemAvatar-root, .MuiListItemIcon-root": {
    minWidth: "auto",
  },
  ".MuiButtonBase-root": {
    flex: "unset",
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

  "::-webkit-scrollbar": {
    width: "5px",
  },
  // ".MuiDrawer-root:hover ::-webkit-scrollbar-thumb": {
  //   backgroundColor: "#555",
  // },
  "::-webkit-scrollbar-thumb": {
    borderRadius: 4,
    backgroundColor: "#555",
  },
};

export default globalStyles;
