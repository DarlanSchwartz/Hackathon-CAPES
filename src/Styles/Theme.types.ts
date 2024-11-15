import { LightColors } from "../Styles/Colors.style";
import { Fonts } from "../Styles/Fonts.style";

export type Theme = {
    colors: typeof LightColors;
    fonts: typeof Fonts;
};

export type ThemeContextProps = {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
};
