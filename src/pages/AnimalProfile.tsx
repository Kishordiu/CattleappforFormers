import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCattleById } from '@/services/api';
import type { Cattle } from '@/types';
import { DecisionBadge } from '@/components/ui/DecisionBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowLeft, Activity, TrendingUp, IndianRupee, Dna } from 'lucide-react';

export default function AnimalProfile() {
  const { id } = useParams<{ id: string }>();
  const [animal, setAnimal] = useState<Cattle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const data = await getCattleById(id);
        setAnimal(data || null);
      }
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) return <div className="animate-pulse h-64 bg-black/5" />;
  if (!animal) return <div>Animal not found.</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Link to="/herd" className="inline-flex items-center text-sm text-[var(--color-charcoal-light)] hover:text-[var(--color-charcoal)] transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Herd
      </Link>

      {/* ANIMAL HERO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border border-black/5 p-8 relative overflow-hidden">
        {/* Subtle background motif */}
        <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
           <div className="w-64 h-64 border-[40px] border-black rounded-full" />
        </div>

        {/* LEFT: Identity */}
        <div className="space-y-2 z-10">
          <div className="font-mono text-sm text-[var(--color-charcoal-light)]">{animal.id}</div>
          <h1 className="font-serif text-4xl text-[var(--color-forest)]">{animal.name}</h1>
          <div className="text-sm text-[var(--color-charcoal-light)] pt-2 space-y-1">
            <p>{animal.breed} Cow</p>
            <p>Age: {animal.age} years</p>
            <p>Last updated: Today</p>
          </div>
        </div>

        {/* CENTER: Overall Score */}
        <div className="flex flex-col items-center justify-center border-y md:border-y-0 md:border-x border-black/5 py-6 md:py-0 z-10">
          <div className="text-sm uppercase tracking-wider text-[var(--color-charcoal-light)] mb-2">Overall Score</div>
          <div className="flex items-baseline gap-1">
            <span className="font-serif text-6xl text-[var(--color-charcoal)]">{animal.overallScore}</span>
            <span className="text-xl text-[var(--color-charcoal-light)]">/ 100</span>
          </div>
        </div>

        {/* RIGHT: Recommendation */}
        <div className="flex flex-col items-start md:items-end justify-center space-y-4 z-10">
          <div className="text-sm uppercase tracking-wider text-[var(--color-charcoal-light)]">Recommendation</div>
          <DecisionBadge status={animal.recommendation} size="lg" />
          <div className="text-sm text-[var(--color-charcoal-light)]">
            Confidence: <span className="font-medium text-[var(--color-charcoal)]">{animal.confidence}%</span>
          </div>
        </div>
      </div>

      {/* CURRENT SIGNAL */}
      <div className="bg-[var(--color-ivory-dark)] p-6 border-l-4 border-[var(--color-forest)]">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-charcoal-light)] mb-2">Current Signal</h3>
        <p className="text-lg text-[var(--color-charcoal)] font-serif leading-relaxed">
          "Milk productivity has declined over the recorded period while maintenance costs have increased. Breeding indicators suggest this animal may be worth evaluating as a breeding candidate."
        </p>
      </div>

      {/* COMPONENT SCORES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Health', score: animal.healthScore, icon: Activity },
          { label: 'Productivity', score: animal.productivityScore, icon: TrendingUp },
          { label: 'Economic Efficiency', score: animal.economicScore, icon: IndianRupee },
          { label: 'Breeding Potential', score: animal.breedingPotential, icon: Dna },
        ].map(item => (
          <Card key={item.label} className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-sans font-medium text-[var(--color-charcoal-light)] uppercase tracking-wider">{item.label}</CardTitle>
              <item.icon className="w-4 h-4 text-[var(--color-sage)]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif text-[var(--color-charcoal)]">{item.score}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4">
        <Link to="/decisions" className="inline-flex h-12 items-center justify-center bg-[var(--color-forest)] text-[var(--color-ivory)] px-8 font-medium hover:bg-[var(--color-forest-light)] transition-colors">
          View Decision Trace
        </Link>
        <Link to="/what-if" className="inline-flex h-12 items-center justify-center border border-[var(--color-forest)] text-[var(--color-forest)] px-8 font-medium hover:bg-[var(--color-ivory-dark)] transition-colors">
          Run What-If Scenario
        </Link>
      </div>
    </div>
  );
}
