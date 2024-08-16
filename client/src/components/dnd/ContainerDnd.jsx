import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
            className="h-full w-full"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Box {...props}>{children}</Box>

            {/* Hold the height Box */}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default ContainerDnd;
