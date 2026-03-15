import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, LogOut, FileText } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent | React.KeyboardEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tools?q=${encodeURIComponent(searchQuery.trim())}`);
      setMenuOpen(false); // Close mobile menu if open
    }
  };
  const { user, logout } = useAuth();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50 py-4 px-6 md:px-10 flex items-center justify-between bg-white/10 backdrop-blur-xl border-b border-white/20">
      {/* Logo Area */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg transform group-hover:rotate-12 transition-transform duration-500 border-2 border-primary/20">
          <img src="/logo.png" alt="WebInsight Pro Logo" className="w-full h-full object-cover" />
        </div>
        <span className="font-black text-xl md:text-2xl text-secondary tracking-tight">
          WEBINSIGHT <span className="text-primary uppercase">PRO</span>
        </span>
      </Link>

      {/* Center Search Bar (Glassmorphic) */}
      <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-md mx-8 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for tools..."
          className="w-full bg-white/20 backdrop-blur-md border border-white/40 rounded-full py-2.5 pl-6 pr-12 text-sm font-bold text-secondary tracking-tight outline-none focus:bg-white/40 transition-all placeholder:text-secondary/40"
        />
        <button type="submit" className="absolute right-4 hover:scale-110 transition-transform">
          <Search className="w-4 h-4 text-secondary/70" />
        </button>
      </form>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 px-1 py-1 pr-3 rounded-full bg-white/20 backdrop-blur-md border border-white/40"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-bold hidden lg:block">{user.name.split(" ")[0]}</span>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-3 w-56 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl p-3 shadow-xl animate-slide-up">
                <div className="mb-3 pb-3 border-b border-foreground/10">
                  <p className="font-bold text-foreground text-sm">{user.name}</p>
                  <p className="text-xs text-foreground/60 truncate">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <Link
                    to="/reports"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/50 text-foreground font-medium text-sm transition-colors"
                  >
                    <FileText className="w-4 h-4" /> Saved Reports
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-red-500/10 text-red-500 font-medium text-sm w-full transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/signup"
              className="px-6 py-2.5 rounded-full bg-foreground text-background font-bold text-sm tracking-wide shadow-lg hover:scale-105 transition-transform"
            >
              SIGN UP
            </Link>
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-foreground font-bold text-sm tracking-wide hover:bg-white/50 transition-colors"
            >
              SIGN IN
            </Link>
          </div>
        )}

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full p-4 z-50">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-6 flex flex-col gap-4 shadow-2xl animate-slide-up">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tools..."
                className="w-full bg-white/50 rounded-full py-3 px-6 text-sm font-bold text-secondary outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </form>
            {user ? (
              <>
                <Link to="/reports" className="font-semibold px-4 py-2 hover:bg-white/50 rounded-xl">Saved Reports</Link>
                <button onClick={logout} className="font-semibold text-red-500 px-4 py-2 hover:bg-red-500/10 rounded-xl text-left">Sign Out</button>
              </>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/signup" className="py-3 text-center rounded-full bg-foreground text-background font-bold">SIGN UP</Link>
                <Link to="/login" className="py-3 text-center rounded-full bg-white/50 font-bold border border-white/40">SIGN IN</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
