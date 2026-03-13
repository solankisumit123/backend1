import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const RandomNumberGenerator = () => {
    const [min, setMin] = useState("1");
    const [max, setMax] = useState("100");
    const [count, setCount] = useState("1");
    const [unique, setUnique] = useState(false);
    const [results, setResults] = useState<number[]>([]);

    const generate = () => {
        const mn = parseInt(min), mx = parseInt(max), cnt = Math.min(parseInt(count), 100);
        if (isNaN(mn) || isNaN(mx) || mn >= mx) return;
        if (unique && cnt > mx - mn + 1) { alert("Count exceeds available range for unique numbers"); return; }
        const nums: number[] = [];
        if (unique) {
            const pool = Array.from({ length: mx - mn + 1 }, (_, i) => mn + i);
            for (let i = 0; i < cnt; i++) {
                const idx = Math.floor(Math.random() * pool.length);
                nums.push(pool[idx]);
                pool.splice(idx, 1);
            }
        } else {
            for (let i = 0; i < cnt; i++) nums.push(Math.floor(Math.random() * (mx - mn + 1)) + mn);
        }
        setResults(nums);
    };

    const copyAll = () => navigator.clipboard.writeText(results.join(", "));

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">🎲</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Random Number Generator</h1>
                <p className="text-muted-foreground font-bold">Generate truly random numbers for any purpose</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Minimum</label>
                        <input type="number" value={min} onChange={e => setMin(e.target.value)}
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Maximum</label>
                        <input type="number" value={max} onChange={e => setMax(e.target.value)}
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">Count</label>
                        <input type="number" value={count} onChange={e => setCount(e.target.value)} min="1" max="100"
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-purple" />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <input type="checkbox" id="unique" checked={unique} onChange={e => setUnique(e.target.checked)} className="w-5 h-5 accent-purple-500" />
                    <label htmlFor="unique" className="font-bold text-foreground cursor-pointer">No Duplicates (Unique Numbers)</label>
                </div>

                <div className="flex flex-wrap gap-2">
                    {[["1-10", "1", "10"], ["1-100", "1", "100"], ["1-1000", "1", "1000"], ["Lottery 1-49", "1", "49"]].map(([l, mn, mx]) => (
                        <button key={l} onClick={() => { setMin(mn); setMax(mx); if (l === "Lottery 1-49") { setCount("6"); setUnique(true); } }}
                            className="px-3 py-1.5 bg-muted hover:bg-comic-purple hover:text-white rounded-xl text-xs font-bold border border-border">{l}</button>
                    ))}
                </div>

                <button onClick={generate} className="w-full bg-comic-purple hover:bg-comic-purple/90 text-white font-bold py-4 rounded-xl text-lg">
                    🎲 Generate Numbers
                </button>
            </div>

            {results.length > 0 && (
                <div className="bg-card border-4 border-border rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-black text-foreground">{results.length === 1 ? "Your Random Number" : `${results.length} Random Numbers`}</h3>
                        <button onClick={copyAll} className="px-4 py-2 bg-muted hover:bg-comic-blue hover:text-white rounded-xl text-sm font-bold">📋 Copy All</button>
                    </div>
                    {results.length === 1 ? (
                        <div className="text-center">
                            <div className="text-8xl font-black text-comic-purple py-4">{results[0]}</div>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-3 justify-center">
                            {results.map((n, i) => (
                                <div key={i} className="w-16 h-16 bg-comic-purple/10 border-2 border-comic-purple rounded-xl flex items-center justify-center text-lg font-black text-comic-purple hover:bg-comic-purple hover:text-white transition-colors cursor-pointer" onClick={() => navigator.clipboard.writeText(String(n))}>
                                    {n}
                                </div>
                            ))}
                        </div>
                    )}
                    {results.length > 1 && (
                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-muted/30 rounded-xl p-3 text-center">
                                <div className="font-bold text-muted-foreground">Min</div>
                                <div className="font-black">{Math.min(...results)}</div>
                            </div>
                            <div className="bg-muted/30 rounded-xl p-3 text-center">
                                <div className="font-bold text-muted-foreground">Max</div>
                                <div className="font-black">{Math.max(...results)}</div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            <SEOHead title="Random Number Generator - Free Online RNG Tool" description="Generate random numbers between any range instantly. Create unique lottery numbers, passwords, and more with our free random number generator." keywords="random number generator, random number, rng online, lottery number generator, random numbers free" schemaData={{ "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Random Number Generator", "applicationCategory": "UtilityApplication" }} />
            <div className="my-8"><AdBanner /></div>
            <SEOSection title="Random Number Generator" subtitle="True Randomness at Your Fingertips" description="Generate single or multiple random numbers in any range. Perfect for lottery picks, decisions, simulations, giveaways, and more." howToUse={["Set minimum and maximum values", "Choose how many numbers to generate", "Enable 'No Duplicates' for unique numbers", "Click Generate Numbers", "Copy results to clipboard"]} features={["Custom Range (Min-Max)", "Multiple Numbers at Once", "Unique/No Duplicate Mode", "Lottery Preset", "Copy All Feature"]} faqs={[{ question: "Are these truly random numbers?", answer: "Our tool uses JavaScript's Math.random(), which is a cryptographically pseudo-random number generator (PRNG). For most purposes like games and decisions, this is perfectly random." }]} relatedTools={[{ name: "Password Generator", emoji: "🔑", path: "/tools/password" }, { name: "Lorem Ipsum", emoji: "📝", path: "/tools/lorem-ipsum" }]} />
        </div>
    );
};
export default RandomNumberGenerator;
