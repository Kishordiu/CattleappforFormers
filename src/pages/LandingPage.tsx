import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';
import { DecisionBadge } from '@/components/ui/DecisionBadge';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-ivory)] text-[var(--color-charcoal)] selection:bg-[var(--color-forest)] selection:text-[var(--color-ivory)] overflow-x-hidden">
      
      {/* NAVIGATION */}
      <nav className="flex items-center justify-between p-6 md:px-12 max-w-7xl mx-auto">
        <div className="font-serif text-2xl text-[var(--color-forest)] tracking-tight">Kangeyam Insight</div>
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2 text-sm font-medium hover:text-[var(--color-forest)] transition-colors">Login</Link>
          <Link to="/dashboard" className="px-6 py-2 text-sm font-medium bg-[var(--color-forest)] text-[var(--color-ivory)] hover:bg-[var(--color-forest-light)] transition-colors">Enter Dashboard</Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <h1 className="font-serif text-6xl md:text-8xl leading-[1.1] text-[var(--color-forest)] mb-8">
            From Cattle Data <br />
            to Better Decisions.
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-charcoal-light)] max-w-2xl leading-relaxed mb-12">
            Kangeyam Insight combines health, productivity, economics and breeding information to help farmers understand what management action should be considered next—and why.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/dashboard" className="inline-flex h-14 items-center justify-center bg-[var(--color-forest)] text-[var(--color-ivory)] px-10 text-lg font-medium hover:bg-[var(--color-forest-light)] transition-colors">
              Explore Dashboard
            </Link>
            <a href="#how-it-works" className="inline-flex h-14 items-center justify-center border border-[var(--color-forest)] text-[var(--color-forest)] px-10 text-lg font-medium hover:bg-[var(--color-forest)] hover:text-white transition-colors group">
              See How It Works <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Hero Visual Abstract Representation */}
        <div className="mt-24 border-y border-black/10 py-12 flex flex-col md:flex-row items-center justify-between gap-8 opacity-80">
           <div className="text-center"><div className="font-mono text-sm tracking-widest text-[var(--color-charcoal-light)] uppercase mb-2">Data</div><div className="h-1 bg-[var(--color-charcoal)] w-12 mx-auto"></div></div>
           <ArrowRight className="w-4 h-4 text-black/20" />
           <div className="text-center"><div className="font-mono text-sm tracking-widest text-[var(--color-charcoal-light)] uppercase mb-2">Analysis</div><div className="h-1 bg-[var(--color-charcoal)] w-12 mx-auto"></div></div>
           <ArrowRight className="w-4 h-4 text-black/20" />
           <div className="text-center"><div className="font-mono text-sm tracking-widest text-[var(--color-charcoal-light)] uppercase mb-2">Scores</div><div className="h-1 bg-[var(--color-charcoal)] w-12 mx-auto"></div></div>
           <ArrowRight className="w-4 h-4 text-black/20" />
           <div className="text-center"><div className="font-mono text-sm tracking-widest text-[var(--color-forest)] uppercase mb-2">Decision</div><div className="h-1 bg-[var(--color-forest)] w-12 mx-auto"></div></div>
           <ArrowRight className="w-4 h-4 text-black/20" />
           <div className="text-center"><div className="font-mono text-sm tracking-widest text-[var(--color-charcoal-light)] uppercase mb-2">Explanation</div><div className="h-1 bg-[var(--color-charcoal)] w-12 mx-auto"></div></div>
        </div>
      </section>

      {/* SECTION 01 — THE PROBLEM */}
      <section className="bg-[var(--color-ivory-dark)] py-32 px-6 md:px-12" id="how-it-works">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl text-[var(--color-forest)] mb-6 leading-tight">
              Information is everywhere.<br />
              The decision isn't.
            </h2>
            <p className="text-xl text-[var(--color-charcoal-light)] leading-relaxed">
              Farmers maintain extensive records—milk yields, feed costs, medical events, and breeding dates. But when standing in front of an animal, combining these signals into a single, confident management action remains difficult.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['❤️ Health', '🥛 Productivity', '🌾 Feed', '💰 Economics', '🧬 Breeding', '📈 Market'].map((signal, i) => (
              <div key={i} className="bg-white p-6 border border-black/5 flex items-center justify-center text-lg font-medium shadow-sm hover:border-[var(--color-forest)]/30 transition-colors">
                {signal}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 04 — FOUR OUTCOMES */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--color-forest)] mb-6">Four Clear Outcomes</h2>
          <p className="text-xl text-[var(--color-charcoal-light)]">The intelligence engine transforms complex historical data into one of four distinct management considerations.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-10 border border-black/5 bg-white hover:border-[var(--color-decision-green)] transition-colors group">
            <DecisionBadge status="Continue Dairy Production" size="lg" className="mb-6" />
            <p className="text-[var(--color-charcoal-light)] leading-relaxed">Animal demonstrates strong economic efficiency, stable or increasing productivity, and excellent health records.</p>
          </div>
          
          <div className="p-10 border border-black/5 bg-white hover:border-[var(--color-decision-blue)] transition-colors group">
            <DecisionBadge status="Breeding Candidate" size="lg" className="mb-6" />
            <p className="text-[var(--color-charcoal-light)] leading-relaxed">Genetics, age, and historical health indicators suggest this animal is optimal for expanding the herd.</p>
          </div>
          
          <div className="p-10 border border-black/5 bg-white hover:border-[var(--color-decision-amber)] transition-colors group">
            <DecisionBadge status="Monitor Closely" size="lg" className="mb-6" />
            <p className="text-[var(--color-charcoal-light)] leading-relaxed">Early indicators of declining productivity or rising maintenance costs. Requires observation before major decisions.</p>
          </div>
          
          <div className="p-10 border border-black/5 bg-white hover:border-[var(--color-decision-red)] transition-colors group">
            <DecisionBadge status="Consider Sale" size="lg" className="mb-6" />
            <p className="text-[var(--color-charcoal-light)] leading-relaxed">Economic efficiency has dropped significantly below maintenance thresholds, suggesting a reevaluation of the animal's place in the dairy herd.</p>
          </div>
        </div>
      </section>

      {/* SECTION 05 & 06 — EXPLAINABILITY & WHAT-IF */}
      <section className="bg-[var(--color-charcoal)] text-white py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[var(--color-ivory)]">A recommendation without an explanation isn't enough.</h2>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              The signature <strong>Decision Trace</strong> interface breaks down exactly which factors—like a 17% drop in milk or a 24% rise in medical costs—influenced the recommendation.
            </p>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 border border-white/10 flex justify-between items-center">
                <span>Productivity Trend</span>
                <span className="text-red-400 font-bold tracking-wider text-xs uppercase">High Impact</span>
              </div>
              <div className="bg-white/5 p-4 border border-white/10 flex justify-between items-center">
                <span>Maintenance Cost</span>
                <span className="text-orange-400 font-bold tracking-wider text-xs uppercase">Medium Impact</span>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 text-[var(--color-ivory)]">What changes if the conditions change?</h2>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              Use the <strong>What-If Simulation</strong> to adjust feed costs, milk prices, or maintenance expenses to see how future scenarios might alter the current recommendation.
            </p>
            <div className="bg-white/10 p-8 border border-white/20">
               <div className="flex justify-between items-center mb-6">
                 <div className="text-white/50 text-sm uppercase tracking-widest">Current</div>
                 <ArrowRight className="text-white/30" />
                 <div className="text-[var(--color-ivory)] text-sm uppercase tracking-widest">Projected</div>
               </div>
               <div className="flex justify-between items-center">
                 <div className="font-serif text-4xl text-white/50">73</div>
                 <div className="font-serif text-5xl text-[var(--color-ivory)]">78</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07 — RESPONSIBLE AI & CTA */}
      <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <div className="bg-[var(--color-ivory-dark)] p-8 md:p-12 border border-[var(--color-forest)]/20 mb-20">
          <Info className="w-8 h-8 text-[var(--color-forest)] mx-auto mb-4" />
          <p className="text-lg text-[var(--color-forest)] leading-relaxed italic">
            "Kangeyam Insight provides decision support based on available records. It does not diagnose disease, prescribe treatment, or automatically decide whether an animal should be sold or bred."
          </p>
        </div>
        
        <h2 className="font-serif text-5xl text-[var(--color-forest)] mb-10">From Cattle Data to Better Decisions.</h2>
        <Link to="/dashboard" className="inline-flex h-16 items-center justify-center bg-[var(--color-forest)] text-[var(--color-ivory)] px-12 text-xl font-medium hover:bg-[var(--color-forest-light)] transition-colors">
          Enter Kangeyam Insight
        </Link>
      </section>
      
    </div>
  );
}
