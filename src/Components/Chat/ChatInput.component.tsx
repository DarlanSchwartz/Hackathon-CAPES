import styled, { useTheme } from "styled-components";
import { LuImage } from "react-icons/lu";
import { IoMdMic } from "react-icons/io";
import { FaRegStopCircle } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { isMobile } from 'react-device-detect';
type ChatInputProps = {
    fileInputRef: React.RefObject<HTMLInputElement>;
    inputRef: React.RefObject<HTMLTextAreaElement>;
    isListening: boolean;
    isAwaitingResponse: boolean;
    fileInputImagePreview: string | null;
    textPrompt: string;
    setTextPrompt: (value: string) => void;
    onFileChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    onClickStopRecordAudio: () => void;
    onClickRecordAudio: () => void;
    onClickRemoveImage: () => void;
};

export default function ChatInput({ onClickRemoveImage, onClickRecordAudio, onClickStopRecordAudio, onSubmit, fileInputImagePreview, fileInputRef, inputRef, isAwaitingResponse, isListening, setTextPrompt, textPrompt, onFileChange }: ChatInputProps) {
    const theme = useTheme();
    function submitOnEnter(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.shiftKey) return;
        if (e.key !== "Enter" && e.key !== "Return") return;
        e.preventDefault();
        onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
    return (
        <ChatInputContainer onSubmit={onSubmit} style={{ opacity: isAwaitingResponse ? 0.5 : 1 }} >
            <input disabled={isAwaitingResponse} ref={fileInputRef} type="file" style={{ opacity: 0, width: 0, height: 0 }} accept="image/*" onChange={onFileChange} />
            {
                fileInputImagePreview &&
                <ImageFilePreviewContainer>
                    <button onClick={onClickRemoveImage}>X</button>
                    <ImageFile src={fileInputImagePreview} />
                </ImageFilePreviewContainer>}
            <textarea
                onKeyUp={submitOnEnter}
                ref={inputRef}
                autoFocus
                placeholder="Faça sua Pesquisa aqui"
                onChange={(e) => setTextPrompt(e.target.value)}
                value={textPrompt}
                disabled={isAwaitingResponse} />
            <InputActionsContainer>
                <InputButton disabled={isAwaitingResponse} onClick={() => { if (fileInputRef) fileInputRef.current?.click(); }}>
                    <LuImage fontSize={30} />
                </InputButton>
                {
                    isListening ?
                        <InputButton disabled={isAwaitingResponse} onClick={onClickStopRecordAudio} >
                            <FaRegStopCircle fontSize={30} />
                        </InputButton>
                        :
                        <InputButton disabled={isAwaitingResponse} onClick={onClickRecordAudio} >
                            <IoMdMic fontSize={30} />
                        </InputButton>
                }
                {
                    isMobile && <InputButton disabled={isAwaitingResponse} onClick={(e) => onSubmit(e as unknown as React.FormEvent<HTMLFormElement>)}>
                        <IoSend fontSize={30} color={theme.colors.purple} />
                    </InputButton>
                }
            </InputActionsContainer>
        </ChatInputContainer>
    );
}

const InputActionsContainer = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 20px;
    bottom: -25px;
    transform: translateY(-50%);
`;

const InputButton = styled.button`
    background: 0;
    border: 0;
    cursor: pointer;
    color: black;
    padding: 10px;
`;
const ImageFilePreviewContainer = styled.div`
    position: absolute;
    left: 40px;
    top: -60px;
    width: 50px;
    height: 50px;
    border-radius: 10px;

    button{
        position: absolute;
        right: -10px;
        top: -10px;
        color: ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.messageBackground};
        border-radius: 50%;
        padding: 5px;
        height: 20px;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: 0;
        font-size: 12px;
        &:hover{
            border: 1px solid ${({ theme }) => theme.colors.text};
        }
    }
`;
const ImageFile = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
`;

const ChatInputContainer = styled.form`
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    justify-self: flex-end;
    svg{
        color: ${({ theme }) => theme.colors.text};
        cursor: pointer;
    }
    textarea{
        width: 100%;
        padding-left: 20px;
        padding-right: 40px;
        padding-top: 15px;
        border-radius: 28px;
        height: 56px;
        background: ${({ theme }) => theme.colors.lightPink2};
        border: 0;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 150% */
        letter-spacing: 0.5px;
        color:  ${({ theme }) => theme.colors.text};
        resize: none;
        &::-webkit-scrollbar {
            display: none;
        }
        &:focus{
            outline: 1px solid ${({ theme }) => theme.colors.purple};
        }
    }
`;