import api from './api';

export const paymentService = {
  processSubscriptionPayment: async (paymentDetails: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    amount: number;
    planId: string;
  }) => {
    return api.post('/payments/process', {
      ...paymentDetails,
      type: 'subscription'
    });
  },

  getPaymentHistory: async () => {
    return api.get('/payments/history');
  },

  generateInvoice: async (paymentId: string) => {
    return api.get(`/payments/${paymentId}/invoice`, {
      responseType: 'blob'
    });
  }
};