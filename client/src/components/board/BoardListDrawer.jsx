import { useEffect, useState, memo } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {
  PlusIcon,
  StarRegularIcon,
  StarSolidIcon,
  BoardIcon,
} from "~/assets/icons";
import * as api from "~/api";
import ListItemLink from "~/components/ListItemLink";

function BoardListDrawer({ setIsGettingData }) {
  const [boards, setBoards] = useState([]);

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

  return (
    <List>
      <ListItem>
        <ListItemText primary={"Your boards"} />
        <ListItemButton children={<PlusIcon />} />
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
                b.starredAt ? <StarSolidIcon /> : <StarRegularIcon />
              }
            />
          );
        })}
    </List>
  );
}

export default memo(BoardListDrawer);
