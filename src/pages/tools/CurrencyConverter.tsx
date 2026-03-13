import { useState } from "react";
import { ArrowLeft, ArrowRightLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AdBanner from "../../components/AdBanner";

// Static rates relative to USD (updated periodically)
const RATES: Record<string, number> = {
    USD: 1, INR: 83.5, EUR: 0.92, GBP: 0.79, AED: 3.67, SGD: 1.34,
    AUD: 1.54, CAD: 1.36, JPY: 149.5, CNY: 7.24, SAR: 3.75, CHF: 0.9,
    MYR: 4.72, BDT: 110.0, PKR: 278.0, LKR: 315.0, NPR: 133.0,
    THB: 35.5, KRW: 1335.0, HKD: 7.82, SEK: 10.5, NOK: 10.6,
    MXN: 17.15, BRL: 4.97, ZAR: 18.6, RUB: 90.0, TRY: 32.0,
};

const SYMBOLS: Record<string, string> = {
    USD: "$", INR: "₹", EUR: "€", GBP: "£", AED: "د.إ", SGD: "S$",
    AUD: "A$", CAD: "C$", JPY: "¥", CNY: "¥", SAR: "﷼", CHF: "Fr",
    MYR: "RM", BDT: "৳", PKR: "₨", LKR: "Rs", NPR: "₨", THB: "฿",
    KRW: "₩", HKD: "HK$", SEK: "kr", NOK: "kr", MXN: "$", BRL: "R$",
    ZAR: "R", RUB: "₽", TRY: "₺",
};

const currencies = Object.keys(RATES);

const CurrencyConverter = () => {
    const [amount, setAmount] = useState("1");
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("INR");
    const [result, setResult] = useState<number | null>(null);

    const convert = () => {
        const amt = parseFloat(amount);
        if (isNaN(amt)) return;
        const inUSD = amt / RATES[from];
        setResult(+(inUSD * RATES[to]).toFixed(4));
    };

    const swap = () => {
        setFrom(to);
        setTo(from);
        setResult(null);
    };

    const popularPairs = [
        ["USD", "INR"], ["EUR", "INR"], ["GBP", "INR"], ["AED", "INR"],
        ["USD", "EUR"], ["USD", "GBP"], ["INR", "USD"],
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">💱</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Currency Converter</h1>
                <p className="text-muted-foreground font-bold">Convert between 30+ world currencies</p>
                <p className="text-xs text-muted-foreground mt-1">Rates are indicative — updated periodically</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-6">
                <div>
                    <label className="block text-sm font-bold text-foreground mb-2">💵 Amount</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount"
                        className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green text-xl" />
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <label className="block text-sm font-bold text-foreground mb-2">From</label>
                        <select value={from} onChange={e => setFrom(e.target.value)}
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green">
                            {currencies.map(c => <option key={c} value={c}>{c} — {SYMBOLS[c]}</option>)}
                        </select>
                    </div>
                    <button onClick={swap} className="mt-6 p-3 bg-comic-green text-white rounded-xl border-2 border-border hover:bg-comic-green/80 transition-colors">
                        <ArrowRightLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                        <label className="block text-sm font-bold text-foreground mb-2">To</label>
                        <select value={to} onChange={e => setTo(e.target.value)}
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-green">
                            {currencies.map(c => <option key={c} value={c}>{c} — {SYMBOLS[c]}</option>)}
                        </select>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-bold text-muted-foreground mb-2">⚡ Popular Pairs</p>
                    <div className="flex flex-wrap gap-2">
                        {popularPairs.map(([f, t]) => (
                            <button key={f + t} onClick={() => { setFrom(f); setTo(t); setResult(null); }}
                                className="px-3 py-1.5 bg-muted hover:bg-comic-green hover:text-white rounded-lg text-xs font-bold transition-colors border-2 border-border">
                                {f} → {t}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={convert}
                    className="w-full bg-comic-green hover:bg-comic-green/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    💱 Convert
                </button>
            </div>

            {result !== null && (
                <div className="bg-card border-4 border-comic-green rounded-2xl p-6 text-center animate-fade-in space-y-3">
                    <p className="text-lg font-bold text-muted-foreground">{amount} {from} =</p>
                    <div className="text-5xl font-black text-comic-green">{SYMBOLS[to]}{result.toLocaleString()}</div>
                    <p className="text-xl font-black text-foreground">{to}</p>
                    <div className="grid grid-cols-2 gap-3 mt-4 text-sm font-bold">
                        <div className="bg-muted rounded-xl p-3">
                            <div className="text-muted-foreground">1 {from}</div>
                            <div>{SYMBOLS[to]}{(RATES[to] / RATES[from]).toFixed(4)} {to}</div>
                        </div>
                        <div className="bg-muted rounded-xl p-3">
                            <div className="text-muted-foreground">1 {to}</div>
                            <div>{SYMBOLS[from]}{(RATES[from] / RATES[to]).toFixed(4)} {from}</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Free Currency Converter Online</h2>
                <p>Convert between <strong>USD to INR, EUR to INR, GBP to INR, AED to INR</strong> and 30+ other currencies instantly. Our currency converter uses regularly updated exchange rates for accurate conversions.</p>
                <p className="mt-4 text-sm text-muted-foreground">Keywords: currency converter, usd to inr, eur to inr, gbp to inr, aed to inr, dollar to rupee, exchange rate calculator, forex converter online free.</p>
            </div>
            <div className="mt-6"><AdBanner dataAdSlot="9274146632" dataAdFormat="auto" /></div>
        </div>
    );
};
export default CurrencyConverter;
