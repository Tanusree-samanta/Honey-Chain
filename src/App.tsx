import React, { useState } from 'react';
import { TabType, HiveTelemetry, HoneyBatch, UserAccount } from './types';
import { INITIAL_HIVES, INITIAL_BATCHES, INITIAL_USER } from './data/mockData';
import { NavigationDrawer } from './components/NavigationDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { TopBar } from './components/TopBar';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { HiveDetailsScreen } from './components/screens/HiveDetailsScreen';
import { PlatformScreen } from './components/screens/PlatformScreen';
import { PredictionScreen } from './components/screens/PredictionScreen';
import { TraceabilityScreen } from './components/screens/TraceabilityScreen';
import { ConsumerVerifyScreen } from './components/screens/ConsumerVerifyScreen';
import { NetworkOverviewScreen } from './components/screens/NetworkOverviewScreen';
import { BatchesListScreen } from './components/screens/BatchesListScreen';
import { AlertsScreen } from './components/screens/AlertsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { AuthScreen } from './components/screens/AuthScreen';

export function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [hives, setHives] = useState<HiveTelemetry[]>(INITIAL_HIVES);
  const [selectedHiveId, setSelectedHiveId] = useState<string>(INITIAL_HIVES[0].id);
  const [batches, setBatches] = useState<HoneyBatch[]>(INITIAL_BATCHES);
  const [selectedBatchId, setSelectedBatchId] = useState<string>(INITIAL_BATCHES[0].id);
  const [user, setUser] = useState<UserAccount>(INITIAL_USER);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);

  // Critical alerts count
  const criticalCount = hives.filter(h => h.status === 'critical').length;

  // Hive telemetry update callback
  const handleUpdateHive = (updated: HiveTelemetry) => {
    setHives(prev => prev.map(h => (h.id === updated.id ? updated : h)));
  };

  // Add new batch callback
  const handleCreateBatch = (newBatch: HoneyBatch) => {
    setBatches(prev => [newBatch, ...prev]);
    setSelectedBatchId(newBatch.id);
  };

  // If on public consumer verification screen, render clean full view without standard sidebar
  if (currentTab === 'consumer_verify') {
    const selectedBatch = batches.find(b => b.id === selectedBatchId) || batches[0];
    return (
      <div className="min-h-screen bg-[#fff8f5] text-[#1f1b17] selection:bg-[#adedd3] selection:text-[#004e34]">
        <ConsumerVerifyScreen
          batch={selectedBatch}
          onNavigate={(tab) => setCurrentTab(tab)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1f1b17] flex font-sans selection:bg-[#adedd3] selection:text-[#004e34]">
      {/* Desktop Navigation Sidebar */}
      <NavigationDrawer
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        user={user}
        criticalAlertCount={criticalCount}
        onOpenAuth={() => setShowAuthModal(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-[280px] flex flex-col min-w-0 min-h-screen">
        {/* Top Sticky Header */}
        <TopBar
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          user={user}
          hives={hives}
          onOpenAuth={() => setShowAuthModal(true)}
          onSelectHive={(id) => setSelectedHiveId(id)}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-12">
          {currentTab === 'dashboard' && (
            <DashboardScreen
              hives={hives}
              onSelectHive={(id) => {
                setSelectedHiveId(id);
                setCurrentTab('hives');
              }}
              onNavigate={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'hives' && (
            <HiveDetailsScreen
              selectedHiveId={selectedHiveId}
              hives={hives}
              onSelectHive={(id) => setSelectedHiveId(id)}
              onUpdateHive={handleUpdateHive}
              onNavigate={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'platform' && (
            <PlatformScreen
              onNavigate={(tab) => setCurrentTab(tab)}
            />
          )}

          {(currentTab === 'insights' || currentTab === 'predictions') && (
            <PredictionScreen />
          )}

          {(currentTab === 'trace' || currentTab === 'qr_generator') && (
            <TraceabilityScreen
              batches={batches}
              selectedBatchId={selectedBatchId}
              onSelectBatch={(id) => setSelectedBatchId(id)}
              onNavigate={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'batches' && (
            <BatchesListScreen
              batches={batches}
              hives={hives}
              onSelectBatch={(id) => {
                setSelectedBatchId(id);
                setCurrentTab('trace');
              }}
              onCreateBatch={handleCreateBatch}
              onNavigate={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'alerts' && (
            <AlertsScreen
              hives={hives}
              onSelectHive={(id) => {
                setSelectedHiveId(id);
                setCurrentTab('hives');
              }}
              onUpdateHive={handleUpdateHive}
              onNavigate={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'network' && (
            <NetworkOverviewScreen
              batches={batches}
              onSelectBatch={(id) => {
                setSelectedBatchId(id);
                setCurrentTab('trace');
              }}
              onNavigate={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsScreen
              user={user}
              onOpenAuth={() => setShowAuthModal(true)}
            />
          )}
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => setCurrentTab(tab)}
          criticalAlertCount={criticalCount}
        />
      </div>

      {/* Authentication Modal */}
      {showAuthModal && (
        <AuthScreen
          currentUser={user}
          onUpdateUser={(updated) => setUser(updated)}
          onClose={() => setShowAuthModal(false)}
          onNavigate={(tab) => setCurrentTab(tab)}
        />
      )}
    </div>
  );
}

export default App;
