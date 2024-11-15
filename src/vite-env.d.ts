/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_URL: string;
}

declare global {
    namespace NodeJS {
        interface ImportMeta {
            env: ImportMetaEnv;
        }
    }
}