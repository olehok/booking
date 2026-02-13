import { useEffect, useRef, useState } from "react";

export default function useAutoHideHeader(offset = 50, hoverZone = 20) {
    const [hidden, setHidden] = useState(false);
    const lastScroll = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;

            if (current > lastScroll.current && current > offset) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            lastScroll.current = current;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [offset]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (hidden && e.clientY <= hoverZone) {
                setHidden(false);
            } else if (!hidden && e.clientY > offset && window.scrollY > offset) {
                setHidden(true);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [hidden, hoverZone]);

    return hidden;
}