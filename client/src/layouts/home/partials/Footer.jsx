import {
  AppBar,
  Typography,
  Container,
  Box,
  IconButton,
  Link,
} from "@mui/material";
import musics from "~/assets/musics";
import { PauseIcon, PrevIcon, PlayIcon, NextIcon } from "~/assets/icons";
import useAudio from "~/hooks/useAudio";

function Footer() {
  const { musicIndex, playing, togglePlay, prevAudio, nextAudio } =
    useAudio();

  return (
    <AppBar
      component={"footer"}
      className="fixed py-3 shadow-none top-auto bottom-0"
      sx={{
        backgroundColor: "transparent",
        backgroundImage: "none",
      }}
    >
      <Container maxWidth="xl">
        <Box className="block sm:flex items-center justify-between">
          <Typography component={"p"} className="my-4 w-44">
            Song name: {musics[musicIndex].name}
          </Typography>

          <Box className="flex items-center justify-center gap-4">
            <IconButton
              className="p-0"
              children={<PrevIcon className="text-5xl" />}
              onClick={prevAudio}
            />

            <IconButton
              className="p-0"
              onClick={togglePlay}
              children={
                playing ? (
                  <PauseIcon className="text-7xl" />
                ) : (
                  <PlayIcon className="text-7xl" />
                )
              }
            />

            <IconButton
              className="p-0"
              children={<NextIcon className="text-5xl" />}
              onClick={nextAudio}
            />
          </Box>

          <Typography className="hidden sm:block" component={"p"}>
            <span>Made by:</span>
            <Link
              className="no-underline ml-2"
              sx={{
                color: "#fff",
              }}
              target="_blank"
              href="https://github.com/hiusnguyen201"
            >
              Nguyen Minh Hieu
            </Link>
          </Typography>
        </Box>
      </Container>
    </AppBar>
  );
}
export default Footer;
