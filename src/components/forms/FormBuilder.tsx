
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Eye, 
  Copy, 
  Trash2, 
  Settings,
  FileText,
  MousePointer,
  Calendar,
  CheckSquare,
  Type,
  Mail,
  Phone,
  Hash
} from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'number' | 'textarea' | 'select' | 'checkbox' | 'date';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

const FormBuilder = () => {
  const [forms, setForms] = useState([
    {
      id: '1',
      name: 'Basic Client Information',
      description: 'Standard client onboarding form',
      status: 'active',
      fields: 8,
      responses: 24,
      created_at: '2024-01-15'
    },
    {
      id: '2',
      name: 'Corporate KYC Form',
      description: 'Enhanced due diligence for corporate clients',
      status: 'draft',
      fields: 15,
      responses: 0,
      created_at: '2024-01-20'
    }
  ]);

  const [selectedForm, setSelectedForm] = useState<string | null>(null);
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: '1',
      type: 'text',
      label: 'Company Name',
      placeholder: 'Enter your company name',
      required: true
    },
    {
      id: '2',
      type: 'email',
      label: 'Business Email',
      placeholder: 'contact@company.com',
      required: true
    },
    {
      id: '3',
      type: 'phone',
      label: 'Phone Number',
      placeholder: '+1 (555) 123-4567',
      required: false
    }
  ]);

  const fieldTypes = [
    { type: 'text', icon: Type, label: 'Text Input' },
    { type: 'email', icon: Mail, label: 'Email' },
    { type: 'phone', icon: Phone, label: 'Phone' },
    { type: 'number', icon: Hash, label: 'Number' },
    { type: 'textarea', icon: FileText, label: 'Long Text' },
    { type: 'select', icon: MousePointer, label: 'Dropdown' },
    { type: 'checkbox', icon: CheckSquare, label: 'Checkbox' },
    { type: 'date', icon: Calendar, label: 'Date' }
  ];

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `New ${type} field`,
      required: false
    };
    setFormFields([...formFields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFormFields(formFields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    setFormFields(formFields.filter(field => field.id !== id));
  };

  if (selectedForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => setSelectedForm(null)} className="mb-2">
              ← Back to Forms
            </Button>
            <h1 className="text-3xl font-bold text-slate-900">Form Builder</h1>
            <p className="text-slate-600 mt-2">Design your client onboarding form</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Field Palette */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-sm">Field Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {fieldTypes.map((fieldType) => {
                  const Icon = fieldType.icon;
                  return (
                    <Button
                      key={fieldType.type}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => addField(fieldType.type)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {fieldType.label}
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Form Canvas */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm">Form Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 min-h-[400px]">
                <div className="border-2 border-dashed border-slate-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Client Onboarding Form</h2>
                  <div className="space-y-4">
                    {formFields.map((field) => (
                      <div key={field.id} className="group relative">
                        <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-6 w-6 p-0"
                              onClick={() => removeField(field.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <Label className="text-sm font-medium">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        
                        {field.type === 'textarea' ? (
                          <Textarea placeholder={field.placeholder} className="mt-1" />
                        ) : field.type === 'select' ? (
                          <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                            <option>Select an option</option>
                          </select>
                        ) : field.type === 'checkbox' ? (
                          <div className="flex items-center space-x-2 mt-1">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">{field.placeholder || 'Checkbox option'}</span>
                          </div>
                        ) : (
                          <Input 
                            type={field.type} 
                            placeholder={field.placeholder} 
                            className="mt-1"
                          />
                        )}
                      </div>
                    ))}
                    
                    {formFields.length === 0 && (
                      <div className="text-center py-12 text-slate-500">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Drag fields from the left panel to build your form</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Properties Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-sm">Form Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="form-title" className="text-sm">Form Title</Label>
                  <Input id="form-title" defaultValue="Client Onboarding Form" />
                </div>
                <div>
                  <Label htmlFor="form-desc" className="text-sm">Description</Label>
                  <Textarea id="form-desc" placeholder="Form description..." />
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Form Options</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Auto-save progress</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Require login</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Send confirmation email</span>
                    </label>
                  </div>
                </div>
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
          <h1 className="text-3xl font-bold text-slate-900">Form Builder</h1>
          <p className="text-slate-600 mt-2">Create and manage onboarding forms</p>
        </div>
        <Button onClick={() => setSelectedForm('new')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Form
        </Button>
      </div>

      <div className="grid gap-4">
        {forms.map((form) => (
          <Card key={form.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{form.name}</h3>
                    <Badge variant={form.status === 'active' ? 'default' : 'secondary'}>
                      {form.status}
                    </Badge>
                  </div>
                  <p className="text-slate-600 mb-4">{form.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Fields</span>
                      <p className="font-medium">{form.fields}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Responses</span>
                      <p className="font-medium">{form.responses}</p>
                    </div>
                    <div>
                      <span className="text-slate-500">Created</span>
                      <p className="font-medium">{new Date(form.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedForm(form.id)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
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

export default FormBuilder;
