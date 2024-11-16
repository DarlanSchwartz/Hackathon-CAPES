import { ChatResponse } from "../Protocols/Chat.types";
import API from "../Providers/Main.provider";

export default class ChatService {

    public static talk(message: string) {
        return API.post<ChatResponse>("/chat", { message });
    }
}
