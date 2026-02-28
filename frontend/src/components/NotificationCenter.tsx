import React from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../contexts/NotificationContext';

const NotificationCenter: React.FC = () => {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => navigate('/notifications')}
        className="relative p-2 text-gray-600 hover:text-amber-600 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationCenter;
