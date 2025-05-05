import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/use-auth';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { Installation, Product, User } from '@shared/schema';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

type InstallationWithDetails = Installation & { 
  product: Product;
  user: User;
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'installing', label: 'Installing' },
  { value: 'testing', label: 'Testing' },
  { value: 'completed', label: 'Completed' },
];

const AdminInstallations: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInstallation, setSelectedInstallation] = useState<InstallationWithDetails | null>(null);
  const [notes, setNotes] = useState('');
  const [installationDate, setInstallationDate] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [status, setStatus] = useState('');
  
  // Add new installation form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInstallation, setNewInstallation] = useState({
    userId: '',
    productId: '',
    location: '',
    status: 'pending',
    notes: '',
  });

  // Redirect if not admin
  if (user && user.role !== 'admin') {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="mb-6">You don't have permission to access this page.</p>
        <Link href="/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  // Fetch all installations with user and product details
  const { data: installations, isLoading } = useQuery<InstallationWithDetails[]>({
    queryKey: ['/api/admin/installations'],
    enabled: !!user && user.role === 'admin',
  });
  
  // Fetch all users for the dropdown
  const { data: users } = useQuery<User[]>({
    queryKey: ['/api/admin/users'],
    enabled: !!user && user.role === 'admin',
  });
  
  // Fetch all products for the dropdown
  const { data: products } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    enabled: !!user && user.role === 'admin',
  });

  // Update installation mutation
  const updateMutation = useMutation({
    mutationFn: async (data: { 
      id: number; 
      status?: string; 
      notes?: string;
      installation_date?: string;
      completion_date?: string;
    }) => {
      const res = await apiRequest('PATCH', `/api/admin/installations/${data.id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/installations'] });
      toast({
        title: 'Installation Updated',
        description: 'The installation has been successfully updated.',
      });
      setSelectedInstallation(null);
    },
    onError: (error: Error) => {
      toast({
        title: 'Update Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
  
  // Create new installation mutation
  const createMutation = useMutation({
    mutationFn: async (data: { 
      userId: number;
      productId: number;
      location: string;
      status: string;
      notes?: string;
    }) => {
      const res = await apiRequest('POST', '/api/admin/installations', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/installations'] });
      toast({
        title: 'Installation Created',
        description: 'The new installation has been successfully created.',
      });
      setShowAddForm(false);
      setNewInstallation({
        userId: '',
        productId: '',
        location: '',
        status: 'pending',
        notes: '',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Creation Failed',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleUpdateInstallation = () => {
    if (!selectedInstallation) return;
    
    const updateData: any = { id: selectedInstallation.id };
    
    if (status && status !== selectedInstallation.status) {
      updateData.status = status;
    }
    
    if (notes && notes !== selectedInstallation.notes) {
      updateData.notes = notes;
    }
    
    if (installationDate) {
      updateData.installation_date = installationDate;
    }
    
    if (completionDate) {
      updateData.completion_date = completionDate;
    }
    
    updateMutation.mutate(updateData);
  };

  const handleSelectInstallation = (installation: InstallationWithDetails) => {
    setSelectedInstallation(installation);
    setStatus(installation.status);
    setNotes(installation.notes || '');
    setInstallationDate(installation.installationDate ? 
      new Date(installation.installationDate).toISOString().split('T')[0] : '');
    setCompletionDate(installation.completionDate ? 
      new Date(installation.completionDate).toISOString().split('T')[0] : '');
  };
  
  const handleCreateInstallation = () => {
    // Validate required fields
    if (!newInstallation.userId || !newInstallation.productId || !newInstallation.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Submit the new installation
    createMutation.mutate({
      userId: parseInt(newInstallation.userId),
      productId: parseInt(newInstallation.productId),
      location: newInstallation.location,
      status: newInstallation.status,
      notes: newInstallation.notes || undefined,
    });
  };

  // Filter installations based on search and status filter
  const filteredInstallations = installations?.filter(installation => {
    const matchesSearch = 
      installation.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      installation.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      installation.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      installation.product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || installation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Manage Installations | Admin | BEE SOLAR POWERS</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link href="/dashboard">
            <Button variant="ghost" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Manage Installations</h1>
          <div className="ml-auto">
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-primary text-white"
            >
              Add New Installation
            </Button>
          </div>
        </div>

        {showAddForm ? (
          <Card>
            <CardHeader>
              <CardTitle>Add New Installation</CardTitle>
              <CardDescription>
                Create a new installation for a customer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer
                  </label>
                  <Select
                    value={newInstallation.userId}
                    onValueChange={(value) => setNewInstallation({
                      ...newInstallation,
                      userId: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {users?.filter(u => u.role === 'client').map(user => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product
                  </label>
                  <Select
                    value={newInstallation.productId}
                    onValueChange={(value) => setNewInstallation({
                      ...newInstallation,
                      productId: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products?.map(product => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <Input
                    value={newInstallation.location}
                    onChange={(e) => setNewInstallation({
                      ...newInstallation,
                      location: e.target.value
                    })}
                    placeholder="Installation address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <Select
                    value={newInstallation.status}
                    onValueChange={(value) => setNewInstallation({
                      ...newInstallation,
                      status: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <Textarea
                  value={newInstallation.notes}
                  onChange={(e) => setNewInstallation({
                    ...newInstallation,
                    notes: e.target.value
                  })}
                  placeholder="Enter notes about this installation"
                  rows={4}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateInstallation}
                  disabled={createMutation.isPending}
                  className="bg-primary text-white"
                >
                  {createMutation.isPending ? 'Creating...' : 'Create Installation'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : selectedInstallation ? (
          <Card>
            <CardHeader>
              <CardTitle>Update Installation</CardTitle>
              <CardDescription>
                Installation for {selectedInstallation.user.name} at {selectedInstallation.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <Select
                    value={status}
                    onValueChange={setStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product
                  </label>
                  <Input value={selectedInstallation.product.name} disabled />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Installation Date
                  </label>
                  <Input
                    type="date"
                    value={installationDate}
                    onChange={(e) => setInstallationDate(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Completion Date
                  </label>
                  <Input
                    type="date"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter notes about this installation"
                  rows={4}
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedInstallation(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateInstallation}
                  disabled={updateMutation.isPending}
                  className="bg-primary text-white"
                >
                  {updateMutation.isPending ? 'Updating...' : 'Update Installation'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
              <Input
                placeholder="Search installations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
              
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {filteredInstallations && filteredInstallations.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Installation Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInstallations.map((installation) => (
                      <TableRow key={installation.id}>
                        <TableCell>{installation.id}</TableCell>
                        <TableCell>{installation.user.name}</TableCell>
                        <TableCell>{installation.product.name}</TableCell>
                        <TableCell>{installation.location}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            installation.status === 'completed' ? 'bg-green-100 text-green-800' :
                            installation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {installation.status.charAt(0).toUpperCase() + installation.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {installation.installationDate ? 
                            new Date(installation.installationDate).toLocaleDateString() : 'Not scheduled'}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            onClick={() => handleSelectInstallation(installation)}
                          >
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Installations Found</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== 'all' ? 
                    'Try adjusting your search or filter criteria.' : 
                    'There are no installations to manage at this time.'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default AdminInstallations;