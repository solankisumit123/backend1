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

import { ArrowRight } from "lucide-react";

const ToolCard = ({ title, desc, icon: Icon, to, delay = 0 }: ToolCardProps) => {
  return (
    <Link 
      to={to} 
      className="liquid-card p-6 flex flex-col items-center group relative rounded-[2.5rem] animate-slide-up h-full" 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="icon-box-smooth w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-primary mb-5 border border-white/20 relative z-10">
        <Icon className="w-8 h-8" strokeWidth={2} />
        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>
      
      <h3 className="font-black text-lg text-secondary mb-2 text-center group-hover:smooth-gradient-text transition-all duration-500">
        {title}
      </h3>
      
      <p className="text-xs font-semibold text-secondary/60 text-center mb-4 leading-relaxed line-clamp-2">
        {desc}
      </p>

      <div className="mt-auto flex items-center gap-2 text-xs font-black text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-700">
        Try Now <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
};

export default ToolCard;
