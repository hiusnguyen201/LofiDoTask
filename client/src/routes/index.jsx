import { useRoutes } from "react-router-dom";

import GuestGuard from "~/guards/GuestGuard";
import AuthGuard from "~/guards/AuthGuard";
import Login from "~/pages/auth/Login";
import Register from "~/pages/auth/Register";
import Home from "~/pages/Home";

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
  ]);
}
