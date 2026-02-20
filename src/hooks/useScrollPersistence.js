import { useEffect, useRef } from "react";

export default function useScrollPersistence(key, trigger) {
    const isNewSearch = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            localStorage.setItem(key, window.scrollY);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [key]);

    useEffect(() => {
        const savedPosition = localStorage.getItem(key);
        if (isNewSearch.current) {
            window.scrollTo(0, 0);
            isNewSearch.current = false;
        } else if (savedPosition) {
            requestAnimationFrame(() => {
                window.scrollTo(0, Number(savedPosition));
            });
        }
    }, [trigger, key]);

    const markNewSearch = () => {
        isNewSearch.current = true;
    };

    return markNewSearch;
}