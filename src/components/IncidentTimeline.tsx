import { Incident } from '../types';

interface IncidentTimelineProps {
  incidents: Incident[];
}

export default function IncidentTimeline({ incidents }: IncidentTimelineProps) {
  const activeIncidents = incidents.filter(i => !i.resolvedAt);
  const resolvedIncidents = incidents.filter(i => i.resolvedAt);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Incident Timeline</h2>
        <p className="text-sm text-gray-400 mt-1">Track outages, degraded services, and recovery events</p>
      </div>

      {/* Active Incidents */}
      {activeIncidents.length > 0 && (
        <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
            <h3 className="text-lg font-semibold text-red-400">Active Incidents ({activeIncidents.length})</h3>
          </div>
          <div className="space-y-4">
            {activeIncidents.map(incident => (
              <div key={incident.id} className="bg-gray-900/50 border border-red-500/10 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-white">{incident.siteName}</p>
                    <p className="text-sm text-red-400 mt-1">{incident.error}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    incident.type === 'down' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {incident.type === 'down' ? 'DOWN' : 'DEGRADED'}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                  <span>⏱ Started: {incident.duration}</span>
                  <span>📧 Alert sent</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resolved Incidents */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-3 h-3 rounded-full bg-emerald-500"></span>
          <h3 className="text-lg font-semibold text-white">Resolved Incidents ({resolvedIncidents.length})</h3>
        </div>
        <div className="space-y-3">
          {resolvedIncidents.map(incident => (
            <div key={incident.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-200">{incident.siteName}</p>
                <p className="text-xs text-gray-500 truncate">{incident.error}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-gray-400">Duration: {incident.duration}</p>
                <p className="text-xs text-emerald-400">✓ Recovered</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Visual */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">7-Day Timeline</h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800"></div>
          {incidents.map((incident, idx) => (
            <div key={incident.id} className="relative pl-10 pb-6 last:pb-0">
              <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${
                incident.resolvedAt ? 'bg-emerald-500 border-emerald-400' : 'bg-red-500 border-red-400 animate-pulse'
              }`}></div>
              <div className="bg-gray-800/30 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{incident.siteName}</span>
                  <span className="text-xs text-gray-500">{incident.duration}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{incident.error}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
