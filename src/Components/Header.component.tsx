import styled from "styled-components";

type HeaderProps = {
    sidebarWidth?: number;
};

export default function Header({ sidebarWidth = 0 }: HeaderProps) {
    return (
        <SCHeader style={{ width: `calc(100% - ${sidebarWidth}px)` }}>
            <h1>Atena</h1>
            <AccesibilityContainer>
                Acessibilidade: Deficiência Visual
                <Toggle></Toggle>
            </AccesibilityContainer>
            <img src="/assets/images/capes.png" alt="" style={{ width: "40px", height: "37px" }} />
            <img src="/assets/images/gov.png" alt="" style={{ width: "65px", height: "37px" }} />
        </SCHeader>
    );
}

const Toggle = styled.input.attrs({ type: "checkbox" })`

`;

const AccesibilityContainer = styled.div`
`;

const SCHeader = styled.header`
    width:100%;
    height: 80px;
    padding: 0 20px;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`;