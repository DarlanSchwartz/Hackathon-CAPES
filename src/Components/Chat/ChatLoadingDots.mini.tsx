import { ThreeDots } from "react-loader-spinner";
import { useTheme } from "styled-components";


export default function ChatLoadingDots() {
    const theme = useTheme();
    return (
        <div style={{ alignSelf: "flex-end" }}>
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color={theme.colors.purple}
                radius="9"
                ariaLabel="three-dots-loading"
            />
        </div>
    );
}