
export type Status = "healthy" | "warning" | "critical";

export interface NetworkDevice {
  id: string;
  name: string;
  type: "router" | "switch" | "access-point" | "server";
  location: string;
  status: Status;
  ipAddress: string;
  lastUpdated: string;
  responseTime: number; // in ms
}

export interface Building {
  id: string;
  name: string;
  coordinates: [number, number]; // x, y coordinates for the map
  devices: string[]; // IDs of devices in this building
  status: Status;
}

export interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  message: string;
  timestamp: string;
  severity: Status;
  resolved: boolean;
}

export interface MetricPoint {
  timestamp: string;
  value: number;
}

export interface ResponseTimeData {
  building: string;
  data: MetricPoint[];
}

// New types for user authentication and incident reporting
export type UserRole = "student" | "staff" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  location: string;
  coordinates: [number, number];
  buildingId?: string;
  reportedBy: string;
  reporterName: string;
  reporterRole: UserRole;
  timestamp: string;
  status: "pending" | "investigating" | "resolved" | "dismissed";
  priority: "low" | "medium" | "high" | "critical";
  assignedTo?: string;
}
