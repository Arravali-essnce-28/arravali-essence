import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Settings, 
  Trash2, 
  Package, 
  CreditCard, 
  Truck, 
  Tag, 
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowLeft
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotifications, Notification } from '../contexts/NotificationContext';
import { useAuth } from '../contexts/AuthContext';

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAll,
    preferences,
    updatePreferences 
  } = useNotifications();
  
  const [showSettings, setShowSettings] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'orders' | 'promotions'>('all');

  const getNotificationIcon = (type: string, icon?: string) => {
    if (icon) return icon;
    
    switch (type) {
      case 'order': return <Package className="w-5 h-5" />;
      case 'payment': return <CreditCard className="w-5 h-5" />;
      case 'shipping': return <Truck className="w-5 h-5" />;
      case 'promotion': return <Tag className="w-5 h-5" />;
      case 'success': return <CheckCircle className="w-5 h-5" />;
      case 'error': return <XCircle className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500 bg-green-50';
      case 'error': return 'text-red-500 bg-red-50';
      case 'warning': return 'text-yellow-500 bg-yellow-50';
      case 'order': return 'text-blue-500 bg-blue-50';
      case 'payment': return 'text-purple-500 bg-purple-50';
      case 'shipping': return 'text-indigo-500 bg-indigo-50';
      case 'promotion': return 'text-pink-500 bg-pink-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.read;
      case 'orders': return ['order', 'payment', 'shipping'].includes(notification.type);
      case 'promotions': return notification.type === 'promotion';
      default: return true;
    }
  });

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.action) {
      notification.action.onClick();
    }
  };

  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-6 sm:py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-600 hover:text-amber-600 transition-colors rounded-lg hover:bg-amber-50 inline-flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="p-8 sm:p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full mb-6"
              >
                <Bell className="w-10 h-10 text-amber-600" />
              </motion.div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Stay Updated!
              </h1>
              
              <p className="text-lg text-gray-600 mb-2">
                Sign in to receive personalized notifications
              </p>
              
              <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
                Get instant updates on your orders, exclusive promotions, special offers, and more. Never miss out on what matters to you!
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Order updates</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Exclusive deals</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Price alerts</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/login"
                  className="px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg w-full sm:w-auto text-center"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-white text-amber-600 font-semibold rounded-lg border-2 border-amber-600 hover:bg-amber-50 transition-colors w-full sm:w-auto text-center"
                >
                  Create Account
                </Link>
              </div>

              
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-8 py-6 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <Package className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Track Orders</p>
                  <p className="text-xs text-gray-600 mt-1">Real-time updates</p>
                </div>
                <div>
                  <Tag className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Special Offers</p>
                  <p className="text-xs text-gray-600 mt-1">Exclusive discounts</p>
                </div>
                <div>
                  <Bell className="w-6 h-6 text-amber-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">Stay Informed</p>
                  <p className="text-xs text-gray-600 mt-1">Never miss updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-gray-600 hover:text-amber-600 transition-colors rounded-lg hover:bg-amber-50"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Notifications</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600 mt-1">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg transition-colors ${
                  showSettings 
                    ? 'text-amber-600 bg-amber-50' 
                    : 'text-gray-500 hover:text-amber-600 hover:bg-amber-50'
                }`}
              >
                <Settings className="w-5 h-5" />
              </button>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-3 py-2 text-sm text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                >
                  Mark all read
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: 'all', label: 'All' },
              { id: 'unread', label: 'Unread' },
              { id: 'orders', label: 'Orders' },
              { id: 'promotions', label: 'Promotions' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 sm:p-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">Notification Preferences</h3>
                <div className="space-y-3">
                  {Object.entries(preferences).map(([key, value]) => (
                    <label key={key} className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updatePreferences({ [key]: e.target.checked })}
                        className="rounded text-amber-600 focus:ring-amber-500 w-5 h-5"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No notifications</p>
              <p className="text-sm mt-1">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`p-4 sm:p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-amber-50 border-l-4 border-l-amber-500' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
                    <div className={`p-3 rounded-full flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type, notification.icon)}
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-2 mb-2">
                        <h3 className="text-base font-semibold text-gray-900">
                          {notification.title}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-2">
                        <span className="text-xs text-gray-500 font-medium">
                          {formatTime(notification.timestamp)}
                        </span>
                        {notification.action && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              notification.action!.onClick();
                            }}
                            className="px-4 py-2 text-sm text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors font-medium"
                          >
                            {notification.action.label}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Clear All Button */}
        {notifications.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={clearAll}
              className="px-6 py-3 text-sm text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center mx-auto font-medium"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
