import { IntegrationStatus } from '../types';

interface IntegrationPanelProps {
  integrations: IntegrationStatus[];
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'connected') return <span className="text-emerald-400 text-xl">✓</span>;
  if (status === 'error') return <span className="text-red-400 text-xl">✗</span>;
  return <span className="text-gray-500 text-xl">○</span>;
}

export default function IntegrationPanel({ integrations }: IntegrationPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Integration Status</h2>
          <p className="text-sm text-gray-400 mt-1">Current connection status of monitoring services</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg px-3 py-2">
          <span className="text-amber-400 text-sm">⚠️</span>
          <span className="text-amber-400 text-sm font-medium">No integrations connected</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {integrations.map(integration => (
          <div
            key={integration.id}
            className={`bg-gray-900 border rounded-xl p-5 transition-all ${
              integration.status === 'connected'
                ? 'border-emerald-500/30'
                : integration.status === 'error'
                ? 'border-red-500/30'
                : 'border-gray-800 hover:border-gray-700'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <StatusIcon status={integration.status} />
                <div>
                  <h3 className="font-semibold text-white">{integration.name}</h3>
                  <p className="text-sm text-gray-400 mt-0.5">{integration.description}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                integration.status === 'connected'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : integration.status === 'error'
                  ? 'bg-red-500/20 text-red-400'
                  : 'bg-gray-800 text-gray-400'
              }`}>
                {integration.status === 'connected' ? 'Connected' : integration.status === 'error' ? 'Error' : 'Not Connected'}
              </span>
              
              {integration.status !== 'connected' && (
                <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  Setup →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Connection Summary */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Connection Assessment</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-red-400 mt-0.5">✗</span>
            <div>
              <p className="text-sm text-gray-300 font-medium">UptimeRobot MCP Server</p>
              <p className="text-xs text-gray-500">Endpoint: https://mcp.uptimerobot.com/mcp — Not reachable from this environment. Requires API key configuration.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 mt-0.5">✗</span>
            <div>
              <p className="text-sm text-gray-300 font-medium">GitHub Actions</p>
              <p className="text-xs text-gray-500">No repository access configured. Cannot verify workflow status or trigger scheduled checks.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 mt-0.5">✗</span>
            <div>
              <p className="text-sm text-gray-300 font-medium">Gmail Notifications</p>
              <p className="text-xs text-gray-500">Email service not connected. Alerts and daily summaries cannot be sent.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-red-400 mt-0.5">✗</span>
            <div>
              <p className="text-sm text-gray-300 font-medium">Vercel Deployments</p>
              <p className="text-xs text-gray-500">No Vercel token or project access. Cannot monitor deployment status.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
