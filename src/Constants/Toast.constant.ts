import { ToastOptions } from "react-toastify";
import { LightColors } from "../Styles/Colors.style";

export const DEFAULT_TOAST_OPTIONS: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
        backgroundImage: "url('/bee-bt-bg.png')",
        backgroundColor: LightColors.background,
    },
} as const as ToastOptions;
