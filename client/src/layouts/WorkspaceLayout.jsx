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
  TableColumnIcon,
  CalendarIcon,
  ClipBoardIcon,
  StarRegularIcon,
  StarSolidIcon,
  BoardIcon,
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
  "& .MuiButtonBase-root, & .MuiListItem-root": {
    flexGrow: 0,
    height: 40,
    padding: "0px 4px 0 12px",
    ">.MuiButtonBase-root": {
      padding: 8,
      height: 32,
    },
  },
  "& .MuiListItemIcon-root, & .MuiListItemAvatar-root": {
    minWidth: "auto",
    marginRight: 8,
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

export default function WorkspaceLayout({ children }) {
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
    <Box className="w-full h-screen flex">
      <BadgeDrawer
        className="h-full"
        onClick={handleDrawerOpen}
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
        <Drawer variant="permanent" open={open} onClick={handleDrawerOpen}>
          {open && (
            <>
              {/* Header Drawer */}
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
                    <ListItemText
                      primary={`${user.username}'s workspace`}
                    />
                    <ListItemButton
                      className="!p-2 !h-8"
                      onClick={handleDrawerClose}
                      children={<ChevronLeftIcon />}
                    />
                  </ListItem>
                </List>
              </Box>

              <Divider />

              <List className="">
                <ListItemButton>
                  <ListItemIcon children={<ClipBoardIcon />} />
                  <ListItemText primary={"Boards"} />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon children={<UserIcon />} />
                  <ListItemText primary={"Members"} />
                  <ListItemButton children={<PlusIcon />} />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon children={<GearIcon />} />
                  <ListItemText primary={"Settings"} />
                </ListItemButton>

                <ListItem className="mt-3">
                  <ListItemText primary={"Workspace views"} />
                </ListItem>

                <ListItemButton>
                  <ListItemIcon children={<TableColumnIcon />} />
                  <ListItemText primary={"Table"} />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon children={<CalendarIcon />} />
                  <ListItemText primary={"Calendar"} />
                </ListItemButton>

                <ListItem className="mt-3">
                  <ListItemText primary={"Your boards"} />
                  <ListItemButton children={<PlusIcon />} />
                </ListItem>

                <ListItemButton>
                  <ListItemIcon children={<BoardIcon />} />
                  <ListItemText primary={"Board 1"} />
                  <ListItemButton children={<StarRegularIcon />} />
                </ListItemButton>

                <ListItemButton>
                  <ListItemIcon children={<BoardIcon />} />
                  <ListItemText primary={"Board 2"} />
                  <ListItemButton children={<StarSolidIcon />} />
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

      <Box component={"main"} className="grow">
        {children}
      </Box>
    </Box>
  );
}
