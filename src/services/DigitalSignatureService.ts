import { Buffer } from 'buffer';
import * as QRCode from 'qrcode';
import crypto from 'crypto';

// Make the interface exportable
export interface SignatureData {
  timestamp: string;
  verificationId: string;
  signature: string;
  qrCode: string;
  hashAlgorithm: string;
}

class DigitalSignatureService {
  private readonly SECRET_KEY = process.env.REACT_APP_SIGNATURE_KEY || 'KYC_NAMIBIA_SECRET';
  private readonly HASH_ALGORITHM = 'sha256';

  async generateSignature(data: any): Promise<SignatureData> {
    const verificationId = this.generateVerificationId();
    const timestamp = new Date().toISOString();
    const signatureContent = JSON.stringify({ data, timestamp, verificationId });
    
    // Generate QR code with verification data and hash
    const contentHash = this.hashData(signatureContent);
    const qrCode = await QRCode.toDataURL(JSON.stringify({
      verificationId,
      timestamp,
      type: 'KYC_VERIFICATION',
      hash: contentHash
    }));

    return {
      timestamp,
      verificationId,
      signature: this.signData(signatureContent),
      qrCode,
      hashAlgorithm: this.HASH_ALGORITHM
    };
  }

  private generateVerificationId(): string {
    return 'KYC-' + crypto.randomBytes(6).toString('hex').toUpperCase();
  }

  private hashData(data: string): string {
    return crypto.createHash(this.HASH_ALGORITHM)
      .update(data)
      .digest('hex');
  }

  private signData(data: string): string {
    const hmac = crypto.createHmac(this.HASH_ALGORITHM, this.SECRET_KEY);
    return hmac.update(data).digest('base64');
  }

  public verifySignature(data: string, signature: string): boolean {
    const expectedSignature = this.signData(data);
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }
}

export const digitalSignatureService = new DigitalSignatureService();