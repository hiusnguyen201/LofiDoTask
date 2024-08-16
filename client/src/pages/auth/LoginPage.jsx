import { Link } from "react-router-dom";
import { Box, Typography, Container, useTheme } from "@mui/material";
import AuthLayout from "~/layouts/auth/AuthLayout";
import images from "~/assets/images";
import {
  FacebookNoColorIcon,
  GithubNoColorIcon,
  GoogleNoColorIcon,
} from "~/assets/icons";
import LoginForm from "~/components/auth/LoginForm";

export default function LoginPage() {
  const themeStyle = useTheme();

  return (
    <AuthLayout>
      <Container component="main" maxWidth="xs">
        <Box
          className="flex flex-col items-center rounded p-8 gap-y-3"
          sx={{
            backgroundColor: themeStyle.palette.backgroundColor[400_95],
          }}
        >
          <img width={100} src={images.logo} alt={"lofi-logo"} />

          <Typography component="h1" variant="h6">
            Log in to continue
          </Typography>

          <LoginForm />

          <Typography component={"p"} className="text-center">
            Or continue with:
          </Typography>

          <Box className="flex items-center justify-center gap-x-3">
            {[
              FacebookNoColorIcon,
              GoogleNoColorIcon,
              GithubNoColorIcon,
            ].map((Icon, index) => (
              <Link className="text-2xl" key={index} to={"#"}>
                <Icon />
              </Link>
            ))}
          </Box>

          <Box
            className="flex items-center justify-center gap-x-1"
            gap={1}
          >
            <Link to={"#"}>Can't log in?</Link>
            <span>•</span>
            <Link to={"/auth/register"}>Create an account</Link>
          </Box>
        </Box>
      </Container>
    </AuthLayout>
  );
}
