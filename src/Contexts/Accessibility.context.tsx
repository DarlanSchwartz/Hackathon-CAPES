import React, { useState } from "react";
import { createContext } from "react";
import Logger from "../Services/Logger.service";
import { useSpeech } from "react-text-to-speech";

type AccessibilityContextProps = {
    accessibilityEnabled: boolean;
    setAccessibilityEnabled: (value: boolean) => void;
    accessibilityActiveVoice?: SpeechSynthesisVoice;
    speechSynthesis?: SpeechSynthesis | null;
    speak: (text: string, onEndSpeech?: () => void) => void;
    endSpeech: () => void;
};
export const AccessibilityContext = createContext<AccessibilityContextProps>({} as AccessibilityContextProps);

export function AccessibilityProvider({ children }: { children?: React.ReactNode; }) {
    const [accessibilityEnabled, setAccessibilityEnabled] = useState<boolean>(false);
    const speechSynthesis = "speechSynthesis" in window ? window.speechSynthesis : null;
    const voices = speechSynthesis?.getVoices();
    const accessibilityActiveVoice = voices?.find(voice => voice.lang === "pt-BR") ?? voices?.[0];



    function speak(text: string, onEndSpeech?: () => void) {

        if (speechSynthesis && text && accessibilityActiveVoice) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = accessibilityActiveVoice;
            speechSynthesis.cancel();
            if (onEndSpeech) {
                utterance.onend = onEndSpeech;
            }
            return speechSynthesis.speak(utterance);
        }



        return Logger.error("Error speaking", "SpeechSynthesis not available");
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
