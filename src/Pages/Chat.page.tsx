import styled, { useTheme } from "styled-components";
import PageDefaultSkeleton from "./DefaultSkeleton.page";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiPlus } from "react-icons/hi";
import { PiWarningCircleFill } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
export default function PageChat() {
    const theme = useTheme();
    return (
        <PageDefaultSkeleton>
            <SCPageLogin >
                <Sidebar>
                    <SidebarTopSettingsContainer>
                        <GiHamburgerMenu />
                        <HiPlus style={{ padding: 10, backgroundColor: theme.colors.lightPink2, borderRadius: 10, height: 40, width: 40 }} />
                    </SidebarTopSettingsContainer>
                    <SidebarActionsGroupContainer>
                        <PiWarningCircleFill />
                        <GoClock />
                        <IoSettingsOutline />
                    </SidebarActionsGroupContainer>
                </Sidebar>
            </SCPageLogin>
        </PageDefaultSkeleton>
    );
}

const SidebarActionsGroupContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
`;

const SidebarTopSettingsContainer = styled(SidebarActionsGroupContainer)`
    display: flex;
    flex-direction: column;
    gap: 80px;
`;

const SCPageLogin = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Sidebar = styled.nav`
    height: 100svh;
    background-color: ${({ theme }) => theme.colors.lightPink};
    width: 100px;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    gap: 20px;
    *{
        font-size: 30px;
    }
`;