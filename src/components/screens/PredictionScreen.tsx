import React, { useState } from 'react';
import { INFLUENCE_FACTORS } from '../../data/mockData';

export const PredictionScreen: React.FC = () => {
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [ambientTemp, setAmbientTemp] = useState<number>(28);
  const [precipitation, setPrecipitation] = useState<number>(45);
  const [floralDensity, setFloralDensity] = useState<number>(8.5);
  const [colonySize, setColonySize] = useState<number>(55); // 55,000 bees

  // Dynamic calculation based on parameters
  const computedPrediction = +(
    4.0 +
    ((ambientTemp - 24) * 0.1) +
    ((floralDensity - 5) * 0.25) -
    ((precipitation > 60 ? (precipitation - 60) * 0.02 : 0))
  ).toFixed(1);

  const computedConfidence = Math.min(
    95,
    Math.max(68, Math.round(84 + (floralDensity > 7 ? 4 : -4) - Math.abs(ambientTemp - 28) * 1.2))
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#855300] tracking-tight">
            Honey Productivity Prediction
          </h1>
          <p className="text-sm text-[#534434] mt-1">
            AI-powered forecast based on hive conditions and environmental trends.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-[#f0e6e0] px-3.5 py-1.5 rounded-full shadow-sm">
          <span className="material-symbols-outlined text-sm text-[#2b6954]">update</span>
          <span className="text-xs font-bold text-[#534434]">Live Model Active</span>
        </div>
      </header>

      {/* Main Grid (Bento Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Key Forecast & Yield Trajectory Chart (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Key Metrics Banner */}
          <section id="prediction-metrics-banner" className="glass-card rounded-xl p-5 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#f59e0b] text-white flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-2xl">monitoring</span>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[#534434] uppercase tracking-wider mb-0.5">
                  Predicted Production
                </h3>
                <p className="text-4xl md:text-5xl font-extrabold text-[#855300] leading-none">
                  {computedPrediction} <span className="text-2xl font-normal text-[#534434]">kg</span>
                </p>
              </div>
            </div>

            <div className="flex flex-row sm:flex-col gap-4 sm:gap-2 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-[#d8c3ad]/30 pt-4 sm:pt-0 sm:pl-6">
              <div className="flex-1">
                <span className="block text-[11px] font-semibold text-[#867461] uppercase tracking-wider">
                  Forecast
                </span>
                <span className="text-sm font-extrabold text-[#1f1b17]">Next 30 Days</span>
              </div>
              <div className="flex-1">
                <span className="block text-[11px] font-semibold text-[#867461] uppercase tracking-wider">
                  Confidence
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-[#006c49]">{computedConfidence}%</span>
                  <div className="w-16 h-2 bg-[#f0e6e0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#006c49] rounded-full transition-all duration-300" style={{ width: `${computedConfidence}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Prediction Chart (Yield Trajectory) */}
          <section id="yield-trajectory-chart" className="glass-card rounded-xl p-5 md:p-6 min-h-[380px] flex flex-col bg-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
              <h3 className="text-base font-bold text-[#1f1b17]">Yield Trajectory</h3>
              <div className="flex items-center gap-5 text-xs font-semibold text-[#534434]">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-1 bg-[#855300] rounded-full" />
                  <span>Historical</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-1 border-t-2 border-dashed border-[#f59e0b]" />
                  <span>Predicted</span>
                </div>
              </div>
            </div>

            {/* SVG Chart Container */}
            <div className="relative w-full flex-1 rounded-lg border border-[#d8c3ad]/25 overflow-hidden p-2 min-h-[260px] bg-gradient-to-b from-[#855300]/5 to-transparent flex items-center">
              {/* Mock Grid */}
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-4 pointer-events-none opacity-20">
                <div className="border-b border-r border-[#867461]" /><div className="border-b border-r border-[#867461]" /><div className="border-b border-r border-[#867461]" /><div className="border-b border-r border-[#867461]" /><div className="border-b border-[#867461]" />
                <div className="border-b border-r border-[#867461]" /><div className="border-b border-r border-[#867461]" /><div className="border-b border-r border-[#867461]" /><div className="border-b border-r border-[#867461]" /><div className="border-b border-[#867461]" />
                <div className="border-b border-r border-[#867461]" /><div className="border-b border-r border-[#867461]" /><div className="border-b border-r border-[#867461]" /><div className="border-b border-r border-[#867461]" /><div className="border-b border-[#867461]" />
                <div className="border-r border-[#867461]" /><div className="border-r border-[#867461]" /><div className="border-r border-[#867461]" /><div className="border-r border-[#867461]" /><div />
              </div>

              <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 350" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="predict-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Historical Area */}
                <path
                  d="M 0,310 L 120,280 L 250,290 L 380,240 L 500,260 L 600,190 L 600,350 L 0,350 Z"
                  fill="rgba(133, 83, 0, 0.06)"
                />
                {/* Historical Line */}
                <path
                  d="M 0,310 L 120,280 L 250,290 L 380,240 L 500,260 L 600,190"
                  fill="none"
                  stroke="#855300"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Predicted Area */}
                <path
                  d={`M 600,190 L 720,${150 - (computedPrediction - 4) * 15} L 850,${110 - (computedPrediction - 4) * 20} L 1000,${60 - (computedPrediction - 4) * 25} L 1000,350 L 600,350 Z`}
                  fill="url(#predict-gradient)"
                />
                {/* Predicted Line */}
                <path
                  d={`M 600,190 L 720,${150 - (computedPrediction - 4) * 15} L 850,${110 - (computedPrediction - 4) * 20} L 1000,${60 - (computedPrediction - 4) * 25}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                  strokeDasharray="6,6"
                  strokeLinecap="round"
                />

                {/* Data Points Historical */}
                <circle cx="120" cy="280" r="4.5" fill="#855300" />
                <circle cx="250" cy="290" r="4.5" fill="#855300" />
                <circle cx="380" cy="240" r="4.5" fill="#855300" />
                <circle cx="500" cy="260" r="4.5" fill="#855300" />
                <circle cx="600" cy="190" r="6" fill="#855300" stroke="#ffffff" strokeWidth="2.5" />

                {/* Data Points Predicted */}
                <circle cx="720" cy={150 - (computedPrediction - 4) * 15} r="4.5" fill="#f59e0b" />
                <circle cx="850" cy={110 - (computedPrediction - 4) * 20} r="4.5" fill="#f59e0b" />
                <circle cx="1000" cy={60 - (computedPrediction - 4) * 25} r="7" fill="#f59e0b" stroke="#ffffff" strokeWidth="2.5" />

                {/* Current Date Split Line */}
                <line
                  x1="600"
                  y1="0"
                  x2="600"
                  y2="350"
                  stroke="#867461"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  opacity="0.6"
                />
              </svg>

              {/* X Axis Labels */}
              <div className="absolute bottom-2 left-0 w-full flex justify-between px-4 text-[11px] font-semibold text-[#867461]">
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span className="text-[#855300] font-bold">Aug (Now)</span>
                <span>Sep</span>
                <span>Oct</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Influence Factors & Adjust Model CTA (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h3 className="text-base font-bold text-[#1f1b17] px-1">Influence Factors</h3>

          {INFLUENCE_FACTORS.map((factor) => (
            <div
              key={factor.id}
              className="glass-card rounded-xl p-4 flex items-center gap-3.5 relative overflow-hidden bg-white hover:shadow-md transition-shadow"
            >
              {/* Left Color Indicator Stripe */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5"
                style={{ backgroundColor: factor.indicatorColor }}
              />

              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-inner"
                style={{ backgroundColor: `${factor.indicatorColor}20` }}
              >
                <span className="material-symbols-outlined text-lg" style={{ color: factor.indicatorColor }}>
                  {factor.icon}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#1f1b17]">{factor.title}</h4>
                <p
                  className="text-[11px] font-medium mt-0.5"
                  style={{ color: factor.indicatorColor }}
                >
                  {factor.subtitle}
                </p>
              </div>
            </div>
          ))}

          {/* Adjust Model Parameters Button */}
          <button
            id="adjust-model-parameters-btn"
            onClick={() => setShowAdjustModal(true)}
            className="mt-2 bg-[#855300] hover:bg-[#653e00] text-white text-xs font-bold py-3.5 px-5 rounded-xl shadow-[0_2px_0_0_#613b00] transition-all active:translate-y-[2px] active:shadow-none flex justify-center items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">tune</span>
            <span>Adjust Model Parameters</span>
          </button>
        </div>
      </div>

      {/* Adjust Parameters Modal / Drawer */}
      {showAdjustModal && (
        <div 
          id="adjust-parameters-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-[#d8c3ad] animate-in zoom-in-95 duration-150 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#eae1da]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#855300] text-2xl">tune</span>
                <h3 className="font-extrabold text-lg text-[#1f1b17]">AI Prediction Modeler</h3>
              </div>
              <button 
                onClick={() => setShowAdjustModal(false)}
                className="text-[#867461] hover:text-[#1f1b17] font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#534434]">
              Simulate upcoming seasonal weather anomalies and floral bloom densities to project apiary yield adjustments.
            </p>

            {/* Slider 1: Temperature */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1f1b17]">Avg Ambient Temperature</span>
                <span className="text-[#855300] font-bold">{ambientTemp}°C</span>
              </div>
              <input
                type="range"
                min="18"
                max="40"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(+e.target.value)}
                className="w-full accent-[#855300] cursor-pointer"
              />
            </div>

            {/* Slider 2: Precipitation */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1f1b17]">Expected Monthly Rainfall</span>
                <span className="text-[#2b6954] font-bold">{precipitation} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="150"
                value={precipitation}
                onChange={(e) => setPrecipitation(+e.target.value)}
                className="w-full accent-[#2b6954] cursor-pointer"
              />
            </div>

            {/* Slider 3: Floral Bloom Density */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1f1b17]">Floral Bloom & Nectar Index</span>
                <span className="text-[#f59e0b] font-bold">{floralDensity} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={floralDensity}
                onChange={(e) => setFloralDensity(+e.target.value)}
                className="w-full accent-[#f59e0b] cursor-pointer"
              />
            </div>

            {/* Slider 4: Colony Population */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1f1b17]">Average Colony Population</span>
                <span className="text-[#006c49] font-bold">{colonySize},000 bees</span>
              </div>
              <input
                type="range"
                min="30"
                max="80"
                value={colonySize}
                onChange={(e) => setColonySize(+e.target.value)}
                className="w-full accent-[#006c49] cursor-pointer"
              />
            </div>

            {/* Live Recalculation Output Pill */}
            <div className="p-3 bg-[#fcf2eb] rounded-xl border border-[#d8c3ad] flex justify-between items-center text-xs">
              <span className="font-semibold text-[#534434]">Recalculated 30-Day Yield:</span>
              <span className="font-extrabold text-[#855300] text-sm">{computedPrediction} kg ({computedConfidence}% Conf.)</span>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#eae1da]">
              <button
                onClick={() => {
                  setAmbientTemp(28);
                  setPrecipitation(45);
                  setFloralDensity(8.5);
                  setColonySize(55);
                }}
                className="px-4 py-2 text-xs font-semibold text-[#867461] hover:bg-[#eae1da] rounded-lg transition-colors"
              >
                Reset Default
              </button>
              <button
                onClick={() => setShowAdjustModal(false)}
                className="px-5 py-2 text-xs font-bold bg-[#855300] text-white rounded-lg hover:bg-[#653e00] transition-colors shadow-sm"
              >
                Apply Parameters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
