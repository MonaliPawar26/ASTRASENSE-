import React from 'react';
import { LayoutDashboard, Radio, Users, Home, Activity } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  setView: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Live Dashboard', icon: LayoutDashboard },
    { id: 'analysis', label: 'AI Analysis', icon: Activity },
    { id: 'team', label: 'Team', icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2" onClick={() => setView('home')}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 cursor-pointer">
            <Radio className="h-6 w-6 animate-pulse" />
          </div>
          <span className="text-xl font-bold tracking-wider text-white cursor-pointer select-none">
            ASTRA<span className="text-indigo-400">SENSE</span>
          </span>
        </div>

        <div className="hidden md:flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                currentView === item.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button (Simplified for this demo) */}
        <button className="md:hidden p-2 text-slate-400 hover:text-white">
          <span className="sr-only">Open menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;