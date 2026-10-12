export interface MonitoredSite {
  id: number;
  name: string;
  url: string;
  status: 'online' | 'offline' | 'degraded';
  responseTime: number;
  uptime: number;
  lastChecked: Date;
}

export interface Incident {
  id: number;
  siteName: string;
  type: 'down' | 'degraded';
  startedAt: Date;
  resolvedAt: Date | null;
  duration: string;
  error: string;
}

export interface MonitoringData {
  totalSites: number;
  online: number;
  offline: number;
  degraded: number;
  avgResponseTime: number;
  sites: MonitoredSite[];
  incidents: Incident[];
  weeklyUptime: number;
  dailyChecks: number;
  dailyFailures: number;
}

export interface IntegrationStatus {
  id: string;
  name: string;
  status: 'connected' | 'not_connected' | 'error';
  description: string;
  setupUrl: string;
}
