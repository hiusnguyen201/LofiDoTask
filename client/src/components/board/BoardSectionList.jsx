import { Box, List, ListItem } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoard } from "~/redux/slices/boardSlice";
import { Link } from "react-router-dom";

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
      {boards &&
        boards.length > 0 &&
        boards.map((item) => (
          <ListItem
            key={item._id}
            className="sm:w-1/3 xl:w-1/4 p-0 px-2 pt-1 pb-5"
          >
            <Link
              to={`/boards/${item._id}`}
              className="w-full p-2 rounded bg-[#07326e]"
            >
              <Box className="h-20">{item.name}</Box>
            </Link>
          </ListItem>
        ))}
    </List>
  );
}

export default BoardSectionList;
