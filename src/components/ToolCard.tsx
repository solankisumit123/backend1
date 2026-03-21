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

import ToolIcon from "./ToolIcon";
import { ArrowRight } from "lucide-react";

const ToolCard = ({ title, desc, icon: Icon, to, color, delay = 0 }: ToolCardProps) => {
  return (
    <Link 
      to={to} 
      className="liquid-card p-4 sm:p-6 flex flex-col items-center group relative rounded-[2.5rem] animate-slide-up h-full border-2 border-slate-100/50 hover:border-primary/30 transition-all duration-500" 
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Comic-style Icon Box */}
      <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
        <ToolIcon icon={Icon} color={color} />
        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
      </div>
      
      <h3 className="font-black text-lg text-secondary mb-2 text-center group-hover:smooth-gradient-text transition-all duration-500 px-2">
        {title}
      </h3>
      
      <p className="text-xs font-bold text-secondary/50 text-center mb-4 leading-relaxed line-clamp-2 px-1">
        {desc}
      </p>

      <div className="mt-auto flex items-center gap-2 text-xs font-black text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-700">
        Launch Tool <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
};

export default ToolCard;
