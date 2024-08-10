import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import {
  Card,
  CardMedia,
  Typography,
  TextField,
  Button,
  Box,
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
  fontSize: "inherit",
  backgroundColor: theme.palette.inputBgColor,
  border: 0,
  borderRadius: "inherit",
  "& label.Mui-focused": {
    color: theme.palette.text.primary,
  },
  "& fieldset": {
    borderColor: "transparent",
  },
}));

const TypographyStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "inherit",
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

const LinkStyle = styled(Link)({
  height: "100%",
  color: "inherit",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const handleUpdateData = (e) => {
    const field = e.target.name;
    setData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleUpdateSubmit = (e) => {
    setIsSubmit(true);
  };

  useEffect(() => {
    if (!isSubmit) return;

    // Fetch Api
    const fetch = () => {};

    fetch();
  }, [isSubmit]);

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

        <InputStyle
          variant="outlined"
          type="email"
          name="email"
          label="Email"
          onChange={handleUpdateData}
        />

        <InputStyle
          variant="outlined"
          type="password"
          name="password"
          label="Password"
          onChange={handleUpdateData}
        />

        <ButtonStyle onClick={handleUpdateSubmit} variant="contained">
          Continue
        </ButtonStyle>

        <TypographyStyle component={"p"}>
          Or continue with:
        </TypographyStyle>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            height: 24,
          }}
        >
          {[FacebookNoColorIcon, GoogleNoColorIcon, GithubNoColorIcon].map(
            (Icon, index) => (
              <LinkStyle key={index} to={"#"}>
                <Icon width="24px" height="24px" />
              </LinkStyle>
            )
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <LinkStyle to={"#"}>Can't log in?</LinkStyle>
          <span>•</span>
          <LinkStyle to={"#"}>Create an account</LinkStyle>
        </Box>
      </CardStyle>
    </AuthLayout>
  );
}
