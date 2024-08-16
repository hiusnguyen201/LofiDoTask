import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { NotFound } from "~/pages";
import WorkspaceLayout from "~/layouts/workspace/WorkspaceLayout";
import HeaderBoardDetail from "~/components/board/HeaderBoardDetail";
import * as api from "~/api";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";

export default function BoardDetailPage() {
  const { id } = useParams();
  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoard();
  }, []);

  async function fetchBoard() {
    try {
      const { data } = await api.getBoard(id);
      setBoard(data.data.board);
    } catch (e) {
      setBoard(null);
    } finally {
      setLoading(false);
    }
  }

  const initialTasks = [
    {
      id: "1",
      title: "List 1",
      items: [
        {
          id: "4",
          title: "Card 7",
        },
      ],
    },
    {
      id: "2",
      title: "List 2",
      items: [
        {
          id: "5",
          title: "Card 23",
        },
        {
          id: "6",
          title: "Card 33",
        },
        {
          id: "7",
          title: "Card 34",
        },
        {
          id: "8",
          title: "Card 31",
        },
      ],
    },
    {
      id: "3",
      title: "List 3",
      items: [
        {
          id: "9",
          title: "Card 35",
        },
        {
          id: "10",
          title: "Card 37",
        },
      ],
    },
  ];

  const [stores, setStores] = useState(initialTasks);
  const handleDragDrop = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderStores = [...stores];
      const [removedStore] = reorderStores.splice(source.index, 1);
      reorderStores.splice(destination.index, 0, removedStore);
      return setStores(reorderStores);
    }

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );
    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [removedItem] = newSourceItems.splice(source.index, 1);
    newDestinationItems.splice(destination.index, 0, removedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };

    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    return setStores(newStores);
  };

  return (
    <>
      {!loading &&
        (!board ? (
          <NotFound />
        ) : (
          <WorkspaceLayout>
            <HeaderBoardDetail board={board} />
            <Box
              sx={{
                height: "calc(100% - 64px)",
              }}
              className="py-3 px-3 bg-[#fff]"
            >
              <DragDropContext onDragEnd={handleDragDrop}>
                <Droppable
                  droppableId="droppable"
                  type="group"
                  direction="horizontal"
                >
                  {(provided) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="text-black flex h-full"
                    >
                      {stores.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided) => (
                            <Box
                              className="border border-black mr-3"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <ListCard {...item} />
                            </Box>
                          )}
                        </Draggable>
                      ))}
                      {/* Hold the height Box */}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </DragDropContext>
            </Box>
          </WorkspaceLayout>
        ))}
    </>
  );
}

function ListCard({ id, title, items = [] }) {
  return (
    <Box
      className="flex flex-col h-full p-2"
      sx={{
        width: 272,
      }}
    >
      <Box>{title}</Box>
      <Droppable droppableId={id}>
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="w-full grow"
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <Box
                    className="border border-black w-full p-2 mt-3"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.title}
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
}
