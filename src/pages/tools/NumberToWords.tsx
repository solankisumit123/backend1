import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Hash } from "lucide-react";
import ToolIcon from "@/components/ToolIcon";

const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

const numToWords = (n: number): string => {
    if (n === 0) return "Zero";
    if (n < 0) return "Minus " + numToWords(-n);
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + numToWords(n % 100) : "");
    if (n < 100000) return numToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + numToWords(n % 1000) : "");
    if (n < 10000000) return numToWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + numToWords(n % 100000) : "");
    if (n < 1000000000) return numToWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + numToWords(n % 10000000) : "");
    return numToWords(Math.floor(n / 1000000000)) + " Billion" + (n % 1000000000 ? " " + numToWords(n % 1000000000) : "");
};

const NumberToWords = () => {
    const [input, setInput] = useState("");
    const [copied, setCopied] = useState(false);

    const num = parseFloat(input);
    const isValid = input !== "" && !isNaN(num) && Number.isInteger(num) && Math.abs(num) <= 999999999999;
    const result = isValid ? numToWords(Math.abs(num)) + (num < 0 ? "" : "") + (num < 0 ? " (Negative)" : "") : "";
    const withCurrency = isValid ? "Rupees " + numToWords(Math.abs(Math.floor(num))) + " Only" : "";

    const copy = (text: string) => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    const examples = [1, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000];

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <ToolIcon icon={Hash} color="bg-comic-purple" size="lg" className="mx-auto mb-4" />
                <h1 className="comic-heading text-4xl text-foreground mb-2">Number to Words</h1>
                <p className="text-muted-foreground font-bold">Convert numbers to English words — supports Indian system (Lakh, Crore)</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <label className="block text-sm font-bold text-foreground mb-2">Enter Number</label>
                <input type="number" value={input} onChange={e => setInput(e.target.value)} placeholder="e.g. 1234567"
                    className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue transition-colors text-2xl text-center" />
                <p className="text-xs text-muted-foreground mt-2 text-center">Supports up to 999 Billion | Indian system (Lakh, Crore)</p>
            </div>

            {isValid && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-card border-4 border-comic-blue rounded-2xl p-5">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-xs font-bold text-muted-foreground">In Words</p>
                            <button onClick={() => copy(result)} className={`text-xs font-bold px-3 py-1 rounded-lg transition-colors ${copied ? "bg-comic-green text-white" : "bg-muted hover:bg-comic-blue hover:text-white"}`}>
                                {copied ? "✅ Copied" : "📋 Copy"}
                            </button>
                        </div>
                        <p className="text-xl font-black text-foreground">{result}</p>
                    </div>
                    <div className="bg-card border-4 border-comic-green rounded-2xl p-5">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-xs font-bold text-muted-foreground">As Currency (Indian)</p>
                            <button onClick={() => copy(withCurrency)} className="text-xs font-bold px-3 py-1 rounded-lg bg-muted hover:bg-comic-green hover:text-white transition-colors">📋 Copy</button>
                        </div>
                        <p className="text-xl font-black text-foreground">{withCurrency}</p>
                    </div>
                    <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                        <p className="text-sm font-bold text-muted-foreground">Formatted Number</p>
                        <p className="text-3xl font-black text-foreground">{Math.abs(num).toLocaleString("en-IN")}</p>
                    </div>
                </div>
            )}

            {/* Quick examples */}
            <div className="mt-6 bg-card border-4 border-border rounded-2xl p-5">
                <h3 className="font-black text-foreground mb-3">⚡ Quick Examples</h3>
                <div className="flex flex-wrap gap-2">
                    {examples.map(e => (
                        <button key={e} onClick={() => setInput(String(e))}
                            className="px-4 py-2 bg-muted hover:bg-comic-blue hover:text-white rounded-xl font-bold text-sm transition-colors border-2 border-border">
                            {e.toLocaleString("en-IN")}
                        </button>
                    ))}
                </div>
</div>

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};
export default NumberToWords;
