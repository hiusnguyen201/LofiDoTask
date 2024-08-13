import styled from "@emotion/styled";
import { useState } from "react";
import {
  Drawer as MuiDrawer,
  Avatar,
  Divider,
  List,
  ListItem,
  Box,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Badge,
} from "@mui/material";
import useAuth from "~/hooks/useAuth";
import {
  PlusIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  GearIcon,
} from "~/assets/icons";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  "& .MuiList-root": {
    width: "100%",
  },
  "& .MuiButtonBase-root": {
    flexGrow: 0,
    height: 48,
    padding: "8px 12px",
    ">.MuiButtonBase-root": {
      padding: 8,
      height: 32,
    },
  },
  "& .MuiListItemIcon-root, & .MuiListItemAvatar-root": {
    minWidth: "auto",
  },
  "& .MuiTypography-root": {
    fontSize: 14,
    marginLeft: 8,
  },
  backgroundColor: "#171a1e",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  cursor: "pointer",
  overflowX: "hidden",
  width: `16px`,
  [theme.breakpoints.up("sm")]: {
    width: `16px`,
  },
  alignItems: "center",
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

export default function MainContent() {
  const { user } = useAuth();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    if (open) return;
    setOpen(true);
  };
  const handleDrawerClose = () => {
    if (!open) return;
    setOpen(false);
  };

  return (
    <>
      <BadgeDrawer
        onClick={handleDrawerOpen}
        open={open}
        badgeContent={
          !open && (
            <Box className="flex justify-center items-center rounded-full w-7 h-7 cursor-pointer bg-[#ffffff29]">
              <ChevronRightIcon />
            </Box>
          )
        }
      >
        <Drawer variant="permanent" open={open} onClick={handleDrawerOpen}>
          {open && (
            <>
              <Box className="w-full flex items-center" open={open}>
                <List>
                  <ListItem>
                    <ListItemAvatar
                      children={
                        <Avatar
                          className="w-8 h-8"
                          sx={{
                            backgroundColor: "#ffffff29",
                          }}
                          src="/static/images/avatar/1.jpg"
                          alt={user.username}
                        />
                      }
                    />
                    <ListItemText primary={user.username} />
                    <ListItemButton
                      className="!p-2 !h-8"
                      onClick={handleDrawerClose}
                      children={<ChevronLeftIcon />}
                    />
                  </ListItem>
                </List>
              </Box>
              <Divider />
              <List>
                <ListItemButton>
                  <ListItemIcon children={<UserIcon />} />
                  <ListItemText primary={"Members"} />
                  <ListItemButton children={<PlusIcon />} />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon children={<GearIcon />} />
                  <ListItemText primary={"Settings"} />
                </ListItemButton>
              </List>
            </>
          )}
          {!open && (
            <Box
              className="w-full h-full"
              sx={{
                backgroundColor: "#ffffff29",
              }}
            ></Box>
          )}
        </Drawer>
      </BadgeDrawer>

      <Box component="main" className="grow p-6"></Box>
    </>
  );
}
