
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Save, 
  Download, 
  Share, 
  FileText, 
  Edit, 
  Eye, 
  MessageCircle,
  Hash,
  Calendar,
  User,
  Building
} from 'lucide-react';

interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  variables: string[];
  status: 'draft' | 'active' | 'archived';
  created_at: string;
}

const ContractEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [contractContent, setContractContent] = useState('');
  const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});

  const templates: ContractTemplate[] = [
    {
      id: '1',
      name: 'Service Agreement Template',
      description: 'Standard service agreement for consulting work',
      content: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on {{contract_date}} between {{client_company}} ("Client") and {{service_provider}} ("Provider").

SCOPE OF WORK:
{{scope_of_work}}

PAYMENT TERMS:
- Total Contract Value: {{contract_value}}
- Payment Schedule: {{payment_schedule}}
- Late Payment Fee: {{late_fee_percentage}}%

DELIVERABLES:
{{deliverables}}

TIMELINE:
Project Start Date: {{start_date}}
Project End Date: {{end_date}}

TERMS AND CONDITIONS:
1. Confidentiality: Both parties agree to maintain confidentiality of proprietary information.
2. Intellectual Property: {{ip_terms}}
3. Termination: Either party may terminate with {{termination_notice}} days written notice.

CLIENT SIGNATURE: _________________ DATE: _________
{{client_name}}, {{client_title}}

PROVIDER SIGNATURE: _________________ DATE: _________
{{provider_name}}, {{provider_title}}`,
      variables: [
        'contract_date', 'client_company', 'service_provider', 'scope_of_work',
        'contract_value', 'payment_schedule', 'late_fee_percentage', 'deliverables',
        'start_date', 'end_date', 'ip_terms', 'termination_notice',
        'client_name', 'client_title', 'provider_name', 'provider_title'
      ],
      status: 'active',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      name: 'NDA Template',
      description: 'Non-disclosure agreement for sensitive projects',
      content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement ("NDA") is entered into on {{contract_date}} between {{party_1}} and {{party_2}}.

CONFIDENTIAL INFORMATION:
{{confidential_info_definition}}

OBLIGATIONS:
1. Non-Disclosure: Parties agree not to disclose confidential information to third parties.
2. Non-Use: Confidential information shall not be used for any purpose other than {{permitted_purpose}}.
3. Duration: This agreement remains in effect for {{duration_years}} years.

EXCEPTIONS:
Information that is:
- Already publicly known
- Independently developed
- Required by law to be disclosed

SIGNATURES:
{{party_1_signature}} DATE: _________
{{party_2_signature}} DATE: _________`,
      variables: [
        'contract_date', 'party_1', 'party_2', 'confidential_info_definition',
        'permitted_purpose', 'duration_years', 'party_1_signature', 'party_2_signature'
      ],
      status: 'active',
      created_at: '2024-01-18T14:30:00Z'
    }
  ];

  const contracts = [
    {
      id: '1',
      client: 'Acme Corporation',
      template: 'Service Agreement',
      status: 'draft',
      created_at: '2024-01-20T09:00:00Z',
      signed_by_client: false,
      signed_by_provider: false
    },
    {
      id: '2',
      client: 'TechStart Inc',
      template: 'NDA Template',
      status: 'sent',
      created_at: '2024-01-19T15:30:00Z',
      signed_by_client: true,
      signed_by_provider: false
    }
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'signed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVariableChange = (variable: string, value: string) => {
    setTemplateVariables(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const renderContractPreview = () => {
    if (!selectedTemplate) return null;
    
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return null;

    let preview = template.content;
    template.variables.forEach(variable => {
      const value = templateVariables[variable] || `{{${variable}}}`;
      preview = preview.replace(new RegExp(`{{${variable}}}`, 'g'), value);
    });

    return preview;
  };

  if (selectedTemplate) {
    const template = templates.find(t => t.id === selectedTemplate);
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => setSelectedTemplate(null)} className="mb-2">
              ← Back to Contracts
            </Button>
            <h1 className="text-3xl font-bold text-slate-900">Contract Editor</h1>
            <p className="text-slate-600 mt-2">Edit and customize contract templates</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save & Send
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Variables Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Template Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {template?.variables.map((variable) => (
                  <div key={variable}>
                    <Label htmlFor={variable} className="text-sm capitalize">
                      {variable.replace(/_/g, ' ')}
                    </Label>
                    <Input
                      id={variable}
                      placeholder={`Enter ${variable.replace(/_/g, ' ')}`}
                      value={templateVariables[variable] || ''}
                      onChange={(e) => handleVariableChange(variable, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contract Preview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm">Contract Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white border rounded-lg p-6 min-h-[600px]">
                <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                  {renderContractPreview()}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Contracts</h1>
          <p className="text-slate-600 mt-2">Manage contract templates and client agreements</p>
        </div>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          New Contract
        </Button>
      </div>

      {/* Contract Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Contract Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {templates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{template.name}</h3>
                      <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                        {template.status}
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-3">{template.description}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>{template.variables.length} variables</span>
                      <span>Created: {new Date(template.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Contracts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div key={contract.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">{contract.client}</h3>
                      <Badge className={getStatusBadgeColor(contract.status)}>
                        {contract.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Template:</span>
                        <p className="font-medium">{contract.template}</p>
                      </div>
                      <div>
                        <span className="text-slate-500">Signatures:</span>
                        <div className="flex gap-2 mt-1">
                          <Badge variant={contract.signed_by_client ? 'default' : 'outline'}>
                            Client {contract.signed_by_client ? '✓' : '○'}
                          </Badge>
                          <Badge variant={contract.signed_by_provider ? 'default' : 'outline'}>
                            Provider {contract.signed_by_provider ? '✓' : '○'}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500">Created:</span>
                        <p className="font-medium">{new Date(contract.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-6">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Send
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Comment
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

export default ContractEditor;
