import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { addProductivityRecord } from '@/services/api';

export default function Productivity() {
  const { t } = useTranslation();
  const [cattleId, setCattleId] = useState('KG-042');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [morning, setMorning] = useState('');
  const [evening, setEvening] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const total = (parseFloat(morning || '0') + parseFloat(evening || '0')).toFixed(1);

  const handleSave = async () => {
    if (!morning && !evening) return;
    setSaving(true);
    await addProductivityRecord({
      cattleId,
      date,
      milkMorning: parseFloat(morning || '0'),
      milkEvening: parseFloat(evening || '0'),
      totalMilk: parseFloat(total),
    });
    setSaving(false);
    setSaved(true);
    setMorning('');
    setEvening('');
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="font-serif text-3xl mb-1 text-[var(--color-charcoal)]">Productivity Intelligence</h1>
        <p className="text-[var(--color-charcoal-light)]">Record milk yields and track production trends over time.</p>
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
                <input
                  type="text"
                  value={cattleId}
                  onChange={e => setCattleId(e.target.value)}
                  className="w-full h-10 px-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)] font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal-light)] mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full h-10 px-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal-light)] mb-1">Morning Yield (L)</label>
                <input
                  type="number" step="0.1" min="0"
                  value={morning} onChange={e => setMorning(e.target.value)}
                  className="w-full h-10 px-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)]"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-charcoal-light)] mb-1">Evening Yield (L)</label>
                <input
                  type="number" step="0.1" min="0"
                  value={evening} onChange={e => setEvening(e.target.value)}
                  className="w-full h-10 px-3 border border-black/10 focus:outline-none focus:border-[var(--color-forest)]"
                  placeholder="0.0"
                />
              </div>

              <div className="pt-4 border-t border-black/5 flex justify-between items-center">
                <span className="text-sm font-medium text-[var(--color-charcoal-light)]">Daily Total:</span>
                <span className="font-serif text-2xl text-[var(--color-forest)]">{total} L</span>
              </div>

              <button
                onClick={handleSave}
                disabled={saving || (!morning && !evening)}
                className="w-full h-10 bg-[var(--color-forest)] text-white font-medium hover:bg-[var(--color-forest-light)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : t('common.save')}
              </button>

              {saved && (
                <div className="text-sm text-center text-[var(--color-decision-green)] bg-[var(--color-decision-green-light)] py-2 border border-[var(--color-decision-green)]/20">
                  ✓ Record saved successfully
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Yield Trend — {cattleId}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--color-charcoal-light)] mb-4">
                Records saved on this page persist across sessions. Navigate to the Animal Profile to see the full trend chart.
              </p>
              <div className="h-64 flex items-center justify-center border border-dashed border-black/10 text-center text-[var(--color-charcoal-light)]">
                <div>
                  <p className="font-mono text-xs mb-2 uppercase tracking-wider">Productivity Chart</p>
                  <p className="text-sm">Go to <strong>Herd → {cattleId}</strong> to see the full trend.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
