import { useState, useEffect, memo } from "react";
import { useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoard } from "~/redux/slices/boardSlice";
import ListItemLink from "~/components/ListItemLink";
import {
  PlusIcon,
  StarRegularIcon,
  StarSolidIcon,
  BoardIcon,
} from "~/assets/icons";
import OverlayLoading from "~/components/OverlayLoading";
import AsideBoardPopper from "~/components/board/AsideBoardPopper";
import { createMessage } from "~/utils/toast";
import * as api from "~/api";

function AsideBoardList() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { list: boards, isLoading } = useSelector((state) => state.board);

  const handleOpenPopperBoard = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  useEffect(() => {
    dispatch(getAllBoard());
  }, [dispatch]);

  useEffect(() => {
    setAnchorEl(null);
  }, [location]);

  async function handleLastIconClick(id) {
    try {
      await api.toggleStarBoard(id);
    } catch (e) {
      const { data } = e.response;
      createMessage(data.message, "error");
    }
    return;
  }

  return (
    <>
      <OverlayLoading open={isLoading} />

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
              onLastIconClick={() => handleLastIconClick(b._id)}
            />
          ))}

        <AsideBoardPopper
          asideBarData={{
            handleOpenPopperBoard,
            anchorEl,
          }}
        />
      </List>
    </>
  );
}

export default memo(AsideBoardList);
