import { useState } from 'react';

interface SetupStep {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'done';
  description: string;
  details: string[];
}

const setupSteps: SetupStep[] = [
  {
    id: 'uptimerobot',
    title: 'Connect UptimeRobot MCP',
    status: 'pending',
    description: 'Set up the primary monitoring service for HTTP health checks',
    details: [
      'Create a free account at uptimerobot.com (free tier: 50 monitors, 5-min intervals)',
      'Generate an API key from Account Settings → My Settings',
      'Configure the MCP server endpoint: https://mcp.uptimerobot.com/mcp',
      'Add all website URLs as monitors with appropriate check intervals',
      'Set up alert contacts for email notifications',
      'Configure keyword monitoring for specific pages if needed',
    ],
  },
  {
    id: 'github',
    title: 'Configure GitHub Actions',
    status: 'pending',
    description: 'Set up scheduled health checks via CI/CD workflows',
    details: [
      'Create .github/workflows/health-check.yml in your repository',
      'Use schedule trigger: cron: "*/5 * * * *" for 5-minute checks',
      'Add curl/wget commands to check each endpoint',
      'Configure failure notifications via GitHub Actions secrets',
      'Set up a status badge in your README.md',
      'Use GitHub Actions variables for configurable URLs',
    ],
  },
  {
    id: 'gmail',
    title: 'Connect Gmail Notifications',
    status: 'pending',
    description: 'Enable email alerts for downtime and recovery events',
    details: [
      'Set up Gmail API credentials via Google Cloud Console',
      'Create OAuth 2.0 credentials (Desktop application type)',
      'Authorize the application to send emails on your behalf',
      'Configure alert templates (downtime, recovery, daily summary)',
      'Set up recipient lists for different severity levels',
      'Test email delivery with a sample alert',
    ],
  },
  {
    id: 'vercel',
    title: 'Link Vercel Deployments',
    status: 'pending',
    description: 'Monitor deployment status and detect broken releases',
    details: [
      'Generate a Vercel API token from vercel.com/account/tokens',
      'Connect to your Vercel team/project',
      'Enable deployment webhook notifications',
      'Configure automatic rollback detection',
      'Set up preview deployment monitoring',
      'Link deployment events to uptime incidents',
    ],
  },
];

export default function SetupGuide() {
  const [expandedStep, setExpandedStep] = useState<string | null>('uptimerobot');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Setup Guide</h2>
        <p className="text-sm text-gray-400 mt-1">Step-by-step instructions to connect all monitoring integrations</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">Setup Progress</h3>
          <span className="text-sm text-gray-400">0 / {setupSteps.length} complete</span>
        </div>
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all" style={{ width: '0%' }}></div>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {setupSteps.map(step => (
            <div key={step.id} className="flex items-center gap-2 text-sm">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                step.status === 'done' ? 'bg-emerald-500 text-white' :
                step.status === 'in_progress' ? 'bg-amber-500 text-white' :
                'bg-gray-700 text-gray-400'
              }`}>
                {step.status === 'done' ? '✓' : step.status === 'in_progress' ? '…' : '○'}
              </span>
              <span className="text-gray-300 truncate">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Steps */}
      <div className="space-y-3">
        {setupSteps.map((step, idx) => (
          <div key={step.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-800/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-sm font-bold text-gray-400">
                  {idx + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-white">{step.title}</h4>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
              </div>
              <span className={`text-xl transition-transform ${expandedStep === step.id ? 'rotate-180' : ''}`}>
                ▾
              </span>
            </button>
            
            {expandedStep === step.id && (
              <div className="px-5 pb-5 border-t border-gray-800 pt-4">
                <ol className="space-y-3">
                  {step.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-3">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs text-gray-400 mt-0.5">
                        {dIdx + 1}
                      </span>
                      <p className="text-sm text-gray-300">{detail}</p>
                    </li>
                  ))}
                </ol>
                
                {step.id === 'uptimerobot' && (
                  <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                    <p className="text-sm text-cyan-400">
                      💡 <strong>Priority:</strong> Start with UptimeRobot — it's the core monitoring service and can be set up in under 5 minutes with a free account.
                    </p>
                  </div>
                )}
                
                {step.id === 'github' && (
                  <div className="mt-4 p-3 bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-400 font-mono mb-2">Example workflow snippet:</p>
                    <pre className="text-xs text-gray-300 overflow-x-auto">
{`name: Health Check
on:
  schedule:
    - cron: '*/5 * * * *'
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Check endpoints
        run: |
          curl -sf https://your-site.com || exit 1`}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 border border-emerald-500/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-3">🚀 Quick Start</h3>
        <p className="text-sm text-gray-300 mb-4">
          To get monitoring running as fast as possible, follow these steps in order:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-emerald-400 font-medium text-sm">Step 1: UptimeRobot</p>
            <p className="text-xs text-gray-400 mt-1">Free account → Add monitors → Get API key</p>
            <p className="text-xs text-gray-500 mt-2">~5 minutes</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-cyan-400 font-medium text-sm">Step 2: GitHub Actions</p>
            <p className="text-xs text-gray-400 mt-1">Create workflow → Push to repo → Verify runs</p>
            <p className="text-xs text-gray-500 mt-2">~10 minutes</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-4">
            <p className="text-purple-400 font-medium text-sm">Step 3: Gmail + Vercel</p>
            <p className="text-xs text-gray-400 mt-1">OAuth setup → Authorize → Configure alerts</p>
            <p className="text-xs text-gray-500 mt-2">~15 minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
