import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Activity, TrendingUp, BrainCircuit,
  TestTube, Settings, UserCircle, IndianRupee, Dna, LogOut
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/utils';

const navItems = [
  { key: 'nav.overview',    path: '/dashboard',  icon: LayoutDashboard },
  { key: 'nav.herd',        path: '/herd',        icon: Users },
  { key: 'nav.productivity',path: '/productivity',icon: TrendingUp },
  { key: 'nav.health',      path: '/health',      icon: Activity },
  { key: 'nav.economics',   path: '/economics',   icon: IndianRupee },
  { key: 'nav.breeding',    path: '/breeding',    icon: Dna },
  { key: 'nav.decisions',   path: '/decisions',   icon: BrainCircuit },
  { key: 'nav.whatif',      path: '/what-if',     icon: TestTube },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-ivory-dark)]">
      <div className="p-6 border-b border-black/5">
        <h1 className="font-serif text-2xl text-[var(--color-forest)] leading-tight">
          Kangeyam Insight
        </h1>
        <p className="text-xs text-[var(--color-charcoal-light)] mt-1 tracking-widest uppercase">
          Decision Support
        </p>
      </div>

      {/* User info */}
      {user && (
        <div className="px-4 py-3 border-b border-black/5 bg-white/50">
          <p className="text-xs font-medium text-[var(--color-charcoal)]">{user.name}</p>
          <p className="text-xs text-[var(--color-charcoal-light)]">{user.farmName}</p>
        </div>
      )}

      <nav className="flex-1 px-3 space-y-0.5 mt-3 overflow-y-auto py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.key}
            to={item.path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors rounded-sm',
                isActive
                  ? 'text-[var(--color-forest)] bg-white shadow-sm border border-black/5'
                  : 'text-[var(--color-charcoal-light)] hover:text-[var(--color-forest)] hover:bg-black/5'
              )
            }
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {t(item.key)}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 mt-auto border-t border-black/5 space-y-0.5">
        <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[var(--color-charcoal-light)] hover:text-[var(--color-forest)] w-full transition-colors rounded-sm hover:bg-black/5">
          <Settings className="w-4 h-4" />
          {t('nav.settings')}
        </button>
        <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[var(--color-charcoal-light)] hover:text-[var(--color-forest)] w-full transition-colors rounded-sm hover:bg-black/5">
          <UserCircle className="w-4 h-4" />
          {t('nav.profile')}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-[var(--color-decision-red)] hover:bg-[var(--color-decision-red-light)] w-full transition-colors rounded-sm"
        >
          <LogOut className="w-4 h-4" />
          {t('nav.logout')}
        </button>
      </div>
    </div>
  );
}
