import React, { useState } from "react";
import { createContext } from "react";

type AccessibilityContextProps = {
    accessibilityEnabled: boolean;
    setAccessibilityEnabled: (value: boolean) => void;
    accessibilityActiveVoice?: SpeechSynthesisVoice;
    speechSynthesis?: SpeechSynthesis;
    speak: (text: string) => void;
    endSpeech: () => void;
};
export const AccessibilityContext = createContext<AccessibilityContextProps>({} as AccessibilityContextProps);

export function AccessibilityProvider({ children, }: { children?: React.ReactNode; }) {
    const [accessibilityEnabled, setAccessibilityEnabled] = useState<boolean>(false);
    const speechSynthesis = window.speechSynthesis;
    const voices = speechSynthesis.getVoices();
    const accessibilityActiveVoice = voices.find(voice => voice.lang === "pt-BR") ?? voices[0];
    function speak(text: string) {
        if (speechSynthesis && text && accessibilityActiveVoice) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = accessibilityActiveVoice;
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        }
    }

    function endSpeech() {
        if (speechSynthesis) {
            speechSynthesis.cancel();
        }
    }
    return (
        <AccessibilityContext.Provider value={{ accessibilityEnabled, setAccessibilityEnabled, speechSynthesis, accessibilityActiveVoice, speak, endSpeech }}>
            {children}
        </AccessibilityContext.Provider>
    );
}
