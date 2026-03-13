import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const trafficData = [
  { month: "Jan", organic: 12000, direct: 5400, social: 2400 },
  { month: "Feb", organic: 13200, direct: 5800, social: 2900 },
  { month: "Mar", organic: 15800, direct: 6200, social: 3100 },
  { month: "Apr", organic: 14500, direct: 5900, social: 3600 },
  { month: "May", organic: 18200, direct: 7100, social: 4200 },
  { month: "Jun", organic: 21000, direct: 7800, social: 4800 },
  { month: "Jul", organic: 23500, direct: 8200, social: 5100 },
];

const earningsData = [
  { month: "Jan", adsense: 320, affiliate: 180, sponsored: 0 },
  { month: "Feb", adsense: 380, affiliate: 220, sponsored: 150 },
  { month: "Mar", adsense: 450, affiliate: 280, sponsored: 200 },
  { month: "Apr", adsense: 410, affiliate: 310, sponsored: 0 },
  { month: "May", adsense: 520, affiliate: 350, sponsored: 300 },
  { month: "Jun", adsense: 610, affiliate: 400, sponsored: 250 },
  { month: "Jul", adsense: 680, affiliate: 420, sponsored: 400 },
];

const keywordData = [
  { keyword: "seo tools", rank: 5, prev: 8 },
  { keyword: "website audit", rank: 3, prev: 6 },
  { keyword: "meta tags", rank: 12, prev: 15 },
  { keyword: "keyword density", rank: 7, prev: 11 },
  { keyword: "serp checker", rank: 9, prev: 9 },
  { keyword: "ssl check", rank: 14, prev: 22 },
];

const DashboardCharts = () => {
  return (
    <div className="space-y-8">
      {/* Traffic Trends */}
      <div className="comic-card animate-slide-up">
        <h3 className="comic-heading text-xl text-foreground mb-4">📈 Traffic Trends (7 Months)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontFamily: "Comic Neue", fontWeight: 700, fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontFamily: "Comic Neue", fontWeight: 700, fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ border: "3px solid hsl(var(--border))", borderRadius: 8, fontFamily: "Comic Neue", fontWeight: 700, background: "hsl(var(--card))" }} />
              <Legend wrapperStyle={{ fontFamily: "Bangers", letterSpacing: "0.05em" }} />
              <Area type="monotone" dataKey="organic" stackId="1" fill="hsl(145, 63%, 42%)" stroke="hsl(145, 63%, 42%)" fillOpacity={0.6} />
              <Area type="monotone" dataKey="direct" stackId="1" fill="hsl(200, 80%, 55%)" stroke="hsl(200, 80%, 55%)" fillOpacity={0.6} />
              <Area type="monotone" dataKey="social" stackId="1" fill="hsl(270, 60%, 55%)" stroke="hsl(270, 60%, 55%)" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Earnings Over Time */}
      <div className="comic-card animate-slide-up" style={{ animationDelay: "150ms" }}>
        <h3 className="comic-heading text-xl text-foreground mb-4">💰 Earnings Over Time</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontFamily: "Comic Neue", fontWeight: 700, fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontFamily: "Comic Neue", fontWeight: 700, fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v}`} />
              <Tooltip contentStyle={{ border: "3px solid hsl(var(--border))", borderRadius: 8, fontFamily: "Comic Neue", fontWeight: 700, background: "hsl(var(--card))" }} formatter={(value: number) => `$${value}`} />
              <Legend wrapperStyle={{ fontFamily: "Bangers", letterSpacing: "0.05em" }} />
              <Bar dataKey="adsense" fill="hsl(145, 63%, 42%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="affiliate" fill="hsl(30, 90%, 55%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sponsored" fill="hsl(270, 60%, 55%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Keyword Rankings */}
      <div className="comic-card animate-slide-up" style={{ animationDelay: "300ms" }}>
        <h3 className="comic-heading text-xl text-foreground mb-4">🏆 Keyword Rankings</h3>
        <div className="space-y-3">
          {keywordData.map((kw, i) => {
            const improved = kw.prev - kw.rank;
            return (
              <div
                key={kw.keyword}
                className="flex items-center gap-4 p-3 rounded-lg bg-background/50 animate-slide-up"
                style={{ border: "2px solid hsl(var(--border))", animationDelay: `${(i + 1) * 80}ms` }}
              >
                <span className="comic-heading text-2xl text-foreground w-10 text-center">#{kw.rank}</span>
                <div className="flex-1">
                  <p className="font-bold text-foreground">{kw.keyword}</p>
                </div>
                <span className={`comic-badge text-xs ${improved > 0 ? "bg-secondary text-secondary-foreground" : improved < 0 ? "bg-destructive text-destructive-foreground" : "bg-muted text-foreground"}`}>
                  {improved > 0 ? `↑ ${improved}` : improved < 0 ? `↓ ${Math.abs(improved)}` : "—"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
