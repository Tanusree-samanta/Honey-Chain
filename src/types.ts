export type AppMode = 'beekeeper' | 'customer';

export type BeekeeperTab = 
  | 'dashboard' 
  | 'hives' 
  | 'hive_details'
  | 'ai_health' 
  | 'predictions' 
  | 'alerts' 
  | 'batches' 
  | 'traceability' 
  | 'my_products' 
  | 'orders' 
  | 'marketplace_performance' 
  | 'performance'
  | 'qr_generator' 
  | 'analytics' 
  | 'settings'
  | 'how_it_works';

export type CustomerTab =
  | 'home'
  | 'shop'
  | 'product_details'
  | 'beekeepers'
  | 'beekeeper_profile'
  | 'traceability'
  | 'qr_verify'
  | 'qr_scanner'
  | 'cart'
  | 'checkout'
  | 'order_confirmation'
  | 'my_orders'
  | 'orders'
  | 'order_tracking'
  | 'wishlist'
  | 'profile'
  | 'how_it_works';

export type TabType = BeekeeperTab | CustomerTab | 'welcome';

export type HiveStatus = 'healthy' | 'attention' | 'critical';

export interface HiveMetrics {
  tempStability: number;
  humidityVariance: number;
  weightGrowth: number;
  environmentalConsistency: number;
  historicalPattern?: number;
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
  batteryLevel?: number;
  connectivity?: string;
  metrics: HiveMetrics;
  notes?: string;
  isSimulatedAbnormal?: boolean;
  abnormalConditionName?: string;
}

export interface ApiaryAlert {
  id: string;
  hiveId: string;
  hiveCode: string;
  hiveLocation: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  acknowledged?: boolean;
  type?: string;
}

export interface CustodyStep {
  id?: string;
  step?: string;
  stageName?: string;
  title?: string;
  description?: string;
  details?: string;
  timestamp: string;
  location?: string;
  operatorName?: string;
  responsibleParty?: string;
  hash?: string;
  status?: 'completed' | 'pending';
  icon: string;
}

export interface HoneyBatch {
  id: string;
  batchId?: string;
  batchCode?: string;
  sourceHiveId?: string;
  status: 'Packaged' | 'Extracted' | 'Processing' | 'Distributed';
  quantityKg: number;
  sourceHiveCode: string;
  sourceLocation: string;
  honeyType: string;
  beekeeperId?: string;
  beekeeperName?: string;
  harvestDate?: string;
  extractedDate: string;
  processingDate?: string;
  processingFacility?: string;
  packagedDate?: string;
  packagingCenter?: string;
  moisturePercentage?: number;
  qualityDocs?: string[];
  qrCodeUrl?: string;
  txHash?: string;
  blockchainHash?: string;
  verified: boolean;
  steps?: CustodyStep[];
  traceabilitySteps?: CustodyStep[];
}

export type HoneyCategory = 
  | 'Raw' 
  | 'Forest' 
  | 'Multi-floral' 
  | 'Mustard' 
  | 'Litchi' 
  | 'Organic'
  | string;

export interface HoneyProduct {
  id: string;
  title?: string;
  name?: string;
  description: string;
  honeyType: HoneyCategory;
  size?: string;
  weightGrams?: number;
  availableSizes?: string[];
  price: number;
  originalPrice?: number;
  stock?: number;
  stockQuantity?: number;
  batchId?: string;
  batchCode?: string;
  sourceHiveCode: string;
  sourceLocation: string;
  harvestDate: string;
  beekeeperId: string;
  beekeeperName: string;
  beekeeperLocation: string;
  processingFacility: string;
  packagingCenter: string;
  imageUrl: string;
  galleryImages?: string[];
  rating: number;
  reviewCount?: number;
  reviewsCount?: number;
  status: 'active' | 'paused';
  traceabilityVerified?: boolean;
  isVerifiedTraceable?: boolean;
  tastingNotes?: string[];
  isOrganic?: boolean;
  viewsCount?: number;
  ordersCount?: number;
}

export interface BeekeeperProfile {
  id: string;
  name: string;
  farmName: string;
  location: string;
  region: string;
  hivesCount?: number;
  activeHivesCount?: number;
  experienceYears?: number;
  joinedYear?: number;
  honeyTypes: string[];
  rating: number;
  reviewsCount?: number;
  reviewCount?: number;
  verified?: boolean;
  isVerified?: boolean;
  avatarUrl: string;
  coverUrl?: string;
  about?: string;
  bio?: string;
  journeyStory?: string;
  traceableBatchesCount?: number;
  totalHarvestKg?: number;
}

export interface CartItem {
  product: HoneyProduct;
  quantity: number;
  selectedSize?: string;
}

export interface OrderTrackingStep {
  title?: string;
  statusName?: string;
  description?: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
  icon?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode?: string;
  pinCode?: string;
}

export interface CustomerOrder {
  id: string;
  orderNumber?: string;
  orderCode?: string;
  customerId?: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  items: {
    productId?: string;
    productTitle?: string;
    batchCode?: string;
    product?: HoneyProduct;
    quantity: number;
    weightGrams?: number;
    size?: string;
    price?: number;
    unitPrice?: number;
  }[];
  subtotal?: number;
  shippingFee?: number;
  total?: number;
  totalAmount?: number;
  orderDate?: string;
  createdAt?: string;
  status: 'new' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'New' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentMethod: 'upi' | 'card' | 'cod' | 'UPI' | 'Card' | 'Cash on Delivery';
  paymentStatus?: 'Paid' | 'Pending' | 'PAID';
  paymentId?: string;
  shippingAddress: ShippingAddress;
  estimatedDelivery?: string;
  trackingSteps: OrderTrackingStep[];
  batchIds?: string[];
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
