import ChatMessage from "./ChatMessage.component";
import { ChatRoles } from "../../Protocols/Chat.types";

type ChatHistoryProps = {
    data: { role: ChatRoles, message: string; }[];
};

export default function ChatMessagesHistory({ data }: ChatHistoryProps) {
    return (
        <>
            {
                data.map((messageData, index) => (
                    <ChatMessage key={index} role={messageData.role} text={messageData.message} />
                ))
            }
        </>
    );
}