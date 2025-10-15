// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ProductDetails from './components/ProductDetails';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      {/* scroll to top on navigation / reload */}
      <ScrollToTop />
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        {/* Global Footer */}
        <footer className="bg-gray-950 text-gray-400 border-t border-gray-900">
          <div className="container mx-auto px-6 py-12">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">

              {/* Company Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div>
                    <h3 className="text-white font-bold text-lg">HIVE+ INDUSTRIES</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Advanced autonomous aerial systems engineered for precision, reliability, and mission success.
                </p>
                <p className="text-xs text-gray-600">
                  An ISO 9001:2015 Certified Company
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-sm hover:text-red-500 transition-colors">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/products" className="text-sm hover:text-red-500 transition-colors">
                      Products
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-sm hover:text-red-500 transition-colors">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/news" className="text-sm hover:text-red-500 transition-colors">
                      News & Updates
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-sm hover:text-red-500 transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <a href="mailto:krishchandhok149@gmail.com" className="text-sm hover:text-red-500 transition-colors break-all">
                        krishchandhok149@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Contact</p>
                      <p className="text-sm">Krish Chandhok</p>
                      <a href="tel:+919920887455" className="text-sm hover:text-red-500 transition-colors">
                        +91 9920887455
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="text-sm">Bangalore, Karnataka, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-900 my-8"></div>

            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-500 text-sm">
                  © 2025 FlyHive Technologies Pvt Ltd. All rights reserved.
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  For product demonstrations, technical support, or deployment inquiries
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                <a href="/privacy" className="text-gray-500 hover:text-red-500 text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-500 hover:text-red-500 text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="/security" className="text-gray-500 hover:text-red-500 text-sm transition-colors">
                  Security
                </a>
                <a href="/compliance" className="text-gray-500 hover:text-red-500 text-sm transition-colors">
                  Compliance
                </a>
              </div>
            </div>

            {/* Social Media Links (Optional) */}
            <div className="flex justify-center space-x-6 mt-8 pt-8 border-t border-gray-900">
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-red-500 transition-colors" aria-label="YouTube">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;