import React, { useState } from "react";
import { createContext } from "react";
import Logger from "../Services/Logger.service";

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
            function removeMarkdown(text: string): string {
                return text.replace(/[#_*~`>\[\](){}\-!+\\|]/g, '');
            }
            const utterance = new SpeechSynthesisUtterance(removeMarkdown(text));
            utterance.voice = accessibilityActiveVoice;
            utterance.lang = "pt-BR";
            if (onEndSpeech) {
                utterance.onend = () => {
                    onEndSpeech();
                    speechSynthesis.cancel();
                };
            }
            else {
                utterance.onend = () => {
                    Logger.info("Speech ended", utterance);
                    speechSynthesis.cancel();
                };
            }

            Logger.info("Speaking", utterance);
            speechSynthesis.speak(utterance);
            utterance.onerror = (error) => {
                Logger.error("Error speaking", error);
            };

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
