import React, { useState, useEffect } from 'react';
import { History, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

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

function HistoryPage() {
  const [closedSignals, setClosedSignals] = useState<Signal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);

  const fetchHistorySignals = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://25566caf.mydala.app/api/signals", {
        cache: 'no-store'
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setClosedSignals(data.filter((s: Signal) => s.status === 'Closed'));
          setLastSync(new Date());
        }
      }
    } catch (error) {
      console.error("History signal fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistorySignals();
    const interval = setInterval(fetchHistorySignals, 5000); // Poll for updates every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-[#F5B301]" />
          <div>
            <h1 className="text-2xl font-sora font-extrabold text-white">Performance History</h1>
            <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Past Signal Analysis</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2">
            <RefreshCw className={`w-3 h-3 text-[#F5B301] ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-[10px] font-bold text-white/40 uppercase">Live Sync</span>
          </div>
          {lastSync && (
            <span className="text-[9px] font-mono text-[#F5B301]/60">
              {lastSync.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          )}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-4 border-white/5 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-sora font-extrabold text-[#22C55E]">87</span>
            <span className="text-lg font-bold text-[#22C55E]">%</span>
          </div>
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Win Rate</span>
        </div>
        <div className="glass rounded-2xl p-4 border-white/5 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-sora font-extrabold text-white">1,204</span>
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">Signals Uploaded</span>
        </div>
      </div>

      {/* Past Signals List */}
      <div className="space-y-3">
        <h3 className="text-sm font-sora font-bold text-white/60 tracking-wider px-2 pt-2">Recently Closed Signals</h3>
        {closedSignals.length > 0 ? closedSignals.map((signal) => (
          <div key={signal.id} className="glass rounded-2xl p-4 flex items-center justify-between border-white/5 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
               <div className={`p-2 rounded-xl ${signal.type === 'BUY' ? 'bg-[#22C55E]/10' : 'bg-[#EF4444]/10'}`}>
                {signal.type === 'BUY' ? <TrendingUp className="w-5 h-5 text-[#22C55E]" /> : <TrendingDown className="w-5 h-5 text-[#EF4444]" />}
              </div>
              <div>
                <p className="font-sora font-bold text-white">{signal.pair}</p>
                <p className="text-xs text-white/40">{signal.time}</p>
              </div>
            </div>
             <div className="text-right">
              <p className="font-inter font-bold text-sm text-[#22C55E]">
                +{signal.expectedPips} Pips 
              </p>
              <p className="text-[10px] font-bold text-white/40">Profit</p>
            </div>
          </div>
        )) : (
          <div className="text-center py-12 text-white/40">
            <p className="text-sm font-medium">No recently closed signals.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
