export interface Certification {
  name: string;
  issuer: string;
  issuedDate: string;
  expiryDate: string | null;
  description: string;
  skills: string[];
  verifyUrl: string;
  imageUrl: string;
}
