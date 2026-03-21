import { Link, useLocation } from "react-router-dom";
import { Home, Settings, MessageSquare, User, HelpCircle, Zap } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: Home, path: "/", id: "Home" },
    { icon: Settings, path: "/tools", id: "Tools" },
    { icon: MessageSquare, path: "/blog", id: "Blog" },
    { icon: User, path: "/dashboard", id: "Profile" },
    { icon: HelpCircle, path: "/about", id: "About" },
  ];

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="fixed left-10 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center z-[100] h-fit">
        <div className="w-full mb-8 flex justify-center">
          <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-500 border-2 border-primary/20 bg-white/10 backdrop-blur-md">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="premium-sidebar-glass w-full rounded-[3.5rem] py-10 px-2 flex flex-col items-center gap-8 h-full border border-white/40 backdrop-blur-3xl bg-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`p-4 rounded-full transition-all duration-500 hover:scale-110 group relative ${
                  isActive
                    ? "bg-primary text-white shadow-[0_10px_20px_rgba(var(--primary),0.3)] scale-110"
                    : "text-secondary/60 hover:text-primary hover:bg-white/50"
                }`}
                title={item.id}
              >
                <item.icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                {!isActive && (
                  <div className="absolute left-full ml-4 px-3 py-1 bg-secondary text-white text-[10px] font-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 uppercase tracking-widest">
                    {item.id}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Mobile Floating Dock */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 md:hidden z-[100] w-[92%] max-w-[420px]">
        <div className="flex items-center justify-around p-2.5 px-4 rounded-[2.5rem] border-2 border-slate-100/50 backdrop-blur-3xl bg-white/70 shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`p-3 rounded-2xl transition-all duration-300 flex flex-col items-center gap-1 ${
                  isActive
                    ? "bg-primary text-white shadow-lg scale-110 -translate-y-1"
                    : "text-secondary/40 active:scale-95 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <item.icon className="w-5 h-5 sm:w-6 h-6" strokeWidth={isActive ? 3 : 2} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
