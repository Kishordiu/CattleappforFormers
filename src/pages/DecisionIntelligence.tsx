import { useState, useEffect } from 'react';
import { getDecisionTrace } from '@/services/api';
import type { DecisionTrace } from '@/types';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import { Activity, IndianRupee, TrendingUp, Dna, Info } from 'lucide-react';
import { cn } from '@/utils/utils';

export default function DecisionIntelligence() {
  const [trace, setTrace] = useState<DecisionTrace | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getDecisionTrace('KG-042');
      setTrace(data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div className="animate-pulse h-64 bg-black/5" />;
  if (!trace) return null;

  const getIconForFactor = (label: string) => {
    if (label.includes('Productivity')) return TrendingUp;
    if (label.includes('Cost') || label.includes('Economic')) return IndianRupee;
    if (label.includes('Breeding')) return Dna;
    return Activity;
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="font-serif text-3xl mb-1 text-[var(--color-charcoal)]">Decision Intelligence</h1>
        <p className="text-[var(--color-charcoal-light)]">What management action should be considered next?</p>
      </div>

      <div className="bg-white border border-black/5 p-8">
        <div className="mb-8">
          <div className="text-sm uppercase tracking-wider text-[var(--color-charcoal-light)] mb-4">Recommended Action</div>
          <div className="flex items-end gap-6 border-b border-black/5 pb-8">
            <DecisionBadge status={trace.recommendation} size="lg" className="text-xl" />
            <div>
              <div className="text-sm text-[var(--color-charcoal-light)]">Confidence</div>
              <div className="font-mono text-xl">{trace.confidence}%</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-2xl mb-6 flex items-center gap-2">
            Why this decision? <Info className="w-5 h-5 text-[var(--color-sage)]" />
          </h2>
          
          <div className="space-y-4">
            {trace.factors.map((factor, idx) => {
              const Icon = getIconForFactor(factor.label);
              return (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-4 bg-[var(--color-ivory-dark)] border-l-2"
                  style={{ borderLeftColor: factor.impact === 'HIGH IMPACT' ? 'var(--color-decision-red)' : factor.impact === 'MEDIUM IMPACT' ? 'var(--color-decision-amber)' : 'var(--color-sage)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full border border-black/5">
                      <Icon className="w-5 h-5 text-[var(--color-forest)]" />
                    </div>
                    <div>
                      <div className="font-medium text-[var(--color-charcoal)]">{factor.label}</div>
                      <div className="text-sm text-[var(--color-charcoal-light)] flex items-center gap-2">
                        <span>{factor.trend === 'down' ? '↓' : factor.trend === 'up' ? '↑' : ''} {factor.value}</span>
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "text-xs font-bold tracking-wider",
                    factor.impact === 'HIGH IMPACT' ? 'text-[var(--color-decision-red)]' : 
                    factor.impact === 'MEDIUM IMPACT' ? 'text-[var(--color-decision-amber)]' : 
                    'text-[var(--color-sage)]'
                  )}>
                    {factor.impact}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-6 bg-black/5 border border-black/10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-charcoal-light)] mb-2">Explanation</h3>
            <p className="text-[var(--color-charcoal)] leading-relaxed">
              "{trace.explanation}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
