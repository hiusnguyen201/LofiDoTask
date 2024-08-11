import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Box,
  Typography,
  TextField,
  Stack,
  Container,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import AuthLayout from "~/layouts/AuthLayout";
import images from "~/assets/images";
import {
  FacebookNoColorIcon,
  GithubNoColorIcon,
  GoogleNoColorIcon,
} from "~/assets/icons";
import * as api from "~/api";

export default function Login() {
  const themeStyle = useTheme();

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
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
          case 500:
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

  const { handleSubmit, getFieldProps, errors, touched, isSubmitting } =
    formik;

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
              style={{ width: "100%" }}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Box
                sx={{
                  mb: 2,
                }}
              >
                <TextField
                  fullWidth
                  id="account"
                  label="Account"
                  type="text"
                  name="account"
                  error={!!(errors.account && touched.account)}
                  helperText={errors.account}
                  {...getFieldProps("account")}
                  autoFocus
                />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={!!errors.password}
                  helperText={errors.password}
                  {...getFieldProps("password")}
                />
              </Box>

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
                <Icon width="24px" height="24px" />
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
