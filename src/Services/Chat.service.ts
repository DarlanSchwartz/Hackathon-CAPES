import { ChatResponse } from "../Protocols/Chat.types";
import { LocalStorageKeys } from "../Protocols/Main.types";
import API from "../Providers/Main.provider";
import LocalStorage from "./LocalStorage.service";
import { v4 as uuid } from "uuid";

export default class ChatService {

    public static talk(message: string, file: File | null) {
        let userId = LocalStorage.getItem<string>(LocalStorageKeys.USER_ID);
        const newUserId = uuid();

        if (!userId) {
            LocalStorage.setItem(LocalStorageKeys.USER_ID, newUserId);
            userId = newUserId;
        }

        if (file) {
            const formData = new FormData();
            formData.append("message", message);
            formData.append("userId", userId);
            formData.append("file", file);

            return API.post<ChatResponse>("/chat", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        }

        return API.post<ChatResponse>("/chat", { message, userId });
    }
}
