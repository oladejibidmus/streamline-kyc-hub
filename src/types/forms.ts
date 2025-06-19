
export interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'number' | 'textarea' | 'select' | 'checkbox' | 'date';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface KYCForm {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  fields: FormField[];
  responses: number;
  created_at: string;
  updated_at: string;
}
