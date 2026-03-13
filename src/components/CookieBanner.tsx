import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie_consent", "accepted");
        setIsVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookie_consent", "declined");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom-5 duration-500">
            <div className="comic-card max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 bg-background border-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.2)]">

                <div className="flex items-start md:items-center gap-4">
                    <div className="hidden sm:flex h-12 w-12 rounded-full border-2 border-foreground bg-primary/20 items-center justify-center flex-shrink-0">
                        <Cookie className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                            <Cookie className="h-5 w-5 sm:hidden text-primary" />
                            We value your privacy
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed hidden sm:block">
                            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed sm:hidden">
                            We use cookies to improve your experience and serve personalized content.
                        </p>
                    </div>
                </div>

                <div className="flex w-full md:w-auto gap-3 items-center justify-end shrink-0">
                    <button
                        onClick={declineCookies}
                        className="px-4 py-2 border-2 border-foreground rounded-xl font-bold hover:bg-muted transition-colors text-sm w-full md:w-auto text-center"
                    >
                        Decline
                    </button>
                    <button
                        onClick={acceptCookies}
                        className="px-6 py-2 bg-primary text-black border-2 border-foreground rounded-xl font-bold hover:translate-y-[2px] hover:shadow-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all text-sm w-full md:w-auto text-center"
                    >
                        Accept All
                    </button>
                    <button
                        onClick={declineCookies}
                        className="md:hidden absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
