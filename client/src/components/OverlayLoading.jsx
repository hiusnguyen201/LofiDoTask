import { Backdrop, CircularProgress } from "@mui/material";

export default function OverlayLoading() {
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      className="absolute w-full h-full"
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
