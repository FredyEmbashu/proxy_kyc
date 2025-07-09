import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'business' | 'client';
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // Simulate login for demo purposes
    const demoUsers = [
      {
        email: 'admin@example.com',
        password: 'password123',
        user: {
          id: '1',
          email: 'admin@example.com',
          role: 'admin',
          name: 'Admin User',
        },
        token: 'demo-token-xyz'
      },
      {
        email: 'user@example.com',
        password: 'password123',
        user: {
          id: '2',
          email: 'user@example.com',
          role: 'client',
          name: 'Regular User',
        },
        token: 'demo-token-abc'
      },
      {
        email: 'business@example.com',
        password: 'password123',
        user: {
          id: '3',
          email: 'business@example.com',
          role: 'business',
          name: 'Business User',
        },
        token: 'demo-token-def'
      }
    ];

    const match = demoUsers.find(u => u.email === email && u.password === password);
    if (!match) throw new Error('Invalid credentials');

    localStorage.setItem('token', match.token);
    localStorage.setItem('user', JSON.stringify(match.user));
    setUser(match.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
