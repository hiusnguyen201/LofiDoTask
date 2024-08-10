import { styled } from "@mui/system";
import {
  Card,
  CardMedia,
  Typography,
  TextField,
  Button,
  Box,
  Link,
} from "@mui/material";

import AuthLayout from "~/layouts/AuthLayout";
import images from "~/assets/images";
import {
  FacebookNoColorIcon,
  GithubNoColorIcon,
  GoogleNoColorIcon,
} from "~/assets/icons";

const CardStyle = styled(Card)({
  padding: "24px 36px",
  backgroundColor: "rgba(10, 16, 27, 0.9)",
  position: "relative",
  borderRadius: 4,
  textAlign: "center",
  width: 400,
});

export default function Login() {
  return (
    <AuthLayout>
      <CardStyle>
        <CardMedia
          sx={{ width: "100px", margin: "0 auto", marginBottom: "8px" }}
          component={"img"}
          image={images.logo}
          alt={"lofi-logo"}
        />
        <Typography
          sx={{
            color: "#eeeeee",
            fontSize: 18,
            marginBottom: "24px",
          }}
          component="h1"
        >
          Log in to continue
        </Typography>
        <TextField
          variant="outlined"
          InputProps={{
            type: "email",
            sx: {
              color: "#f5f5f5",
            },
          }}
          sx={{
            width: "100%",
            marginBottom: "16px",
            backgroundColor: "#222222",
            borderRadius: "inherit",
            border: "none",
            "& label": {
              color: "#f5f5f5",
            },
            "& label.Mui-focused": {
              color: "#f5f5f5",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#474747",
              },
            },
          }}
          label="Email"
        />
        <TextField
          variant="outlined"
          InputProps={{
            type: "password",
            sx: {
              color: "#f5f5f5",
            },
          }}
          sx={{
            width: "100%",
            backgroundColor: "#222222",
            marginBottom: "24px",
            borderRadius: "inherit",
            border: "none",
            "& label": {
              color: "#f5f5f5",
            },
            "& label.Mui-focused": {
              color: "#f5f5f5",
            },
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#474747",
              },
            },
          }}
          label="Password"
        />
        <Button
          sx={{
            width: "100%",
            textTransform: "capitalize",
            fontSize: "16px",
            marginBottom: "16px",
            backgroundColor: "#8E3150",
            "&:hover": {
              backgroundColor: "#B03860",
            },
          }}
          variant="contained"
        >
          Continue
        </Button>
        <Typography
          component={"p"}
          sx={{
            color: "#f5f5f5",
            marginBottom: "16px",
          }}
        >
          Or continue with:
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "18px",
          }}
        >
          <Link
            href={"#"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FacebookNoColorIcon width="24px" height="24px" />
          </Link>
          <Link
            href={"#"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GoogleNoColorIcon width="24px" height="24px" />
          </Link>
          <Link
            href={"#"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GithubNoColorIcon width="24px" height="24px" />
          </Link>
        </Box>
      </CardStyle>
    </AuthLayout>
  );
}
