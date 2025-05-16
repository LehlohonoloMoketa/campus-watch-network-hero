
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { Status } from '@/lib/types';

interface StatusCardProps {
  title: string;
  value: string | number;
  status?: Status;
  icon?: React.ReactNode;
  className?: string;
}

const StatusCard = ({ title, value, status = "healthy", icon, className }: StatusCardProps) => {
  return (
    <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {status && (
          <div className={cn(
            "mt-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
            status === "healthy" && "bg-green-100 text-green-800",
            status === "warning" && "bg-amber-100 text-amber-800",
            status === "critical" && "bg-red-100 text-red-800"
          )}>
            <div className={cn(
              "mr-1 h-2 w-2 rounded-full",
              status === "healthy" && "bg-green-500",
              status === "warning" && "bg-amber-500",
              status === "critical" && "bg-red-500 pulse"
            )} />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatusCard;
