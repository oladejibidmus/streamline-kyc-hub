
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import DashboardHome from '@/components/dashboard/Dashboard';
import ClientList from '@/components/clients/ClientList';
import FormBuilder from '@/components/forms/FormBuilder';
import ComplianceCenter from '@/components/compliance/ComplianceCenter';
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

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardHome />;
      case 'clients':
        return <ClientList />;
      case 'forms':
        return <FormBuilder />;
      case 'compliance':
        return <ComplianceCenter />;
      case 'settings':
        return <Settings />;
      case 'invite-client':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Invite Client</h1>
              <p className="text-slate-600 mt-2">Send onboarding invitation to a new client</p>
            </div>
            <div className="max-w-2xl">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-medium text-blue-900 mb-2">Coming Soon</h3>
                <p className="text-blue-700">
                  Client invitation feature is under development. This will allow you to send branded onboarding links to clients with custom forms and KYC requirements.
                </p>
              </div>
            </div>
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
