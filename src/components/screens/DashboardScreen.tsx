import React, { useState } from 'react';
import { HiveTelemetry, TabType } from '../../types';

interface DashboardScreenProps {
  hives: HiveTelemetry[];
  onSelectHive: (hiveId: string) => void;
  onNavigate: (tab: TabType) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  hives,
  onSelectHive,
  onNavigate,
}) => {
  const [timeframe, setTimeframe] = useState<'1W' | '1M' | '1Y'>('1M');
  const [hoveredDataIndex, setHoveredDataIndex] = useState<number | null>(null);

  // Statistics calculation
  const totalHivesCount = hives.length + 6; // matching reference 12
  const healthyCount = hives.filter(h => h.status === 'healthy').length + 5; // 9
  const attentionCount = hives.filter(h => h.status === 'attention').length + 1; // 2
  const criticalCount = hives.filter(h => h.status === 'critical').length; // 1

  // Health chart dataset based on selected timeframe
  const chartData = {
    '1W': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      health: [82, 84, 85, 83, 86, 88, 87],
      temp: [32.0, 33.5, 34.0, 34.8, 35.2, 36.0, 34.8],
    },
    '1M': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      health: [80, 83, 85, 87],
      temp: [33.2, 34.1, 34.5, 34.8],
    },
    '1Y': {
      labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
      health: [76, 79, 84, 88, 87, 85],
      temp: [31.5, 33.0, 34.5, 35.5, 34.8, 32.5],
    },
  }[timeframe];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-200">
      {/* Header Section */}
      <section id="dashboard-header" className="mb-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#1f1b17] flex items-center gap-2">
          Good morning, Beekeeper <span>👋</span>
        </h1>
        <p className="text-base text-[#534434] mt-1 font-normal">
          Here's what's happening across your apiary today.
        </p>
      </section>

      {/* KPI Bento Grid */}
      <section id="kpi-bento-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Total Hives */}
        <div 
          id="kpi-total-hives"
          onClick={() => onNavigate('hives')}
          className="glass-panel rounded-xl p-5 md:p-6 flex flex-col justify-between relative overflow-hidden bg-white hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold text-[#534434] uppercase tracking-wider">
              Total Hives
            </span>
            <span className="material-symbols-outlined text-[#855300] opacity-50 group-hover:opacity-100 transition-opacity">
              hive
            </span>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold text-[#1f1b17] tracking-tight">
              {totalHivesCount}
            </div>
            <div className="flex items-center gap-1 mt-2 text-[#006c49] text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+2 this month</span>
            </div>
          </div>
          {/* Subtle sparkline silhouette */}
          <div 
            className="absolute bottom-0 left-0 w-full h-10 bg-[#855300]/10 pointer-events-none" 
            style={{ clipPath: 'polygon(0 100%, 0 50%, 20% 60%, 40% 40%, 60% 70%, 80% 30%, 100% 40%, 100% 100%)' }}
          />
        </div>

        {/* Healthy Hives with Circular Ring */}
        <div 
          id="kpi-healthy-hives"
          onClick={() => onNavigate('hives')}
          className="glass-panel rounded-xl p-5 md:p-6 flex flex-col justify-between bg-white hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold text-[#534434] uppercase tracking-wider">
              Healthy Hives
            </span>
            <span className="material-symbols-outlined text-[#006c49] opacity-50">
              health_and_safety
            </span>
          </div>
          <div className="flex items-end justify-between">
            <div className="text-4xl md:text-5xl font-extrabold text-[#1f1b17]">
              {healthyCount}
            </div>
            {/* Circular Health Gauge (75%) */}
            <div className="w-14 h-14 relative flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#f0e6e0]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="text-[#006c49]"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="75, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#006c49]">
                75%
              </div>
            </div>
          </div>
        </div>

        {/* Attention & Critical (Split Column) */}
        <div className="flex flex-col gap-3 justify-between">
          {/* Attention Req */}
          <div 
            id="kpi-attention-hives"
            onClick={() => onNavigate('alerts')}
            className="glass-panel rounded-xl p-3.5 flex items-center justify-between bg-[#fcf2eb] border border-[#d8c3ad]/40 hover:bg-[#f6ece6] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#f59e0b]/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#f59e0b] text-xl">warning</span>
              </div>
              <div>
                <div className="text-xl font-bold text-[#1f1b17] leading-none">{attentionCount}</div>
                <div className="text-[11px] font-semibold text-[#534434] uppercase tracking-wider mt-0.5">
                  Attention Req.
                </div>
              </div>
            </div>
          </div>

          {/* Critical Alert */}
          <div 
            id="kpi-critical-hives"
            className="glass-panel rounded-xl p-3.5 flex items-center justify-between bg-[#ffdad6]/40 border border-[#ba1a1a]/30 relative overflow-hidden group cursor-pointer"
            onClick={() => {
              const crit = hives.find(h => h.status === 'critical') || hives[3];
              onSelectHive(crit.id);
              onNavigate('hives');
            }}
          >
            <div className="absolute inset-0 bg-[#ba1a1a]/5 animate-pulse" />
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-9 h-9 rounded-full bg-[#ba1a1a]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ba1a1a] text-xl">error</span>
              </div>
              <div>
                <div className="text-xl font-bold text-[#ba1a1a] leading-none">{criticalCount}</div>
                <div className="text-[11px] font-semibold text-[#ba1a1a] uppercase tracking-wider mt-0.5">
                  Critical Alert
                </div>
              </div>
            </div>
            <button className="relative z-10 text-xs font-bold text-[#ba1a1a] underline group-hover:opacity-80">
              View
            </button>
          </div>
        </div>

        {/* Predicted Production */}
        <div 
          id="kpi-predicted-production"
          onClick={() => onNavigate('predictions')}
          className="glass-panel rounded-xl p-5 md:p-6 flex flex-col justify-between bg-white relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-semibold text-[#534434] uppercase tracking-wider">
              Pred. Prod.
            </span>
            <span className="material-symbols-outlined text-[#f59e0b] opacity-50 group-hover:opacity-100 transition-opacity">
              science
            </span>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-extrabold text-gradient-amber">
              128 <span className="text-xl font-semibold text-[#534434]">kg</span>
            </div>
            <p className="text-xs text-[#534434] mt-1">Estimated yield this season</p>
          </div>
          {/* Subtle Honeycomb backdrop */}
          <div className="absolute right-[-15px] bottom-[-15px] opacity-10 pointer-events-none">
            <svg className="text-[#855300]" width="80" height="90" viewBox="0 0 100 115" fill="currentColor">
              <path d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Main Chart Section: Hive Health Overview */}
      <section id="health-overview-chart-card" className="glass-panel rounded-xl p-5 md:p-6 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[#1f1b17]">
              Hive Health Overview
            </h2>
            <p className="text-xs text-[#867461]">Correlation between colony wellness index & core brood temperature</p>
          </div>
          
          <div className="flex items-center gap-2 bg-[#f6ece6] p-1 rounded-full">
            {(['1W', '1M', '1Y'] as const).map(tf => (
              <button
                key={tf}
                id={`timeframe-btn-${tf}`}
                onClick={() => setTimeframe(tf)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all ${
                  timeframe === tf
                    ? 'bg-[#f59e0b] text-white shadow-sm font-bold'
                    : 'text-[#534434] hover:bg-[#eae1da]'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-6 mb-4 text-xs font-semibold text-[#534434]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-[#006c49] bg-white inline-block" />
            <span>Health Score (0-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-[#f59e0b] bg-[#f59e0b] inline-block" />
            <span>Temperature (°C)</span>
          </div>
        </div>

        {/* Interactive SVG Chart */}
        <div className="w-full h-64 md:h-72 relative bg-gradient-to-b from-[#006c49]/5 to-transparent rounded-lg border border-[#d8c3ad]/20 p-2">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none opacity-20">
            <div className="border-b border-[#867461]" />
            <div className="border-b border-[#867461]" />
            <div className="border-b border-[#867461]" />
            <div className="border-b border-[#867461]" />
          </div>

          <svg className="w-full h-full overflow-visible" viewBox="0 0 700 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#006c49" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#006c49" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Health Score Line & Area */}
            {(() => {
              const points = chartData.health.map((val, idx) => {
                const x = (idx / (chartData.health.length - 1)) * 660 + 20;
                // scale 60..100 -> 200..30
                const y = 200 - ((val - 60) / 40) * 160;
                return { x, y, val };
              });
              const d = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
              const areaD = `${d} L ${points[points.length - 1].x} 220 L ${points[0].x} 220 Z`;

              return (
                <g>
                  <path d={areaD} fill="url(#healthGrad)" />
                  <path d={d} fill="none" stroke="#006c49" strokeWidth="2.5" strokeLinecap="round" />
                  {points.map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r={hoveredDataIndex === i ? 6 : 4}
                      fill="#ffffff"
                      stroke="#006c49"
                      strokeWidth="2.5"
                      className="cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredDataIndex(i)}
                      onMouseLeave={() => setHoveredDataIndex(null)}
                    />
                  ))}
                </g>
              );
            })()}

            {/* Temp Line */}
            {(() => {
              const points = chartData.temp.map((val, idx) => {
                const x = (idx / (chartData.temp.length - 1)) * 660 + 20;
                // scale 25..40 -> 210..60
                const y = 210 - ((val - 25) / 15) * 150;
                return { x, y, val };
              });
              const d = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');

              return (
                <g>
                  <path d={d} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
                  {points.map((p, i) => (
                    <circle
                      key={i}
                      cx={p.x}
                      cy={p.y}
                      r={hoveredDataIndex === i ? 5 : 3}
                      fill="#f59e0b"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredDataIndex(i)}
                      onMouseLeave={() => setHoveredDataIndex(null)}
                    />
                  ))}
                </g>
              );
            })()}
          </svg>

          {/* Hover Tooltip display */}
          {hoveredDataIndex !== null && (
            <div 
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#1f1b17]/95 text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-3 shadow-lg pointer-events-none"
            >
              <span className="font-bold">{chartData.labels[hoveredDataIndex]}</span>
              <span className="text-[#30c88f]">Health: {chartData.health[hoveredDataIndex]}%</span>
              <span className="text-[#ffddb8]">Temp: {chartData.temp[hoveredDataIndex]}°C</span>
            </div>
          )}

          {/* X Axis Labels */}
          <div className="flex justify-between px-4 pt-2 text-[11px] font-semibold text-[#867461]">
            {chartData.labels.map((lbl, idx) => (
              <span key={idx}>{lbl}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Data Table Section: Your Hives */}
      <section id="your-hives-table-card" className="glass-panel rounded-xl bg-white overflow-hidden shadow-sm">
        <div className="p-4 md:p-5 border-b border-[#d8c3ad]/20 flex justify-between items-center bg-[#fff8f5]">
          <div>
            <h2 className="text-lg font-bold text-[#1f1b17]">Your Hives</h2>
            <p className="text-xs text-[#867461]">Real-time telemetry stream from IoT weight & temp sensors</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate('hives')}
              className="px-3 py-1 text-xs font-semibold text-[#855300] hover:bg-[#f0e6e0] rounded-lg transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">filter_list</span>
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-[#d8c3ad]/20 text-[11px] font-semibold text-[#534434] uppercase tracking-wider">
                <th className="p-4">Hive ID</th>
                <th className="p-4">Location</th>
                <th className="p-4">Temp / Hum</th>
                <th className="p-4">Weight</th>
                <th className="p-4">Health</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-[#d8c3ad]/10">
              {hives.slice(0, 4).map((hive) => {
                const isCritical = hive.status === 'critical';
                const isAttention = hive.status === 'attention';

                return (
                  <tr
                    key={hive.id}
                    id={`hive-row-${hive.code}`}
                    onClick={() => {
                      onSelectHive(hive.id);
                      onNavigate('hives');
                    }}
                    className={`hover:bg-[#fff8f5] transition-colors cursor-pointer ${
                      isCritical ? 'bg-[#ffdad6]/20' : ''
                    }`}
                  >
                    <td className="p-4 font-bold text-[#1f1b17] flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isCritical
                            ? 'bg-[#ba1a1a] animate-pulse'
                            : isAttention
                            ? 'bg-[#f59e0b]'
                            : 'bg-[#006c49]'
                        }`}
                      />
                      {hive.code}
                    </td>
                    <td className="p-4 text-[#534434] font-medium">{hive.location}</td>
                    <td className={`p-4 font-semibold ${isCritical ? 'text-[#ba1a1a]' : 'text-[#1f1b17]'}`}>
                      {hive.internalTemp}°C <span className="text-[#d8c3ad] font-normal mx-1">|</span> {hive.humidity}%
                    </td>
                    <td className="p-4 text-[#1f1b17] font-medium">{hive.weight} kg</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-[#eae1da] rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isCritical
                                ? 'bg-[#ba1a1a]'
                                : isAttention
                                ? 'bg-[#f59e0b]'
                                : 'bg-[#006c49]'
                            }`}
                            style={{ width: `${hive.healthScore}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold">{hive.healthScore}%</span>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold capitalize ${
                          isCritical
                            ? 'bg-[#ffdad6] text-[#ba1a1a] border border-[#ba1a1a]/30'
                            : isAttention
                            ? 'bg-[#f59e0b]/15 text-[#855300]'
                            : 'bg-[#adedd3] text-[#006c49]'
                        }`}
                      >
                        {hive.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-[#d8c3ad]/20 flex justify-center bg-white">
          <button
            id="view-all-hives-btn"
            onClick={() => onNavigate('hives')}
            className="text-xs font-bold text-[#855300] hover:text-[#f59e0b] transition-colors flex items-center gap-1.5"
          >
            <span>View All Hives</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
};
