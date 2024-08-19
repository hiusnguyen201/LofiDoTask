import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useDispatch } from "react-redux";
import { login } from "~/redux/slices/authSlice";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { EyeFillIcon, EyeOffFillIcon } from "~/assets/icons";

// Schema
const loginSchema = Yup.object().shape({
  account: Yup.string("Account must be string").required("Account is required"),
  password: Yup.string("Password must be string").required(
    "Password is required"
  ),
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      dispatch(login(values.account, values.password));
      setSubmitting(false);
    },
  });

  const { handleSubmit, getFieldProps, errors, touched, isSubmitting, values } =
    formik;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
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
          {...getFieldProps("account")}
          label="Account"
          name="account"
          type="text"
          value={values.account}
          error={Boolean(errors.account && touched.account)}
          helperText={errors.account && touched.account && errors.account}
        />

        <TextField
          className="mb-4 w-full"
          {...getFieldProps("password")}
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={values.password}
          error={Boolean(errors.password && touched.password)}
          helperText={errors.password && touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {values.password.length > 0 && (
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <EyeFillIcon /> : <EyeOffFillIcon />}
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
  );
}

export default LoginForm;
