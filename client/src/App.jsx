import Router from "./routes";
import ThemeConfig from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <ThemeConfig>
      <ToastContainer />
      <Router />
    </ThemeConfig>
  );
}
