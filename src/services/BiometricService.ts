import axios from 'axios';

interface FaceMatchResult {
  isMatch: boolean;
  confidence: number;
  errorMessage?: string;
}

interface DocumentVerificationResult {
  isAuthentic: boolean;
  confidence: number;
  detectedIssues: string[];
  errorMessage?: string;
}

interface BarcodeResult {
  format: string;
  value: string;
  success: boolean;
  errorMessage?: string;
}

class BiometricService {
  private apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  /**
   * Compare a selfie image with a document image to determine if they match
   * @param selfieImage Base64 encoded selfie image
   * @param documentImage Base64 encoded document image
   * @returns Promise with match result and confidence score
   */
  async compareFaces(selfieImage: string, documentImage: string): Promise<FaceMatchResult> {
    try {
      const response = await axios.post(`${this.apiUrl}/biometrics/face-match`, {
        selfieImage,
        documentImage
      });
      
      return response.data;
    } catch (error) {
      console.error('Error comparing faces:', error);
      return {
        isMatch: false,
        confidence: 0,
        errorMessage: 'Failed to compare faces. Please try again.'
      };
    }
  }

  /**
   * Verify if a document is authentic or potentially fraudulent
   * @param documentImage Base64 encoded document image
   * @param documentType Type of document (passport, id_card, drivers_license)
   * @returns Promise with authenticity result
   */
  async verifyDocumentAuthenticity(
    documentImage: string, 
    documentType: 'passport' | 'id_card' | 'drivers_license'
  ): Promise<DocumentVerificationResult> {
    try {
      const response = await axios.post(`${this.apiUrl}/documents/verify-authenticity`, {
        documentImage,
        documentType
      });
      
      return response.data;
    } catch (error) {
      console.error('Error verifying document:', error);
      return {
        isAuthentic: false,
        confidence: 0,
        detectedIssues: ['Verification service unavailable'],
        errorMessage: 'Failed to verify document. Please try again.'
      };
    }
  }

  /**
   * Read barcode from an image
   * @param imageData Base64 encoded image containing a barcode
   * @returns Promise with barcode data
   */
  async readBarcode(imageData: string): Promise<BarcodeResult> {
    try {
      const response = await axios.post(`${this.apiUrl}/biometrics/read-barcode`, {
        imageData
      });
      
      return response.data;
    } catch (error) {
      console.error('Error reading barcode:', error);
      return {
        format: '',
        value: '',
        success: false,
        errorMessage: 'Failed to read barcode. Please try again with a clearer image.'
      };
    }
  }

  /**
   * Match face images
   * @param capturedImage Base64 encoded face image
   * @param documentImage Base64 encoded document image with face
   * @returns Promise with match result
   */
  async matchFace(capturedImage: string, documentImage: string): Promise<FaceMatchResult> {
    return this.compareFaces(capturedImage, documentImage);
  }

  /**
   * Match iris images
   * @param capturedImage Base64 encoded iris image
   * @param documentImage Base64 encoded document image with iris
   * @returns Promise with match result
   */
  async matchIris(capturedImage: string, documentImage: string): Promise<FaceMatchResult> {
    try {
      const response = await axios.post(`${this.apiUrl}/biometrics/iris-match`, {
        capturedImage,
        documentImage
      });
      
      return response.data;
    } catch (error) {
      console.error('Error comparing iris:', error);
      return {
        isMatch: false,
        confidence: 0,
        errorMessage: 'Failed to compare iris. Please try again.'
      };
    }
  }

  /**
   * Match fingerprint images
   * @param capturedPrint Base64 encoded fingerprint image
   * @param documentPrint Base64 encoded document fingerprint
   * @returns Promise with match result
   */
  async matchFingerprint(capturedPrint: string, documentPrint: string): Promise<FaceMatchResult> {
    try {
      const response = await axios.post(`${this.apiUrl}/biometrics/fingerprint-match`, {
        capturedPrint,
        documentPrint
      });
      
      return response.data;
    } catch (error) {
      console.error('Error comparing fingerprints:', error);
      return {
        isMatch: false,
        confidence: 0,
        errorMessage: 'Failed to compare fingerprints. Please try again.'
      };
    }
  }
}

// Export as both default and named export
const biometricService = new BiometricService();
export { biometricService };
export default biometricService;