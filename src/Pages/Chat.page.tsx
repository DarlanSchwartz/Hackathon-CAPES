import styled from "styled-components";
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
export default function PageChat() {
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
                        <SidebarMenuItem icon={<IoSettingsOutline />} action={() => { }} />
                    </SidebarActionsGroupContainer>
                </Sidebar>
                <ChatWindowContainer>
                    <ChatWindow>
                        <ChatWindowTop>
                            <div>
                                <ChatGreetings>Olá, tudo bem?</ChatGreetings>
                                <ChatGreetingsSpan>Como podemos te ajudar hoje?</ChatGreetingsSpan>
                            </div>
                            <ChatDefaultActions>
                                <ChatDefaultAction text="Generate unit tests for the following C# function" />
                                <ChatDefaultAction text="Relizar Pesquisas de " />
                                <ChatDefaultAction text="Teach me the concept of game theory in simple terms" />
                                <ChatDefaultAction text="Walk me through how to apply for a new role" />
                            </ChatDefaultActions>
                        </ChatWindowTop>
                        <ChatInputContainer>
                            <input type="text" placeholder="Faça sua Pesquisa aqui" />
                            <LuImage fontSize={30} style={{ position: "absolute", right: 70 }} />
                            <IoMdMic fontSize={30} style={{ position: "absolute", right: 20 }} />
                        </ChatInputContainer>
                    </ChatWindow>
                </ChatWindowContainer>
            </SCPageLogin>
        </PageDefaultSkeleton>
    );
}

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
        color: #49454F;
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
        color: black;
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
    letter-spacing: -0.25px;
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
    background-color: white;
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
    background-color: ${({ theme }) => theme.colors.background};
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