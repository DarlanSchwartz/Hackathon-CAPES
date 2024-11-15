import React from "react";
import { DarkColors, LightColors } from "../Styles/Colors.style";
import { ThemeProvider } from "styled-components";
import ResetStyle from "../Styles/ResetStyle.style";
import { ToastContainer } from "react-toastify";
import useLocalStorage from "../Hooks/useLocalStorage.hook";
import { createContext } from "react";

import { Fonts } from "../Styles/Fonts.style";
import { LocalStorageKeys } from "../Protocols/Main.types";
import { ThemeContextProps } from "../Styles/Theme.types";

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps
);

/**
 * Context to handle the theme of the application
 */
export default function ThemeContextProvider({
    children,
}: {
    children?: React.ReactNode;
}) {
    const [darkMode, setDarkMode] = useLocalStorage<boolean>(
        LocalStorageKeys.DARK_MOD_ENABLED,
        true
    );
    const getCurrentColors = () => (darkMode ? DarkColors : LightColors);

    const themes = { fonts: Fonts, colors: getCurrentColors() };

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <ThemeProvider theme={themes}>
                <ResetStyle />
                <ToastContainer
                    limit={4}
                    pauseOnFocusLoss
                    theme={darkMode ? "dark" : "light"}
                />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
