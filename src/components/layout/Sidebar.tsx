import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  TrendingUp, 
  BrainCircuit,
  TestTube,
  Settings,
  UserCircle,
  IndianRupee,
  Dna
} from 'lucide-react';
import { cn } from '@/utils/utils';

const navItems = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Herd', path: '/herd', icon: Users },
  { name: 'Productivity', path: '/productivity', icon: TrendingUp },
  { name: 'Health', path: '/health', icon: Activity },
  { name: 'Economics', path: '/economics', icon: IndianRupee },
  { name: 'Breeding', path: '/breeding', icon: Dna },
  { name: 'Decision Intelligence', path: '/decisions', icon: BrainCircuit },
  { name: 'What-If Simulation', path: '/what-if', icon: TestTube },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-ivory-dark)]">
      <div className="p-6">
        <h1 className="font-serif text-2xl text-[var(--color-forest)]">Kangeyam Insight</h1>
        <p className="text-xs text-[var(--color-charcoal-light)] mt-1 tracking-widest uppercase">Decision Support</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors',
                isActive 
                  ? 'text-[var(--color-forest)] bg-white shadow-sm border border-black/5' 
                  : 'text-[var(--color-charcoal-light)] hover:text-[var(--color-forest)] hover:bg-black/5'
              )
            }
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-black/5 space-y-1">
        <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[var(--color-charcoal-light)] hover:text-[var(--color-forest)] w-full transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[var(--color-charcoal-light)] hover:text-[var(--color-forest)] w-full transition-colors">
          <UserCircle className="w-4 h-4" />
          Profile
        </button>
      </div>
    </div>
  );
}
