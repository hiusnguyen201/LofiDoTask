import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WorkspaceLayout from "~/layouts/workspace/WorkspaceLayout";
import * as api from "~/api";
import NotFound from "~/pages/errors/NotFound";

export default function BoardList() {
  const { id } = useParams();
  const [board, setBoard] = useState(id);
  useEffect(() => {
    fetchBoard();
  }, []);

  async function fetchBoard() {
    try {
      const { data } = await api.getBoard(board);
      setBoard(data.data.board);
    } catch (e) {
      setBoard(null);
    }
  }

  return (
    <>{board ? <WorkspaceLayout>Hello</WorkspaceLayout> : <NotFound />}</>
  );
}
