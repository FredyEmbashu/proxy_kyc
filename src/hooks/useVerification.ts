import { useState, useCallback } from 'react';
import { VerificationData, DocumentData, BiometricData, FingerprintData, BusinessData } from '../types/verification';

export const useVerification = () => {
  const [verificationData, setVerificationData] = useState<VerificationData>({});

  const updateDocumentData = useCallback((data: DocumentData) => {
    setVerificationData(prev => ({ ...prev, documentData: data }));
  }, []);

  const updateBiometricData = useCallback((data: BiometricData) => {
    setVerificationData(prev => ({ ...prev, biometricData: data }));
  }, []);

  const updateFingerprintData = useCallback((data: FingerprintData) => {
    setVerificationData(prev => ({ ...prev, fingerprintData: data }));
  }, []);

  const updateBusinessData = useCallback((data: BusinessData) => {
    setVerificationData(prev => ({ ...prev, businessData: data }));
  }, []);

  const resetVerificationData = useCallback(() => {
    setVerificationData({});
  }, []);

  return {
    verificationData,
    updateDocumentData,
    updateBiometricData,
    updateFingerprintData,
    updateBusinessData,
    resetVerificationData
  };
};