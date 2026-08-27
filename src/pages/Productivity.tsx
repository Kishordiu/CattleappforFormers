import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Productivity() {
  const [morning, setMorning] = useState('');
  const [evening, setEvening] = useState('');
  
  const total = (parseFloat(morning || '0') + parseFloat(evening || '0')).toFixed(1);

  return (
    <div className="space-y-8 max-w-5xl animate-in fade-in duration-500">
      <div>
        <h1 className="font-serif text-3xl mb-1 text-[var(--color-charcoal)]">Productivity Intelligence</h1>
        <p className="text-[var(--color-charcoal-light)]">Monitor milk yields and track production trends over time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Fast Entry</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal-light)] mb-1">Animal ID</label>
                <input type="text" defaultValue="KG-042" className="w-full h-10 px-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)] font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal-light)] mb-1">Morning Yield (L)</label>
                <input 
                  type="number" step="0.1"
                  value={morning} onChange={(e) => setMorning(e.target.value)}
                  className="w-full h-10 px-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)]" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal-light)] mb-1">Evening Yield (L)</label>
                <input 
                  type="number" step="0.1"
                  value={evening} onChange={(e) => setEvening(e.target.value)}
                  className="w-full h-10 px-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)]" 
                />
              </div>
              <div className="pt-4 border-t border-black/5 flex justify-between items-center">
                <span className="text-sm font-medium">Total:</span>
                <span className="font-serif text-2xl text-[var(--color-forest)]">{total} L</span>
              </div>
              <Button className="w-full mt-2">Save Record</Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full min-h-[400px]">
             <CardHeader>
                <CardTitle>Yield Trend (Last 30 Days)</CardTitle>
             </CardHeader>
             <CardContent className="h-[300px] flex items-center justify-center border border-dashed border-black/10 m-6">
                <div className="text-center text-[var(--color-charcoal-light)]">
                   <p className="font-mono text-sm mb-2">CHART_AREA</p>
                   <p className="text-xs">Recharts will be rendered here.</p>
                </div>
             </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}