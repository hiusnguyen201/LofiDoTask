import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
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
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPopperBoard = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  async function fetchApiBoardList() {
    setLoading(true);
    try {
      const { data } = await api.getBoards();
      setBoards(data.data.boards);
    } catch (e) {
      const { data } = e.response;
      createMessage(data.message, "error");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchApiBoardList();
  }, []);

  useEffect(() => {
    setAnchorEl(null);
  }, [location]);

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

  return (
    <>
      <OverlayLoading open={loading} />

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
                  b.starredAt ? <StarSolidIcon /> : <StarRegularIcon />
                }
                onLastIconClick={() => handleLastIconClick(b._id)}
              />
            );
          })}

        <AsideBoardPopper
          asideBarData={{
            handleOpenPopperBoard,
            fetchApiBoardList,
            anchorEl,
          }}
        />
      </List>
    </>
  );
}

export default AsideBoardList;
