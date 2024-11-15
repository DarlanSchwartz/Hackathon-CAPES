import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ResetStyle from "./Styles/ResetStyle.style.ts";
import "react-toastify/dist/ReactToastify.css";
import ThemeContextProvider from "./Contexts/Theme.context.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 60,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={client}>
        <ThemeContextProvider>
            <BrowserRouter>
                <ResetStyle />
                <App />
            </BrowserRouter>
        </ThemeContextProvider>
    </QueryClientProvider>
);
