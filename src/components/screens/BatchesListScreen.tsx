import React, { useState } from 'react';
import { HoneyBatch, TabType, HiveTelemetry } from '../../types';
import confetti from 'canvas-confetti';

interface BatchesListScreenProps {
  batches: HoneyBatch[];
  hives: HiveTelemetry[];
  onSelectBatch: (id: string) => void;
  onCreateBatch: (newBatch: HoneyBatch) => void;
  onNavigate: (tab: TabType) => void;
}

export const BatchesListScreen: React.FC<BatchesListScreenProps> = ({
  batches,
  hives,
  onSelectBatch,
  onCreateBatch,
  onNavigate,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sourceHiveId, setSourceHiveId] = useState(hives[0]?.id || 'hive_1');
  const [quantity, setQuantity] = useState('24.5');
  const [flavorNote, setFlavorNote] = useState('Wild Sundarban Mangrove Blossom');

  const handleCreateNewBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const sourceHive = hives.find(h => h.id === sourceHiveId) || hives[0];
    const newBatchId = `HC-2026-${String(batches.length + 1).padStart(4, '0')}`;
    const randomHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const newBatch: HoneyBatch = {
      id: `batch_${Date.now()}`,
      batchId: newBatchId,
      sourceHiveId: sourceHive.id,
      sourceHiveCode: sourceHive.code,
      sourceLocation: sourceHive.location,
      status: 'Extracted',
      quantityKg: parseFloat(quantity) || 20,
      extractedDate: 'Today, ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      verified: true,
      txHash: randomHash,
      qrCodeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAY8vWU_sU8tYFBK6iwa4GIf9iJWlWVEksygV-ew8Raaje9pVgQgBiTlu-UKvI0eYxQgtYNLyi7odhC_hajXjHmKSVcJEFQ9hrX-T7zw9fB5kY-3pEBar-PNyM5ci94Y0oZU-wT8PceaRADEe6EcvP3A7MIVDPlkSi0qGl0p-ViMfizCXgWDL04wyZkHnnhGK3MJFwAlb_VnvpucN2gtqE7g4asGEa5ytjSqfi9QVMrvfyIaoPV7ZVRIg',
      steps: [
        {
          step: '01',
          title: 'Hive Registered',
          timestamp: 'Aug 15, 2026',
          icon: 'location_on',
          description: `Apiary node ${sourceHive.code} synchronized on blockchain.`,
          hash: randomHash.slice(0, 34),
          status: 'completed'
        },
        {
          step: '02',
          title: 'Honey Extracted',
          timestamp: 'Just now',
          icon: 'water_drop',
          description: `Harvested ${quantity} kg under pristine organic parameters. Flavor profile: ${flavorNote}`,
          hash: randomHash,
          status: 'completed'
        },
        {
          step: '03',
          title: 'Cold Filtration',
          timestamp: 'Pending',
          icon: 'filter_alt',
          description: 'Gravity cold-strain filtration and purity moisture test.',
          status: 'pending'
        },
        {
          step: '04',
          title: 'Packaging & QR Sealed',
          timestamp: 'Pending',
          icon: 'inventory_2',
          description: 'Tamper-evident sealing and cryptographic label attachment.',
          status: 'pending'
        },
      ]
    };

    onCreateBatch(newBatch);
    setShowCreateModal(false);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#1f1b17] tracking-tight">
            Honey Batches
          </h1>
          <p className="text-xs md:text-sm text-[#534434] mt-1">
            Manage harvested honey lots, issue blockchain seals, and generate consumer QR codes.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#855300] hover:bg-[#653e00] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          <span>Record New Extraction</span>
        </button>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((batch) => (
          <div
            key={batch.id}
            onClick={() => {
              onSelectBatch(batch.id);
              onNavigate('trace');
            }}
            className="glass-card rounded-2xl p-5 bg-white border border-[#d8c3ad]/30 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#adedd3] text-[#006c49]">
                  <span className="material-symbols-outlined text-xs">verified</span>
                  <span>{batch.status}</span>
                </span>
                <span className="text-xs text-[#867461] font-semibold">{batch.extractedDate}</span>
              </div>

              <h2 className="text-lg font-extrabold text-[#1f1b17] group-hover:text-[#855300] transition-colors">
                {batch.batchId}
              </h2>
              <p className="text-xs text-[#534434] mt-0.5">Source: {batch.sourceHiveCode} ({batch.sourceLocation})</p>

              <div className="mt-4 pt-3 border-t border-[#f0e6e0] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold text-[#867461] uppercase block">Yield Weight</span>
                  <span className="font-extrabold text-[#1f1b17] text-sm">{batch.quantityKg} kg</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#867461] uppercase block text-right">Ledger Proof</span>
                  <span className="font-mono text-[11px] text-[#006c49] font-bold">{batch.txHash.slice(0, 10)}...</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#f0e6e0] flex justify-between items-center text-xs font-bold text-[#855300]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base">qr_code_2</span>
                <span>Trace Timeline</span>
              </span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Extraction Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#d8c3ad] animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center pb-3 border-b border-[#eae1da]">
              <h3 className="font-extrabold text-base text-[#1f1b17]">Record Honey Extraction</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-[#867461] font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateNewBatch} className="space-y-4 my-4">
              <div>
                <label className="block text-xs font-bold text-[#534434] mb-1">Source Hive</label>
                <select
                  value={sourceHiveId}
                  onChange={(e) => setSourceHiveId(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#d8c3ad] bg-[#fff8f5]"
                >
                  {hives.map(h => (
                    <option key={h.id} value={h.id}>{h.code} - {h.location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#534434] mb-1">Extracted Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#d8c3ad] bg-[#fff8f5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#534434] mb-1">Flora / Flavor Notes</label>
                <input
                  type="text"
                  value={flavorNote}
                  onChange={(e) => setFlavorNote(e.target.value)}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#d8c3ad] bg-[#fff8f5]"
                />
              </div>

              <div className="p-3 bg-[#adedd3]/30 rounded-xl border border-[#006c49]/30 text-xs text-[#006c49]">
                Anchoring this extraction logs an immutable SHA-256 block hash and prepares consumer QR verification.
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#eae1da]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#534434]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-[#855300] text-white rounded-xl shadow-sm hover:bg-[#653e00]"
                >
                  Anchor on Blockchain
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
