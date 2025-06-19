
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Download,
  Eye,
  Clock,
  Users,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  client: string;
  type: 'kyc' | 'aml' | 'sanctions' | 'pep';
  status: 'pending' | 'in_review' | 'approved' | 'rejected' | 'expired';
  riskLevel: 'low' | 'medium' | 'high';
  dueDate: string;
  completedDate?: string;
  assignedTo: string;
  documents: number;
  notes: string;
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  client: string;
  details: string;
}

const ComplianceCenter = () => {
  const [complianceItems] = useState<ComplianceItem[]>([
    {
      id: '1',
      client: 'Acme Corporation',
      type: 'kyc',
      status: 'in_review',
      riskLevel: 'low',
      dueDate: '2024-02-15',
      assignedTo: 'Sarah Johnson',
      documents: 8,
      notes: 'Standard KYC review in progress'
    },
    {
      id: '2',
      client: 'TechStart Inc',
      type: 'aml',
      status: 'pending',
      riskLevel: 'medium',
      dueDate: '2024-02-10',
      assignedTo: 'Mike Chen',
      documents: 12,
      notes: 'Additional AML screening required'
    },
    {
      id: '3',
      client: 'Global Solutions',
      type: 'sanctions',
      status: 'approved',
      riskLevel: 'low',
      dueDate: '2024-01-30',
      completedDate: '2024-01-28',
      assignedTo: 'Emily Davis',
      documents: 6,
      notes: 'Sanctions screening completed successfully'
    },
    {
      id: '4',
      client: 'Innovation Labs',
      type: 'pep',
      status: 'rejected',
      riskLevel: 'high',
      dueDate: '2024-01-25',
      completedDate: '2024-01-26',
      assignedTo: 'John Smith',
      documents: 15,
      notes: 'PEP match found - requires enhanced due diligence'
    }
  ]);

  const [auditLogs] = useState<AuditLog[]>([
    {
      id: '1',
      timestamp: '2024-01-26T14:30:00Z',
      user: 'John Smith',
      action: 'Status Changed',
      client: 'Innovation Labs',
      details: 'Changed status from "in_review" to "rejected" - PEP match found'
    },
    {
      id: '2',
      timestamp: '2024-01-26T10:15:00Z',
      user: 'Emily Davis',
      action: 'Document Uploaded',
      client: 'Global Solutions',
      details: 'Uploaded sanctions screening report'
    },
    {
      id: '3',
      timestamp: '2024-01-25T16:45:00Z',
      user: 'Sarah Johnson',
      action: 'Review Started',
      client: 'Acme Corporation',
      details: 'Began KYC review process'
    },
    {
      id: '4',
      timestamp: '2024-01-25T09:20:00Z',
      user: 'Mike Chen',
      action: 'Assignment Changed',
      client: 'TechStart Inc',
      details: 'Assigned AML review to Mike Chen'
    }
  ]);

  const getStatusColor = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in_review': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: ComplianceItem['riskLevel']) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'in_review': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'expired': return <AlertTriangle className="h-4 w-4 text-gray-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const complianceStats = {
    totalItems: complianceItems.length,
    pending: complianceItems.filter(item => item.status === 'pending').length,
    inReview: complianceItems.filter(item => item.status === 'in_review').length,
    approved: complianceItems.filter(item => item.status === 'approved').length,
    rejected: complianceItems.filter(item => item.status === 'rejected').length,
    highRisk: complianceItems.filter(item => item.riskLevel === 'high').length,
    overdue: complianceItems.filter(item => 
      item.status !== 'approved' && new Date(item.dueDate) < new Date()
    ).length
  };

  const complianceRate = Math.round((complianceStats.approved / complianceStats.totalItems) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Compliance Center</h1>
        <p className="text-slate-600 mt-2">Monitor compliance status and manage risk assessments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStats.totalItems}</div>
            <p className="text-xs text-muted-foreground">Active compliance items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{complianceStats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{complianceStats.highRisk}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{complianceRate}%</div>
            <p className="text-xs text-muted-foreground">Approval rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reviews">Compliance Reviews</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Compliance Reviews</h3>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                New Review
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {complianceItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(item.status)}
                        <h3 className="font-semibold text-slate-900">{item.client}</h3>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.replace('_', ' ')}
                        </Badge>
                        <Badge className={getRiskColor(item.riskLevel)}>
                          {item.riskLevel} risk
                        </Badge>
                        <Badge variant="outline">
                          {item.type.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-slate-500">Assigned To</span>
                          <p className="font-medium">{item.assignedTo}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Due Date</span>
                          <p className="font-medium">{new Date(item.dueDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Documents</span>
                          <p className="font-medium">{item.documents}</p>
                        </div>
                        <div>
                          <span className="text-slate-500">Progress</span>
                          <div className="flex items-center gap-2">
                            <Progress value={item.status === 'approved' ? 100 : item.status === 'in_review' ? 60 : 30} className="flex-1" />
                            <span className="text-xs">{item.status === 'approved' ? 100 : item.status === 'in_review' ? 60 : 30}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-slate-600">{item.notes}</p>
                    </div>

                    <div className="flex flex-col gap-2 ml-6">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Documents
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Status Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Approved</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(complianceStats.approved / complianceStats.totalItems) * 100} className="w-20" />
                        <span className="text-sm font-medium">{complianceStats.approved}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">In Review</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(complianceStats.inReview / complianceStats.totalItems) * 100} className="w-20" />
                        <span className="text-sm font-medium">{complianceStats.inReview}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(complianceStats.pending / complianceStats.totalItems) * 100} className="w-20" />
                        <span className="text-sm font-medium">{complianceStats.pending}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Rejected</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(complianceStats.rejected / complianceStats.totalItems) * 100} className="w-20" />
                        <span className="text-sm font-medium">{complianceStats.rejected}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Risk Analysis</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {complianceItems.filter(item => item.riskLevel === 'low').length}
                      </div>
                      <div className="text-sm text-green-700">Low Risk</div>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">
                        {complianceItems.filter(item => item.riskLevel === 'medium').length}
                      </div>
                      <div className="text-sm text-yellow-700">Medium Risk</div>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">
                        {complianceItems.filter(item => item.riskLevel === 'high').length}
                      </div>
                      <div className="text-sm text-red-700">High Risk</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Audit Trail</h3>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{log.user}</span>
                        <span className="text-sm text-slate-500">•</span>
                        <span className="text-sm font-medium text-blue-600">{log.action}</span>
                        <span className="text-sm text-slate-500">•</span>
                        <span className="text-sm text-slate-500">{log.client}</span>
                      </div>
                      <p className="text-sm text-slate-600">{log.details}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(log.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceCenter;
