import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, MapPin, Truck, Clock, CheckCircle } from 'lucide-react';
import api from '../services/api';
import TrackingTimeline from '../components/TrackingTimeline';

interface OrderDetail {
  id: number;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  estimated_delivery?: string;
  tracking_number?: string;
  carrier?: string;
}

interface TrackingItem {
  status: string;
  status_label: string;
  description: string;
  location?: string;
  timestamp: string;
  progress: number;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

const OrderTrackingPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [trackingHistory, setTrackingHistory] = useState<TrackingItem[]>([]);
  const [timeline, setTimeline] = useState<any[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    if (orderNumber) {
      fetchOrderDetails();
      fetchTrackingTimeline();
    }
  }, [orderNumber]);

  const fetchOrderDetails = async () => {
    try {
      const response = await api.trackOrder(orderNumber!);
      if (response.error) {
        setError(response.error);
      } else {
        setOrder(response.order);
        setTrackingHistory(response.tracking_history);
        setItems(response.items);
      }
    } catch (err) {
      setError('Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  const fetchTrackingTimeline = async () => {
    try {
      const response = await api.getOrderTrackingTimeline(orderNumber!);
      if (!response.error) {
        setTimeline(response.timeline);
      }
    } catch (err) {
      console.error('Failed to fetch timeline:', err);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      confirmed: 'bg-blue-100 text-blue-700 border-blue-200',
      processing: 'bg-purple-100 text-purple-700 border-purple-200',
      packed: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      shipped: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      in_transit: 'bg-sky-100 text-sky-700 border-sky-200',
      out_for_delivery: 'bg-green-100 text-green-700 border-green-200',
      delivered: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200',
      returned: 'bg-orange-100 text-orange-700 border-orange-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: Clock,
      confirmed: CheckCircle,
      processing: Package,
      packed: Package,
      shipped: Truck,
      in_transit: Truck,
      out_for_delivery: Truck,
      delivered: CheckCircle,
      cancelled: Clock,
      returned: Package
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="h-12 w-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-gray-500">Loading tracking information…</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-red-500 text-lg font-semibold">{error || 'Order not found'}</div>
          <button
            onClick={() => navigate('/orders')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(order.status);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate('/orders')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Orders
      </button>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Order Header */}
        <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Order {order.order_number}
              </h1>
              <p className="text-gray-600">
                Placed on {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className={`flex items-center px-4 py-2 rounded-full border text-sm font-semibold ${getStatusColor(order.status)}`}>
              <StatusIcon className="h-5 w-5 mr-2" />
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tracking Timeline */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tracking Timeline</h2>
              {timeline.length > 0 ? (
                <TrackingTimeline 
                  timeline={timeline} 
                  currentProgress={trackingHistory[0]?.progress || 0} 
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No tracking updates available</p>
                </div>
              )}
            </div>

            {/* Order Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
              
              {/* Shipping Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-gray-900 mb-3">Shipping Information</h3>
                <div className="space-y-2 text-sm">
                  {order.tracking_number && (
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">Tracking:</span>
                      <span className="ml-2 font-medium">{order.tracking_number}</span>
                    </div>
                  )}
                  {order.carrier && (
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">Carrier:</span>
                      <span className="ml-2 font-medium">{order.carrier}</span>
                    </div>
                  )}
                  {order.estimated_delivery && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">Est. Delivery:</span>
                      <span className="ml-2 font-medium">
                        {new Date(order.estimated_delivery).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total:</span>
                    <span className="text-xl font-bold text-primary-600">
                      ${order.total_amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;
