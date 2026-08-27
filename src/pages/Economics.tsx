import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Economics() {
  const [revenue] = useState(8540);
  const [feed] = useState(3200);
  const [medical] = useState(850);
  const [maintenance] = useState(1100);

  const totalExpenses = feed + medical + maintenance;
  const netContribution = revenue - totalExpenses;
  const efficiency = Math.round((netContribution / revenue) * 100);

  return (
    <div className="space-y-8 max-w-5xl animate-in fade-in duration-500">
      <div>
        <h1 className="font-serif text-3xl mb-1 text-[var(--color-charcoal)]">Economic Intelligence</h1>
        <p className="text-[var(--color-charcoal-light)]">Analyze financial performance and economic efficiency.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--color-charcoal-light)] font-sans uppercase">Milk Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-[var(--color-forest)]">₹{revenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--color-charcoal-light)] font-sans uppercase">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-[var(--color-decision-red)]">₹{totalExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--color-charcoal-light)] font-sans uppercase">Net Contribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-[var(--color-charcoal)]">₹{netContribution.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-[var(--color-ivory-dark)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--color-charcoal-light)] font-sans uppercase">Efficiency Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-[var(--color-charcoal)]">{efficiency} / 100</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown (Current Month)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-[var(--color-charcoal)]">Feed Cost</span>
                <span className="font-mono">₹{feed.toLocaleString()}</span>
              </div>
              <div className="w-full bg-black/5 h-2 rounded-full overflow-hidden">
                <div className="bg-[var(--color-earth)] h-full" style={{ width: `${(feed/totalExpenses)*100}%` }} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-[var(--color-charcoal)]">Maintenance</span>
                <span className="font-mono">₹{maintenance.toLocaleString()}</span>
              </div>
              <div className="w-full bg-black/5 h-2 rounded-full overflow-hidden">
                <div className="bg-[var(--color-sage)] h-full" style={{ width: `${(maintenance/totalExpenses)*100}%` }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-[var(--color-charcoal)]">Medical</span>
                <span className="font-mono">₹{medical.toLocaleString()}</span>
              </div>
              <div className="w-full bg-black/5 h-2 rounded-full overflow-hidden">
                <div className="bg-[var(--color-decision-red)] h-full" style={{ width: `${(medical/totalExpenses)*100}%` }} />
              </div>
            </div>
            
            <div className="pt-6 border-t border-black/5">
              <p className="text-sm text-[var(--color-charcoal-light)] italic">
                "Feed expenditure increased 14% this month while milk output declined 9%, heavily impacting the overall economic efficiency score."
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Log New Expense</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-charcoal-light)] mb-1">Category</label>
              <select className="w-full h-10 px-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)] bg-white">
                <option>Feed</option>
                <option>Medical</option>
                <option>Maintenance</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-charcoal-light)] mb-1">Amount (₹)</label>
              <input type="number" className="w-full h-10 px-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)]" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-charcoal-light)] mb-1">Description</label>
              <input type="text" className="w-full h-10 px-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)]" placeholder="e.g. Concentrated feed bags" />
            </div>
            <Button className="w-full mt-2">Log Expense</Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
