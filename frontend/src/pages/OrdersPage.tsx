import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type Order = {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  total: string;
};

const mockOrders: Order[] = [
  {
    id: '#AE-1042',
    date: 'Nov 29, 2025',
    status: 'delivered',
    total: '$42.50',
  },
  {
    id: '#AE-1038',
    date: 'Nov 18, 2025',
    status: 'shipped',
    total: '$27.00',
  },
];

const statusBadge: Record<Order['status'], string> = {
  processing: 'bg-amber-100 text-amber-700',
  shipped: 'bg-blue-100 text-blue-700',
  delivered: 'bg-emerald-100 text-emerald-700',
};

const OrdersPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, user, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500">Loading your orders…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order history</h1>
          <p className="mt-2 text-sm text-gray-500">
            Track your Arravali Essence purchases and delivery status.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center px-4 py-2 rounded-full bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
        >
          Continue shopping
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-3xl border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {mockOrders.map((order) => (
            <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-6">
              <div>
                <p className="text-sm font-semibold text-gray-900">Order {order.id}</p>
                <p className="text-xs text-gray-500 mt-1">Placed on {order.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusBadge[order.status]}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
                <p className="text-base font-semibold text-gray-900">{order.total}</p>
                <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>

        {mockOrders.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-lg font-semibold text-gray-900">No orders yet</p>
            <p className="mt-2 text-sm text-gray-500">
              When you place an order, you’ll be able to track it here.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center px-5 py-2.5 rounded-full bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
            >
              Explore products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
