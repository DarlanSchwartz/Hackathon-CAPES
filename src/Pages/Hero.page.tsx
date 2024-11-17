import styled from "styled-components";
import PageDefaultSkeleton from "./DefaultSkeleton.page";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Common/Header.component";

export default function PageHero() {
    const navigate = useNavigate();
    function openTelegramChat() {
        window.open("https://t.me/AtenaIABot", "_blank");
    }
    return (
        <PageDefaultSkeleton>
            <Header />
            <SCPageLogin >
                <HeroImageContainer>
                    <Title>ATENA IA</Title>
                    <HeroImage src="/assets/images/hero-image.png" alt="" />
                    <HeroBackground src="/assets/images/hero-bg.svg" alt="" />
                </HeroImageContainer>
                <CallToAction>
                    <Introduction>
                        Atena é uma inteligência artificial avançada projetada para transformar a experiência de pesquisa acadêmica no Portal de Periódicos da CAPES. Inspirada na deusa da sabedoria, Atena combina inovação tecnológica, inteligência artificial e automação para oferecer suporte completo a pesquisadores em todas as etapas de produção, análise e publicação de conhecimento científico.
                    </Introduction>
                    <Button onClick={() => navigate("/chat")}>Conversar no Desktop</Button>
                    <ButtonWPP onClick={openTelegramChat}>Conversar no Telegram</ButtonWPP>
                </CallToAction>
            </SCPageLogin>
        </PageDefaultSkeleton>
    );
}

const HeroImageContainer = styled.div`
    position: fixed;
    bottom: 0;
    z-index: 2;
    left: 50%;
    transform: translateX(-70%);
    height: 90svh;

    flex-shrink: 0;
    min-width: 1000px;
    aspect-ratio: 16 / 16;
    pointer-events: none;
`;

const CallToAction = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    position: fixed;
    bottom: 240px;
    right: 140px;
    width: 498px;
    height: 280px;
    @media (max-width: 500px) {
        z-index: 10;
        position: absolute;
        right: 0;
        left: 50%;
        gap: 30px;
        transform: translateX(-50%);
        padding: 0 20px;
        p{
            font-size: 15px;
            width: 100%;
            max-width: 70%;
        }
   }
`;

const HeroBackground = styled.img`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-28%,-55%);
    height: 70svh;
    min-height: 1024px;
    pointer-events: none;
    z-index: -1;
    @media (max-width: 500px) {
        height: 50svh;
        min-height: 768px;
    }
`;
const HeroImage = styled.img`
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    pointer-events: none;
    @media (max-width: 500px) {
        left: 0%;
        bottom: 0;
        z-index: 10;
        position: absolute;
        opacity: 0.5;
    }
`;

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 49px;
    width: 300px;
    border-radius: 122.876px;
    background-color: ${({ theme }) => theme.colors.purple};
    text-align: center;
    font-family: Rubik;
    font-size: 17.203px;
    font-style: normal;
    font-weight: 400;
    line-height: 24.575px; /* 142.857% */
    letter-spacing: 0.123px;
    flex-shrink: 0;
    border: 0;
    &:hover {
        opacity: 0.8;
    }
    @media (max-width: 500px) {
        width: 80%;
        max-width: 80%;
    }
`;

const ButtonWPP = styled(Button)`
    border: 2px solid ${({ theme }) => theme.colors.wppGreen};
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.wppGreen};
`;

const SCPageLogin = styled.div`
    background-color: ${({ theme }) => theme.colors.background};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 140px 140px;
    @media (max-width: 500px) {
       *{
        overflow: hidden;
        width: 100%;
        max-width: 100%;
       }
    }
`;

const Title = styled.h1`
    font-family: Barlow;
    font-size: 240.935px;
    color: ${({ theme }) => theme.colors.text};
    text-shadow: 5px 4px 11px rgba(0, 0, 0, 0.25);
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    letter-spacing: 11.547px;
    position: absolute;
    top: -5%;
    z-index: -1;
    left: 35%;
    white-space: nowrap;
    @media (max-width: 500px) {
        font-size: 50px;
        top: 15%;
        left: 50%;
    }
`;

const Introduction = styled.p`
    color: ${({ theme }) => theme.colors.text};
    text-align: justify;
    font-family: Rubik;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.72px;
  
`;