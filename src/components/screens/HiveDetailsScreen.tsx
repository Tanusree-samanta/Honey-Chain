import React, { useState } from 'react';
import { HiveTelemetry, TabType } from '../../types';

interface HiveDetailsScreenProps {
  selectedHiveId: string;
  hives: HiveTelemetry[];
  onSelectHive: (id: string) => void;
  onUpdateHive: (updatedHive: HiveTelemetry) => void;
  onNavigate: (tab: TabType) => void;
}

export const HiveDetailsScreen: React.FC<HiveDetailsScreenProps> = ({
  selectedHiveId,
  hives,
  onSelectHive,
  onUpdateHive,
  onNavigate,
}) => {
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [activeSimulationType, setActiveSimulationType] = useState<string | null>(null);

  const currentHive = hives.find(h => h.id === selectedHiveId) || hives[0];

  // Simulation handler
  const handleApplySimulation = (type: 'heat' | 'moisture' | 'swarm' | 'predator' | 'reset') => {
    let updated: HiveTelemetry;

    if (type === 'heat') {
      updated = {
        ...currentHive,
        internalTemp: 38.6,
        humidity: 78,
        weight: currentHive.weight,
        status: 'critical',
        healthScore: 42,
        isSimulatedAbnormal: true,
        abnormalConditionName: 'Thermal Spike & Heat Stress',
        metrics: {
          tempStability: 38,
          humidityVariance: 55,
          weightGrowth: 45,
          environmentalConsistency: 40,
        },
        notes: 'CRITICAL ALERT: Core brood temperature exceeded 38.5°C threshold. Risk of brood comb melting and queen evacuation. Recommended immediate shade shelter & bottom-board ventilation opening.',
      };
      setActiveSimulationType('heat');
    } else if (type === 'moisture') {
      updated = {
        ...currentHive,
        humidity: 89,
        internalTemp: 35.8,
        status: 'attention',
        healthScore: 61,
        isSimulatedAbnormal: true,
        abnormalConditionName: 'Excessive Humidity & Condensation',
        metrics: {
          tempStability: 75,
          humidityVariance: 32,
          weightGrowth: 70,
          environmentalConsistency: 60,
        },
        notes: 'ATTENTION: Humidity reached 89%. Moisture condensation risks chalkbrood fungal spores. Clean bottom screen and check roof moisture quilt.',
      };
      setActiveSimulationType('moisture');
    } else if (type === 'swarm') {
      updated = {
        ...currentHive,
        weight: +(currentHive.weight - 2.5).toFixed(1),
        weightChange24h: '-7.8% (2h)',
        status: 'critical',
        healthScore: 48,
        isSimulatedAbnormal: true,
        abnormalConditionName: 'Swarming Mass Departure Detected',
        metrics: {
          tempStability: 60,
          humidityVariance: 65,
          weightGrowth: 28,
          environmentalConsistency: 50,
        },
        notes: 'SWARM DETECTED: Sudden 2.5kg weight loss accompanied by acoustic frequency spike (500Hz). Primary swarm clustered nearby.',
      };
      setActiveSimulationType('swarm');
    } else {
      // Reset to original healthy parameters
      updated = {
        ...currentHive,
        internalTemp: 34.8,
        humidity: 67,
        weight: 32.8,
        weightChange24h: '+1.4% (24h)',
        status: 'healthy',
        healthScore: 87,
        isSimulatedAbnormal: false,
        abnormalConditionName: undefined,
        metrics: {
          tempStability: 92,
          humidityVariance: 84,
          weightGrowth: 89,
          environmentalConsistency: 83,
        },
        notes: 'Overall colony health is excellent. Foraging activity is consistent with seasonal expectations.',
      };
      setActiveSimulationType(null);
    }

    onUpdateHive(updated);
    setShowSimulateModal(false);
  };

  // SVG Gauge calculations
  // circumference = 2 * PI * 45 = 282.74
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentHive.healthScore / 100) * circumference;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-200">
      {/* Page Header / Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          {/* Top meta tags */}
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span 
              className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5 shadow-sm ${
                currentHive.status === 'healthy'
                  ? 'bg-[#adedd3] text-[#006c49]'
                  : currentHive.status === 'attention'
                  ? 'bg-[#f59e0b]/20 text-[#855300]'
                  : 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/30'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {currentHive.status === 'healthy' ? 'check_circle' : 'warning'}
              </span>
              <span className="capitalize">{currentHive.status}</span>
            </span>

            <span className="text-xs text-[#534434] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-base text-[#855300]">location_on</span>
              {currentHive.cluster}
            </span>

            {/* Hive Selector Dropdown */}
            <div className="relative inline-block ml-auto sm:ml-0">
              <select
                id="hive-selector-select"
                value={currentHive.id}
                onChange={(e) => onSelectHive(e.target.value)}
                className="text-xs font-bold bg-white border border-[#d8c3ad] text-[#1f1b17] rounded-lg px-2.5 py-1 pr-6 focus:ring-2 focus:ring-[#855300] outline-none cursor-pointer"
              >
                {hives.map(h => (
                  <option key={h.id} value={h.id}>
                    {h.code} ({h.location}) - {h.status.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-[#1f1b17] tracking-tight">
            {currentHive.code}
          </h1>
          <p className="text-xs text-[#867461] mt-0.5">{currentHive.name}</p>
        </div>

        {/* Simulate Abnormal Condition CTA Button */}
        <div className="flex items-center gap-2">
          {currentHive.isSimulatedAbnormal && (
            <button
              id="reset-simulation-btn"
              onClick={() => handleApplySimulation('reset')}
              className="bg-[#2b6954] hover:bg-[#004e34] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              <span>Normalize</span>
            </button>
          )}

          <button
            id="simulate-abnormal-condition-btn"
            onClick={() => setShowSimulateModal(true)}
            className="bg-[#855300] hover:bg-[#653e00] text-white font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-[0_2px_0_0_rgba(97,59,0,1)] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">science</span>
            <span>Simulate Abnormal Condition</span>
          </button>
        </div>
      </div>

      {/* Simulated alert banner if active */}
      {currentHive.isSimulatedAbnormal && (
        <div className="p-4 rounded-xl bg-[#ffdad6] border border-[#ba1a1a]/40 text-[#93000a] flex items-center justify-between gap-4 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba1a1a] animate-bounce">warning</span>
            <div>
              <div className="font-bold text-xs uppercase tracking-wider">
                Simulated Condition: {currentHive.abnormalConditionName}
              </div>
              <div className="text-xs mt-0.5 opacity-90">{currentHive.notes}</div>
            </div>
          </div>
          <button
            onClick={() => handleApplySimulation('reset')}
            className="text-xs font-bold px-3 py-1.5 bg-white text-[#ba1a1a] rounded-lg shadow-sm hover:bg-[#fff8f5] whitespace-nowrap"
          >
            Reset Telemetry
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <section id="hive-kpis-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Internal Temp */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#d8c3ad]/20 flex flex-col justify-between hover:border-[#855300]/40 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-semibold text-[#534434]">Internal Temp</span>
            <span className={`material-symbols-outlined ${currentHive.internalTemp > 37 ? 'text-[#ba1a1a]' : 'text-[#2b6954]'}`}>
              device_thermostat
            </span>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-[#1f1b17] tracking-tight">
              {currentHive.internalTemp}<span className="text-xl font-normal text-[#534434]">°C</span>
            </div>
            <div className={`text-xs mt-1.5 flex items-center gap-1 font-semibold ${
              currentHive.internalTemp > 37 ? 'text-[#ba1a1a]' : 'text-[#006c49]'
            }`}>
              <span className="material-symbols-outlined text-sm">
                {currentHive.internalTemp > 37 ? 'warning' : 'trending_up'}
              </span>
              <span>{currentHive.internalTemp > 37 ? 'High Temperature Alert' : 'Optimal Range (34-36°C)'}</span>
            </div>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#d8c3ad]/20 flex flex-col justify-between hover:border-[#f59e0b]/40 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-semibold text-[#534434]">Humidity</span>
            <span className="material-symbols-outlined text-[#f59e0b]">water_drop</span>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-[#1f1b17] tracking-tight">
              {currentHive.humidity}<span className="text-xl font-normal text-[#534434]">%</span>
            </div>
            <div className="text-xs text-[#534434] mt-1.5 flex items-center gap-1 font-medium">
              <span>{currentHive.humidity > 80 ? 'Moisture Elevated' : 'Stable Target Range'}</span>
            </div>
          </div>
        </div>

        {/* Hive Weight */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#d8c3ad]/20 flex flex-col justify-between hover:border-[#867461]/40 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-semibold text-[#534434]">Hive Weight</span>
            <span className="material-symbols-outlined text-[#867461]">scale</span>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-[#1f1b17] tracking-tight">
              {currentHive.weight}<span className="text-xl font-normal text-[#534434]">kg</span>
            </div>
            <div className="text-xs text-[#006c49] mt-1.5 flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
              <span>{currentHive.weightChange24h}</span>
            </div>
          </div>
        </div>

        {/* Signal / Telemetry Status */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-[#d8c3ad]/20 flex flex-col justify-between hover:border-[#2b6954]/40 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <span className="text-sm font-semibold text-[#534434]">Telemetry Status</span>
            <span className="material-symbols-outlined text-[#006c49]">wifi</span>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-[#1f1b17] mt-1">
              {currentHive.telemetryStatus}
            </div>
            <div className="text-xs text-[#867461] mt-1.5 flex items-center gap-1 font-medium">
              <span>Last ping: {currentHive.lastPing}</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Health Analysis Section */}
      <section id="ai-health-analysis-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Score Card with Big Radial SVG Gauge */}
        <div className="lg:col-span-5 bg-white/95 backdrop-blur-md rounded-xl p-6 shadow-sm border border-[#d8c3ad]/30 flex flex-col items-center justify-center text-center">
          <h2 className="text-base font-bold text-[#1f1b17] mb-6 w-full text-left flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006c49]">insights</span>
            <span>AI Health Analysis</span>
          </h2>

          <div className="relative w-44 h-44 mb-4 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-[#f0e6e0]"
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
              />
              {/* Progress Circle with Animation */}
              <circle
                className={currentHive.healthScore > 75 ? 'text-[#006c49]' : currentHive.healthScore > 55 ? 'text-[#f59e0b]' : 'text-[#ba1a1a]'}
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.8s ease' }}
              />
            </svg>

            {/* Inner Score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-extrabold text-[#1f1b17] leading-none tracking-tight">
                {currentHive.healthScore}
              </span>
              <span className="text-xs font-bold text-[#867461] mt-1 tracking-wider">
                / 100
              </span>
            </div>
          </div>

          <p className="text-xs text-[#534434] max-w-xs leading-relaxed">
            {currentHive.notes}
          </p>

          <div className="mt-4 pt-4 border-t border-[#f0e6e0] w-full flex justify-around text-center">
            <div>
              <div className="text-[10px] uppercase font-bold text-[#867461]">Queen Health</div>
              <div className="text-xs font-extrabold text-[#006c49]">Active & Verified</div>
            </div>
            <div className="border-r border-[#f0e6e0]" />
            <div>
              <div className="text-[10px] uppercase font-bold text-[#867461]">Swarm Risk</div>
              <div className={`text-xs font-extrabold ${currentHive.healthScore < 50 ? 'text-[#ba1a1a]' : 'text-[#006c49]'}`}>
                {currentHive.healthScore < 50 ? 'High Agitation' : 'Low (< 4%)'}
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Metrics */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 shadow-sm border border-[#d8c3ad]/20 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#1f1b17] mb-5 flex items-center justify-between">
              <span>Metric Breakdown</span>
              <span className="text-xs font-semibold text-[#867461]">Multi-spectral IoT telemetry</span>
            </h3>

            <div className="flex flex-col gap-4">
              {/* Temperature Stability */}
              <div>
                <div className="flex justify-between items-end mb-1 text-xs">
                  <span className="font-semibold text-[#1f1b17]">Temperature Stability</span>
                  <span className="font-bold text-[#2b6954]">{currentHive.metrics.tempStability}%</span>
                </div>
                <div className="w-full h-2 bg-[#f0e6e0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2b6954] rounded-full transition-all duration-500"
                    style={{ width: `${currentHive.metrics.tempStability}%` }}
                  />
                </div>
              </div>

              {/* Humidity Variance */}
              <div>
                <div className="flex justify-between items-end mb-1 text-xs">
                  <span className="font-semibold text-[#1f1b17]">Humidity Variance</span>
                  <span className="font-bold text-[#30c88f]">{currentHive.metrics.humidityVariance}%</span>
                </div>
                <div className="w-full h-2 bg-[#f0e6e0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#30c88f] rounded-full transition-all duration-500"
                    style={{ width: `${currentHive.metrics.humidityVariance}%` }}
                  />
                </div>
              </div>

              {/* Weight Growth Trend */}
              <div>
                <div className="flex justify-between items-end mb-1 text-xs">
                  <span className="font-semibold text-[#1f1b17]">Weight Growth Trend</span>
                  <span className="font-bold text-[#855300]">{currentHive.metrics.weightGrowth}%</span>
                </div>
                <div className="w-full h-2 bg-[#f0e6e0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#855300] rounded-full transition-all duration-500"
                    style={{ width: `${currentHive.metrics.weightGrowth}%` }}
                  />
                </div>
              </div>

              {/* Environmental Consistency */}
              <div>
                <div className="flex justify-between items-end mb-1 text-xs">
                  <span className="font-semibold text-[#1f1b17]">Environmental Consistency</span>
                  <span className="font-bold text-[#2b6954]">{currentHive.metrics.environmentalConsistency}%</span>
                </div>
                <div className="w-full h-2 bg-[#f0e6e0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#95d3ba] rounded-full transition-all duration-500"
                    style={{ width: `${currentHive.metrics.environmentalConsistency}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Trace Batch Reference */}
          <div className="mt-6 pt-4 border-t border-[#f0e6e0] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#855300] text-lg">account_tree</span>
              <span className="text-xs font-semibold text-[#534434]">Linked Active Batch: HC-2026-0001</span>
            </div>
            <button
              onClick={() => onNavigate('trace')}
              className="text-xs font-bold text-[#855300] hover:text-[#f59e0b] flex items-center gap-1"
            >
              <span>View Trace</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Simulation Modal */}
      {showSimulateModal && (
        <div 
          id="simulation-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-[#d8c3ad] animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-3 border-b border-[#eae1da]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#855300] text-2xl">science</span>
                <h3 className="font-extrabold text-lg text-[#1f1b17]">IoT Anomaly Simulator</h3>
              </div>
              <button 
                onClick={() => setShowSimulateModal(false)}
                className="text-[#867461] hover:text-[#1f1b17] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#534434] my-3 leading-relaxed">
              Inject synthetic edge sensor telemetry into <strong>{currentHive.code}</strong> to test AI alert thresholds, colony risk models, and blockchain event logging.
            </p>

            <div className="grid grid-cols-1 gap-2.5 my-4">
              <button
                onClick={() => handleApplySimulation('heat')}
                className="p-3 rounded-xl border border-[#ba1a1a]/30 bg-[#ffdad6]/30 hover:bg-[#ffdad6]/60 text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-[#ba1a1a] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">local_fire_department</span>
                    <span>Heat Stress & Thermal Agitation</span>
                  </div>
                  <div className="text-[11px] text-[#534434] mt-0.5">Spikes internal temperature to 38.6°C (Exceeds brood safety)</div>
                </div>
                <span className="material-symbols-outlined text-[#ba1a1a] opacity-0 group-hover:opacity-100 transition-opacity">play_arrow</span>
              </button>

              <button
                onClick={() => handleApplySimulation('moisture')}
                className="p-3 rounded-xl border border-[#f59e0b]/30 bg-[#fcf2eb] hover:bg-[#f6ece6] text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-[#855300] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">water_drop</span>
                    <span>Moisture Surge & Condensation</span>
                  </div>
                  <div className="text-[11px] text-[#534434] mt-0.5">Elevates humidity to 89% with high fungal pathogen index</div>
                </div>
                <span className="material-symbols-outlined text-[#855300] opacity-0 group-hover:opacity-100 transition-opacity">play_arrow</span>
              </button>

              <button
                onClick={() => handleApplySimulation('swarm')}
                className="p-3 rounded-xl border border-[#ba1a1a]/30 bg-[#ffdad6]/30 hover:bg-[#ffdad6]/60 text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-[#ba1a1a] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">flight_takeoff</span>
                    <span>Sudden Swarming Event</span>
                  </div>
                  <div className="text-[11px] text-[#534434] mt-0.5">Sharp 2.5kg weight drop and acoustic swarm signature</div>
                </div>
                <span className="material-symbols-outlined text-[#ba1a1a] opacity-0 group-hover:opacity-100 transition-opacity">play_arrow</span>
              </button>

              <button
                onClick={() => handleApplySimulation('reset')}
                className="p-3 rounded-xl border border-[#2b6954]/30 bg-[#adedd3]/30 hover:bg-[#adedd3]/60 text-left transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-[#006c49] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Optimal Baseline (34.8°C / 67% RH)</span>
                  </div>
                  <div className="text-[11px] text-[#534434] mt-0.5">Restore normal foraging telemetry and high health index</div>
                </div>
                <span className="material-symbols-outlined text-[#006c49] opacity-0 group-hover:opacity-100 transition-opacity">restart_alt</span>
              </button>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#eae1da]">
              <button
                onClick={() => setShowSimulateModal(false)}
                className="px-4 py-2 text-xs font-bold text-[#534434] hover:bg-[#eae1da] rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
