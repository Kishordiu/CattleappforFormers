import type { Cattle, DecisionTrace, ProductivityRecord } from '../types';

const MOCK_CATTLE: Cattle[] = [
  {
    id: 'KG-042',
    name: 'Lakshmi',
    breed: 'Kangeyam',
    age: 6,
    dateOfBirth: '2020-05-12',
    healthScore: 86,
    productivityScore: 72,
    economicScore: 61,
    breedingPotential: 79,
    overallScore: 73,
    recommendation: 'Monitor Closely',
    confidence: 82,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'KG-018',
    name: 'Gowri',
    breed: 'Kangeyam',
    age: 4,
    dateOfBirth: '2022-02-18',
    healthScore: 92,
    productivityScore: 88,
    economicScore: 85,
    breedingPotential: 90,
    overallScore: 89,
    recommendation: 'Continue Dairy Production',
    confidence: 94,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'KG-032',
    name: 'Meenakshi',
    breed: 'Kangeyam',
    age: 8,
    dateOfBirth: '2018-11-05',
    healthScore: 75,
    productivityScore: 60,
    economicScore: 55,
    breedingPotential: 82,
    overallScore: 65,
    recommendation: 'Breeding Candidate',
    confidence: 76,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'KG-044',
    name: 'Kamatchi',
    breed: 'Kangeyam',
    age: 9,
    dateOfBirth: '2017-08-22',
    healthScore: 65,
    productivityScore: 40,
    economicScore: 35,
    breedingPotential: 45,
    overallScore: 48,
    recommendation: 'Consider Sale',
    confidence: 88,
    lastUpdated: new Date().toISOString()
  }
];

export const getCattleList = async (): Promise<Cattle[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(MOCK_CATTLE), 600));
};

export const getCattleById = async (id: string): Promise<Cattle | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CATTLE.find(c => c.id === id));
    }, 400);
  });
};

export const getDecisionTrace = async (cattleId: string): Promise<DecisionTrace> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        cattleId,
        recommendation: 'Consider Sale',
        explanation: 'The recommendation is influenced mainly by declining productivity and increasing maintenance costs. Breeding indicators remain moderate, so the system presents this as a consideration rather than an automatic sale decision.',
        confidence: 82,
        confidenceExplanation: 'Historical productivity and economic records over the last 6 months provide a solid baseline for this recommendation.',
        factors: [
          { label: 'Productivity', impact: 'HIGH IMPACT', trend: 'down', value: '17%' },
          { label: 'Medical Cost', impact: 'MEDIUM IMPACT', trend: 'up', value: '24%' },
          { label: 'Maintenance Cost', impact: 'HIGH IMPACT', trend: 'up', value: '12%' },
          { label: 'Economic Score', impact: 'HIGH IMPACT', trend: 'neutral', value: '55' },
          { label: 'Breeding Potential', impact: 'LOW IMPACT', trend: 'neutral', value: '72' }
        ]
      });
    }, 800);
  });
};

export const getProductivity = async (cattleId: string): Promise<ProductivityRecord[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const records: ProductivityRecord[] = [];
      let currentMilk = 10;
      for (let i = 30; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        
        if (cattleId === 'KG-044') {
            currentMilk = currentMilk - (Math.random() * 0.2); // Declining
        } else {
            currentMilk = currentMilk + (Math.random() * 0.4 - 0.2); // Stable/fluctuating
        }
        
        records.push({
          id: `prod-${i}`,
          cattleId,
          date: d.toISOString().split('T')[0],
          milkMorning: parseFloat((currentMilk * 0.55).toFixed(1)),
          milkEvening: parseFloat((currentMilk * 0.45).toFixed(1)),
          totalMilk: parseFloat(currentMilk.toFixed(1))
        });
      }
      resolve(records);
    }, 500);
  });
};
