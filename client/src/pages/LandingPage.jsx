import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-slide-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          v2.0 is now live
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 font-sans animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Where Great Ideas <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
            Find Their Voice.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-serif animate-slide-up" style={{ animationDelay: '0.2s' }}>
          A modern, high-performance publishing platform for writers, thinkers, and creators. 
          Share your stories with the world without the noise.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/write" className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:-translate-y-1 transition-transform">
            Start Writing
          </Link>
          <Link to="/explore" className="w-full sm:w-auto px-8 py-4 rounded-full bg-muted text-foreground font-semibold hover:bg-muted/80 transition-colors">
            Explore Stories
          </Link>
        </div>
      </section>

      {/* Featured Section placeholder */}
      <section className="w-full bg-muted/30 py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Trending on BlogVerse</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="h-48 bg-muted rounded-xl mb-4 animate-pulse"></div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20"></div>
                  <div className="text-sm text-muted-foreground">Author Name</div>
                </div>
                <h3 className="text-xl font-bold mb-2 font-serif">The Future of Modern Web Engineering</h3>
                <p className="text-muted-foreground line-clamp-2">A deep dive into how architectures are changing in the era of serverless and Edge computing.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
