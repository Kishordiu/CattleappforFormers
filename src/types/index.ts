export type RecommendationStatus = 
  | 'Continue Dairy Production' 
  | 'Breeding Candidate' 
  | 'Monitor Closely' 
  | 'Consider Sale';

export interface Cattle {
  id: string;
  name: string;
  breed: string;
  age: number;
  dateOfBirth: string;
  healthScore: number;
  productivityScore: number;
  economicScore: number;
  breedingPotential: number;
  overallScore: number;
  recommendation: RecommendationStatus;
  confidence: number;
  lastUpdated: string;
}

export interface ProductivityRecord {
  id: string;
  cattleId: string;
  date: string;
  milkMorning: number;
  milkEvening: number;
  totalMilk: number;
}

export interface HealthRecord {
  id: string;
  cattleId: string;
  date: string;
  event: string;
  status: string;
  notes: string;
  treatment: string;
  expense: number;
}

export interface Expense {
  id: string;
  cattleId: string;
  date: string;
  category: 'Feed' | 'Medical' | 'Maintenance' | 'Other';
  description: string;
  amount: number;
}

export interface FactorContribution {
  label: string;
  impact: 'HIGH IMPACT' | 'MEDIUM IMPACT' | 'LOW IMPACT';
  trend: 'up' | 'down' | 'neutral';
  value: string;
}

export interface DecisionTrace {
  cattleId: string;
  recommendation: RecommendationStatus;
  explanation: string;
  confidence: number;
  confidenceExplanation: string;
  factors: FactorContribution[];
}

export interface WhatIfScenario {
  cattleId: string;
  currentMilk: number;
  currentFeed: number;
  currentMaintenance: number;
  currentScore: number;
  currentRecommendation: RecommendationStatus;
  simulatedMilk: number;
  simulatedFeed: number;
  simulatedMaintenance: number;
  simulatedScore: number;
  simulatedRecommendation: RecommendationStatus;
}
