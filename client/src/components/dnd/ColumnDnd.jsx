import { Box, ListItemButton, Typography } from "@mui/material";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { EllipsisIcon } from "~/assets/icons";

function ColumnDnd({ children, item = {}, index, title, type, ...props }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <Box
          className="px-1.5"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Box {...props}>
            <Box className="px-2 py-1.5 flex items-center">
              <Typography
                className="grow"
                sx={{
                  fontSize: "inherit",
                }}
              >
                {title}
              </Typography>
              <ListItemButton
                className="w-8 flex items-center justify-center"
                children={<EllipsisIcon />}
              />
            </Box>
            <Droppable droppableId={item.id} type={type}>
              {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef}>
                  {children}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>

          {provided.placeholder}
        </Box>
      )}
    </Draggable>
  );
}

export default ColumnDnd;
