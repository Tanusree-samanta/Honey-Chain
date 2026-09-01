import React, { useState } from 'react';
import { HoneyBatch, TabType } from '../../types';

interface ConsumerVerifyScreenProps {
  batch?: HoneyBatch;
  onNavigate: (tab: TabType) => void;
}

export const ConsumerVerifyScreen: React.FC<ConsumerVerifyScreenProps> = ({
  batch,
  onNavigate,
}) => {
  const [copiedTx, setCopiedTx] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const batchData = batch || {
    batchId: 'HC-2026-0001',
    sourceHiveCode: 'HIVE-001',
    sourceLocation: 'Sundarban Cluster A',
    extractedDate: '01 Sep 2026',
    txHash: '0x8f3a9b2c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1',
    steps: [
      { step: '01', title: 'Hive Registered', description: 'Blockchain ID established for source location.', timestamp: 'Aug 15, 2026', icon: 'check' },
      { step: '02', title: 'Extracted', description: 'Raw honeycomb harvested under organic protocols.', timestamp: 'Sep 01, 2026', icon: 'check' },
      { step: '03', title: 'Processed', description: 'Cold-pressed and filtered; lab tests passed.', timestamp: 'Sep 03, 2026', icon: 'check' },
      { step: '04', title: 'Packaged', description: 'Sealed in glass jars, QR labels applied.', timestamp: 'Sep 05, 2026', icon: 'check' },
      { step: '05', title: 'Distributed', description: 'Dispatched to retail partners.', timestamp: 'Sep 10, 2026', icon: 'local_shipping' },
    ]
  };

  const handleCopyTx = () => {
    navigator.clipboard.writeText(batchData.txHash);
    setCopiedTx(true);
    setTimeout(() => setCopiedTx(false), 2000);
  };

  return (
    <div className="min-h-screen py-4 px-2 sm:px-4 flex flex-col items-center justify-center animate-in fade-in duration-200">
      {/* Top Floating Return Navigation */}
      <div className="w-full max-w-md flex justify-between items-center mb-4">
        <button
          id="consumer-back-to-app-btn"
          onClick={() => onNavigate('dashboard')}
          className="text-xs font-bold text-[#855300] hover:text-[#653e00] flex items-center gap-1 bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#d8c3ad]/50 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Back to Dashboard</span>
        </button>

        <span className="text-[11px] font-bold text-[#006c49] bg-[#adedd3] px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span className="material-symbols-outlined text-xs">lock</span>
          <span>Public Ledger Certified</span>
        </span>
      </div>

      {/* Main Consumer Card Area */}
      <div className="w-full max-w-md mx-auto flex flex-col gap-4">
        {/* Brand Header */}
        <header className="flex items-center justify-center gap-2 py-2">
          <span className="material-symbols-outlined text-[#855300] text-3xl font-bold">
            hive
          </span>
          <h1 className="text-2xl font-extrabold text-[#1f1b17] tracking-tight">
            Honey Chain
          </h1>
        </header>

        {/* 1. Verification Badge Section */}
        <section className="glass-card rounded-2xl p-6 flex flex-col items-center text-center bg-white shadow-md border border-[#d8c3ad]/30">
          <div className="w-16 h-16 rounded-full bg-[#adedd3] flex items-center justify-center mb-3 shadow-inner">
            <span className="material-symbols-outlined text-[#006c49] text-3xl font-bold">
              check_circle
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-[#1f1b17] mb-1">
            Traceability Verified
          </h2>
          <p className="text-xs text-[#534434] leading-relaxed max-w-xs">
            Authentic, sustainably sourced, and cryptographically secured on the Honey Chain ledger.
          </p>
        </section>

        {/* 2. Product Info Card */}
        <section className="glass-card rounded-2xl p-5 bg-white shadow-md border border-[#d8c3ad]/30 space-y-4">
          <h3 className="text-sm font-extrabold text-[#1f1b17] border-b border-[#f0e6e0] pb-2 uppercase tracking-wider">
            Batch Information
          </h3>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-[#867461] uppercase tracking-wider block">
                Batch ID
              </span>
              <span className="font-extrabold text-[#1f1b17] text-sm">{batchData.batchId}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#867461] uppercase tracking-wider block">
                Source
              </span>
              <span className="font-extrabold text-[#1f1b17] text-sm">{batchData.sourceLocation}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#867461] uppercase tracking-wider block">
                Hive
              </span>
              <span className="font-extrabold text-[#1f1b17] text-sm">{batchData.sourceHiveCode}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#867461] uppercase tracking-wider block">
                Extracted
              </span>
              <span className="font-extrabold text-[#1f1b17] text-sm">{batchData.extractedDate}</span>
            </div>
          </div>

          {/* Authentic Honeycomb Extraction Photograph Banner */}
          <div className="rounded-xl overflow-hidden h-36 relative border border-[#d8c3ad]/30 shadow-inner">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDZ96TRX0Spgm21WOIFXCYbm1DhLcZFFmvnC9ccEyIOF2NKQ-iJumUFQqPZQteI5pWzk8KBBx_t6g8KRRPQbahtxXrWnwDCIMnF5frKTxZNoOgW32SxBYXekkhnWmEkn3lid8bM97fKs5bZsGfqr4E0y2wx4AOTTtE9VfHEIAPNyc9QApWX2NtIitr_D7OO-gDRrzISm68VTLFi0wyWDnSNm8d9KqO7XZh4-Mbp2ph7U5sUr37L5mgOBw')`,
              }}
            />
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-semibold">
              Organic Harvest Verified
            </div>
          </div>
        </section>

        {/* 3. Chain of Custody Timeline */}
        <section className="glass-card rounded-2xl p-5 bg-white shadow-md border border-[#d8c3ad]/30">
          <h3 className="text-sm font-extrabold text-[#1f1b17] mb-4 uppercase tracking-wider">
            Chain of Custody
          </h3>

          <div className="relative pl-1 space-y-6">
            {/* Timeline continuous connector */}
            <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-[#2b6954]" />

            {/* Timeline Items */}
            {batchData.steps.map((item, idx) => (
              <div key={idx} className="relative z-10 flex gap-3.5 items-start">
                <div className="w-7 h-7 rounded-full bg-[#2b6954] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 border-2 border-white">
                  <span className="material-symbols-outlined text-xs">
                    {item.icon === 'local_shipping' ? 'local_shipping' : 'check'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#1f1b17]">{item.title}</h4>
                    <span className="text-[10px] font-bold text-[#006c49]">{item.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-[#534434] mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Technical Blockchain Verification Card */}
        <section className="glass-card rounded-2xl p-5 bg-[#fcf2eb] border border-[#d8c3ad]/40 shadow-sm space-y-3">
          <h3 className="text-xs font-extrabold text-[#1f1b17] flex items-center gap-1.5 uppercase tracking-wider">
            <span className="material-symbols-outlined text-base text-[#855300]">security</span>
            <span>Blockchain Verification</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center border-b border-[#d8c3ad]/30 pb-1.5">
              <span className="text-[#534434]">Record Status</span>
              <span className="text-[#006c49] font-bold flex items-center gap-1">
                <span>Verified</span>
                <span className="material-symbols-outlined text-xs">verified</span>
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-[#d8c3ad]/30 pb-1.5">
              <span className="text-[#534434]">Transaction Hash</span>
              <button
                onClick={handleCopyTx}
                className="font-mono text-[11px] bg-[#f0e6e0] hover:bg-[#eae1da] px-2 py-0.5 rounded text-[#1f1b17] font-semibold flex items-center gap-1 transition-colors"
                title="Click to copy hash"
              >
                <span>0x8f3a...92bc</span>
                <span className="material-symbols-outlined text-[12px] text-[#855300]">
                  {copiedTx ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#534434]">Data Integrity</span>
              <span className="text-[#006c49] font-bold flex items-center gap-1">
                <span>100% Immutable</span>
                <span className="material-symbols-outlined text-xs">verified</span>
              </span>
            </div>
          </div>

          <p className="text-[10px] text-[#867461] text-center pt-2 leading-relaxed opacity-80 border-t border-[#d8c3ad]/30">
            This verification implies that all tracking events for this batch have been cryptographically signed and immutably recorded on a decentralized ledger, ensuring authenticity from hive to home.
          </p>
        </section>

        {/* Footer Logo */}
        <footer className="text-center py-4 text-xs text-[#867461] font-semibold">
          Honey Chain © 2026
        </footer>
      </div>
    </div>
  );
};
