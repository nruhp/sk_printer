import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars, FaTimes, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-sm py-2">
        <div className="container-custom flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-4">
            <a href="tel:+919876543210" className="flex items-center hover:text-primary-400">
              <FaPhone className="mr-2" /> +91 98765-43210
            </a>
            <a href="mailto:info@skprinters.com" className="flex items-center hover:text-primary-400">
              <FaEnvelope className="mr-2" /> info@skprinters.com
            </a>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary-400"><FaFacebook /></a>
            <a href="#" className="hover:text-primary-400"><FaTwitter /></a>
            <a href="#" className="hover:text-primary-400"><FaLinkedin /></a>
            <a href="#" className="hover:text-primary-400"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container-custom">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
                <div className="text-2xl md:text-3xl font-black text-primary-600">
                  SK <span className="text-gray-800">Printers</span>
                </div>
              </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} 
                    className={`font-semibold transition-colors ${
                      isActive(item.href)
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    {item.name}
                  </Link>
              ))}
              <Link href="/get-quote" className="btn btn-primary">Get Quote</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} 
                    className={`block py-3 px-4 font-semibold ${
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
              ))}
              <Link href="/get-quote" 
                  className="block mt-4 mx-4 btn btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Quote
                </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-white text-xl font-bold mb-4">SK Printers</h3>
              <p className="mb-4">
                Leading manufacturer of eco-friendly corrugated packaging solutions. 
                ISO certified with over 20 years of experience.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary-400"><FaFacebook size={20} /></a>
                <a href="#" className="hover:text-primary-400"><FaTwitter size={20} /></a>
                <a href="#" className="hover:text-primary-400"><FaLinkedin size={20} /></a>
                <a href="#" className="hover:text-primary-400"><FaInstagram size={20} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-primary-400">About Us</Link></li>
                <li><Link href="/products" className="hover:text-primary-400">Products</Link></li>
                <li><Link href="/blog" className="hover:text-primary-400">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-primary-400">Careers</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary-400">3-Ply Boxes</a></li>
                <li><a href="#" className="hover:text-primary-400">5-Ply Boxes</a></li>
                <li><a href="#" className="hover:text-primary-400">7-Ply Boxes</a></li>
                <li><a href="#" className="hover:text-primary-400">Custom Printing</a></li>
                <li><a href="#" className="hover:text-primary-400">Die-Cut Boxes</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mt-1 mr-2 text-primary-400" />
                  <span>123 Industrial Area, Phase 2, Manufacturing Hub, India</span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-2 text-primary-400" />
                  <a href="tel:+919876543210" className="hover:text-primary-400">+91 98765-43210</a>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-2 text-primary-400" />
                  <a href="mailto:info@skprinters.com" className="hover:text-primary-400">info@skprinters.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm">
                © 2024 SK Printers. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <Link href="/privacy-policy" className="hover:text-primary-400">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-primary-400">Terms & Conditions</Link>
                <Link href="/sitemap" className="hover:text-primary-400">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
