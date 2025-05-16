
import React from 'react';
import NetworkStatusOverview from '@/components/NetworkStatusOverview';
import CampusMap from '@/components/CampusMap';
import NetworkDeviceList from '@/components/NetworkDeviceList';
import AlertsPanel from '@/components/AlertsPanel';
import ResponseTimeChart from '@/components/ResponseTimeChart';
import { Activity } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campus Network Monitor</h1>
            <p className="text-muted-foreground mt-1">Real-time monitoring and incident management system</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-sm">
            <Activity className="h-4 w-4 mr-2" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        
        {/* Network Status Overview */}
        <div className="mb-8">
          <NetworkStatusOverview />
        </div>
        
        {/* Main content */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Campus Map */}
          <CampusMap />
          
          {/* Alerts Panel */}
          <AlertsPanel />

          {/* Network Devices List */}
          <NetworkDeviceList />
          
          {/* Response Time Chart */}
          <ResponseTimeChart />
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Campus Network Monitoring System &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
