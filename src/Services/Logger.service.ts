
export default class Logger {

    public static isEnabled = true;

    public static setEnabled(enabled: boolean) {
        this.isEnabled = enabled;
    }
    public static warn(...args: unknown[]) {
        return console.warn(...args);
    }

    public static error(...args: unknown[]) {
        return console.error(...args);
    }

    public static info(...args: unknown[]) {
        return console.info(...args);
    }
}

