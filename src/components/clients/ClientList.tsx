
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, Filter, Eye, MessageSquare, FileText } from 'lucide-react';
import { Client } from '@/types';

const ClientList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with actual data fetching
  const clients: Client[] = [
    {
      id: '1',
      org_id: 'org_1',
      company: 'Acme Corporation',
      contact_name: 'John Smith',
      email: 'john@acmecorp.com',
      risk_score: 'low',
      status: 'completed',
      created_at: '2024-01-15T10:00:00Z',
      updated_at: '2024-01-20T15:30:00Z'
    },
    {
      id: '2',
      org_id: 'org_1',
      company: 'TechStart Inc',
      contact_name: 'Sarah Johnson',
      email: 'sarah@techstart.com',
      risk_score: 'medium',
      status: 'started',
      created_at: '2024-01-18T09:15:00Z',
      updated_at: '2024-01-21T11:45:00Z'
    },
    {
      id: '3',
      org_id: 'org_1',
      company: 'Global Solutions Ltd',
      contact_name: 'Mike Chen',
      email: 'mike@globalsolutions.com',
      risk_score: 'low',
      status: 'approved',
      created_at: '2024-01-12T14:20:00Z',
      updated_at: '2024-01-19T16:10:00Z'
    },
    {
      id: '4',
      org_id: 'org_1',
      company: 'Innovation Labs',
      contact_name: 'Emily Davis',
      email: 'emily@innovationlabs.com',
      risk_score: 'high',
      status: 'invited',
      created_at: '2024-01-22T08:00:00Z',
      updated_at: '2024-01-22T08:00:00Z'
    }
  ];

  const filteredClients = clients.filter(client =>
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'started': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'invited': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'invited': return 10;
      case 'started': return 50;
      case 'completed': return 85;
      case 'approved': return 100;
      case 'rejected': return 0;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
          <p className="text-slate-600 mt-2">Manage your client onboarding pipeline</p>
        </div>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Invite Client
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search clients by company, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client List */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{client.company}</h3>
                    <Badge className={getRiskBadgeColor(client.risk_score)}>
                      {client.risk_score} risk
                    </Badge>
                    <Badge className={getStatusBadgeColor(client.status)}>
                      {client.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-600">Contact Person</p>
                      <p className="font-medium">{client.contact_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="font-medium">{client.email}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600">Onboarding Progress</span>
                      <span className="text-sm font-medium">{getProgressValue(client.status)}%</span>
                    </div>
                    <Progress value={getProgressValue(client.status)} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Created: {new Date(client.created_at).toLocaleDateString()}</span>
                    <span>Updated: {new Date(client.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-6">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search terms.' : 'Get started by inviting your first client.'}
              </p>
              {!searchTerm && (
                <Button>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Invite Client
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientList;
