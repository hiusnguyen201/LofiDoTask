import { useState, useEffect, memo } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Popper,
  Box,
  IconButton,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoard } from "~/redux/slices/boardSlice";
import ListItemLink from "~/components/ListItemLink";
import {
  PlusIcon,
  StarRegularIcon,
  StarSolidIcon,
  BoardIcon,
  CloseIcon,
} from "~/assets/icons";
import OverlayLoading from "~/components/OverlayLoading";
import CreateBoardForm from "./CreateBoardForm";

function AsideBoardList() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { list: boards, isLoading } = useSelector((state) => state.board);
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const handleOpenPopperBoard = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  useEffect(() => {
    dispatch(
      getAllBoard({
        sortBy: "+starred,+created",
      })
    );
  }, []);

  const handleClosePopper = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <OverlayLoading />
      ) : (
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
            boards.map((b) => (
              <ListItemLink
                key={b._id}
                to={`/boards/${b._id}`}
                icon={<BoardIcon />}
                primary={b.name}
                lastIcon={
                  b.starredAt ? <StarSolidIcon /> : <StarRegularIcon />
                }
                // onLastIconClick={() => handleLastIconClick(b._id)}
              />
            ))}

          {/* Create Popper */}
          <Popper
            placement={isMdUp ? "right" : "top"}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Box
              className="p-4 rounded-lg mx-2"
              sx={{
                bgcolor: "#282E33",
              }}
            >
              <Box className="flex items-center justify-center relative text-sm">
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

                <CreateBoardForm onClosePopper={handleClosePopper} />
              </Box>
            </Box>
          </Popper>
        </List>
      )}
    </>
  );
}

export default memo(AsideBoardList);
