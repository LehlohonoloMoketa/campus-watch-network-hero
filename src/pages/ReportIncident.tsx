
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { buildings } from '@/lib/mockData';
import { addIncident, getBuildingByCoordinates } from '@/lib/mockIncidents';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { MapPin } from 'lucide-react';

interface FormValues {
  title: string;
  description: string;
  location: string;
  priority: "low" | "medium" | "high" | "critical";
}

const ReportIncident = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationName, setLocationName] = useState<string>('');
  
  const form = useForm<FormValues>({
    defaultValues: {
      title: '',
      description: '',
      location: '',
      priority: 'medium',
    },
  });

  useEffect(() => {
    // If not logged in, redirect to login
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  // Simulate getting location from browser geolocation API
  // In a real app, this would use the browser's geolocation API and convert to campus coordinates
  const getLocation = () => {
    setIsGettingLocation(true);
    
    // Simulate geolocation with random coordinates within the campus map
    setTimeout(() => {
      const x = Math.floor(Math.random() * 500); 
      const y = Math.floor(Math.random() * 400);
      setCoordinates([x, y]);
      
      // Find the closest building to these coordinates
      const building = getBuildingByCoordinates(x, y);
      if (building) {
        setLocationName(building);
        form.setValue('location', building);
      } else {
        setLocationName('Unknown location');
        form.setValue('location', 'Campus grounds');
      }
      
      setIsGettingLocation(false);
      
      toast({
        title: "Location detected",
        description: building ? `Near ${building}` : "Campus location detected",
      });
    }, 1000);
  };

  const onSubmit = (data: FormValues) => {
    if (!user || !coordinates) return;
    
    try {
      const newIncident = addIncident({
        title: data.title,
        description: data.description,
        location: data.location,
        coordinates: coordinates,
        buildingId: buildings.find(b => b.name === data.location)?.id,
        reportedBy: user.id,
        reporterName: user.name,
        reporterRole: user.role,
        priority: data.priority
      });
      
      toast({
        title: "Incident reported",
        description: "Your incident has been submitted successfully",
      });
      
      navigate('/incidents');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit incident report",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Report Incident</CardTitle>
          <CardDescription>
            Report suspicious activity or network issues on campus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incident Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Brief title of the incident" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Detailed description of what you observed" 
                        className="min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex flex-col space-y-4">
                <FormLabel>Location</FormLabel>
                <div className="flex items-center space-x-2">
                  <Button 
                    type="button" 
                    onClick={getLocation} 
                    disabled={isGettingLocation}
                    variant="outline"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {isGettingLocation ? 'Detecting location...' : 'Detect My Location'}
                  </Button>
                </div>
                {coordinates && (
                  <div className="text-sm text-muted-foreground">
                    Location detected: {locationName}
                  </div>
                )}
              </div>
              
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the priority level of this incident
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <CardFooter className="px-0 pt-4 flex justify-end">
                <Button type="submit" className="ml-auto">Submit Report</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportIncident;
