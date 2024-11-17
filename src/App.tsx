import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import PageHero from "./Pages/Hero.page";
import PageChat from "./Pages/Chat.page";
import LocalStorage from "./Services/LocalStorage.service";
import { LocalStorageKeys } from "./Protocols/Main.types";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";

export default function App() {

    useEffect(() => {
        const userId = LocalStorage.getItem<string>(LocalStorageKeys.USER_ID);
        if (!userId) {
            LocalStorage.setItem(LocalStorageKeys.USER_ID, uuid());
        }
    }, []);

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
