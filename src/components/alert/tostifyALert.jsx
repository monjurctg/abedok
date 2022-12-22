import { toast } from "react-toastify";

export const toastifyAlertError = (message, position) => {
  toast.error(message, {
    position: position,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastifyAlertSuccess = (message, position) => {
  toast.success(message, {
    position: position,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastifyAlertLoading = (position) => {
  toast.success("Loading", {
    loading: "Loading",
    position: position,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastifyAlertDelete = (message, position) => {
  toast.error(message, {
    position: position,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
