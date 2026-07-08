import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Settings, 
  CreditCard, 
  Bell, 
  Moon, 
  LogOut, 
  ShieldCheck, 
  HelpCircle, 
  Heart, 
  ChevronRight,
  User,
  Zap,
  Mail,
  MessageCircle,
  Send,
  FileText,
  Star,
  X,
  ExternalLink
} from "lucide-react";

const Profile: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-2xl font-sora font-extrabold text-white">Profile</h1>
        <button className="p-2.5 rounded-xl bg-white/5 border border-white/10">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* User Header */}
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#F5B301] to-[#D97706] p-1 shadow-2xl shadow-[#F5B301]/20">
            <div className="w-full h-full rounded-[28px] bg-[#111827] flex items-center justify-center overflow-hidden">
              <User className="w-12 h-12 text-[#F5B301]/40" />
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#22C55E] p-2 rounded-2xl border-4 border-[#0B0F19]">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="text-center space-y-1">
          <h2 className="text-xl font-sora font-extrabold">Alex Trader</h2>
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Professional Trader</p>
        </div>
      </div>

      {/* VIP Badge */}
      <div className="glass p-5 rounded-3xl bg-gradient-to-r from-[#F5B301]/10 to-transparent border-[#F5B301]/20 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#F5B301] flex items-center justify-center shadow-lg shadow-[#F5B301]/30">
            <Zap className="text-[#0B0F19] w-6 h-6 fill-[#0B0F19]" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm font-sora font-black uppercase tracking-widest text-[#F5B301]">VIP Terminal</h3>
            <p className="text-[10px] text-white/40 font-bold uppercase">Active until Oct 2024</p>
          </div>
        </div>
        <button className="text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/10">
          Manage
        </button>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8 pt-4">
        <div className="space-y-3">
          <h3 className="px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Trading Preferences</h3>
          <div className="glass rounded-3xl overflow-hidden divide-y divide-white/5">
            <MenuButton icon={<Heart className="text-[#EF4444]" />} label="Favorite Pairs" count="12" />
            <MenuButton icon={<Bell className="text-[#F5B301]" />} label="Alert Notifications" sub="Price & News" />
            <MenuButton icon={<Moon className="text-blue-400" />} label="Terminal Theme" sub="Dark Institutional" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Subscription & Billing</h3>
          <div className="glass rounded-3xl overflow-hidden divide-y divide-white/5">
            <MenuButton icon={<CreditCard className="text-purple-400" />} label="Payment Methods" />
            <MenuButton icon={<CreditCard className="text-green-400" />} label="Billing History" />
          </div>
        </div>

        {/* Support & Legal - Play Store Compliant */}
        <div className="space-y-3">
          <h3 className="px-4 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Support & Legal</h3>
          <div className="glass rounded-3xl overflow-hidden divide-y divide-white/5">
            <MenuButton icon={<HelpCircle className="text-white/60" />} label="Help Center" sub="FAQs & Guides" />
            
            {/* Email Support */}
            <a 
              href="mailto:support@fxpulse.com?subject=FX%20Pulse%20Support%20Request" 
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-sora font-extrabold text-white/90">Email Support</h4>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">support@fxpulse.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
              </div>
            </a>

            {/* WhatsApp Support */}
            <a 
              href="https://wa.me/254700000000?text=Hello%20FX%20Pulse%20Support" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-sora font-extrabold text-white/90">WhatsApp Support</h4>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">Chat with us directly</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
              </div>
            </a>

            {/* Telegram Support */}
            <a 
              href="https://t.me/fxpulse_support" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                  <Send className="w-5 h-5 text-sky-400" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-sora font-extrabold text-white/90">Telegram Support</h4>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">@fxpulse_support</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
              </div>
            </a>

            {/* Privacy Policy - Opens Modal */}
            <button 
              onClick={() => setShowPrivacy(true)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-white/60" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-sora font-extrabold text-white/90">Privacy Policy</h4>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">How we protect your data</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
              </div>
            </button>

            {/* Terms of Service - Opens Modal */}
            <button 
              onClick={() => setShowTerms(true)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                  <FileText className="w-5 h-5 text-white/60" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-sora font-extrabold text-white/90">Terms of Service</h4>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">Usage guidelines & disclaimers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
              </div>
            </button>

            {/* Rate Us - Play Store Link */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.fxpulse" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
                  <Star className="w-5 h-5 text-[#F5B301]" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-sora font-extrabold text-white/90">Rate Us on Play Store</h4>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">Help us improve</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
              </div>
            </a>
          </div>
        </div>

        <button className="w-full py-5 flex items-center justify-center gap-3 text-[#EF4444] font-sora font-black text-xs uppercase tracking-[0.3em] bg-white/5 rounded-3xl border border-[#EF4444]/10 hover:bg-[#EF4444]/5 transition-all">
          <LogOut className="w-4 h-4" />
          Logout Terminal
        </button>
      </div>

      <div className="text-center py-4 space-y-1">
        <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest">FX Pulse Terminal v4.2.0</p>
        <p className="text-[8px] text-white/15 font-bold uppercase tracking-wider">© 2024 FX Pulse. All rights reserved.</p>
      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <LegalModal 
            title="Privacy Policy" 
            lastUpdated="Last updated: January 2024"
            onClose={() => setShowPrivacy(false)}
          >
            <div className="space-y-4 text-sm text-white/70 leading-relaxed">
              <section>
                <h3 className="text-white font-bold text-base mb-2">1. Information We Collect</h3>
                <p>We collect information that you provide directly to us, including:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>Account information (name, email address, phone number)</li>
                  <li>Trading preferences and watchlist data</li>
                  <li>Device information and usage statistics</li>
                  <li>Notification preferences</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">2. How We Use Your Information</h3>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Send you trading signals and notifications</li>
                  <li>Respond to your comments and support requests</li>
                  <li>Monitor and analyze trends and usage</li>
                  <li>Protect against fraudulent or illegal activity</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">3. Information Sharing</h3>
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and safety</li>
                  <li>With service providers who assist in our operations</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">4. Data Security</h3>
                <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">5. Your Rights</h3>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to data processing</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">6. Contact Us</h3>
                <p>If you have questions about this Privacy Policy, please contact us at:</p>
                <p className="mt-2 text-[#F5B301]">support@fxpulse.com</p>
              </section>
            </div>
          </LegalModal>
        )}
      </AnimatePresence>

      {/* Terms of Service Modal */}
      <AnimatePresence>
        {showTerms && (
          <LegalModal 
            title="Terms of Service" 
            lastUpdated="Last updated: January 2024"
            onClose={() => setShowTerms(false)}
          >
            <div className="space-y-4 text-sm text-white/70 leading-relaxed">
              <section>
                <h3 className="text-white font-bold text-base mb-2">1. Acceptance of Terms</h3>
                <p>By downloading, installing, or using FX Pulse Terminal ("the App"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the App.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">2. Service Description</h3>
                <p>FX Pulse Terminal provides forex trading signals, market analysis, and financial news. The App is intended for informational purposes only and does not constitute financial advice.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">3. Risk Disclaimer</h3>
                <p className="text-[#EF4444]/80 font-medium">Trading forex and other financial instruments carries a high level of risk and may not be suitable for all investors. Past performance is not indicative of future results. You could lose some or all of your initial investment.</p>
                <p className="mt-2">The trading signals provided by FX Pulse Terminal are for informational purposes only and should not be considered as financial advice. Always conduct your own research and consult with a qualified financial advisor before making any investment decisions.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">4. User Responsibilities</h3>
                <p>As a user of FX Pulse Terminal, you agree to:</p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-2">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use the App in compliance with all applicable laws and regulations</li>
                  <li>Not redistribute or share your account access with others</li>
                  <li>Accept full responsibility for your trading decisions</li>
                </ul>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">5. Subscription & Payments</h3>
                <p>VIP subscriptions are billed according to the selected plan. Refunds are processed on a case-by-case basis. Subscription fees are non-refundable except where required by law.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">6. Intellectual Property</h3>
                <p>All content, features, and functionality of the App are owned by FX Pulse and are protected by international copyright, trademark, and other intellectual property laws.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">7. Limitation of Liability</h3>
                <p>FX Pulse shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or trading losses arising from your use of the App.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">8. Modifications</h3>
                <p>We reserve the right to modify these Terms at any time. Continued use of the App after changes constitutes acceptance of the new Terms.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-base mb-2">9. Contact Information</h3>
                <p>For questions about these Terms of Service, contact us at:</p>
                <p className="mt-2 text-[#F5B301]">support@fxpulse.com</p>
              </section>
            </div>
          </LegalModal>
        )}
      </AnimatePresence>
    </div>
  );
};

function MenuButton({ icon, label, sub, count }: { icon: React.ReactNode; label: string; sub?: string; count?: string }) {
  return (
    <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
          {icon}
        </div>
        <div className="text-left">
          <h4 className="text-sm font-sora font-extrabold text-white/90">{label}</h4>
          {sub && <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">{sub}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {count && <span className="text-[10px] font-black text-[#F5B301] bg-[#F5B301]/10 px-2 py-0.5 rounded-md">{count}</span>}
        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
      </div>
    </button>
  );
}

function LegalModal({ title, lastUpdated, onClose, children }: { title: string; lastUpdated: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-md max-h-[85vh] bg-[#111827] rounded-t-3xl border-t border-white/10 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#111827] border-b border-white/5 px-6 py-5 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-sora font-extrabold text-white">{title}</h2>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-0.5">{lastUpdated}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#111827] border-t border-white/5 px-6 py-4">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-[#F5B301] text-[#0B0F19] font-sora font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#F5B301]/90 transition-colors"
          >
            I Have Read and Accept
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Profile;
