import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import OrderTrackingCard from '../components/OrderTrackingCard';
import { Package } from 'lucide-react';

type Order = {
  id: number;
  order_number: string;
  status: string;
  status_label: string;
  total_amount: number;
  created_at: string;
  estimated_delivery?: string;
  tracking_number?: string;
  progress: number;
  items_count: number;
};

const OrdersPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login', { replace: true });
    }
  }, [isLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await api.getUserOrders();
      if (response.error) {
        setError(response.error);
      } else {
        setOrders(response.orders || []);
      }
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (orderNumber: string) => {
    navigate(`/track/${orderNumber}`);
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500">Loading your orders…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-lg font-semibold">{error}</div>
          <button
            onClick={fetchOrders}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Try Again
          </button>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => (
          <OrderTrackingCard
            key={order.id}
            order={order}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-16">
          <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">
            When you place an order, you'll be able to track it here.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
          >
            Explore Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
