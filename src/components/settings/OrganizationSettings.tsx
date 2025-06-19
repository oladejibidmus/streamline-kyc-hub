
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Mail, 
  Phone, 
  Globe, 
  Save,
  Users,
  Settings,
  Shield
} from 'lucide-react';

interface OrganizationSettingsProps {
  onSave: () => void;
}

const OrganizationSettings = ({ onSave }: OrganizationSettingsProps) => {
  const [orgData, setOrgData] = useState({
    name: 'KYC Platform Solutions',
    domain: 'kycplatform.com',
    email: 'admin@kycplatform.com',
    phone: '+1 (555) 987-6543',
    address: '123 Financial District, New York, NY 10004',
    description: 'Leading provider of Know Your Customer (KYC) compliance solutions for financial institutions.',
    website: 'https://kycplatform.com',
    industry: 'Financial Technology',
    size: '50-100 employees',
    timezone: 'America/New_York',
    currency: 'USD'
  });

  const [permissions, setPermissions] = useState({
    allowSelfRegistration: false,
    requireEmailVerification: true,
    enableTwoFactor: true,
    allowGuestAccess: false,
    requireApprovalForNewUsers: true,
    enableAuditLogging: true
  });

  const handleOrgInputChange = (field: string, value: string) => {
    setOrgData(prev => ({ ...prev, [field]: value }));
  };

  const handlePermissionChange = (field: string, value: boolean) => {
    setPermissions(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Organization Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="org-name">Organization Name</Label>
                <Input
                  id="org-name"
                  value={orgData.name}
                  onChange={(e) => handleOrgInputChange('name', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="org-domain">Domain</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="org-domain"
                    value={orgData.domain}
                    onChange={(e) => handleOrgInputChange('domain', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="org-email">Contact Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="org-email"
                    type="email"
                    value={orgData.email}
                    onChange={(e) => handleOrgInputChange('email', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="org-phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="org-phone"
                    value={orgData.phone}
                    onChange={(e) => handleOrgInputChange('phone', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="org-website">Website</Label>
                <Input
                  id="org-website"
                  value={orgData.website}
                  onChange={(e) => handleOrgInputChange('website', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="org-industry">Industry</Label>
                <select
                  id="org-industry"
                  value={orgData.industry}
                  onChange={(e) => handleOrgInputChange('industry', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="Financial Technology">Financial Technology</option>
                  <option value="Banking">Banking</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="org-size">Organization Size</Label>
                <select
                  id="org-size"
                  value={orgData.size}
                  onChange={(e) => handleOrgInputChange('size', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="50-100 employees">50-100 employees</option>
                  <option value="100-500 employees">100-500 employees</option>
                  <option value="500+ employees">500+ employees</option>
                </select>
              </div>

              <div>
                <Label htmlFor="org-timezone">Default Timezone</Label>
                <select
                  id="org-timezone"
                  value={orgData.timezone}
                  onChange={(e) => handleOrgInputChange('timezone', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">Greenwich Mean Time (GMT)</option>
                  <option value="Europe/Paris">Central European Time (CET)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="org-address">Address</Label>
            <Textarea
              id="org-address"
              value={orgData.address}
              onChange={(e) => handleOrgInputChange('address', e.target.value)}
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="org-description">Description</Label>
            <Textarea
              id="org-description"
              value={orgData.description}
              onChange={(e) => handleOrgInputChange('description', e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Access & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Self Registration</Label>
                <p className="text-sm text-gray-600">Allow users to register without invitation</p>
              </div>
              <Switch
                checked={permissions.allowSelfRegistration}
                onCheckedChange={(checked) => handlePermissionChange('allowSelfRegistration', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Email Verification</Label>
                <p className="text-sm text-gray-600">Require email verification for new accounts</p>
              </div>
              <Switch
                checked={permissions.requireEmailVerification}
                onCheckedChange={(checked) => handlePermissionChange('requireEmailVerification', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Enforce 2FA for all users</p>
              </div>
              <Switch
                checked={permissions.enableTwoFactor}
                onCheckedChange={(checked) => handlePermissionChange('enableTwoFactor', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Guest Access</Label>
                <p className="text-sm text-gray-600">Allow temporary guest access to forms</p>
              </div>
              <Switch
                checked={permissions.allowGuestAccess}
                onCheckedChange={(checked) => handlePermissionChange('allowGuestAccess', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>User Approval Required</Label>
                <p className="text-sm text-gray-600">Require admin approval for new user accounts</p>
              </div>
              <Switch
                checked={permissions.requireApprovalForNewUsers}
                onCheckedChange={(checked) => handlePermissionChange('requireApprovalForNewUsers', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Audit Logging</Label>
                <p className="text-sm text-gray-600">Log all user actions for compliance</p>
              </div>
              <Switch
                checked={permissions.enableAuditLogging}
                onCheckedChange={(checked) => handlePermissionChange('enableAuditLogging', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
        <Button variant="outline">
          <Users className="h-4 w-4 mr-2" />
          Manage Users
        </Button>
      </div>
    </div>
  );
};

export default OrganizationSettings;
