import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

const statusCodes: { code: number; name: string; desc: string; cat: string }[] = [
    // 1xx
    { code: 100, name: "Continue", desc: "Server received request headers. Client should send body.", cat: "1xx Informational" },
    { code: 101, name: "Switching Protocols", desc: "Server switching protocols as requested (e.g., WebSocket).", cat: "1xx Informational" },
    // 2xx
    { code: 200, name: "OK", desc: "Request succeeded. Standard success response.", cat: "2xx Success" },
    { code: 201, name: "Created", desc: "Request fulfilled, new resource created.", cat: "2xx Success" },
    { code: 204, name: "No Content", desc: "Request succeeded, no content to return.", cat: "2xx Success" },
    { code: 206, name: "Partial Content", desc: "Partial resource returned (range requests).", cat: "2xx Success" },
    // 3xx
    { code: 301, name: "Moved Permanently", desc: "Resource permanently moved to new URL. SEO: passes link juice.", cat: "3xx Redirection" },
    { code: 302, name: "Found (Temp Redirect)", desc: "Temporary redirect. Browser follows to new URL.", cat: "3xx Redirection" },
    { code: 304, name: "Not Modified", desc: "Resource not changed since last request. Use cached version.", cat: "3xx Redirection" },
    { code: 307, name: "Temporary Redirect", desc: "Like 302, but method & body must not change.", cat: "3xx Redirection" },
    { code: 308, name: "Permanent Redirect", desc: "Like 301, but method & body must not change.", cat: "3xx Redirection" },
    // 4xx
    { code: 400, name: "Bad Request", desc: "Server can't process request due to client error (syntax, params).", cat: "4xx Client Error" },
    { code: 401, name: "Unauthorized", desc: "Authentication required. Valid credentials needed.", cat: "4xx Client Error" },
    { code: 403, name: "Forbidden", desc: "Server refuses request. Authenticated but no permission.", cat: "4xx Client Error" },
    { code: 404, name: "Not Found", desc: "Requested resource not found on server.", cat: "4xx Client Error" },
    { code: 405, name: "Method Not Allowed", desc: "HTTP method not allowed for this resource.", cat: "4xx Client Error" },
    { code: 408, name: "Request Timeout", desc: "Server timed out waiting for the request.", cat: "4xx Client Error" },
    { code: 409, name: "Conflict", desc: "Request conflicts with current state of the resource.", cat: "4xx Client Error" },
    { code: 410, name: "Gone", desc: "Resource permanently deleted. 404 but intentional.", cat: "4xx Client Error" },
    { code: 413, name: "Payload Too Large", desc: "Request body too large for server to process.", cat: "4xx Client Error" },
    { code: 429, name: "Too Many Requests", desc: "Rate limit exceeded. Slow down requests.", cat: "4xx Client Error" },
    { code: 451, name: "Unavailable For Legal Reasons", desc: "Resource blocked due to legal demands.", cat: "4xx Client Error" },
    // 5xx
    { code: 500, name: "Internal Server Error", desc: "Server encountered an unexpected error.", cat: "5xx Server Error" },
    { code: 502, name: "Bad Gateway", desc: "Server received invalid response from upstream server.", cat: "5xx Server Error" },
    { code: 503, name: "Service Unavailable", desc: "Server temporarily down (maintenance or overloaded).", cat: "5xx Server Error" },
    { code: 504, name: "Gateway Timeout", desc: "Upstream server didn't respond in time.", cat: "5xx Server Error" },
];

const catColors: Record<string, string> = {
    "1xx Informational": "border-comic-blue bg-comic-blue/5",
    "2xx Success": "border-comic-green bg-comic-green/5",
    "3xx Redirection": "border-comic-orange bg-comic-orange/5",
    "4xx Client Error": "border-comic-red bg-comic-red/5",
    "5xx Server Error": "border-comic-purple bg-comic-purple/5",
};

const HTTPStatusCodeChecker = () => {
    const [search, setSearch] = useState("");

    const filtered = statusCodes.filter(s =>
        s.code.toString().includes(search) ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.desc.toLowerCase().includes(search.toLowerCase())
    );

    const grouped = filtered.reduce<Record<string, typeof statusCodes>>((acc, s) => {
        (acc[s.cat] = acc[s.cat] || []).push(s);
        return acc;
    }, {});

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🌐</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">HTTP Status Code Checker</h1>
                <p className="text-muted-foreground font-bold">Quick reference for all HTTP status codes</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-4 mb-6">
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="Search by code or name... (e.g. 404, redirect)"
                    className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue text-lg" />
            </div>

            <div className="space-y-6">
                {Object.entries(grouped).map(([cat, codes]) => (
                    <div key={cat}>
                        <h2 className="comic-heading text-xl text-foreground mb-3">{cat}</h2>
                        <div className="space-y-2">
                            {codes.map(s => (
                                <div key={s.code} className={`border-4 rounded-2xl p-4 ${catColors[cat] || "border-border"}`}>
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl font-black text-foreground shrink-0">{s.code}</span>
                                        <div>
                                            <div className="font-black text-foreground">{s.name}</div>
                                            <div className="text-sm font-bold text-muted-foreground">{s.desc}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">HTTP Status Code Reference</h2>
                <p>Complete guide to <strong>HTTP status codes</strong> with explanations. From 200 OK to 500 Internal Server Error — understand what every status code means. Essential for web developers, SEO professionals, and system administrators.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: http status codes, 404 error meaning, 301 redirect, 500 internal server error, http response codes, status code checker, web developer reference.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );
};
export default HTTPStatusCodeChecker;
