
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Slack, 
  Phone,
  Settings,
  Send,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'email' | 'sms' | 'slack' | 'webhook';
  title: string;
  message: string;
  recipient: string;
  status: 'sent' | 'pending' | 'failed';
  created_at: string;
  read: boolean;
}

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [showComposer, setShowComposer] = useState(false);

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'email',
      title: 'Client Onboarding Started',
      message: 'John Smith from Acme Corp has started the onboarding process',
      recipient: 'admin@agency.com',
      status: 'sent',
      created_at: '2024-01-22T10:30:00Z',
      read: false
    },
    {
      id: '2',
      type: 'slack',
      title: 'Risk Alert - High Risk Client',
      message: 'Emily Davis from Innovation Labs flagged as high risk - requires review',
      recipient: '#compliance-alerts',
      status: 'sent',
      created_at: '2024-01-22T09:15:00Z',
      read: true
    },
    {
      id: '3',
      type: 'email',
      title: 'Contract Signed',
      message: 'Service agreement with TechStart Inc has been fully executed',
      recipient: 'contracts@agency.com',
      status: 'sent',
      created_at: '2024-01-21T16:45:00Z',
      read: true
    },
    {
      id: '4',
      type: 'sms',
      title: 'Payment Method Added',
      message: 'New payment method verified for Global Solutions Ltd',
      recipient: '+1 (555) 123-4567',
      status: 'pending',
      created_at: '2024-01-21T14:20:00Z',
      read: false
    }
  ];

  // Notification templates
  const templates = [
    {
      id: '1',
      name: 'Client Welcome Email',
      type: 'email',
      subject: 'Welcome to {{company_name}} - Let\'s Get Started!',
      content: `Hi {{client_name}},

Welcome to {{company_name}}! We're excited to work with you.

To get started, please complete your onboarding at: {{onboarding_link}}

This secure portal will guide you through:
- Basic company information
- Identity verification
- Contract signing
- Payment setup

If you have any questions, feel free to reach out to us at {{support_email}}.

Best regards,
The {{company_name}} Team`
    },
    {
      id: '2',
      name: 'KYC Reminder',
      type: 'email',
      subject: 'Action Required: Complete Your Identity Verification',
      content: `Hi {{client_name}},

We noticed you haven't completed your identity verification yet. 

Please upload your documents at: {{verification_link}}

This is required to:
- Comply with regulations
- Protect both parties
- Process payments securely

Complete verification: {{verification_link}}

Thanks!
{{company_name}} Compliance Team`
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'slack':
        return <Slack className="h-4 w-4" />;
      case 'sms':
        return <Phone className="h-4 w-4" />;
      case 'webhook':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Notification Center</h1>
          <p className="text-slate-600 mt-2">Manage automated notifications and communications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowComposer(true)}>
            <Send className="h-4 w-4 mr-2" />
            Send Notification
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-green-600">+12% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">1,923</div>
            <p className="text-xs text-gray-500">67% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Slack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">641</div>
            <p className="text-xs text-gray-500">23% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-600">SMS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">283</div>
            <p className="text-xs text-gray-500">10% of total</p>
          </CardContent>
        </Card>
      </div>

      {/* Notification Composer */}
      {showComposer && (
        <Card>
          <CardHeader>
            <CardTitle>Send Notification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="notification-type">Type</Label>
                  <select id="notification-type" className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="email">Email</option>
                    <option value="slack">Slack</option>
                    <option value="sms">SMS</option>
                    <option value="webhook">Webhook</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="recipient">Recipient</Label>
                  <Input id="recipient" placeholder="Enter recipient..." />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Notification subject..." />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your message..." rows={4} />
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send Now
                </Button>
                <Button variant="outline">
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button variant="outline" onClick={() => setShowComposer(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className={`border rounded-lg p-4 ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-gray-100">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900">{notification.title}</h3>
                        {!notification.read && (
                          <Badge variant="default" className="text-xs">New</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>To: {notification.recipient}</span>
                        <span>{new Date(notification.created_at).toLocaleString()}</span>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(notification.status)}
                          <span className={getStatusColor(notification.status)}>
                            {notification.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{template.name}</h3>
                      <Badge variant="outline">{template.type}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{template.subject}</p>
                    <p className="text-sm text-slate-500 line-clamp-2">{template.content.substring(0, 100)}...</p>
                  </div>
                  <div className="flex gap-2 ml-6">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Use
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationCenter;
