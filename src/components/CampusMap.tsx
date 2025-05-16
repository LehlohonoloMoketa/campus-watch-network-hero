
import React from 'react';
import { buildings, devices } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

const CampusMap = () => {
  const mapWidth = 600;
  const mapHeight = 400;
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "healthy": return "#10b981";
      case "warning": return "#f59e0b";
      case "critical": return "#ef4444";
      default: return "#10b981";
    }
  };

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Campus Network Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative border rounded-lg overflow-hidden" style={{ height: mapHeight, width: '100%' }}>
          <svg width="100%" height="100%" viewBox={`0 0 ${mapWidth} ${mapHeight}`}>
            {/* Connection lines */}
            <line x1="100" y1="150" x2="250" y2="100" className="network-line" stroke="#94a3b8" strokeWidth="2" />
            <line x1="100" y1="150" x2="400" y2="200" className="network-line" stroke="#94a3b8" strokeWidth="2" />
            <line x1="100" y1="150" x2="150" y2="300" className="network-line" stroke="#ef4444" strokeWidth="2" />
            <line x1="100" y1="150" x2="300" y2="350" className="network-line" stroke="#94a3b8" strokeWidth="2" />
            <line x1="100" y1="150" x2="450" y2="100" className="network-line" stroke="#94a3b8" strokeWidth="2" />
            <line x1="250" y1="100" x2="400" y2="200" className="network-line" stroke="#f59e0b" strokeWidth="2" />
            
            {/* Buildings */}
            {buildings.map((building) => (
              <g key={building.id}>
                <circle
                  cx={building.coordinates[0]}
                  cy={building.coordinates[1]}
                  r={20}
                  fill={getStatusColor(building.status)}
                  strokeWidth={2}
                  stroke="#ffffff"
                  className={cn(building.status === "critical" && "pulse")}
                />
                <text
                  x={building.coordinates[0]}
                  y={building.coordinates[1] + 40}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="12"
                >
                  {building.name}
                </text>
              </g>
            ))}
          </svg>
          
          <div className="absolute bottom-2 right-2 bg-white p-2 rounded shadow-sm text-xs flex flex-col gap-1">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span>Healthy</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-amber-500 mr-2"></div>
              <span>Warning</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <span>Critical</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampusMap;
