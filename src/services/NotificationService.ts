import axios from 'axios';

export interface Notification {
  id?: string;
  recipientId: string;
  senderId?: string;
  type: 'verification_request' | 'verification_approved' | 'verification_rejected' | 'document_uploaded' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  metadata?: {
    requestId?: string;
    documentId?: string;
    verificationId?: string;
    [key: string]: any;
  };
}

class NotificationService {
  private apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  // Send a notification
  async sendNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    try {
      // In a real app, this would call an API endpoint
      // const response = await axios.post(`${this.apiUrl}/notifications`, notification);
      // return response.data;
      
      // For now, we'll simulate the API response
      const newNotification: Notification = {
        ...notification,
        id: `notif_${Date.now()}`,
        createdAt: new Date(),
      };
      
      // Store in localStorage for demo purposes
      this.storeNotification(newNotification);
      
      return newNotification;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }
  
  // Get notifications for a user
  async getUserNotifications(userId: string): Promise<Notification[]> {
    try {
      // In a real app, this would call an API endpoint
      // const response = await axios.get(`${this.apiUrl}/notifications/user/${userId}`);
      // return response.data;
      
      // For now, we'll retrieve from localStorage
      return this.getStoredNotifications().filter(n => n.recipientId === userId);
    } catch (error) {
      console.error('Error getting user notifications:', error);
      return [];
    }
  }
  
  // Mark a notification as read
  async markAsRead(notificationId: string): Promise<void> {
    try {
      // In a real app, this would call an API endpoint
      // await axios.patch(`${this.apiUrl}/notifications/${notificationId}`, { read: true });
      
      // For now, we'll update in localStorage
      const notifications = this.getStoredNotifications();
      const updatedNotifications = notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      );
      localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }
  
  // Send verification request notification
  async sendVerificationRequestNotification(
    requesterId: string,
    adminId: string,
    requestId: string,
    requesterName: string
  ): Promise<void> {
    await this.sendNotification({
      recipientId: adminId,
      senderId: requesterId,
      type: 'verification_request',
      title: 'New Verification Request',
      message: `${requesterName} has requested identity verification.`,
      read: false,
      metadata: {
        requestId
      }
    });
  }
  
  // Private helper methods
  private storeNotification(notification: Notification): void {
    const notifications = this.getStoredNotifications();
    notifications.push(notification);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }
  
  private getStoredNotifications(): Notification[] {
    const storedNotifications = localStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  }
}

const notificationService = new NotificationService();
export default notificationService;