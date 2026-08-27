import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { getCattleList } from '@/services/api';
import type { Cattle } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DecisionBadge } from '@/components/ui/DecisionBadge';

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cattle, setCattle] = useState<Cattle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCattleList().then(data => {
      setCattle(data);
      setLoading(false);
    });
  }, []);

  const greeting = new Date().getHours() < 12
    ? t('dashboard.greeting')
    : new Date().getHours() < 17
    ? 'Good afternoon'
    : 'Good evening';

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-12 w-80 bg-black/5 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[1,2,3,4,5].map(i => <div key={i} className="h-32 bg-black/5 rounded" />)}
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

  const attentionAnimals = cattle.filter(
    c => c.recommendation === 'Consider Sale' || c.recommendation === 'Monitor Closely'
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl text-[var(--color-charcoal)] mb-1">
          {greeting}{user?.name ? `, ${user.name.split(' ')[0]}.` : '.'}
        </h1>
        <p className="text-lg text-[var(--color-charcoal-light)]">{t('dashboard.subtitle')}</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="bg-[var(--color-ivory-dark)] col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-sans font-semibold text-[var(--color-charcoal-light)] uppercase tracking-wider">
              {t('dashboard.totalCattle')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-serif text-[var(--color-charcoal)]">{counts.total}</div>
          </CardContent>
        </Card>

        {[
          { label: t('dashboard.continueDairy'), count: counts.continue, color: 'var(--color-decision-green)' },
          { label: t('dashboard.breedingCandidate'), count: counts.breed, color: 'var(--color-decision-blue)' },
          { label: t('dashboard.monitorClosely'), count: counts.monitor, color: 'var(--color-decision-amber)' },
          { label: t('dashboard.considerSale'), count: counts.sale, color: 'var(--color-decision-red)' },
        ].map(kpi => (
          <Card key={kpi.label} style={{ borderTopColor: kpi.color }} className="border-t-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-sans font-semibold uppercase tracking-wider" style={{ color: kpi.color }}>
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-serif text-[var(--color-charcoal)]">{kpi.count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Attention List */}
      {attentionAnimals.length > 0 && (
        <div>
          <h2 className="font-serif text-2xl mb-5 text-[var(--color-charcoal)]">
            {t('dashboard.needsAttention')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {attentionAnimals.map(animal => (
              <div
                key={animal.id}
                onClick={() => navigate(`/cattle/${animal.id}`)}
                className="bg-white border border-black/5 p-5 cursor-pointer hover:border-black/20 hover:shadow-sm transition-all group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono text-xs text-[var(--color-charcoal-light)]">{animal.id}</span>
                  <DecisionBadge status={animal.recommendation} size="sm" />
                </div>
                <h3 className="font-serif text-xl text-[var(--color-charcoal)] group-hover:text-[var(--color-forest)] transition-colors mb-1">
                  {animal.name}
                </h3>
                <p className="text-sm text-[var(--color-charcoal-light)]">
                  {t('dashboard.overallScore')}: <span className="font-semibold text-[var(--color-charcoal)]">{animal.overallScore}/100</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
