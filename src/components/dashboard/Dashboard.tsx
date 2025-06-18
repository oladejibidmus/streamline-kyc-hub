
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, FileCheck, AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  // Mock data - replace with actual data fetching
  const stats = {
    totalClients: 247,
    activeOnboarding: 18,
    completedThisMonth: 42,
    riskAlerts: 3,
    monthlyRevenue: 125000,
    conversionRate: 87.5
  };

  const recentClients = [
    { id: '1', name: 'Acme Corp', contact: 'John Smith', status: 'review', risk: 'low', progress: 85 },
    { id: '2', name: 'TechStart Inc', contact: 'Sarah Johnson', status: 'waiting_client', risk: 'medium', progress: 60 },
    { id: '3', name: 'Global Solutions', contact: 'Mike Chen', status: 'done', risk: 'low', progress: 100 },
    { id: '4', name: 'Innovation Labs', contact: 'Emily Davis', status: 'to_do', risk: 'high', progress: 25 },
  ];

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'waiting_client': return 'bg-yellow-100 text-yellow-800';
      case 'to_do': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Overview of your client onboarding pipeline</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Onboarding</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeOnboarding}</div>
            <p className="text-xs text-muted-foreground">
              In progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.riskAlerts}</div>
            <p className="text-xs text-muted-foreground">
              Require review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Clients */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Client Activity</CardTitle>
          <CardDescription>Latest onboarding progress and status updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentClients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 rounded-lg border bg-slate-50/50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-slate-900">{client.name}</h3>
                    <Badge className={getRiskBadgeColor(client.risk)}>
                      {client.risk} risk
                    </Badge>
                    <Badge className={getStatusBadgeColor(client.status)}>
                      {client.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">Contact: {client.contact}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Progress value={client.progress} className="flex-1 max-w-[200px]" />
                    <span className="text-sm text-slate-500">{client.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
