import React, { useState } from 'react';
import { HoneyBatch } from '../../types';

interface CustomerTraceabilityProps {
  batches: HoneyBatch[];
  selectedBatchCode?: string;
  onSelectBatch?: (code: string) => void;
  onShopHoney?: () => void;
}

export const CustomerTraceability: React.FC<CustomerTraceabilityProps> = ({
  batches,
  selectedBatchCode,
  onSelectBatch,
  onShopHoney,
}) => {
  const [activeCode, setActiveCode] = useState(selectedBatchCode || batches[0]?.batchCode || 'HC-2026-0001');

  const batch = batches.find(b => b.batchCode === activeCode) || batches[0];

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] text-white p-6 sm:p-10 rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#fcd34d] text-[#1b4332] uppercase tracking-wider">
              Cryptographic Provenance
            </span>
            <span className="text-xs text-[#95d3ba] font-semibold">Honey Chain Verification Ledger</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-2">
            Where Your Honey Came From
          </h1>
          <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl">
            Explore the complete, tamper-proof journey of your honey jar — from the specific smart hive in West Bengal to the cold extraction and tamper-evident packaging.
          </p>
        </div>

        {onShopHoney && (
          <button
            onClick={onShopHoney}
            className="px-5 py-3 bg-[#f59e0b] hover:bg-[#d97706] text-[#1f1b17] text-xs font-black rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-base">storefront</span>
            <span>Buy This Honey</span>
          </button>
        )}
      </div>

      {/* Batch Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {batches.map(b => (
          <button
            key={b.id}
            onClick={() => {
              setActiveCode(b.batchCode);
              if (onSelectBatch) onSelectBatch(b.batchCode);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              b.batchCode === activeCode
                ? 'bg-[#1b4332] text-white shadow-md'
                : 'bg-white text-[#534434] border border-[#d8c3ad]/40 hover:bg-[#f6ece6]'
            }`}
          >
            <span className="material-symbols-outlined text-sm">inventory_2</span>
            <span>{b.batchCode}</span>
            <span className="text-[10px] opacity-75">({b.honeyType.split(' ')[0]})</span>
          </button>
        ))}
      </div>

      {/* Verification Shield Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#d8c3ad]/30 shadow-sm space-y-6">
        <div className="bg-[#f7fcf9] border border-[#006c49]/20 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl text-[#006c49]">verified</span>
              <span className="text-xl font-black text-[#004e34]">TRACEABILITY VERIFIED</span>
            </div>
            <p className="text-xs text-[#534434]">
              Batch <strong>{batch.batchCode}</strong> has been cryptographically validated on the Honey Chain decentralized network.
            </p>
          </div>

          <div className="text-left sm:text-right text-xs">
            <div className="text-[10px] font-bold text-[#867461] uppercase">Ledger Root Hash</div>
            <div className="font-mono font-bold text-[#1f1b17] break-all max-w-xs">{batch.blockchainHash}</div>
          </div>
        </div>

        {/* Apiary & Hive Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20">
            <span className="text-[10px] font-bold uppercase text-[#867461]">Source Apiary</span>
            <div className="font-bold text-[#1f1b17] text-sm mt-0.5">Sundarbans Mangrove</div>
            <div className="text-[11px] text-[#855300]">West Bengal, India</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20">
            <span className="text-[10px] font-bold uppercase text-[#867461]">Smart Hive Node</span>
            <div className="font-bold text-[#1f1b17] text-sm mt-0.5">{batch.sourceHiveCode}</div>
            <div className="text-[11px] text-[#006c49]">Telemetry Certified</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20">
            <span className="text-[10px] font-bold uppercase text-[#867461]">Extraction Technique</span>
            <div className="font-bold text-[#1f1b17] text-sm mt-0.5">Cold Centrifugation</div>
            <div className="text-[11px] text-[#534434]">Zero heat degradation</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#fffbf7] border border-[#f59e0b]/20">
            <span className="text-[10px] font-bold uppercase text-[#867461]">Purity Moisture</span>
            <div className="font-bold text-[#1f1b17] text-sm mt-0.5">{batch.moisturePercentage}%</div>
            <div className="text-[11px] text-[#006c49]">Below standard 20% limit</div>
          </div>
        </div>

        {/* 5-Stage Visual Custody Flow */}
        <div className="space-y-6 pt-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#1f1b17]">
            Verified Custody Milestones
          </h2>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#006c49] space-y-8">
            {batch.traceabilitySteps.map((step, idx) => (
              <div key={step.id} className="relative">
                <div className="absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full bg-[#006c49] text-white flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-base">{step.icon}</span>
                </div>

                <div className="bg-[#fffbf7] p-5 rounded-2xl border border-[#f59e0b]/25 shadow-sm space-y-2 hover:border-[#855300] transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#855300] uppercase tracking-wider">
                        Stage 0{idx + 1}
                      </span>
                      <h3 className="text-sm font-black text-[#1f1b17]">{step.stageName}</h3>
                    </div>
                    <span className="text-[11px] font-mono text-[#867461]">{step.timestamp}</span>
                  </div>

                  <p className="text-xs text-[#534434] leading-relaxed">{step.details}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-[#f0e6e0] text-[11px]">
                    <div>
                      <span className="text-[#867461] block">Location:</span>
                      <span className="font-bold text-[#1f1b17]">{step.location}</span>
                    </div>
                    <div>
                      <span className="text-[#867461] block">Responsible Lead:</span>
                      <span className="font-bold text-[#1f1b17]">{step.operatorName}</span>
                    </div>
                    <div>
                      <span className="text-[#867461] block">Cryptographic Hash:</span>
                      <span className="font-mono text-[#006c49] font-semibold">{step.hash.substring(0, 14)}...</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-2xl bg-[#f6ece6] border border-[#d8c3ad]/50 text-xs text-[#534434] flex items-start gap-3">
          <span className="material-symbols-outlined text-lg text-[#855300] shrink-0 mt-0.5">info</span>
          <div>
            <span className="font-bold text-[#1f1b17]">Trust & Verification Model:</span> Blockchain protects the integrity of the recorded traceability history. It ensures no record can be tampered with or altered after honey leaves the apiary.
          </div>
        </div>
      </div>
    </div>
  );
};
