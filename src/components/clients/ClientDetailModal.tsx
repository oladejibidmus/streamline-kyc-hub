
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  Download, 
  FileText, 
  User, 
  Building, 
  Mail, 
  Phone,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react';
import { Client } from '@/types';

interface ClientDetailModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (client: Client) => void;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: 'pending' | 'verified' | 'rejected';
}

const ClientDetailModal = ({ client, isOpen, onClose, onUpdate }: ClientDetailModalProps) => {
  const [editMode, setEditMode] = useState(false);
  const [editedClient, setEditedClient] = useState<Client | null>(client);
  const [documents] = useState<Document[]>([
    {
      id: '1',
      name: 'Certificate of Incorporation.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedAt: '2024-01-15T10:00:00Z',
      status: 'verified'
    },
    {
      id: '2',
      name: 'Business License.jpg',
      type: 'JPG',
      size: '1.8 MB',
      uploadedAt: '2024-01-16T14:30:00Z',
      status: 'verified'
    },
    {
      id: '3',
      name: 'Bank Statement.pdf',
      type: 'PDF',
      size: '3.2 MB',
      uploadedAt: '2024-01-18T09:15:00Z',
      status: 'pending'
    }
  ]);

  if (!client || !editedClient) return null;

  const handleSave = () => {
    if (editedClient) {
      onUpdate(editedClient);
      setEditMode(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Simulate file upload
      alert(`Uploading ${files.length} file(s)...`);
    }
  };

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'started': return 'bg-yellow-100 text-yellow-800';
      case 'invited': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: Client['risk_score']) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'verified': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const completionPercentage = client.status === 'completed' ? 100 : 
                              client.status === 'approved' ? 90 :
                              client.status === 'started' ? 60 : 20;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <Building className="h-5 w-5" />
              {editMode ? (
                <Input
                  value={editedClient.company}
                  onChange={(e) => setEditedClient({...editedClient, company: e.target.value})}
                  className="text-lg font-semibold"
                />
              ) : (
                client.company
              )}
            </DialogTitle>
            <div className="flex gap-2">
              {editMode ? (
                <>
                  <Button onClick={handleSave} size="sm">Save</Button>
                  <Button onClick={() => setEditMode(false)} variant="outline" size="sm">Cancel</Button>
                </>
              ) : (
                <Button onClick={() => setEditMode(true)} variant="outline" size="sm">Edit</Button>
              )}
              <Button onClick={onClose} variant="ghost" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Basic Information</h3>
                
                <div className="space-y-3">
                  <div>
                    <Label>Company Name</Label>
                    {editMode ? (
                      <Input
                        value={editedClient.company}
                        onChange={(e) => setEditedClient({...editedClient, company: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span>{client.company}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Contact Person</Label>
                    {editMode ? (
                      <Input
                        value={editedClient.contact_name}
                        onChange={(e) => setEditedClient({...editedClient, contact_name: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>{client.contact_name}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Email</Label>
                    {editMode ? (
                      <Input
                        value={editedClient.email}
                        onChange={(e) => setEditedClient({...editedClient, email: e.target.value})}
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span>{client.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Status</Label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label>Risk Score</Label>
                    <div className="mt-1">
                      <Badge className={getRiskColor(client.risk_score)}>
                        {client.risk_score} risk
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Progress Overview</h3>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Onboarding Progress</Label>
                      <span className="text-sm font-medium">{completionPercentage}%</span>
                    </div>
                    <Progress value={completionPercentage} />
                  </div>

                  <div>
                    <Label>Created Date</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{new Date(client.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div>
                    <Label>Last Updated</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>{new Date(client.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Quick Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline">Send Reminder</Button>
                    <Button size="sm" variant="outline">Schedule Call</Button>
                    <Button size="sm" variant="outline">Generate Report</Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Document Management</h3>
              <div className="flex gap-2">
                <Input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild variant="outline">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Documents
                  </label>
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-gray-500" />
                    <div>
                      <h4 className="font-medium">{doc.name}</h4>
                      <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                      <p className="text-xs text-gray-500">
                        Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {getDocumentStatusIcon(doc.status)}
                      <Badge variant={doc.status === 'verified' ? 'default' : 'secondary'}>
                        {doc.status}
                      </Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <h3 className="font-semibold text-lg">Compliance Status</h3>
            
            <div className="grid gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium">KYC Verification</h4>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Completed</Badge>
                </div>
                <Progress value={100} className="mb-2" />
                <p className="text-sm text-gray-600">All required KYC documents verified</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium">AML Screening</h4>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
                </div>
                <Progress value={70} className="mb-2" />
                <p className="text-sm text-gray-600">Automated screening completed, manual review pending</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium">Sanctions Check</h4>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Passed</Badge>
                </div>
                <Progress value={100} className="mb-2" />
                <p className="text-sm text-gray-600">No sanctions matches found</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <h3 className="font-semibold text-lg">Activity Timeline</h3>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">KYC documents uploaded</p>
                  <p className="text-sm text-gray-600">Client uploaded certificate of incorporation and business license</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Documents verified</p>
                  <p className="text-sm text-gray-600">Sarah Johnson verified the uploaded documents</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Onboarding started</p>
                  <p className="text-sm text-gray-600">Client began the onboarding process</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-2 h-2 bg-gray-500 rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Invitation sent</p>
                  <p className="text-sm text-gray-600">Invitation email sent to client</p>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDetailModal;
