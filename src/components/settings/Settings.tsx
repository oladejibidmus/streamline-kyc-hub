import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon,
  Palette,
  Mail,
  Shield,
  Users,
  Upload,
  Save,
  Eye,
  User,
  Building
} from 'lucide-react';
import UserProfile from './UserProfile';
import OrganizationSettings from './OrganizationSettings';

const Settings = () => {
  const [brandingSettings, setBrandingSettings] = useState({
    companyName: 'KYC Platform',
    primaryColor: '#2563eb',
    accentColor: '#8b5cf6',
    logo: null as File | null
  });

  const [emailSettings, setEmailSettings] = useState({
    fromEmail: 'noreply@kycplatform.com',
    fromName: 'KYC Platform',
    welcomeEmailEnabled: true,
    reminderEmailEnabled: true,
    completionEmailEnabled: true
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    stripePublicKey: '',
    stripeSecretKey: '',
    resendApiKey: '',
    slackWebhookUrl: ''
  });

  const teamMembers = [
    { id: '1', name: 'John Admin', email: 'john@company.com', role: 'admin', status: 'active' },
    { id: '2', name: 'Sarah Agent', email: 'sarah@company.com', role: 'agent', status: 'active' },
    { id: '3', name: 'Mike Compliance', email: 'mike@company.com', role: 'compliance', status: 'invited' }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setBrandingSettings(prev => ({ ...prev, logo: file }));
    }
  };

  const handleSaveProfile = () => {
    alert('Profile saved successfully!');
  };

  const handleSaveOrganization = () => {
    alert('Organization settings saved successfully!');
  };

  const handleSaveBranding = () => {
    alert('Branding settings saved successfully!');
  };

  const handleSaveEmail = () => {
    alert('Email settings saved successfully!');
  };

  const handleSaveIntegrations = () => {
    alert('Integration settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-2">Configure your platform settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="organization" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <UserProfile onSave={handleSaveProfile} />
        </TabsContent>

        <TabsContent value="organization">
          <OrganizationSettings onSave={handleSaveOrganization} />
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Customization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input
                      id="company-name"
                      value={brandingSettings.companyName}
                      onChange={(e) => setBrandingSettings(prev => ({ ...prev, companyName: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primary-color"
                        type="color"
                        value={brandingSettings.primaryColor}
                        onChange={(e) => setBrandingSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="w-16 h-10"
                      />
                      <Input
                        value={brandingSettings.primaryColor}
                        onChange={(e) => setBrandingSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="accent-color">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accent-color"
                        type="color"
                        value={brandingSettings.accentColor}
                        onChange={(e) => setBrandingSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                        className="w-16 h-10"
                      />
                      <Input
                        value={brandingSettings.accentColor}
                        onChange={(e) => setBrandingSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="logo-upload">Company Logo</Label>
                    <div className="flex gap-2">
                      <Input
                        id="logo-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="flex-1"
                      />
                      <Button variant="outline">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 2MB. Recommended: 200x60px</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Preview</Label>
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
                    <div className="bg-white rounded-lg border p-4" style={{ borderColor: brandingSettings.primaryColor }}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold" 
                             style={{ backgroundColor: brandingSettings.primaryColor }}>
                          {brandingSettings.companyName.charAt(0)}
                        </div>
                        <h3 className="font-semibold">{brandingSettings.companyName}</h3>
                      </div>
                      <Button style={{ backgroundColor: brandingSettings.primaryColor }} className="mb-2">
                        Primary Button
                      </Button>
                      <Button variant="outline" style={{ borderColor: brandingSettings.accentColor, color: brandingSettings.accentColor }}>
                        Accent Button
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSaveBranding}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Portal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="from-email">From Email</Label>
                  <Input
                    id="from-email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="from-name">From Name</Label>
                  <Input
                    id="from-name"
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, fromName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Welcome Email</Label>
                      <p className="text-sm text-gray-600">Send when client is first invited</p>
                    </div>
                    <Switch
                      checked={emailSettings.welcomeEmailEnabled}
                      onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, welcomeEmailEnabled: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Reminder Emails</Label>
                      <p className="text-sm text-gray-600">Send periodic reminders for incomplete forms</p>
                    </div>
                    <Switch
                      checked={emailSettings.reminderEmailEnabled}
                      onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, reminderEmailEnabled: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Completion Emails</Label>
                      <p className="text-sm text-gray-600">Send confirmation when onboarding is complete</p>
                    </div>
                    <Switch
                      checked={emailSettings.completionEmailEnabled}
                      onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, completionEmailEnabled: checked }))}
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveEmail}>
                <Save className="h-4 w-4 mr-2" />
                Save Email Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Stripe Integration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stripe-public">Stripe Publishable Key</Label>
                    <Input
                      id="stripe-public"
                      type="password"
                      placeholder="pk_test_..."
                      value={integrationSettings.stripePublicKey}
                      onChange={(e) => setIntegrationSettings(prev => ({ ...prev, stripePublicKey: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                    <Input
                      id="stripe-secret"
                      type="password"
                      placeholder="sk_test_..."
                      value={integrationSettings.stripeSecretKey}
                      onChange={(e) => setIntegrationSettings(prev => ({ ...prev, stripeSecretKey: e.target.value }))}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Email Service</h3>
                <div>
                  <Label htmlFor="resend-key">Resend API Key</Label>
                  <Input
                    id="resend-key"
                    type="password"
                    placeholder="re_..."
                    value={integrationSettings.resendApiKey}
                    onChange={(e) => setIntegrationSettings(prev => ({ ...prev, resendApiKey: e.target.value }))}
                  />
                  <p className="text-sm text-gray-500 mt-1">Free tier: 3,000 emails/month</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Notifications</h3>
                <div>
                  <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                  <Input
                    id="slack-webhook"
                    placeholder="https://hooks.slack.com/..."
                    value={integrationSettings.slackWebhookUrl}
                    onChange={(e) => setIntegrationSettings(prev => ({ ...prev, slackWebhookUrl: e.target.value }))}
                  />
                  <p className="text-sm text-gray-500 mt-1">Receive notifications in Slack</p>
                </div>
              </div>

              <Button onClick={handleSaveIntegrations}>
                <Save className="h-4 w-4 mr-2" />
                Save Integration Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Authentication</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Require 2FA for all team members</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Session Timeout</Label>
                      <p className="text-sm text-gray-600">Auto logout after inactivity</p>
                    </div>
                    <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>4 hours</option>
                      <option>8 hours</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Data Protection</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Automatic Data Backup</Label>
                      <p className="text-sm text-gray-600">Daily encrypted backups</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Data Retention Policy</Label>
                      <p className="text-sm text-gray-600">Auto-delete old records</p>
                    </div>
                    <select className="rounded-md border border-input bg-background px-3 py-2 text-sm">
                      <option>7 years</option>
                      <option>5 years</option>
                      <option>3 years</option>
                      <option>1 year</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Audit & Compliance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-gray-600">Log all user actions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>GDPR Compliance Mode</Label>
                      <p className="text-sm text-gray-600">Enable data subject rights</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
