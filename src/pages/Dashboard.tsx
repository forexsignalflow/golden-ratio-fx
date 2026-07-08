import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Zap, Globe, AlertTriangle, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";

interface DashboardProps {
  onNavigate: (tab: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 pb-8">
      {/* Live Ticker */}
      <div className="overflow-hidden bg-white/5 border-y border-white/5 -mx-4 py-2">
        <div className="flex animate-ticker whitespace-nowrap items-center gap-8 px-4">
          {[
            { pair: "EUR/USD", price: "1.0842", change: "+0.12%", up: true },
            { pair: "GBP/USD", price: "1.2634", change: "-0.05%", up: false },
            { pair: "USD/JPY", price: "151.24", change: "+0.34%", up: true },
            { pair: "AUD/USD", price: "0.6512", change: "+0.21%", up: true },
            { pair: "BTC/USD", price: "68,450", change: "+2.45%", up: true },
            { pair: "XAU/USD", price: "2,174.5", change: "-0.18%", up: false },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="font-bold text-xs">{item.pair}</span>
              <span className="font-inter font-semibold text-xs text-white/90">{item.price}</span>
              <span className={`text-[10px] font-bold ${item.up ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                {item.change}
              </span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            { pair: "EUR/USD", price: "1.0842", change: "+0.12%", up: true },
            { pair: "GBP/USD", price: "1.2634", change: "-0.05%", up: false },
            { pair: "USD/JPY", price: "151.24", change: "+0.34%", up: true },
            { pair: "AUD/USD", price: "0.6512", change: "+0.21%", up: true },
            { pair: "BTC/USD", price: "68,450", change: "+2.45%", up: true },
            { pair: "XAU/USD", price: "2,174.5", change: "-0.18%", up: false },
          ].map((item, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-2">
              <span className="font-bold text-xs">{item.pair}</span>
              <span className="font-inter font-semibold text-xs text-white/90">{item.price}</span>
              <span className={`text-[10px] font-bold ${item.up ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* VIP Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F5B301] to-[#D97706] p-5 shadow-[0_10px_30px_rgba(245,179,1,0.2)]"
      >
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-sora font-extrabold text-[#0B0F19] text-lg leading-tight uppercase">Unlock VIP Access</h3>
            <p className="text-[#0B0F19]/80 text-xs font-medium max-w-[180px]">Get exclusive high-accuracy signals & AI insights.</p>
          </div>
          <button className="bg-[#0B0F19] text-[#F5B301] px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-xl hover:scale-105 transition-transform">
            Go Premium
          </button>
        </div>
        <Zap className="absolute -right-4 -bottom-4 w-24 h-24 text-[#0B0F19]/10 rotate-12" />
      </motion.div>

      {/* Heatmap Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-sora font-bold uppercase tracking-wider text-white/60">Forex Heatmap</h2>
          <Globe className="w-4 h-4 text-white/30" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { pair: "EUR/USD", val: "+0.15", bull: true },
            { pair: "GBP/JPY", val: "+0.42", bull: true },
            { pair: "USD/CHF", val: "-0.28", bull: false },
            { pair: "AUD/CAD", val: "+0.08", bull: true },
            { pair: "NZD/USD", val: "-0.12", bull: false },
            { pair: "USD/CAD", val: "-0.35", bull: false },
          ].map((item, i) => (
            <div key={i} className={`p-3 rounded-xl border border-white/5 flex flex-col items-center gap-1 transition-all hover:bg-white/5 ${item.bull ? 'bg-[#22C55E]/5' : 'bg-[#EF4444]/5'}`}>
              <span className="text-[10px] font-bold text-white/60 uppercase">{item.pair}</span>
              <span className={`text-sm font-sora font-extrabold ${item.bull ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                {item.val}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Market Sentiment */}
      <section className="space-y-3">
        <h2 className="text-sm font-sora font-bold uppercase tracking-wider text-white/60 px-1">Market Sentiment</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="glass p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/40 uppercase">Retail Bulls</span>
              <TrendingUp className="w-3 h-3 text-[#22C55E]" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sora font-bold">
                <span>EUR/USD</span>
                <span className="text-[#22C55E]">68%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#22C55E] rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
          </div>
          <div className="glass p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/40 uppercase">Retail Bears</span>
              <TrendingDown className="w-3 h-3 text-[#EF4444]" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sora font-bold">
                <span>USD/JPY</span>
                <span className="text-[#EF4444]">74%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#EF4444] rounded-full" style={{ width: '74%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Insights & Alerts */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Sparkles className="w-4 h-4 text-[#F5B301]" />
          <h2 className="text-sm font-sora font-bold uppercase tracking-wider text-white/60">AI Intelligence</h2>
        </div>
        <div className="glass p-4 rounded-2xl border-l-4 border-l-[#F5B301] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#F5B301] uppercase tracking-widest">Active Insight</span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-[#F5B301]/10 text-[#F5B301] font-bold">HIGH CONFIDENCE</span>
          </div>
          <p className="text-xs font-medium text-white/80 leading-relaxed">
            AI pattern detection indicates a potential breakout on <span className="text-white font-bold">GBP/USD</span> H4 timeframe. RSI divergence spotted.
          </p>
          <button onClick={() => onNavigate('analysis')} className="text-[10px] font-bold text-[#F5B301] flex items-center gap-1 mt-2">
            View Analysis <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </section>

      {/* News Highlights */}
      <section className="space-y-3">
        <h2 className="text-sm font-sora font-bold uppercase tracking-wider text-white/60 px-1">News Highlights</h2>
        <div className="space-y-3">
          {[
            { title: "Fed Maintains Rates: Impact on Dollar Pairs", source: "Bloomberg", time: "12m ago", impact: "High" },
            { title: "ECB President Lagarde Speech Preview", source: "Reuters", time: "1h ago", impact: "Medium" }
          ].map((news, i) => (
            <div key={i} className="flex gap-4 p-3 glass rounded-2xl group transition-all hover:bg-white/5">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/5">
                <img src={i === 0 ? "https://storage.googleapis.com/dala-prod-public-storage/generated-images/19e22991-11d7-4484-b8eb-02d5b5132f75/news-placeholder-1-2ce3a0e6-1778612931055.webp" : "https://storage.googleapis.com/dala-prod-public-storage/generated-images/19e22991-11d7-4484-b8eb-02d5b5132f75/news-placeholder-2-0081d8cd-1778612927892.webp"} alt="News" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
              </div>
              <div className="flex flex-col justify-between py-0.5">
                <h4 className="text-[11px] font-bold leading-snug line-clamp-2">{news.title}</h4>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] text-white/40 font-bold">{news.source}</span>
                  <span className="text-[9px] text-white/40 font-bold">•</span>
                  <span className={`text-[9px] font-extrabold uppercase ${news.impact === 'High' ? 'text-[#EF4444]' : 'text-[#F5B301]'}`}>
                    {news.impact} Impact
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Economic Alerts */}
      <section className="space-y-3">
        <h2 className="text-sm font-sora font-bold uppercase tracking-wider text-white/60 px-1">Economic Alerts</h2>
        <div className="bg-[#EF4444]/5 border border-[#EF4444]/20 rounded-2xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#EF4444] mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-[#EF4444]">High Impact Event: US CPI</h4>
            <p className="text-[10px] text-white/60 font-medium leading-relaxed">
              Expect extreme volatility in USD pairs in 45 minutes. Tighten stop losses.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;