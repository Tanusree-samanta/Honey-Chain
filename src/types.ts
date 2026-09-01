export type TabType = 
  | 'platform'
  | 'dashboard' 
  | 'hives' 
  | 'insights' 
  | 'predictions' 
  | 'alerts' 
  | 'batches' 
  | 'trace' 
  | 'qr_generator' 
  | 'consumer_verify' 
  | 'network' 
  | 'auth' 
  | 'settings';

export type HiveStatus = 'healthy' | 'attention' | 'critical';

export interface HiveMetrics {
  tempStability: number;
  humidityVariance: number;
  weightGrowth: number;
  environmentalConsistency: number;
}

export interface HiveTelemetry {
  id: string;
  code: string;
  name: string;
  location: string;
  cluster: string;
  internalTemp: number;
  humidity: number;
  weight: number;
  weightChange24h: string;
  status: HiveStatus;
  healthScore: number;
  telemetryStatus: 'Online' | 'Offline' | 'Syncing';
  lastPing: string;
  metrics: HiveMetrics;
  notes?: string;
  isSimulatedAbnormal?: boolean;
  abnormalConditionName?: string;
}

export interface CustodyStep {
  step: string;
  title: string;
  description: string;
  timestamp: string;
  hash?: string;
  status: 'completed' | 'pending';
  icon: string;
}

export interface HoneyBatch {
  id: string;
  batchId: string;
  sourceHiveId?: string;
  status: 'Packaged' | 'Extracted' | 'Processing' | 'Distributed';
  quantityKg: number;
  sourceHiveCode: string;
  sourceLocation: string;
  extractedDate: string;
  packagedDate?: string;
  qrCodeUrl: string;
  txHash: string;
  verified: boolean;
  steps: CustodyStep[];
}

export interface InfluenceFactor {
  id: string;
  title: string;
  subtitle: string;
  type: 'positive' | 'neutral' | 'warning';
  icon: string;
  indicatorColor: string;
}

export interface UserAccount {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  role: 'beekeeper' | 'processor' | 'distributor' | 'admin' | 'auditor' | 'consumer';
  apiaryCluster?: string;
  avatarUrl: string;
  registeredHivesCount?: number;
  totalBatchesTraced?: number;
}
