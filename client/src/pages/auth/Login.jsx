import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
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
import {
  FacebookNoColorIcon,
  GithubNoColorIcon,
  GoogleNoColorIcon,
  EyeFillIcon,
  EyeOffFillIcon,
} from "~/assets/icons";
import useAuth from "~/hooks/useAuth";

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
  const { login, isAuthenticated, errMessage } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        await login(values.account, values.password);
        if (!isAuthenticated && errMessage) {
          setSubmitting(false);
          return;
        }

        toast.success("Login success");
        resetForm();
        navigate("/");
      } catch (e) {
        let message = "";

        switch (e.response.status) {
          case 400:
            message = "Validation error";
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
          className="flex flex-col items-center rounded p-8 gap-y-3"
          sx={{
            backgroundColor: themeStyle.palette.backgroundColor[400_95],
          }}
        >
          <img width={100} src={images.logo} alt={"lofi-logo"} />

          <Typography component="h1" variant="h6">
            Log in to continue
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
                          onClick={handleShowPassword}
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

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                className="text-base py-2 w-full normal-case"
              >
                Sign In
              </LoadingButton>
            </Form>
          </FormikProvider>

          <Typography component={"p"} className="text-center">
            Or continue with:
          </Typography>

          <Box className="flex items-center justify-center gap-x-3">
            {[
              FacebookNoColorIcon,
              GoogleNoColorIcon,
              GithubNoColorIcon,
            ].map((Icon, index) => (
              <Link key={index} to={"#"}>
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
            <Link to={"#"}>Create an account</Link>
          </Box>
        </Box>
      </Container>
    </AuthLayout>
  );
}
