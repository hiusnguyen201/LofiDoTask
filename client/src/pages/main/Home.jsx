import { Box, IconButton } from "@mui/material";
import HomeLayout from "~/layouts/home/HomeLayout";
import { MenuIcon as MenuIconModal } from "~/assets/icons";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <HomeLayout>
      <Box className="flex items-center justify-end relative w-full h-full">
        <Box
          className="rounded-full mr-2"
          sx={{
            backgroundColor: "#1d2125",
          }}
        >
          <Link to={"/workspace/boards"}>
            <IconButton className="z-10 p-4">
              <MenuIconModal />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </HomeLayout>
  );
}
