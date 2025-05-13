export interface VerificationStep {
  id: string;
  label: string;
  status: 'pending' | 'completed' | 'in_progress' | 'error';
  description: string;
}

export interface CustomerFormProps {
  onSubmit: (data: any) => Promise<void>;
}

export interface DocumentUploaderProps {
  onUpload: (files: File[]) => Promise<void>;
}

export interface FaceCaptureProps {
  onCapture: (image: string) => Promise<void>;
}

export interface VerificationStatusProps {
  steps: VerificationStep[];
  currentStep: number;
}