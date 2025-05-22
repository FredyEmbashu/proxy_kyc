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

// AI-Enhanced KYC Service for Microlenders
// Author: Fredy Lineekela Embashu
// Part of Master's Thesis Research at NUST

interface KYCVerificationStatus {
  documentVerified: boolean;
  biometricVerified: boolean;
  riskAssessment: 'low' | 'medium' | 'high';
  lastVerificationDate?: Date;
  verificationMethod: 'ai' | 'manual' | 'hybrid';
}

interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
  accountType?: 'individual' | 'business';
  companyName?: string;
  verified?: boolean;
  kycStatus?: KYCVerificationStatus;
  // Additional fields for microlending context
  nationalId?: string;
  phoneNumber?: string;
  residentialAddress?: string;
  employmentDetails?: {
    employer: string;
    position: string;
    monthlyIncome: number;
  };
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
  // Enhanced KYC data fields
  nationalId?: string;
  employmentDetails?: {
    employer: string;
    position: string;
    monthlyIncome: number;
  };
}

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
        
        this.token = token;
        this.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
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
        
        this.token = token;
        this.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
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
        
        this.token = token;
        this.user = user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        
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
  
  // Enhanced methods for AI-driven KYC
  isAuthenticated(): boolean {
    return true; // Bypassing authentication for prototype testing
  }

  getUser(): User | null {
    // Return a default user with KYC status for testing
    return {
      id: 'default',
      email: 'guest@example.com',
      fullName: 'Guest User',
      role: 'user',
      verified: true,
      kycStatus: {
        documentVerified: true,
        biometricVerified: false,
        riskAssessment: 'low',
        verificationMethod: 'ai',
        lastVerificationDate: new Date()
      }
    };
  }

  getToken(): string | null {
    return 'default-token';
  }
}

export const authService = new AuthService();