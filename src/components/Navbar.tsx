
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, FlaskConical } from "lucide-react"; // Added FlaskConical

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background/95 backdrop-blur border-b border-border py-3 sticky top-0 z-50"> {/* Updated style */}
      <div className="container-custom flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          {/* Updated Logo Background & Icon */}
          <div className="bg-primary text-primary-foreground rounded-md p-1.5 flex items-center justify-center"> {/* Ensure icon is centered */}
            <FlaskConical className="w-6 h-6" /> {/* Replaced SVG with Lucide Icon */}
          </div>
          <span className="font-bold text-xl text-foreground">AdaptiDemo Labs</span> {/* Reverted Name */}
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8"> {/* Adjusted spacing */}
          {/* Updated Link Styling */}
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Home
          </Link>
          {/* Changed to standard anchor link */}
          <a href="/#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Features
          </a>
           {/* Changed to standard anchor link */}
          <a href="/#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            How It Works
          </a>
          {/* Added Dashboard link back */}
          <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          {/* Updated Get Started button to link to upload section */}
          <Button size="sm" asChild>
             <a href="#upload">Get Started</a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-md py-4 px-6"> {/* Updated style */}
          <div className="flex flex-col space-y-4">
            {/* Updated Link Styling */}
            <Link
              to="/"
              className="block font-medium text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu} // Use toggleMenu to close
            >
              Home
            </Link>
            {/* Corrected opening tag from Link to a */}
            <a
              href="/#features"
              className="block font-medium text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Features
            </a> {/* Changed to standard anchor link */}
            <a
              href="/#how-it-works"
              className="block font-medium text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              How It Works
            </a> {/* Changed to standard anchor link */}
            {/* Added Dashboard link back to mobile menu */}
            <Link
              to="/dashboard"
              className="block font-medium text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Dashboard
            </Link>
            {/* Removed Pricing link */}
            {/* <Link
              to="/pricing"
              className="block font-medium text-foreground hover:text-primary transition-colors"
              onClick={toggleMenu}
            >
              Pricing
            </Link> */}
            {/* Updated Get Started button to link to upload section */}
            <Button onClick={toggleMenu} className="w-full" asChild>
               <a href="#upload">Get Started</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
