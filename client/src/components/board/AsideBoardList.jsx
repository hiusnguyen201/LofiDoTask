import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { toggleStarBoard } from "~/redux/slices/boardSlice";
import AsideItemBoard from "./AsideItemBoard";
import { StarRegularIcon, StarSolidIcon, BoardIcon } from "~/assets/icons";
import OverlayLoading from "~/components/OverlayLoading";

function AsideBoardList() {
  const dispatch = useDispatch();
  const { list: boards, isLoading } = useSelector((state) => state.board);
  const starredBoards = boards
    .filter((item) => item.starredAt)
    .sort((a, b) => new Date(a.starredAt) - new Date(b.starredAt));
  const unstarredBoards = boards.filter((item) => !item.starredAt);
  const sortedBoards = [...starredBoards, ...unstarredBoards];

  const handleLastIconClick = async (id) => {
    await dispatch(toggleStarBoard(id));
  };

  return (
    <Box className="relative grow">
      {isLoading ? (
        <OverlayLoading />
      ) : (
        <>
          {sortedBoards &&
            sortedBoards.length > 0 &&
            sortedBoards.map((b) => (
              <AsideItemBoard
                key={b._id}
                to={`/boards/${b._id}`}
                icon={<BoardIcon />}
                primary={b.name}
                lastIcon={
                  b.starredAt ? <StarSolidIcon /> : <StarRegularIcon />
                }
                onLastIconClick={(e) => {
                  e.preventDefault();
                  handleLastIconClick(b._id);
                }}
              />
            ))}
        </>
      )}
    </Box>
  );
}

export default memo(AsideBoardList);
