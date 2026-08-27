import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCattleList } from '@/services/api';
import type { Cattle } from '@/types';
import { DecisionBadge } from '@/components/ui/DecisionBadge';

export default function HerdList() {
  const [cattle, setCattle] = useState<Cattle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const data = await getCattleList();
      setCattle(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const filtered = cattle.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl mb-1 text-[var(--color-charcoal)]">Herd Intelligence</h1>
          <p className="text-[var(--color-charcoal-light)]">Interactive overview of all recorded animals.</p>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search by ID or Name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 h-10 px-3 bg-white border border-black/10 text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-forest)] transition-shadow"
          />
        </div>
      </div>

      <div className="bg-white border border-black/5 overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[var(--color-ivory-dark)] text-[var(--color-charcoal-light)] font-medium border-b border-black/5">
            <tr>
              <th className="px-4 py-3">Animal ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3 text-right">Age</th>
              <th className="px-4 py-3 text-center">Score</th>
              <th className="px-4 py-3">Recommendation</th>
              <th className="px-4 py-3 text-right">Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {loading ? (
              [1,2,3,4].map(i => (
                <tr key={i}>
                  <td colSpan={6} className="px-4 py-4"><div className="h-4 bg-black/5 animate-pulse w-full" /></td>
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-[var(--color-charcoal-light)]">
                  No records found.
                </td>
              </tr>
            ) : (
              filtered.map(animal => (
                <tr 
                  key={animal.id} 
                  onClick={() => navigate(`/cattle/${animal.id}`)}
                  className="hover:bg-black/[0.02] cursor-pointer transition-colors group"
                >
                  <td className="px-4 py-4 font-mono text-xs">{animal.id}</td>
                  <td className="px-4 py-4 font-medium group-hover:text-[var(--color-forest)] transition-colors">{animal.name}</td>
                  <td className="px-4 py-4 text-right text-[var(--color-charcoal-light)]">{animal.age}y</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-ivory-dark)] font-semibold text-[var(--color-charcoal)]">
                      {animal.overallScore}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <DecisionBadge status={animal.recommendation} size="sm" />
                  </td>
                  <td className="px-4 py-4 text-right text-[var(--color-charcoal-light)]">{animal.confidence}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
