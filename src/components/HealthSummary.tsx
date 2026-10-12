import { MonitoringData } from '../types';

interface HealthSummaryProps {
  data: MonitoringData;
}

function UptimeRing({ percentage }: { percentage: number }) {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (percentage / 100) * circumference;
  const color = percentage >= 99 ? '#10b981' : percentage >= 97 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative w-32 h-32">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="8" />
        <circle
          cx="50" cy="50" r="45" fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-2xl font-bold text-white">{percentage}%</span>
        <span className="text-xs text-gray-400">uptime</span>
      </div>
    </div>
  );
}

export default function HealthSummary({ data }: HealthSummaryProps) {
  return (
    <div className="mt-8 space-y-6">
      {/* Weekly Summary */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-white">Weekly Health Summary</h2>
            <p className="text-sm text-gray-400">Last 7 days performance overview</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Period</p>
            <p className="text-sm text-white font-medium">
              {new Date(Date.now() - 7 * 86400000).toLocaleDateString()} — {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Uptime Ring */}
          <div className="flex flex-col items-center justify-center">
            <UptimeRing percentage={data.weeklyUptime} />
            <p className="mt-3 text-sm text-gray-400">Overall Uptime</p>
          </div>

          {/* Daily Stats */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Daily Checks</p>
              <p className="text-2xl font-bold text-white mt-1">{data.dailyChecks.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">~16 checks/hour per site</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Daily Failures</p>
              <p className="text-2xl font-bold text-amber-400 mt-1">{data.dailyFailures}</p>
              <p className="text-xs text-gray-500 mt-1">{((data.dailyFailures / data.dailyChecks) * 100).toFixed(2)}% failure rate</p>
            </div>
          </div>

          {/* Response Time Stats */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Avg Response</p>
              <p className="text-2xl font-bold text-white mt-1">{data.avgResponseTime}ms</p>
              <p className="text-xs text-gray-500 mt-1">Across all endpoints</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Active Incidents</p>
              <p className="text-2xl font-bold text-red-400 mt-1">{data.incidents.filter(i => !i.resolvedAt).length}</p>
              <p className="text-xs text-gray-500 mt-1">Requiring attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Summary Bar Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Daily Check Success Rate (7 days)</h3>
        <div className="flex items-end gap-2 h-32">
          {[99.8, 99.9, 98.5, 99.7, 97.2, 99.1, 98.8].map((rate, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-400">{rate}%</span>
              <div
                className={`w-full rounded-t transition-all ${rate >= 99 ? 'bg-emerald-500' : rate >= 98 ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ height: `${(rate - 95) * 15}px` }}
              ></div>
              <span className="text-xs text-gray-500">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-cyan-500/5 to-emerald-500/5 border border-cyan-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">🤖 Agent Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-red-400 shrink-0 mt-0.5">1.</span>
            <p className="text-sm text-gray-300">
              <strong className="text-white">Code Assistant</strong> is currently down (HTTP 502). 
              Check Vercel deployment logs and consider rolling back to the last stable deployment.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-amber-400 shrink-0 mt-0.5">2.</span>
            <p className="text-sm text-gray-300">
              <strong className="text-white">ChatBot API</strong> and <strong className="text-white">NLP Service</strong> show degraded response times.
              Investigate database connection pooling and consider scaling up resources.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-cyan-400 shrink-0 mt-0.5">3.</span>
            <p className="text-sm text-gray-300">
              Connect <strong className="text-white">UptimeRobot</strong> integration to enable real monitoring.
              This will provide actual uptime data, SSL monitoring, and automatic alerting.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
