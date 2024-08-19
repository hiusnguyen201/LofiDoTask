import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { memo } from "react";
import { Box } from "@mui/material";

function ContainerDnd({
  children,
  onDragDrop,
  type,
  direction = "vertical",
  ...props
}) {
  return (
    <DragDropContext onDragEnd={onDragDrop}>
      <Droppable droppableId="droppable" type={type} direction={direction}>
        {(provided) => (
          <Box
            className="w-full h-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Box {...props}>
              {children}
              {provided.placeholder}
            </Box>

            {/* Hold the height Box */}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default memo(ContainerDnd);
