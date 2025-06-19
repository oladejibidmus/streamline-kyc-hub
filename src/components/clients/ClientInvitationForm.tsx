
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, Building, User, Calendar, Link, Copy } from 'lucide-react';

interface InvitationForm {
  companyName: string;
  contactName: string;
  email: string;
  riskLevel: 'low' | 'medium' | 'high';
  formTemplate: string;
  customMessage: string;
  expiryDays: number;
}

const ClientInvitationForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [invitationLink, setInvitationLink] = useState<string | null>(null);
  const [formData, setFormData] = useState<InvitationForm>({
    companyName: '',
    contactName: '',
    email: '',
    riskLevel: 'low',
    formTemplate: 'basic-kyc',
    customMessage: '',
    expiryDays: 7
  });

  const formTemplates = [
    { id: 'basic-kyc', name: 'Basic KYC Form', description: 'Standard client information' },
    { id: 'corporate-kyc', name: 'Corporate KYC Form', description: 'Enhanced corporate due diligence' },
    { id: 'high-risk-kyc', name: 'High Risk KYC Form', description: 'Comprehensive verification' }
  ];

  const handleInputChange = (field: keyof InvitationForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateInvitationLink = () => {
    const inviteId = `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const baseUrl = window.location.origin;
    return `${baseUrl}/client-onboarding/${inviteId}`;
  };

  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate invitation link
      const link = generateInvitationLink();
      setInvitationLink(link);

      // Simulate sending email (replace with actual email service)
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Invitation Sent Successfully",
        description: `Invitation sent to ${formData.email}`,
      });

      console.log('Invitation sent:', {
        ...formData,
        invitationLink: link,
        sentAt: new Date().toISOString()
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyInvitationLink = () => {
    if (invitationLink) {
      navigator.clipboard.writeText(invitationLink);
      toast({
        title: "Link Copied",
        description: "Invitation link copied to clipboard",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      riskLevel: 'low',
      formTemplate: 'basic-kyc',
      customMessage: '',
      expiryDays: 7
    });
    setInvitationLink(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Client Invitation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendInvitation} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contactName">Contact Name *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="contactName"
                    type="text"
                    placeholder="Enter contact person name"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="riskLevel">Risk Level</Label>
                <Select value={formData.riskLevel} onValueChange={(value: 'low' | 'medium' | 'high') => handleInputChange('riskLevel', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800">Low Risk</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-100 text-yellow-800">Medium Risk</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-100 text-red-800">High Risk</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="formTemplate">KYC Form Template</Label>
                <Select value={formData.formTemplate} onValueChange={(value) => handleInputChange('formTemplate', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formTemplates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-gray-500">{template.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="expiryDays">Invitation Expires (Days)</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="expiryDays"
                    type="number"
                    min="1"
                    max="30"
                    value={formData.expiryDays}
                    onChange={(e) => handleInputChange('expiryDays', parseInt(e.target.value))}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="customMessage">Custom Message (Optional)</Label>
              <Textarea
                id="customMessage"
                placeholder="Add a personalized message for the client..."
                value={formData.customMessage}
                onChange={(e) => handleInputChange('customMessage', e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Invitation'}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Reset Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {invitationLink && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Invitation Sent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Invitation email has been sent to <strong>{formData.email}</strong>. 
                You can also share the direct link below:
              </p>
              
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Input 
                  value={invitationLink} 
                  readOnly 
                  className="flex-1 bg-white"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={copyInvitationLink}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="text-sm text-gray-500">
                This invitation will expire in <strong>{formData.expiryDays} days</strong>.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientInvitationForm;
