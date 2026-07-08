import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";

interface AuthProps {
  isOpen: boolean;
  onClose: () => void;
}

const Auth: React.FC<AuthProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
      />
      
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        className="glass w-full max-w-md p-8 rounded-[40px] relative z-10 shadow-2xl border-[#F5B301]/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-2xl bg-white/5 text-white/40 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[#F5B301] rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-[#F5B301]/20 mb-4">
              <ShieldCheck className="w-8 h-8 text-[#0B0F19]" />
            </div>
            <h2 className="text-2xl font-sora font-extrabold uppercase tracking-tight">Access Terminal</h2>
            <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Institutional Login Required</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Terminal ID (Email)</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="email" 
                  placeholder="name@terminal.fx" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-inter focus:border-[#F5B301] focus:ring-1 focus:ring-[#F5B301] transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-inter focus:border-[#F5B301] focus:ring-1 focus:ring-[#F5B301] transition-all outline-none"
                />
              </div>
            </div>
          </div>

          <button className="w-full bg-[#F5B301] text-[#0B0F19] py-4 rounded-3xl font-sora font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-[#F5B301]/20 flex items-center justify-center gap-2 group transition-all hover:scale-[1.02] active:scale-[0.98]">
            Authorize Access
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center justify-center gap-6">
            <button className="text-[10px] font-black text-white/40 uppercase tracking-widest hover:text-white transition-colors">Forgot Key?</button>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <button className="text-[10px] font-black text-[#F5B301] uppercase tracking-widest hover:text-[#F5B301]/80 transition-colors">Request ID</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;