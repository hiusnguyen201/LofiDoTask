import { useState, memo, useEffect } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  Box,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Popper,
  IconButton,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
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
  CloseIcon,
} from "~/assets/icons";
import OverlayLoading from "~/components/OverlayLoading";
import ListItemLink from "~/components/ListItemLink";
import * as api from "~/api";
import { Drawer, BadgeDrawer } from "./styleComponents";

const createBoardSchema = Yup.object().shape({
  name: Yup.string("Title must be string").required("Title is required"),
});

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
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const handleOpenPopperBoard = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const formikBoard = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createBoardSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {},
  });

  useEffect(() => {
    async function fetchApi() {
      setIsGettingData(true);
      try {
        const { data } = await api.getBoards();
        setBoards(data.data.boards);
      } catch (e) {
        switch (e.status) {
          case 500:
            break;
        }
      }
      setIsGettingData(false);
    }

    fetchApi();
  }, []);

  const handleDrawerOpen = () => {
    if (open) return;
    setOpen(true);
  };
  const handleDrawerClose = () => {
    if (!open) return;
    setOpen(false);
  };

  const { handleSubmit, isSubmitting, getFieldProps, errors, touched } =
    formikBoard;

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
              <List>
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

            <Box className="relative h-full">
              <OverlayLoading open={isGettingData} />

              <Box className={isGettingData ? "hidden" : "block"}>
                {navList.length > 0 &&
                  navList.map((item, i) => (
                    <List key={i} className="pb-0">
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

                <List>
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
                      const words = b.name.split(" ");
                      return (
                        <ListItemLink
                          key={b._id}
                          to={`/boards/${b.code}/${words.join("-")}`}
                          icon={<BoardIcon />}
                          primary={b.name}
                          lastIcon={
                            b.starredAt ? (
                              <StarSolidIcon />
                            ) : (
                              <StarRegularIcon />
                            )
                          }
                        />
                      );
                    })}
                </List>

                <Popper
                  placement={isMdUp ? "right" : "bottom"}
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                >
                  <Box
                    className="p-4 rounded-lg"
                    sx={{
                      bgcolor: "#282E33",
                    }}
                  >
                    <Box
                      className="flex items-center justify-center relative text-sm"
                      sx={{
                        width: 304,
                      }}
                    >
                      <span>Create board</span>
                      <IconButton
                        className="absolute right-0"
                        onClick={handleOpenPopperBoard}
                        children={<CloseIcon className="text-base" />}
                      />
                    </Box>

                    <Box
                      sx={{
                        maxHeight: 483,
                      }}
                      className="overflow-y-auto"
                    >
                      <Divider className="my-4" />

                      <FormikProvider value={formikBoard}>
                        <Form
                          noValidate
                          autoComplete="off"
                          className="w-full"
                          onSubmit={handleSubmit}
                        >
                          <TextField
                            {...getFieldProps("name")}
                            name="name"
                            type="text"
                            error={Boolean(errors.name && touched.name)}
                            helperText={
                              errors.name && touched.name && errors.name
                            }
                            className="mb-4 w-full"
                            label="Board title"
                            variant="outlined"
                          />

                          <LoadingButton
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                            className="text-base py-2 w-full text-sm normal-case"
                          >
                            Create
                          </LoadingButton>
                        </Form>
                      </FormikProvider>
                    </Box>
                  </Box>
                </Popper>
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
