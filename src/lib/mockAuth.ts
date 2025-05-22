
import { User, UserRole } from './types';

// Mock authenticated user (simulating logged-in state)
let currentUser: User | null = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@campus.edu',
  role: 'student',
  createdAt: new Date().toISOString()
};

export const users: User[] = [
  currentUser,
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@campus.edu',
    role: 'staff',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'user-3',
    name: 'Admin User',
    email: 'admin@campus.edu',
    role: 'admin',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Authentication functions
export const getCurrentUser = (): User | null => {
  return currentUser;
};

export const login = (email: string, password: string): Promise<User> => {
  // For demonstration, we're using a simplified mock authentication
  // In a real application, this would validate against a backend
  return new Promise((resolve, reject) => {
    const user = users.find(u => u.email === email);
    if (user) {
      // Simulate successful login
      currentUser = user;
      resolve(user);
    } else {
      reject(new Error("Invalid email or password"));
    }
  });
};

export const logout = (): void => {
  currentUser = null;
};

export const register = (name: string, email: string, password: string, role: UserRole = "student"): Promise<User> => {
  // For demonstration purposes
  return new Promise((resolve, reject) => {
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      reject(new Error("User already exists"));
    } else {
      const newUser: User = {
        id: `user-${users.length + 1}`,
        name,
        email,
        role,
        createdAt: new Date().toISOString()
      };
      users.push(newUser);
      currentUser = newUser;
      resolve(newUser);
    }
  });
};

// Role-based access control
export const hasPermission = (requiredRole: UserRole): boolean => {
  if (!currentUser) return false;
  
  // Simple role hierarchy: admin > staff > student
  if (currentUser.role === 'admin') return true;
  if (currentUser.role === 'staff' && requiredRole !== 'admin') return true;
  if (currentUser.role === 'student' && requiredRole === 'student') return true;
  
  return false;
};
