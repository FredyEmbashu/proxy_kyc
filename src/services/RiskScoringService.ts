import axios from 'axios';

// Define interfaces for our data types
interface PersonalInfo {
  fullName: string;
  dateOfBirth: string;
  address: string;
  nationality: string;
  gender: string;
}

interface DocumentInfo {
  documentType: 'passport' | 'id_card' | 'drivers_license';
  documentNumber: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
}

interface BiometricData {
  faceMatchScore?: number;
  fingerprintMatchScore?: number;
  irisMatchScore?: number;
}

interface BehavioralData {
  completionTimeSeconds: number;
  numberOfAttempts: number;
  deviceInfo: string;
  ipAddress: string;
  geolocation?: {
    latitude: number;
    longitude: number;
    country: string;
  };
}

interface ExternalVerification {
  socialMediaVerified: boolean;
  bankAccountVerified: boolean;
  phoneNumberVerified: boolean;
  emailVerified: boolean;
}

export interface VerificationData {
  personalInfo: PersonalInfo;
  documentInfo: DocumentInfo;
  biometricData: BiometricData;
  behavioralData: BehavioralData;
  externalVerification: ExternalVerification;
}

export interface RiskScore {
  overallScore: number; // 0-100, higher is better
  riskLevel: 'low' | 'medium' | 'high';
  flags: string[];
  recommendations: string[];
  componentScores: {
    documentScore: number;
    biometricScore: number;
    behavioralScore: number;
    externalVerificationScore: number;
  };
}

class RiskScoringService {
  private apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  /**
   * Calculate risk score based on verification data
   * In a production environment, this would call a backend ML model
   */
  async calculateRiskScore(data: VerificationData): Promise<RiskScore> {
    try {
      // In a real implementation, this would call the backend API
      // return await axios.post(`${this.apiUrl}/risk-scoring/calculate`, data);
      
      // For now, we'll implement a simple scoring algorithm directly
      return this.simulateRiskScoring(data);
    } catch (error) {
      console.error('Error calculating risk score:', error);
      return {
        overallScore: 0,
        riskLevel: 'high',
        flags: ['Error calculating risk score'],
        recommendations: ['Please try again or contact support'],
        componentScores: {
          documentScore: 0,
          biometricScore: 0,
          behavioralScore: 0,
          externalVerificationScore: 0
        }
      };
    }
  }

  /**
   * Simulate risk scoring with a simple algorithm
   * This would be replaced by a real ML model in production
   */
  private simulateRiskScoring(data: VerificationData): RiskScore {
    const flags: string[] = [];
    const recommendations: string[] = [];
    
    // Document score calculation (0-25)
    let documentScore = 25;
    
    // Check document expiry
    const expiryDate = new Date(data.documentInfo.expiryDate);
    const currentDate = new Date();
    if (expiryDate < currentDate) {
      documentScore = 0;
      flags.push('Document expired');
      recommendations.push('Please provide a valid, non-expired document');
    } else {
      // Reduce score if document expires soon
      const monthsUntilExpiry = (expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
      if (monthsUntilExpiry < 3) {
        documentScore -= 10;
        flags.push('Document expires soon');
        recommendations.push('Consider renewing your document');
      }
    }
    
    // Biometric score calculation (0-25)
    let biometricScore = 0;
    if (data.biometricData.faceMatchScore) {
      biometricScore += data.biometricData.faceMatchScore / 4; // Assuming score is 0-100
    }
    
    if (data.biometricData.fingerprintMatchScore) {
      biometricScore += data.biometricData.fingerprintMatchScore / 8; // Assuming score is 0-100
    }
    
    if (data.biometricData.irisMatchScore) {
      biometricScore += data.biometricData.irisMatchScore / 8; // Assuming score is 0-100
    }
    
    if (biometricScore < 15) {
      flags.push('Low biometric match confidence');
      recommendations.push('Retake biometric captures in better lighting conditions');
    }
    
    // Behavioral score calculation (0-25)
    let behavioralScore = 25;
    
    if (data.behavioralData.numberOfAttempts > 3) {
      behavioralScore -= 5 * (data.behavioralData.numberOfAttempts - 3);
      flags.push('Multiple verification attempts');
      recommendations.push('Complete verification in a single session if possible');
    }
    
    if (data.behavioralData.completionTimeSeconds < 30) {
      behavioralScore -= 10;
      flags.push('Verification completed suspiciously quickly');
      recommendations.push('Take time to carefully complete each verification step');
    }
    
    // External verification score calculation (0-25)
    let externalVerificationScore = 0;
    if (data.externalVerification.emailVerified) externalVerificationScore += 6.25;
    if (data.externalVerification.phoneNumberVerified) externalVerificationScore += 6.25;
    if (data.externalVerification.bankAccountVerified) externalVerificationScore += 6.25;
    if (data.externalVerification.socialMediaVerified) externalVerificationScore += 6.25;
    
    if (externalVerificationScore < 12.5) {
      flags.push('Limited external verification sources');
      recommendations.push('Add more verification methods to improve your score');
    }
    
    // Calculate overall score
    const overallScore = documentScore + biometricScore + behavioralScore + externalVerificationScore;
    
    // Determine risk level
    let riskLevel: 'low' | 'medium' | 'high';
    if (overallScore >= 75) {
      riskLevel = 'low';
    } else if (overallScore >= 50) {
      riskLevel = 'medium';
    } else {
      riskLevel = 'high';
    }
    
    return {
      overallScore,
      riskLevel,
      flags,
      recommendations,
      componentScores: {
        documentScore,
        biometricScore,
        behavioralScore,
        externalVerificationScore
      }
    };
  }

  /**
   * Get risk factors based on user data and location
   */
  async getRiskFactors(userId: string, location: string): Promise<string[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/risk-scoring/factors`, {
        params: { userId, location }
      });
      return response.data.factors;
    } catch (error) {
      console.error('Error getting risk factors:', error);
      return ['Unable to retrieve risk factors'];
    }
  }
}

// Create and export a singleton instance
const riskScoringService = new RiskScoringService();
export default riskScoringService;

// Also export the class for testing or if needed elsewhere
export { RiskScoringService };