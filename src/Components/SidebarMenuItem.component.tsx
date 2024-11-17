import styled, { useTheme } from "styled-components";

export default function SidebarMenuItem({ icon, action, variant = "default", popup, showPopup }: { icon: React.ReactNode, action: () => void; variant?: "default" | "active"; popup?: React.ReactNode, showPopup?: boolean; }) {
    const theme = useTheme();
    return (
        <SCSidebarMenuItem style={{ zIndex: 999 }}>
            {
                showPopup && <div>{popup}</div>
            }
            <button onClick={action} style={variant === "active" ? { backgroundColor: theme.colors.lightPink2, borderRadius: 10 } : undefined}>
                {icon}
            </button>
        </SCSidebarMenuItem>
    );

}

const SCSidebarMenuItem = styled.li`
    height: 40px;
    width: 40px;
    position: relative;
    svg{
        width: 100%;
        height: 100%;
        font-size: 30px;
        flex-shrink: 0;
        color:${({ theme }) => theme.colors.sidebarIcon};
    }
    button{
        background: 0;
        border: 0;
        cursor: pointer;
        color: black;
        height: 100%;
        width: 100%;
        padding: 10px;
    }
`;