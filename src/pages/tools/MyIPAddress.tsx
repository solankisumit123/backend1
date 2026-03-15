import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Globe, MapPin, Loader2, Server, Globe2, ScanFace, Building, Wifi } from "lucide-react";

interface IPData {
    ip: string;
    city: string;
    region: string;
    country_name: string;
    org: string;
    postal: string;
    timezone: string;
    error?: boolean;
}

const MyIPAddress = () => {
    const [ipData, setIpData] = useState<IPData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIP = async () => {
            try {
                const res = await fetch("https://ipapi.co/json/");
                if (!res.ok) throw new Error("API Limit Reached");
                const data = await res.json();
                setIpData(data);
            } catch {
                setIpData({ ip: "Failed to load", city: "-", region: "-", country_name: "-", org: "-", postal: "-", timezone: "-", error: true });
            } finally {
                setLoading(false);
            }
        };

        fetchIP();
    }, []);

    const copyIp = () => {
        if (!ipData || ipData.error) return;
        navigator.clipboard.writeText(ipData.ip);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <h1 className="comic-heading text-4xl text-foreground mb-6 text-center">🌍 What Is My IP Address?</h1>
            <p className="text-center text-muted-foreground font-bold mb-8">View your public IP address, ISP, and geographic location.</p>

            <div className="comic-card mx-auto items-center flex flex-col justify-center animate-slide-up bg-comic-blue/5 border-comic-blue mb-8">
                {loading ? (
                    <Loader2 className="w-16 h-16 animate-spin text-comic-blue mb-4" strokeWidth={3} />
                ) : (
                    <div className="flex flex-col items-center">
                        <ScanFace className="w-16 h-16 text-comic-blue mb-4" strokeWidth={3} />
                        <h2 className="text-muted-foreground font-bold uppercase text-xs mb-2 tracking-widest">Your Public IP Address</h2>
                        <h3 className="comic-heading text-5xl md:text-6xl text-foreground break-all text-center">
                            {ipData?.ip}
                        </h3>
                        {!ipData?.error && (
                            <button onClick={copyIp} className="comic-btn text-xs bg-comic-blue text-white flex items-center gap-2 mt-6 px-6">
                                Copy IP Address
                            </button>
                        )}
                    </div>
                )}
            </div>

            {!loading && !ipData?.error && ipData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: "150ms" }}>
                    <div className="comic-card flex items-start gap-4 p-4">
                        <MapPin className="w-6 h-6 text-comic-red" strokeWidth={3} />
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Location</p>
                            <p className="font-bold text-foreground">{ipData.city}, {ipData.region}</p>
                            <p className="text-xs text-muted-foreground font-bold">{ipData.postal}</p>
                        </div>
                    </div>

                    <div className="comic-card flex items-start gap-4 p-4">
                        <Globe className="w-6 h-6 text-comic-green" strokeWidth={3} />
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Country</p>
                            <p className="font-bold text-foreground">{ipData.country_name}</p>
                        </div>
                    </div>

                    <div className="comic-card flex items-start gap-4 p-4">
                        <Building className="w-6 h-6 text-comic-orange" strokeWidth={3} />
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">ISP / Organization</p>
                            <p className="font-bold text-foreground">{ipData.org}</p>
                        </div>
                    </div>

                    <div className="comic-card flex items-start gap-4 p-4">
                        <Clock className="w-6 h-6 text-comic-purple" strokeWidth={3} />
                        <div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Timezone</p>
                            <p className="font-bold text-foreground font-mono">{ipData.timezone}</p>
                        </div>
                    </div>
</div>
            )}
            {ipData?.error && (
                <p className="text-center text-sm font-bold text-destructive">Could not fetch IP details. API limit reached or network blocked.</p>
            )}

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};

// Quick inline component to avoid import error
const Clock = ({ className, strokeWidth }: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

export default MyIPAddress;
