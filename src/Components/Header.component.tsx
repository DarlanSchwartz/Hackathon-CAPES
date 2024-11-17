import styled from "styled-components";
import Toggle from "./Toggle.component";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { useWindowSize } from "@uidotdev/usehooks";

type HeaderProps = {
    sidebarWidth?: number;
    showChatSelector?: boolean;
    showAccessibilityToggle?: boolean;
};

export default function Header({ sidebarWidth = 0, showAccessibilityToggle, showChatSelector }: HeaderProps) {
    const [accessibility, setAccessibility] = useState(false);
    const size = useWindowSize();
    return (
        <SCHeader style={{ width: `calc(100% - ${sidebarWidth}px)` }}>
            {
                showChatSelector && <h1>ATENA<FaCaretDown /></h1>
            }
            <HeaderRight>
                {
                    showAccessibilityToggle &&
                    <AccessibilityContainer>
                        {
                            !!size.width && size.width < 500 ? "Deficiência Visual" : " Acessibilidade: Deficiência Visual"
                        }
                        <Toggle value={accessibility} setValue={setAccessibility} />
                    </AccessibilityContainer>
                }
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <a target="_blank" href="https://www.periodicos.capes.gov.br/"><img src="/assets/images/capes.png" alt="" style={{ width: "40px", height: "37px" }} /></a>
                    <a target="_blank" href="https://www.gov.br/pt-br"><img src="/assets/images/gov.png" alt="" style={{ width: "65px", height: "37px" }} /></a>
                </div>
            </HeaderRight>
        </SCHeader>
    );
}

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`;
const AccessibilityContainer = styled.div`
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.headerText};
`;

const SCHeader = styled.header`
    width:100%;
    height: 80px;
    padding: 0 20px;
    position: fixed;
    top: 0;
    right: 0;
    h1{
        color: ${({ theme }) => theme.colors.headerText};
        @media (max-width: 500px) {
            display: none;
        }
    }
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    @media (max-width: 500px) {
        width: 100% !important;
    }
`;