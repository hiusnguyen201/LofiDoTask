import { memo } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import {
  Popper,
  IconButton,
  useMediaQuery,
  TextField,
  Box,
  Divider,
} from "@mui/material";
import { CloseIcon } from "~/assets/icons";
import { createMessage } from "~/utils/toast";
import { useNavigate } from "react-router-dom";
import * as api from "~/api";

const createBoardSchema = Yup.object().shape({
  name: Yup.string("Title must be string").required("Title is required"),
});

function BoardPopper({ asideBarData }) {
  const navigate = useNavigate();
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const formikBoard = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createBoardSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { data } = await api.createBoard({
          name: values.name,
        });
        const { board } = data.data;
        resetForm();
        navigate(`/boards/${board._id}`);
        asideBarData.fetchApiBoardList();
        createMessage(data.message, "success");
      } catch (e) {
        const { data } = e.response;
        createMessage(data.message, "error");
      }
    },
  });

  const { handleSubmit, isSubmitting, getFieldProps, errors, touched } =
    formikBoard;

  return (
    <Popper
      placement={isMdUp ? "right" : "top"}
      open={Boolean(asideBarData.anchorEl)}
      anchorEl={asideBarData.anchorEl}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Box
        className="p-4 rounded-lg mx-2"
        sx={{
          bgcolor: "#282E33",
        }}
      >
        <Box className="flex items-center justify-center relative text-sm">
          <span>Create board</span>
          <IconButton
            className="absolute right-0"
            onClick={asideBarData.handleOpenPopperBoard}
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

          <FormikProvider value={formikBoard}>
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
  );
}

export default memo(BoardPopper);
