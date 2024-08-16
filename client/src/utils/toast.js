import { toast } from "react-toastify";

const createMessage = (
  message,
  type = "success",
  position = "top-center"
) => {
  toast[type](message, {
    position,
    autoClose: 2000,
  });
};

export { createMessage };
