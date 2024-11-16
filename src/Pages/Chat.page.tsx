import styled, { useTheme } from "styled-components";
import { LuImage } from "react-icons/lu";
import { IoMdMic } from "react-icons/io";
import PageDefaultSkeleton from "./DefaultSkeleton.page";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiPlus } from "react-icons/hi";
import { PiWarningCircleFill } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import SidebarMenuItem from "../Components/SidebarMenuItem.component";
import ChatDefaultAction from "../Components/ChatDefaultAction.component";
import Header from "../Components/Header.component";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import ChatService from "../Services/Chat.service";
import { ThreeDots } from 'react-loader-spinner';
import Message from "../Components/Message.component";
import { ChatRoles } from "../Protocols/Chat.types";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Toaster from "../Utils/Notifications.service";
import { FaRegStopCircle } from "react-icons/fa";
import { GoMoon } from "react-icons/go";
import useTypeWriter from "../Hooks/useTypeWriter.hook";
import Toggle from "../Components/Toggle.component";
import { ThemeContext } from "../Contexts/Theme.context";
//Refinar o prompt de maquina
// POssibilitar envio de audio e resposta com adio
// Possibilitar envio de arquivos de imagem 

export default function PageChat() {
    const [chatHistory, setChatHistory] = useState<{ message: string; role: ChatRoles; }[]>([]);
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const [textPrompt, setTextPrompt] = useState<string>("");
    const helloText = useTypeWriter({ text: "Olá, tudo bem?", speed: 60 });
    const inputRef = useRef<HTMLInputElement>(null);
    const chatHistoryRef = useRef<HTMLDivElement>(null);
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const [showSettings, setShowSettings] = useState(false);
    const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
    const theme = useTheme();
    const { mutate: chat } = useMutation({
        mutationKey: ["chat", "talk", textPrompt],
        mutationFn: () => {
            setIsAwaitingResponse(true);
            return ChatService.talk(textPrompt);
        },
        onMutate: () => {
            if (browserSupportsSpeechRecognition) {
                SpeechRecognition.stopListening();
                resetTranscript();
            }
            scrollToChatBottom();
            setChatHistory(prevChatHistory => [...prevChatHistory, { message: textPrompt, role: ChatRoles.USER }]);
            setTextPrompt("");
        },
        onSuccess: (response) => {
            if (response) {
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
        if (browserSupportsSpeechRecognition && !listening && textPrompt !== "") {
            handleChat();
        }
    }, [listening]);

    useEffect(() => {
        setTextPrompt(transcript);
    }, [transcript]);

    function handleChat(e?: FormEvent) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        chat();
    }

    return (
        <PageDefaultSkeleton>
            <SCPageLogin >
                <Header sidebarWidth={80} showAccessibilityToggle showChatSelector />
                <Sidebar>
                    <SidebarTopSettingsContainer>
                        <SidebarMenuItem icon={<GiHamburgerMenu />} action={() => { }} />
                        <SidebarMenuItem icon={<HiPlus />} action={() => { }} variant="active" />
                    </SidebarTopSettingsContainer>
                    <SidebarActionsGroupContainer>
                        <SidebarMenuItem icon={<PiWarningCircleFill />} action={() => { }} />
                        <SidebarMenuItem icon={<GoClock />} action={() => { }} />
                        <SidebarMenuItem
                            icon={<IoSettingsOutline />}
                            action={() => setShowSettings(!showSettings)}
                            showPopup={showSettings}
                            popup={
                                <PopUpSettings>
                                    <GoMoon fontSize={30} style={{ width: "auto", height: "auto" }} /><span>Dark Mode</span><Toggle value={darkMode} setValue={setDarkMode} />
                                </PopUpSettings>
                            }
                        />
                    </SidebarActionsGroupContainer>
                </Sidebar>
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
                                    <Message key={index} role={messageData.role} text={messageData.message} />
                                ))
                            }
                            {
                                isAwaitingResponse &&
                                <div style={{ alignSelf: "flex-end" }}>
                                    <ThreeDots
                                        visible={true}
                                        height="80"
                                        width="80"
                                        color={theme.colors.purple}
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div>
                            }
                        </ChatHistory>

                        <ChatInputContainer onSubmit={handleChat} style={{ opacity: isAwaitingResponse ? 0.5 : 1 }}>
                            <input
                                ref={inputRef}
                                type="text"
                                autoFocus
                                placeholder="Faça sua Pesquisa aqui"
                                onChange={(e) => setTextPrompt(e.target.value)}
                                value={textPrompt}
                                disabled={isAwaitingResponse} />
                            <LuImage fontSize={30} style={{ position: "absolute", right: 70, cursor: "pointer" }} onClick={handleChat} />
                            {
                                listening ?
                                    <FaRegStopCircle
                                        fontSize={30}
                                        style={{ position: "absolute", right: 20, cursor: "pointer" }}
                                        onClick={() => handleChat()} />
                                    :
                                    <IoMdMic
                                        fontSize={30}
                                        style={{ position: "absolute", right: 20, cursor: "pointer" }}
                                        onClick={() => {
                                            if (browserSupportsSpeechRecognition) {
                                                resetTranscript();
                                                return SpeechRecognition.startListening();
                                            }

                                            return Toaster.alert("Seu navegador não suporta a funcionalidade de reconhecimento de voz.");
                                        }} />
                            }
                        </ChatInputContainer>
                    </ChatWindow>
                </ChatWindowContainer>
            </SCPageLogin>
        </PageDefaultSkeleton>
    );
}


const PopUpSettings = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    position: absolute;
    top: -250%;
    left:100%;
    width: 240px;
    animation: fadein 200ms forwards;
    span{
        white-space: nowrap;
        color: ${({ theme }) => theme.colors.text};
    }
    svg{
        font-size: 30px;
    }
    background-color: ${({ theme }) => theme.colors.lightPink};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
    input{
        width: 100%;
        border-radius: 28px;
        height: 56px;
        background: ${({ theme }) => theme.colors.lightPink2};
        border: 0;
        padding-left: 20px;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 150% */
        letter-spacing: 0.5px;
        color:  ${({ theme }) => theme.colors.text};
    }
`;
const ChatDefaultActions = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 20px;
    align-items: center;
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
`;

const ChatWindowContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    padding-left: 100px;
    height: 100svh;
`;

const SidebarActionsGroupContainer = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const SidebarTopSettingsContainer = styled(SidebarActionsGroupContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 60px;
`;

const SCPageLogin = styled.div`
    background-color: ${({ theme }) => theme.colors.background} !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Sidebar = styled.nav`
    height: 100svh;
    background-color: ${({ theme }) => theme.colors.lightPink};
    width: 80px;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    gap: 20px;
`;