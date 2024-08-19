import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { register } from "~/redux/slices/authSlice";
import { EyeFillIcon, EyeOffFillIcon } from "~/assets/icons";

const registerSchema = Yup.object().shape({
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

function RegisterForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(register(values));
      setSubmitting(false);
    },
  });

  const { handleSubmit, getFieldProps, errors, touched, isSubmitting, values } =
    formik;

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
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
          value={values.username}
          type="text"
          error={Boolean(errors.username && touched.username)}
          helperText={errors.username && touched.username && errors.username}
        />

        <TextField
          className="mb-4 w-full"
          {...getFieldProps("email")}
          label="Email"
          name="email"
          value={values.email}
          type="text"
          error={Boolean(errors.email && touched.email)}
          helperText={errors.email && touched.email && errors.email}
        />

        <TextField
          className="mb-4"
          {...getFieldProps("password")}
          label="Password"
          name="password"
          value={values.password}
          type={showPassword ? "text" : "password"}
          error={Boolean(errors.password && touched.password)}
          helperText={errors.password && touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {values.password.length > 0 && (
                  <IconButton onClick={handleToggleShowPassword} edge="end">
                    {showPassword ? <EyeFillIcon /> : <EyeOffFillIcon />}
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
          value={values.confirmPassword}
          type={showConfirmPassword ? "text" : "password"}
          error={Boolean(errors.confirmPassword && touched.confirmPassword)}
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
                    {showConfirmPassword ? <EyeFillIcon /> : <EyeOffFillIcon />}
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
  );
}

export default RegisterForm;
