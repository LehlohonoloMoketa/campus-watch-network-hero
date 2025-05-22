
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AlertTriangle, User } from 'lucide-react';

const Header = () => {
  const { user, logout, hasPermission } = useAuth();
  const location = useLocation();
  
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">Campus Network Monitor</Link>
          
          {user && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname === "/" ? "bg-accent" : ""
                  )}>
                    Dashboard
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/incidents" className={cn(
                    navigationMenuTriggerStyle(),
                    location.pathname === "/incidents" ? "bg-accent" : ""
                  )}>
                    Incidents
                  </Link>
                </NavigationMenuItem>
                
                {user && (
                  <NavigationMenuItem>
                    <Link to="/report-incident" className={cn(
                      navigationMenuTriggerStyle(),
                      location.pathname === "/report-incident" ? "bg-accent" : ""
                    )}>
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Report
                    </Link>
                  </NavigationMenuItem>
                )}
                
                {hasPermission('admin') && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Admin</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-3 p-4">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link 
                              to="/admin/devices"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Manage Devices</div>
                              <p className="text-sm leading-snug text-muted-foreground">
                                Configure network devices
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link 
                              to="/admin/users"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">Users</div>
                              <p className="text-sm leading-snug text-muted-foreground">
                                Manage user accounts
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {!user ? (
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div>{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                  <div className="mt-1">
                    <Badge variant="outline">
                      {user.role === 'admin' ? 'Administrator' : 
                       user.role === 'staff' ? 'Staff' : 'Student'}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

// Missing Badge component, let's create it:
const Badge = ({ 
  children, 
  variant = "default", 
  className 
}: { 
  children: React.ReactNode;
  variant?: "default" | "outline";
  className?: string;
}) => {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
      variant === "default" ? "bg-primary text-primary-foreground" : "border bg-background",
      className
    )}>
      {children}
    </span>
  );
};
