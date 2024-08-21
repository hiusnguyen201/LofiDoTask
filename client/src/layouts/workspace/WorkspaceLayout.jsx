import { Box } from "@mui/material";
import { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoard } from "~/redux/slices/boardSlice";
import AsideBar from "./partials/AsideBar";

function WorkspaceLayout({ children }) {
  const dispatch = useDispatch();
  const { isUpdated: isUpdatedBoards } = useSelector(
    (state) => state.board
  );

  useEffect(() => {
    dispatch(
      getAllBoard({
        sortBy: "+createdAt",
      })
    );
  }, [dispatch, isUpdatedBoards]);

  return (
    <Box className="w-full flex items-stretch">
      <AsideBar />

      <Box
        component="main"
        className="grow flex flex-col overflow-y-auto"
        sx={{
          backgroundColor: "#1D2125",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default memo(WorkspaceLayout);
