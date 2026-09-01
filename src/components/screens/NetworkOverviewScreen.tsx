import React, { useState } from 'react';
import { HoneyBatch, TabType } from '../../types';

interface NetworkOverviewScreenProps {
  batches: HoneyBatch[];
  onSelectBatch: (id: string) => void;
  onNavigate: (tab: TabType) => void;
}

export const NetworkOverviewScreen: React.FC<NetworkOverviewScreenProps> = ({
  batches,
  onSelectBatch,
  onNavigate,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'west_bengal' | 'odisha' | 'bihar'>('west_bengal');
  const [selectedClusterInfo, setSelectedClusterInfo] = useState<string | null>(null);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1f1b17] tracking-tight">
            Honey Chain Network Overview
          </h1>
          <p className="text-xs md:text-sm text-[#534434] mt-1">
            Real-time macro analytics across all registered apiaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#adedd3] text-[#006c49] rounded-full text-xs font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse" />
            <span>42 Nodes Synchronized</span>
          </span>
        </div>
      </header>

      {/* Macro KPIs Bento Grid */}
      <section id="network-kpi-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {/* KPI 1: Beekeepers */}
        <div className="glass-card rounded-xl p-4 md:p-5 flex flex-col justify-between bg-white hover:-translate-y-0.5 transition-all shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] font-bold text-[#867461] uppercase tracking-wider">Beekeepers</span>
            <span className="material-symbols-outlined text-[#2b6954] bg-[#adedd3]/40 p-1.5 rounded-lg text-lg">
              groups
            </span>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-[#1f1b17]">1,250</div>
            <div className="flex items-center text-[#006c49] text-xs font-semibold mt-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="ml-1">+4.2% this month</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Connected Hives */}
        <div className="glass-card rounded-xl p-4 md:p-5 flex flex-col justify-between bg-white hover:-translate-y-0.5 transition-all shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] font-bold text-[#867461] uppercase tracking-wider">Connected Hives</span>
            <span className="material-symbols-outlined text-[#855300] bg-[#f59e0b]/20 p-1.5 rounded-lg text-lg">
              hive
            </span>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-[#1f1b17]">18.4k</div>
            <div className="flex items-center text-[#006c49] text-xs font-semibold mt-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span className="ml-1">+1.8% this month</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Registered Batches */}
        <div className="glass-card rounded-xl p-4 md:p-5 flex flex-col justify-between bg-white hover:-translate-y-0.5 transition-all shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] font-bold text-[#867461] uppercase tracking-wider">Registered Batches</span>
            <span className="material-symbols-outlined text-[#006c49] bg-[#30c88f]/20 p-1.5 rounded-lg text-lg">
              inventory_2
            </span>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-[#1f1b17]">6,820</div>
            <div className="flex items-center text-[#534434] text-xs font-semibold mt-1">
              <span className="material-symbols-outlined text-sm">trending_flat</span>
              <span className="ml-1">Steady flow</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Active Alerts */}
        <div className="glass-card rounded-xl p-4 md:p-5 flex flex-col justify-between bg-[#ffdad6]/30 border-l-4 border-l-[#ba1a1a] hover:-translate-y-0.5 transition-all shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[11px] font-bold text-[#ba1a1a] uppercase tracking-wider">Active Alerts</span>
            <span className="material-symbols-outlined text-[#ba1a1a] bg-[#ba1a1a]/15 p-1.5 rounded-lg text-lg">
              warning
            </span>
          </div>
          <div>
            <div className="text-2xl md:text-4xl font-extrabold text-[#1f1b17]">240</div>
            <div className="flex items-center text-[#ba1a1a] text-xs font-bold mt-1">
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
              <span className="ml-1">+12% vs last week</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Area: Map & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Apiary Cluster Map (Spans 8 cols) */}
        <div className="lg:col-span-8 glass-card rounded-2xl p-5 md:p-6 bg-white shadow-sm flex flex-col min-h-[420px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
            <div>
              <h3 className="text-base font-bold text-[#1f1b17]">Apiary Cluster Map</h3>
              <p className="text-xs text-[#867461]">Geospatial distribution across Eastern India bio-corridors</p>
            </div>
            
            <div className="flex items-center gap-1.5 bg-[#f6ece6] p-1 rounded-full text-xs font-bold">
              {[
                { id: 'west_bengal', label: 'West Bengal' },
                { id: 'odisha', label: 'Odisha' },
                { id: 'bihar', label: 'Bihar' },
              ].map(reg => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id as any)}
                  className={`px-3 py-1 rounded-full transition-all ${
                    selectedRegion === reg.id
                      ? 'bg-[#855300] text-white shadow-sm'
                      : 'text-[#534434] hover:bg-[#eae1da]'
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Map Visual Container */}
          <div className="flex-1 bg-[#fcf2eb] rounded-xl relative overflow-hidden border border-[#d8c3ad]/40 min-h-[300px]">
            {/* Map Image Backdrop */}
            <div
              className="absolute inset-0 bg-cover bg-center w-full h-full opacity-85 transition-transform duration-700"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDg-HnV63IYLqEE6g-dc_8PlfRLh5N3I0ZQ6pdhlLbioi52Dhvq6GivLqk8GUqzIZZA2AfBxbmXKhX-FcHwAg8NbfJwswiufp_iij8hIJdY3eFGjQXwwz8EX04Y0qi3tKYR13ktlwc4N3fZejxRY5xVwZITpxBGN3_oYdxPkog0OSZpG1LRQTRxy6AHgeothrsIq6Qy2Rg3_nh2rzQs75oYYv73gDRzD3P7ZbyJNFsxD2iur7Q885xMJA')`,
              }}
            />

            {/* Interactive Cluster Overlays */}
            {/* Pin 1: Kolkata / Sundarbans */}
            <div
              onClick={() => setSelectedClusterInfo('Sundarbans / Kolkata Cluster: 8,400 Hives, 92% Health Index. Nectar flow: Mangrove & Mustard.')}
              className="absolute top-[38%] left-[45%] flex flex-col items-center cursor-pointer group z-10"
            >
              <div className="w-5 h-5 bg-[#855300] rounded-full shadow-[0_0_15px_rgba(133,83,0,0.8)] border-2 border-white animate-pulse" />
              <span className="bg-white/95 backdrop-blur-sm text-[#1f1b17] text-[11px] font-bold px-2 py-0.5 rounded-full mt-1 shadow-md border border-[#d8c3ad]/50 whitespace-nowrap">
                Kolkata Cluster (8.4k)
              </span>
            </div>

            {/* Pin 2: Odisha Highland */}
            <div
              onClick={() => setSelectedClusterInfo('Odisha Highland Cluster: 4,200 Hives, 88% Health Index. Nectar flow: Wild Forest Flora.')}
              className="absolute top-[62%] left-[32%] flex flex-col items-center cursor-pointer group z-10"
            >
              <div className="w-4 h-4 bg-[#2b6954] rounded-full shadow-[0_0_12px_rgba(43,105,84,0.8)] border-2 border-white" />
              <span className="bg-white/95 backdrop-blur-sm text-[#1f1b17] text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 shadow-md border border-[#d8c3ad]/50 whitespace-nowrap">
                Odisha Cluster
              </span>
            </div>

            {/* Pin 3: Bihar Alert Zone */}
            <div
              onClick={() => setSelectedClusterInfo('Bihar Alert Zone: 3,200 Hives. High heat/humidity anomaly active across 240 hives.')}
              className="absolute top-[22%] left-[25%] flex flex-col items-center cursor-pointer group z-10"
            >
              <div className="w-5 h-5 bg-[#ba1a1a] rounded-full shadow-[0_0_20px_rgba(186,26,26,0.9)] border-2 border-white animate-bounce" />
              <span className="bg-white/95 backdrop-blur-sm text-[#ba1a1a] text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 shadow-md border border-[#ba1a1a]/30 whitespace-nowrap">
                Bihar Alert Zone ⚠️
              </span>
            </div>

            {/* Dynamic Map Info Tooltip */}
            {selectedClusterInfo && (
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-[#d8c3ad] text-xs flex justify-between items-center z-20">
                <span className="text-[#1f1b17] font-semibold">{selectedClusterInfo}</span>
                <button
                  onClick={() => setSelectedClusterInfo(null)}
                  className="text-xs font-bold text-[#867461] hover:text-[#1f1b17] ml-2"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Side Column: Health Distribution & Monthly Volume (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Hive Health Distribution */}
          <div className="glass-card rounded-2xl p-5 bg-white shadow-sm border border-[#d8c3ad]/20">
            <h3 className="text-sm font-bold text-[#1f1b17] mb-4">Hive Health Distribution</h3>
            <div className="space-y-3.5 text-xs">
              {/* Healthy */}
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="flex items-center text-[#1f1b17]">
                    <span className="w-2 h-2 rounded-full bg-[#006c49] mr-2" />
                    Healthy
                  </span>
                  <span className="font-bold text-[#006c49]">65%</span>
                </div>
                <div className="w-full bg-[#f0e6e0] rounded-full h-2">
                  <div className="bg-[#006c49] h-2 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>

              {/* Attention */}
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="flex items-center text-[#1f1b17]">
                    <span className="w-2 h-2 rounded-full bg-[#f59e0b] mr-2" />
                    Attention Required
                  </span>
                  <span className="font-bold text-[#855300]">25%</span>
                </div>
                <div className="w-full bg-[#f0e6e0] rounded-full h-2">
                  <div className="bg-[#f59e0b] h-2 rounded-full" style={{ width: '25%' }} />
                </div>
              </div>

              {/* Critical */}
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="flex items-center text-[#1f1b17]">
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a] mr-2" />
                    Critical
                  </span>
                  <span className="font-bold text-[#ba1a1a]">10%</span>
                </div>
                <div className="w-full bg-[#f0e6e0] rounded-full h-2">
                  <div className="bg-[#ba1a1a] h-2 rounded-full" style={{ width: '10%' }} />
                </div>
              </div>
            </div>

            {/* AI Insight Box */}
            <div className="mt-4 p-3 bg-[#fcf2eb] rounded-xl border border-[#d8c3ad]/30 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#f59e0b] text-lg mt-0.5">lightbulb</span>
              <p className="text-[11px] text-[#534434] leading-relaxed">
                AI suggests checking humidity sensors in the Bihar region; 40% of critical hives share similar weather patterns.
              </p>
            </div>
          </div>

          {/* Monthly Production Bar Chart */}
          <div className="glass-card rounded-2xl p-5 bg-white shadow-sm border border-[#d8c3ad]/20">
            <h3 className="text-sm font-bold text-[#1f1b17] mb-3">Production Volume (kg)</h3>
            <div className="flex items-end justify-between h-28 pt-4 border-b border-[#d8c3ad]/20 pb-1">
              {[
                { month: 'Jan', val: '1.2k', height: '40%', active: false },
                { month: 'Feb', val: '1.5k', height: '55%', active: false },
                { month: 'Mar', val: '2.8k', height: '90%', active: true },
                { month: 'Apr', val: '0.8k', height: '30%', active: false },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center group w-1/5">
                  <div
                    className={`w-full rounded-t-md transition-all relative ${
                      bar.active
                        ? 'bg-[#855300] shadow-md group-hover:bg-[#653e00]'
                        : 'bg-[#eae1da] group-hover:bg-[#f59e0b]'
                    }`}
                    style={{ height: bar.height }}
                  >
                    <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-bold text-[#1f1b17] transition-opacity">
                      {bar.val}
                    </span>
                  </div>
                  <span className={`text-[11px] mt-1.5 ${bar.active ? 'font-bold text-[#855300]' : 'text-[#867461]'}`}>
                    {bar.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Latest Blockchain Traces Table */}
      <section className="glass-card rounded-2xl p-5 md:p-6 bg-white shadow-sm border border-[#d8c3ad]/20 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-base font-bold text-[#1f1b17]">Latest Blockchain Traces</h3>
            <p className="text-xs text-[#867461]">Immutable transaction proofs anchored to distributed ledger</p>
          </div>
          <button 
            onClick={() => onNavigate('trace')}
            className="text-xs font-bold text-[#855300] hover:text-[#f59e0b] uppercase tracking-wider flex items-center gap-1"
          >
            <span>View All</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#d8c3ad]/30 text-[#867461] text-[11px] font-semibold uppercase tracking-wider">
                <th className="pb-3 px-3">Batch ID</th>
                <th className="pb-3 px-3">Origin Apiary</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Timestamp</th>
                <th className="pb-3 px-3 text-right">Hash</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-[#d8c3ad]/10">
              {batches.map((batch) => (
                <tr
                  key={batch.id}
                  onClick={() => {
                    onSelectBatch(batch.id);
                    onNavigate('trace');
                  }}
                  className="hover:bg-[#fff8f5] transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3 font-bold text-[#1f1b17]">{batch.batchId}</td>
                  <td className="py-3 px-3 text-[#534434]">{batch.sourceLocation}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        batch.verified
                          ? 'bg-[#adedd3] text-[#006c49]'
                          : 'bg-[#eae1da] text-[#534434]'
                      }`}
                    >
                      {batch.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#867461]">{batch.extractedDate}</td>
                  <td className="py-3 px-3 text-right font-mono text-[11px] text-[#867461]">
                    {batch.txHash.slice(0, 8)}...{batch.txHash.slice(-6)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
