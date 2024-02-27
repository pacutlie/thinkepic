import { toast } from "react-toastify";

export const toastProcess = () => toast.loading("Memproses...");

export const toastDone = (id, message, type = "success") =>
  toast.update(id, {
    render: message,
    type,
    isLoading: false,
    autoClose: 3000,
  });
