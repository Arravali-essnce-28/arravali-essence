import React from 'react';
import { Clock, Package, Truck, CheckCircle, MapPin } from 'lucide-react';

interface TrackingTimelineProps {
  timeline: Array<{
    status: string;
    status_label: string;
    description: string;
    location?: string;
    timestamp?: string;
    is_completed: boolean;
    icon: string;
    color: string;
  }>;
  currentProgress: number;
}

const TrackingTimeline: React.FC<TrackingTimelineProps> = ({ timeline, currentProgress }) => {
  const getStatusIcon = (iconName: string) => {
    const icons = {
      clock: Clock,
      'check-circle': CheckCircle,
      package: Package,
      box: Package,
      truck: Truck,
      navigation: Truck,
      home: CheckCircle,
      'check-double': CheckCircle,
      'times-circle': CheckCircle,
      undo: Package,
      circle: Clock
    };
    const Icon = icons[iconName as keyof typeof icons] || Clock;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <div className="relative">
      <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200" />
      
      {timeline.map((item, index) => (
        <div key={index} className="relative flex items-start mb-8 last:mb-0">
          <div 
            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 z-10 ${
              item.is_completed 
                ? 'bg-white border-green-500' 
                : 'bg-gray-100 border-gray-300'
            }`}
          >
            <div style={{ color: item.is_completed ? item.color : '#9CA3AF' }}>
              {getStatusIcon(item.icon)}
            </div>
          </div>
          
          <div className="ml-6 flex-1">
            <div className="flex items-center justify-between">
              <h4 className={`font-semibold ${
                item.is_completed ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {item.status_label}
              </h4>
              {item.timestamp && (
                <span className="text-sm text-gray-500">{item.timestamp}</span>
              )}
            </div>
            <p className={`text-sm mt-1 ${
              item.is_completed ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {item.description}
            </p>
            {item.location && (
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                {item.location}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackingTimeline;
