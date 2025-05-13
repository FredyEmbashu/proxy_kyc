interface BusinessProfile {
  registrationNumber: string;
  companyName: string;
  tradingName?: string;
  registrationDate: string;
  status: 'active' | 'inactive' | 'suspended';
  directors: string[];
  address: string;
  industry: string;
  taxNumber?: string;
}

interface BusinessVerificationResult {
  profile: BusinessProfile;
  riskScore: number;
  riskFactors: string[];
  verificationStatus: 'verified' | 'pending' | 'failed';
}

// Mock business verification service for demonstration purposes
// In a real application, this would connect to an actual business registry API

class BusinessVerificationService {
  async verifyBusiness(registrationNumber: string): Promise<any> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock data - in a real app, this would come from an API
    return {
      profile: {
        companyName: this.generateCompanyName(registrationNumber),
        registrationNumber: registrationNumber,
        status: Math.random() > 0.2 ? 'active' : 'inactive',
        registrationDate: this.generateRandomDate(2010, 2022),
        directors: [
          'John Smith',
          'Maria Johnson',
          'Peter Nangolo'
        ],
        address: '123 Independence Ave, Windhoek, Namibia',
        industry: 'Technology',
        employees: Math.floor(Math.random() * 100) + 5
      },
      financials: {
        annualRevenue: `N$${(Math.random() * 10000000).toFixed(2)}`,
        taxCompliance: Math.random() > 0.3 ? 'compliant' : 'non-compliant',
        lastFilingDate: this.generateRandomDate(2022, 2023)
      },
      verification: {
        verified: true,
        verificationDate: new Date().toISOString(),
        verificationMethod: 'registry-api'
      }
    };
  }
  
  private generateCompanyName(regNumber: string): string {
    const prefixes = ['Namibia', 'Windhoek', 'Desert', 'African', 'Southern', 'Tech', 'Global'];
    const suffixes = ['Solutions', 'Enterprises', 'Technologies', 'Holdings', 'Group', 'Services', 'Innovations'];
    
    // Use the registration number to deterministically generate a name
    const prefixIndex = parseInt(regNumber.substring(0, 2), 10) % prefixes.length;
    const suffixIndex = parseInt(regNumber.substring(regNumber.length - 2), 10) % suffixes.length;
    
    return `${prefixes[prefixIndex]} ${suffixes[suffixIndex]}`;
  }
  
  private generateRandomDate(startYear: number, endYear: number): string {
    const start = new Date(startYear, 0, 1).getTime();
    const end = new Date(endYear, 11, 31).getTime();
    const randomTimestamp = start + Math.random() * (end - start);
    return new Date(randomTimestamp).toISOString().split('T')[0];
  }
}

const businessVerificationService = new BusinessVerificationService();
export default businessVerificationService;