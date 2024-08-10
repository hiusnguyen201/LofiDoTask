import { styled } from "@mui/system";
import images from "~/assets/images";

const RootStyle = styled("div")({
  height: "100vh",
  width: "100%",
  background: `url(${images.authBackGround}) center / cover no-repeat`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export default function AuthLayout({ children }) {
  return <RootStyle className="wrapper">{children}</RootStyle>;
}
