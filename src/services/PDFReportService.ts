// Add these imports at the top
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { SignatureData, digitalSignatureService } from './DigitalSignatureService';
import { verificationLevelService, VerificationLevel } from './VerificationLevelService';
import logoImage from '../assets/kyc-namibia-logo.png';

interface WatermarkOptions {
  text: string;
  fontSize?: number;
  color?: string;
  opacity?: number;
  angle?: number;
}

interface TamperSealOptions {
  level: VerificationLevel;
  verificationId: string;
  timestamp: string;
}

class PDFReportService {
  private doc: jsPDF;
  private pageWidth: number;
  private pageHeight: number;

  constructor() {
    this.doc = new jsPDF();
    this.pageWidth = this.doc.internal.pageSize.width;
    this.pageHeight = this.doc.internal.pageSize.height;
  }

  private addWatermark(options: WatermarkOptions) {
    const {
      text,
      fontSize = 60,
      color = '#888888',
      opacity = 0.3,
      angle = -45
    } = options;

    this.doc.setTextColor(color);
    // Fix the GState type issue
    const gState = this.doc.GState({ opacity: 0.3 });
    gState.opacity = opacity;
    this.doc.setGState(gState);
    this.doc.setFontSize(fontSize);

    const textWidth = this.doc.getTextWidth(text);
    const x = this.pageWidth / 2;
    const y = this.pageHeight / 2;

    this.doc.saveGraphicsState();
    // this.doc.setTransform(1, 0, 0, 1, x, y);
    // this.doc.rotate(angle);
    this.doc.text(text, -textWidth / 2, 0);
    this.doc.restoreGraphicsState();
  }

  private addVerificationStamp(x: number, y: number) {
    // Create circular stamp
    this.doc.setDrawColor(0, 102, 204);
    this.doc.setLineWidth(2);
    this.doc.circle(x, y, 20);

    // Add text inside stamp
    this.doc.setTextColor(0, 102, 204);
    this.doc.setFontSize(8);
    this.doc.text('VERIFIED', x - 12, y - 2);
    this.doc.text('KYC NAMIBIA', x - 15, y + 4);
    
    // Add verification date
    const date = new Date().toLocaleDateString();
    this.doc.setFontSize(6);
    this.doc.text(date, x - 10, y + 10);
  }

  private async addOfficialStamp(x: number, y: number) {
    // Create official stamp with logo
    this.doc.setDrawColor(0, 71, 171); // Namibia blue
    this.doc.setFillColor(255, 255, 255);
    this.doc.circle(x, y, 25, 'FD');

    // Add logo
    this.doc.addImage(logoImage, 'PNG', x - 15, y - 15, 30, 30);

    // Add outer ring with text
    this.doc.setDrawColor(0, 71, 171);
    this.doc.circle(x, y, 30);
    
    // Add verification text
    this.doc.setTextColor(0, 71, 171);
    this.doc.setFontSize(8);
    this.doc.text('OFFICIALLY VERIFIED', x - 20, y + 35);
    this.doc.text('KYC NAMIBIA', x - 15, y + 40);
  }

  private async addSecurityFeatures(signatureData: SignatureData) {
    // Add QR code
    this.doc.addImage(
      signatureData.qrCode,
      'PNG',
      this.pageWidth - 50,
      10,
      40,
      40
    );

    // Add verification details
    this.doc.setFontSize(8);
    this.doc.setTextColor(100, 100, 100);
    this.doc.text([
      `Verification ID: ${signatureData.verificationId}`,
      `Timestamp: ${new Date(signatureData.timestamp).toLocaleString()}`,
      'Verify at: verify.kycnamibia.com'
    ], 20, this.pageHeight - 20);
  }

  private addTamperSeal(options: TamperSealOptions) {
    const { level, verificationId, timestamp } = options;
    const sealColors = {
      [VerificationLevel.BASIC]: '#666666',
      [VerificationLevel.STANDARD]: '#0066cc',
      [VerificationLevel.ENHANCED]: '#006600',
      [VerificationLevel.PREMIUM]: '#660066'
    };

    // Add holographic-style seal
    const x = 30;
    const y = this.pageHeight - 40;
    const radius = 15;

    // Create multi-layer effect
    for (let i = 0; i < 3; i++) {
      this.doc.setDrawColor(sealColors[level]);
      this.doc.setLineWidth(0.5);
      this.doc.circle(x, y, radius - i * 2);
    }

    // Add micro-text (anti-tampering feature)
    this.doc.setFontSize(3);
    this.doc.text(
      `${verificationId}-${timestamp}`.repeat(3),
      x - radius,
      y + radius + 3,
      { maxWidth: radius * 2 }
    );
  }

  private addLevelStamp(level: VerificationLevel, x: number, y: number) {
    const stampConfig = {
      [VerificationLevel.BASIC]: {
        color: '#666666',
        text: 'BASIC VERIFICATION'
      },
      [VerificationLevel.STANDARD]: {
        color: '#0066cc',
        text: 'STANDARD VERIFICATION'
      },
      [VerificationLevel.ENHANCED]: {
        color: '#006600',
        text: 'ENHANCED VERIFICATION'
      },
      [VerificationLevel.PREMIUM]: {
        color: '#660066',
        text: 'PREMIUM VERIFICATION'
      }
    };

    const config = stampConfig[level];
    
    // Create official stamp
    this.doc.setDrawColor(config.color);
    this.doc.setFillColor(255, 255, 255);
    this.doc.circle(x, y, 25, 'FD');

    // Add KYC Namibia logo
    this.doc.addImage(logoImage, 'PNG', x - 15, y - 15, 30, 30);

    // Add verification level text
    this.doc.setTextColor(config.color);
    this.doc.setFontSize(8);
    this.doc.text(config.text, x - 20, y + 35);
    this.doc.text('KYC NAMIBIA', x - 15, y + 40);
  }

  async generateReport(verificationData: any): Promise<string> {
    const signatureData = await digitalSignatureService.generateSignature(verificationData);
    const level = verificationLevelService.determineLevel(verificationData.requirements);

    // Add watermark with verification level
    this.addWatermark({
      text: `KYC NAMIBIA ${level}`,
      fontSize: 60,
      color: '#004d99',
      opacity: 0.1,
      angle: -45
    });

    // Add level-specific stamp
    this.addLevelStamp(level, this.pageWidth - 40, this.pageHeight - 50);

    // Add tamper-evident seal
    this.addTamperSeal({
      level,
      verificationId: signatureData.verificationId,
      timestamp: signatureData.timestamp
    });

    // Add verification stamp
    this.addVerificationStamp(this.pageWidth - 30, this.pageHeight - 30);

    // Return as base64 string
    // Add official stamp
    await this.addOfficialStamp(this.pageWidth - 40, this.pageHeight - 50);

    // Add security features
    await this.addSecurityFeatures(signatureData);

    return this.doc.output('datauristring');
  }
}

export const pdfReportService = new PDFReportService();