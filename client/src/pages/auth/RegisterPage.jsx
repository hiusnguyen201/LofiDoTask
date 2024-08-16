import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  TextField,
  Container,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AuthLayout from "~/layouts/auth/AuthLayout";
import images from "~/assets/images";
import { EyeFillIcon, EyeOffFillIcon } from "~/assets/icons";
import useAuth from "~/hooks/useAuth";
import { createMessage } from "~/utils/toast";

const loginSchema = Yup.object().shape({
  username: Yup.string("Username must be string").required(
    "Username is required"
  ),
  email: Yup.string("Email must be string")
    .required("Email is required")
    .email("Email is not right format"),
  password: Yup.string("Password must be string").required(
    "Password is required"
  ),
  confirmPassword: Yup.string("Confirm password must be string")
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Confirm password must match"),
});

export default function RegisterPage() {
  const themeStyle = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, isAuthenticated, errMessage } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const { data } = await register({
          username: values.username,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        });
        if (!isAuthenticated && errMessage) {
          setSubmitting(false);
          return;
        } else {
          navigate("/");
          console.log(data);
          createMessage(data.message, "success");
          resetForm();
        }
      } catch (e) {
        const { data } = e.response;
        createMessage(data.message, "error");
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

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
            Register to continue
          </Typography>

          <FormikProvider value={formik}>
            <Form
              noValidate
              autoComplete="off"
              className="w-full"
              onSubmit={handleSubmit}
            >
              <TextField
                className="mb-4 w-full"
                {...getFieldProps("username")}
                label="Username"
                name="username"
                type="text"
                error={Boolean(errors.username && touched.username)}
                helperText={
                  errors.username && touched.username && errors.username
                }
              />

              <TextField
                className="mb-4 w-full"
                {...getFieldProps("email")}
                label="Email"
                name="email"
                type="text"
                error={Boolean(errors.email && touched.email)}
                helperText={errors.email && touched.email && errors.email}
              />

              <TextField
                className="mb-4"
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
                          onClick={handleToggleShowPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <EyeFillIcon />
                          ) : (
                            <EyeOffFillIcon />
                          )}
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                className="mb-4"
                {...getFieldProps("confirmPassword")}
                label="Confirm Passowrd"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                error={Boolean(
                  errors.confirmPassword && touched.confirmPassword
                )}
                helperText={
                  errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {values.confirmPassword.length > 0 && (
                        <IconButton
                          onClick={handleToggleShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <EyeFillIcon />
                          ) : (
                            <EyeOffFillIcon />
                          )}
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                }}
              />

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                className="text-base py-2 w-full my-3"
              >
                Sign Up
              </LoadingButton>
            </Form>
          </FormikProvider>

          <Box
            className="flex items-center justify-center gap-x-1"
            gap={1}
          >
            <Link to={"/auth/login"}>Already have an account? Log in</Link>
          </Box>
        </Box>
      </Container>
    </AuthLayout>
  );
}
