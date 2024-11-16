import styled from "styled-components";
import { CiGlobe } from "react-icons/ci";

type ChatDefaultActionProps = {
    text: string;
    action?: () => void;
    animationDelay?: number;
};

export default function ChatDefaultAction({ text, action, animationDelay }: ChatDefaultActionProps) {
    return (
        <SCChatDefaultAction onClick={action} $delay={animationDelay ?? 0}>
            <span>{text}</span>
            <ChatDefaultActionIcon>
                <CiGlobe fontSize={20} />
            </ChatDefaultActionIcon>
        </SCChatDefaultAction>
    );
}

const ChatDefaultActionIcon = styled.div`
    position: absolute;
    right: 16px;
    bottom: 16px;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: 50%;
    height: 40px;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

   
`;
const SCChatDefaultAction = styled.div<{ $delay: number; }>`
    animation: fadein 1s forwards ${({ $delay }) => $delay}ms;
    opacity: 0;
    width: 100%;
    position: relative;
    display: flex;
    padding:16px;
    height:225px;
    max-width: 250px;
    border-radius: 12px;
    background: ${({ theme }) => theme.colors.lightPink2};
    span{
        font-size: 16px;
        line-height: 22px;
    }
`;