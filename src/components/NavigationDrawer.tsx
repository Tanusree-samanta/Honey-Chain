import React from 'react';
import { TabType, UserAccount } from '../types';

interface NavigationDrawerProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  user: UserAccount;
  criticalAlertCount: number;
  onOpenAuth: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  currentTab,
  onSelectTab,
  user,
  criticalAlertCount,
  onOpenAuth,
}) => {
  const navItems: { id: TabType; label: string; icon: string; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 'hives', label: 'My Hives', icon: 'hive' },
    { id: 'insights', label: 'AI Insights', icon: 'insights' },
    { id: 'predictions', label: 'Predictions', icon: 'query_stats' },
    { id: 'alerts', label: 'Alerts', icon: 'notification_important', badge: criticalAlertCount },
    { id: 'batches', label: 'Honey Batches', icon: 'layers' },
    { id: 'trace', label: 'Traceability', icon: 'account_tree' },
    { id: 'qr_generator', label: 'QR Generator', icon: 'qr_code_2' },
    { id: 'network', label: 'Network Map', icon: 'map' },
    { id: 'platform', label: 'Platform Home', icon: 'home' },
  ];

  return (
    <aside 
      id="desktop-sidebar-nav"
      className="hidden md:flex flex-col fixed left-0 top-0 h-full w-[280px] bg-[#2b6954] text-white shadow-xl z-40 p-6 select-none"
    >
      {/* Brand Header */}
      <div 
        id="brand-header-button"
        onClick={() => onSelectTab('platform')}
        className="flex items-center gap-3 mb-8 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-full bg-[#adedd3] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105">
          <span className="material-symbols-outlined text-[#306d58] text-2xl font-bold">hive</span>
        </div>
        <div className="flex flex-col">
          <div className="font-extrabold text-xl text-[#f59e0b] tracking-tight flex items-center gap-1">
            Honey Chain
          </div>
          <div className="text-xs text-white/80 font-medium">Industrial Traceability</div>
          <div className="text-[11px] text-white/60 tracking-wider">V1.0.4</div>
        </div>
      </div>

      {/* Main Nav Links */}
      <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all text-left group ${
                isActive
                  ? 'bg-[#95d3ba]/20 text-[#b0f0d6] font-bold shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span 
                  className={`material-symbols-outlined text-[22px] transition-transform group-hover:scale-110 ${
                    isActive ? 'icon-filled text-[#b0f0d6]' : 'text-white/80'
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && item.badge > 0 ? (
                <span className="px-2 py-0.5 text-xs font-bold bg-[#ba1a1a] text-white rounded-full animate-pulse shadow-sm">
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Footer Profile & Settings */}
      <div className="mt-auto pt-4 border-t border-white/10 flex flex-col gap-2">
        <button
          id="nav-link-settings"
          onClick={() => onSelectTab('settings')}
          className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm transition-colors text-left ${
            currentTab === 'settings'
              ? 'bg-[#95d3ba]/20 text-[#b0f0d6] font-bold'
              : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-[22px]">settings</span>
          <span>Settings</span>
        </button>

        {/* User Card */}
        <div 
          id="user-account-widget"
          onClick={onOpenAuth}
          className="flex items-center gap-3 px-3 py-2 rounded-xl bg-black/15 hover:bg-black/25 cursor-pointer transition-colors border border-white/10 mt-1"
        >
          <img
            src={user.avatarUrl}
            alt={user.fullName}
            className="w-9 h-9 rounded-full object-cover border border-[#adedd3]/50 shrink-0"
          />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs font-semibold text-white truncate">{user.fullName}</span>
            <span className="text-[11px] text-[#adedd3] capitalize truncate">{user.role}</span>
          </div>
          <span className="material-symbols-outlined text-white/50 text-sm">unfold_more</span>
        </div>
      </div>
    </aside>
  );
};
