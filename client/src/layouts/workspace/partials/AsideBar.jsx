import { useState, memo } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  Box,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
import {
  PlusIcon,
  UserIcon,
  GearIcon,
  TableColumnIcon,
  CalendarIcon,
  ClipBoardIcon,
  StarSolidIcon,
  ChevronLeftIcon,
} from "~/assets/icons";
import ListItemLink from "~/components/ListItemLink";
import useAuth from "~/hooks/useAuth";
import AsideDrawer from "~/components/AsideDrawer";
import AsideBoardList from "~/components/board/AsideBoardList";

const navList = [
  {
    title: "",
    children: [
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

function AsideBar() {
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
    <AsideDrawer open={open} onDrawerOpen={handleDrawerOpen}>
      {/* Header Drawer */}
      <Box className="w-full flex items-center" open={open}>
        <List className="w-full">
          <ListItem>
            <ListItemAvatar
              children={
                <Avatar
                  className="w-8 h-8"
                  sx={{
                    backgroundColor: "#ffffff29",
                  }}
                  alt={user.username}
                />
              }
            />
            <ListItemText primary={`${user.username}'s workspace`} />
            <ListItemButton
              className="!p-2 !h-8"
              onClick={handleDrawerClose}
              children={<ChevronLeftIcon />}
            />
          </ListItem>
        </List>
      </Box>

      <Divider
        sx={{
          height: "1px",
        }}
      />

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
    </AsideDrawer>
  );
}

export default memo(AsideBar);
