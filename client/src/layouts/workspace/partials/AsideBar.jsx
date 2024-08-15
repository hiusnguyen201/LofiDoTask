import { useState, memo, useEffect } from "react";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  Box,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
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
import OverlayLoading from "~/components/OverlayLoading";
import ListItemLink from "~/components/ListItemLink";
import * as api from "~/api";
import { Drawer, BadgeDrawer } from "./styleComponents";
import BoardPopper from "~/components/board/BoardPopper";
import { createMessage } from "~/utils/toast";
import { useLocation } from "react-router-dom";

const navList = [
  {
    title: "",
    childrens: [
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
    childrens: [
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
  const [isGettingData, setIsGettingData] = useState(true);
  const [boards, setBoards] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setAnchorEl(null);
  }, [location]);

  const handleOpenPopperBoard = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  useEffect(() => {
    fetchApiBoardList();
  }, []);

  async function fetchApiBoardList() {
    setIsGettingData(true);
    try {
      const { data } = await api.getBoards();
      setBoards(data.data.boards);
    } catch (e) {
      const { data } = e.response;
      createMessage(data.message, "error");
    }
    setIsGettingData(false);
  }

  async function handleLastIconClick(id) {
    try {
      await api.toggleStarBoard(id);
      fetchApiBoardList();
    } catch (e) {
      const { data } = e.response;
      createMessage(data.message, "error");
    }
    return;
  }

  const handleDrawerOpen = () => {
    if (open) return;
    setOpen(true);
  };
  const handleDrawerClose = () => {
    if (!open) return;
    setOpen(false);
  };

  return (
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

            <Divider />

            <Box className="relative h-full w-full">
              <OverlayLoading open={isGettingData} />

              <Box
                className={
                  isGettingData
                    ? "hidden"
                    : "overflow-y-auto scrollbar-thin"
                }
                sx={{
                  maxHeight: "calc(100% - 128px)",
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

                      {item.childrens &&
                        item.childrens.map((child, j) => (
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

                <List className="w-full">
                  <ListItem>
                    <ListItemText primary={"Your boards"} />
                    <ListItemButton
                      onClick={handleOpenPopperBoard}
                      children={<PlusIcon />}
                    />
                  </ListItem>

                  {boards &&
                    boards.length > 0 &&
                    boards.map((b) => {
                      return (
                        <ListItemLink
                          key={b._id}
                          to={`/boards/${b._id}`}
                          icon={<BoardIcon />}
                          primary={b.name}
                          lastIcon={
                            b.starredAt ? (
                              <StarSolidIcon />
                            ) : (
                              <StarRegularIcon />
                            )
                          }
                          onLastIconClick={() =>
                            handleLastIconClick(b._id)
                          }
                        />
                      );
                    })}
                </List>

                <BoardPopper
                  asideBarData={{
                    handleOpenPopperBoard,
                    fetchApiBoardList,
                    anchorEl,
                  }}
                />
              </Box>
            </Box>
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
  );
}

export default memo(AsideBar);
