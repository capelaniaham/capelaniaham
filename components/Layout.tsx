
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Sparkles, 
  Settings,
  HeartPulse,
  LogOut
} from 'lucide-react';
/* Fix: Import Config type from root types.ts */
import { Config } from '../types';

/* Fix: Added missing properties to LayoutProps as required by App.tsx */
interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: string;
  isSyncing: boolean;
  isConnected: boolean;
  config: Config;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab,
  userRole,
  isSyncing,
  isConnected,
  config,
  onLogout 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'patients', label: 'Pacientes', icon: <Users size={20} /> },
    { id: 'visits', label: 'Visitas', icon: <ClipboardList size={20} /> },
    { id: 'ai-assistant', label: 'IA Assistente', icon: <Sparkles size={20} /> },
    { id: 'settings', label: 'Configurações', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col fixed h-full transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl text-indigo-900">
            <HeartPulse size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Lumen</h1>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-indigo-800 text-white shadow-lg shadow-indigo-950/20' 
                  : 'text-indigo-200 hover:bg-indigo-800/50 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-indigo-800">
          {/* Fix: Wire up onLogout functionality */}
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 text-indigo-200 hover:text-white w-full"
          >
            <LogOut size={20} />
            <span>Sair do Sistema</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h2>
            <p className="text-slate-50">Gestão de Capelania e Acolhimento</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-sm">Capelão João Silva</p>
              {/* Fix: Display the user role provided via props */}
              <p className="text-xs text-slate-500 text-indigo-600">Cargo: {userRole}</p>
            </div>
            <img 
              src="https://picsum.photos/seed/user123/100/100" 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
              alt="Avatar"
            />
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
