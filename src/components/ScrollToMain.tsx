import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToMain – scrolls to the <main> element (tool section) on every
 * route change, so users land directly on the tool content and don't
 * have to manually scroll past the navbar and header ad.
 */
const ScrollToMain = () => {
    const { pathname } = useLocation();
    const prevPath = useRef<string>("");

    useEffect(() => {
        // Only scroll when the path actually changes (not on first mount where
        // the user may have a stored scroll position)
        if (prevPath.current === pathname) return;
        prevPath.current = pathname;

        // Small delay so the new page's DOM is ready
        const timer = setTimeout(() => {
            const mainEl = document.getElementById("main-content");
            if (mainEl) {
                mainEl.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }, 80);

        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
};

export default ScrollToMain;
