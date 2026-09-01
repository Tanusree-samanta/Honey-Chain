import React, { useState } from 'react';
import {
  AppMode,
  BeekeeperTab,
  CustomerTab,
  HiveTelemetry,
  HoneyBatch,
  HoneyProduct,
  BeekeeperProfile,
  CustomerOrder,
  CartItem,
  UserAccount,
} from './types';
import {
  INITIAL_HIVES,
  NORMALIZED_PRODUCTS,
  NORMALIZED_BATCHES,
  NORMALIZED_BEEKEEPERS,
  NORMALIZED_ORDERS,
  INITIAL_USER,
  INITIAL_CUSTOMER_USER,
} from './data/mockData';

// Common Components
import { WelcomeRoleModal } from './components/common/WelcomeRoleModal';
import { HowHoneyChainWorks } from './components/common/HowHoneyChainWorks';

// Beekeeper Components
import { BeekeeperSidebar } from './components/beekeeper/BeekeeperSidebar';
import { BeekeeperTopBar } from './components/beekeeper/BeekeeperTopBar';
import { BeekeeperDashboard } from './components/beekeeper/BeekeeperDashboard';
import { BeekeeperHiveDetails } from './components/beekeeper/BeekeeperHiveDetails';
import { BeekeeperAIHealth } from './components/beekeeper/BeekeeperAIHealth';
import { BeekeeperPredictions } from './components/beekeeper/BeekeeperPredictions';
import { BeekeeperAlerts } from './components/beekeeper/BeekeeperAlerts';
import { BeekeeperBatches } from './components/beekeeper/BeekeeperBatches';
import { BeekeeperTraceability } from './components/beekeeper/BeekeeperTraceability';
import { BeekeeperMyProducts } from './components/beekeeper/BeekeeperMyProducts';
import { BeekeeperMarketplacePerformance } from './components/beekeeper/BeekeeperMarketplacePerformance';
import { BeekeeperOrders } from './components/beekeeper/BeekeeperOrders';
import { BeekeeperQRGenerator } from './components/beekeeper/BeekeeperQRGenerator';
import { BeekeeperSalesAnalytics } from './components/beekeeper/BeekeeperSalesAnalytics';
import { BeekeeperSettings } from './components/beekeeper/BeekeeperSettings';

// Customer Components
import { CustomerNavbar } from './components/customer/CustomerNavbar';
import { CustomerHome } from './components/customer/CustomerHome';
import { CustomerShop } from './components/customer/CustomerShop';
import { CustomerProductDetails } from './components/customer/CustomerProductDetails';
import { CustomerTraceability } from './components/customer/CustomerTraceability';
import { CustomerQRScanner } from './components/customer/CustomerQRScanner';
import { CustomerCart } from './components/customer/CustomerCart';
import { CustomerCheckout } from './components/customer/CustomerCheckout';
import { CustomerOrderConfirmation } from './components/customer/CustomerOrderConfirmation';
import { CustomerMyOrders } from './components/customer/CustomerMyOrders';
import { CustomerOrderTracking } from './components/customer/CustomerOrderTracking';
import { CustomerBeekeepers } from './components/customer/CustomerBeekeepers';
import { CustomerBeekeeperProfile } from './components/customer/CustomerBeekeeperProfile';
import { CustomerWishlist } from './components/customer/CustomerWishlist';
import { CustomerProfile } from './components/customer/CustomerProfile';

export function App() {
  // Global Mode & Navigation State
  const [appMode, setAppMode] = useState<AppMode>('beekeeper');
  const [beekeeperTab, setBeekeeperTab] = useState<BeekeeperTab>('dashboard');
  const [customerTab, setCustomerTab] = useState<CustomerTab>('home');
  const [showRoleModal, setShowRoleModal] = useState<boolean>(false);

  // Users
  const [beekeeperUser, setBeekeeperUser] = useState<UserAccount>(INITIAL_USER);
  const [customerUser, setCustomerUser] = useState<UserAccount>(INITIAL_CUSTOMER_USER);

  // Domain Entities State
  const [hives, setHives] = useState<HiveTelemetry[]>(INITIAL_HIVES);
  const [selectedHiveId, setSelectedHiveId] = useState<string>(INITIAL_HIVES[0]?.id || 'hive-1');

  const [batches, setBatches] = useState<HoneyBatch[]>(NORMALIZED_BATCHES);
  const [selectedBatchCode, setSelectedBatchCode] = useState<string>(NORMALIZED_BATCHES[0]?.batchCode || 'HC-2026-0001');

  const [products, setProducts] = useState<HoneyProduct[]>(NORMALIZED_PRODUCTS);
  const [selectedProductId, setSelectedProductId] = useState<string>(NORMALIZED_PRODUCTS[0]?.id || 'prod-1');

  const [beekeepers] = useState<BeekeeperProfile[]>(NORMALIZED_BEEKEEPERS);
  const [selectedBeekeeperId, setSelectedBeekeeperId] = useState<string>(NORMALIZED_BEEKEEPERS[0]?.id || 'bk-1');

  const [orders, setOrders] = useState<CustomerOrder[]>(NORMALIZED_ORDERS);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string>(NORMALIZED_ORDERS[0]?.id || 'ord-1');
  const [latestPlacedOrder, setLatestPlacedOrder] = useState<CustomerOrder | null>(null);

  // E-commerce Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>([
    { product: NORMALIZED_PRODUCTS[0], quantity: 1, selectedSize: '500 g' },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-2']);

  // --- Handlers & Navigation ---
  const handleSelectRole = (mode: AppMode) => {
    setAppMode(mode);
    setShowRoleModal(false);
    if (mode === 'beekeeper') {
      setBeekeeperTab('dashboard');
    } else {
      setCustomerTab('home');
    }
  };

  // Cart operations
  const handleAddToCart = (product: HoneyProduct, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSize: `${product.weightGrams}g` }];
    });
  };

  const handleBuyNow = (product: HoneyProduct, quantity: number = 1) => {
    handleAddToCart(product, quantity);
    setCustomerTab('checkout');
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: HoneyProduct) => {
    setWishlistIds(prev =>
      prev.includes(product.id)
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Order Placement
  const handlePlaceOrder = (orderData: Partial<CustomerOrder>) => {
    const fullOrder: CustomerOrder = {
      id: `ord-${Date.now()}`,
      orderCode: orderData.orderCode || `HCORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: orderData.customerName || customerUser.fullName,
      customerEmail: orderData.customerEmail || customerUser.email,
      customerPhone: orderData.shippingAddress?.phone || '+91 98765 43210',
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      status: 'confirmed',
      createdAt: orderData.createdAt || 'Just now',
      paymentMethod: orderData.paymentMethod || 'upi',
      paymentId: orderData.paymentId || 'PAY-ONLINE-OK',
      shippingAddress: orderData.shippingAddress || {
        fullName: customerUser.fullName,
        phone: '+91 98765 43210',
        street: 'Main Street',
        city: 'Kolkata',
        state: 'West Bengal',
        pincode: '700091',
      },
      trackingSteps: orderData.trackingSteps || [
        { statusName: 'Order Placed', timestamp: 'Just now', completed: true },
        { statusName: 'Confirmed by Apiary', timestamp: 'Pending', completed: true },
      ],
    };

    setOrders(prev => [fullOrder, ...prev]);
    setLatestPlacedOrder(fullOrder);
    setCart([]);
    setCustomerTab('order_confirmation');
  };

  // Beekeeper Hive management
  const handleSelectHive = (hiveId: string) => {
    setSelectedHiveId(hiveId);
    setBeekeeperTab('hives');
  };

  const handleToggleSimulatedAnomaly = (hiveId: string) => {
    setHives(prev =>
      prev.map(h => {
        if (h.id === hiveId) {
          const isCurrentlySimulated = !h.isSimulatedAbnormal;
          return {
            ...h,
            isSimulatedAbnormal: isCurrentlySimulated,
            internalTemp: isCurrentlySimulated ? 39.4 : 34.8,
            humidity: isCurrentlySimulated ? 76 : 58,
            status: isCurrentlySimulated ? 'critical' : 'healthy',
            healthScore: isCurrentlySimulated ? 42 : 96,
            abnormalConditionName: isCurrentlySimulated ? 'Thermal Stress & Overheating' : undefined,
          };
        }
        return h;
      })
    );
  };

  const handleAddHive = (newHive: HiveTelemetry) => {
    setHives(prev => [newHive, ...prev]);
  };

  const handleAddInspectionNote = (hiveId: string, note: string) => {
    setHives(prev =>
      prev.map(h => (h.id === hiveId ? { ...h, notes: note } : h))
    );
  };

  // Beekeeper Batches & Traceability
  const handleCreateBatch = (newBatch: HoneyBatch) => {
    setBatches(prev => [newBatch, ...prev]);
    setSelectedBatchCode(newBatch.batchCode);
  };

  const handleAddTraceabilityStep = (batchId: string, step: any) => {
    setBatches(prev =>
      prev.map(b =>
        b.id === batchId
          ? { ...b, traceabilitySteps: [...b.traceabilitySteps, step] }
          : b
      )
    );
  };

  // Products
  const handleAddProduct = (newProduct: HoneyProduct) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleToggleProductStatus = (productId: string) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, status: p.status === 'active' ? 'paused' : 'active' }
          : p
      )
    );
  };

  const handleUpdateOrderStatus = (orderId: string, status: CustomerOrder['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  // Find active items
  const activeProduct = products.find(p => p.id === selectedProductId) || products[0];
  const activeBeekeeper = beekeepers.find(b => b.id === selectedBeekeeperId) || beekeepers[0];
  const activeTrackingOrder = orders.find(o => o.id === activeTrackingOrderId) || orders[0];

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#1f1b17] font-sans antialiased selection:bg-[#fcd34d] selection:text-[#1b4332]">
      {/* Role Picker Welcome Modal */}
      {showRoleModal && (
        <WelcomeRoleModal
          onSelectRole={handleSelectRole}
          onClose={() => setShowRoleModal(false)}
        />
      )}

      {/* ========================================================
          1. BEEKEEPER INTERFACE (OPERATIONS & IoT ANALYTICS)
         ======================================================== */}
      {appMode === 'beekeeper' && (
        <div className="flex h-screen overflow-hidden">
          {/* Left Sidebar */}
          <BeekeeperSidebar
            currentTab={beekeeperTab}
            onSelectTab={setBeekeeperTab}
            user={beekeeperUser}
            onSwitchToCustomer={() => setAppMode('customer')}
            alertsCount={2}
          />

          {/* Right Main Content */}
          <div className="flex-1 lg:pl-[260px] flex flex-col min-w-0 overflow-hidden">
            <BeekeeperTopBar
              currentTab={beekeeperTab}
              user={beekeeperUser}
              onSwitchToCustomer={() => setAppMode('customer')}
              onOpenSettings={() => setBeekeeperTab('settings')}
              hives={hives}
              batches={batches}
              onSelectHive={handleSelectHive}
              onSelectBatch={(code) => {
                setSelectedBatchCode(code);
                setBeekeeperTab('traceability');
              }}
            />

            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {beekeeperTab === 'dashboard' && (
                  <BeekeeperDashboard
                    hives={hives}
                    batches={batches}
                    products={products}
                    orders={orders}
                    onNavigate={(tab) => setBeekeeperTab(tab)}
                    onSelectHive={handleSelectHive}
                    onSelectBatch={(code) => {
                      setSelectedBatchCode(code);
                      setBeekeeperTab('traceability');
                    }}
                  />
                )}

                {(beekeeperTab === 'hives' || beekeeperTab === 'hive_details') && (
                  <BeekeeperHiveDetails
                    hives={hives}
                    selectedHiveId={selectedHiveId}
                    onSelectHive={setSelectedHiveId}
                    onToggleAnomaly={handleToggleSimulatedAnomaly}
                    onAddInspectionNote={handleAddInspectionNote}
                    onAddHive={handleAddHive}
                    onNavigateToHealth={() => setBeekeeperTab('ai_health')}
                  />
                )}

                {beekeeperTab === 'ai_health' && (
                  <BeekeeperAIHealth
                    hives={hives}
                    onSelectHive={handleSelectHive}
                    onToggleAnomaly={handleToggleSimulatedAnomaly}
                  />
                )}

                {beekeeperTab === 'predictions' && (
                  <BeekeeperPredictions
                    hives={hives}
                    onSelectHive={handleSelectHive}
                    onCreateBatchFromForecast={() => setBeekeeperTab('batches')}
                  />
                )}

                {beekeeperTab === 'alerts' && (
                  <BeekeeperAlerts
                    hives={hives}
                    onSelectHive={handleSelectHive}
                    onToggleAnomaly={handleToggleSimulatedAnomaly}
                  />
                )}

                {beekeeperTab === 'batches' && (
                  <BeekeeperBatches
                    batches={batches}
                    hives={hives}
                    onCreateBatch={handleCreateBatch}
                    onViewTraceability={(code) => {
                      setSelectedBatchCode(code);
                      setBeekeeperTab('traceability');
                    }}
                    onGenerateQR={(batchId) => {
                      const b = batches.find(item => item.id === batchId);
                      if (b) setSelectedBatchCode(b.batchCode);
                      setBeekeeperTab('qr_generator');
                    }}
                  />
                )}

                {beekeeperTab === 'traceability' && (
                  <BeekeeperTraceability
                    batches={batches}
                    selectedBatchCode={selectedBatchCode}
                    onSelectBatch={setSelectedBatchCode}
                    onAddCustodyStep={handleAddTraceabilityStep}
                    onGenerateQR={(code) => {
                      setSelectedBatchCode(code);
                      setBeekeeperTab('qr_generator');
                    }}
                  />
                )}

                {beekeeperTab === 'my_products' && (
                  <BeekeeperMyProducts
                    products={products}
                    batches={batches}
                    onAddProduct={handleAddProduct}
                    onToggleStatus={handleToggleProductStatus}
                    onViewMarketplace={() => {
                      setAppMode('customer');
                      setCustomerTab('shop');
                    }}
                  />
                )}

                {(beekeeperTab === 'marketplace_performance' || beekeeperTab === 'performance') && (
                  <BeekeeperMarketplacePerformance
                    products={products}
                    onNavigateToProducts={() => setBeekeeperTab('my_products')}
                    onNavigateToOrders={() => setBeekeeperTab('orders')}
                  />
                )}

                {beekeeperTab === 'orders' && (
                  <BeekeeperOrders
                    orders={orders}
                    onUpdateOrderStatus={handleUpdateOrderStatus}
                    onViewTraceability={(code) => {
                      setSelectedBatchCode(code);
                      setBeekeeperTab('traceability');
                    }}
                  />
                )}

                {beekeeperTab === 'qr_generator' && (
                  <BeekeeperQRGenerator
                    batches={batches}
                    selectedBatchId={batches.find(b => b.batchCode === selectedBatchCode)?.id}
                    onPreviewVerification={(code) => {
                      setSelectedBatchCode(code);
                      setAppMode('customer');
                      setCustomerTab('traceability');
                    }}
                  />
                )}

                {beekeeperTab === 'analytics' && (
                  <BeekeeperSalesAnalytics />
                )}

                {beekeeperTab === 'settings' && (
                  <BeekeeperSettings
                    user={beekeeperUser}
                    onUpdateProfile={(up) => setBeekeeperUser(prev => ({ ...prev, ...up }))}
                  />
                )}

                {beekeeperTab === 'how_it_works' && (
                  <HowHoneyChainWorks />
                )}
              </div>
            </main>
          </div>
        </div>
      )}

      {/* ========================================================
          2. CUSTOMER / CONSUMER INTERFACE (MARKETPLACE & AUDIT)
         ======================================================== */}
      {appMode === 'customer' && (
        <div className="min-h-screen flex flex-col">
          {/* Top Navbar */}
          <CustomerNavbar
            currentTab={customerTab}
            onSelectTab={setCustomerTab}
            user={customerUser}
            cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
            wishlistCount={wishlistIds.length}
            onOpenCart={() => setCustomerTab('cart')}
            onOpenAuth={() => setCustomerTab('profile')}
            onSwitchToBeekeeper={() => setAppMode('beekeeper')}
            products={products}
            batches={batches}
            onSelectProduct={(p) => {
              setSelectedProductId(p.id);
              setCustomerTab('product_details');
            }}
            onSelectBatch={(code) => {
              setSelectedBatchCode(code);
              setCustomerTab('traceability');
            }}
          />

          {/* Main Marketplace Area */}
          <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
            {customerTab === 'home' && (
              <CustomerHome
                products={products}
                beekeepers={beekeepers}
                onNavigate={setCustomerTab}
                onSelectProduct={(p) => {
                  setSelectedProductId(p.id);
                  setCustomerTab('product_details');
                }}
                onSelectBeekeeper={(bk) => {
                  setSelectedBeekeeperId(bk.id);
                  setCustomerTab('beekeeper_profile');
                }}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
              />
            )}

            {customerTab === 'shop' && (
              <CustomerShop
                products={products}
                onSelectProduct={(p) => {
                  setSelectedProductId(p.id);
                  setCustomerTab('product_details');
                }}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
              />
            )}

            {customerTab === 'product_details' && (
              <CustomerProductDetails
                product={activeProduct}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onViewTraceability={(code) => {
                  setSelectedBatchCode(code);
                  setCustomerTab('traceability');
                }}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlistIds.includes(activeProduct.id)}
                onBack={() => setCustomerTab('shop')}
              />
            )}

            {customerTab === 'traceability' && (
              <CustomerTraceability
                batches={batches}
                selectedBatchCode={selectedBatchCode}
                onSelectBatch={setSelectedBatchCode}
                onShopHoney={() => setCustomerTab('shop')}
              />
            )}

            {(customerTab === 'qr_verify' || customerTab === 'qr_scanner') && (
              <CustomerQRScanner
                batches={batches}
                onViewTraceability={(code) => {
                  setSelectedBatchCode(code);
                  setCustomerTab('traceability');
                }}
              />
            )}

            {customerTab === 'cart' && (
              <CustomerCart
                items={cart}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveCartItem}
                onProceedToCheckout={() => setCustomerTab('checkout')}
                onContinueShopping={() => setCustomerTab('shop')}
              />
            )}

            {customerTab === 'checkout' && (
              <CustomerCheckout
                items={cart}
                onPlaceOrder={handlePlaceOrder}
                onBackToCart={() => setCustomerTab('cart')}
              />
            )}

            {customerTab === 'order_confirmation' && latestPlacedOrder && (
              <CustomerOrderConfirmation
                order={latestPlacedOrder}
                onTrackOrder={(orderId) => {
                  setActiveTrackingOrderId(orderId);
                  setCustomerTab('order_tracking');
                }}
                onViewTraceability={(code) => {
                  setSelectedBatchCode(code);
                  setCustomerTab('traceability');
                }}
                onContinueShopping={() => setCustomerTab('shop')}
              />
            )}

            {(customerTab === 'my_orders' || customerTab === 'orders') && (
              <CustomerMyOrders
                orders={orders}
                onTrackOrder={(orderId) => {
                  setActiveTrackingOrderId(orderId);
                  setCustomerTab('order_tracking');
                }}
                onViewTraceability={(code) => {
                  setSelectedBatchCode(code);
                  setCustomerTab('traceability');
                }}
                onShopHoney={() => setCustomerTab('shop')}
              />
            )}

            {customerTab === 'order_tracking' && (
              <CustomerOrderTracking
                order={activeTrackingOrder}
                onViewTraceability={(code) => {
                  setSelectedBatchCode(code);
                  setCustomerTab('traceability');
                }}
                onBackToOrders={() => setCustomerTab('my_orders')}
              />
            )}

            {customerTab === 'beekeepers' && (
              <CustomerBeekeepers
                beekeepers={beekeepers}
                onSelectBeekeeper={(bk) => {
                  setSelectedBeekeeperId(bk.id);
                  setCustomerTab('beekeeper_profile');
                }}
              />
            )}

            {customerTab === 'beekeeper_profile' && (
              <CustomerBeekeeperProfile
                beekeeper={activeBeekeeper}
                products={products}
                batches={batches}
                onSelectProduct={(p) => {
                  setSelectedProductId(p.id);
                  setCustomerTab('product_details');
                }}
                onAddToCart={handleAddToCart}
                onViewTraceability={(code) => {
                  setSelectedBatchCode(code);
                  setCustomerTab('traceability');
                }}
                onBack={() => setCustomerTab('beekeepers')}
              />
            )}

            {customerTab === 'wishlist' && (
              <CustomerWishlist
                products={products}
                wishlistIds={wishlistIds}
                onSelectProduct={(p) => {
                  setSelectedProductId(p.id);
                  setCustomerTab('product_details');
                }}
                onAddToCart={handleAddToCart}
                onRemoveWishlist={handleToggleWishlist}
                onShopHoney={() => setCustomerTab('shop')}
              />
            )}

            {customerTab === 'profile' && (
              <CustomerProfile
                user={customerUser}
                orders={orders}
                onUpdateUser={(up) => setCustomerUser(prev => ({ ...prev, ...up }))}
                onSwitchToBeekeeper={() => setAppMode('beekeeper')}
              />
            )}

            {customerTab === 'how_it_works' && (
              <HowHoneyChainWorks />
            )}
          </main>

          {/* Customer Footer */}
          <footer className="bg-white border-t border-[#d8c3ad]/40 mt-16 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
              <div className="space-y-3 md:col-span-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#855300] flex items-center justify-center text-white font-bold">
                    🍯
                  </div>
                  <span className="text-base font-black text-[#1f1b17]">Honey Chain</span>
                </div>
                <p className="text-[#534434] max-w-sm leading-relaxed">
                  Decentralized Smart Hive Monitoring & Direct-to-Consumer Honey Traceability Platform. Connecting artisanal Indian beekeepers with conscious honey lovers.
                </p>
                <div className="text-[11px] text-[#867461]">
                  © 2026 Honey Chain Technologies. Immutable Ledger Standards.
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-black text-[#1f1b17] uppercase tracking-wider text-[11px]">
                  Marketplace & Trust
                </div>
                <ul className="space-y-1.5 text-[#534434]">
                  <li>
                    <button onClick={() => setCustomerTab('shop')} className="hover:text-[#855300]">
                      Shop Honey
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCustomerTab('traceability')} className="hover:text-[#855300]">
                      Verify Batch Provenance
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCustomerTab('beekeepers')} className="hover:text-[#855300]">
                      Our Beekeepers
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCustomerTab('how_it_works')} className="hover:text-[#855300]">
                      How It Works
                    </button>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="font-black text-[#1f1b17] uppercase tracking-wider text-[11px]">
                  Portals & Modes
                </div>
                <ul className="space-y-1.5 text-[#534434]">
                  <li>
                    <button
                      onClick={() => {
                        setAppMode('beekeeper');
                        setBeekeeperTab('dashboard');
                      }}
                      className="text-[#855300] font-bold hover:underline"
                    >
                      🐝 Beekeeper Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowRoleModal(true)}
                      className="hover:text-[#855300]"
                    >
                      🔄 Role Switcher Modal
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setCustomerTab('qr_scanner')} className="hover:text-[#855300]">
                      📱 Smart QR Scanner
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
