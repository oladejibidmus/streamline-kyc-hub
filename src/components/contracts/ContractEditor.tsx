
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Eye, 
  Copy, 
  Trash2, 
  Save,
  FileText,
  Download,
  Send
} from 'lucide-react';

interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  category: 'service' | 'nda' | 'partnership' | 'employment';
  status: 'active' | 'draft' | 'archived';
  content: string;
  variables: string[];
  created_at: string;
  updated_at: string;
}

const ContractEditor = () => {
  const [templates, setTemplates] = useState<ContractTemplate[]>([
    {
      id: '1',
      name: 'Service Agreement Template',
      description: 'Standard service agreement for KYC clients',
      category: 'service',
      status: 'active',
      content: `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into on {{date}} between {{company_name}} ("Company") and KYC Platform ("Provider").

1. SERVICES
Provider agrees to provide know-your-customer (KYC) compliance services including:
- Customer identification verification
- Document collection and verification
- Risk assessment and reporting
- Regulatory compliance monitoring

2. TERM
This Agreement shall commence on {{start_date}} and continue for a period of {{contract_duration}}.

3. COMPENSATION
Company agrees to pay Provider {{monthly_fee}} per month for the services provided.

4. CONFIDENTIALITY
Both parties agree to maintain confidentiality of all information shared.

{{company_name}}
Signature: ___________________
Date: {{signature_date}}

KYC Platform
Signature: ___________________
Date: {{signature_date}}`,
      variables: ['date', 'company_name', 'start_date', 'contract_duration', 'monthly_fee', 'signature_date'],
      created_at: '2024-01-15',
      updated_at: '2024-01-20'
    },
    {
      id: '2',
      name: 'Non-Disclosure Agreement',
      description: 'Standard NDA for sensitive information sharing',
      category: 'nda',
      status: 'active',
      content: `NON-DISCLOSURE AGREEMENT

This Non-Disclosure Agreement is entered into between {{company_name}} and KYC Platform.

The parties agree to maintain confidentiality of all proprietary information shared during the course of business.

{{company_name}}
Signature: ___________________

KYC Platform  
Signature: ___________________`,
      variables: ['company_name'],
      created_at: '2024-01-18',
      updated_at: '2024-01-18'
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<ContractTemplate | null>(null);

  const createNewTemplate = () => {
    const newTemplate: ContractTemplate = {
      id: Date.now().toString(),
      name: 'New Contract Template',
      description: 'Contract description',
      category: 'service',
      status: 'draft',
      content: 'Enter your contract content here...',
      variables: [],
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0]
    };
    setEditingTemplate(newTemplate);
    setSelectedTemplate(newTemplate.id);
  };

  const saveTemplate = () => {
    if (editingTemplate) {
      const existingIndex = templates.findIndex(t => t.id === editingTemplate.id);
      if (existingIndex >= 0) {
        const updatedTemplates = [...templates];
        updatedTemplates[existingIndex] = editingTemplate;
        setTemplates(updatedTemplates);
      } else {
        setTemplates([...templates, editingTemplate]);
      }
      alert('Template saved successfully!');
    }
  };

  const duplicateTemplate = (templateId: string) => {
    const templateToDuplicate = templates.find(t => t.id === templateId);
    if (templateToDuplicate) {
      const newTemplate: ContractTemplate = {
        ...templateToDuplicate,
        id: Date.now().toString(),
        name: `${templateToDuplicate.name} (Copy)`,
        status: 'draft',
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0]
      };
      setTemplates([...templates, newTemplate]);
    }
  };

  const deleteTemplate = (templateId: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== templateId));
    }
  };

  const extractVariables = (content: string): string[] => {
    const matches = content.match(/\{\{([^}]+)\}\}/g);
    return matches ? matches.map(match => match.replace(/[{}]/g, '')) : [];
  };

  const updateTemplateContent = (content: string) => {
    if (editingTemplate) {
      const variables = extractVariables(content);
      setEditingTemplate({
        ...editingTemplate,
        content,
        variables,
        updated_at: new Date().toISOString().split('T')[0]
      });
    }
  };

  if (selectedTemplate && editingTemplate) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => {
              setSelectedTemplate(null);
              setEditingTemplate(null);
            }} className="mb-2">
              ← Back to Templates
            </Button>
            <h1 className="text-3xl font-bold text-slate-900">Contract Editor</h1>
            <p className="text-slate-600 mt-2">Edit contract template</p>
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
            <Button onClick={saveTemplate}>
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Template Properties */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Template Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    name: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="template-desc">Description</Label>
                <Textarea
                  id="template-desc"
                  value={editingTemplate.description}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    description: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="template-category">Category</Label>
                <select
                  id="template-category"
                  value={editingTemplate.category}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    category: e.target.value as ContractTemplate['category']
                  })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="service">Service Agreement</option>
                  <option value="nda">Non-Disclosure Agreement</option>
                  <option value="partnership">Partnership Agreement</option>
                  <option value="employment">Employment Contract</option>
                </select>
              </div>
              <div>
                <Label htmlFor="template-status">Status</Label>
                <select
                  id="template-status"
                  value={editingTemplate.status}
                  onChange={(e) => setEditingTemplate({
                    ...editingTemplate,
                    status: e.target.value as ContractTemplate['status']
                  })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm">Contract Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={editingTemplate.content}
                onChange={(e) => updateTemplateContent(e.target.value)}
                className="min-h-[500px] font-mono text-sm"
                placeholder="Enter your contract content here... Use {{variable_name}} for dynamic content."
              />
            </CardContent>
          </Card>

          {/* Variables Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Template Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-3">
                  Variables found in template:
                </p>
                {editingTemplate.variables.length > 0 ? (
                  editingTemplate.variables.map((variable, index) => (
                    <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                      <code>{`{{${variable}}}`}</code>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No variables found. Use {`{{variable_name}}`} syntax to add variables.
                  </p>
                )}
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
          <h1 className="text-3xl font-bold text-slate-900">Contract Editor</h1>
          <p className="text-slate-600 mt-2">Create and manage contract templates</p>
        </div>
        <Button onClick={createNewTemplate}>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      <div className="grid gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{template.name}</h3>
                    <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                      {template.status}
                    </Badge>
                    <Badge variant="outline">
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-slate-600 mb-4">{template.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Variables</span>
                      <p className="font-medium">{template.variables.length}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Category</span>
                      <p className="font-medium capitalize">{template.category}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Updated</span>
                      <p className="font-medium">{new Date(template.updated_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingTemplate(template);
                      setSelectedTemplate(template.id);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => duplicateTemplate(template.id)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteTemplate(template.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContractEditor;
