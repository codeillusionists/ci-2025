import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Code, Menu, X, Search, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "./search-bar";

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
    <Link href={href} onClick={onClick}>
      <span className={`font-medium transition-colors duration-300 hover:text-purple-accent ${
        isActive(href) ? "text-white" : "text-gray-300"
      }`}>
        {children}
      </span>
    </Link>
  );

  return (
    <nav className="fixed top-0 w-full z-50 glassmorphic">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-10 h-10 purple-gradient rounded-xl flex items-center justify-center">
                  <Code className="text-white text-lg" />
                </div>
                <span className="text-xl font-bold gradient-text">Code Illusionists</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/courses">Courses</NavLink>
            <NavLink href="/resources">Resources</NavLink>
            <NavLink href="/community">Community</NavLink>
            <NavLink href="/about">About</NavLink>
          </div>

          {/* Search and Auth */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            <div className="hidden lg:block">
              <SearchBar />
            </div>
            <Button variant="ghost" className="glass-card px-3 py-2 text-white hover:bg-purple-primary/20">
              <LogIn className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:inline">Sign In</span>
            </Button>
            <Button className="purple-gradient px-4 lg:px-6 py-2 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
              <UserPlus className="w-4 h-4 lg:mr-2" />
              <span className="hidden lg:inline">Get Started</span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-card border-white/10">
                <div className="flex flex-col space-y-6 mt-8">
                  <SearchBar />
                  <NavLink href="/" onClick={() => setIsOpen(false)}>Home</NavLink>
                  <NavLink href="/courses" onClick={() => setIsOpen(false)}>Courses</NavLink>
                  <NavLink href="/resources" onClick={() => setIsOpen(false)}>Resources</NavLink>
                  <NavLink href="/community" onClick={() => setIsOpen(false)}>Community</NavLink>
                  <NavLink href="/about" onClick={() => setIsOpen(false)}>About</NavLink>
                  
                  <div className="space-y-3 pt-6 border-t border-white/10">
                    <Button variant="ghost" className="glass-card w-full justify-start text-white hover:bg-purple-primary/20">
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <Button className="purple-gradient w-full justify-start text-white">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Get Started
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
