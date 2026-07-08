import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  ShieldAlert, 
  Award, 
  ChevronRight, 
  Share2,
  Copy,
  Info,
  TrendingUp as TrendUpIcon,
  ShieldCheck,
  Zap,
  BarChart2,
  RefreshCw,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { fetchFinnhubQuote, getFinnhubSymbol, FinnhubQuote } from "@/lib/utils";

interface Signal {
  id: number;
  pair: string;
  type: "BUY" | "SELL";
  entry: string;
  sl: string;
  tp: string;
  accuracy: number;
  time: string;
  trend: string;
  status: string;
  isVip: boolean;
  assetClass?: string;
  strategy?: string;
  riskReward?: string;
  expectedPips?: number;
  timeframe?: string;
  analysis?: string;
}

const STATUS_FILTERS = ["Active", "Pending", "Closed"] as const;
type SignalStatus = typeof STATUS_FILTERS[number];

const INITIAL_SIGNALS: Signal[] = [
  {
    id: 1,
    pair: "EUR/USD",
    type: "BUY",
    entry: "1.08420",
    sl: "1.08100",
    tp: "1.09200",
    accuracy: 94,
    time: "15m ago",
    trend: "Bullish",
    status: "Active",
    isVip: false,
    assetClass: "Forex",
    strategy: "RSI Divergence + Resistance Breakout",
    riskReward: "1:2.5",
    expectedPips: 78,
    timeframe: "M15",
    analysis: "Price has formed a double bottom on the 15-minute timeframe with a clear bullish divergence on RSI. Expecting a continuation towards the next major resistance level at 1.09200."
  },
  {
    id: 2,
    pair: "XAU/USD",
    type: "SELL",
    entry: "2174.50",
    sl: "2182.00",
    tp: "2160.00",
    accuracy: 89,
    time: "42m ago",
    trend: "Bearish",
    status: "Pending",
    isVip: true,
    assetClass: "Commodities",
    strategy: "Fibonacci Retracement + EMA Cross",
    riskReward: "1:1.8",
    expectedPips: 145,
    timeframe: "H1",
    analysis: "Gold has rejected the 61.8% Fibonacci level after a sharp bearish move. 50 EMA is crossing below 200 EMA on the hourly chart, confirming downward momentum."
  },
  {
    id: 3,
    pair: "GBP/JPY",
    type: "BUY",
    entry: "191.240",
    sl: "190.800",
    tp: "192.500",
    accuracy: 92,
    time: "2h ago",
    trend: "Neutral",
    status: "Closed",
    isVip: false,
    assetClass: "Forex",
    strategy: "Channel Breakout Re-test",
    riskReward: "1:2.8",
    expectedPips: 126,
    timeframe: "H4",
    analysis: "GBP/JPY has broken out of a multi-day descending channel. Currently re-testing the breakout zone. Support is holding strong around 191.000."
  },
  {
    id: 4,
    pair: "BTC/USD",
    type: "BUY",
    entry: "64200.00",
    sl: "63500.00",
    tp: "66000.00",
    accuracy: 88,
    time: "1h ago",
    trend: "Bullish",
    status: "Active",
    isVip: true,
    assetClass: "Crypto",
    strategy: "Support Bounce + Volume Spike",
    riskReward: "1:2.6",
    expectedPips: 1800,
    timeframe: "H4",
    analysis: "Bitcoin is bouncing off a major psychological support level at $64k. Volume is increasing on the buy side, suggesting a strong reversal."
  },
  {
    id: 5,
    pair: "US30",
    type: "SELL",
    entry: "38450.00",
    sl: "38600.00",
    tp: "38100.00",
    accuracy: 91,
    time: "30m ago",
    trend: "Bearish",
    status: "Pending",
    isVip: false,
    assetClass: "Indices",
    strategy: "Double Top + MACD Divergence",
    riskReward: "1:2.3",
    expectedPips: 350,
    timeframe: "H1",
    analysis: "The Dow Jones has formed a clear double top pattern on the 1-hour chart. MACD is showing bearish divergence, indicating weakening momentum."
  },
  {
    id: 6,
    pair: "VIX",
    type: "BUY",
    entry: "14.50",
    sl: "14.10",
    tp: "15.80",
    accuracy: 85,
    time: "45m ago",
    trend: "Bullish",
    status: "Closed",
    isVip: false,
    assetClass: "Volatilities",
    strategy: "Breakout from Consolidation",
    riskReward: "1:3.2",
    expectedPips: 130,
    timeframe: "H1",
    analysis: "The VIX is breaking out of a tight consolidation range. Expecting increased market volatility in the coming hours."
  }
];

const Signals: React.FC = () => {
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<SignalStatus>("Active");
  const [signals, setSignals] = useState<Signal[]>(INITIAL_SIGNALS);
  const [marketData, setMarketData] = useState<Record<string, FinnhubQuote | null>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

  const signalsRef = useRef(signals);
  signalsRef.current = signals;

  const fetchSignals = useCallback(async () => {
    try {
      const response = await fetch("https://25566caf.mydala.app/api/signals", {
        cache: 'no-store'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          const dataStr = JSON.stringify(data);
          const currentStr = JSON.stringify(signalsRef.current);
          
          if (dataStr !== currentStr) {
            if (signalsRef.current.length > 0 && data.length > signalsRef.current.length) {
              const newCount = data.length - signalsRef.current.length;
              toast.success(`New Signal: ${newCount} new trade${newCount > 1 ? 's' : ''} detected!`, {
                icon: <Zap className="w-4 h-4 text-[#F5B301]" />,
              });
            } else if (signalsRef.current.length > 0) {
              toast.info("Signals Updated", {
                description: "Live data synchronization complete."
              });
            }
            setSignals(data);
          }
          setIsLive(true);
          setLastFetchTime(new Date());
        }
      } else {
        if (isLive) {
          toast.error("Lost connection to signal source");
          setIsLive(false);
        }
      }
    } catch (error) {
      console.error("Signal fetch error:", error);
      if (isLive) {
        toast.error("Signal broadcast error - check connection");
        setIsLive(false);
      }
    }
  }, [isLive]);

  const fetchMarketData = useCallback(async () => {
    setIsLoading(true);
    const newData: Record<string, FinnhubQuote | null> = {};
    
    for (const signal of signalsRef.current) {
      const symbol = getFinnhubSymbol(signal.pair, signal.assetClass);
      const quote = await fetchFinnhubQuote(symbol);
      newData[signal.pair] = quote;
    }
    
    setMarketData(newData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchSignals();
    const signalInterval = setInterval(fetchSignals, 3000); // Poll signals every 3s for "immediate" updates
    
    fetchMarketData();
    const marketInterval = setInterval(fetchMarketData, 30000); // Refresh market data every 30s
    
    return () => {
      clearInterval(signalInterval);
      clearInterval(marketInterval);
    };
  }, [fetchSignals, fetchMarketData]);

  const filteredSignals = signals.filter(s => 
    s.status === selectedStatus && 
    s.pair.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-extrabold text-white">Live Signals</h1>
          <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">Real-time Trading Intel</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={fetchMarketData}
            disabled={isLoading}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-[#F5B301] ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <div className="bg-[#F5B301]/10 px-3 py-1.5 rounded-lg border border-[#F5B301]/20 flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isLive ? 'bg-[#22C55E]' : 'bg-[#F5B301]'}`} />
            <span className="text-[10px] font-bold text-[#F5B301] uppercase tracking-wider">
              {isLive ? 'Backend Live' : 'Market Live'}
            </span>
          </div>
          {lastFetchTime && (
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">Synced</span>
              <span className="text-[9px] font-mono text-[#F5B301]">{lastFetchTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
          )}
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              selectedStatus === status
                ? "bg-[#F5B301] text-[#0B0F19] shadow-[0_0_15px_rgba(245,179,1,0.3)]"
                : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search pair (e.g. EUR/USD, XAU/USD)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#F5B301]/40 focus:ring-1 focus:ring-[#F5B301]/20 transition-all"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-xs font-bold">
            Clear
          </button>
        )}
      </div>

      <div className="space-y-4">
        {filteredSignals.length > 0 ? (
          filteredSignals.map((signal, index) => (
            <SignalCard 
              key={signal.id} 
              signal={signal} 
              index={index} 
              marketData={marketData[signal.pair]}
              onClick={() => setSelectedSignal(signal)}
            />
          ))
        ) : (
          <div className="text-center py-12 text-white/40">
            <p className="text-sm font-medium">No {selectedStatus.toLowerCase()} signals{searchQuery ? ` matching "${searchQuery}"` : ''}</p>
          </div>
        )}
      </div>

      <SignalDetailModal 
        signal={selectedSignal} 
        marketData={selectedSignal ? marketData[selectedSignal.pair] : null}
        isOpen={!!selectedSignal} 
        onClose={() => setSelectedSignal(null)} 
      />
    </div>
  );
};

function SignalCard({ signal, index, marketData, onClick }: { signal: Signal; index: number; marketData?: FinnhubQuote | null; onClick: () => void }) {
  const isBuy = signal.type === "BUY";
  const currentPrice = marketData?.c;
  const priceChange = currentPrice ? ((currentPrice - (marketData.pc || currentPrice)) / (marketData.pc || currentPrice)) * 100 : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`glass rounded-2xl overflow-hidden relative group transition-all hover:bg-white/5 active:scale-[0.98] cursor-pointer ${signal.isVip ? 'border-[#F5B301]/20' : 'border-white/5'}`}
    >
      {signal.isVip && (
        <div className="absolute top-0 right-0 bg-[#F5B301] px-3 py-1 rounded-bl-xl z-10 flex items-center gap-1.5 shadow-lg">
          <Award className="w-3 h-3 text-[#0B0F19]" />
          <span className="text-[9px] font-black text-[#0B0F19] uppercase tracking-wider">VIP SIGNAL</span>
        </div>
      )}

      <div className={`absolute inset-x-0 top-0 h-1 ${isBuy ? 'bg-[#22C55E] glow-green' : 'bg-[#EF4444] glow-red'}`} />

      <div className="p-5 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isBuy ? 'bg-[#22C55E]/10' : 'bg-[#EF4444]/10'}`}>
              {isBuy ? <TrendingUp className="w-6 h-6 text-[#22C55E]" /> : <TrendingDown className="w-6 h-6 text-[#EF4444]" />}
            </div>
            <div>
              <h3 className="text-lg font-sora font-extrabold">{signal.pair}</h3>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm ${isBuy ? 'bg-[#22C55E] text-[#0B0F19]' : 'bg-[#EF4444] text-white'}`}>
                  {signal.type}
                </span>
                <span className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">{signal.trend} Trend</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            {currentPrice ? (
              <div className="space-y-1">
                <div className="text-sm font-inter font-bold text-white">{currentPrice.toFixed(signal.pair.includes('JPY') ? 3 : 5)}</div>
                <div className={`text-[10px] font-bold ${priceChange >= 0 ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 justify-end text-[#F5B301]">
                <Target className="w-3 h-3" />
                <span className="text-[10px] font-black">{signal.accuracy}% Acc.</span>
              </div>
            )}
            <div className="flex items-center gap-1 justify-end text-white/40 mt-1">
              <Clock className="w-3 h-3" />
              <span className="text-[10px] font-bold">{signal.time}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 bg-white/5 rounded-2xl p-4 border border-white/5 relative">
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Entry</span>
            <span className="text-sm font-inter font-bold text-white">{signal.entry}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Stop Loss</span>
            <span className="text-sm font-inter font-bold text-[#EF4444]">{signal.sl}</span>
          </div>
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block">Take Profit</span>
            <span className="text-sm font-inter font-bold text-[#22C55E]">{signal.tp}</span>
          </div>
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[1px] h-6 bg-white/10" />
          <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-[1px] h-6 bg-white/10" />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toast.info("Sharing signal data...");
              }}
              className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Share</span>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toast.info("Risk Profile: Standard Forex parameters apply.");
              }}
              className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Risk Info</span>
            </button>
          </div>
          <button className="group flex items-center gap-1 font-sora font-extrabold text-[11px] text-[#F5B301] uppercase tracking-widest">
            Full Details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SignalDetailModal({ signal, marketData, isOpen, onClose }: { signal: Signal | null; marketData?: FinnhubQuote | null; isOpen: boolean; onClose: () => void }) {
  if (!signal) return null;

  const isBuy = signal.type === "BUY";
  const currentPrice = marketData?.c;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0B0F19] border-white/10 max-w-[90vw] rounded-3xl p-0 overflow-hidden">
        <div className={`h-1.5 w-full ${isBuy ? 'bg-[#22C55E] glow-green' : 'bg-[#EF4444] glow-red'}`} />
        
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-2xl ${isBuy ? 'bg-[#22C55E]/10' : 'bg-[#EF4444]/10'}`}>
                {isBuy ? <TrendingUp className="w-7 h-7 text-[#22C55E]" /> : <TrendingDown className="w-7 h-7 text-[#EF4444]" />}
              </div>
              <div>
                <DialogTitle className="text-2xl font-sora font-extrabold text-white">
                  {signal.pair}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm ${isBuy ? 'bg-[#22C55E] text-[#0B0F19]' : 'bg-[#EF4444] text-white'}`}>
                    {signal.type}
                  </span>
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">
                    {signal.timeframe} &bull; {signal.trend} Trend
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              {currentPrice ? (
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-1">
                  <span className="text-[10px] font-black text-[#F5B301] uppercase block leading-none">Live Price</span>
                  <span className="text-lg font-inter font-black text-white">{currentPrice.toFixed(signal.pair.includes('JPY') ? 3 : 5)}</span>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/5 rounded-xl px-3 py-1">
                  <span className="text-[10px] font-black text-[#F5B301] uppercase block leading-none">Accuracy</span>
                  <span className="text-lg font-inter font-black text-white">{signal.accuracy}%</span>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Strategy Section */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#F5B301]" />
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Trading Strategy</span>
            </div>
            <p className="text-sm font-medium text-white/90 leading-relaxed">
              {signal.strategy}
            </p>
          </div>

          {/* Main Levels Grid */}
          <div className="grid grid-cols-1 gap-3">
            <LevelRow 
              label="Entry Price" 
              value={signal.entry} 
              color="text-white" 
              onCopy={() => copyToClipboard(signal.entry, "Entry")}
            />
            <LevelRow 
              label="Take Profit (TP)" 
              value={signal.tp} 
              color="text-[#22C55E]" 
              onCopy={() => copyToClipboard(signal.tp, "Take Profit")}
            />
            <LevelRow 
              label="Stop Loss (SL)" 
              value={signal.sl} 
              color="text-[#EF4444]" 
              onCopy={() => copyToClipboard(signal.sl, "Stop Loss")}
            />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <span className="text-[10px] font-bold text-white/40 uppercase block mb-1">Risk/Reward</span>
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#F5B301]" />
                <span className="text-lg font-inter font-bold text-white">{signal.riskReward}</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
              <span className="text-[10px] font-bold text-white/40 uppercase block mb-1">Expected Gain</span>
              <div className="flex items-center gap-2">
                <TrendUpIcon className="w-4 h-4 text-[#22C55E]" />
                <span className="text-lg font-inter font-bold text-white">+{signal.expectedPips} Pips</span>
              </div>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-white/40" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Technical Analysis</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-medium italic">
              "{signal.analysis}"
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col gap-3">
            <button 
              onClick={() => toast.success("Position shared to MT4/MT5 Terminal!")}
              className="w-full bg-[#F5B301] hover:bg-[#F5B301]/90 text-[#0B0F19] font-sora font-extrabold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(245,179,1,0.2)] flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
            >
              <TrendUpIcon className="w-4 h-4" />
              Execute Signal Now
            </button>
            <div className="flex items-center justify-center gap-2 text-white/20">
              <ShieldCheck className="w-3 h-3" />
              <span className="text-[8px] font-bold uppercase tracking-tighter">Verified by Pulse Terminal AI</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LevelRow({ label, value, color, onCopy }: { label: string; value: string; color: string; onCopy: () => void }) {
  return (
    <div className="flex items-center justify-between bg-white/5 rounded-2xl p-4 border border-white/5">
      <div>
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">{label}</span>
        <span className={`text-xl font-inter font-black ${color}`}>{value}</span>
      </div>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onCopy();
        }}
        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
      >
        <Copy className="w-5 h-5 text-white/60" />
      </button>
    </div>
  );
}

export default Signals;
