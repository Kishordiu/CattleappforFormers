// removed useState
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function Health() {
  
  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl mb-1 text-[var(--color-charcoal)]">Health Intelligence</h1>
        <p className="text-[var(--color-charcoal-light)]">Record medical events, vaccinations, and track wellness indicators.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Record Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal-light)] mb-1">Animal ID</label>
                <input type="text" defaultValue="KG-042" className="w-full h-10 px-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)] font-mono" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal-light)] mb-1">Event Type</label>
                <select className="w-full h-10 px-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)] bg-white">
                  <option>Observation</option>
                  <option>Vaccination</option>
                  <option>Treatment</option>
                  <option>Veterinary Visit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal-light)] mb-1">Notes</label>
                <textarea 
                  rows={3}
                  className="w-full p-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)] resize-none" 
                  placeholder="Record observations..."
                ></textarea>
              </div>
              <Button className="w-full mt-2">Save Record</Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
             <CardHeader>
                <CardTitle>Upcoming Vaccinations</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="p-4 bg-[var(--color-decision-amber-light)] text-[var(--color-decision-amber)] text-sm border border-[var(--color-decision-amber)]/20 mb-4 flex items-center gap-2">
                   <strong>FMD Vaccine due:</strong> KG-042, KG-018 (in 4 days)
                </div>
                <div className="p-4 bg-black/5 text-[var(--color-charcoal)] text-sm border border-black/10">
                   All other cattle are up to date on scheduled vaccinations.
                </div>
             </CardContent>
          </Card>

          <Card>
             <CardHeader>
                <CardTitle>Recent Health History</CardTitle>
             </CardHeader>
             <CardContent>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-black/10 before:to-transparent">
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-white text-[var(--color-forest)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <div className="w-2 h-2 bg-[var(--color-forest)] rounded-full"></div>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-black/5 bg-white shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-[var(--color-charcoal)]">Veterinary Visit</div>
                        <time className="font-mono text-xs text-[var(--color-charcoal-light)]">Aug 18</time>
                      </div>
                      <div className="text-sm text-[var(--color-charcoal-light)]">KG-042 - Routine checkup, slightly elevated temperature noted. Prescribed rest.</div>
                    </div>
                  </div>
                  
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-black/10 bg-[var(--color-ivory-dark)] text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-black/5 bg-white shadow-sm opacity-80">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-[var(--color-charcoal)]">Vaccination</div>
                        <time className="font-mono text-xs text-[var(--color-charcoal-light)]">Jul 26</time>
                      </div>
                      <div className="text-sm text-[var(--color-charcoal-light)]">Herd-wide FMD booster administered.</div>
                    </div>
                  </div>
                </div>
             </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
