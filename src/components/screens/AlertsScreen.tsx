import React, { useState } from 'react';
import { HiveTelemetry, TabType } from '../../types';

interface AlertsScreenProps {
  hives: HiveTelemetry[];
  onSelectHive: (id: string) => void;
  onUpdateHive: (updated: HiveTelemetry) => void;
  onNavigate: (tab: TabType) => void;
}

export const AlertsScreen: React.FC<AlertsScreenProps> = ({
  hives,
  onSelectHive,
  onUpdateHive,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'attention'>('all');

  const filteredHives = hives.filter(h => {
    if (filter === 'critical') return h.status === 'critical';
    if (filter === 'attention') return h.status === 'attention';
    return h.status === 'critical' || h.status === 'attention';
  });

  const handleResolveAlert = (hive: HiveTelemetry) => {
    const resolved: HiveTelemetry = {
      ...hive,
      status: 'healthy',
      healthScore: 88,
      internalTemp: 34.8,
      humidity: 65,
      isSimulatedAbnormal: false,
      abnormalConditionName: undefined,
      notes: 'Alert acknowledged and resolved by operator. Telemetry normalized.',
    };
    onUpdateHive(resolved);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1f1b17] tracking-tight">
            Apiary Telemetry Alerts
          </h1>
          <p className="text-xs md:text-sm text-[#534434] mt-1">
            Real-time alerts triggered by edge IoT sensor thresholds and AI colony anomaly detection.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-[#f6ece6] p-1 rounded-xl text-xs font-bold">
          {(['all', 'critical', 'attention'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg capitalize transition-all ${
                filter === f
                  ? 'bg-white text-[#855300] shadow-sm'
                  : 'text-[#534434] hover:text-[#1f1b17]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredHives.map(hive => {
          const isCritical = hive.status === 'critical';

          return (
            <div
              key={hive.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm ${
                isCritical
                  ? 'bg-[#ffdad6]/30 border-[#ba1a1a]/40'
                  : 'bg-[#fcf2eb] border-[#f59e0b]/40'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    isCritical ? 'bg-[#ba1a1a] text-white animate-bounce' : 'bg-[#f59e0b] text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">
                    {isCritical ? 'error' : 'warning'}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="text-base font-extrabold text-[#1f1b17]">{hive.code}</span>
                    <span className="text-xs text-[#867461]">({hive.location})</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isCritical
                          ? 'bg-[#ba1a1a] text-white'
                          : 'bg-[#f59e0b]/20 text-[#855300]'
                      }`}
                    >
                      {hive.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#534434] mt-1.5 max-w-xl leading-relaxed">
                    {hive.notes || 'Sensor threshold exceeded for core brood conditions.'}
                  </p>

                  <div className="flex items-center gap-4 mt-2 text-[11px] font-semibold text-[#867461]">
                    <span>Temp: {hive.internalTemp}°C</span>
                    <span>Humidity: {hive.humidity}%</span>
                    <span>Weight: {hive.weight} kg</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-[#d8c3ad]/30">
                <button
                  onClick={() => {
                    onSelectHive(hive.id);
                    onNavigate('hives');
                  }}
                  className="px-3.5 py-2 text-xs font-bold bg-white text-[#1f1b17] border border-[#d8c3ad] rounded-xl hover:bg-[#fff8f5] transition-colors"
                >
                  Inspect Telemetry
                </button>
                <button
                  onClick={() => handleResolveAlert(hive)}
                  className="px-4 py-2 text-xs font-bold bg-[#2b6954] text-white rounded-xl hover:bg-[#004e34] transition-colors shadow-sm"
                >
                  Acknowledge & Resolve
                </button>
              </div>
            </div>
          );
        })}

        {filteredHives.length === 0 && (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#d8c3ad]/30">
            <span className="material-symbols-outlined text-4xl text-[#006c49] mb-2">check_circle</span>
            <h3 className="font-extrabold text-base text-[#1f1b17]">All Clear!</h3>
            <p className="text-xs text-[#534434] mt-1">No active telemetry alerts found in this filter range.</p>
          </div>
        )}
      </div>
    </div>
  );
};
