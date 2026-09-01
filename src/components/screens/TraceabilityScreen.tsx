import React, { useState } from 'react';
import { HoneyBatch, TabType } from '../../types';
import confetti from 'canvas-confetti';

interface TraceabilityScreenProps {
  batches: HoneyBatch[];
  selectedBatchId?: string;
  onSelectBatch: (id: string) => void;
  onNavigate: (tab: TabType) => void;
}

export const TraceabilityScreen: React.FC<TraceabilityScreenProps> = ({
  batches,
  selectedBatchId,
  onSelectBatch,
  onNavigate,
}) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const currentBatch = batches.find(b => b.id === selectedBatchId || b.batchId === selectedBatchId) || batches[0];

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleDownloadQR = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#855300', '#f59e0b', '#2b6954', '#006c49']
    });

    // Create a temporary link to download
    const link = document.createElement('a');
    link.href = currentBatch.qrCodeUrl;
    link.download = `HoneyChain-${currentBatch.batchId}-QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    setShareSuccess(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setShareSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-200">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1f1b17] tracking-tight">
            Batch Traceability
          </h1>
          <p className="text-xs md:text-sm text-[#534434] max-w-2xl mt-1">
            Verify the complete chain of custody for honey batch {currentBatch.batchId}, anchored immutably on the blockchain.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Batch Selector if multiple */}
          <select
            id="trace-batch-selector"
            value={currentBatch.id}
            onChange={(e) => onSelectBatch(e.target.value)}
            className="text-xs font-bold bg-white border border-[#d8c3ad] text-[#1f1b17] rounded-lg px-3 py-2 outline-none cursor-pointer"
          >
            {batches.map(b => (
              <option key={b.id} value={b.id}>
                {b.batchId} ({b.sourceHiveCode})
              </option>
            ))}
          </select>

          <button
            id="share-batch-btn"
            onClick={handleShare}
            className="bg-white hover:bg-[#f6ece6] text-[#1f1b17] text-xs font-bold px-4 py-2 rounded-lg border border-[#d8c3ad] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">
              {shareSuccess ? 'check' : 'share'}
            </span>
            <span>{shareSuccess ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout (Bento 8 / 4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Batch Info & Timeline (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Batch Info Card */}
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-[#d8c3ad]/20 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#f59e0b]/20 flex items-center justify-center border border-[#855300]/20 shrink-0">
                <span className="material-symbols-outlined text-3xl text-[#855300]">hive</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#867461] uppercase tracking-wider block mb-0.5">
                  Batch ID
                </span>
                <span className="text-xl md:text-2xl font-extrabold text-[#1f1b17]">
                  {currentBatch.batchId}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full sm:w-auto">
              <div>
                <span className="text-[10px] font-bold text-[#867461] uppercase tracking-wider block mb-1">
                  Status
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#adedd3] text-[#006c49] text-xs font-bold">
                  <span className="material-symbols-outlined text-xs">check_circle</span>
                  <span>{currentBatch.status}</span>
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#867461] uppercase tracking-wider block mb-1">
                  Quantity
                </span>
                <span className="text-sm md:text-base font-extrabold text-[#1f1b17]">
                  {currentBatch.quantityKg} kg
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#867461] uppercase tracking-wider block mb-1">
                  Source
                </span>
                <span className="text-sm md:text-base font-extrabold text-[#1f1b17]">
                  {currentBatch.sourceHiveCode}
                </span>
              </div>
            </div>
          </div>

          {/* Blockchain Timeline Card */}
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-[#d8c3ad]/20 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-8 pb-4 border-b border-[#f0e6e0]">
              <h2 className="text-base md:text-lg font-bold text-[#1f1b17] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2b6954]">link</span>
                <span>Immutable Chain of Custody</span>
              </h2>

              <span className="text-xs font-bold text-[#2b6954] border border-[#2b6954]/30 px-2.5 py-1 rounded-full bg-[#adedd3]/30 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-xs">verified</span>
                <span>Blockchain Verified</span>
              </span>
            </div>

            {/* Timeline Tree */}
            <div className="relative pl-2 sm:pl-4 space-y-8">
              {/* Vertical connector bar */}
              <div className="absolute left-[26px] sm:left-[34px] top-6 bottom-6 w-0.5 bg-[#95d3ba] z-0" />

              {currentBatch.steps.map((step, idx) => {
                const isCompleted = step.status === 'completed';

                return (
                  <div key={idx} className="relative z-10 flex gap-4 sm:gap-6 items-start group">
                    {/* Node Icon */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm transition-transform group-hover:scale-105 ${
                        isCompleted ? 'bg-[#2b6954] text-white' : 'bg-[#eae1da] text-[#867461]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base sm:text-xl">
                        {step.icon}
                      </span>
                    </div>

                    {/* Step Content Card */}
                    <div
                      className={`flex-1 p-4 rounded-xl border transition-all ${
                        isCompleted
                          ? 'bg-[#fff8f5] border-[#d8c3ad]/40 shadow-sm hover:shadow-md'
                          : 'bg-white/60 border-dashed border-[#d8c3ad] opacity-70'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-1.5">
                        <h3 className="text-xs sm:text-sm font-bold text-[#1f1b17]">
                          {step.step} {step.title}
                        </h3>
                        <span className="text-[11px] font-medium text-[#867461]">
                          {step.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-[#534434] mb-3 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Cryptographic Hash display */}
                      {step.hash && (
                        <div
                          onClick={() => handleCopyHash(step.hash)}
                          className="bg-[#f0e6e0] hover:bg-[#eae1da] rounded-lg px-2.5 py-1.5 flex items-center justify-between gap-2 font-mono text-[11px] text-[#534434] cursor-pointer transition-colors"
                          title="Click to copy SHA-256 block hash"
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="material-symbols-outlined text-xs text-[#006c49]">tag</span>
                            <span className="truncate">Hash: {step.hash}</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#855300] shrink-0">
                            {copiedHash === step.hash ? 'COPIED!' : 'COPY'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: QR Generator & Protocol Card (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* QR Generator Card */}
          <div className="glass-panel rounded-xl p-6 relative overflow-hidden bg-white shadow-md border border-[#d8c3ad]/40">
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold text-[#1f1b17] mb-0.5">Traceability QR</h2>
              <p className="text-xs text-[#867461]">Consumer verification portal link</p>
            </div>

            {/* QR Code Container */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#d8c3ad]/40 flex flex-col justify-center items-center mb-6 aspect-square w-full max-w-[240px] mx-auto relative">
              <img
                src={currentBatch.qrCodeUrl}
                alt="Traceability QR Code"
                className="w-full h-full object-contain"
              />
              {/* Overlay pill */}
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white border border-[#d8c3ad] px-3 py-0.5 rounded-full shadow-sm">
                <span className="text-[10px] font-bold text-[#1f1b17] whitespace-nowrap flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#006c49]">verified</span>
                  <span>Verified by Honey Chain</span>
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mt-6">
              <button
                id="download-qr-btn"
                onClick={handleDownloadQR}
                className="bg-[#f59e0b] hover:bg-[#d97706] text-white text-xs font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_2px_0_rgba(180,83,9,1)] active:translate-y-[2px] active:shadow-none cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span>Download QR Code</span>
              </button>

              <button
                id="preview-consumer-page-btn"
                onClick={() => onNavigate('consumer_verify')}
                className="bg-[#fff8f5] hover:bg-[#f6ece6] text-[#1f1b17] text-xs font-bold py-3 px-4 rounded-lg border border-[#d8c3ad] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-base text-[#855300]">visibility</span>
                <span>Preview Consumer Page</span>
              </button>
            </div>
          </div>

          {/* Info Card: Data Integrity Guarantee */}
          <div className="bg-[#fcf2eb] rounded-xl p-5 border border-[#d8c3ad]/30 shadow-sm">
            <h3 className="text-sm font-bold text-[#1f1b17] mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#855300]">security</span>
              <span>Data Integrity Guarantee</span>
            </h3>
            <p className="text-xs text-[#534434] mb-3 leading-relaxed">
              Every step in the Honey Chain is cryptographically secured. Once a record is logged, it cannot be altered or deleted. This ensures absolute trust for end consumers verifying the organic origins of their purchase.
            </p>
            <button
              onClick={() => onNavigate('network')}
              className="text-xs font-bold text-[#855300] hover:text-[#f59e0b] transition-colors flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Learn about our protocol</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
