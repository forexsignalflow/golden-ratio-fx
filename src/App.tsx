import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Newspaper, 
  User,
  Bell,
  Search,
  Zap,
  History
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import Signals from "./pages/Signals";
import News from "./pages/News";
import Profile from "./pages/Profile";
import HistoryPage from "./pages/History";
import Auth from "./pages/Auth";

type Tab = "signals" | "news" | "profile" | "history";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("signals");
  const [isLoading, setIsLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0B0F19] flex flex-col items-center justify-center z-[999]">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="relative w-20 h-20 mb-6"
        >
          <div className="absolute inset-0 bg-[#F5B301] blur-2xl opacity-20" />
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/19e22991-11d7-4484-b8eb-02d5b5132f75/app-logo-7d4518bd-1778611022991.webp" 
            alt="Logo" 
            className="w-full h-full object-contain relative z-10"
          />
        </motion.div>
        <div className="h-[2px] w-32 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-[#F5B301]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>
        <p className="mt-4 text-[#F5B301] font-sora font-bold tracking-[0.2em] text-[10px] uppercase opacity-70">
          FX Pulse Terminal
        </p>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "signals": return <Signals />;
      case "news": return <News />;
      case "profile": return <Profile />;
      case "history": return <HistoryPage />;
      default: return <Signals />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F9FAFB] font-inter selection:bg-[#F5B301]/30 pb-24 overflow-x-hidden">
      <Toaster position="top-center" theme="dark" richColors closeButton />
      
      <header className="sticky top-0 z-50 glass border-b border-white/5 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#F5B301] flex items-center justify-center shadow-[0_0_15px_rgba(245,179,1,0.3)]">
            <TrendingUp className="text-[#0B0F19] w-5 h-5" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-sora font-extrabold tracking-tight text-white">
            FX<span className="text-[#F5B301]">PULSE</span>
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAuth(true)}
            className="flex items-center gap-1.5 bg-[#F5B301]/10 border border-[#F5B301]/20 text-[#F5B301] px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-[#F5B301]/20 transition-all shadow-lg shadow-[#F5B301]/5"
          >
            <Zap className="w-3 h-3 fill-[#F5B301]" />
            VIP
          </button>
          <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors relative">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full border-2 border-[#0B0F19]" />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <nav className="fixed bottom-6 left-4 right-4 z-50 glass rounded-2xl p-2 flex items-center justify-around max-w-md mx-auto shadow-2xl border-white/10">
        <NavButton active={activeTab === "signals"} onClick={() => setActiveTab("signals")} icon={<TrendingUp size={22} />} label="Signals" />
        <NavButton active={activeTab === "news"} onClick={() => setActiveTab("news")} icon={<Newspaper size={22} />} label="News" />
        <NavButton active={activeTab === "history"} onClick={() => setActiveTab("history")} icon={<History size={22} />} label="History" />
        <NavButton active={activeTab === "profile"} onClick={() => setActiveTab("profile")} icon={<User size={22} />} label="Profile" />
      </nav>

      <Auth isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-all relative ${active ? 'text-[#F5B301]' : 'text-gray-500 hover:text-gray-300'}`}
    >
      <div className={`transition-transform duration-300 ${active ? 'scale-110 -translate-y-0.5' : ''}`}>
        {icon}
      </div>
      <span className={`text-[9px] font-bold uppercase tracking-wider transition-opacity ${active ? 'opacity-100' : 'opacity-60'}`}>
        {label}
      </span>
      {active && (
        <motion.div 
          layoutId="nav-glow"
          className="absolute inset-0 bg-[#F5B301]/5 rounded-xl -z-10"
        />
      )}
    </button>
  );
}
