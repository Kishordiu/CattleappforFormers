import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DecisionBadge } from '@/components/ui/DecisionBadge';

export default function Breeding() {
  return (
    <div className="space-y-8 max-w-5xl animate-in fade-in duration-500">
      <div>
        <h1 className="font-serif text-3xl mb-1 text-[var(--color-charcoal)]">Breeding Intelligence</h1>
        <p className="text-[var(--color-charcoal-light)]">Evaluate genetic potential and breeding timelines.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-[var(--color-ivory-dark)] border-t-4 border-t-[var(--color-decision-blue)]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-sans uppercase text-[var(--color-charcoal-light)]">Breeding Potential Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-serif text-6xl text-[var(--color-charcoal)]">79</span>
                <span className="text-xl text-[var(--color-charcoal-light)]">/ 100</span>
              </div>
              <DecisionBadge status="Breeding Candidate" />
              <p className="mt-6 text-sm text-[var(--color-charcoal)] leading-relaxed">
                "Breeding indicators suggest this animal may be worth evaluating as a breeding candidate. Past progeny demonstrate high milk yields."
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Breeding History</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="text-[var(--color-charcoal-light)] border-b border-black/5">
                  <tr>
                    <th className="pb-3 font-medium">Event Date</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Sire ID</th>
                    <th className="pb-3 font-medium">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  <tr>
                    <td className="py-4 font-mono text-xs">2024-03-12</td>
                    <td className="py-4">Artificial Insemination</td>
                    <td className="py-4 font-mono text-xs">SIRE-901</td>
                    <td className="py-4 text-[var(--color-decision-green)] font-medium">Successful (Calf born Dec 2024)</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-mono text-xs">2022-11-05</td>
                    <td className="py-4">Natural Service</td>
                    <td className="py-4 font-mono text-xs">SIRE-442</td>
                    <td className="py-4 text-[var(--color-decision-green)] font-medium">Successful</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-black/5 bg-white">
                  <div className="text-xs text-[var(--color-charcoal-light)] uppercase tracking-wider mb-1">Age Factor</div>
                  <div className="font-medium">Prime (6 Years)</div>
                </div>
                <div className="p-4 border border-black/5 bg-white">
                  <div className="text-xs text-[var(--color-charcoal-light)] uppercase tracking-wider mb-1">Calving Interval</div>
                  <div className="font-medium text-[var(--color-decision-green)]">Optimal (390 days)</div>
                </div>
                <div className="p-4 border border-black/5 bg-white">
                  <div className="text-xs text-[var(--color-charcoal-light)] uppercase tracking-wider mb-1">Genetic Lineage</div>
                  <div className="font-medium">High Yield Heritage</div>
                </div>
                <div className="p-4 border border-black/5 bg-white">
                  <div className="text-xs text-[var(--color-charcoal-light)] uppercase tracking-wider mb-1">Health Status</div>
                  <div className="font-medium text-[var(--color-decision-green)]">Excellent (No complications)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
