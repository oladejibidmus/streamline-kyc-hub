
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Eye, MessageSquare, FileText } from 'lucide-react';
import { Client } from '@/types';

interface ClientCardProps {
  client: Client;
}

const ClientCard = ({ client }: ClientCardProps) => {
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
    <Card className="hover:shadow-md transition-shadow">
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
  );
};

export default ClientCard;
