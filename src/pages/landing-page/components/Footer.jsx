import React from 'react';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Examples', href: '#examples' },
      { name: 'API', href: '#api' }
    ],
    company: [
      { name: 'About', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' }
    ],
    support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' },
      { name: 'Tutorials', href: '#tutorials' },
      { name: 'Status', href: '#status' }
    ],
    legal: [
      { name: 'Privacy', href: '#privacy' },
      { name: 'Terms', href: '#terms' },
      { name: 'Cookies', href: '#cookies' },
      { name: 'Licenses', href: '#licenses' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#twitter' },
    { name: 'Instagram', icon: 'Instagram', href: '#instagram' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#linkedin' },
    { name: 'YouTube', icon: 'Youtube', href: '#youtube' }
  ];

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-xl">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <div>
                <span className="text-xl font-bold text-text-primary">CarouselAI</span>
                <div className="text-xs text-secondary-600">Instagram Carousel Creator</div>
              </div>
            </div>
            <p className="text-secondary-600 mb-6 max-w-sm">
              Create stunning Instagram carousels with AI-powered backgrounds and professional designs. 
              No design skills required.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 bg-secondary-100 hover:bg-primary hover:text-white rounded-lg transition-colors duration-150 micro-scale"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-600 hover:text-text-primary transition-colors duration-150"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-600 hover:text-text-primary transition-colors duration-150"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-600 hover:text-text-primary transition-colors duration-150"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-secondary-600 hover:text-text-primary transition-colors duration-150"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-100 rounded-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Stay Updated
              </h3>
              <p className="text-secondary-600">
                Get the latest features and carousel creation tips delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 border border-border rounded-l-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
              <button className="px-6 py-3 bg-primary text-white rounded-r-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary focus:ring-offset-2 micro-scale transition-all duration-150">
                <Icon name="Send" size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
          <div className="text-secondary-600 text-sm mb-4 md:mb-0">
            © {currentYear} CarouselAI. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-secondary-600">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-600">
              <Icon name="Zap" size={16} className="text-accent" />
              <span>AI Powered</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-600">
              <Icon name="Heart" size={16} className="text-error" />
              <span>Made with Love</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;