import { Backdrop, CircularProgress } from "@mui/material";

export default function OverlayLoading({ open }) {
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      className="absolute"
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
