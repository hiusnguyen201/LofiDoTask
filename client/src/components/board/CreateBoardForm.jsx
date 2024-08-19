import * as Yup from "yup";
import { useEffect, useState } from "react";
import { FormikProvider, useFormik, Form } from "formik";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from "~/redux/slices/boardSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { displayOverlayError } from "~/utils/toast";

const createBoardSchema = Yup.object().shape({
  name: Yup.string("Name must be string").required("Name is required"),
});

export default function CreateBoardForm({ onClosePopper }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    enableReinitialize: true,
    validationSchema: createBoardSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { data = null } = await dispatch(createBoard(values.name));

      if (data && data.board) {
        navigate(`/boards/${data.board._id}`);
        onClosePopper();
      } else {
        displayOverlayError("Create board failed");
      }

      setSubmitting(false);
    },
  });

  const { errors, touched, getFieldProps, handleSubmit, isSubmitting, values } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form
        noValidate
        autoComplete="off"
        className="w-full"
        onSubmit={handleSubmit}
      >
        <TextField
          {...getFieldProps("name")}
          name="name"
          type="text"
          value={values.name}
          error={Boolean(errors.name && touched.name)}
          helperText={errors.name && touched.name && errors.name}
          className="mb-4 w-full"
          label="Board title"
          variant="outlined"
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          className="text-base py-2 w-full text-sm normal-case"
        >
          Create
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
