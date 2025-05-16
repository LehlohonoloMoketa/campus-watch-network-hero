
import React, { useState } from 'react';
import { alerts, getRelativeTime } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const AlertsPanel = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('active');
  
  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !alert.resolved;
    if (filter === 'resolved') return alert.resolved;
    return true;
  });
  
  const getAlertIcon = (severity: string, resolved: boolean) => {
    if (resolved) return <Check className="h-5 w-5 text-green-500" />;
    if (severity === 'critical') return <AlertCircle className="h-5 w-5 text-red-500 pulse" />;
    return <AlertTriangle className="h-5 w-5 text-amber-500" />;
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl">Alerts</CardTitle>
        <div className="flex space-x-1">
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(filter === 'active' && "bg-secondary")}
            onClick={() => setFilter('active')}
          >
            Active
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={cn(filter === 'all' && "bg-secondary")}
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className={cn(filter === 'resolved' && "bg-secondary")}
            onClick={() => setFilter('resolved')}
          >
            Resolved
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No alerts to display
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div key={alert.id} className={cn(
                "p-4 rounded-lg border",
                alert.resolved ? "bg-gray-50" : 
                alert.severity === "critical" ? "bg-red-50 border-red-200" : 
                "bg-amber-50 border-amber-200"
              )}>
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.severity, alert.resolved)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{alert.deviceName}</h4>
                      <Badge variant="outline" className={cn(
                        "text-xs",
                        alert.resolved ? "border-green-500 bg-green-50 text-green-700" :
                        alert.severity === "critical" ? "border-red-500 bg-red-50 text-red-700" :
                        "border-amber-500 bg-amber-50 text-amber-700"
                      )}>
                        {alert.resolved ? "Resolved" : alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm mt-1">{alert.message}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {getRelativeTime(alert.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
