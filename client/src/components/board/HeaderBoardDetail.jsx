import { useState, memo } from "react";
import {
  AppBar,
  Box,
  Button,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import * as api from "~/api";
import {
  StarRegularIcon,
  StarSolidIcon,
  UserGroupIcon,
  UserPlusIcon,
} from "~/assets/icons";

function HeaderBoardDetail({ board }) {
  const [edit, setEdit] = useState(false);
  const [boardName, setBoardName] = useState(board.name);

  function handleTurnOnEdit() {
    setEdit(true);
  }

  function handleTurnOffEdit() {
    const fetchApi = async () => {
      try {
        await api.updateBoard(board._id, { name: boardName });
      } catch (e) {
        const { data } = e.response;
      }
    };

    if (boardName !== board.name) {
      fetchApi();
    }
    setEdit(false);
  }

  const handleChangeName = (e) => {
    const value = e.target.value;
    e.target.style.width = value.length + "ch";
    setBoardName(value);
  };

  return (
    <AppBar
      className="py-3 px-4 flex flex-row items-center justify-between"
      position="static"
    >
      <Box className="flex items-center gap-x-2">
        <Box className="h-10 flex items-center">
          {edit ? (
            <TextField
              sx={{
                "& input": {
                  width: `${boardName.length}ch`,
                },
              }}
              className="inline"
              size="small"
              autoFocus
              onBlur={handleTurnOffEdit}
              onChange={handleChangeName}
              value={boardName || ""}
            />
          ) : (
            <ListItemButton
              className="text-lg py-1.5 px-3.5 rounded"
              onClick={handleTurnOnEdit}
            >
              {boardName}
            </ListItemButton>
          )}
        </Box>

        <ListItemButton
          children={
            board.starredAt ? <StarRegularIcon /> : <StarSolidIcon />
          }
        />

        <ListItemButton children={<UserGroupIcon />} />
      </Box>
      <Box>
        <ListItemButton
          children={
            <Typography className="flex items-center gap-x-1">
              <UserPlusIcon />
              <span>Share</span>
            </Typography>
          }
        />
      </Box>
    </AppBar>
  );
}

export default memo(HeaderBoardDetail);
