import { memo } from "react";
import styled from "@emotion/styled";
import { Box, Drawer as MuiDrawer, Badge } from "@mui/material";
import { ChevronRightIcon } from "~/assets/icons";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: "unset",
  "& .MuiButtonBase-root, & .MuiListItem-root": {
    padding: "4px 4px 4px 12px",
    ">.MuiButtonBase-root": {
      padding: 8,
    },
  },
  "& .MuiTypography-root": {
    fontSize: 14,
  },
  backgroundColor: "#171a1e",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  cursor: "pointer",
  width: `16px`,
  [theme.breakpoints.up("sm")]: {
    width: `16px`,
  },
  alignItems: "center",
  position: "relative",
  backgroundColor: "#171a1e",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  svg: {
    fontSize: "1rem",
  },
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const BadgeDrawer = styled(Badge)(({ open }) => ({
  "& .MuiBadge-badge": {
    zIndex: 1200,
    borderRadius: "100%",
    backgroundColor: open ? "transparent" : "#171a1e",
    color: "#B6C2CF",
    top: 30,
    padding: 0,
    height: "auto",
    svg: {
      fontSize: "0.8rem",
    },
  },
}));

function AsideDrawer({ children, open, onDrawerOpen }) {
  return (
    <BadgeDrawer
      component="div"
      className="h-full"
      onClick={onDrawerOpen}
      open={open}
      badgeContent={
        !open && (
          <Box
            className="flex justify-center items-center rounded-full w-7 h-7 cursor-pointer"
            sx={{
              backgroundColor: "#ffffff29",
            }}
          >
            <ChevronRightIcon />
          </Box>
        )
      }
    >
      <Drawer variant="permanent" open={open} onClick={onDrawerOpen}>
        {open ? (
          <Box className="flex flex-col item-center">{children}</Box>
        ) : (
          <Box
            className="w-full h-full"
            sx={{
              backgroundColor: "#ffffff29",
            }}
          ></Box>
        )}
      </Drawer>
    </BadgeDrawer>
  );
}

export default memo(AsideDrawer);
