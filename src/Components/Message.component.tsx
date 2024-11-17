import { createElement } from "react";
import styled from "styled-components";

type MessageProps = {
    text: string;
    role: "user" | "system";
};

export default function Message({ role, text }: MessageProps) {
    function substituirLinks(texto: string): (string | JSX.Element)[] {
        const regex = /\[(.+?)\]\((https?:\/\/[^\)]+)\)/g;
        const resultado: (string | JSX.Element)[] = [];
        let ultimoIndice = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(texto)) !== null) {
            const textoAntes = texto.slice(ultimoIndice, match.index);
            const textoLink = match[1];
            const url = match[2];


            if (textoAntes) {
                resultado.push(textoAntes);
            }

            resultado.push(
                createElement("a", { href: url, target: "_blank", rel: "noopener noreferrer", key: resultado.length }, textoLink)
            );

            ultimoIndice = regex.lastIndex;
        }

        if (ultimoIndice < texto.length) {
            resultado.push(texto.slice(ultimoIndice));
        }

        return resultado;
    }
    return (
        <SCMessage style={{ alignSelf: role === "system" ? "flex-start" : "flex-end" }}>
            {
                role === "system" &&
                <ImageContainer>
                    <img src="/assets/images/capes.png" />
                </ImageContainer>
            }
            <p>{substituirLinks(text)}</p>
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

    p{
        background-color: ${({ theme }) => theme.colors.messageBackground};
        padding: 10px;
        border-radius: 10px;
        width: fit-content;
        line-height: 25px;
        white-space: break-spaces;
        color: ${({ theme }) => theme.colors.text};
    }

    img{
        width: 100%;
        height: 100%;
        object-fit: scale-down;
    }
`;