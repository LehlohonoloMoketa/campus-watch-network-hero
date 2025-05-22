
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { incidents } from '@/lib/mockIncidents';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { MapPin, AlertTriangle, Search } from 'lucide-react';

const IncidentStatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'pending':
      return <Badge className="bg-yellow-500">Pending</Badge>;
    case 'investigating':
      return <Badge className="bg-blue-500">Investigating</Badge>;
    case 'resolved':
      return <Badge className="bg-green-500">Resolved</Badge>;
    case 'dismissed':
      return <Badge className="bg-gray-500">Dismissed</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const PriorityBadge = ({ priority }: { priority: string }) => {
  switch (priority) {
    case 'low':
      return <Badge variant="outline" className="border-blue-500 text-blue-500">Low</Badge>;
    case 'medium':
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Medium</Badge>;
    case 'high':
      return <Badge variant="outline" className="border-orange-500 text-orange-500">High</Badge>;
    case 'critical':
      return <Badge variant="outline" className="border-red-500 text-red-500">Critical</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
};

const Incidents = () => {
  const { user, hasPermission } = useAuth();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const filteredIncidents = incidents.filter(incident => {
    // Filter by status
    if (statusFilter !== 'all' && incident.status !== statusFilter) {
      return false;
    }
    
    // Filter by search term (title, description, location)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        incident.title.toLowerCase().includes(searchLower) ||
        incident.description.toLowerCase().includes(searchLower) ||
        incident.location.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  const canReportIncident = user !== null;
  const canSeeAllIncidents = user !== null && hasPermission('staff');

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campus Incidents</h1>
          <p className="text-muted-foreground">View and manage reported incidents</p>
        </div>
        {canReportIncident && (
          <Button onClick={() => navigate('/report-incident')} className="mt-4 md:mt-0">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Report New Incident
          </Button>
        )}
      </div>
      
      {/* Filters */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Status:</span>
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="dismissed">Dismissed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredIncidents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No incidents found matching your filters</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredIncidents.map((incident) => (
            <Card key={incident.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{incident.title}</CardTitle>
                  <PriorityBadge priority={incident.priority} />
                </div>
                <CardDescription className="flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {incident.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {incident.description}
                </p>
                <div className="flex flex-col space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reported by:</span>
                    <span>{incident.reporterName} ({incident.reporterRole})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span>{new Date(incident.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Status:</span>
                    <IncidentStatusBadge status={incident.status} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Incidents;
