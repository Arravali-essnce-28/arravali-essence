import React from 'react';
import { Package, Truck, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface OrderTrackingCardProps {
  order: {
    id: string;
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
  onViewDetails: (orderNumber: string) => void;
}

const OrderTrackingCard: React.FC<OrderTrackingCardProps> = ({ order, onViewDetails }) => {
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
      cancelled: AlertCircle,
      returned: AlertCircle
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  const StatusIcon = getStatusIcon(order.status);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Order {order.order_number}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Placed on {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className={`flex items-center px-3 py-1.5 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
          <StatusIcon className="h-4 w-4 mr-1.5" />
          {order.status_label}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{order.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${order.progress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-500">Items:</span>
          <span className="ml-2 font-medium text-gray-900">{order.items_count}</span>
        </div>
        <div>
          <span className="text-gray-500">Total:</span>
          <span className="ml-2 font-medium text-gray-900">
            ${order.total_amount.toFixed(2)}
          </span>
        </div>
        {order.estimated_delivery && (
          <div className="col-span-2">
            <span className="text-gray-500">Est. Delivery:</span>
            <span className="ml-2 font-medium text-gray-900">
              {new Date(order.estimated_delivery).toLocaleDateString()}
            </span>
          </div>
        )}
        {order.tracking_number && (
          <div className="col-span-2">
            <span className="text-gray-500">Tracking:</span>
            <span className="ml-2 font-medium text-primary-600">
              {order.tracking_number}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={() => onViewDetails(order.order_number)}
        className="w-full bg-primary-50 text-primary-600 py-2 px-4 rounded-lg font-medium hover:bg-primary-100 transition-colors"
      >
        View Tracking Details
      </button>
    </div>
  );
};

export default OrderTrackingCard;
