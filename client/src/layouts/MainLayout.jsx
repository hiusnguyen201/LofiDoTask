import { Box } from "@mui/material";
import styled from "@emotion/styled";
import videos from "~/assets/videos";
import Header from "./partials/Header";
import Footer from "./partials/Footer";

const Player = styled("video")({
  objectFit: "cover",
  width: "100%",
  height: "100%",
  position: "absolute",
  left: 0,
  top: 0,
  bottom: 0,
  right: 0,
  zIndex: -1,
});

export default function MainLayout({ children }) {
  return (
    <Box position={"relative"} width={"100%"} height={"100vh"}>
      <Player loop autoPlay muted src={videos.nightClear} />
      <Header />
      {children}
      <Footer />
    </Box>
  );
}
