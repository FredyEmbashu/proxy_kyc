export interface DocumentData {
  documentNumber: string;
  name: string;
  dateOfBirth: string;
  nationality: string;
  photo?: string;
  fingerprint?: string;
}

export interface BiometricData {
  faceMatch: boolean;
  matchScore: number;
  timestamp: string;
}

export interface FingerprintData {
  isMatch: boolean;
  confidence: number;
  timestamp: string;
}

export interface BusinessData {
  registrationNumber?: string;
  businessName?: string;
  verificationStatus: string;
}

export interface VerificationData {
  documentData?: DocumentData;
  biometricData?: BiometricData;
  fingerprintData?: FingerprintData;
  businessData?: BusinessData;
}