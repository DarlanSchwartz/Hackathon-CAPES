import styled from "styled-components";
import { LuImage } from "react-icons/lu";
import { IoMdMic } from "react-icons/io";
import PageDefaultSkeleton from "./DefaultSkeleton.page";
import ChatDefaultAction from "../Components/Chat/ChatDefaultAction.component";
import Header from "../Components/Common/Header.component";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ChatService from "../Services/Chat.service";
import ChatMessage from "../Components/Chat/ChatMessage.component";
import { ChatRoles } from "../Protocols/Chat.types";
import Toaster from "../Utils/Notifications.service";
import { FaRegStopCircle } from "react-icons/fa";
import useTypeWriter from "../Hooks/useTypeWriter.hook";
import { useSpeechRecognition } from "../Hooks/useSpeechRecognition.hook";
import { AccessibilityContext } from "../Contexts/Accessibility.context";
import Sidebar from "../Components/Common/Sidebar.component";
import ChatLoadingDots from "../Components/Chat/ChatLoadingDots.mini";

// Refinar o prompt de maquina

export default function PageChat() {
    const [chatHistory, setChatHistory] = useState<{ message: string; role: ChatRoles; }[]>([]);
    const {
        transcript,
        isListening,
        startListening,
        stopListening,
        browserSupportsSpeechRecognition,
        resetTranscript,
        interimTranscript
    } = useSpeechRecognition({ onSilence: () => handleChat() });
    const { accessibilityEnabled, speak, endSpeech } = useContext(AccessibilityContext);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const helloText = useTypeWriter({ text: "Olá, tudo bem?", speed: 60 });
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const chatHistoryRef = useRef<HTMLDivElement>(null);
    const [textPrompt, setTextPrompt] = useState<string>("");
    const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
    const [fileInputImagePreview, setFileInputImagePreview] = useState<string | null>(null);
    const [fileInputImageFile, setFileInputImageFile] = useState<File | null>(null);
    const { mutate: chat } = useMutation({
        mutationKey: ["chat", "talk", textPrompt],
        mutationFn: () => {
            setIsAwaitingResponse(true);
            return ChatService.talk(textPrompt, fileInputImageFile);
        },
        onMutate: () => {
            if (browserSupportsSpeechRecognition) {
                stopListening();
                resetTranscript();
            }
            scrollToChatBottom();
            setChatHistory(prevChatHistory => [...prevChatHistory, { message: textPrompt, role: ChatRoles.USER }]);
            setTextPrompt("");
        },
        onSuccess: (response) => {
            if (response) {
                if (accessibilityEnabled) {
                    speak(response.message.content);
                }
                setChatHistory(prevChatHistory => [...prevChatHistory, { message: response.message.content, role: ChatRoles.SYSTEM }]);
            }
        },
        onSettled: () => {
            inputRef.current?.focus();
            scrollToChatBottom();
            setIsAwaitingResponse(false);
        }
    });


    function scrollToChatBottom() {
        chatHistoryRef.current?.scrollTo({
            top: chatHistoryRef.current?.scrollHeight,
            behavior: "smooth"
        });
    }

    useEffect(() => {
        if (browserSupportsSpeechRecognition && textPrompt !== "" && !isAwaitingResponse) {
            if (interimTranscript === "" && transcript !== "") {
                handleChat();
            }
        }
    }, [isListening]);

    useEffect(() => {
        if (interimTranscript !== "") {
            setTextPrompt(interimTranscript);
        }
    }, [interimTranscript]);

    function handleChat(e?: FormEvent) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        if (textPrompt === "") return;
        setTimeout(() => {
            scrollToChatBottom();
        }, 100);
        endSpeech();
        chat();
    }

    function fileChanged() {
        if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length > 0) {
            const selectedFile = fileInputRef.current.files[0];
            const allowedExtensions = [".jpg", ".jpeg", ".png", ".bmp", ".gif", ".tif", ".webp"];

            if (allowedExtensions.some(extension => selectedFile.name.toLowerCase().endsWith(extension))) {
                setFileInputImagePreview(URL.createObjectURL(selectedFile));
                setFileInputImageFile(selectedFile);
                fileInputRef.current.value = "";
            } else {
                setFileInputImagePreview(null);
                setFileInputImageFile(null);
                Toaster.alert("Formato de arquivo inválido. Por favor, selecione uma imagem.");
            }
        }
    }

    function clearChatImageInput() {
        setFileInputImagePreview(null);
        setFileInputImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.files = null;
        }
    }

    function onClickRecordAudio() {
        if (browserSupportsSpeechRecognition) {
            resetTranscript();
            return startListening();
        }

        return Toaster.alert("Seu navegador não suporta a funcionalidade de reconhecimento de voz.");
    }

    return (
        <PageDefaultSkeleton>
            <SCPageLogin >
                <Header sidebarWidth={80} showAccessibilityToggle showChatSelector />
                <Sidebar />
                <ChatWindowContainer>
                    <ChatWindow>
                        <ChatHistory ref={chatHistoryRef}>
                            <ChatWindowTop>
                                {
                                    (chatHistory.length === 0 || isAwaitingResponse) &&
                                    <>
                                        <section>
                                            <ChatGreetings>{helloText}</ChatGreetings>
                                            <ChatGreetingsSpan>Como podemos te ajudar hoje?</ChatGreetingsSpan>
                                        </section>
                                        <ChatDefaultActions>
                                            <ChatDefaultAction animationDelay={900} text="Faça Upload do seu Artigo e descubra quais periódicos são mais adequados para sua publicação." />
                                            <ChatDefaultAction animationDelay={1000} text="Procure Periódicos da sua área de atuação" />
                                            <ChatDefaultAction animationDelay={1100} text="Busque conteúdos sobre Financiamentos  de Pesquisas" />
                                            <ChatDefaultAction animationDelay={1200} text="Busque informações de currículos acadêmicos por Região, Instituições e Pessoas." />
                                        </ChatDefaultActions>
                                    </>
                                }
                            </ChatWindowTop>
                            {
                                chatHistory.map((messageData, index) => (
                                    <ChatMessage key={index} role={messageData.role} text={messageData.message} />
                                ))
                            }
                            {
                                isAwaitingResponse && <ChatLoadingDots />

                            }
                        </ChatHistory>
                        <ChatInputContainer onSubmit={handleChat} style={{ opacity: isAwaitingResponse ? 0.5 : 1 }}>
                            <input ref={fileInputRef} type="file" style={{ opacity: 0, width: 0, height: 0 }} accept="image/*" onChange={fileChanged} />
                            {
                                fileInputImagePreview &&
                                <ImageFilePreviewContainer>
                                    <button onClick={clearChatImageInput}>X</button>
                                    <ImageFile src={fileInputImagePreview} />
                                </ImageFilePreviewContainer>}
                            <textarea
                                ref={inputRef}
                                autoFocus
                                placeholder="Faça sua Pesquisa aqui"
                                onChange={(e) => setTextPrompt(e.target.value)}
                                value={textPrompt}
                                disabled={isAwaitingResponse} />
                            <InputButton onClick={() => { if (fileInputRef) fileInputRef.current?.click(); }} style={{ position: "absolute", right: 70, bottom: -25, transform: "translateY(-50%)", cursor: "pointer" }}>
                                <LuImage fontSize={30} />
                            </InputButton>
                            {
                                isListening ?
                                    <InputButton onClick={handleChat} style={{ position: "absolute", right: 20, cursor: "pointer", bottom: -25, transform: "translateY(-50%)", }}>
                                        <FaRegStopCircle fontSize={30} />
                                    </InputButton>
                                    :
                                    <InputButton onClick={onClickRecordAudio} style={{ position: "absolute", right: 20, cursor: "pointer", bottom: -25, transform: "translateY(-50%)", }} >
                                        <IoMdMic fontSize={30} />
                                    </InputButton>
                            }
                        </ChatInputContainer>
                    </ChatWindow>
                </ChatWindowContainer>
            </SCPageLogin>
        </PageDefaultSkeleton>
    );
}
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
const ChatHistory = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 0 20px;
`;
const ChatWindowTop = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
   
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
const ChatDefaultActions = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 20px;
    align-items: center;
    @media (max-width: 500px) {
       flex-wrap: wrap;
    }
`;
const ChatGreetingsSpan = styled.span`
    color: var(--M3-sys-light-outline-variant, #CAC4D0);
    font-family: Rubik;
    font-size: 47px;
    font-style: normal;
    font-weight: 400;
    opacity: 0;
    letter-spacing: -0.25px;
    animation: fadein 1s forwards 800ms;
    @media (max-width: 500px) {
     font-size: 30px;
    }
`;
const ChatGreetings = styled.h1`
    font-family: Rubik;
    font-size: 47px;
    font-style: normal;
    font-weight: 400;
    letter-spacing: -0.25px;
    background: linear-gradient(90deg, #688AE9 0.05%, #C66D7B 22.24%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    @media (max-width: 500px) {
     font-size: 30px;
    }
`;

const ChatWindow = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
    width: 80%;
    height: 100svh;
    background-color:${({ theme }) => theme.colors.background};
    padding-top: 120px;
    padding-bottom: 50px;
      
      @media (max-width: 500px) {
        width: 100%;
    }
`;

const ChatWindowContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    padding-left: 100px;
    height: 100svh;
    @media (max-width: 500px) {
        padding-left: 0;
    }
`;

const SCPageLogin = styled.div`
    background-color: ${({ theme }) => theme.colors.background} !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;