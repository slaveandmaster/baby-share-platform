import { useEffect, useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
    let storageData = localStorage.getItem('auth');
    let initial = storageData ? JSON.parse(storageData) : defaultValue;
    const [value, setValue] = useState(initial);

    useEffect(() => {
        // console.log(value);
        
            localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [ value, setValue ]
}