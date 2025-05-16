
# Campus Network Monitor - Technical Documentation

## 📚 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Component Documentation](#component-documentation)
4. [Data Models](#data-models)
5. [State Management](#state-management)
6. [Mock Data](#mock-data)
7. [UI Components](#ui-components)
8. [Performance Considerations](#performance-considerations)
9. [Future Enhancements](#future-enhancements)

## Overview

The Campus Network Monitor is a real-time dashboard application designed to help IT administrators monitor and respond to network issues across a campus environment. The application provides visualizations for network health, device status, and performance metrics, as well as an alert system for timely issue resolution.

## Architecture

The application follows a component-based architecture using React and TypeScript. It is built with a modular approach to ensure maintainability and scalability.

### Key Technologies

- **React**: UI component library
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **shadcn/ui**: Pre-built UI components
- **Recharts**: Data visualization
- **Vite**: Build tool

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AlertsPanel.tsx  # Displays network alerts
│   ├── CampusMap.tsx    # Interactive map of campus
│   ├── NetworkDeviceList.tsx  # List of network devices
│   ├── NetworkStatusOverview.tsx  # Summary of network status
│   ├── ResponseTimeChart.tsx  # Response time visualization
│   └── ui/              # UI component library
├── lib/                 # Utilities and helpers
│   ├── mockData.ts      # Mock data for development
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # Utility functions
└── pages/               # Application pages
    └── Index.tsx        # Main dashboard page
```

## Component Documentation

### StatusCard

`StatusCard.tsx` is a reusable component that displays a metric with optional status indicator and icon.

#### Props

- `title`: String - Title of the card
- `value`: String or Number - Main value to display
- `status`: "healthy" | "warning" | "critical" (optional) - Status indicator
- `icon`: React.ReactNode (optional) - Icon to display
- `className`: String (optional) - Additional CSS classes

#### Usage Example

```tsx
<StatusCard 
  title="Network Uptime"
  value="99.9%" 
  status="healthy"
  icon={<Activity className="h-4 w-4" />}
/>
```

### NetworkStatusOverview

`NetworkStatusOverview.tsx` displays a grid of status cards showing overall network health metrics.

### CampusMap

`CampusMap.tsx` provides an interactive visual representation of buildings and their network status.

### NetworkDeviceList

`NetworkDeviceList.tsx` shows a filterable, searchable table of all network devices.

### AlertsPanel

`AlertsPanel.tsx` displays network alerts with severity indicators and filtering options.

### ResponseTimeChart

`ResponseTimeChart.tsx` visualizes historical response time data for selected buildings.

## Data Models

### NetworkDevice

```typescript
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
```

### Building

```typescript
export interface Building {
  id: string;
  name: string;
  coordinates: [number, number]; // x, y coordinates for the map
  devices: string[]; // IDs of devices in this building
  status: Status;
}
```

### Alert

```typescript
export interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  message: string;
  timestamp: string;
  severity: Status;
  resolved: boolean;
}
```

### MetricPoint

```typescript
export interface MetricPoint {
  timestamp: string;
  value: number;
}
```

### ResponseTimeData

```typescript
export interface ResponseTimeData {
  building: string;
  data: MetricPoint[];
}
```

## State Management

The application currently uses React's built-in state management (`useState`) for component-level state. For production use, consider implementing a more robust state management solution like React Query or Context API with reducers.

## Mock Data

The application uses mock data stored in `src/lib/mockData.ts`. This file provides:

- Sample network devices
- Building information
- Network alerts
- Response time data

In a production environment, this would be replaced with real API calls.

### Mock Data Utilities

- `getStatusCounts()`: Returns counts of devices by status
- `formatTime()`: Formats ISO strings to readable time
- `getRelativeTime()`: Converts timestamps to relative time (e.g., "2 min ago")

## UI Components

The project uses shadcn/ui components for a consistent design system. Key components include:

- Cards
- Tables
- Badges
- Buttons
- Selects
- Inputs

## Performance Considerations

- **Responsive Design**: UI is optimized for different screen sizes
- **Component Memoization**: Consider adding React.memo for components that receive frequent updates
- **Animation**: Pulse animation is used to highlight critical statuses
- **Data Management**: Large datasets should be paginated in production

## Future Enhancements

1. **Authentication System**: Add user login and role-based permissions
2. **Real-time Data**: Integrate WebSockets for live data updates
3. **Detailed Device Views**: Add drill-down pages for detailed device information
4. **Notifications**: Implement push notifications for critical alerts
5. **Historical Data Analysis**: Add more advanced data visualization and trend analysis
6. **Device Configuration**: Add capability to manage device settings
7. **Automated Issue Resolution**: Implement suggested actions for common issues
8. **Mobile App**: Develop companion mobile application for on-the-go monitoring

---

This documentation is intended to provide a comprehensive overview of the Campus Network Monitor application, its architecture, and component structure. For more specific implementation details, refer to the code comments in each file.
