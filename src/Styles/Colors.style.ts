export const LightColors = {
    background: "white",
    scrollBars: {
        track: "#f1f1f1",
        thumb: "#888",
    },
    purple: "#6750a4",
    wppGreen: "#12A234",
    lightPink: "#F7F2FA",
    lightPink2: "#E6E0E9",
    toggleBtnBackground: "#79747E",
    messageBackground: "#F3F3F3",
    sidebarIcon: "black",
    headerText: "black",
    text: "black",
};

export const DarkColors: typeof LightColors = {
    background: "#181a1b",
    scrollBars: {
        track: "#f1f1f1",
        thumb: "#888",
    },
    purple: "#6750a4",
    wppGreen: "#12A234",
    lightPink: "#1d2021",
    lightPink2: "#2c2230",
    toggleBtnBackground: "#79747E",
    messageBackground: "#1d2021",
    sidebarIcon: "white",
    headerText: "white",
    text: "white",
} as const;
