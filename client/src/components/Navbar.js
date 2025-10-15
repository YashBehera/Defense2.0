import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleNavigation = (href, e) => {
    e.preventDefault();
    
    // Handle navigation based on href
    switch(href) {
      case '/':
      case '/home':
        navigate('/');
        break;
      case '/products':
        navigate('/products');
        break;
      case '/news':
        navigate('/news');
        break;
      case '/about':
        navigate('/about');
        break;
      case '/contact':
        navigate('/contact');
        break;
      default:
        // Handle section navigation (for dropdown items)
        if (href.startsWith('#')) {
          navigate('/products' + href);
        }
    }
    
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/products', label: 'PRODUCTS' },
    { href: '/news', label: 'NEWS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' }
  ];

  // Highlight active nav item
  const isActiveLink = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`sticky top-0 w-full z-50 transition-all duration-500 pt-[max(0.75rem,env(safe-area-inset-top))] ${
        scrolled 
          ? 'bg-white shadow-lg border-b border-gray-200 py-3' 
          : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            {/* Logo Section - Also clickable to go home */}
            <div 
              className="flex items-center space-x-4 cursor-pointer group"
              onClick={() => {
                navigate('/');
                window.scrollTo(0, 0);
              }}
            >

              <div className="border-l-2 border-red-600 pl-4">
                <h1 className="text-xl font-bold tracking-tight leading-tight">
                  <span className={`${scrolled ? 'text-gray-900' : 'text-white'}`}>hi</span>
                  <span className="text-red-600 font-extrabold">ve+</span>
                </h1>
                <p className={`text-[10px] tracking-[0.2em] uppercase font-medium ${scrolled ? 'text-gray-600' : 'text-gray-300'}`}>
                  INDUSTRIES
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <div 
                    key={link.href} 
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavigation(link.href, e)}
                      className={`px-5 py-3 text-[13px] font-semibold tracking-wide transition-all duration-300 flex items-center space-x-2 relative group ${
                        isActiveLink(link.href) 
                          ? 'text-red-600' 
                          : scrolled 
                            ? 'text-gray-900 hover:text-red-600' 
                            : 'text-white hover:text-red-600'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.dropdown && (
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      )}
                      {/* Hover Line - Red accent */}
                      <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-red-600 transform transition-transform duration-300 ${
                        isActiveLink(link.href) 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </a>
                    
                    {/* Professional Dropdown */}
                    {link.dropdown && activeDropdown === link.label && (
                      <div className="absolute left-0 mt-0 w-80 bg-white border-2 border-gray-200 shadow-2xl transform transition-all duration-300 rounded-lg overflow-hidden">
                        <div className="p-1">
                          {link.dropdown.map((item, index) => (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={(e) => handleNavigation(item.href, e)}
                              className="block p-4 hover:bg-red-50 transition-all duration-200 group rounded-md"
                            >
                              <div className="flex items-start space-x-4">
                                <span className="text-2xl opacity-60 group-hover:opacity-100 group-hover:text-red-600 transition-all">
                                  {item.icon}
                                </span>
                                <div>
                                  <h3 className="text-gray-900 font-bold text-sm tracking-wide group-hover:text-red-600 transition-colors">
                                    {item.label}
                                  </h3>
                                  <p className="text-gray-600 text-xs mt-1">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                              {index < link.dropdown.length - 1 && (
                                <div className="border-b border-gray-200 mt-4"></div>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="ml-8 flex items-center space-x-4 border-l-2 border-gray-200 pl-8">
                <button 
                  className={`transition-colors duration-300 ${scrolled ? 'text-gray-900 hover:text-red-600' : 'text-white hover:text-red-600'}`}
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                
                <button
                  onClick={() => navigate('/contact')}
                  className="px-5 py-2 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  GET QUOTE
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 focus:outline-none hover:bg-gray-100/20 rounded-lg transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block w-full h-0.5 ${scrolled ? 'bg-gray-900' : 'bg-white'} transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
                  <span className={`block w-full h-0.5 bg-red-600 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-full h-0.5 ${scrolled ? 'bg-gray-900' : 'bg-white'} transition-all duration-300 origin-left ${isOpen ? '-rotate-45 -translate-y-0.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-500 ${
            isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="bg-white border-2 border-gray-200 rounded-xl shadow-xl">
              {navLinks.map((link, index) => (
                <div key={link.href}>
                  <a
                    href={link.href}
                    className={`block px-6 py-4 text-sm font-semibold tracking-wide transition-colors duration-200 ${
                      isActiveLink(link.href)
                        ? 'text-red-600 bg-red-50 border-l-4 border-red-600'
                        : 'text-gray-900 hover:text-red-600 hover:bg-red-50'
                    }`}
                    onClick={(e) => {
                      if (!link.dropdown) {
                        handleNavigation(link.href, e);
                        setIsOpen(false);
                      } else {
                        e.preventDefault();
                        setActiveDropdown(activeDropdown === link.label ? null : link.label);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.label}</span>
                      {link.dropdown && (
                        <svg className={`w-4 h-4 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      )}
                    </div>
                  </a>
                  {link.dropdown && activeDropdown === link.label && (
                    <div className="bg-gray-50">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="block px-8 py-3 text-xs text-gray-900 hover:text-red-600 hover:bg-red-50 transition-colors"
                          onClick={(e) => {
                            handleNavigation(item.href, e);
                            setIsOpen(false);
                          }}
                        >
                          <span className="mr-2">{item.icon}</span>
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                  {index < navLinks.length - 1 && <div className="border-b border-gray-200"></div>}
                </div>
              ))}
              
              {/* Mobile CTA */}
              <div className="p-4 bg-gray-50 border-t-2 border-gray-200">
                <button
                  onClick={() => {
                    navigate('/contact');
                    setIsOpen(false);
                  }}
                  className="w-full px-5 py-3 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md"
                >
                  GET QUOTE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Accent Line - Red gradient */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50"></div>
      </nav>
    </>
  );
};

export default Navbar;