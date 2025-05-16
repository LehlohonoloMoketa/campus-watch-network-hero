
import React from 'react';
import { responseTimeData } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from 'react';

const ResponseTimeChart = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(responseTimeData[0].building);
  
  const data = responseTimeData.find(item => item.building === selectedBuilding)?.data.map(point => ({
    time: new Date(point.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    responseTime: point.value
  }));
  
  return (
    <Card className="col-span-1 md:col-span-2 xl:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-xl">Response Time History</CardTitle>
        <Select value={selectedBuilding} onValueChange={setSelectedBuilding}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select building" />
          </SelectTrigger>
          <SelectContent>
            {responseTimeData.map(item => (
              <SelectItem key={item.building} value={item.building}>{item.building}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6b7280"
                tickLine={false}
                axisLine={false}
                domain={[0, 'dataMax + 20']}
                label={{ value: 'ms', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', borderRadius: '0.375rem', borderColor: '#d1d5db' }}
                labelStyle={{ fontWeight: 'bold' }}
                formatter={(value) => [`${value}ms`, 'Response Time']}
              />
              <Line 
                type="monotone" 
                dataKey="responseTime" 
                stroke="#0ea5e9" 
                strokeWidth={2}
                dot={{ r: 3, fill: '#0ea5e9' }}
                activeDot={{ r: 5, stroke: '#0ea5e9', strokeWidth: 2 }}
                animationDuration={2000}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseTimeChart;
