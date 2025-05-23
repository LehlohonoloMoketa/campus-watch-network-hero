import React from 'react';
import { Link } from 'react-router-dom';
import NetworkStatusOverview from '@/components/NetworkStatusOverview';
import CampusMap from '@/components/CampusMap';
import NetworkDeviceList from '@/components/NetworkDeviceList';
import AlertsPanel from '@/components/AlertsPanel';
import ResponseTimeChart from '@/components/ResponseTimeChart';
import { Activity, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { incidents } from '@/lib/mockIncidents';

const Index = () => {
  const { user } = useAuth();
  
  // Get the most recent unresolved incidents
  const recentIncidents = incidents
    .filter(incident => incident.status !== 'resolved' && incident.status !== 'dismissed')
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Campus Network Monitor</h1>
            <p className="text-muted-foreground mt-1">Real-time monitoring and incident management system</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0 rounded-full bg-blue-50 text-blue-700 px-3 py-1 text-sm">
            <Activity className="h-4 w-4 mr-2" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        
        {/* Authentication Status */}
        {!user ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Sign in to access all features</CardTitle>
              <CardDescription>
                Authenticate to report incidents and access role-based features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The Campus Network Monitor provides real-time monitoring of network infrastructure
                and allows authenticated users to report incidents and access additional features
                based on their role.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="flex flex-col mb-8 sm:flex-row sm:items-center gap-4">
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Report Suspicious Activity</CardTitle>
                <CardDescription>Submit network or security incidents</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2">
                <Button asChild>
                  <Link to="/report-incident">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Report Incident
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Incidents</CardTitle>
                <CardDescription>Latest reported issues</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                {recentIncidents.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {recentIncidents.map(incident => (
                      <li key={incident.id} className="flex justify-between">
                        <span className="text-muted-foreground truncate mr-2">
                          {incident.title}
                        </span>
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          incident.priority === 'critical' ? 'bg-red-100 text-red-800' :
                          incident.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          incident.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {incident.priority}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No recent incidents</p>
                )}
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/incidents">View All Incidents</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {/* Network Status Overview */}
        <div className="mb-8">
          <NetworkStatusOverview />
        </div>
        
        {/* Main content */}
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Campus Map */}
          <CampusMap />
          
          {/* Alerts Panel */}
          <AlertsPanel />

          {/* Network Devices List */}
          <NetworkDeviceList />
          
          {/* Response Time Chart */}
          <ResponseTimeChart />
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Campus Network Monitoring System &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
