
import { NetworkDevice, Building, Alert, ResponseTimeData, Status } from './types';

// Network Devices
export const devices: NetworkDevice[] = [
  {
    id: "r-001",
    name: "Main Campus Router",
    type: "router",
    location: "Admin Building",
    status: "healthy",
    ipAddress: "10.0.1.1",
    lastUpdated: new Date(Date.now() - 120000).toISOString(),
    responseTime: 5
  },
  {
    id: "s-001",
    name: "CS Dept Switch",
    type: "switch",
    location: "Computer Science Building",
    status: "healthy",
    ipAddress: "10.0.2.1",
    lastUpdated: new Date(Date.now() - 180000).toISOString(),
    responseTime: 8
  },
  {
    id: "ap-001",
    name: "Library AP 1",
    type: "access-point",
    location: "Library",
    status: "warning",
    ipAddress: "10.0.3.1",
    lastUpdated: new Date(Date.now() - 240000).toISOString(),
    responseTime: 45
  },
  {
    id: "s-002",
    name: "Dorm Block A Switch",
    type: "switch",
    location: "Residential Hall A",
    status: "critical",
    ipAddress: "10.0.4.1",
    lastUpdated: new Date(Date.now() - 360000).toISOString(),
    responseTime: 250
  },
  {
    id: "ap-002",
    name: "Student Center AP",
    type: "access-point",
    location: "Student Center",
    status: "healthy",
    ipAddress: "10.0.5.1",
    lastUpdated: new Date(Date.now() - 60000).toISOString(),
    responseTime: 12
  },
  {
    id: "srv-001",
    name: "Authentication Server",
    type: "server",
    location: "Data Center",
    status: "healthy",
    ipAddress: "10.0.6.1",
    lastUpdated: new Date(Date.now() - 90000).toISOString(),
    responseTime: 3
  }
];

// Campus Buildings
export const buildings: Building[] = [
  {
    id: "bld-001",
    name: "Admin Building",
    coordinates: [100, 150],
    devices: ["r-001"],
    status: "healthy"
  },
  {
    id: "bld-002",
    name: "Computer Science Building",
    coordinates: [250, 100],
    devices: ["s-001"],
    status: "healthy"
  },
  {
    id: "bld-003",
    name: "Library",
    coordinates: [400, 200],
    devices: ["ap-001"],
    status: "warning"
  },
  {
    id: "bld-004",
    name: "Residential Hall A",
    coordinates: [150, 300],
    devices: ["s-002"],
    status: "critical"
  },
  {
    id: "bld-005",
    name: "Student Center",
    coordinates: [300, 350],
    devices: ["ap-002"],
    status: "healthy"
  },
  {
    id: "bld-006",
    name: "Data Center",
    coordinates: [450, 100],
    devices: ["srv-001"],
    status: "healthy"
  }
];

// Alerts
export const alerts: Alert[] = [
  {
    id: "alert-001",
    deviceId: "ap-001",
    deviceName: "Library AP 1",
    message: "High latency detected",
    timestamp: new Date(Date.now() - 240000).toISOString(),
    severity: "warning",
    resolved: false
  },
  {
    id: "alert-002",
    deviceId: "s-002",
    deviceName: "Dorm Block A Switch",
    message: "Device unreachable",
    timestamp: new Date(Date.now() - 360000).toISOString(),
    severity: "critical",
    resolved: false
  },
  {
    id: "alert-003",
    deviceId: "r-001",
    deviceName: "Main Campus Router",
    message: "High CPU usage",
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    severity: "warning",
    resolved: true
  },
  {
    id: "alert-004",
    deviceId: "ap-002",
    deviceName: "Student Center AP",
    message: "Intermittent connectivity",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    severity: "warning",
    resolved: true
  }
];

// Generate response time data for the past 24 hours
const generateTimeSeriesData = (baseValue: number, variance: number): ResponseTimeData => {
  const now = Date.now();
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      timestamp: new Date(now - (23 - i) * 3600000).toISOString(),
      value: baseValue + (Math.random() * variance * 2 - variance)
    });
  }
  return data;
};

export const responseTimeData: ResponseTimeData[] = [
  {
    building: "Admin Building",
    data: generateTimeSeriesData(10, 5)
  },
  {
    building: "Computer Science Building",
    data: generateTimeSeriesData(12, 7)
  },
  {
    building: "Library",
    data: generateTimeSeriesData(25, 20)
  },
  {
    building: "Residential Hall A",
    data: generateTimeSeriesData(40, 40)
  },
  {
    building: "Student Center",
    data: generateTimeSeriesData(15, 8)
  }
];

// Network Status Overview
export const getStatusCounts = () => {
  const counts = { healthy: 0, warning: 0, critical: 0, total: devices.length };
  devices.forEach(device => {
    counts[device.status as Status]++;
  });
  return counts;
};

// Utility functions
export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  return date.toLocaleTimeString();
};

export const getRelativeTime = (isoString: string): string => {
  const date = new Date(isoString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds} sec ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hrs ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
};
