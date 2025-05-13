// Remove the unused import
import axios from 'axios';
//import { jwtDecode } from 'jwt-decode'; - Removing this line

// Define types for authentication
interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: User;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: User;
}

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  accountType?: 'individual' | 'business';
  companyName?: string;
  verified?: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  accountType: 'individual' | 'business';
  companyName?: string;
  registrationNumber?: string;
  phone?: string;
  address?: string;
  industry?: string;
}

// Create the auth service
class AuthService {
  private token: string | null = null;
  private user: User | null = null;
  
  constructor() {
    // Initialize from localStorage if available
    this.token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        this.user = JSON.parse(userStr);
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        localStorage.removeItem('user');
      }
    }
  }
  
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      // For demo purposes, simulate API call
      // In production, replace with actual API call
      // const response = await axios.post('/api/auth/login', { email, password });
      
      // Simulate successful login for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials
      if (email === 'admin@example.com' && password === 'password123') {
        const token = 'demo-token-xyz';
        const user: User = {
          id: '1',
          email: 'admin@example.com',
          fullName: 'Admin User',
          role: 'admin',
          verified: true
        };
        
        this.setSession(token, user);
        
        return {
          success: true,
          token,
          user
        };
      } else if (email === 'user@example.com' && password === 'password123') {
        const token = 'demo-token-abc';
        const user: User = {
          id: '2',
          email: 'user@example.com',
          fullName: 'Regular User',
          role: 'user',
          accountType: 'individual',
          verified: true
        };
        
        this.setSession(token, user);
        
        return {
          success: true,
          token,
          user
        };
      } else if (email === 'business@example.com' && password === 'password123') {
        const token = 'demo-token-def';
        const user: User = {
          id: '3',
          email: 'business@example.com',
          fullName: 'Business User',
          role: 'user',
          accountType: 'business',
          companyName: 'Example Corp',
          verified: false
        };
        
        this.setSession(token, user);
        
        return {
          success: true,
          token,
          user
        };
      }
      
      return {
        success: false,
        message: 'Invalid email or password'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login'
      };
    }
  }
  
  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      // For demo purposes, simulate API call
      // In production, replace with actual API call
      // const response = await axios.post('/api/auth/register', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo registration always succeeds
      const user: User = {
        id: Math.random().toString(36).substring(2, 15),
        email: data.email,
        fullName: data.fullName,
        role: 'user',
        accountType: data.accountType,
        companyName: data.companyName,
        verified: false
      };
      
      return {
        success: true,
        message: 'Registration successful',
        user
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'An error occurred during registration'
      };
    }
  }
  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = null;
    this.user = null;
  }
  
  isAuthenticated(): boolean {
    return !!this.token;
  }
  
  getUser(): User | null {
    return this.user;
  }
  
  getToken(): string | null {
    return this.token;
  }
  
  private setSession(token: string, user: User): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }
}

// Export a singleton instance
export const authService = new AuthService();