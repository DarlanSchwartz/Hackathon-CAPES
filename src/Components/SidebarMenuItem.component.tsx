import styled, { useTheme } from "styled-components";

export default function SidebarMenuItem({ icon, action, variant = "default" }: { icon: React.ReactNode, action: () => void; variant?: "default" | "active"; }) {
    const theme = useTheme();
    return (
        <SCSidebarMenuItem>
            <button onClick={action} style={variant === "active" ? { backgroundColor: theme.colors.lightPink2, borderRadius: 10 } : undefined}>
                {icon}
            </button>
        </SCSidebarMenuItem>
    );

}

const SCSidebarMenuItem = styled.li`
    height: 40px;
    width: 40px;
    svg{
        width: 100%;
        height: 100%;
        font-size: 30px;
        flex-shrink: 0;
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