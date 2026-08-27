import { useState } from 'react';
import type { RecommendationStatus } from '@/types';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import { ArrowRight, SlidersHorizontal, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export default function WhatIfSimulation() {
  const [milk, setMilk] = useState(9.7);
  const [feed, setFeed] = useState(12.4);
  const [maintenance, setMaintenance] = useState(1100);

  // Simple deterministic simulation logic for demonstration
  const baseScore = 73;
  const milkDiff = milk - 9.7; // positive is good
  const feedDiff = 12.4 - feed; // positive is good
  const maintDiff = (1100 - maintenance) / 100; // positive is good

  const simScore = Math.round(baseScore + (milkDiff * 2) + (feedDiff * 1.5) + (maintDiff * 2));
  
  let simRec: RecommendationStatus = 'Monitor Closely';
  if (simScore >= 80) simRec = 'Continue Dairy Production';
  else if (simScore >= 75) simRec = 'Breeding Candidate';
  else if (simScore < 60) simRec = 'Consider Sale';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="max-w-3xl">
        <h1 className="font-serif text-4xl mb-2 text-[var(--color-charcoal)]">What happens if things change?</h1>
        <p className="text-lg text-[var(--color-charcoal-light)]">Explore how different management scenarios could influence the current recommendation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CONTROLS */}
        <Card className="bg-[var(--color-ivory-dark)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[var(--color-forest)]" />
              Simulation Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-[var(--color-charcoal)]">Milk Production (L/day)</label>
                <span className="font-mono text-sm">{milk.toFixed(1)} L</span>
              </div>
              <input 
                type="range" min="5" max="15" step="0.1" 
                value={milk} onChange={(e) => setMilk(parseFloat(e.target.value))}
                className="w-full accent-[var(--color-forest)]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-[var(--color-charcoal)]">Feed Consumption (kg/day)</label>
                <span className="font-mono text-sm">{feed.toFixed(1)} kg</span>
              </div>
              <input 
                type="range" min="8" max="20" step="0.1" 
                value={feed} onChange={(e) => setFeed(parseFloat(e.target.value))}
                className="w-full accent-[var(--color-forest)]"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-[var(--color-charcoal)]">Maintenance Cost (₹/month)</label>
                <span className="font-mono text-sm">₹{maintenance}</span>
              </div>
              <input 
                type="range" min="500" max="2500" step="50" 
                value={maintenance} onChange={(e) => setMaintenance(parseInt(e.target.value))}
                className="w-full accent-[var(--color-forest)]"
              />
            </div>

            <div className="pt-4 border-t border-black/10">
              <button 
                onClick={() => { setMilk(9.7); setFeed(12.4); setMaintenance(1100); }}
                className="text-sm font-medium text-[var(--color-forest)] hover:underline"
              >
                Reset to Current
              </button>
            </div>
          </CardContent>
        </Card>

        {/* COMPARISON */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white border border-black/5 opacity-70">
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-charcoal-light)] mb-4">Current Scenario</div>
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-[var(--color-charcoal-light)]">Current Score</div>
                  <div className="font-serif text-4xl">{baseScore}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--color-charcoal-light)] mb-2">Recommendation</div>
                  <DecisionBadge status="Monitor Closely" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-2 border-[var(--color-forest)] shadow-md relative transition-all duration-300">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 z-10 hidden lg:block">
                <ArrowRight className="w-5 h-5 text-[var(--color-forest)]" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-forest)] mb-4">Simulated Scenario</div>
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-[var(--color-charcoal-light)]">Projected Score</div>
                  <div className="font-serif text-4xl transition-all duration-300">{simScore}</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--color-charcoal-light)] mb-2">Projected Recommendation</div>
                  <div className="transition-all duration-300">
                    <DecisionBadge status={simRec} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[var(--color-sage)]/10 text-sm text-[var(--color-charcoal-light)] border border-[var(--color-sage)]/30 flex items-start gap-3">
            <Info className="w-5 h-5 text-[var(--color-sage)] shrink-0" />
            <p>This scenario is an estimate for decision support and is not a guarantee of future outcomes. System calculations assume linear correlation for demonstration.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
