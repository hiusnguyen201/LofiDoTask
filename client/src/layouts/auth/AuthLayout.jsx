import images from "~/assets/images";
import { Box } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        background: `url(${images.authBackGround}) center / cover no-repeat`,
      }}
      height={"100vh"}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {children}
    </Box>
  );
}
