
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Plus, 
  Shield, 
  DollarSign, 
  Building2,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  client_id: string;
  stripe_pm_id: string;
  type: 'card' | 'bank_account' | 'sepa_debit';
  brand: string;
  last4: string;
  status: 'active' | 'pending' | 'failed';
  created_at: string;
}

const PaymentMethods = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      client_id: '1',
      stripe_pm_id: 'pm_1234567890',
      type: 'card',
      brand: 'visa',
      last4: '4242',
      status: 'active',
      created_at: '2024-01-20T10:00:00Z'
    },
    {
      id: '2',
      client_id: '2',
      stripe_pm_id: 'pm_0987654321',
      type: 'card',
      brand: 'mastercard',
      last4: '5678',
      status: 'active',
      created_at: '2024-01-19T15:30:00Z'
    },
    {
      id: '3',
      client_id: '3',
      stripe_pm_id: 'pm_1122334455',
      type: 'bank_account',
      brand: 'bank_account',
      last4: '1234',
      status: 'pending',
      created_at: '2024-01-18T09:45:00Z'
    }
  ];

  const clientPaymentStats = {
    totalMethods: paymentMethods.length,
    activeMethods: paymentMethods.filter(pm => pm.status === 'active').length,
    pendingVerification: paymentMethods.filter(pm => pm.status === 'pending').length,
    totalRevenue: 125000,
    monthlyRevenue: 12500
  };

  const getPaymentTypeIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="h-4 w-4" />;
      case 'bank_account':
        return <Building2 className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  const getBrandColor = (brand: string) => {
    switch (brand) {
      case 'visa':
        return 'text-blue-600';
      case 'mastercard':
        return 'text-red-600';
      case 'american_express':
        return 'text-blue-800';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleAddPaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate Stripe Setup Intent creation
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Payment method setup initiated');
      setShowAddForm(false);
    } catch (error) {
      console.error('Failed to setup payment method:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Payment Methods</h1>
          <p className="text-slate-600 mt-2">Manage client payment methods and setup intents</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientPaymentStats.totalMethods}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{clientPaymentStats.activeMethods}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{clientPaymentStats.pendingVerification}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${clientPaymentStats.monthlyRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Payment Method Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Add New Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPaymentMethod} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client-select">Client</Label>
                  <select id="client-select" className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Select a client</option>
                    <option value="1">Acme Corporation</option>
                    <option value="2">TechStart Inc</option>
                    <option value="3">Global Solutions</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="payment-type">Payment Type</Label>
                  <select id="payment-type" className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="card">Credit/Debit Card</option>
                    <option value="bank_account">Bank Account (ACH)</option>
                    <option value="sepa_debit">SEPA Direct Debit</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Secure Payment Setup</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Payment methods are securely processed through Stripe. No sensitive card data is stored on our servers.
                      The client will be redirected to a secure Stripe-hosted form to enter their payment details.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Create Setup Intent
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods List */}
      <Card>
        <CardHeader>
          <CardTitle>Client Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-gray-100 ${getBrandColor(method.brand)}`}>
                      {getPaymentTypeIcon(method.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold capitalize">{method.brand}</span>
                        <span className="text-gray-500">•••• {method.last4}</span>
                        {getStatusIcon(method.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusBadgeColor(method.status)}>
                          {method.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Added {new Date(method.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {method.status === 'pending' && (
                      <Button size="sm" variant="outline">
                        Verify
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {method.status === 'active' && (
                      <Button size="sm">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Charge
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stripe Integration Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Stripe Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Payment Processing</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Stripe Setup Intents configured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>PCI compliance handled by Stripe</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Zero-touch card data handling</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Supported Payment Methods</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                  <span>Credit/Debit Cards (Visa, MC, Amex)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-green-600" />
                  <span>ACH Bank Transfers (US)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-purple-600" />
                  <span>SEPA Direct Debit (EU)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentMethods;
