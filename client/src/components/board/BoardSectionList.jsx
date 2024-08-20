import {
  Box,
  IconButton,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoard, toggleStarBoard } from "~/redux/slices/boardSlice";
import { StarRegularIcon, StarSolidIcon } from "~/assets/icons";
import CreateBoardPopperForm from "./CreateBoardPopperForm";

function BoardSectionList() {
  const dispatch = useDispatch();
  const { list: boards } = useSelector((state) => state.board);

  useEffect(() => {
    dispatch(getAllBoard());
  }, []);

  return (
    <List
      sx={{
        mx: -1,
      }}
      className="flex items-center flex-wrap pt-5"
    >
      <CreateBoardPopperForm className="!left-2">
        <ListItem className="md:w-1/3 xl:w-1/4 p-0 px-2 pt-1 pb-5">
          <Box
            className="w-full p-2 rounded relative cursor-pointer"
            sx={{
              backgroundColor: "#A1BDD914",
              "&:hover": {
                backgroundColor: "#A6C5E229",
                transition: ".3s",
              },
            }}
          >
            <Typography className="h-20 w-full flex items-center justify-center">
              Create new board
            </Typography>
          </Box>
        </ListItem>
      </CreateBoardPopperForm>

      {boards &&
        boards.length > 0 &&
        boards.map((item) => (
          <ListItem
            key={item._id}
            className="md:w-1/3 xl:w-1/4 p-0 px-2 pt-1 pb-5"
          >
            <BoardItem board={item} />
          </ListItem>
        ))}
    </List>
  );
}

const BoardItem = memo(({ board }) => {
  const dispatch = useDispatch();
  const [opacity, setOpacity] = useState(0);
  const [x, setX] = useState(16);

  const handleStarBoard = (e) => {
    e.preventDefault();
    dispatch(toggleStarBoard(board._id));
  };

  return (
    <Link to={`/boards/${board._id}`} className="w-full">
      <Box
        className="w-full h-full relative p-2 rounded overflow-hidden"
        onMouseOver={() => {
          setOpacity(1);
          setX(0);
        }}
        onMouseOut={() => {
          setOpacity(0);
          setX(16);
        }}
        sx={{
          backgroundColor: "#094dac",
        }}
      >
        <Typography className="h-20">{board.name}</Typography>

        <motion.div
          initial={{ opacity }}
          animate={{ opacity }}
          className="box"
        >
          <Box
            className="absolute rounded inset-x-0 inset-y-0 flex items-end justify-end"
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.15)",
            }}
          ></Box>
        </motion.div>

        <motion.div
          initial={{
            x: board.starredAt ? 0 : x,
            opacity: board.starredAt ? 1 : opacity,
          }}
          animate={{
            x: board.starredAt ? 0 : x,
            opacity: board.starredAt ? 1 : opacity,
          }}
          className="box relative"
        >
          <IconButton
            onClick={handleStarBoard}
            className="absolute right-0 bottom-0 text-sm"
            sx={{
              marginBottom: "-4px",
              marginRight: "-4px",
            }}
          >
            {board.starredAt ? <StarSolidIcon /> : <StarRegularIcon />}
          </IconButton>
        </motion.div>
      </Box>
    </Link>
  );
});

export default BoardSectionList;
