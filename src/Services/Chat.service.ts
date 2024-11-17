import { ChatResponse } from "../Protocols/Chat.types";
import API from "../Providers/Main.provider";

export default class ChatService {

    public static talk(message: string, file: File | null) {
        if (file) {
            const formData = new FormData();
            formData.append("message", message);
            formData.append("file", file);

            return API.post<ChatResponse>("/chat", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        }

        return API.post<ChatResponse>("/chat", { message });
    }
}
