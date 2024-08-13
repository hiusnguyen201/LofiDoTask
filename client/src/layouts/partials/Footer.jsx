import { useRef, useState } from "react";
import {
  AppBar,
  Typography,
  Container,
  Stack,
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
      sx={{
        padding: "12px 0",
        backgroundColor: "transparent",
        boxShadow: "none",
        backgroundImage: "none",
        bottom: 0,
        top: "auto",
      }}
      position="fixed"
    >
      <audio
        ref={audioRef}
        autoPlay={playing}
        src={musics[musicIndex].path}
        onEnded={handlePlusMusicIndex}
      />
      <Container maxWidth="xl">
        <Stack
          sx={{
            display: {
              xs: "block",
              sm: "flex",
            },
          }}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography component={"p"} margin={"16px 0"}>
            Song name: {musics[musicIndex].name}
          </Typography>

          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              gap: 2,
            }}
          >
            <IconButton
              sx={{ p: 0 }}
              disableRipple
              children={<PrevIcon sx={{ fontSize: "3.5rem" }} />}
              onClick={handleMinusMusicIndex}
            />

            <IconButton
              onClick={handleTogglePlay}
              sx={{ p: 0 }}
              disableRipple
              children={
                playing ? (
                  <PauseIcon sx={{ fontSize: "4.5rem" }} />
                ) : (
                  <PlayIcon sx={{ fontSize: "4.5rem" }} />
                )
              }
            />

            <IconButton
              sx={{ p: 0 }}
              disableRipple
              children={<NextIcon sx={{ fontSize: "3.5rem" }} />}
              onClick={handlePlusMusicIndex}
            />
          </Stack>

          <Typography
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
            component={"p"}
          >
            <span>Made by:</span>
            <Link
              sx={{
                ml: 1,
                color: "#fff",
                textDecoration: "none",
              }}
              target="_blank"
              href="https://github.com/hiusnguyen201"
            >
              Nguyen Minh Hieu
            </Link>
          </Typography>
        </Stack>
      </Container>
    </AppBar>
  );
}
export default Footer;
