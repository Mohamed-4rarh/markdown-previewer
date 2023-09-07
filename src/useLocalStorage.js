import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return JSON.parse(localStorage.getItem(key)) !== null ? JSON.parse(localStorage.getItem(key)) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

//value => is the localStorage data inside the given 'key'
//setValue => is a function to update the value inside the localStorage 'key'