export interface EPDSQuestion {
  id: number;
  question: string;
  reverseScore: boolean;
  options: string[];
}

export type RiskLevel = "Low Risk" | "Moderate Risk" | "High Risk";
export interface AssessmentResult { totalScore: number; riskLevel: RiskLevel; safetyAlert: boolean; message: string; }
