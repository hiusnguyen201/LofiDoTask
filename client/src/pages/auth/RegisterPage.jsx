import { Link } from "react-router-dom";
import { Box, Typography, Container, useTheme } from "@mui/material";
import images from "~/assets/images";
import RegisterForm from "~/components/auth/RegisterForm";

export default function RegisterPage() {
  const themeStyle = useTheme();

  return (
    <Container component="main" maxWidth="xs">
      <Box
        className="flex flex-col items-center rounded p-8 gap-y-3"
        sx={{
          backgroundColor: themeStyle.palette.backgroundColor[400_95],
        }}
      >
        <img width={100} src={images.logo} alt={"lofi-logo"} />

        <Typography component="h1" variant="h6">
          Register to continue
        </Typography>

        <RegisterForm />

        <Box className="flex items-center justify-center gap-x-1" gap={1}>
          <Link to={"/auth/login"}>Already have an account? Log in</Link>
        </Box>
      </Box>
    </Container>
  );
}
