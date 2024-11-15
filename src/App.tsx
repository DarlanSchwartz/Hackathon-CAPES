import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import PageHero from "./Pages/Hero.page";
import PageChat from "./Pages/Chat.page";

export default function App() {
    return (
        <SCAppWrapper>
            <Routes>
                <Route path="/" element={<PageHero />} />
                <Route path="/chat" element={<PageChat />} />
            </Routes>
        </SCAppWrapper>
    );
}

const SCAppWrapper = styled.div`
    display: flex;
    width: 100dvw;
    height: 100dvh;
`;
