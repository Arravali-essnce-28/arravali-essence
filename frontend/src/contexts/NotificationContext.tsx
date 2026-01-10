import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast, { Toast, ToastPosition, ToastOptions } from 'react-hot-toast';

// Notification Types
export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'order' | 'payment' | 'shipping' | 'promotion';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: string;
  duration?: number;
  persistent?: boolean;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  newsletter: boolean;
  stockAlerts: boolean;
  priceDrops: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  preferences: NotificationPreferences;
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void;
  showToast: (message: string, type?: NotificationType, options?: ToastOptions) => void;
  showOrderNotification: (orderNumber: string, status: string) => void;
  showPaymentNotification: (status: string, amount: number) => void;
  showShippingNotification: (trackingNumber: string, status: string) => void;
  showPromotionNotification: (title: string, discount: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Notification Templates
const notificationTemplates = {
  order: {
    success: { title: 'Order Confirmed!', icon: '📦', duration: 5000 },
    processing: { title: 'Order Processing', icon: '⚡', duration: 4000 },
    shipped: { title: 'Order Shipped!', icon: '🚚', duration: 6000 },
    delivered: { title: 'Order Delivered!', icon: '✅', duration: 5000 },
    cancelled: { title: 'Order Cancelled', icon: '❌', duration: 4000 }
  },
  payment: {
    success: { title: 'Payment Successful!', icon: '💳', duration: 4000 },
    failed: { title: 'Payment Failed', icon: '❌', duration: 6000 },
    refunded: { title: 'Payment Refunded', icon: '💰', duration: 5000 }
  },
  shipping: {
    dispatched: { title: 'Package Dispatched', icon: '📤', duration: 5000 },
    in_transit: { title: 'Package In Transit', icon: '🚛', duration: 4000 },
    out_for_delivery: { title: 'Out for Delivery', icon: '🏠', duration: 4000 }
  },
  promotion: {
    new_product: { title: 'New Product Alert!', icon: '🆕', duration: 5000 },
    sale: { title: 'Flash Sale!', icon: '🏷️', duration: 6000 },
    discount: { title: 'Special Offer!', icon: '💎', duration: 5000 },
    restock: { title: 'Back in Stock!', icon: '🔄', duration: 4000 }
  }
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: true,
    push: true,
    sms: false,
    orderUpdates: true,
    promotions: true,
    newsletter: true,
    stockAlerts: true,
    priceDrops: true
  });

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    const savedPreferences = localStorage.getItem('notificationPreferences');
    
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        setNotifications(parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
    
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
  }, []);

  // Save notifications to localStorage
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
  }, [preferences]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show toast notification
    if (notification.type !== 'info' || preferences.push) {
      showToast(notification.message, notification.type, {
        duration: notification.duration || 4000,
        icon: notification.icon
      });
    }

    // Browser notification if enabled
    if (preferences.push && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico'
      });
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.removeItem('notifications');
  };

  const updatePreferences = (newPreferences: Partial<NotificationPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const showToast = (message: string, type: NotificationType = 'info', options?: ToastOptions) => {
    const toastConfig = {
      duration: 4000,
      position: 'top-right' as ToastPosition,
      ...options
    };

    switch (type) {
      case 'success':
        toast.success(message, toastConfig);
        break;
      case 'error':
        toast.error(message, toastConfig);
        break;
      case 'warning':
        toast(message, { ...toastConfig, icon: '⚠️' });
        break;
      default:
        toast(message, toastConfig);
    }
  };

  const showOrderNotification = (orderNumber: string, status: string) => {
    const template = notificationTemplates.order[status as keyof typeof notificationTemplates.order];
    if (template && preferences.orderUpdates) {
      addNotification({
        type: 'order',
        title: template.title,
        message: `Order ${orderNumber} is ${status.replace('_', ' ')}`,
        icon: template.icon,
        duration: template.duration,
        action: {
          label: 'View Order',
          onClick: () => {
            window.location.href = `/orders/${orderNumber}`;
          }
        }
      });
    }
  };

  const showPaymentNotification = (status: string, amount: number) => {
    const template = notificationTemplates.payment[status as keyof typeof notificationTemplates.payment];
    if (template) {
      addNotification({
        type: 'payment',
        title: template.title,
        message: `Payment of £${amount.toFixed(2)} ${status}`,
        icon: template.icon,
        duration: template.duration
      });
    }
  };

  const showShippingNotification = (trackingNumber: string, status: string) => {
    const template = notificationTemplates.shipping[status as keyof typeof notificationTemplates.shipping];
    if (template && preferences.orderUpdates) {
      addNotification({
        type: 'shipping',
        title: template.title,
        message: `Tracking ${trackingNumber}: ${status.replace('_', ' ')}`,
        icon: template.icon,
        duration: template.duration,
        action: {
          label: 'Track Package',
          onClick: () => {
            window.open(`https://www.royalmail.com/track-your-item?trackNumber=${trackingNumber}`, '_blank');
          }
        }
      });
    }
  };

  const showPromotionNotification = (title: string, discount: number) => {
    if (preferences.promotions) {
      addNotification({
        type: 'promotion',
        title: title,
        message: `Save ${discount}% on your next order!`,
        icon: '🏷️',
        duration: 6000,
        action: {
          label: 'Shop Now',
          onClick: () => {
            window.location.href = '/shop';
          }
        }
      });
    }
  };

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default' && preferences.push) {
      Notification.requestPermission();
    }
  }, [preferences.push]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      preferences,
      unreadCount,
      addNotification,
      removeNotification,
      markAsRead,
      markAllAsRead,
      clearAll,
      updatePreferences,
      showToast,
      showOrderNotification,
      showPaymentNotification,
      showShippingNotification,
      showPromotionNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
