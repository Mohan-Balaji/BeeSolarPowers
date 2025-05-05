import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/use-auth';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InstallationTracker from '@/components/InstallationTracker';
import { Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logoutMutation } = useAuth();
  const [_, navigate] = useLocation();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Dashboard | BEE SOLAR POWERS</title>
        <meta 
          name="description" 
          content="View and manage your solar installations, access documents, and track your energy production." 
        />
      </Helmet>

      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Welcome, {user.name}</h1>
              <p className="text-gray-600">
                {user.role === 'admin' ? 'Admin Dashboard' : 'Client Dashboard'}
              </p>
            </div>
            <div className="mt-4 md:mt-0 space-x-2">
              <Link href="/profile">
                <Button variant="outline" className="border-primary text-primary">
                  My Profile
                </Button>
              </Link>
              <Button 
                variant="destructive" 
                onClick={handleLogout} 
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Tabs defaultValue="installations" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="installations">My Installations</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                {user.role === 'admin' && (
                  <TabsTrigger value="manage">Manage Clients</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="installations">
                <InstallationTracker />
              </TabsContent>

              <TabsContent value="documents">
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-file-alt text-gray-400 text-4xl"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Documents Yet</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    Documents related to your installation will appear here once your project begins.
                  </p>
                </div>
              </TabsContent>

              {user.role === 'admin' && (
                <TabsContent value="manage">
                  <div className="text-center py-16">
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-users text-gray-400 text-4xl"></i>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Client Management</h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      The client management interface is coming soon. This will allow you to view and manage all clients and their installations.
                    </p>
                    <Link href="/admin/clients">
                      <Button className="bg-primary text-white">
                        Go to Admin Panel
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;