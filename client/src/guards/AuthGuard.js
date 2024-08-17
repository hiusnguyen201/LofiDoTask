import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} />;
  }

  return <>{children}</>;
}
