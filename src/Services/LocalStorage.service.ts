import { LocalStorageKeys } from "../Protocols/Main.types";
import Logger from "./Logger.service";

export default class LocalStorage {
    public static getItem<T = unknown>(
        storageKey: LocalStorageKeys,
        parse?: boolean
    ) {
        if (!storageKey) return null;
        const value = localStorage.getItem(storageKey);
        if (!value) return null;
        if (parse) {
            try {
                const parsedValue = JSON.parse(value);
                return parsedValue as T;
            } catch (error) {
                Logger.error("Error parsing value", error);
                return value as T;
            }
        }
        return value as T;
    }

    public static setItem(storageKey: LocalStorageKeys, value: unknown) {
        if (!storageKey) return;
        if (value === null || value === undefined) {
            Logger.info(`Removing item from storage key ${storageKey}`);
            return localStorage.removeItem(storageKey);
        }
        const jsonValue =
            typeof value !== "string" ? JSON.stringify(value) : value;
        return localStorage.setItem(storageKey, jsonValue);
    }

    public static removeItem(storageKey: LocalStorageKeys) {
        if (!storageKey) return;
        return localStorage.removeItem(storageKey);
    }
}
