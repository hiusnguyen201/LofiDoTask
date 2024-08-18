import { Box } from "@mui/material";
import AsideBar from "./partials/AsideBar";

function WorkspaceLayout({ children }) {
  return (
    <Box className="w-full flex">
      <AsideBar />

      <Box
        component={"main"}
        className="grow flex flex-col overflow-y-auto"
        sx={{
          backgroundColor: "#1D2125",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default WorkspaceLayout;
