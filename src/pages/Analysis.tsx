import React from "react";
import { motion } from "framer-motion";
import { BarChart2, TrendingUp, Sparkles, Zap, Maximize2, Layers, Cpu, ArrowUpRight } from "lucide-react";

const Analysis: React.FC = () => {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-extrabold text-white">AI Analysis</h1>
          <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">Terminal Intelligence</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60">
            <Layers className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-xl bg-[#F5B301]/10 border border-[#F5B301]/20 text-[#F5B301]">
            <Cpu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="space-y-4">
        <div className="glass rounded-3xl overflow-hidden border-white/5 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <TrendingUp className="text-[#22C55E] w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-sora font-extrabold leading-none">GBP/USD</h3>
                <span className="text-[10px] text-[#22C55E] font-bold uppercase tracking-widest">Bullish Sentiment</span>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-white/5 text-white/40">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <div className="relative h-60 rounded-2xl overflow-hidden bg-black/40 border border-white/5">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/19e22991-11d7-4484-b8eb-02d5b5132f75/chart-placeholder-2-21ab1025-1778612929559.webp" 
              alt="TradingView Chart Placeholder" 
              className="w-full h-full object-cover grayscale opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 to-transparent" />
            
            {/* RSI Indicator Mockup */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-1 px-1">
                <span className="text-[8px] font-black text-white/40 uppercase">RSI (14)</span>
                <span className="text-[8px] font-black text-[#F5B301]">62.45</span>
              </div>
              <div className="h-6 w-full relative overflow-hidden rounded">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 10 5, 20 12 T 40 8 T 60 14 T 80 10 T 100 13" fill="none" stroke="#F5B301" strokeWidth="1" />
                </svg>
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/10" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest block mb-1">Support Zone</span>
              <span className="text-xs font-inter font-bold text-[#22C55E]">1.2600 - 1.2625</span>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest block mb-1">Resistance Zone</span>
              <span className="text-xs font-inter font-bold text-[#EF4444]">1.2710 - 1.2740</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Prediction Cards */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Sparkles className="w-4 h-4 text-[#F5B301]" />
          <h2 className="text-sm font-sora font-bold uppercase tracking-wider text-white/60">AI Predictions</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {[
            { pair: "EUR/USD", action: "BUY", confidence: 92, target: "1.0950", trend: "Bullish Divergence" },
            { pair: "XAU/USD", action: "SELL", confidence: 88, target: "2145.00", trend: "Overbought RSI" }
          ].map((pred, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.98 }}
              className="glass p-5 rounded-3xl border-white/5 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${pred.action === 'BUY' ? 'bg-[#22C55E]/10' : 'bg-[#EF4444]/10'}`}>
                    <Zap className={pred.action === 'BUY' ? 'text-[#22C55E]' : 'text-[#EF4444]'} />
                  </div>
                  <div>
                    <h4 className="text-lg font-sora font-extrabold">{pred.pair}</h4>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{pred.trend}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[11px] font-black px-3 py-1 rounded-lg uppercase tracking-wider ${pred.action === 'BUY' ? 'bg-[#22C55E] text-[#0B0F19]' : 'bg-[#EF4444] text-white'}`}>
                    {pred.action}
                  </span>
                  <div className="text-[10px] font-bold text-white/60 mt-1">Target: {pred.target}</div>
                </div>
              </div>
              
              <div className="mt-5 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-white/40">
                  <span>AI Confidence</span>
                  <span className="text-[#F5B301]">{pred.confidence}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${pred.confidence}%` }}
                    className="h-full bg-gradient-to-r from-[#F5B301] to-[#D97706] rounded-full"
                  />
                </div>
              </div>

              <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-5 h-5 text-[#F5B301]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-[#111827] border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center gap-4">
        <BarChart2 className="w-10 h-10 text-[#F5B301] opacity-40" />
        <div className="space-y-1">
          <h3 className="text-sm font-sora font-extrabold uppercase tracking-widest">Multi-Indicator Mode</h3>
          <p className="text-xs text-white/40 font-medium">Unlock MACD, Bollinger Bands, and Fibonacci Retracements with FX Pulse VIP.</p>
        </div>
        <button className="bg-[#F5B301]/10 text-[#F5B301] border border-[#F5B301]/20 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#F5B301] hover:text-[#0B0F19] transition-all">
          Explore Advanced Tools
        </button>
      </div>
    </div>
  );
};

export default Analysis;