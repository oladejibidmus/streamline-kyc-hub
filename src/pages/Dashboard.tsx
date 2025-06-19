
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHome from '@/components/dashboard/Dashboard';
import ClientList from '@/components/clients/ClientList';
import ClientInvitationForm from '@/components/clients/ClientInvitationForm';
import FormBuilder from '@/components/forms/FormBuilder';
import ComplianceCenter from '@/components/compliance/ComplianceCenter';
import ContractEditor from '@/components/contracts/ContractEditor';
import PaymentMethods from '@/components/payments/PaymentMethods';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import Settings from '@/components/settings/Settings';

const Dashboard = () => {
  const { user, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by App component
  }

  const handleInviteClient = () => {
    setActiveSection('invite-client');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'clients':
        return <ClientList onInviteClient={handleInviteClient} />;
      case 'forms':
        return <FormBuilder />;
      case 'compliance':
        return <ComplianceCenter />;
      case 'contracts':
        return <ContractEditor />;
      case 'payments':
        return <PaymentMethods />;
      case 'notifications':
        return <NotificationCenter />;
      case 'settings':
        return <Settings />;
      case 'invite-client':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Invite Client</h1>
              <p className="text-slate-600 mt-2">Send onboarding invitation to a new client</p>
            </div>
            <ClientInvitationForm />
          </div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
