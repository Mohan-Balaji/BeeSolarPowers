import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { Installation, Product } from '@shared/schema';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Link } from 'wouter';

const getStatusPercentage = (status: string): number => {
  switch (status) {
    case 'pending':
      return 10;
    case 'approved':
      return 25;
    case 'scheduled':
      return 40;
    case 'in_progress':
      return 60;
    case 'installing':
      return 75;
    case 'testing':
      return 90;
    case 'completed':
      return 100;
    default:
      return 0;
  }
};

const getStatusColor = (status: string): string => {
  // Always return green with varying intensities based on status
  switch (status) {
    case 'pending':
      return 'bg-green-300';
    case 'approved':
      return 'bg-green-400';
    case 'scheduled':
      return 'bg-green-500';
    case 'in_progress':
      return 'bg-green-600';
    case 'installing':
      return 'bg-green-700';
    case 'testing':
      return 'bg-green-800';
    case 'completed':
      return 'bg-green-600';
    default:
      return 'bg-green-300';
  }
};

const getStatusText = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'Application Pending';
    case 'approved':
      return 'Approved';
    case 'scheduled':
      return 'Installation Scheduled';
    case 'in_progress':
      return 'In Progress';
    case 'installing':
      return 'Installing Equipment';
    case 'testing':
      return 'Testing & Commissioning';
    case 'completed':
      return 'Installation Complete';
    default:
      return 'Unknown Status';
  }
};

const emptyStateMessage = (isAdmin: boolean) => (
  <div className="text-center py-10">
    <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <i className="fas fa-solar-panel text-gray-400 text-3xl"></i>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">
      {isAdmin ? 'No Installations to Manage' : 'No Installations Yet'}
    </h3>
    <p className="text-gray-500 max-w-md mx-auto">
      {isAdmin 
        ? 'There are currently no installations assigned to you to manage.'
        : 'You don\'t have any solar installations yet. Contact us to get started with your solar journey!'}
    </p>
  </div>
);

const InstallationTracker: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Fetch installations (for client or all if admin)
  const { data: installations, isLoading } = useQuery<(Installation & { product: Product })[]>({
    queryKey: [isAdmin ? '/api/admin/installations' : `/api/installations/user/${user?.id}`],
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!installations || installations.length === 0) {
    return emptyStateMessage(isAdmin);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          {isAdmin ? 'Manage Installations' : 'My Solar Installations'}
        </h2>
        {isAdmin && (
          <Link href="/admin/installations">
            <Button className="bg-primary text-white">
              Installation Management
            </Button>
          </Link>
        )}
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {installations.map((installation) => (
          <Card key={installation.id} className={`overflow-hidden border-l-4 hover:shadow-lg transition-shadow duration-200 ${getStatusColor(installation.status).replace('bg-', 'border-l-')}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{installation.product.name}</CardTitle>
                  <CardDescription>{installation.location}</CardDescription>
                </div>
                <Badge 
                  className={`${getStatusColor(installation.status)} text-white`}
                >
                  {getStatusText(installation.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="mb-6">
                {/* Modern step indicator progress */}
                <div className="relative mb-2">
                  <div className="overflow-hidden mb-6 mt-4">
                    {/* Progress bar background - increased height */}
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      {/* Animated progress bar - increased height */}
                      <div 
                        className={`${getStatusColor(installation.status)} h-4 rounded-full transition-all duration-700 ease-in-out`}
                        style={{width: `${getStatusPercentage(installation.status)}%`}}
                      />
                    </div>
                    
                    {/* Progress steps */}
                    <div className="relative h-0">
                      {/* Step indicators - adjusted position for larger progress bar */}
                      <div className="absolute -top-[17px] left-0 w-full flex justify-between">
                        {/* Step 1: Start - increased size */}
                        <div className={`flex flex-col items-center ${getStatusPercentage(installation.status) >= 10 ? getStatusColor(installation.status) : 'bg-gray-300'} w-8 h-8 rounded-full transition-colors duration-500 flex items-center justify-center border-2 border-white shadow-md`}>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                          <span className="absolute -bottom-7 text-xs font-medium w-20 text-center text-gray-700">Pending</span>
                        </div>
                        
                        {/* Step 2: Installation - increased size */}
                        <div className={`flex flex-col items-center ${getStatusPercentage(installation.status) >= 40 ? getStatusColor(installation.status) : 'bg-gray-300'} w-8 h-8 rounded-full transition-colors duration-500 flex items-center justify-center border-2 border-white shadow-md`}>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                          <span className="absolute -bottom-7 text-xs font-medium w-20 text-center text-gray-700">Installation</span>
                        </div>
                        
                        {/* Step 3: Testing - increased size */}
                        <div className={`flex flex-col items-center ${getStatusPercentage(installation.status) >= 75 ? getStatusColor(installation.status) : 'bg-gray-300'} w-8 h-8 rounded-full transition-colors duration-500 flex items-center justify-center border-2 border-white shadow-md`}>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                          <span className="absolute -bottom-7 text-xs font-medium w-20 text-center text-gray-700">Testing</span>
                        </div>
                        
                        {/* Step 4: Complete - increased size */}
                        <div className={`flex flex-col items-center ${getStatusPercentage(installation.status) >= 100 ? getStatusColor(installation.status) : 'bg-gray-300'} w-8 h-8 rounded-full transition-colors duration-500 flex items-center justify-center border-2 border-white shadow-md`}>
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                          <span className="absolute -bottom-7 text-xs font-medium w-20 text-center text-gray-700">Complete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Status and completion percentage - larger and more prominent */}
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm mt-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 ${getStatusColor(installation.status)} rounded-full flex items-center justify-center shadow-sm`}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-base font-medium text-gray-700">{getStatusText(installation.status)}</span>
                  </div>
                  <div className="text-base font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
                    {getStatusPercentage(installation.status)}% Complete
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-500 text-xs">System Size</p>
                  <p className="font-medium">{installation.product.name.split(' ')[2] || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-500 text-xs">Model</p>
                  <p className="font-medium">{installation.product.name.split(' ')[1] || 'Standard'}</p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-500 text-xs">Installation Date</p>
                  <p className="font-medium">
                    {installation.installationDate ? 
                      new Date(installation.installationDate).toLocaleDateString() : 'Not scheduled'}
                  </p>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <p className="text-gray-500 text-xs">Completion Date</p>
                  <p className="font-medium">
                    {installation.completionDate ? 
                      new Date(installation.completionDate).toLocaleDateString() : 'Pending'}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2 flex flex-col items-start border-t mt-4">
              {installation.notes ? (
                <div className="w-full">
                  <p className="text-xs font-medium text-gray-700 mb-1">Latest Update:</p>
                  <p className="text-sm text-gray-600">{installation.notes}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No additional notes available</p>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InstallationTracker;