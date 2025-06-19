
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, Eye, Edit, Trash2 } from 'lucide-react';
import { Client } from '@/types';
import ClientCard from './ClientCard';
import ClientSearch from './ClientSearch';
import EmptyClientState from './EmptyClientState';
import ClientDetailModal from './ClientDetailModal';

interface ClientListProps {
  onInviteClient?: () => void;
}

const ClientList = ({ onInviteClient }: ClientListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // Mock data - replace with actual data fetching
  const [clients, setClients] = useState<Client[]>([
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
  ]);

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

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsDetailModalOpen(true);
  };

  const handleUpdateClient = (updatedClient: Client) => {
    setClients(clients.map(client => 
      client.id === updatedClient.id ? updatedClient : client
    ));
  };

  const handleDeleteClient = (clientId: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setClients(clients.filter(client => client.id !== clientId));
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
          <div key={client.id} className="relative">
            <ClientCard client={client} />
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleViewClient(client)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDeleteClient(client.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <EmptyClientState hasSearchTerm={!!searchTerm} onInviteClient={handleInviteClient} />
      )}

      <ClientDetailModal
        client={selectedClient}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedClient(null);
        }}
        onUpdate={handleUpdateClient}
      />
    </div>
  );
};

export default ClientList;
