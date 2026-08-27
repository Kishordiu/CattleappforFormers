import type { Cattle, DecisionTrace, ProductivityRecord } from '../types';

// ─── Seed Data ────────────────────────────────────────────────────────────────
const SEED_CATTLE: Cattle[] = [
  {
    id: 'KG-042', name: 'Lakshmi', breed: 'Kangeyam', age: 6,
    dateOfBirth: '2020-05-12', healthScore: 86, productivityScore: 72,
    economicScore: 61, breedingPotential: 79, overallScore: 73,
    recommendation: 'Monitor Closely', confidence: 82,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'KG-018', name: 'Gowri', breed: 'Kangeyam', age: 4,
    dateOfBirth: '2022-02-18', healthScore: 92, productivityScore: 88,
    economicScore: 85, breedingPotential: 90, overallScore: 89,
    recommendation: 'Continue Dairy Production', confidence: 94,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'KG-032', name: 'Meenakshi', breed: 'Kangeyam', age: 8,
    dateOfBirth: '2018-11-05', healthScore: 75, productivityScore: 60,
    economicScore: 55, breedingPotential: 82, overallScore: 65,
    recommendation: 'Breeding Candidate', confidence: 76,
    lastUpdated: new Date().toISOString(),
  },
  {
    id: 'KG-044', name: 'Kamatchi', breed: 'Kangeyam', age: 9,
    dateOfBirth: '2017-08-22', healthScore: 65, productivityScore: 40,
    economicScore: 35, breedingPotential: 45, overallScore: 48,
    recommendation: 'Consider Sale', confidence: 88,
    lastUpdated: new Date().toISOString(),
  },
];

// ─── Storage Keys ─────────────────────────────────────────────────────────────
const CATTLE_KEY = 'ki_cattle';
const PRODUCTIVITY_KEY = 'ki_productivity';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function ensureSeeded() {
  if (!localStorage.getItem(CATTLE_KEY)) {
    localStorage.setItem(CATTLE_KEY, JSON.stringify(SEED_CATTLE));
  }
  if (!localStorage.getItem(PRODUCTIVITY_KEY)) {
    // Generate 30 days of seed productivity records for KG-042
    const records: ProductivityRecord[] = [];
    let current = 10;
    for (let i = 30; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      current = Math.max(5, current + (Math.random() * 0.4 - 0.25));
      records.push({
        id: `prod-seed-${i}`,
        cattleId: 'KG-042',
        date: d.toISOString().split('T')[0],
        milkMorning: parseFloat((current * 0.55).toFixed(1)),
        milkEvening: parseFloat((current * 0.45).toFixed(1)),
        totalMilk: parseFloat(current.toFixed(1)),
      });
    }
    localStorage.setItem(PRODUCTIVITY_KEY, JSON.stringify(records));
  }
  // Seed demo user
  const USERS_KEY = 'ki_users';
  const existing = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (!existing.find((u: { email: string }) => u.email === 'demo@kangeyam.in')) {
    existing.push({
      id: 'demo-user',
      name: 'Demo Farmer',
      email: 'demo@kangeyam.in',
      password: 'demo1234',
      farmName: 'Kangeyam Heritage Farm',
      role: 'farmer',
      language: 'en',
    });
    localStorage.setItem(USERS_KEY, JSON.stringify(existing));
  }
}

// ─── Cattle API ───────────────────────────────────────────────────────────────
export const getCattleList = async (): Promise<Cattle[]> => {
  ensureSeeded();
  return new Promise(resolve =>
    setTimeout(() => {
      const data: Cattle[] = JSON.parse(localStorage.getItem(CATTLE_KEY) || '[]');
      resolve(data);
    }, 300)
  );
};

export const getCattleById = async (id: string): Promise<Cattle | undefined> => {
  ensureSeeded();
  return new Promise(resolve =>
    setTimeout(() => {
      const data: Cattle[] = JSON.parse(localStorage.getItem(CATTLE_KEY) || '[]');
      resolve(data.find(c => c.id === id));
    }, 200)
  );
};

export const addCattle = async (cattle: Omit<Cattle, 'lastUpdated'>): Promise<void> => {
  const data: Cattle[] = JSON.parse(localStorage.getItem(CATTLE_KEY) || '[]');
  data.push({ ...cattle, lastUpdated: new Date().toISOString() });
  localStorage.setItem(CATTLE_KEY, JSON.stringify(data));
};

// ─── Productivity API ─────────────────────────────────────────────────────────
export const getProductivity = async (cattleId: string): Promise<ProductivityRecord[]> => {
  ensureSeeded();
  return new Promise(resolve =>
    setTimeout(() => {
      const all: ProductivityRecord[] = JSON.parse(localStorage.getItem(PRODUCTIVITY_KEY) || '[]');
      resolve(all.filter(r => r.cattleId === cattleId));
    }, 300)
  );
};

export const addProductivityRecord = async (record: Omit<ProductivityRecord, 'id'>): Promise<void> => {
  const all: ProductivityRecord[] = JSON.parse(localStorage.getItem(PRODUCTIVITY_KEY) || '[]');
  all.push({ ...record, id: `prod-${Date.now()}` });
  localStorage.setItem(PRODUCTIVITY_KEY, JSON.stringify(all));
};

// ─── Decision Trace ───────────────────────────────────────────────────────────
export const getDecisionTrace = async (_cattleId: string): Promise<DecisionTrace> => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve({
        cattleId: _cattleId,
        recommendation: 'Monitor Closely',
        explanation:
          'The recommendation is influenced mainly by declining productivity and increasing maintenance costs. Breeding indicators remain moderate, so the system presents this as a consideration rather than an automatic sale decision.',
        confidence: 82,
        confidenceExplanation:
          'Historical productivity and economic records over the last 6 months provide a solid baseline for this recommendation.',
        factors: [
          { label: 'Productivity', impact: 'HIGH IMPACT', trend: 'down', value: '↓ 17%' },
          { label: 'Medical Cost', impact: 'MEDIUM IMPACT', trend: 'up', value: '↑ 24%' },
          { label: 'Maintenance Cost', impact: 'HIGH IMPACT', trend: 'up', value: '↑ 12%' },
          { label: 'Economic Score', impact: 'HIGH IMPACT', trend: 'neutral', value: '55 / 100' },
          { label: 'Breeding Potential', impact: 'LOW IMPACT', trend: 'neutral', value: '72 / 100' },
        ],
      });
    }, 400)
  );
};
