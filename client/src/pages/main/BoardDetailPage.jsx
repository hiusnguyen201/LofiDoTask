import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { NotFound } from "~/pages";
import WorkspaceLayout from "~/layouts/workspace/WorkspaceLayout";
import HeaderBoardDetail from "~/components/board/HeaderBoardDetail";
import * as api from "~/api";

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
              className="py-3 px-3"
            >
              asc
            </Box>
          </WorkspaceLayout>
        ))}
    </>
  );
}
