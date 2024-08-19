import { Box } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";
import { useState, memo } from "react";

function RowDnd({ item, index, ...props }) {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <Box className="py-1">
          <Box
            {...props}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {newTitle}
            {provided.placeholder}
          </Box>
        </Box>
      )}
    </Draggable>
  );
}

export default memo(RowDnd);
