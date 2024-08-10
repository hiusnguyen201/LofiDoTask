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

const CardStyle = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 16,
  fontSize: 16,
  padding: "24px 36px",
  backgroundColor: theme.palette.backgroundColor,
  position: "relative",
  borderRadius: 4,
  width: 400,
}));

const InputStyle = styled(TextField)(({ theme }) => ({
  width: "100%",
  backgroundColor: theme.palette.inputBgColor,
  border: 0,
  borderRadius: "inherit",
  "& label.Mui-focused": {
    color: theme.palette.text.primary,
  },
}));

const TypographyStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const ButtonStyle = styled(Button)(({ theme }) => ({
  display: "block",
  fontSize: "inherit",
  width: "100%",
  textTransform: "capitalize",
  backgroundColor: theme.palette.primary,
  backgroundColor: theme.palette.primary.darker,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Login() {
  return (
    <AuthLayout>
      <CardStyle>
        <CardMedia
          component={"img"}
          sx={{ width: 100 }}
          image={images.logo}
          alt={"lofi-logo"}
        />

        <TypographyStyle
          component="h1"
          sx={{
            fontSize: 20,
          }}
        >
          Log in to continue
        </TypographyStyle>

        <InputStyle variant="outlined" type="email" label="Email" />

        <InputStyle variant="outlined" type="password" label="Password" />

        <ButtonStyle variant="contained">Continue</ButtonStyle>

        <TypographyStyle component={"p"}>
          Or continue with:
        </TypographyStyle>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {[FacebookNoColorIcon, GoogleNoColorIcon, GithubNoColorIcon].map(
            (Icon, index) => (
              <Link
                key={index}
                href={"#"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon width="24px" height="24px" />
              </Link>
            )
          )}
        </Box>
      </CardStyle>
    </AuthLayout>
  );
}
