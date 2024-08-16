import { useNavigate } from "react-router-dom";
import useAuth from "~/hooks/useAuth";
import { setSession } from "~/utils/jwt";

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    setSession(null);
    return navigate("/auth/login");
  }

  return <>{children}</>;
}
