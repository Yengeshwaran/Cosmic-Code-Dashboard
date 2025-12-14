import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Sun, Activity, Info } from 'lucide-react';

const MobileMenu = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 right-4 z-50 glass-github rounded-lg p-3 hover-lift"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-github-text" />
        ) : (
          <Menu className="w-6 h-6 text-github-text" />
        )}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed right-0 top-0 h-full w-80 max-w-[80vw] glass-github border-l border-github-border/30 p-6">
            <div className="mt-16 space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-github-text mb-2">Dashboard Navigation</h3>
                <p className="text-github-muted text-sm">Explore cosmic correlations</p>
              </div>
              
              <nav className="space-y-3">
                <button 
                  onClick={() => window.location.hash = 'realtime'}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors w-full text-left"
                >
                  <Activity className="w-5 h-5 text-github-accent" />
                  <span className="text-github-text">Real-time Data</span>
                </button>
                <button 
                  onClick={() => window.location.hash = 'dashboard'}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors w-full text-left"
                >
                  <Github className="w-5 h-5 text-github-success" />
                  <span className="text-github-text">Analytics Dashboard</span>
                </button>
                <a href="#stats" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <Sun className="w-5 h-5 text-solar-corona" />
                  <span className="text-github-text">Statistics</span>
                </a>
                <a href="#correlation" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <Info className="w-5 h-5 text-cosmic-nebula" />
                  <span className="text-github-text">Correlation</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-github-surface/50 z-50">
      <div 
        className="h-full bg-gradient-to-r from-github-accent via-solar-corona to-cosmic-nebula transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

const FloatingActionButton = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 glass-cosmic rounded-full p-4 hover-lift z-40 shadow-glow-purple"
    >
      <Activity className="w-6 h-6 text-cosmic-nebula animate-pulse" />
    </button>
  );
};

export { MobileMenu, ScrollProgress, FloatingActionButton };