import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import SEOHead from "@/components/SEOHead";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Loader2, Search, UserPlus } from "lucide-react";

export default function AdminClientsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Redirect if not admin
  if (user?.role !== "admin") {
    return <Redirect to="/dashboard" />;
  }

  // Fetch all users
  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
  });

  // Filter users based on search term
  const filteredUsers = users?.filter((user) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.username.toLowerCase().includes(searchTermLower) ||
      user.email?.toLowerCase().includes(searchTermLower) ||
      user.fullName?.toLowerCase().includes(searchTermLower) ||
      user.phone?.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <>
      <Helmet>
        <title>Client Management | BEE SOLAR POWERS</title>
      </Helmet>
      <SEOHead
        title="Client Management | BEE SOLAR POWERS"
        description="Manage client accounts for solar installations and track customer projects"
        keywords="solar clients, customer management, solar installation tracking"
      />

      <div className="container py-10">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-500 to-yellow-600 text-transparent bg-clip-text">
          Client Management
        </h1>
        
        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Client
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Clients</CardTitle>
            <CardDescription>
              Manage all client accounts in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers?.length ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.fullName || "—"}</TableCell>
                        <TableCell>{user.email || "—"}</TableCell>
                        <TableCell>{user.phone || "—"}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                            user.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                          }`}>
                            {user.role || "user"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {user.createdAt ? format(new Date(user.createdAt), "MMM d, yyyy") : "—"}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-blue-600"
                            >
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No clients found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}