import React, { useState } from 'react';
import { UserAccount, TabType } from '../../types';

interface AuthScreenProps {
  currentUser: UserAccount;
  onUpdateUser: (user: UserAccount) => void;
  onClose: () => void;
  onNavigate: (tab: TabType) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  currentUser,
  onUpdateUser,
  onClose,
  onNavigate,
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [role, setRole] = useState<'beekeeper' | 'auditor' | 'consumer' | 'admin'>(currentUser.role);
  const [apiaryCluster, setApiaryCluster] = useState(currentUser.apiaryCluster);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserAccount = {
      ...currentUser,
      fullName,
      email,
      role,
      apiaryCluster,
    };
    onUpdateUser(updated);
    setSuccessMsg(isRegisterMode ? 'Account created successfully!' : 'Signed in successfully!');
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
      onNavigate('dashboard');
    }, 1000);
  };

  const handleQuickDemoLogin = (roleType: 'beekeeper' | 'auditor') => {
    if (roleType === 'beekeeper') {
      onUpdateUser({
        id: 'usr_demo_1',
        fullName: 'US Beekeeper',
        email: 'beekeeper@honeychain.io',
        role: 'beekeeper',
        apiaryCluster: 'Sundarban Apiary Cluster A',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWvES0QyLIJPNM25y4fydqix_ZxyxsNQuNzzTxTDxhkkUdp7EmKFqRcArfijfcNHetZ_SwYSgkvWPg3Hf3iZ0dwdVMTrvglEPZe-FJqmOn1f2pRjl4M4FaKbzuGMzImovlgUW4soYysAtmFxZZoSk42K4YVfzOf8BITrYAZrWOpsljHldgg7RUV9oZ7NsJczX1rc9HPBZ07wCJJL3yHOQOJbqlk0paXokYddobuQps7P6JofZkRrKfgw',
        registeredHivesCount: 12,
        totalBatchesTraced: 8,
      });
    } else {
      onUpdateUser({
        id: 'usr_demo_2',
        fullName: 'Quality Auditor Maya Sen',
        email: 'auditor@agri-cert.org',
        role: 'auditor',
        apiaryCluster: 'Regional Certification Authority',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        registeredHivesCount: 48,
        totalBatchesTraced: 42,
      });
    }
    setSuccessMsg('Demo credentials activated!');
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
      onNavigate('dashboard');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#d8c3ad] relative animate-in zoom-in-95 duration-150">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#867461] hover:text-[#1f1b17] p-1 rounded-lg transition-colors font-bold text-lg"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#adedd3] flex items-center justify-center mb-3 shadow-inner">
            <span className="material-symbols-outlined text-[#306d58] text-2xl font-bold">
              hive
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#1f1b17] tracking-tight">Honey Chain</h2>
          <p className="text-xs text-[#534434] mt-1">
            {isRegisterMode ? 'Register as an official apiary custodian' : 'Log in to manage your IoT hives & batches'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-[#f6ece6] rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setIsRegisterMode(false)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              !isRegisterMode
                ? 'bg-white text-[#855300] shadow-sm'
                : 'text-[#534434] hover:text-[#1f1b17]'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setIsRegisterMode(true)}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              isRegisterMode
                ? 'bg-white text-[#855300] shadow-sm'
                : 'text-[#534434] hover:text-[#1f1b17]'
            }`}
          >
            Register
          </button>
        </div>

        {/* Success message banner */}
        {successMsg && (
          <div className="mb-4 p-3 bg-[#adedd3] text-[#006c49] text-xs font-bold rounded-xl flex items-center gap-2 animate-in fade-in duration-150">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && (
            <div>
              <label className="block text-xs font-bold text-[#534434] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Elena Rostova"
                className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-[#d8c3ad] bg-[#fff8f5] focus:bg-white focus:ring-2 focus:ring-[#855300] outline-none transition-all"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#534434] mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="beekeeper@apiary.org"
              className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-[#d8c3ad] bg-[#fff8f5] focus:bg-white focus:ring-2 focus:ring-[#855300] outline-none transition-all"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#534434]">Password</label>
              {!isRegisterMode && (
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to ' + email); }} className="text-[11px] font-semibold text-[#855300] hover:underline">
                  Forgot Password?
                </a>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-[#d8c3ad] bg-[#fff8f5] focus:bg-white focus:ring-2 focus:ring-[#855300] outline-none transition-all"
            />
          </div>

          {isRegisterMode && (
            <>
              <div>
                <label className="block text-xs font-bold text-[#534434] mb-1">Account Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-[#d8c3ad] bg-[#fff8f5] focus:ring-2 focus:ring-[#855300] outline-none cursor-pointer"
                >
                  <option value="beekeeper">Beekeeper / Apiary Custodian</option>
                  <option value="auditor">Lab Quality Auditor</option>
                  <option value="consumer">Consumer / Retail Partner</option>
                  <option value="admin">System Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#534434] mb-1">Apiary Cluster Location</label>
                <input
                  type="text"
                  value={apiaryCluster}
                  onChange={(e) => setApiaryCluster(e.target.value)}
                  placeholder="e.g. Sundarban Bio-Cluster A"
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-[#d8c3ad] bg-[#fff8f5] focus:ring-2 focus:ring-[#855300] outline-none"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-[#855300] hover:bg-[#653e00] text-white text-xs font-extrabold py-3 px-4 rounded-xl shadow-[0_2px_0_0_#613b00] active:translate-y-[2px] active:shadow-none transition-all cursor-pointer mt-2"
          >
            {isRegisterMode ? 'Create Account' : 'Log In to Hive Grid'}
          </button>
        </form>

        {/* Demo Fast Login Buttons */}
        <div className="mt-6 pt-5 border-t border-[#f0e6e0] space-y-2">
          <span className="block text-center text-[10px] font-bold text-[#867461] uppercase tracking-wider">
            Or Quick Connect with Demo Profile
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('beekeeper')}
              className="px-3 py-2 bg-[#fff8f5] hover:bg-[#f6ece6] border border-[#d8c3ad] rounded-xl text-xs font-bold text-[#855300] transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">hive</span>
              <span>US Beekeeper</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('auditor')}
              className="px-3 py-2 bg-[#fff8f5] hover:bg-[#f6ece6] border border-[#d8c3ad] rounded-xl text-xs font-bold text-[#2b6954] transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>Auditor Maya</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
