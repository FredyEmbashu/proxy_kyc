import axios from 'axios';

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
    this.token = localStorage.getItem('auth_token');
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
      await new Promise(resolve => setTimeout(resolve, 1000));

      let token = '';
      let user: User | null = null;

      if (email === 'admin@example.com' && password === 'password123') {
        token = 'demo-token-admin';
        user = {
          id: '1',
          email,
          fullName: 'Admin User',
          role: 'admin',
          verified: true
        };
      } else if (email === 'user@example.com' && password === 'password123') {
        token = 'demo-token-user';
        user = {
          id: '2',
          email,
          fullName: 'Individual User',
          role: 'user',
          accountType: 'individual',
          verified: true
        };
      } else if (email === 'business@example.com' && password === 'password123') {
        token = 'demo-token-business';
        user = {
          id: '3',
          email,
          fullName: 'Business User',
          role: 'user',
          accountType: 'business',
          companyName: 'Example Corp',
          verified: false
        };
      } else {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      this.token = token;
      this.user = user;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return {
        success: true,
        token,
        user
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
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user: User = {
        id: Math.random().toString(36).substring(2),
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
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.token = null;
    this.user = null;
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }

  getUser(): User | null {
    return this.user;
  }

  getToken(): string | null {
    return this.token;
  }

  async selectPlan(planId: string): Promise<{ success: boolean; redirectUrl?: string; message?: string }> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulated delay

    if (!this.token || !this.user) {
      return {
        success: false,
        redirectUrl: '/login',
        message: 'User not authenticated',
      };
    }

    console.log(`Plan selected: ${planId}`);
    localStorage.setItem('selected_plan', planId);

    return {
      success: true,
      redirectUrl: '/dashboard',
      message: 'Plan selection successful',
    };
  }
}

export const authService = new AuthService();
