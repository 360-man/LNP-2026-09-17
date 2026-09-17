import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Leaf } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Leaf className="h-8 w-8 text-brand-purple" />
                <span className="ml-2 text-xl font-serif text-brand-purple">Lisa's Natural Path</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-brand-purple">Home</Link>
              <Link to="/shop" className="text-gray-700 hover:text-brand-purple">Shop</Link>
              <Link to="/services" className="text-gray-700 hover:text-brand-purple">Services</Link>
              <Link to="/about" className="text-gray-700 hover:text-brand-purple">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-brand-purple">Contact</Link>
              <button className="bg-brand-purple text-white p-2 rounded-full">
                <ShoppingBag size={20} />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-brand-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="block px-3 py-2 text-gray-700 hover:text-brand-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/services"
                className="block px-3 py-2 text-gray-700 hover:text-brand-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-brand-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-brand-purple"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-serif mb-4">Visit Us</h3>
              <p className="mb-2">1779 N. Main St. Ext.,</p>
              <p className="mb-2">Kerr Business Center,</p>
              <p>Butler, PA 16001</p>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-brand-green">Home</Link></li>
                <li><Link to="/shop" className="hover:text-brand-green">Shop</Link></li>
                <li><Link to="/services" className="hover:text-brand-green">Services</Link></li>
                <li><Link to="/about" className="hover:text-brand-green">About</Link></li>
                <li><Link to="/contact" className="hover:text-brand-green">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-serif mb-4">Newsletter</h3>
              <p className="mb-4">Stay updated with our latest products and wellness tips.</p>
              <NewsletterForm />
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© {new Date().getFullYear()} Lisa's Natural Path. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};