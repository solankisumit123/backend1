import { Link, useLocation } from "react-router-dom";
import { Search, Moon, Sun, Menu, X, LogIn, User, LogOut, FileText } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/tools", label: "Tools" },
    { to: "/seo-strategy", label: "SEO Strategy" },
    { to: "/blog", label: "Blog" },
  ];

  const planBadge = (plan: string) => {
    const colors: Record<string, string> = {
      free: "bg-muted text-muted-foreground",
      pro: "bg-comic-orange text-white",
      business: "bg-comic-purple text-white",
    };
    return colors[plan] || colors.free;
  };

  return (
    <nav
      className="comic-card rounded-none border-x-0 border-t-0 mb-0 p-4"
      style={{ boxShadow: "0 4px 0px hsl(var(--border))" }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Search className="w-8 h-8 text-primary" strokeWidth={3} />
          <span className="comic-heading text-2xl md:text-3xl text-foreground">
            WebInsight Pro
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`comic-btn text-sm ${location.pathname === l.to
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground"
                }`}
            >
              {l.label}
            </Link>
          ))}

          <button
            onClick={toggleDarkMode}
            className="comic-btn bg-card text-foreground p-3"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Auth area */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="comic-btn bg-card text-foreground flex items-center gap-2 p-2 px-3"
                id="user-menu-btn"
              >
                <div
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
                  style={{ border: "2px solid hsl(var(--border))" }}
                >
                  <span className="text-sm font-bold" style={{ fontFamily: "'Bangers', cursive" }}>
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-bold hidden lg:block">
                  {user.name.split(" ")[0]}
                </span>
              </button>

              {userMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-56 comic-card p-3 z-50 animate-slide-up"
                  style={{ animationDuration: "0.2s" }}
                >
                  <div className="mb-3 pb-3" style={{ borderBottom: "2px solid hsl(var(--border) / 0.3)" }}>
                    <p className="font-bold text-foreground text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground font-bold truncate">
                      {user.email}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <Link
                      to="/reports"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 text-foreground font-bold text-sm transition-colors"
                    >
                      <FileText className="w-4 h-4" /> Saved Reports
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-destructive/10 text-destructive font-bold text-sm w-full transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="comic-btn bg-primary text-primary-foreground flex items-center gap-2 text-sm"
              id="login-nav-btn"
            >
              <LogIn className="w-4 h-4" strokeWidth={3} />
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden comic-btn bg-card text-foreground p-2"
        >
          {menuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden mt-3 flex flex-col gap-2 px-2">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className={`comic-btn text-sm text-center ${location.pathname === l.to
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground"
                }`}
            >
              {l.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/reports"
                onClick={() => setMenuOpen(false)}
                className="comic-btn bg-card text-foreground text-sm text-center"
              >
                📂 Saved Reports
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="comic-btn bg-destructive/10 text-destructive text-sm"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="comic-btn bg-primary text-primary-foreground text-sm text-center"
            >
              Sign In
            </Link>
          )}

          <button
            onClick={toggleDarkMode}
            className="comic-btn bg-card text-foreground flex items-center justify-center gap-2"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
