import React, { createContext, useContext, useState } from 'react';

interface VerificationContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  verificationData: any;
  updateVerificationData: (data: any) => void;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export const VerificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [verificationData, setVerificationData] = useState({});

  const updateVerificationData = (data: any) => {
    setVerificationData(prev => ({ ...prev, ...data }));
  };

  return (
    <VerificationContext.Provider value={{
      currentStep,
      setCurrentStep,
      verificationData,
      updateVerificationData
    }}>
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return context;
};