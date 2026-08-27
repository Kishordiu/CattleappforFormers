import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

export default function AppLayout() {
  return (
    <div className="min-h-screen flex bg-[var(--color-ivory)]">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 border-r border-black/5 bg-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 relative min-h-screen pb-16 md:pb-0">
        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-black/5 bg-white sticky top-0 z-40">
          <span className="font-serif text-xl text-[var(--color-forest)]">Kangeyam Insight</span>
        </div>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-black/5">
        <MobileNav />
      </div>
    </div>
  );
}
