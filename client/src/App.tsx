import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Products from "@/pages/Products";
import Services from "@/pages/Services";
import Contact from "@/pages/Contact";
import AuthPage from "@/pages/auth-page";
import Dashboard from "@/pages/dashboard";
import InstallationTracker from "@/components/InstallationTracker";
import AdminInstallations from "@/pages/admin/installations";
import AdminClients from "@/pages/admin/clients";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/products" component={Products} />
        <Route path="/services" component={Services} />
        <Route path="/contact" component={Contact} />
        <Route path="/auth" component={AuthPage} />
        {/* Protected routes - requires authentication */}
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/installations" component={function Installations() { return <div>Installations Coming Soon</div>; }} />
        <ProtectedRoute path="/profile" component={function Profile() { return <div>Profile Coming Soon</div>; }} />
        {/* Admin Routes */}
        <ProtectedRoute path="/admin/installations" component={AdminInstallations} />
        <ProtectedRoute path="/admin/clients" component={AdminClients} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
