
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, 
  LogOut, 
  Menu, 
  Search, 
  Shield, 
  User,
  ChevronDown
} from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-effect border-b border-border/40">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Evidence Guardian</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 ml-10">
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/evidence" className="text-sm font-medium hover:text-primary transition-colors">
              Evidence
            </Link>
            <Link to="/cases" className="text-sm font-medium hover:text-primary transition-colors">
              Cases
            </Link>
            <Link to="/audit" className="text-sm font-medium hover:text-primary transition-colors">
              Audit Log
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <Badge className="absolute top-0 right-0 h-2 w-2 p-0 rounded-full bg-primary border-2 border-background" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">Detective</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} p-4 backdrop-blur-effect border-b border-border/40 animate-fade-in`}>
        <nav className="flex flex-col space-y-3">
          <Link 
            to="/dashboard" 
            className="flex items-center p-2 -mx-2 rounded-md hover:bg-accent"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/evidence" 
            className="flex items-center p-2 -mx-2 rounded-md hover:bg-accent"
            onClick={() => setMobileMenuOpen(false)}
          >
            Evidence
          </Link>
          <Link 
            to="/cases" 
            className="flex items-center p-2 -mx-2 rounded-md hover:bg-accent"
            onClick={() => setMobileMenuOpen(false)}
          >
            Cases
          </Link>
          <Link 
            to="/audit" 
            className="flex items-center p-2 -mx-2 rounded-md hover:bg-accent"
            onClick={() => setMobileMenuOpen(false)}
          >
            Audit Log
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
