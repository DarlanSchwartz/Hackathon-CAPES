import { useEffect, useState } from "react";
//@ts-ignore
let recognition: SpeechRecognition | null = null;

if ("webkitSpeechRecognition" in window) {
    //@ts-ignore
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = window.navigator.language;
}

export function useSpeechRecognition({ onSilence }: { onSilence: () => void; }) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [interimTranscript, setInterimTranscript] = useState("");
    const [browserSupportsSpeechRecognition, setBrowserSupportsSpeechRecognition] = useState(false);

    useEffect(() => {
        setBrowserSupportsSpeechRecognition(!!recognition);
        if (recognition) {
            let silenceTimeout: NodeJS.Timeout;
            //@ts-ignore
            recognition.onresult = (event) => {
                let finalTranscript = "";
                let interimTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                    else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
                setTranscript(finalTranscript);
                setInterimTranscript(interimTranscript);

                if (silenceTimeout) {
                    clearTimeout(silenceTimeout);
                }
                silenceTimeout = setTimeout(() => {
                    onSilence();
                }, 1000);


            };
        }
    }, []);

    function startListening() {
        if (recognition) {
            recognition.start();
            setIsListening(true);
        }
    }


    function resetTranscript() {
        setTranscript("");
        setInterimTranscript("");
    }

    function stopListening() {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }
    }

    return {
        isListening,
        transcript,
        interimTranscript,
        startListening,
        browserSupportsSpeechRecognition,
        stopListening,
        resetTranscript
    };
}