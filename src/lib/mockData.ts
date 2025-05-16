
import { NetworkDevice, Building, Alert, MetricPoint, ResponseTimeData, Status } from './types';

// Mock network devices
export const devices: NetworkDevice[] = [
  {
    id: 'dev-1',
    name: 'Primary Router',
    type: 'router',
    location: 'Admin Building',
    status: 'healthy',
    ipAddress: '192.168.1.1',
    lastUpdated: new Date(Date.now() - 120000).toISOString(),
    responseTime: 5
  },
  {
    id: 'dev-2',
    name: 'Science Lab Switch',
    type: 'switch',
    location: 'Science Building',
    status: 'warning',
    ipAddress: '192.168.2.1',
    lastUpdated: new Date(Date.now() - 360000).toISOString(),
    responseTime: 35
  },
  {
    id: 'dev-3',
    name: 'Library AP-1',
    type: 'access-point',
    location: 'Library',
    status: 'healthy',
    ipAddress: '192.168.3.10',
    lastUpdated: new Date(Date.now() - 90000).toISOString(),
    responseTime: 12
  },
  {
    id: 'dev-4',
    name: 'Dorm Block-A Router',
    type: 'router',
    location: 'Dormitory A',
    status: 'critical',
    ipAddress: '192.168.4.1',
    lastUpdated: new Date(Date.now() - 600000).toISOString(),
    responseTime: 120
  },
  {
    id: 'dev-5',
    name: 'Admin Server',
    type: 'server',
    location: 'Admin Building',
    status: 'healthy',
    ipAddress: '192.168.1.10',
    lastUpdated: new Date(Date.now() - 180000).toISOString(),
    responseTime: 8
  },
  {
    id: 'dev-6',
    name: 'Engineering AP-1',
    type: 'access-point',
    location: 'Engineering Building',
    status: 'healthy',
    ipAddress: '192.168.5.10',
    lastUpdated: new Date(Date.now() - 150000).toISOString(),
    responseTime: 15
  },
  {
    id: 'dev-7',
    name: 'Student Center Switch',
    type: 'switch',
    location: 'Student Center',
    status: 'warning',
    ipAddress: '192.168.6.1',
    lastUpdated: new Date(Date.now() - 420000).toISOString(),
    responseTime: 45
  }
];

// Mock buildings
export const buildings: Building[] = [
  {
    id: 'bldg-1',
    name: 'Admin Building',
    coordinates: [100, 150],
    devices: ['dev-1', 'dev-5'],
    status: 'healthy'
  },
  {
    id: 'bldg-2',
    name: 'Science Building',
    coordinates: [250, 100],
    devices: ['dev-2'],
    status: 'warning'
  },
  {
    id: 'bldg-3',
    name: 'Library',
    coordinates: [400, 200],
    devices: ['dev-3'],
    status: 'healthy'
  },
  {
    id: 'bldg-4',
    name: 'Dormitory A',
    coordinates: [150, 300],
    devices: ['dev-4'],
    status: 'critical'
  },
  {
    id: 'bldg-5',
    name: 'Engineering Building',
    coordinates: [300, 350],
    devices: ['dev-6'],
    status: 'healthy'
  },
  {
    id: 'bldg-6',
    name: 'Student Center',
    coordinates: [450, 100],
    devices: ['dev-7'],
    status: 'warning'
  }
];

// Mock alerts
export const alerts: Alert[] = [
  {
    id: 'alert-1',
    deviceId: 'dev-4',
    deviceName: 'Dorm Block-A Router',
    message: 'Device is offline and unreachable',
    timestamp: new Date(Date.now() - 600000).toISOString(),
    severity: 'critical',
    resolved: false
  },
  {
    id: 'alert-2',
    deviceId: 'dev-2',
    deviceName: 'Science Lab Switch',
    message: 'High latency detected (35ms)',
    timestamp: new Date(Date.now() - 360000).toISOString(),
    severity: 'warning',
    resolved: false
  },
  {
    id: 'alert-3',
    deviceId: 'dev-7',
    deviceName: 'Student Center Switch',
    message: 'Packet loss detected (5%)',
    timestamp: new Date(Date.now() - 420000).toISOString(),
    severity: 'warning',
    resolved: false
  },
  {
    id: 'alert-4',
    deviceId: 'dev-1',
    deviceName: 'Primary Router',
    message: 'Memory usage above 90%',
    timestamp: new Date(Date.now() - 900000).toISOString(),
    severity: 'warning',
    resolved: true
  },
  {
    id: 'alert-5',
    deviceId: 'dev-5',
    deviceName: 'Admin Server',
    message: 'Service restarted successfully',
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    severity: 'healthy',
    resolved: true
  }
];

// Mock response time data - Fix the structure to match the ResponseTimeData type
export const responseTimeData: ResponseTimeData[] = [
  {
    building: 'Admin Building',
    data: [
      { timestamp: new Date(Date.now() - 3600000).toISOString(), value: 5 },
      { timestamp: new Date(Date.now() - 3000000).toISOString(), value: 6 },
      { timestamp: new Date(Date.now() - 2400000).toISOString(), value: 5 },
      { timestamp: new Date(Date.now() - 1800000).toISOString(), value: 7 },
      { timestamp: new Date(Date.now() - 1200000).toISOString(), value: 8 },
      { timestamp: new Date(Date.now() - 600000).toISOString(), value: 5 }
    ]
  },
  {
    building: 'Science Building',
    data: [
      { timestamp: new Date(Date.now() - 3600000).toISOString(), value: 15 },
      { timestamp: new Date(Date.now() - 3000000).toISOString(), value: 18 },
      { timestamp: new Date(Date.now() - 2400000).toISOString(), value: 22 },
      { timestamp: new Date(Date.now() - 1800000).toISOString(), value: 28 },
      { timestamp: new Date(Date.now() - 1200000).toISOString(), value: 32 },
      { timestamp: new Date(Date.now() - 600000).toISOString(), value: 35 }
    ]
  },
  {
    building: 'Library',
    data: [
      { timestamp: new Date(Date.now() - 3600000).toISOString(), value: 10 },
      { timestamp: new Date(Date.now() - 3000000).toISOString(), value: 12 },
      { timestamp: new Date(Date.now() - 2400000).toISOString(), value: 9 },
      { timestamp: new Date(Date.now() - 1800000).toISOString(), value: 11 },
      { timestamp: new Date(Date.now() - 1200000).toISOString(), value: 13 },
      { timestamp: new Date(Date.now() - 600000).toISOString(), value: 12 }
    ]
  },
  {
    building: 'Dormitory A',
    data: [
      { timestamp: new Date(Date.now() - 3600000).toISOString(), value: 25 },
      { timestamp: new Date(Date.now() - 3000000).toISOString(), value: 30 },
      { timestamp: new Date(Date.now() - 2400000).toISOString(), value: 45 },
      { timestamp: new Date(Date.now() - 1800000).toISOString(), value: 60 },
      { timestamp: new Date(Date.now() - 1200000).toISOString(), value: 90 },
      { timestamp: new Date(Date.now() - 600000).toISOString(), value: 120 }
    ]
  },
  {
    building: 'Engineering Building',
    data: [
      { timestamp: new Date(Date.now() - 3600000).toISOString(), value: 12 },
      { timestamp: new Date(Date.now() - 3000000).toISOString(), value: 13 },
      { timestamp: new Date(Date.now() - 2400000).toISOString(), value: 14 },
      { timestamp: new Date(Date.now() - 1800000).toISOString(), value: 15 },
      { timestamp: new Date(Date.now() - 1200000).toISOString(), value: 14 },
      { timestamp: new Date(Date.now() - 600000).toISOString(), value: 15 }
    ]
  },
  {
    building: 'Student Center',
    data: [
      { timestamp: new Date(Date.now() - 3600000).toISOString(), value: 22 },
      { timestamp: new Date(Date.now() - 3000000).toISOString(), value: 25 },
      { timestamp: new Date(Date.now() - 2400000).toISOString(), value: 30 },
      { timestamp: new Date(Date.now() - 1800000).toISOString(), value: 35 },
      { timestamp: new Date(Date.now() - 1200000).toISOString(), value: 40 },
      { timestamp: new Date(Date.now() - 600000).toISOString(), value: 45 }
    ]
  }
];

// Utility functions for mocked data
export const getStatusCounts = () => {
  const counts = {
    healthy: 0,
    warning: 0,
    critical: 0,
    total: devices.length
  };
  
  devices.forEach(device => {
    counts[device.status]++;
  });
  
  return counts;
};

export const formatTime = (isoString: string) => {
  return new Date(isoString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const getRelativeTime = (isoString: string) => {
  const date = new Date(isoString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
};

