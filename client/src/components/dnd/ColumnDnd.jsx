import { Box, ListItemButton, TextField } from "@mui/material";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { updateBoard } from "~/redux/slices/boardSlice";
import { EllipsisIcon } from "~/assets/icons";

function ColumnDnd({ children, item = {}, index, type, ...props }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(item.name);

  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided) => (
        <Box
          className="px-1.5"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box {...props}>
            <Box className="px-2 py-1.5 flex items-center">
              <Box className="grow">
                {!edit ? (
                  <ListItemButton
                    onClick={(e) => {
                      // e.preventDefault();
                      setEdit(true);
                    }}
                    sx={{
                      fontSize: "inherit",
                    }}
                    children={newName}
                  />
                ) : (
                  <TextField
                    value={newName}
                    autoFocus
                    onBlur={(e) => {
                      // e.preventDefault();
                      // if (e.target.value !== newName) {
                      // dispatch(updateBoard(item._id));
                      // }
                      setEdit(false);
                    }}
                    onChange={(e) => setNewName(e.target.value)}
                    variant="standard"
                    className="text-sm"
                    type="text"
                  />
                )}
              </Box>

              <ListItemButton
                className="w-8 flex items-center justify-center"
                children={<EllipsisIcon />}
              />
            </Box>
            <Droppable droppableId={item._id} type={type}>
              {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef}>
                  {children}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        </Box>
      )}
    </Draggable>
  );
}

export default ColumnDnd;
