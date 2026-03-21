import React from 'react';
import { Search, Zap, Link2, Key, BarChart3, Lock, FileEdit, Map, LineChart, Cloud, Shield, Globe } from 'lucide-react';

const FloatingBubble = ({ icon: Icon, top, left, delay, size = "md" }: { icon: React.ElementType, top: string, left: string, delay: string, size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-16 h-16 p-3",
    md: "w-24 h-24 p-5",
    lg: "w-32 h-32 p-8"
  };

  return (
    <div
      className={`absolute ${sizeClasses[size]} bg-white/20 backdrop-blur-2xl border border-white/50 rounded-full shadow-[0_8px_32px_rgba(255,255,255,0.15)] flex items-center justify-center animate-float-complex z-0 opacity-50 hover:opacity-100 hover:scale-110 hover:border-white/70 transition-all duration-1000`}
      style={{ top, left, animationDelay: delay, willChange: 'transform' }}
    >
      <Icon className="w-full h-full text-primary/70 drop-shadow-md" strokeWidth={1} />
    </div>
  );
};

const BackgroundDecorations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background Orbs */}
      <div className="bg-floating-orb top-[10%] left-[-5%] animate-float-slow opacity-60 bg-[#d946ef]"></div>
      <div className="bg-floating-orb top-[40%] right-[-10%] animate-float-complex opacity-40 bg-[#f59e0b]"></div>
      <div className="bg-floating-orb bottom-[-10%] left-[10%] animate-float opacity-50 bg-[#ec4899]"></div>
      <div className="bg-floating-orb top-[70%] right-[15%] animate-float-fast opacity-40 bg-[#8b5cf6]"></div>

      {/* Premium Floating Bubbles (Animated Icons) */}
      <FloatingBubble icon={Search} top="15%" left="8%" delay="0s" size="lg" />
      <FloatingBubble icon={Zap} top="65%" left="5%" delay="2s" size="md" />
      <FloatingBubble icon={Link2} top="10%" left="85%" delay="1s" size="md" />
      <FloatingBubble icon={BarChart3} top="45%" left="92%" delay="3s" size="lg" />
      <FloatingBubble icon={Shield} top="80%" left="80%" delay="4s" size="md" />
      <FloatingBubble icon={Map} top="30%" left="15%" delay="5s" size="sm" />
      <FloatingBubble icon={Cloud} top="12%" left="45%" delay="2s" size="sm" />
      <FloatingBubble icon={Globe} top="75%" left="40%" delay="6s" size="md" />
      <FloatingBubble icon={Lock} top="55%" left="18%" delay="1.5s" size="sm" />
      <FloatingBubble icon={FileEdit} top="25%" left="75%" delay="3.5s" size="sm" />

      {/* Decorative Dots */}
      <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-primary/40 rounded-full animate-pulse"></div>
      <div className="absolute top-[40%] right-[30%] w-3 h-3 bg-secondary/30 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
      <div className="absolute bottom-[15%] left-[40%] w-2 h-2 bg-accent/40 rounded-full animate-float-fast"></div>
    </div>
  );
};

export default BackgroundDecorations;
