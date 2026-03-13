import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  to: string;
  color: string;
  delay?: number;
}

const ToolCard = ({ title, desc, icon: Icon, to, color, delay = 0 }: ToolCardProps) => {
  return (
    <Link to={to} className="block animate-slide-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="comic-card h-full flex flex-col items-start gap-3 cursor-pointer relative">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`} style={{ border: "3px solid hsl(var(--border))" }}>
          <Icon className="w-6 h-6" strokeWidth={3} />
        </div>
        <h3 className="comic-heading text-lg text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground font-bold">{desc}</p>
      </div>
    </Link>
  );
};

export default ToolCard;
