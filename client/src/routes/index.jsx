import { useRoutes } from "react-router-dom";

import Login from "~/pages/auth/Login";
import Register from "~/pages/auth/Register";

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);
}
