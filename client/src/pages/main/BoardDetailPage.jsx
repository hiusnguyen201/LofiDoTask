import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import { NotFound } from "~/pages";
import WorkspaceLayout from "~/layouts/workspace/WorkspaceLayout";
import HeaderBoardDetail from "~/components/board/HeaderBoardDetail";
import * as api from "~/api";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import ContainerDnd from "~/components/dnd/ContainerDnd";
import ColumnDnd from "~/components/dnd/ColumnDnd";
import RowDnd from "~/components/dnd/RowDnd";

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
      children: [
        {
          id: "4",
          title: "Card 7",
        },
      ],
    },
    {
      id: "2",
      title: "List 2",
      children: [
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
      children: [
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
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    )
      return;

    const updatedStores = [...stores];
    if (type === "COLUMN") {
      const [movedStore] = updatedStores.splice(source.index, 1);
      updatedStores.splice(destination.index, 0, movedStore);
      return setStores(updatedStores);
    } else if (type === "ROW") {
      const storeSourceIndex = stores.findIndex(
        (store) => store.id === source.droppableId
      );
      const storeDestinationIndex = stores.findIndex(
        (store) => store.id === destination.droppableId
      );
      const newSourceItems = [...updatedStores[storeSourceIndex].children];
      const newDestinationItems =
        source.droppableId !== destination.droppableId
          ? [...updatedStores[storeDestinationIndex].children]
          : newSourceItems;

      const [movedItem] = newSourceItems.splice(source.index, 1);
      newDestinationItems.splice(destination.index, 0, movedItem);

      updatedStores[storeSourceIndex] = {
        ...updatedStores[storeSourceIndex],
        children: newSourceItems,
      };

      updatedStores[storeDestinationIndex] = {
        ...updatedStores[storeDestinationIndex],
        children: newDestinationItems,
      };

      return setStores(updatedStores);
    }
  };

  return (
    <>
      {!loading &&
        (!board ? (
          <NotFound />
        ) : (
          <WorkspaceLayout>
            <HeaderBoardDetail board={board} />
            <ContainerDnd
              type="COLUMN"
              className="flex h-full bg-[#07326e] py-3 px-1.5"
              direction="horizontal"
              onDragDrop={handleDragDrop}
            >
              {stores.map((store, index) => (
                <ColumnDnd
                  sx={{
                    width: 272,
                  }}
                  className="p-2 bg-[#101204] rounded-lg text-sm"
                  key={store.id}
                  item={store}
                  index={index}
                  title={store.title}
                  type="ROW"
                >
                  {store.children.map((child, index) => [
                    <RowDnd
                      className="p-2 rounded-lg bg-[#22272B] "
                      key={child.id}
                      item={child}
                      index={index}
                    />,
                  ])}
                </ColumnDnd>
              ))}
            </ContainerDnd>
          </WorkspaceLayout>
        ))}
    </>
  );
}
