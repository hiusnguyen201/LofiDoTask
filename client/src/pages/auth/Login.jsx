import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Container,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import AuthLayout from "~/layouts/AuthLayout";
import images from "~/assets/images";
import {
  FacebookNoColorIcon,
  GithubNoColorIcon,
  GoogleNoColorIcon,
  EyeFill,
  EyeOffFill,
} from "~/assets/icons";
import * as api from "~/api";
import { useState } from "react";

const loginSchema = Yup.object().shape({
  account: Yup.string("Account must be string").required(
    "Account is required"
  ),
  password: Yup.string("Password must be string").required(
    "Password is required"
  ),
});

export default function Login() {
  const themeStyle = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        const { data } = await api.login(values);
        if (data.success) {
          resetForm();
        }
      } catch (e) {
        const response = e.response;
        let message = "";
        switch (response.status) {
          case 400:
            const errors = {};
            response?.data?.errors.map((err) => {
              errors[err.field] = err.message;
            });
            setErrors(errors);
            break;
          case 401:
          case 404:
            message = "Invalid account or password";

            break;
          default:
            message = "Server error";
            break;
        }

        if (message) {
          toast.error(message, {
            position: "top-center",
          });
        }
      }
    },
  });

  const {
    handleSubmit,
    getFieldProps,
    errors,
    touched,
    isSubmitting,
    values,
  } = formik;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: themeStyle.palette.backgroundColor[400_95],
            borderRadius: 4,
            padding: "36px",
          }}
        >
          <img width={100} src={images.logo} alt={"lofi-logo"} />

          <Typography
            sx={{
              mb: 2,
            }}
            component="h1"
            variant="h5"
          >
            Log in to continue
          </Typography>

          <FormikProvider value={formik} sx={{ mt: 1 }}>
            <Form
              noValidate
              autoComplete="off"
              style={{ width: "100%" }}
              onSubmit={handleSubmit}
            >
              <TextField
                sx={{
                  mb: 2,
                }}
                fullWidth
                {...getFieldProps("account")}
                label="Account"
                name="account"
                type="text"
                error={Boolean(errors.account && touched.account)}
                helperText={
                  errors.account && touched.account && errors.account
                }
              />

              <TextField
                fullWidth
                {...getFieldProps("password")}
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                error={Boolean(errors.password && touched.password)}
                helperText={
                  errors.password && touched.password && errors.password
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {values.password.length > 0 && (
                        <IconButton
                          onClick={handleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <EyeFill /> : <EyeOffFill />}
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={isSubmitting}
                sx={{ mt: 3, mb: 2, fontSize: "inherit" }}
              >
                Sign In
              </LoadingButton>
            </Form>
          </FormikProvider>

          <Typography component={"p"} textAlign={"center"} sx={{ mb: 2 }}>
            Or continue with:
          </Typography>

          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={3}
            sx={{ mb: 1 }}
          >
            {[
              FacebookNoColorIcon,
              GoogleNoColorIcon,
              GithubNoColorIcon,
            ].map((Icon, index) => (
              <Link key={index} to={"#"}>
                <Icon />
              </Link>
            ))}
          </Stack>

          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
          >
            <Link to={"#"}>Can't log in?</Link>
            <span>•</span>
            <Link to={"#"}>Create an account</Link>
          </Stack>
        </Box>
      </Container>
    </AuthLayout>
  );
}
