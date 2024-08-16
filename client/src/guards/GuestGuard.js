import { useNavigate } from "react-router-dom";
import useAuth from "~/hooks/useAuth";

export default function GuestGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return navigate("/");
  }

  return <>{children}</>;
}
