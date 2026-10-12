import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import IntegrationPanel from './components/IntegrationPanel';
import IncidentTimeline from './components/IncidentTimeline';
import HealthSummary from './components/HealthSummary';
import SetupGuide from './components/SetupGuide';
import Header from './components/Header';
import { MonitoringData, IntegrationStatus } from './types';

const mockData: MonitoringData = {
  totalSites: 8,
  online: 5,
  offline: 1,
  degraded: 2,
  avgResponseTime: 342,
  sites: [
    { id: 1, name: 'AI Portfolio', url: 'https://sowjith-ai.vercel.app', status: 'online', responseTime: 187, uptime: 99.98, lastChecked: new Date(Date.now() - 30000) },
    { id: 2, name: 'ML Dashboard', url: 'https://ml-dashboard.sowjith.dev', status: 'online', responseTime: 234, uptime: 99.95, lastChecked: new Date(Date.now() - 45000) },
    { id: 3, name: 'ChatBot API', url: 'https://chatbot-api.sowjith.dev', status: 'degraded', responseTime: 1247, uptime: 97.82, lastChecked: new Date(Date.now() - 15000) },
    { id: 4, name: 'Image Generator', url: 'https://img-gen.sowjith.dev', status: 'online', responseTime: 456, uptime: 99.91, lastChecked: new Date(Date.now() - 60000) },
    { id: 5, name: 'Code Assistant', url: 'https://code-assist.sowjith.dev', status: 'offline', responseTime: 0, uptime: 94.12, lastChecked: new Date(Date.now() - 10000) },
    { id: 6, name: 'Data Viz Tool', url: 'https://dataviz.sowjith.dev', status: 'online', responseTime: 298, uptime: 99.99, lastChecked: new Date(Date.now() - 20000) },
    { id: 7, name: 'NLP Service', url: 'https://nlp.sowjith.dev', status: 'degraded', responseTime: 2103, uptime: 96.45, lastChecked: new Date(Date.now() - 25000) },
    { id: 8, name: 'Personal Blog', url: 'https://blog.sowjith.dev', status: 'online', responseTime: 156, uptime: 99.97, lastChecked: new Date(Date.now() - 35000) },
  ],
  incidents: [
    { id: 1, siteName: 'Code Assistant', type: 'down', startedAt: new Date(Date.now() - 3600000), resolvedAt: null, duration: '1h ago - ongoing', error: 'HTTP 502 Bad Gateway' },
    { id: 2, siteName: 'ChatBot API', type: 'degraded', startedAt: new Date(Date.now() - 7200000), resolvedAt: null, duration: '2h ago - ongoing', error: 'Response time > 1000ms' },
    { id: 3, siteName: 'NLP Service', type: 'degraded', startedAt: new Date(Date.now() - 5400000), resolvedAt: null, duration: '1.5h ago - ongoing', error: 'Response time > 2000ms' },
    { id: 4, siteName: 'AI Portfolio', type: 'down', startedAt: new Date(Date.now() - 86400000), resolvedAt: new Date(Date.now() - 82800000), duration: '1h 0m', error: 'Vercel deployment failure' },
    { id: 5, siteName: 'Image Generator', type: 'down', startedAt: new Date(Date.now() - 172800000), resolvedAt: new Date(Date.now() - 169200000), duration: '1h 0m', error: 'SSL certificate expired' },
    { id: 6, siteName: 'ML Dashboard', type: 'degraded', startedAt: new Date(Date.now() - 259200000), resolvedAt: new Date(Date.now() - 252000000), duration: '2h 0m', error: 'Database connection timeout' },
  ],
  weeklyUptime: 98.76,
  dailyChecks: 1152,
  dailyFailures: 14,
};

const integrations: IntegrationStatus[] = [
  { id: 'uptimerobot', name: 'UptimeRobot MCP', status: 'not_connected', description: 'Primary monitoring service for HTTP checks', setupUrl: 'https://mcp.uptimerobot.com/mcp' },
  { id: 'github', name: 'GitHub Actions', status: 'not_connected', description: 'Scheduled health checks via CI/CD', setupUrl: '#' },
  { id: 'gmail', name: 'Gmail Notifications', status: 'not_connected', description: 'Email alerts for downtime & recovery', setupUrl: '#' },
  { id: 'vercel', name: 'Vercel Deployments', status: 'not_connected', description: 'Deployment status & rollback detection', setupUrl: '#' },
];

export default function App() {
  const [data, setData] = useState<MonitoringData>(mockData);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'incidents' | 'integrations' | 'setup'>('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live response time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        sites: prev.sites.map(site => ({
          ...site,
          responseTime: site.status === 'offline' ? 0 : Math.max(50, site.responseTime + Math.floor(Math.random() * 40 - 20)),
          lastChecked: new Date(),
        })),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Header currentTime={currentTime} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard data={data} />}
        {activeTab === 'incidents' && <IncidentTimeline incidents={data.incidents} />}
        {activeTab === 'integrations' && <IntegrationPanel integrations={integrations} />}
        {activeTab === 'setup' && <SetupGuide />}
        
        {activeTab === 'dashboard' && <HealthSummary data={data} />}
      </main>

      <footer className="border-t border-gray-800 mt-12 py-6 text-center text-gray-500 text-sm">
        <p>Sowjith AI Tools Health Agent • Autonomous Monitoring System</p>
        <p className="mt-1 text-xs text-gray-600">
          ⚠️ Demo Mode — Data shown is simulated. Connect integrations below for live monitoring.
        </p>
      </footer>
    </div>
  );
}
