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
      <audio ref={audioRef} autoPlay loop src={musics[musicIndex].path} />
      <Container maxWidth="xl">
        <Stack
          sx={{
            display: {
              xs: "block",
              md: "flex",
            },
          }}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography component={"p"} margin={"12px 0"}>
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
              children={<PrevIcon width="48px" height="48px" />}
              onClick={handleMinusMusicIndex}
            />

            <IconButton
              onClick={handleTogglePlay}
              sx={{ p: 0 }}
              disableRipple
              children={
                playing ? (
                  <PauseIcon width="72px" height="72px" />
                ) : (
                  <PlayIcon width="72px" height="72px" />
                )
              }
            />

            <IconButton
              sx={{ p: 0 }}
              disableRipple
              children={<NextIcon width="48px" height="48px" />}
              onClick={handlePlusMusicIndex}
            />
          </Stack>

          <Typography
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
            component={"p"}
            margin={"12px 0"}
          >
            <span>Made by: </span>
            <Link
              sx={{
                color: "inherit",
              }}
              target={"_blank"}
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
