import { useRef, useState } from "react";
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

function Footer() {
  const [musicIndex, setMusicIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef();

  const handleTogglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    setPlaying(!playing);
  };

  const handleMinusMusicIndex = () => {
    if (musicIndex == 0) {
      setMusicIndex(musics.length - 1);
    } else {
      setMusicIndex(musicIndex - 1);
    }
  };

  const handlePlusMusicIndex = () => {
    if (musicIndex == musics.length - 1) {
      setMusicIndex(0);
    } else {
      setMusicIndex(musicIndex + 1);
    }
  };

  return (
    <AppBar
      component={"footer"}
      className="fixed py-3 shadow-none top-auto bottom-0"
      sx={{
        backgroundColor: "transparent",
        backgroundImage: "none",
      }}
    >
      <audio
        ref={audioRef}
        autoPlay={playing}
        src={musics[musicIndex].path}
        onEnded={handlePlusMusicIndex}
      />
      <Container maxWidth="xl">
        <Box className="block sm:flex items-center justify-between">
          <Typography component={"p"} className="my-4">
            Song name: {musics[musicIndex].name}
          </Typography>

          <Box className="flex items-center justify-center gap-4">
            <IconButton
              className="p-0"
              children={<PrevIcon className="text-5xl" />}
              onClick={handleMinusMusicIndex}
            />

            <IconButton
              onClick={handleTogglePlay}
              className="p-0"
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
              onClick={handlePlusMusicIndex}
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
