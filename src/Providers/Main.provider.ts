import Logger from "../Services/Logger.service";
import Toaster from "../Utils/Notifications.service";
import APIProvider from "./API.provider";

const API = new APIProvider((error) => {
    Toaster.notify(error.message, "error", { theme: "light" });
    Logger.info(error.message);
});

export default API;