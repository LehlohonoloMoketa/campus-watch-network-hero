
import React from 'react';
import { getStatusCounts } from '@/lib/mockData';
import StatusCard from './StatusCard';
import { Activity, AlertTriangle, CheckCircle, Router, Wifi } from 'lucide-react';

const NetworkStatusOverview = () => {
  const statusCounts = getStatusCounts();
  const upPercentage = ((statusCounts.healthy / statusCounts.total) * 100).toFixed(1);
  
  const responseTimeAvg = '15ms';
  
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatusCard 
        title="Network Uptime"
        value={`${upPercentage}%`} 
        status={Number(upPercentage) > 95 ? "healthy" : Number(upPercentage) > 85 ? "warning" : "critical"}
        icon={<Activity className="h-4 w-4" />}
      />
      
      <StatusCard 
        title="Online Devices" 
        value={`${statusCounts.healthy} / ${statusCounts.total}`}
        status={statusCounts.critical > 0 ? "critical" : statusCounts.warning > 0 ? "warning" : "healthy"}
        icon={<Router className="h-4 w-4" />}
      />
      
      <StatusCard 
        title="Avg Response Time" 
        value={responseTimeAvg}
        status={responseTimeAvg < "20ms" ? "healthy" : responseTimeAvg < "50ms" ? "warning" : "critical"}
        icon={<Wifi className="h-4 w-4" />}
      />
      
      <StatusCard 
        title="Active Alerts" 
        value={statusCounts.warning + statusCounts.critical}
        status={statusCounts.critical > 0 ? "critical" : statusCounts.warning > 0 ? "warning" : "healthy"}
        icon={<AlertTriangle className="h-4 w-4" />}
      />
    </div>
  );
};

export default NetworkStatusOverview;
