
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertTriangle, 
  Shield, 
  Search, 
  Filter, 
  Eye, 
  FileCheck,
  Clock,
  XCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const ComplianceCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for risk assessments
  const riskAlerts = [
    {
      id: '1',
      client: 'Innovation Labs',
      contact: 'Emily Davis',
      risk_level: 'high',
      alert_type: 'sanctions_hit',
      description: 'Potential sanctions match detected',
      status: 'requires_review',
      created_at: '2024-01-22T10:00:00Z'
    },
    {
      id: '2',
      client: 'Global Tech Solutions',
      contact: 'Robert Kim',
      risk_level: 'medium',
      alert_type: 'high_risk_country',
      description: 'Client registered in high-risk jurisdiction',
      status: 'under_review',
      created_at: '2024-01-21T15:30:00Z'
    },
    {
      id: '3',
      client: 'Crypto Innovations',
      contact: 'Lisa Zhang',
      risk_level: 'high',
      alert_type: 'pep_match',
      description: 'Politically Exposed Person detected',
      status: 'escalated',
      created_at: '2024-01-20T09:15:00Z'
    }
  ];

  const verifications = [
    {
      id: '1',
      client: 'Acme Corporation',
      type: 'identity',
      status: 'verified',
      provider: 'stripe_identity',
      completed_at: '2024-01-20T14:30:00Z'
    },
    {
      id: '2',
      client: 'TechStart Inc',
      type: 'address',
      status: 'pending',
      provider: 'manual',
      completed_at: null
    },
    {
      id: '3',
      client: 'Global Solutions',
      type: 'sanctions',
      status: 'cleared',
      provider: 'opensanctions',
      completed_at: '2024-01-19T11:20:00Z'
    }
  ];

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'cleared':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
      case 'under_review':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'requires_review':
      case 'escalated':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'cleared':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'requires_review':
      case 'escalated':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const riskStats = {
    totalAssessments: 156,
    highRisk: 12,
    mediumRisk: 34,
    lowRisk: 110,
    pendingReviews: 8
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Risk & Compliance Center</h1>
        <p className="text-slate-600 mt-2">Monitor and manage client risk assessments and compliance checks</p>
      </div>

      {/* Risk Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{riskStats.totalAssessments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">High Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{riskStats.highRisk}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">Medium Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{riskStats.mediumRisk}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Low Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{riskStats.lowRisk}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-600">Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{riskStats.pendingReviews}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="w-full">
        <TabsList>
          <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
          <TabsTrigger value="verifications">Verifications</TabsTrigger>
          <TabsTrigger value="sanctions">Sanctions Screening</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Risk Alerts Requiring Attention
                </CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAlerts.map((alert) => (
                  <div key={alert.id} className="border rounded-lg p-4 bg-red-50/50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-slate-900">{alert.client}</h3>
                          <Badge className={getRiskBadgeColor(alert.risk_level)}>
                            {alert.risk_level} risk
                          </Badge>
                          <Badge className={getStatusBadgeColor(alert.status)}>
                            {alert.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-slate-600">Contact: {alert.contact}</p>
                            <p className="text-sm text-slate-600">Alert Type: {alert.alert_type.replace('_', ' ')}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">Created: {new Date(alert.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 font-medium">{alert.description}</p>
                      </div>
                      <div className="flex flex-col gap-2 ml-6">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button size="sm">
                          <FileCheck className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Identity & Document Verifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {verifications.map((verification) => (
                  <div key={verification.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-slate-900">{verification.client}</h3>
                          <Badge variant="outline">
                            {verification.type}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(verification.status)}
                            <Badge className={getStatusBadgeColor(verification.status)}>
                              {verification.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-slate-600">Provider: {verification.provider}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600">
                              {verification.completed_at 
                                ? `Completed: ${new Date(verification.completed_at).toLocaleDateString()}`
                                : 'In progress'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-6">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sanctions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                Sanctions & PEP Screening
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-blue-50/50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Database Status</h3>
                    <Badge className="bg-green-100 text-green-800">Up to date</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Last Updated</p>
                      <p className="font-medium">2024-01-22 06:00 UTC</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Records Count</p>
                      <p className="font-medium">1,247,832</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Data Source</p>
                      <p className="font-medium">OpenSanctions (MIT)</p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 mb-4">Recent Screening Results</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                      <div>
                        <p className="font-medium">Acme Corporation - John Smith</p>
                        <p className="text-sm text-slate-600">No matches found</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Clear</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                      <div>
                        <p className="font-medium">Innovation Labs - Emily Davis</p>
                        <p className="text-sm text-slate-600">Potential PEP match detected</p>
                      </div>
                      <Badge className="bg-red-100 text-red-800">Hit</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                      <div>
                        <p className="font-medium">Global Tech - Robert Kim</p>
                        <p className="text-sm text-slate-600">Manual review required</p>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Review</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceCenter;
