import React from 'react';
import { TabType } from '../types';

interface MobileBottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  criticalAlertCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  criticalAlertCount,
}) => {
  const tabs: { id: TabType; label: string; icon: string; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'hives', label: 'Hives', icon: 'dataset' },
    { id: 'insights', label: 'Insights', icon: 'psychology' },
    { id: 'trace', label: 'Trace', icon: 'hub' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <nav 
      id="mobile-bottom-navbar"
      className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-3 py-2.5 bg-[#fff8f5]/95 backdrop-blur-md z-50 rounded-t-2xl border-t border-[#d8c3ad]/30 shadow-[0_-4px_20px_rgba(43,105,84,0.08)]"
    >
      {tabs.map((tab) => {
        const isActive = 
          currentTab === tab.id || 
          (tab.id === 'insights' && currentTab === 'predictions') ||
          (tab.id === 'trace' && (currentTab === 'batches' || currentTab === 'qr_generator'));

        return (
          <button
            key={tab.id}
            id={`mobile-tab-${tab.id}`}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 relative ${
              isActive
                ? 'bg-[#adedd3] text-[#306d58] rounded-full px-4 py-1.5 shadow-sm scale-105'
                : 'text-[#534434] opacity-70 hover:opacity-100'
            }`}
          >
            <span 
              className={`material-symbols-outlined text-xl ${
                isActive ? 'icon-filled text-[#306d58]' : ''
              }`}
            >
              {tab.icon}
            </span>
            <span className="text-[11px] font-semibold tracking-tight mt-0.5 whitespace-nowrap">
              {tab.label}
            </span>
            {tab.id === 'hives' && criticalAlertCount > 0 && (
              <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
