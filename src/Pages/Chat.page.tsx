import styled from "styled-components";
import PageDefaultSkeleton from "./DefaultSkeleton.page";
import ChatDefaultAction from "../Components/Chat/ChatDefaultAction.component";
import Header from "../Components/Common/Header.component";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ChatService from "../Services/Chat.service";
import { ChatRoles } from "../Protocols/Chat.types";
import Toaster from "../Utils/Notifications.service";
import useTypeWriter from "../Hooks/useTypeWriter.hook";
import { useSpeechRecognition } from "../Hooks/useSpeechRecognition.hook";
import { AccessibilityContext } from "../Contexts/Accessibility.context";
import Sidebar from "../Components/Common/Sidebar.component";
import ChatLoadingDots from "../Components/Chat/ChatLoadingDots.mini";
import ChatInput from "../Components/Chat/ChatInput.component";
import ChatMessagesHistory from "../Components/Chat/ChatMessagesHistory.component";
import { FaMicrophone } from "react-icons/fa";
import Logger from "../Services/Logger.service";
import { useSpeech } from "react-text-to-speech";

// Refinar o prompt de maquina

export default function PageChat() {
    const {
        transcript,
        isListening,
        startListening,
        stopListening,
        browserSupportsSpeechRecognition,
        resetTranscript,
        interimTranscript
    } = useSpeechRecognition({ onSilence });

    function onSilence() {
        setTimeout(() => {
            handleChat();
        }, 200);
    }
    const { accessibilityEnabled, endSpeech } = useContext(AccessibilityContext);
    const [speechText, setSpeechText] = useState<string>("Olá, tudo bem? Como podemos te ajudar hoje?");
    const {
        start, // Function to start the speech or put it in queue
        stop, // Function to stop the speech or remove it from queue
    } = useSpeech({
        text: speechText,
        voiceURI: "Google português do Brasil",
        lang: "pt-BR",
        onStop: () => {
            if (!isListening && browserSupportsSpeechRecognition) {
                startRecordAudio();
            }
        }
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const helloText = useTypeWriter({ text: "Olá, tudo bem?", speed: 60 });
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const chatHistoryRef = useRef<HTMLDivElement>(null);
    const [chatHistory, setChatHistory] = useState<{ message: string; role: ChatRoles; }[]>([]);
    const [textPrompt, setTextPrompt] = useState<string>("");
    const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
    const [fileInputImagePreview, setFileInputImagePreview] = useState<string | null>(null);
    const [fileInputImageFile, setFileInputImageFile] = useState<File | null>(null);

    function removeMarkdown(text: string): string {
        return text.replace(/[#_*~`>\[\](){}\-!+\\|\n]/g, '');
    }
    const { mutate: chat } = useMutation({
        mutationKey: ["chat", "talk", transcript],
        mutationFn: () => {
            setIsAwaitingResponse(true);

            //if ((!transcript && accessibilityEnabled) || (!accessibilityEnabled && !textPrompt)) throw new Error("Nenhum texto foi detectado.");
            resetTranscript();
            return ChatService.talk(transcript, fileInputImageFile);
        },
        onMutate: () => {
            scrollToChatBottom();
            setChatHistory(prevChatHistory => [...prevChatHistory, { message: textPrompt, role: ChatRoles.USER }]);
            setTextPrompt("");
        },
        onSuccess: (response) => {
            if (response) {
                if (accessibilityEnabled) {
                    Logger.info("Falando: ", removeMarkdown(response.message.content));
                    setSpeechText(removeMarkdown(response.message.content));

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

    useEffect(() => {
        if (accessibilityEnabled) {
            start();
        }

    }, [accessibilityEnabled]);

    useEffect(() => {
        start();
    }, [speechText]);


    function scrollToChatBottom() {
        chatHistoryRef.current?.scrollTo({
            top: chatHistoryRef.current?.scrollHeight,
            behavior: "smooth"
        });
    }


    useEffect(() => {
        if (transcript !== "") {
            setTextPrompt(transcript);
            return;
        }
        if (interimTranscript !== "") {
            setTextPrompt(interimTranscript);
        }
    }, [interimTranscript, transcript]);

    function handleChat(e?: FormEvent) {
        if (e) {
            e?.stopPropagation();
            e?.preventDefault();
        }


        setTimeout(() => {
            scrollToChatBottom();
        }, 100);
        stopListening();
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

    function startRecordAudio() {
        if (isAwaitingResponse || isListening) return;
        if (browserSupportsSpeechRecognition) {
            resetTranscript();
            setTextPrompt("");
            stop();
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
                                    (chatHistory.length === 0) &&
                                    <>
                                        <section>
                                            <ChatGreetings>{helloText}</ChatGreetings>
                                            <ChatGreetingsSpan>Como podemos te ajudar hoje?</ChatGreetingsSpan>
                                        </section>

                                        {accessibilityEnabled ? null :
                                            <ChatDefaultActions>
                                                <ChatDefaultAction animationDelay={900} text="Faça Upload do seu Artigo e descubra quais periódicos são mais adequados para sua publicação." />
                                                <ChatDefaultAction animationDelay={1000} text="Procure Periódicos da sua área de atuação" />
                                                <ChatDefaultAction animationDelay={1100} text="Busque conteúdos sobre Financiamentos  de Pesquisas" />
                                                <ChatDefaultAction animationDelay={1200} text="Busque informações de currículos acadêmicos por Região, Instituições e Pessoas." />
                                            </ChatDefaultActions>
                                        }
                                    </>
                                }
                            </ChatWindowTop>
                            <ChatMessagesHistory data={chatHistory} />
                            {
                                isAwaitingResponse && <ChatLoadingDots />
                            }
                        </ChatHistory>
                        {
                            !accessibilityEnabled && <ChatInput
                                onSubmit={handleChat}
                                inputRef={inputRef}
                                fileInputImagePreview={fileInputImagePreview}
                                fileInputRef={fileInputRef}
                                isAwaitingResponse={isAwaitingResponse}
                                isListening={isListening}
                                onClickRecordAudio={startRecordAudio}
                                onClickRemoveImage={clearChatImageInput}
                                onClickStopRecordAudio={handleChat}
                                onFileChange={fileChanged}
                                setTextPrompt={setTextPrompt}
                                textPrompt={textPrompt}
                            />
                        }
                        {
                            accessibilityEnabled &&
                            <MicAccessibilityContainer style={{ animation: interimTranscript ? "scale_up_down 1s infinite" : "auto" }}>
                                <FaMicrophone fontSize={60} color="#fff" onClick={startRecordAudio} />
                            </MicAccessibilityContainer>
                        }
                    </ChatWindow>
                </ChatWindowContainer>
            </SCPageLogin>
        </PageDefaultSkeleton>
    );
}

const MicAccessibilityContainer = styled.div`
    display: flex;
    width: 136px;
    height: 136px;
    padding: 36.661px;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: #AF52DE;
    align-self: center;
    margin-bottom: 100px;
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