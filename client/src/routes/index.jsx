import { useRoutes } from "react-router-dom";

import GuestGuard from "~/guards/GuestGuard";
import AuthGuard from "~/guards/AuthGuard";
import Login from "~/pages/auth/Login";
import Register from "~/pages/auth/Register";
import Home from "~/pages/main/Home";
import BoardList from "~/pages/main/BoardList";
import Board from "~/pages/main/Board";
import NotFound from "~/pages/errors/NotFound";

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <Home />
        </AuthGuard>
      ),
    },
    {
      path: "/workspace",
      children: [
        {
          path: "boards",
          element: (
            <AuthGuard>
              <BoardList />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: "/boards",
      children: [
        {
          path: ":id",
          element: (
            <AuthGuard>
              <Board />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
}
