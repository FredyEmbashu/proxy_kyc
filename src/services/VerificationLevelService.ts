export enum VerificationLevel {
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  ENHANCED = 'ENHANCED',
  PREMIUM = 'PREMIUM'
}

interface VerificationRequirements {
  documentVerification: boolean;
  biometricMatch: boolean;
  addressVerification: boolean;
  backgroundCheck: boolean;
}

class VerificationLevelService {
  determineLevel(requirements: VerificationRequirements): VerificationLevel {
    if (this.isPremium(requirements)) return VerificationLevel.PREMIUM;
    if (this.isEnhanced(requirements)) return VerificationLevel.ENHANCED;
    if (this.isStandard(requirements)) return VerificationLevel.STANDARD;
    return VerificationLevel.BASIC;
  }

  private isPremium(req: VerificationRequirements): boolean {
    return req.documentVerification && 
           req.biometricMatch && 
           req.addressVerification && 
           req.backgroundCheck;
  }

  private isEnhanced(req: VerificationRequirements): boolean {
    return req.documentVerification && 
           req.biometricMatch && 
           req.addressVerification;
  }

  private isStandard(req: VerificationRequirements): boolean {
    return req.documentVerification && req.biometricMatch;
  }
}

export const verificationLevelService = new VerificationLevelService();