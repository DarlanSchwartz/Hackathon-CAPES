import { useState, useEffect } from "react";
import { LocalStorageKeys } from "../Protocols/Main.types";

type Response<T> = [T, (newState: T) => void];

export default function useLocalStorage<T>(key: LocalStorageKeys, initialState: T): Response<T> {
    const [state, setState] = useState(() => {
        const storageValue = localStorage.getItem(key);
        return storageValue ? JSON.parse(storageValue) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}
