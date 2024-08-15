const globalStyles = {
  a: {
    textDecoration: "none",
    color: "#fff",
  },
  "a:hover": {
    textDecoration: "underline",
  },
  ".scrollbar-thin::-webkit-scrollbar": {
    width: 8,
  },
  ".scrollbar-thin::-webkit-scrollbar-thumb": {
    backgroundColor: "#39434c",
  },
  ".scrollbar-thin::-webkit-scrollbar-track": {
    backgroundColor: "#252b30",
  },
  ".MuiButtonBase-root, .MuiListItem-root": {
    textTransform: "none",
    flexGrow: 0,
    padding: 8,
    height: 32,
  },
  ".MuiListItemIcon-root, .MuiListItemAvatar-root": {
    minWidth: "auto",
    marginRight: 8,
  },
  ".nav-link.active .MuiButtonBase-root": {
    backgroundColor: "#5d5f61",
  },
};

export default globalStyles;
