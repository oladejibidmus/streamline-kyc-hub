
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Client } from '@/types';
import ClientCard from './ClientCard';
import ClientSearch from './ClientSearch';
import EmptyClientState from './EmptyClientState';

interface ClientListProps {
  onInviteClient?: () => void;
}

const ClientList = ({ onInviteClient }: ClientListProps) => {
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

  const handleInviteClient = () => {
    if (onInviteClient) {
      onInviteClient();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Clients</h1>
          <p className="text-slate-600 mt-2">Manage your client onboarding pipeline</p>
        </div>
        <Button onClick={handleInviteClient}>
          <MessageSquare className="h-4 w-4 mr-2" />
          Invite Client
        </Button>
      </div>

      <ClientSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {filteredClients.length === 0 && (
        <EmptyClientState hasSearchTerm={!!searchTerm} onInviteClient={handleInviteClient} />
      )}
    </div>
  );
};

export default ClientList;
