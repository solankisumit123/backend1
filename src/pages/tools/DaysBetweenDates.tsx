import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const DaysBetweenDates = () => {
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState(new Date().toISOString().split("T")[0]);
    const [result, setResult] = useState<null | { days: number; weeks: number; months: number; years: number; workdays: number; weekends: number }>(null);

    const calculate = () => {
        if (!date1 || !date2) return;
        const d1 = new Date(date1), d2 = new Date(date2);
        const [from, to] = d1 <= d2 ? [d1, d2] : [d2, d1];
        const days = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
        const months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
        const years = to.getFullYear() - from.getFullYear();
        let workdays = 0, weekends = 0;
        const cur = new Date(from);
        while (cur <= to) {
            const day = cur.getDay();
            if (day === 0 || day === 6) weekends++;
            else workdays++;
            cur.setDate(cur.getDate() + 1);
        }
        setResult({ days, weeks, months, years, workdays, weekends });
    };

    const quickDates = [
        { label: "📅 Today & Tomorrow", d1: new Date().toISOString().split("T")[0], d2: new Date(Date.now() + 86400000).toISOString().split("T")[0] },
        { label: "🎂 This Year", d1: new Date(new Date().getFullYear(), 0, 1).toISOString().split("T")[0], d2: new Date(new Date().getFullYear(), 11, 31).toISOString().split("T")[0] },
        { label: "📆 Last 30 Days", d1: new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0], d2: new Date().toISOString().split("T")[0] },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="text-5xl mb-3">📅</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Days Between Dates</h1>
                <p className="text-muted-foreground font-bold">Calculate days, weeks, months between any two dates</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg space-y-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📅 Start Date</label>
                        <input type="date" value={date1} onChange={e => setDate1(e.target.value)}
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📅 End Date</label>
                        <input type="date" value={date2} onChange={e => setDate2(e.target.value)}
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-blue" />
                    </div>
                </div>

                <div>
                    <p className="text-xs font-bold text-muted-foreground mb-2">⚡ Quick Select</p>
                    <div className="flex flex-wrap gap-2">
                        {quickDates.map(q => (
                            <button key={q.label} onClick={() => { setDate1(q.d1); setDate2(q.d2); }}
                                className="px-3 py-1.5 bg-muted hover:bg-comic-blue hover:text-white rounded-lg text-xs font-bold transition-colors border-2 border-border">
                                {q.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={calculate}
                    className="w-full bg-comic-blue hover:bg-comic-blue/90 text-white font-black py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                    📅 Calculate Difference
                </button>
            </div>

            {result && (
                <div className="grid grid-cols-2 gap-4 animate-fade-in">
                    {[
                        { emoji: "📅", label: "Total Days", val: result.days.toLocaleString(), color: "border-comic-blue" },
                        { emoji: "📆", label: "Total Weeks", val: result.weeks.toLocaleString() + (result.days % 7 > 0 ? ` + ${result.days % 7} days` : ""), color: "border-comic-orange" },
                        { emoji: "🗓️", label: "Total Months", val: result.months.toLocaleString(), color: "border-comic-green" },
                        { emoji: "🎂", label: "Total Years", val: result.years.toLocaleString(), color: "border-comic-purple" },
                        { emoji: "💼", label: "Working Days", val: result.workdays.toLocaleString(), color: "border-comic-red" },
                        { emoji: "🎉", label: "Weekends", val: result.weekends.toLocaleString(), color: "border-border" },
                    ].map(({ emoji, label, val, color }) => (
                        <div key={label} className={`bg-card border-4 ${color} rounded-2xl p-4 text-center`}>
                            <div className="text-2xl mb-1">{emoji}</div>
                            <div className="text-2xl font-black text-foreground">{val}</div>
                            <div className="text-xs font-bold text-muted-foreground">{label}</div>
                        </div>
                    ))}
                </div>
            )}

            {/* SEO Content & Keywords */}
            <div className="mt-12 bg-card border-4 border-border rounded-2xl p-6 prose prose-lg max-w-none text-foreground">
                <h2 className="text-2xl font-black mb-4">Calculate Days Between Two Dates Instantly</h2>
                <p>A simple, free online tool to calculate exactly <strong>how many days are between two dates</strong>. Whether you're counting down to a special event, determining the length of a project, or just curious about the number of weeks or months until a deadline, our <strong>Days Between Dates Calculator</strong> provides an instant answer.</p>

                <h3 className="text-xl font-bold mt-6 mb-3">Why Use a Date Difference Calculator?</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Event Planning:</strong> Calculate how many days are left until a wedding, birthday, or vacation.</li>
                    <li><strong>Project Management:</strong> Calculate working days (business days) and weekends for accurate project scheduling.</li>
                    <li><strong>Visa & Travel:</strong> Easily track days spent abroad to comply with visa regulations (e.g., Schengen 90/180 rule).</li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-3">How to Calculate Working Days Only?</h3>
                <p>Our tool doesn't just calculate total calendar days. It automatically breaks down the timeframe into weeks, months, total years, <strong>business days (working days)</strong>, and weekend days. Just select your start and end dates!</p>

                <p className="mt-4 text-sm text-muted-foreground">Keywords: days between dates calculator, how many days between two dates, date difference calculator, working days calculator, count business days, date calculator online, days until calculator, month calculator between two dates.</p>
</div>

      {/* ── AD BANNERS ── */}
      
      

        </div>
    );
};
export default DaysBetweenDates;
