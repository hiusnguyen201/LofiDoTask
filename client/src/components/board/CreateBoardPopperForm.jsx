import * as Yup from "yup";
import React from "react";
import { useEffect, useState, useRef } from "react";
import { FormikProvider, useFormik, Form } from "formik";
import {
  TextField,
  Popper,
  Box,
  IconButton,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBoard } from "~/redux/slices/boardSlice";
import { displayOverlayError } from "~/utils/toast";
import { CloseIcon } from "~/assets/icons";

const createBoardSchema = Yup.object().shape({
  name: Yup.string("Name must be string").required("Name is required"),
});

export default function CreateBoardPopperForm({ children, ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const boxRef = useRef();
  const childRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClosePopper = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleOpen = (e) => {
      setAnchorEl(e.target);
    };
    if (childRef.current) {
      childRef.current.addEventListener("click", handleOpen);
    }
    return () => {
      if (childRef.current) {
        childRef.current.removeEventListener("click", handleOpen);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        handleClosePopper();
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
    enableReinitialize: true,
    validationSchema: createBoardSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const { data = null } = await dispatch(createBoard(values.name));

      if (data && data.board) {
        navigate(`/boards/${data.board._id}`);
        handleClosePopper();
      } else {
        displayOverlayError("Create board failed");
      }

      setSubmitting(false);
    },
  });

  const {
    errors,
    touched,
    getFieldProps,
    handleSubmit,
    isSubmitting,
    values,
  } = formik;

  return (
    <>
      {children &&
        React.cloneElement(children, {
          ref: childRef,
        })}

      {childRef.current && (
        <Popper
          {...props}
          placement={isMdUp ? "right" : "top"}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Box
            ref={boxRef}
            className="p-4 rounded-lg mx-2"
            sx={{
              bgcolor: "#282E33",
            }}
          >
            <Box className="flex items-center justify-center relative text-sm">
              <span>Create board</span>
              <IconButton
                className="absolute right-0"
                onClick={handleClosePopper}
                children={<CloseIcon className="text-base" />}
              />
            </Box>

            <Box
              sx={{
                maxHeight: 483,
              }}
              className="overflow-y-auto"
            >
              <Divider className="my-4" />
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
            </Box>
          </Box>
        </Popper>
      )}
    </>
  );
}
