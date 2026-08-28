import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { Loader2, Package, ShoppingCart, TrendingUp, PoundSterling } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await api.getAdminStats();
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
        setTopProducts(data.topProducts);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    { label: 'Total Sales', value: '£' + Number(stats?.total_sales || 0).toFixed(2), icon: PoundSterling, color: 'text-slate-700', bg: 'bg-slate-100' },
    { label: 'Total Orders', value: stats?.total_orders || 0, icon: ShoppingCart, color: 'text-slate-700', bg: 'bg-slate-100' },
    { label: 'Total Products', value: stats?.total_products || 0, icon: Package, color: 'text-slate-700', bg: 'bg-slate-100' },
    { label: 'Pending Orders', value: stats?.pending_orders || 0, icon: TrendingUp, color: 'text-amber-700', bg: 'bg-amber-50' },
  ];

  return (
    <AdminLayout>
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-xs text-slate-500 mt-0.5">Overview of store activity and sales performance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                <h3 className="text-xl font-semibold text-slate-900">{stat.value}</h3>
              </div>
              <div className={`p-2.5 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Recent Orders</h2>
              <p className="text-[11px] text-slate-400">Latest customer purchases</p>
            </div>
            <Link to="/admin/orders" className="text-xs text-slate-600 hover:text-slate-900 font-medium">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/60 border-b border-slate-100 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order) => {
                  let customerName = 'Customer';
                  try {
                    const parsed = typeof order.shipping_address === 'string' ? JSON.parse(order.shipping_address) : order.shipping_address;
                    customerName = parsed.name || `${parsed.first_name || ''} ${parsed.last_name || ''}`.trim() || order.user?.name || 'Customer';
                  } catch {
                    customerName = order.user?.name || 'Customer';
                  }

                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-3 font-medium text-slate-900">#{order.order_number || order.id}</td>
                      <td className="px-5 py-3 text-slate-600 truncate max-w-[140px]">{customerName}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-normal capitalize border ${
                          order.status === 'delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                          order.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : 
                          order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' : 
                          'bg-slate-100 text-slate-700 border-slate-200'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right font-medium text-slate-900">£{Number(order.total_amount || 0).toFixed(2)}</td>
                    </tr>
                  );
                })}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-slate-400">No recent orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Top Products</h2>
              <p className="text-[11px] text-slate-400">Featured store items</p>
            </div>
            <Link to="/admin/products" className="text-xs text-slate-600 hover:text-slate-900 font-medium">
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {topProducts.map((product) => (
              <div key={product.id} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero.jpg';
                    }}
                  />
                  <div className="min-w-0">
                    <h3 className="text-xs font-medium text-slate-900 truncate">{product.name}</h3>
                    <p className="text-[11px] text-slate-400">{product.category?.name || 'Spices'}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-slate-900">£{Number(product.price).toFixed(2)}</p>
                  <p className={`text-[10px] ${product.quantity > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                    {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            ))}
            {topProducts.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-400">No products found</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
