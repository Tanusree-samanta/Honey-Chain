import React, { useState } from 'react';
import { TabType, UserAccount, HiveTelemetry } from '../types';

interface TopBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  user: UserAccount;
  hives: HiveTelemetry[];
  onOpenAuth: () => void;
  onSelectHive: (hiveId: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
  user,
  hives,
  onOpenAuth,
  onSelectHive,
}) => {
  const [showAlertsMenu, setShowAlertsMenu] = useState(false);
  const criticalHives = hives.filter(h => h.status === 'critical' || h.status === 'attention');

  return (
    <header 
      id="app-top-header"
      className="bg-[#fff8f5]/85 backdrop-blur-xl sticky top-0 z-30 border-b border-[#d8c3ad]/20 shadow-sm"
    >
      <div className="flex justify-between items-center px-4 md:px-8 py-3 w-full max-w-7xl mx-auto">
        {/* Left: Mobile Brand or Current View Breadcrumb */}
        <div className="flex items-center gap-3">
          <button 
            id="topbar-logo-btn"
            onClick={() => onSelectTab('platform')}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[#855300] text-2xl font-bold transition-transform group-hover:scale-110">
              hive
            </span>
            <span className="font-extrabold text-lg text-[#855300] tracking-tight">
              Honey Chain
            </span>
          </button>
          
          <span className="hidden sm:inline-block text-[#d8c3ad]">/</span>
          
          {/* Quick Context Pill */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f0e6e0] text-[#534434] capitalize">
              {currentTab.replace('_', ' ')}
            </span>
            <span className="text-xs text-[#867461] hidden lg:inline">
              IoT Sensor Grid Active
            </span>
          </div>
        </div>

        {/* Right: Actions, Alerts Notification, Profile */}
        <div className="flex items-center gap-2 sm:gap-4 relative">
          {/* Consumer Verification Direct Link */}
          <button
            id="topbar-consumer-verify-btn"
            onClick={() => onSelectTab('consumer_verify')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#fff8f5] hover:bg-[#f6ece6] border border-[#d8c3ad] text-[#855300] transition-colors shadow-sm"
            title="Preview customer bottle verification page"
          >
            <span className="material-symbols-outlined text-sm">verified</span>
            <span>Consumer Portal</span>
          </button>

          {/* Alerts Notification Button */}
          <div className="relative">
            <button
              id="topbar-alerts-bell"
              onClick={() => setShowAlertsMenu(!showAlertsMenu)}
              className="w-9 h-9 rounded-full bg-[#f6ece6] hover:bg-[#eae1da] text-[#534434] flex items-center justify-center transition-colors relative"
              title="Hive telemetry alerts"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              {criticalHives.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full border-2 border-white animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown */}
            {showAlertsMenu && (
              <div 
                id="alerts-dropdown-menu"
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#d8c3ad]/50 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#eae1da]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#1f1b17]">Telemetry Alerts</span>
                    <span className="px-2 py-0.2 text-[10px] font-bold rounded-full bg-[#ffdad6] text-[#ba1a1a]">
                      {criticalHives.length} Active
                    </span>
                  </div>
                  <button 
                    onClick={() => {
                      setShowAlertsMenu(false);
                      onSelectTab('alerts');
                    }}
                    className="text-xs text-[#855300] font-semibold hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto mt-2 divide-y divide-[#eae1da]">
                  {criticalHives.map(h => (
                    <div 
                      key={h.id}
                      onClick={() => {
                        onSelectHive(h.id);
                        onSelectTab('hives');
                        setShowAlertsMenu(false);
                      }}
                      className="py-2.5 hover:bg-[#fff8f5] px-2 rounded-lg cursor-pointer transition-colors flex items-start gap-2.5"
                    >
                      <span className={`material-symbols-outlined text-lg mt-0.5 ${
                        h.status === 'critical' ? 'text-[#ba1a1a]' : 'text-[#f59e0b]'
                      }`}>
                        {h.status === 'critical' ? 'error' : 'warning'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1f1b17]">{h.code}</span>
                          <span className="text-[10px] text-[#867461]">{h.internalTemp}°C | {h.humidity}%</span>
                        </div>
                        <p className="text-[11px] text-[#534434] line-clamp-1 mt-0.5">
                          {h.notes || 'Sensor threshold exceeded.'}
                        </p>
                      </div>
                    </div>
                  ))}
                  {criticalHives.length === 0 && (
                    <div className="py-6 text-center text-xs text-[#867461]">
                      All apiary telemetry is within optimal parameters.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar / Auth trigger */}
          <button
            id="topbar-user-avatar"
            onClick={onOpenAuth}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-[#f6ece6] transition-colors"
            title="Account Profile & Registration"
          >
            <div className="w-8 h-8 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-xs shadow-sm overflow-hidden border border-[#d8c3ad]">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWvES0QyLIJPNM25y4fydqix_ZxyxsNQuNzzTxTDxhkkUdp7EmKFqRcArfijfcNHetZ_SwYSgkvWPg3Hf3iZ0dwdVMTrvglEPZe-FJqmOn1f2pRjl4M4FaKbzuGMzImovlgUW4soYysAtmFxZZoSk42K4YVfzOf8BITrYAZrWOpsljHldgg7RUV9oZ7NsJczX1rc9HPBZ07wCJJL3yHOQOJbqlk0paXokYddobuQps7P6JofZkRrKfgw" 
                alt="User Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="hidden md:inline text-xs font-bold text-[#1f1b17]">
              US
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
