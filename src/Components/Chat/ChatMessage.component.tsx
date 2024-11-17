import styled from "styled-components";
import ReactMarkdown from "react-markdown";

type MessageProps = {
    text: string;
    role: "user" | "system";
};

export default function ChatMessage({ role, text }: MessageProps) {
    if (!text) return null;
    return (
        <SCMessage style={{ alignSelf: role === "system" ? "flex-start" : "flex-end" }}>
            {
                role === "system" &&
                <ImageContainer>
                    <img src="/assets/images/capes.png" />
                </ImageContainer>
            }
            <section>{<ReactMarkdown>{text}</ReactMarkdown>}</section>
        </SCMessage>
    );
}

const ImageContainer = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 10px;
    flex-shrink: 0;
    border: 2px solid ${({ theme }) => theme.colors.purple};
`;

const SCMessage = styled.div`
    display: flex;
    gap: 10px;
    max-width: 70%;

    section{
        background-color: ${({ theme }) => theme.colors.messageBackground};
        padding: 10px;
        border-radius: 10px;
        width: fit-content;
        line-height: 25px;
        white-space: break-spaces;
        color: ${({ theme }) => theme.colors.text};
        a{
            color:#7cacf8;
            text-decoration: underline;
        }
        h1,h2,h3,h4,h5,h6,strong{
            font-weight: 600;
        }
        h1{
            font-size: 24px;
        }
        h2{
            font-size: 22px;
        }
        h3{
            font-size: 20px;
        }
        h4{
            font-size: 18px;
        }
        h5{
            font-size: 16px;
        }
        h6{
            font-size: 14px;
        }
    }

    img{
        width: 100%;
        height: 100%;
        object-fit: scale-down;
    }
`;