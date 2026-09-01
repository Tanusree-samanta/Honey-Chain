import React, { useState } from 'react';
import { UserAccount } from '../../types';

interface SettingsScreenProps {
  user: UserAccount;
  onOpenAuth: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ user, onOpenAuth }) => {
  const [pingInterval, setPingInterval] = useState('2 mins');
  const [networkType, setNetworkType] = useState('Polygon PoS (Low Carbon)');
  const [tempAlertThreshold, setTempAlertThreshold] = useState('37.5');
  const [humidityAlertThreshold, setHumidityAlertThreshold] = useState('80');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-200 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1f1b17] tracking-tight">
            System & Apiary Settings
          </h1>
          <p className="text-xs md:text-sm text-[#534434] mt-1">
            Configure IoT telemetry sampling, threshold alarms, and blockchain node sync.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-2.5 px-4 bg-[#adedd3] text-[#006c49] font-bold text-xs rounded-xl shadow-sm animate-in fade-in">
            Settings Saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Account Info Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#f0e6e0]">
            <h2 className="text-sm font-bold text-[#1f1b17] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#855300]">account_circle</span>
              <span>Account Custodian</span>
            </h2>
            <button
              type="button"
              onClick={onOpenAuth}
              className="text-xs font-bold text-[#855300] hover:underline"
            >
              Switch Account
            </button>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={user.avatarUrl}
              alt={user.fullName}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#855300]/30"
            />
            <div>
              <div className="text-base font-extrabold text-[#1f1b17]">{user.fullName}</div>
              <div className="text-xs text-[#534434]">{user.email}</div>
              <div className="text-xs font-semibold text-[#006c49] mt-0.5 capitalize">{user.role} • {user.apiaryCluster}</div>
            </div>
          </div>
        </div>

        {/* IoT Edge Sampling Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#d8c3ad]/30 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-[#1f1b17] pb-2 border-b border-[#f0e6e0] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2b6954]">sensors</span>
            <span>IoT Sensor Telemetry Grid</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#534434] mb-1">Telemetry Ping Interval</label>
              <select
                value={pingInterval}
                onChange={(e) => setPingInterval(e.target.value)}
                className="w-full font-semibold p-2.5 rounded-xl border border-[#d8c3ad] bg-[#fff8f5]"
              >
                <option value="1 min">Every 1 Minute (High Precision)</option>
                <option value="2 mins">Every 2 Minutes (Recommended)</option>
                <option value="5 mins">Every 5 Minutes (Battery Saver)</option>
                <option value="15 mins">Every 15 Minutes</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#534434] mb-1">Blockchain Ledger Anchor</label>
              <select
                value={networkType}
                onChange={(e) => setNetworkType(e.target.value)}
                className="w-full font-semibold p-2.5 rounded-xl border border-[#d8c3ad] bg-[#fff8f5]"
              >
                <option value="Polygon PoS (Low Carbon)">Polygon PoS (Low Carbon)</option>
                <option value="Hyperledger Besu Enterprise">Hyperledger Besu Enterprise</option>
                <option value="Ethereum Sepolia Testnet">Ethereum Sepolia Testnet</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#534434] mb-1">Critical Temp Trigger (°C)</label>
              <input
                type="number"
                step="0.5"
                value={tempAlertThreshold}
                onChange={(e) => setTempAlertThreshold(e.target.value)}
                className="w-full font-semibold p-2.5 rounded-xl border border-[#d8c3ad] bg-[#fff8f5]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#534434] mb-1">Critical Humidity Trigger (%)</label>
              <input
                type="number"
                value={humidityAlertThreshold}
                onChange={(e) => setHumidityAlertThreshold(e.target.value)}
                className="w-full font-semibold p-2.5 rounded-xl border border-[#d8c3ad] bg-[#fff8f5]"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="bg-[#855300] hover:bg-[#653e00] text-white text-xs font-extrabold py-3 px-6 rounded-xl shadow-md transition-all cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
