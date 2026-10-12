interface HeaderProps {
  currentTime: Date;
  activeTab: string;
  setActiveTab: (tab: 'dashboard' | 'incidents' | 'integrations' | 'setup') => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'incidents', label: 'Incidents', icon: '🚨' },
  { id: 'integrations', label: 'Integrations', icon: '🔌' },
  { id: 'setup', label: 'Setup Guide', icon: '🛠️' },
] as const;

export default function Header({ currentTime, activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-lg font-bold text-gray-900">
              S
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">AI Tools Health Agent</h1>
              <p className="text-xs text-gray-400">Autonomous Monitoring System</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Demo Mode</span>
            <span className="text-gray-600">|</span>
            <span>{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
        
        <nav className="flex gap-1 -mb-px overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
