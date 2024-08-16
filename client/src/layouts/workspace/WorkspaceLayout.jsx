import { Box } from "@mui/material";
import AsideBar from "./partials/AsideBar";

function WorkspaceLayout({ children }) {
  return (
    <Box className="w-full h-screen flex">
      <AsideBar />

      <Box component={"main"} className="grow flex flex-col">
        {children}
      </Box>
    </Box>
  );
}

export default WorkspaceLayout;
