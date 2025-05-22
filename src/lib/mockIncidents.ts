
import { Incident } from './types';
import { buildings } from './mockData';

// Mock incidents data
export const incidents: Incident[] = [
  {
    id: 'inc-1',
    title: 'Wi-Fi Connectivity Issues',
    description: 'Unable to connect to campus Wi-Fi near the library entrance',
    location: 'Library',
    coordinates: [400, 200], // Matching library coordinates from buildings data
    buildingId: 'bldg-3',
    reportedBy: 'user-1',
    reporterName: 'John Doe',
    reporterRole: 'student',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'investigating',
    priority: 'medium'
  },
  {
    id: 'inc-2',
    title: 'Network Outage',
    description: 'Complete network outage in Dormitory A, affecting all students',
    location: 'Dormitory A',
    coordinates: [150, 300],
    buildingId: 'bldg-4',
    reportedBy: 'user-2',
    reporterName: 'Jane Smith',
    reporterRole: 'staff',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: 'resolved',
    priority: 'high'
  },
  {
    id: 'inc-3',
    title: 'Suspicious Network Activity',
    description: 'Unusual login attempts detected from Science Building computer lab',
    location: 'Science Building',
    coordinates: [250, 100],
    buildingId: 'bldg-2',
    reportedBy: 'user-3',
    reporterName: 'Admin User',
    reporterRole: 'admin',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    status: 'pending',
    priority: 'critical'
  }
];

// Function to add a new incident
export const addIncident = (incident: Omit<Incident, 'id' | 'timestamp' | 'status'>): Incident => {
  const newIncident: Incident = {
    ...incident,
    id: `inc-${incidents.length + 1}`,
    timestamp: new Date().toISOString(),
    status: 'pending'
  };
  
  incidents.unshift(newIncident);
  return newIncident;
};

// Function to get building by coordinates
export const getBuildingByCoordinates = (x: number, y: number, radius = 50): string | undefined => {
  const building = buildings.find(b => {
    const [bx, by] = b.coordinates;
    const distance = Math.sqrt(Math.pow(bx - x, 2) + Math.pow(by - y, 2));
    return distance <= radius;
  });
  
  return building?.name;
};
