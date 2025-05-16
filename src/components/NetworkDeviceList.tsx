
import React, { useState } from 'react';
import { devices, getRelativeTime } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';
import { Router, Server, Wifi } from 'lucide-react';
import { NetworkDevice } from '@/lib/types';

const NetworkDeviceList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const getDeviceIcon = (type: string) => {
    switch(type) {
      case "router": return <Router className="h-4 w-4" />;
      case "switch": return <Server className="h-4 w-4" />;
      case "access-point": return <Wifi className="h-4 w-4" />;
      case "server": return <Server className="h-4 w-4" />;
      default: return <Server className="h-4 w-4" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    return (
      <Badge variant="outline" className={cn(
        "rounded-full",
        status === "healthy" && "border-green-500 text-green-700 bg-green-50",
        status === "warning" && "border-amber-500 text-amber-700 bg-amber-50",
        status === "critical" && "border-red-500 text-red-700 bg-red-50"
      )}>
        <div className={cn(
          "mr-1 h-2 w-2 rounded-full",
          status === "healthy" && "bg-green-500",
          status === "warning" && "bg-amber-500",
          status === "critical" && "bg-red-500 pulse"
        )} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  
  const filteredDevices = devices.filter((device) => 
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    device.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.ipAddress.includes(searchTerm)
  );
  
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Network Devices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input 
            placeholder="Search by name, location, or IP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Last Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(device.type)}
                      {device.name}
                    </div>
                  </TableCell>
                  <TableCell>{device.location}</TableCell>
                  <TableCell><code>{device.ipAddress}</code></TableCell>
                  <TableCell>{getStatusBadge(device.status)}</TableCell>
                  <TableCell>
                    <span className={cn(
                      device.responseTime < 20 ? "text-green-600" : 
                      device.responseTime < 100 ? "text-amber-600" : 
                      "text-red-600"
                    )}>
                      {device.responseTime}ms
                    </span>
                  </TableCell>
                  <TableCell>{getRelativeTime(device.lastUpdated)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkDeviceList;
