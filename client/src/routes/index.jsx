import { useRoutes } from "react-router-dom";
import WorkspaceLayout from "~/layouts/workspace/WorkspaceLayout";
import HomeLayout from "~/layouts/home/HomeLayout";
import AuthLayout from "~/layouts/auth/AuthLayout";

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
              <AuthLayout>
                <LoginPage />
              </AuthLayout>
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <AuthLayout>
                <RegisterPage />
              </AuthLayout>
            </GuestGuard>
          ),
        },
      ],
    },
    {
      path: "/",
      element: (
        <AuthGuard>
          <HomeLayout>
            <HomePage />
          </HomeLayout>
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
              <WorkspaceLayout>
                <BoardListPage />
              </WorkspaceLayout>
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
              <WorkspaceLayout>
                <BoardDetailPage />
              </WorkspaceLayout>
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
