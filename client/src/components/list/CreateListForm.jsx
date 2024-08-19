import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { FormikProvider, Form, useFormik } from "formik";
import { useDispatch } from "react-redux";
import { createList } from "~/redux/slices/listSlice";
import { CloseIcon, PlusIcon } from "~/assets/icons";

// Schema
const createSchema = Yup.object().shape({
  name: Yup.string("Name must be string").required("Name is required"),
});

function CreateListForm({ board }) {
  const [create, setCreate] = useState(false);
  const dispatch = useDispatch();
  const formRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setCreate(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(createList(board._id, values.name));
      setSubmitting(false);
    },
  });

  const { handleSubmit, getFieldProps, values, errors, touched } = formik;

  return (
    <Box
      sx={{
        width: 272,
      }}
    >
      {!create ? (
        <IconButton
          onClick={() => setCreate(true)}
          disableTouchRipple
          className="p-3 rounded-lg text-sm bg-[#ffffff3d] w-full justify-start"
        >
          <Box className="py-0.5 flex items-center justify-start">
            <PlusIcon className="mr-2" />
            <Typography className="text-sm">Add another list</Typography>
          </Box>
        </IconButton>
      ) : (
        <FormikProvider value={formik}>
          <Form
            noValidate
            ref={formRef}
            className="w-full bg-[#101204] p-2 rounded-lg text-sm"
            onSubmit={handleSubmit}
          >
            <TextField
              type="text"
              variant="outlined"
              label="Name"
              name="name"
              className="w-full"
              placeholder="Enter list name"
              {...getFieldProps("name")}
              value={values.name}
              error={Boolean(errors.name && touched.name)}
              helperText={errors.name && touched.name && errors.name}
            />
            <Box className="flex items-center justify-start mt-2 gap-x-2">
              <Button
                type="submit"
                className="text-black normal-case px-3"
                sx={{
                  backgroundColor: "#579DFF",
                  "&:hover": {
                    backgroundColor: "#579DFF",
                    opacity: 0.8,
                  },
                }}
              >
                Add List
              </Button>
              <IconButton
                onClick={(e) => setCreate(false)}
                className="text-base"
                children={<CloseIcon />}
              />
            </Box>
          </Form>
        </FormikProvider>
      )}
    </Box>
  );
}

export default CreateListForm;
