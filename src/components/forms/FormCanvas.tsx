
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, FileText } from 'lucide-react';
import { FormField } from '@/types/forms';

interface FormCanvasProps {
  fields: FormField[];
  onRemoveField: (id: string) => void;
  onUpdateField: (id: string, updates: Partial<FormField>) => void;
}

const FormCanvas = ({ fields, onRemoveField, onUpdateField }: FormCanvasProps) => {
  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'textarea':
        return <Textarea placeholder={field.placeholder} className="mt-1" />;
      case 'select':
        return (
          <select className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option>Select an option</option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2 mt-1">
            <input type="checkbox" className="rounded" />
            <span className="text-sm">{field.placeholder || 'Checkbox option'}</span>
          </div>
        );
      default:
        return (
          <Input 
            type={field.type} 
            placeholder={field.placeholder} 
            className="mt-1"
          />
        );
    }
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm">Form Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 min-h-[400px]">
          <div className="border-2 border-dashed border-slate-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Client Onboarding Form</h2>
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.id} className="group relative">
                  <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0"
                      onClick={() => onRemoveField(field.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <Label className="text-sm font-medium">
                    <Input
                      value={field.label}
                      onChange={(e) => onUpdateField(field.id, { label: e.target.value })}
                      className="border-none p-0 font-medium h-auto bg-transparent"
                    />
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  
                  {renderField(field)}
                </div>
              ))}
              
              {fields.length === 0 && (
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
  );
};

export default FormCanvas;
