
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Type, 
  Mail, 
  Phone, 
  Hash, 
  FileText, 
  MousePointer, 
  CheckSquare, 
  Calendar 
} from 'lucide-react';
import { FormField } from '@/types/forms';

interface FormFieldPaletteProps {
  onAddField: (type: FormField['type']) => void;
}

const FormFieldPalette = ({ onAddField }: FormFieldPaletteProps) => {
  const fieldTypes = [
    { type: 'text' as const, icon: Type, label: 'Text Input' },
    { type: 'email' as const, icon: Mail, label: 'Email' },
    { type: 'phone' as const, icon: Phone, label: 'Phone' },
    { type: 'number' as const, icon: Hash, label: 'Number' },
    { type: 'textarea' as const, icon: FileText, label: 'Long Text' },
    { type: 'select' as const, icon: MousePointer, label: 'Dropdown' },
    { type: 'checkbox' as const, icon: CheckSquare, label: 'Checkbox' },
    { type: 'date' as const, icon: Calendar, label: 'Date' }
  ];

  return (
    <Card>
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
                className="w-full justify-start hover:bg-primary/10"
                onClick={() => onAddField(fieldType.type)}
              >
                <Icon className="h-4 w-4 mr-2" />
                {fieldType.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormFieldPalette;
