import React from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Filter, Clock, ChevronRight, Globe, AlertCircle } from "lucide-react";

const CalendarPage: React.FC = () => {
  const events = [
    {
      id: 1,
      country: "USD",
      flag: "🇺🇸",
      name: "CPI m/m",
      time: "14:30",
      impact: "High",
      actual: "0.4%",
      forecast: "0.3%",
      previous: "0.3%",
      countdown: "45m"
    },
    {
      id: 2,
      country: "EUR",
      flag: "🇪🇺",
      name: "ECB President Lagarde Speaks",
      time: "16:00",
      impact: "High",
      actual: "-",
      forecast: "-",
      previous: "-",
      countdown: "2h 15m"
    },
    {
      id: 3,
      country: "GBP",
      flag: "🇬🇧",
      name: "GDP m/m",
      time: "08:00",
      impact: "Medium",
      actual: "0.2%",
      forecast: "0.1%",
      previous: "0.0%",
      countdown: "Passed"
    },
    {
      id: 4,
      country: "JPY",
      flag: "🇯🇵",
      name: "BoJ Monetary Policy Meeting",
      time: "03:00",
      impact: "High",
      actual: "0.1%",
      forecast: "0.1%",
      previous: "0.0%",
      countdown: "Passed"
    }
  ];

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-extrabold text-white">Economic Calendar</h1>
          <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">Global Market Events</p>
        </div>
        <button className="p-2.5 rounded-xl bg-white/5 border border-white/10">
          <Filter className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="flex items-center justify-between bg-white/5 rounded-2xl p-2 border border-white/5">
        {["Yest", "Today", "Tomorrow", "Week"].map((day, i) => (
          <button key={i} className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${i === 1 ? 'bg-[#F5B301] text-[#0B0F19]' : 'text-white/40 hover:text-white'}`}>
            {day}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`glass p-4 rounded-2xl relative overflow-hidden group ${event.impact === 'High' && event.countdown !== 'Passed' ? 'border-l-4 border-l-[#EF4444]' : 'border-white/5'}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{event.flag}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-white/90">{event.country}</span>
                    <span className={`text-[8px] px-1.5 py-0.5 rounded font-black uppercase ${event.impact === 'High' ? 'bg-[#EF4444]/20 text-[#EF4444]' : 'bg-[#F5B301]/20 text-[#F5B301]'}`}>
                      {event.impact}
                    </span>
                  </div>
                  <h3 className="text-sm font-sora font-extrabold mt-0.5 line-clamp-1">{event.name}</h3>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-inter font-bold text-white">{event.time}</div>
                {event.countdown !== 'Passed' ? (
                  <div className="flex items-center gap-1 justify-end text-[#F5B301] mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span className="text-[9px] font-black uppercase">{event.countdown}</span>
                  </div>
                ) : (
                  <span className="text-[9px] font-black text-white/20 uppercase tracking-widest mt-0.5 block">Completed</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-black/20 rounded-xl p-3 border border-white/5">
              <div className="text-center space-y-1">
                <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Actual</span>
                <span className={`text-xs font-inter font-bold block ${event.actual > event.forecast ? 'text-[#22C55E]' : event.actual === '-' ? 'text-white/40' : 'text-[#EF4444]'}`}>
                  {event.actual}
                </span>
              </div>
              <div className="text-center space-y-1">
                <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Forecast</span>
                <span className="text-xs font-inter font-bold block text-white/70">{event.forecast}</span>
              </div>
              <div className="text-center space-y-1">
                <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Previous</span>
                <span className="text-xs font-inter font-bold block text-white/40">{event.previous}</span>
              </div>
            </div>

            {event.impact === 'High' && event.countdown !== 'Passed' && (
              <div className="mt-4 flex items-center gap-2 text-[#EF4444]">
                <AlertCircle className="w-3.5 h-3.5" />
                <span className="text-[9px] font-black uppercase tracking-tighter italic">Major Volatility Expected</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="glass p-5 rounded-3xl space-y-4 border-[#F5B301]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5B301]/5 blur-3xl -z-10" />
        <h2 className="text-sm font-sora font-extrabold uppercase tracking-widest text-[#F5B301]">Pro Intelligence</h2>
        <p className="text-xs text-white/60 font-medium leading-relaxed">
          Get real-time push notifications for high-impact events and AI-powered sentiment analysis before data releases.
        </p>
        <button className="w-full bg-[#F5B301] text-[#0B0F19] py-3 rounded-2xl font-sora font-extrabold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#F5B301]/20">
          Activate Smart Alerts
        </button>
      </div>
    </div>
  );
};

export default CalendarPage;