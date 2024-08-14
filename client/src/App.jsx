import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routes";
import ThemeConfig from "./theme";
import useAuth from "./hooks/useAuth";

export default function App() {
  const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <ToastContainer />
      {isInitialized ? <Router /> : <></>}
    </ThemeConfig>
  );
}
