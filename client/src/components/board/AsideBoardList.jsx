import { useEffect, useRef, memo } from "react";
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
import CreateBoardPopperForm from "./CreateBoardPopperForm";

function AsideBoardList() {
  const dispatch = useDispatch();
  const { list: boards, isLoading } = useSelector((state) => state.board);
  const popperRef = useRef();

  useEffect(() => {
    dispatch(
      getAllBoard({
        sortBy: "+starred,+created",
      })
    );
  }, []);

  return (
    <>
      {isLoading ? (
        <OverlayLoading />
      ) : (
        <List className="w-full">
          <ListItem>
            <ListItemText primary={"Your boards"} />

            <CreateBoardPopperForm>
              <ListItemButton children={<PlusIcon />} />
            </CreateBoardPopperForm>
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
        </List>
      )}
    </>
  );
}

export default memo(AsideBoardList);
