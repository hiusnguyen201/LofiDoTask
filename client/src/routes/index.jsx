import { useRoutes } from "react-router-dom";

import GuestGuard from "~/guards/GuestGuard";
import AuthGuard from "~/guards/AuthGuard";
import {
  LoginPage,
  RegisterPage,
  BoardListPage,
  BoardDetailPage,
  NotFound,
  HomePage,
} from "~/pages";

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <HomePage />
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
              <BoardListPage />
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
              <BoardDetailPage />
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
