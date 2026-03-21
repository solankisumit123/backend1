import type { LucideIcon } from "lucide-react";

interface ToolIconProps {
  icon: LucideIcon;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ToolIcon = ({ icon: Icon, color = "bg-primary", size = "md", className = "" }: ToolIconProps) => {
  const sizeClasses = {
    sm: "w-10 h-10 border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
    md: "w-14 h-14 border-[3px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    lg: "w-20 h-20 border-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
  };

  const iconSizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  // Convert text-comic-blue to bg-comic-blue if needed
  const bgColor = color.startsWith("text-") ? color.replace("text-", "bg-") : color;

  return (
    <div className={`relative ${className}`}>
      {/* 3D Offset Background (Shadow effect) */}
      <div className={`absolute inset-0 bg-slate-900 rounded-2xl ${size === "sm" ? "translate-x-[2px] translate-y-[2px]" : size === "lg" ? "translate-x-[6px] translate-y-[6px]" : "translate-x-[4px] translate-y-[4px]"}`}></div>
      
      {/* Main Icon Box */}
      <div className={`relative ${sizeClasses[size]} ${bgColor} rounded-2xl border-slate-900 flex items-center justify-center text-white z-10 transition-transform active:translate-x-[2px] active:translate-y-[2px]`}>
        <Icon className={iconSizes[size]} strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default ToolIcon;
