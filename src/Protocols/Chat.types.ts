export type ChatResponse = {
    index: number;
    message: {
        role: string;
        content: string;
        refusal?: any;
    };
    logprobs?: any;
    finish_reason: string;
};

export const enum ChatRoles {
    USER = "user",
    SYSTEM = "system"
}