import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BrainCircuit, Activity } from 'lucide-react';
import { cn } from '@/utils/utils';

const mobileItems = [
  { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Herd', path: '/herd', icon: Users },
  { name: 'Health', path: '/health', icon: Activity },
  { name: 'Decisions', path: '/decisions', icon: BrainCircuit },
];

export default function MobileNav() {
  return (
    <div className="flex justify-around items-center h-16 px-2 bg-white">
      {mobileItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors',
              isActive 
                ? 'text-[var(--color-forest)]' 
                : 'text-[var(--color-charcoal-light)]'
            )
          }
        >
          <item.icon className="w-5 h-5" />
          <span className="text-[10px] font-medium">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
}
