import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { initialize } from "~/redux/slices/authSlice";
import Router from "./routes";
import ThemeConfig from "./theme";
import OverlayLoading from "./components/OverlayLoading";

export default function App() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initialize());
  }, []);

  return (
    <ThemeConfig>
      <ToastContainer />
      {!isLoading ? <Router /> : <OverlayLoading />}
    </ThemeConfig>
  );
}
