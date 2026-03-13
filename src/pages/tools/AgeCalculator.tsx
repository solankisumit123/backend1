import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Calendar, Gift, Clock, Star } from "lucide-react";
import SEOHead from "@/components/SEO/SEOHead";
import SEOSection from "@/components/SEO/SEOSection";
import AdBanner from "../../components/AdBanner";

const AgeCalculator = () => {
    const [dob, setDob] = useState("");
    const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);
    const [result, setResult] = useState<null | {
        years: number; months: number; days: number;
        totalDays: number; totalWeeks: number; totalHours: number;
        totalMinutes: number; nextBirthday: number; dayOfWeek: string;
    }>(null);

    const calculate = () => {
        if (!dob) return;
        const birth = new Date(dob);
        const to = new Date(toDate);
        if (birth > to) { alert("Date of birth cannot be in the future!"); return; }

        let years = to.getFullYear() - birth.getFullYear();
        let months = to.getMonth() - birth.getMonth();
        let days = to.getDate() - birth.getDate();

        if (days < 0) { months--; const prev = new Date(to.getFullYear(), to.getMonth(), 0); days += prev.getDate(); }
        if (months < 0) { years--; months += 12; }

        const totalDays = Math.floor((to.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;

        const nextBday = new Date(to.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBday < to) nextBday.setFullYear(to.getFullYear() + 1);
        const nextBirthday = Math.ceil((nextBday.getTime() - to.getTime()) / (1000 * 60 * 60 * 24));

        const days_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayOfWeek = days_of_week[birth.getDay()];

        setResult({ years, months, days, totalDays, totalWeeks, totalHours, totalMinutes, nextBirthday, dayOfWeek });
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <Link to="/tools" className="comic-btn text-xs bg-background text-foreground flex items-center gap-2 w-fit mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-comic-orange text-white mb-4 text-3xl">🎂</div>
                <h1 className="comic-heading text-4xl text-foreground mb-2">Age Calculator</h1>
                <p className="text-muted-foreground font-bold">Calculate your exact age in years, months, days and more!</p>
            </div>

            <div className="bg-card border-4 border-border rounded-2xl p-6 shadow-lg mb-6">
                <div className="grid gap-4">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📅 Date of Birth</label>
                        <input
                            type="date"
                            value={dob}
                            onChange={e => setDob(e.target.value)}
                            max={new Date().toISOString().split("T")[0]}
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-2">📆 Age At Date (Today by default)</label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={e => setToDate(e.target.value)}
                            className="w-full border-2 border-border rounded-xl px-4 py-3 bg-background text-foreground font-bold focus:outline-none focus:border-comic-orange transition-colors"
                        />
                    </div>
                    <button
                        onClick={calculate}
                        className="w-full bg-comic-orange hover:bg-comic-orange/90 text-white font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
                    >
                        🎂 Calculate My Age
                    </button>
                </div>
            </div>

            {result && (
                <div className="space-y-4 animate-fade-in">
                    {/* Main Age */}
                    <div className="bg-card border-4 border-comic-orange rounded-2xl p-6 text-center shadow-lg">
                        <p className="text-sm font-bold text-muted-foreground mb-2">Your Exact Age</p>
                        <div className="flex justify-center gap-6">
                            {[
                                { val: result.years, label: "Years" },
                                { val: result.months, label: "Months" },
                                { val: result.days, label: "Days" },
                            ].map(({ val, label }) => (
                                <div key={label} className="text-center">
                                    <div className="text-4xl font-black text-comic-orange">{val}</div>
                                    <div className="text-sm font-bold text-muted-foreground">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Born on */}
                    <div className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                        <p className="font-bold text-foreground">📅 You were born on a <span className="text-comic-orange">{result.dayOfWeek}</span></p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: "📅", label: "Total Days", val: result.totalDays.toLocaleString() },
                            { icon: "📆", label: "Total Weeks", val: result.totalWeeks.toLocaleString() },
                            { icon: "⏰", label: "Total Hours", val: result.totalHours.toLocaleString() },
                            { icon: "⏱️", label: "Total Minutes", val: result.totalMinutes.toLocaleString() },
                        ].map(({ icon, label, val }) => (
                            <div key={label} className="bg-card border-4 border-border rounded-2xl p-4 text-center">
                                <div className="text-2xl mb-1">{icon}</div>
                                <div className="text-xl font-black text-foreground">{val}</div>
                                <div className="text-xs font-bold text-muted-foreground">{label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Next Birthday */}
                    <div className="bg-card border-4 border-comic-green rounded-2xl p-4 text-center">
                        <p className="font-bold text-foreground">🎉 Next Birthday in <span className="text-comic-green text-xl font-black">{result.nextBirthday}</span> days!</p>
                    </div>
                </div>
            )}
            {/* ── SEO SECTION ── */}
            <SEOHead
                title="Exact Age Calculator by Date of Birth - WebInsight Pro"
                description="Calculate your exact age in years, months, and days from your date of birth. Find out your total days alive, next birthday countdown, and the day of the week you were born."
                keywords="age calculator, calculate age by dob, exact age finder, chronological age, age in days"
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "WebInsight Pro Age Calculator",
                    "operatingSystem": "All Browsers",
                    "applicationCategory": "UtilitiesApplication"
                }}
            />

            <SEOSection
                title="Accurate Chronological Age Calculator Online"
                subtitle="Calculate Your Life in Years, Months, Days, and Even Minutes"
                description="WebInsight Pro's Age Calculator is a highly precise tool designed to tell you exactly how old you are. Whether you need it for a job application form, a school admission, or just for fun, our tool provides a detailed breakdown of your life statistics, including your next birthday countdown."
                howToUse={[
                    "Select or type your 'Date of Birth' in the first field.",
                    "Optionally, change the 'Age At Date' if you want to know your age at a specific point in the future or past.",
                    "Click the 'Calculate My Age' button.",
                    "Instantly see your age in Years, Months, and Days.",
                    "Scroll down to see advanced stats like total days alive and your next birthday!"
                ]}
                features={[
                    "Precision Math: Automatically calculates leap years and month lengths.",
                    "Advanced Stats: See your life in weeks, hours, and minutes.",
                    "Next Birthday: Get a live countdown in days to your next celebration.",
                    "Birth Day of Week: Find out if you were a Monday child or a Sunday star!",
                    "100% Free: No limits, no signups, just instant results."
                ]}
                faqs={[
                    {
                        question: "How accurate is this age calculator?",
                        answer: "Our tool is 100% accurate as it uses the Gregorian calendar and standard time-delta algorithms. It correctly accounts for leap years (366 days) and varying days in each month."
                    },
                    {
                        question: "Can I calculate my age on a future date?",
                        answer: "Yes! Simply change the 'Age At Date' field to any date in the future, and the tool will tell you how old you will be at that exact moment."
                    },
                    {
                        question: "Why do some calculators show different days?",
                        answer: "Some simple calculators don't account for months with different days (28, 30, 31) or leap years. WebInsight Pro uses a professional-grade algorithm to ensure your chronological age is exact."
                    }
                ]}
                relatedTools={[
                    { name: "BMI Calculator", emoji: "⚖️", path: "/tools/bmi-calculator" },
                    { name: "Calorie Calculator", emoji: "🍎", path: "/tools/calorie-calculator" },
                    { name: "Stopwatch", emoji: "⏱️", path: "/tools/stopwatch" },
                    { name: "QR Generator", emoji: "📱", path: "/tools/qr-generator" }
                ]}
            />
        </div>
    );
};

export default AgeCalculator;
