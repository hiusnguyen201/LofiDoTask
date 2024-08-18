import { useState, memo } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import {
  List,
  ListItem,
  Box,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Divider,
  Drawer,
  IconButton,
} from "@mui/material";
import {
  PlusIcon,
  UserIcon,
  GearIcon,
  TableColumnIcon,
  CalendarIcon,
  ClipBoardIcon,
  ChevronLeftIcon,
  HomeIcon,
  ChevronRightIcon,
} from "~/assets/icons";
import ListItemLink from "~/components/ListItemLink";
import AsideBoardList from "~/components/board/AsideBoardList";

const navList = [
  {
    title: "",
    children: [
      {
        to: "/",
        icon: <HomeIcon />,
        primary: "Home",
      },
      {
        to: "/workspace/boards",
        icon: <ClipBoardIcon />,
        primary: "Boards",
      },
      {
        to: "/workspace/members",
        icon: <UserIcon />,
        primary: "Members",
        lastIcon: <PlusIcon />,
      },
      {
        to: "/workspace/settings",
        icon: <GearIcon />,
        primary: "Settings",
      },
    ],
  },
  {
    title: "Workspace views",
    children: [
      {
        to: "/workspace/views/table",
        icon: <TableColumnIcon />,
        primary: "Table",
      },
      {
        to: "/workspace/views/calendar",
        icon: <CalendarIcon />,
        primary: "Calendar",
      },
    ],
  },
];

const drawerWidth = {
  open: 260,
  close: 16,
};

const openedMixin = (theme) => ({
  width: drawerWidth.open + "px",
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
  width: drawerWidth.close + "px",
  [theme.breakpoints.up("sm")]: {
    width: drawerWidth.close + "px",
  },
  alignItems: "center",
  position: "relative",
  backgroundColor: "#171a1e",
});

const Bar = styled(Drawer)(({ theme, open }) => ({
  svg: {
    fontSize: "1rem",
  },
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

function AsideBar() {
  const [open, setOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);

  const handleDrawerOpen = () => {
    if (open) return;
    setOpen(true);
  };

  const handleDrawerClose = () => {
    if (!open) return;
    setOpen(false);
  };

  return (
    <Bar
      className="min-h-screen"
      open={open}
      variant="permanent"
      sx={{
        "& .MuiPaper-root": {
          overflow: "unset",
        },
      }}
      onClick={handleDrawerOpen}
    >
      {open && (
        <Box component={"nav"}>
          {/* Header Drawer */}
          <Box className="w-full flex items-center">
            <List className="w-full">
              <ListItem>
                <ListItemAvatar
                  children={
                    <Avatar className="w-8 h-8 mr-2" alt={user.username} />
                  }
                />
                <ListItemText
                  className="text-wrap"
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

          <Divider className="h-0.5" />

          {/* Nav List */}
          <Box
            className="relative w-full overflow-y-auto scrollbar-thin"
            sx={{
              maxHeight: "calc(100vh - 114px)",
            }}
          >
            {navList.length > 0 &&
              navList.map((item, i) => (
                <List key={i} className="w-full">
                  {item.title && (
                    <ListItem>
                      <ListItemText primary={item.title} />
                    </ListItem>
                  )}
                  {item.children &&
                    item.children.map((child, j) => (
                      <ListItemLink
                        key={j}
                        to={child.to}
                        primary={child.primary}
                        icon={child.icon}
                        lastIcon={child.lastIcon}
                      />
                    ))}
                </List>
              ))}

            <AsideBoardList />
          </Box>
        </Box>
      )}

      {!open && (
        <>
          <Box
            className="w-4 h-full max-h-screen fixed"
            sx={{
              backgroundColor: "#414548",
            }}
          >
            <IconButton
              disableRipple
              className="rounded-full absolute top-4"
              sx={{
                backgroundColor: "#414548",
              }}
              children={<ChevronRightIcon />}
            />
          </Box>
        </>
      )}
    </Bar>
  );
}

export default memo(AsideBar);
