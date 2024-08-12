import { Navigate } from "react-router-dom";
import useAuth from "~/hooks/useAuth";
import { setSession } from "~/utils/jwt";

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    setSession(null);
    return <Navigate to={"/auth/login"} />;
  }

  return <>{children}</>;
}
