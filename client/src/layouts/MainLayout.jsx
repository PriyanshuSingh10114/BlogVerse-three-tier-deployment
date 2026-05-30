import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'glass py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-primary">
            BlogVerse.
          </Link>
          <div className="hidden md:flex gap-8 items-center font-medium">
            <Link to="/explore" className="hover:text-primary transition-colors">Explore</Link>
            <Link to="/write" className="hover:text-primary transition-colors">Write</Link>
            <button className="bg-primary text-primary-foreground px-5 py-2 rounded-full shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 min-h-screen">
        <Outlet />
      </main>

      <footer className="border-t border-muted py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-muted-foreground">
          <p>© 2026 BlogVerse. Built with modern web engineering.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
