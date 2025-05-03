
import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, FlaskConical } from "lucide-react"; // Import Lucide icons & FlaskConical

const Footer = () => {
  return (
    <footer className="bg-muted py-16 border-t border-border"> {/* Updated background and border */}
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"> {/* Increased gap */}
          {/* Company & Logo */}
          <div className="md:col-span-2 lg:col-span-1"> {/* Adjust column span */}
            <Link to="/" className="flex items-center space-x-2 mb-4">
              {/* Updated Logo Background & Icon */}
              <div className="bg-primary text-primary-foreground rounded-md p-1.5 flex items-center justify-center"> {/* Ensure icon is centered */}
                 <FlaskConical className="w-6 h-6" /> {/* Replaced SVG with Lucide Icon */}
              </div>
              <span className="font-bold text-xl text-foreground">AdaptiDemo Labs</span> {/* Reverted Name */}
            </Link>
        <p className="text-muted-foreground text-sm mb-6"> {/* Updated text color & size */}
          AI-powered documentation generation from UI recordings.
            </p>
            {/* Updated Social Icons */}
            <div className="flex space-x-4">
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-4">Product</h3> {/* Updated text color & size */}
            <ul className="space-y-3">
              <li>
                <Link to="/#features" className="text-sm text-muted-foreground hover:text-primary transition-colors"> {/* Updated text color & size */}
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              {/* Add/Remove links as needed */}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/docs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-base font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Updated Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center"> {/* Updated border color */}
          <p className="text-xs text-muted-foreground mb-4 sm:mb-0"> {/* Updated text color & size */}
            &copy; {new Date().getFullYear()} AdaptiDemo Labs. All rights reserved. {/* Reverted Name */}
          </p>
          {/* Optional: Keep bottom links if needed */}
          {/* <div className="flex space-x-6">
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary">
              Terms
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
