
export interface User {
  id: string;
  org_id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'compliance';
  created_at: string;
}

export interface Client {
  id: string;
  org_id: string;
  company: string;
  contact_name: string;
  email: string;
  risk_score: 'low' | 'medium' | 'high';
  status: 'invited' | 'started' | 'completed' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface OnboardingFlow {
  id: string;
  client_id: string;
  status: 'to_do' | 'waiting_client' | 'review' | 'done';
  started_at: string | null;
  completed_at: string | null;
  progress_percentage: number;
}

export interface Task {
  id: string;
  flow_id: string;
  title: string;
  assignee_id: string | null;
  due_date: string | null;
  status: 'to_do' | 'waiting_client' | 'review' | 'done';
  client_visible: boolean;
  created_at: string;
}

export interface Verification {
  id: string;
  client_id: string;
  type: 'identity' | 'address' | 'sanctions';
  provider: 'stripe_identity' | 'manual' | 'opensanctions';
  status: 'pending' | 'verified' | 'failed' | 'requires_review';
  doc_urls: string[];
  created_at: string;
}

export interface Contract {
  id: string;
  client_id: string;
  template_id: string;
  pdf_url: string | null;
  sign_status: 'draft' | 'sent' | 'signed' | 'completed';
  sha256: string | null;
  created_at: string;
}
