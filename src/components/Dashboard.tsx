import { MonitoringData } from '../types';

interface DashboardProps {
  data: MonitoringData;
}

function StatusBadge({ status }: { status: string }) {
  const colors = {
    online: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    offline: 'bg-red-500/20 text-red-400 border-red-500/30',
    degraded: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  };
  const labels = { online: '● Online', offline: '● Offline', degraded: '● Degraded' };
  
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors[status as keyof typeof colors]}`}>
      {labels[status as keyof typeof labels]}
    </span>
  );
}

function StatCard({ label, value, subtext, color }: { label: string; value: string | number; subtext?: string; color: string }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
    </div>
  );
}

function ResponseTimeBar({ time, max }: { time: number; max: number }) {
  const pct = Math.min((time / max) * 100, 100);
  const color = time < 300 ? 'bg-emerald-500' : time < 1000 ? 'bg-amber-500' : 'bg-red-500';
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-400 w-16 text-right">{time}ms</span>
    </div>
  );
}

export default function Dashboard({ data }: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Monitored" value={data.totalSites} subtext="Active endpoints" color="text-white" />
        <StatCard label="Online" value={data.online} subtext={`${((data.online / data.totalSites) * 100).toFixed(0)}% healthy`} color="text-emerald-400" />
        <StatCard label="Offline" value={data.offline} subtext="Requires attention" color="text-red-400" />
        <StatCard label="Degraded" value={data.degraded} subtext="Slow responses" color="text-amber-400" />
      </div>

      {/* Response Time Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Response Times</h2>
          <span className="text-sm text-gray-400">Avg: {data.avgResponseTime}ms</span>
        </div>
        <div className="space-y-3">
          {data.sites.map(site => (
            <div key={site.id} className="flex items-center gap-4">
              <span className="text-sm text-gray-300 w-32 truncate">{site.name}</span>
              <div className="flex-1">
                <ResponseTimeBar time={site.responseTime} max={3000} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sites Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-white">Monitored Services</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left px-6 py-3 text-gray-400 font-medium">Service</th>
                <th className="text-left px-6 py-3 text-gray-400 font-medium">Status</th>
                <th className="text-left px-6 py-3 text-gray-400 font-medium">Response</th>
                <th className="text-left px-6 py-3 text-gray-400 font-medium">Uptime</th>
                <th className="text-left px-6 py-3 text-gray-400 font-medium">Last Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {data.sites.map(site => (
                <tr key={site.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-white">{site.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[200px]">{site.url}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={site.status} />
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-mono ${
                      site.status === 'offline' ? 'text-gray-600' :
                      site.responseTime < 300 ? 'text-emerald-400' :
                      site.responseTime < 1000 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {site.status === 'offline' ? '—' : `${site.responseTime}ms`}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-mono ${site.uptime >= 99.9 ? 'text-emerald-400' : site.uptime >= 98 ? 'text-amber-400' : 'text-red-400'}`}>
                      {site.uptime}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {Math.round((Date.now() - site.lastChecked.getTime()) / 1000)}s ago
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
