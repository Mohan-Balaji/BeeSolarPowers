import React from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet-async';

const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const AuthPage: React.FC = () => {
  const { user, loginMutation, registerMutation } = useAuth();
  const [_, navigate] = useLocation();

  // Redirect if already logged in
  if (user) {
    navigate('/');
    return null;
  }

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      password: '',
      name: '',
      email: '',
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(data);
      navigate('/');
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    try {
      await registerMutation.mutateAsync(data);
      navigate('/');
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  return (
    <>
      <Helmet>
        <title>Login or Register | BEE SOLAR POWERS</title>
        <meta 
          name="description" 
          content="Login to your BEE SOLAR POWERS account or register for a new account to track your solar installation progress." 
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Form Column */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex flex-col items-center mb-8">
              <div className="text-secondary text-4xl mb-2">
                <i className="fas fa-solar-panel"></i>
              </div>
              <h2 className="text-center text-3xl font-extrabold text-primary">
                BEE SOLAR POWERS
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Your Account Portal
              </p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary-dark"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? 'Logging in...' : 'Login'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Full Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="Password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary-dark"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>

          {/* Hero Column */}
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-10 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold mb-4">Welcome to Your Solar Dashboard</h1>
              <p className="mb-6">Login or create an account to:</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-1.5 mr-3">
                    <i className="fas fa-chart-line text-sm"></i>
                  </div>
                  <span>Track your solar installation progress</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-1.5 mr-3">
                    <i className="fas fa-file-invoice text-sm"></i>
                  </div>
                  <span>Access invoices and documentation</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-1.5 mr-3">
                    <i className="fas fa-comments text-sm"></i>
                  </div>
                  <span>Communicate with our installation team</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-white bg-opacity-20 rounded-full p-1.5 mr-3">
                    <i className="fas fa-sun text-sm"></i>
                  </div>
                  <span>Monitor your system's performance</span>
                </li>
              </ul>
              <div className="relative mt-10">
                <blockquote className="italic text-sm border-l-4 border-white border-opacity-50 pl-4">
                  "Going solar with BEE SOLAR POWERS was the best decision for our home. The dashboard makes it easy to see our energy production and savings."
                </blockquote>
                <p className="mt-2 text-sm text-white text-opacity-80">- Rajesh Sharma, New Delhi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;