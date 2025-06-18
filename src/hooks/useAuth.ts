
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

export interface User {
  id: string;
  org_id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'compliance';
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock authentication - replace with real API calls
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (email === 'admin@example.com' && password === 'password') {
    return {
      id: '1',
      org_id: 'org_1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin',
      created_at: new Date().toISOString()
    };
  }
  throw new Error('Invalid credentials');
};

const mockSignup = async (name: string, email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: Date.now().toString(),
    org_id: 'org_' + Date.now(),
    name,
    email,
    role: 'admin',
    created_at: new Date().toISOString()
  };
};

export const useAuthHook = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await mockLogin(email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await mockSignup(name, email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return {
    user,
    isLoading,
    login,
    signup,
    logout
  };
};
