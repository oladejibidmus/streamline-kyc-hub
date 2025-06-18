
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare } from 'lucide-react';

interface EmptyClientStateProps {
  hasSearchTerm: boolean;
}

const EmptyClientState = ({ hasSearchTerm }: EmptyClientStateProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
          <p className="text-gray-500 mb-4">
            {hasSearchTerm ? 'Try adjusting your search terms.' : 'Get started by inviting your first client.'}
          </p>
          {!hasSearchTerm && (
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Invite Client
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyClientState;
