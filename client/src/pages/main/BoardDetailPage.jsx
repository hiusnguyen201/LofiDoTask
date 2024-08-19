import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBoard } from "~/redux/slices/boardSlice";
import { getAllListAndCardInBoard } from "~/redux/slices/listSlice";
import { NotFound } from "~/pages";
import HeaderBoardDetail from "~/components/board/HeaderBoardDetail";
import ContainerDnd from "~/components/dnd/ContainerDnd";
import ColumnDnd from "~/components/dnd/ColumnDnd";
import RowDnd from "~/components/dnd/RowDnd";
import CreateListForm from "~/components/list/CreateListForm";

export default function BoardDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { item: board, isLoading: isLoadingBoard } = useSelector(
    (state) => state.board
  );
  const { list: lists, isLoading: isLoadingLists } = useSelector(
    (state) => state.list
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data = null } = await dispatch(getBoard(id));
      if (data && data.board) {
        dispatch(getAllListAndCardInBoard(data.board._id));
      }
    };
    fetchData();
  }, []);

  const [stores, setStores] = useState([]);

  useEffect(() => {
    if (!isLoadingLists) {
      setStores(lists);
    }
  }, [isLoadingLists]);

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
      {!isLoadingBoard &&
        (!board ? (
          <NotFound />
        ) : (
          <>
            <HeaderBoardDetail board={board} />
            <ContainerDnd
              type="COLUMN"
              className="flex h-full bg-[#07326e] py-3 px-1.5 items-start overflow-x-auto"
              direction="horizontal"
              onDragDrop={handleDragDrop}
            >
              {stores &&
                stores.length > 0 &&
                stores.map((store, index) => (
                  <ColumnDnd
                    sx={{
                      width: 272,
                    }}
                    className="p-2 bg-[#101204] rounded-lg text-sm"
                    key={store._id}
                    item={store}
                    index={index}
                    type="ROW"
                  >
                    {/* {store.children.length > 0 &&
                      store.children.map((child, index) => [
                        <RowDnd
                          className="p-2 rounded-lg bg-[#22272B]"
                          key={child._id}
                          item={child}
                          index={index}
                        />,
                      ])} */}
                  </ColumnDnd>
                ))}

              <Box className="px-1.5">
                <CreateListForm board={board} />
              </Box>
            </ContainerDnd>
          </>
        ))}
    </>
  );
}
