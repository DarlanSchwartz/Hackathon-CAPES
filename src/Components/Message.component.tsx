import styled from "styled-components";

type MessageProps = {
    text: string;
    role: "user" | "system";
};

export default function Message({ role, text }: MessageProps) {
    return (
        <SCMessage style={{ alignSelf: role === "system" ? "flex-start" : "flex-end" }}>
            {
                role === "system" &&
                <ImageContainer>
                    <img src="/assets/images/capes.png" />
                </ImageContainer>
            }
            <p>{text}</p>
        </SCMessage>
    );
}

const ImageContainer = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    padding: 10px;
    border: 2px solid ${({ theme }) => theme.colors.purple};
`;

const SCMessage = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 70%;

    p{
        background-color: ${({ theme }) => theme.colors.messageBackground};
        padding: 10px;
        border-radius: 10px;
        width: fit-content;
    }

    img{
        width: 100%;
        height: 100%;
        object-fit: scale-down;
    }
`;