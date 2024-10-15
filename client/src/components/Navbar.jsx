import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useLocation } from 'react-router-dom';
import Upload from './Upload';
import { XIcon } from "lucide-react";
import Logo from './Logo';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const path = useLocation().pathname;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className='pt-5'>
      <header className="bg-background border-b overflow-hidden">
        <div className="container flex items-center justify-between h-14 px-4 md:px-6">
        <Link to="/">
            <Logo />
        </Link>

          <nav className="hidden md:flex items-center gap-4">
            <Link
              to="/"
              className={`${path === "/" ? "bg-muted" : ""} px-2 py-1 rounded-md text-sm font-medium hover:bg-muted transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/notes"
              className={`${path === "/notes" ? "bg-muted" : ""} px-2 py-1 rounded-md text-sm font-medium hover:bg-muted transition-colors`}
            >
              Resource
            </Link>
            <Link
              to="/my-profile"
              className={`${path === "/my-profile" ? "bg-muted" : ""} px-2 py-1 rounded-md text-sm font-medium hover:bg-muted transition-colors`}
            >
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Upload />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background shadow-lg">
            <nav className="flex flex-col items-center justify-center h-auto py-4 space-y-2">
              <Link
                to="/"
                className={`${path === "/" ? "bg-muted" : ""} w-full text-center px-4 py-3 text-lg font-medium hover:bg-muted transition-colors`}
                onClick={toggleMobileMenu} // Close menu on click
              >
                Home
              </Link>
              <Link
                to="/notes"
                className={`${path === "/notes" ? "bg-muted" : ""} w-full text-center px-4 py-3 text-lg font-medium hover:bg-muted transition-colors`}
                onClick={toggleMobileMenu} // Close menu on click
              >
                Resource
              </Link>
              <Link
                to="/my-profile"
                className={`${path === "/my-profile" ? "bg-muted" : ""} w-full text-center px-4 py-3 text-lg font-medium hover:bg-muted transition-colors`}
                onClick={toggleMobileMenu} // Close menu on click
              >
                Dashboard
              </Link>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;


  function MenuIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    )
  }

  function BookIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    )
  }
  
  