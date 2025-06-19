
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Eye, 
  Copy, 
  Trash2, 
  Settings,
  Save
} from 'lucide-react';
import { FormField, KYCForm } from '@/types/forms';
import FormFieldPalette from './FormFieldPalette';
import FormCanvas from './FormCanvas';
import FormPropertiesPanel from './FormPropertiesPanel';

const FormBuilder = () => {
  const [forms, setForms] = useState<KYCForm[]>([
    {
      id: '1',
      name: 'Basic Client Information',
      description: 'Standard client onboarding form',
      status: 'active',
      fields: [],
      responses: 24,
      created_at: '2024-01-15',
      updated_at: '2024-01-20'
    },
    {
      id: '2',
      name: 'Corporate KYC Form',
      description: 'Enhanced due diligence for corporate clients',
      status: 'draft',
      fields: [],
      responses: 0,
      created_at: '2024-01-20',
      updated_at: '2024-01-20'
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

  const [formTitle, setFormTitle] = useState('Client Onboarding Form');
  const [formDescription, setFormDescription] = useState('');

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

  const saveForm = () => {
    // Simulate saving the form
    console.log('Saving form:', { formTitle, formDescription, formFields });
    alert('Form saved successfully!');
  };

  const duplicateForm = (formId: string) => {
    const formToDuplicate = forms.find(f => f.id === formId);
    if (formToDuplicate) {
      const newForm: KYCForm = {
        ...formToDuplicate,
        id: Date.now().toString(),
        name: `${formToDuplicate.name} (Copy)`,
        status: 'draft',
        responses: 0,
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0]
      };
      setForms([...forms, newForm]);
    }
  };

  const deleteForm = (formId: string) => {
    if (confirm('Are you sure you want to delete this form?')) {
      setForms(forms.filter(f => f.id !== formId));
    }
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
            <Button onClick={saveForm}>
              <Save className="h-4 w-4 mr-2" />
              Save Form
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <FormFieldPalette onAddField={addField} />
          <FormCanvas 
            fields={formFields}
            onRemoveField={removeField}
            onUpdateField={updateField}
          />
          <FormPropertiesPanel
            formTitle={formTitle}
            formDescription={formDescription}
            onTitleChange={setFormTitle}
            onDescriptionChange={setFormDescription}
          />
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
                      <p className="font-medium">{form.fields.length}</p>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => duplicateForm(form.id)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteForm(form.id)}
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

export default FormBuilder;
