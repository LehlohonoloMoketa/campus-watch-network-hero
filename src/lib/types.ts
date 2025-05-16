
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
