import api from './api';

export const notificationService = {
  sendVerificationLink: async (email: string, verificationId: string) => {
    return api.post('/notifications/verification-link', {
      email,
      verificationId,
      template: 'verification_request'
    });
  },

  sendVerificationComplete: async (email: string, verificationId: string) => {
    return api.post('/notifications/verification-complete', {
      email,
      verificationId,
      template: 'verification_complete'
    });
  },

  sendSubscriptionConfirmation: async (email: string, subscriptionDetails: any) => {
    return api.post('/notifications/subscription', {
      email,
      subscriptionDetails,
      template: 'subscription_confirmation'
    });
  }
};