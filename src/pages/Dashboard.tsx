import { useEffect, useState } from 'react';
import { getCattleList } from '@/services/api';
import type { Cattle } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DecisionBadge } from '@/components/ui/DecisionBadge';

export default function Dashboard() {
  const [cattle, setCattle] = useState<Cattle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getCattleList();
      setCattle(data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 w-64 bg-black/5 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-black/5 animate-pulse" />)}
        </div>
      </div>
    );
  }

  const counts = {
    total: cattle.length,
    continue: cattle.filter(c => c.recommendation === 'Continue Dairy Production').length,
    breed: cattle.filter(c => c.recommendation === 'Breeding Candidate').length,
    monitor: cattle.filter(c => c.recommendation === 'Monitor Closely').length,
    sale: cattle.filter(c => c.recommendation === 'Consider Sale').length,
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="font-serif text-4xl text-[var(--color-charcoal)] mb-2">Good morning.</h1>
        <p className="text-lg text-[var(--color-charcoal-light)]">Here is what your herd is telling you today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-[var(--color-ivory-dark)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans font-medium text-[var(--color-charcoal-light)] uppercase tracking-wider">Total Cattle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-serif text-[var(--color-charcoal)]">{counts.total}</div>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-[var(--color-decision-green)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans font-medium text-[var(--color-decision-green)] uppercase tracking-wider">Continue Dairy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-serif text-[var(--color-charcoal)]">{counts.continue}</div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[var(--color-decision-blue)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans font-medium text-[var(--color-decision-blue)] uppercase tracking-wider">Breeding Candidate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-serif text-[var(--color-charcoal)]">{counts.breed}</div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[var(--color-decision-amber)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans font-medium text-[var(--color-decision-amber)] uppercase tracking-wider">Monitor Closely</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-serif text-[var(--color-charcoal)]">{counts.monitor}</div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-t-[var(--color-decision-red)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sans font-medium text-[var(--color-decision-red)] uppercase tracking-wider">Consider Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-serif text-[var(--color-charcoal)]">{counts.sale}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="font-serif text-2xl mb-6">Needs Attention</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cattle.filter(c => c.recommendation === 'Consider Sale' || c.recommendation === 'Monitor Closely').map(animal => (
            <Card key={animal.id} className="hover:border-black/20 transition-colors cursor-pointer group">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="font-mono text-xs text-[var(--color-charcoal-light)]">{animal.id}</div>
                  <DecisionBadge status={animal.recommendation} size="sm" />
                </div>
                <CardTitle className="text-xl group-hover:text-[var(--color-forest-light)] transition-colors">
                  {animal.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-[var(--color-charcoal-light)]">
                  Overall Score: <span className="font-semibold text-[var(--color-charcoal)]">{animal.overallScore}/100</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
