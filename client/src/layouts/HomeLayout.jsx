import { Box } from "@mui/material";
import videos from "~/assets/videos";
import Header from "./partials/Header";
import Footer from "./partials/Footer";

export default function HomeLayout({ children }) {
  return (
    <Box className="relative w-full h-screen">
      <video
        className="absolute w-full h-full inset-x-0 inset-y-0 object-cover z-0"
        loop
        autoPlay
        muted
        src={videos.nightClear}
      />
      <Header />
      {children}
      <Footer />
    </Box>
  );
}
