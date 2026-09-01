import React, { useState } from 'react';
import { TabType } from '../../types';

interface PlatformScreenProps {
  onNavigate: (tab: TabType) => void;
}

export const PlatformScreen: React.FC<PlatformScreenProps> = ({ onNavigate }) => {
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [showScanSimulator, setShowScanSimulator] = useState(false);

  return (
    <div className="space-y-12 md:space-y-16 animate-in fade-in duration-200">
      {/* Hero Section */}
      <section id="platform-hero" className="relative pt-4 md:pt-8 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#2b6954]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Text Column */}
          <div className="space-y-5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fcf2eb] border border-[#d8c3ad]/40 text-[#2b6954] text-xs font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse" />
              <span>Industrial Traceability v1.0</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-[#1f1b17] leading-[1.15] tracking-tight">
              From Hive to Consumer, <br />
              <span className="text-gradient">Every Drop Has a Story.</span>
            </h1>

            <p className="text-base text-[#534434] leading-relaxed">
              Honey Chain combines IoT, AI, and blockchain to monitor hive health, predict productivity, and provide transparent, immutable honey traceability.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-3">
              <button
                id="hero-explore-dashboard-btn"
                onClick={() => onNavigate('dashboard')}
                className="bg-[#855300] hover:bg-[#653e00] text-white text-sm font-bold px-7 py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-[0_4px_6px_-1px_rgba(133,83,0,0.2)] active:translate-y-px transition-all cursor-pointer"
              >
                <span>Explore Dashboard</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>

              <button
                id="hero-verify-honey-btn"
                onClick={() => onNavigate('consumer_verify')}
                className="bg-white hover:bg-[#f6ece6] text-[#1f1b17] border border-[#d8c3ad] text-sm font-bold px-7 py-3.5 rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>Verify Honey</span>
                <span className="material-symbols-outlined text-lg text-[#855300]">qr_code_scanner</span>
              </button>
            </div>
          </div>

          {/* Right Visual Representation (Smart Hive Graphic & Floating Data) */}
          <div className="relative w-full aspect-square max-w-md mx-auto lg:mx-0">
            {/* Centered Circular Backdrop */}
            <div className="absolute inset-0 bg-[#fcf2eb] rounded-full shadow-lg overflow-hidden border border-[#f0e6e0] flex items-center justify-center p-6 sm:p-8">
              <div
                className="w-full h-full bg-contain bg-no-repeat bg-center rounded-full"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6hLAajlmJ8uiRAilPeVc6GODWi7Vn8MQJojHZuAv_tfTmaGWAfe6Jb3KWpxqJb7RasvpxmFPtmsEGm0K3QxNrvPVrbbNcfPBmKZSOyjsV9PANV8RDdPLE9ee3AfndBlJhtovaPdMcrq3g0fw-0X7HFjRLpqN-CHOyzqzLpGO3ec4X_01VVQb7x82W3bLFYXFMgbYvvWYCrvXj1tOotLugChL1Lgai3cReE34dO7cRdb9VvmtdOzQkAg')`,
                }}
              />
            </div>

            {/* Floating Telemetry Pill 1 */}
            <div className="absolute top-8 -left-2 sm:-left-6 glass-panel px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 shadow-md animate-bounce [animation-duration:4s]">
              <div className="w-8 h-8 rounded-full bg-[#2b6954]/10 flex items-center justify-center text-[#2b6954]">
                <span className="material-symbols-outlined text-lg">thermostat</span>
              </div>
              <div>
                <div className="text-[10px] font-semibold text-[#867461] uppercase tracking-wider">Internal Temp</div>
                <div className="text-sm font-extrabold text-[#1f1b17]">34.5°C</div>
              </div>
            </div>

            {/* Floating Telemetry Pill 2 */}
            <div className="absolute bottom-16 -right-2 sm:-right-6 glass-panel px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 shadow-md animate-bounce [animation-duration:5s]">
              <div className="w-8 h-8 rounded-full bg-[#855300]/10 flex items-center justify-center text-[#855300]">
                <span className="material-symbols-outlined text-lg">link</span>
              </div>
              <div>
                <div className="text-[10px] font-semibold text-[#867461] uppercase tracking-wider">Block Verified</div>
                <div className="text-xs font-mono font-bold text-[#1f1b17]">#0x8f...4e2</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="platform-stats" className="border-y border-[#d8c3ad]/30 bg-white rounded-xl py-8 px-4 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#d8c3ad]/30">
          <div className="text-center px-4 pt-4 md:pt-0">
            <div className="text-3xl md:text-4xl font-extrabold text-[#855300] tracking-tight">1,250+</div>
            <div className="text-xs font-bold text-[#534434] uppercase tracking-wider mt-1">Beekeepers</div>
          </div>
          <div className="text-center px-4 pt-4 md:pt-0">
            <div className="text-3xl md:text-4xl font-extrabold text-[#2b6954] tracking-tight">18,400+</div>
            <div className="text-xs font-bold text-[#534434] uppercase tracking-wider mt-1">Active Hives</div>
          </div>
          <div className="text-center px-4 pt-4 md:pt-0">
            <div className="text-3xl md:text-4xl font-extrabold text-[#855300] tracking-tight">6,820+</div>
            <div className="text-xs font-bold text-[#534434] uppercase tracking-wider mt-1">Batches Traced</div>
          </div>
          <div className="text-center px-4 pt-4 md:pt-0">
            <div className="text-3xl md:text-4xl font-extrabold text-[#2b6954] tracking-tight">98.7%</div>
            <div className="text-xs font-bold text-[#534434] uppercase tracking-wider mt-1">Data Accuracy</div>
          </div>
        </div>
      </section>

      {/* Bento Grid: Engineered for Transparency */}
      <section id="engineered-for-transparency" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f1b17]">
            Engineered for Transparency
          </h2>
          <p className="text-sm text-[#534434]">
            The Honey Chain ecosystem integrates cutting-edge technology at every step of the apiculture process, ensuring quality, health, and provenance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: IoT Monitoring (2 cols on desktop) */}
          <div 
            onClick={() => onNavigate('hives')}
            className="md:col-span-2 glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer bg-white"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#adedd3] flex items-center justify-center text-[#306d58] mb-6">
                <span className="material-symbols-outlined text-2xl">sensors</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1f1b17] mb-2 flex items-center justify-between">
                  <span>IoT Monitoring</span>
                  <span className="material-symbols-outlined text-sm text-[#855300] opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#534434] leading-relaxed max-w-lg">
                  Continuous real-time data collection from smart hives. Monitor internal temperature, humidity, acoustic signatures, and weight variations to track colony health and nectar flow.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: AI Intelligence */}
          <div 
            onClick={() => onNavigate('insights')}
            className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer bg-white"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center text-[#855300] mb-6">
                <span className="material-symbols-outlined text-2xl">insights</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1f1b17] mb-2 flex items-center justify-between">
                  <span>AI Intelligence</span>
                  <span className="material-symbols-outlined text-sm text-[#855300] opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#534434] leading-relaxed">
                  Predictive analytics algorithms process hive acoustics and environmental data to forecast swarming events and analyze overall colony health.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Blockchain Records */}
          <div 
            onClick={() => onNavigate('trace')}
            className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer bg-white"
          >
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-xl bg-[#eae1da] flex items-center justify-center text-[#534434] mb-6">
                <span className="material-symbols-outlined text-2xl">hub</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1f1b17] mb-2 flex items-center justify-between">
                  <span>Blockchain Records</span>
                  <span className="material-symbols-outlined text-sm text-[#855300] opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#534434] leading-relaxed">
                  Every extraction, processing step, and transport log is cryptographically hashed and stored on an immutable ledger, guaranteeing true origin.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: QR Verification (2 cols on desktop) */}
          <div 
            onClick={() => onNavigate('consumer_verify')}
            className="md:col-span-2 glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer bg-white"
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-xl bg-[#f6ece6] flex items-center justify-center text-[#855300] mb-4 border border-[#d8c3ad]/30">
                  <span className="material-symbols-outlined text-2xl">qr_code_2</span>
                </div>
                <h3 className="text-xl font-bold text-[#1f1b17] mb-2 flex items-center gap-2">
                  <span>QR Verification</span>
                  <span className="material-symbols-outlined text-sm text-[#855300] opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                </h3>
                <p className="text-xs sm:text-sm text-[#534434] leading-relaxed max-w-md">
                  Consumers scan a unique code on the jar to view the complete journey of their honey, building trust through total transparency.
                </p>
              </div>

              {/* Realistic QR Preview Mini-Card */}
              <div className="w-36 h-36 bg-white rounded-xl shadow-md p-2.5 flex-shrink-0 border border-[#d8c3ad]/40 flex flex-col items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY8vWU_sU8tYFBK6iwa4GIf9iJWlWVEksygV-ew8Raaje9pVgQgBiTlu-UKvI0eYxQgtYNLyi7odhC_hajXjHmKSVcJEFQ9hrX-T7zw9fB5kY-3pEBar-PNyM5ci94Y0oZU-wT8PceaRADEe6EcvP3A7MIVDPlkSi0qGl0p-ViMfizCXgWDL04wyZkHnnhGK3MJFwAlb_VnvpucN2gtqE7g4asGEa5ytjSqfi9QVMrvfyIaoPV7ZVRIg"
                  alt="QR Code Preview"
                  className="w-full h-full object-contain"
                />
                <div className="text-[10px] font-bold text-[#855300] mt-1 whitespace-nowrap">
                  Verified Origin
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
