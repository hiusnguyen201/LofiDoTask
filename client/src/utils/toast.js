import { toast } from "react-toastify";

const createMessage = (message, type = "success") => {
  toast[type](message, {
    position: "top-center",
    autoClose: 2000,
  });
};

export { createMessage };
