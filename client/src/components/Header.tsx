import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header: React.FC = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logoutMutation } = useAuth();
  const [_, navigate] = useLocation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-secondary text-3xl">
                <i className="fas fa-solar-panel"></i>
              </span>
              <div>
                <h1 className="font-heading font-bold text-primary text-xl sm:text-2xl whitespace-nowrap">
                  BEE SOLAR POWERS
                </h1>
                <p className="text-xs text-gray-500">
                  Authorized Distributor: Loom Solar Pvt Ltd
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "font-medium transition-colors duration-200",
                  location === link.href ? "text-accent" : "text-primary hover:text-accent"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact#quote">
              <Button className="bg-secondary hover:bg-secondary-dark text-primary font-semibold mr-2">
                Get Quote
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative flex items-center gap-2 hover:bg-gray-100">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-white">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium hidden sm:inline-block">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/dashboard">
                    <DropdownMenuItem className="cursor-pointer">
                      <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
                    </DropdownMenuItem>
                  </Link>
                  {user.role === "admin" && (
                    <Link href="/admin/installations">
                      <DropdownMenuItem className="cursor-pointer">
                        <i className="fas fa-tools mr-2"></i> Manage Installations
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                    <i className="fas fa-sign-out-alt mr-2"></i> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Login / Register
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-0 md:hidden text-primary">
                <i className="fas fa-bars text-2xl"></i>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <nav className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={cn(
                      "font-medium py-2 px-4 rounded-md transition-colors duration-200",
                      location === link.href
                        ? "bg-primary text-white"
                        : "text-primary hover:bg-gray-100"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/contact#quote">
                  <Button
                    className="bg-secondary hover:bg-secondary-dark text-primary font-semibold w-full mt-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Quote
                  </Button>
                </Link>
                
                {user ? (
                  <>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-center mb-4 px-2">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback className="bg-primary text-white">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      
                      <Link href="/dashboard">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left px-2 py-2 mb-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
                        </Button>
                      </Link>
                      
                      {user.role === "admin" && (
                        <Link href="/admin/installations">
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-left px-2 py-2 mb-1"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <i className="fas fa-tools mr-2"></i> Manage Installations
                          </Button>
                        </Link>
                      )}
                      
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left px-2 py-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <i className="fas fa-sign-out-alt mr-2"></i> Logout
                      </Button>
                    </div>
                  </>
                ) : (
                  <Link href="/auth">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white w-full mt-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login / Register
                    </Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
