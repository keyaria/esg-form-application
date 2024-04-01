import { Timestamp } from '@angular/fire/firestore';

export interface ResultInterface {
  verifier: string;
  verificationStandard: string[];
  scopeVerified: string[];
  assuranceLevel: string;
  disclosure?: string;
}

export interface ResultsInterface {
  id: string;
  date: Timestamp;
  question1: ResultInterface;
  question2: ResultInterface;
  score?: {
    question1: number;
    question2: number;
    total: number;
  };
}

export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;

  constructor(file: File) {
    this.file = file;
  }
}
