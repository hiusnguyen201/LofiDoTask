import { Box } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

function RowDnd({ item, index, ...props }) {
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
            {item.title}
          </Box>
          {provided.placeholder}
        </Box>
      )}
    </Draggable>
  );
}

export default RowDnd;
