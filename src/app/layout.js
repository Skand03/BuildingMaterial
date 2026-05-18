import './globals.css';
import { MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Adarsh BuildMart | Premium Construction Materials & Hardware',
  description: 'Your trusted partner for high-quality construction materials and hardware in Bihar. Adarsh BuildMart offers premium supplies for all your building needs.',
  keywords: 'Adarsh BuildMart, construction materials, hardware, Bihar, building supplies, Adarsh Yadav',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar glass">
          <div className="container nav-container">
            <a href="/" className="logo">
              Adarsh<span className="text-primary">BuildMart</span>
            </a>
            
            {/* Hamburger menu for mobile could go here, but for now we'll use CSS to wrap/scroll links nicely on small screens */}
            <div className="nav-wrapper">
              <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </nav>
        <main>
          {children}
        </main>
        <footer className="footer glass">
          <div className="container footer-content">
            <div className="footer-brand">
              <h3>Adarsh<span className="text-primary">BuildMart</span></h3>
              <p>Premium construction materials and hardware solutions in Bihar.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>Bihar, India</p>
              <p style={{ wordBreak: 'break-all' }}>adarshmohit9334@gmail.com</p>
              <p>+91 93347 21693</p>
              <a href="https://wa.me/919334721693" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#25D366', marginTop: '0.5rem', fontWeight: 'bold' }}>
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Adarsh BuildMart. All rights reserved. Built by Adarsh Yadav.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
