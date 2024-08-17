import { toast } from "react-toastify";

const displayOverlayError = (
  message,
  type = "error",
  position = "top-center"
) => {
  toast[type](message, {
    position,
    autoClose: 2000,
  });
};

const displayOverlaySuccess = (
  message,
  type = "success",
  position = "top-center"
) => {
  toast[type](message, {
    position,
    autoClose: 2000,
  });
};

export { displayOverlayError, displayOverlaySuccess };
