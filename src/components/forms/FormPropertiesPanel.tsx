
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface FormPropertiesPanelProps {
  formTitle: string;
  formDescription: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

const FormPropertiesPanel = ({
  formTitle,
  formDescription,
  onTitleChange,
  onDescriptionChange
}: FormPropertiesPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Form Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="form-title" className="text-sm">Form Title</Label>
            <Input 
              id="form-title" 
              value={formTitle}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="form-desc" className="text-sm">Description</Label>
            <Textarea 
              id="form-desc" 
              value={formDescription}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Form description..." 
            />
          </div>
          <div className="pt-4 border-t">
            <h4 className="font-medium mb-2">Form Options</h4>
            <div className="space-y-2">
              <label className="flex items-center justify-between">
                <span className="text-sm">Auto-save progress</span>
                <Switch defaultChecked />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Require login</span>
                <Switch />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm">Send confirmation email</span>
                <Switch defaultChecked />
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormPropertiesPanel;
