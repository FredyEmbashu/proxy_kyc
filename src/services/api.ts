import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const verificationApi = {
  submitVerification: async (data: any) => {
    return api.post('/verifications', data);
  },
  getVerificationStatus: async (id: string) => {
    return api.get(`/verifications/${id}`);
  },
  uploadDocument: async (file: File) => {
    const formData = new FormData();
    formData.append('document', file);
    return api.post('/documents/upload', formData);
  },
  uploadFace: async (imageData: string) => {
    return api.post('/face/verify', { imageData });
  }
};

export const businessApi = {
  getSubscriptions: async () => {
    return api.get('/subscriptions');
  },
  subscribe: async (planId: string) => {
    return api.post('/subscriptions', { planId });
  },
  createVerificationRequest: async (customerData: any) => {
    return api.post('/verification-requests', customerData);
  }
};

export default api;