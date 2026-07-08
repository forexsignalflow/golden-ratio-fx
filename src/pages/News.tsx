import React from "react";
import { motion } from "framer-motion";
import { Newspaper, Bookmark, Share2, Flame, TrendingUp, TrendingDown, Clock, ChevronRight } from "lucide-react";

const News: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: "Wall Street Rallies as Inflation Data Beats Expectations",
      description: "Consumer price index showed a cooling trend, prompting traders to bet on early rate cuts by the Federal Reserve.",
      source: "Reuters Finance",
      time: "15m ago",
      impact: "High",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/19e22991-11d7-4484-b8eb-02d5b5132f75/news-placeholder-1-2ce3a0e6-1778612931055.webp",
      category: "Market"
    },
    {
      id: 2,
      title: "Gold Hits Record High Amid Global Uncertainty",
      description: "Safe-haven demand surges as geopolitical tensions rise in multiple regions, sending XAU/USD to unprecedented levels.",
      source: "Bloomberg",
      time: "42m ago",
      impact: "Medium",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/19e22991-11d7-4484-b8eb-02d5b5132f75/news-placeholder-2-0081d8cd-1778612927892.webp",
      category: "Commodities"
    },
    {
      id: 3,
      title: "Crypto Market Cap Surpasses $2.5 Trillion",
      description: "Bitcoin leads the charge as institutional interest continues to grow following ETF approvals.",
      source: "CoinDesk",
      time: "1h ago",
      impact: "Low",
      image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/19e22991-11d7-4484-b8eb-02d5b5132f75/chart-placeholder-1-3cf635bf-1778612927810.webp",
      category: "Crypto"
    }
  ];

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-extrabold text-white uppercase tracking-tight">Market News</h1>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] mt-1">Institutional Feed</p>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
          <Newspaper className="w-5 h-5 text-[#F5B301]" />
        </div>
      </div>

      {/* Breaking Ticker */}
      <div className="relative overflow-hidden bg-[#EF4444]/10 border-y border-[#EF4444]/20 -mx-4 py-2 flex items-center">
        <div className="bg-[#EF4444] text-white text-[9px] font-black px-3 py-1 uppercase tracking-wider relative z-10 flex items-center gap-1 shadow-lg ml-4 rounded">
          <Flame className="w-3 h-3 fill-white" /> Breaking
        </div>
        <div className="flex animate-ticker whitespace-nowrap items-center gap-10 pl-6">
          <span className="text-[11px] font-bold text-[#EF4444]">US Treasury yields jump following hawkish Fed comments • Japanese Yen weakens against major peers • Oil prices stabilize near $85 per barrel • ECB expected to hold rates steady in next meeting</span>
          <span className="text-[11px] font-bold text-[#EF4444]">US Treasury yields jump following hawkish Fed comments • Japanese Yen weakens against major peers • Oil prices stabilize near $85 per barrel • ECB expected to hold rates steady in next meeting</span>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-2">
        {["All News", "Forex", "Stocks", "Commodities", "Crypto"].map((tag, i) => (
          <button key={i} className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${i === 0 ? 'bg-[#F5B301] text-[#0B0F19]' : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10'}`}>
            {tag}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {newsItems.map((news, index) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-3xl overflow-hidden group border-white/5"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={news.image} alt={news.title} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-xl ${news.impact === 'High' ? 'bg-[#EF4444] text-white' : news.impact === 'Medium' ? 'bg-[#F5B301] text-[#0B0F19]' : 'bg-white/20 text-white backdrop-blur-md'}`}>
                  {news.impact} Impact
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-black/40 text-white/90 text-[9px] font-black uppercase tracking-wider backdrop-blur-md border border-white/10">
                  {news.category}
                </span>
              </div>
              <button className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-[#F5B301] hover:text-[#0B0F19] transition-all">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3 text-white/40 text-[10px] font-bold uppercase tracking-wider">
                <span className="text-[#F5B301]">{news.source}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {news.time}
                </div>
              </div>
              <h2 className="text-base font-sora font-extrabold leading-tight group-hover:text-[#F5B301] transition-colors">{news.title}</h2>
              <p className="text-xs text-white/50 leading-relaxed line-clamp-2 font-medium">{news.description}</p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <button className="flex items-center gap-1.5 text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="group flex items-center gap-1 text-[11px] font-black text-[#F5B301] uppercase tracking-[0.1em]">
                  Read More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default News;