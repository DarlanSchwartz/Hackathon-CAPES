import { useEffect, useState } from "react";

type TypewriterProps = {
    text: string;
    speed?: number; // Tempo em milissegundos entre cada caractere
};

export default function useTypeWriter({ text, speed = 100 }: TypewriterProps) {
    const [displayedText, setDisplayedText] = useState(text[0]);

    useEffect(() => {
        let i = -1;
        setDisplayedText(""); // Redefinir o texto exibido quando o texto muda

        function type() {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }

        const timer = setTimeout(type, speed); // Iniciar a digitação após um pequeno atraso

        // Cleanup para caso o componente seja desmontado
        return () => clearTimeout(timer);
    }, [text, speed]);

    return displayedText;
}