import styled from "styled-components";
import SidebarMenuItem from "./SidebarMenuItem.component";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoClock, GoMoon } from "react-icons/go";
import { HiPlus } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { PiWarningCircleFill } from "react-icons/pi";
import Toggle from "./Toggle.component";
import { useContext, useState } from "react";
import { ThemeContext } from "../Contexts/Theme.context";

export default function Sidebar() {
    const { darkMode, setDarkMode } = useContext(ThemeContext);
    const [showSettings, setShowSettings] = useState(false);
    return (
        <SCSidebar>
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
        </SCSidebar>
    );
}



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
const SCSidebar = styled.nav`
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
    @media (max-width: 500px) {
        display: none;
        padding: 0;
    }
`;