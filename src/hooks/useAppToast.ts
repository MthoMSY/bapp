import { toast, ToastOptions } from "react-toastify";
import { globalToastOptions } from "../notifications";

export const useAppToast = () => {
  const success = (message: string, customOptions?: ToastOptions): void => {
    if (customOptions) {
      toast.success(message, customOptions);
      return;
    }
    toast.success(message, globalToastOptions);
  };

  const error = (message: string, customOptions?: ToastOptions) => {
    if (customOptions) {
      toast.error(message, customOptions);
      return;
    }
    toast.error(message, globalToastOptions);
  };

  const warn = (message: string, customOptions?: ToastOptions) => {
    if (customOptions) {
      toast.warn(message, customOptions);
      return;
    }
    toast.warn(message, globalToastOptions);
  };

  return { success, error, warn };
};
