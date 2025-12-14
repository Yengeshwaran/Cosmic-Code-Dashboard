import React, { useState, useEffect } from 'react';
import { Sun, Github, Activity, TrendingUp, Calendar, Zap, Star } from 'lucide-react';
import Dashboard from './components/Dashboard';
import { MobileMenu, ScrollProgress, FloatingActionButton } from './components/MobileOptimizations';
import { fetchGitHubData, fetchSolarData } from './services/dataService';

// Animated stars background component
const StarField = () => {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  return (
    <div className="stars">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [githubData, setGithubData] = useState([]);
  const [solarData, setSolarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [github, solar] = await Promise.all([
          fetchGitHubData(),
          fetchSolarData()
        ]);
        setGithubData(github);
        setSolarData(solar);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <StarField />
        <div className="glass-effect rounded-2xl p-12 text-center hover-lift">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Activity className="w-16 h-16 text-github-accent animate-pulse" />
              <div className="absolute -top-2 -right-2">
                <Zap className="w-6 h-6 text-solar-flare animate-bounce" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-github-text mb-2">Loading Cosmic Data</h2>
          <p className="text-github-muted">Synchronizing with the universe...</p>
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-2 h-2 bg-github-accent rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-solar-flare rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-cosmic-nebula rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <StarField />
        <div className="glass-effect rounded-2xl p-12 text-center max-w-md">
          <div className="text-red-400 mb-4">
            <Activity className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-xl font-bold text-github-text mb-2">Connection Lost</h2>
          <p className="text-github-muted mb-4">Unable to reach the cosmic data sources</p>
          <p className="text-red-300 text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-github-accent hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative">
      <StarField />
      <ScrollProgress />
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)} 
      />
      <FloatingActionButton onClick={scrollToTop} />
      
      {/* Enhanced Header */}
      <header className="relative z-10 text-center py-12 px-4" id="top">
        <div className="max-w-4xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="relative group">
              <Github className="w-12 h-12 text-github-accent group-hover:text-blue-400 transition-colors animate-float" />
              <div className="absolute -inset-2 bg-github-accent/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="text-4xl font-bold text-github-muted">×</div>
            <div className="relative group">
              <Sun className="w-12 h-12 text-solar-corona group-hover:text-yellow-300 transition-colors animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute -inset-2 bg-solar-corona/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="responsive-text-4xl text-5xl font-bold text-github-text mb-4 bg-gradient-to-r from-github-accent via-solar-corona to-cosmic-nebula bg-clip-text text-transparent">
            Cosmic Code Dashboard
          </h1>
          
          {/* Subtitle */}
          <p className="responsive-text-xl text-xl text-github-muted max-w-2xl mx-auto leading-relaxed">
            Exploring the mysterious correlation between solar activity and GitHub contributions
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <div className="glass-github px-4 py-2 rounded-full text-sm text-github-accent flex items-center gap-2">
              <Github className="w-4 h-4" />
              Live GitHub Data
            </div>
            <div className="glass-solar px-4 py-2 rounded-full text-sm text-solar-flare flex items-center gap-2">
              <Sun className="w-4 h-4" />
              Solar Activity
            </div>
            <div className="glass-cosmic px-4 py-2 rounded-full text-sm text-cosmic-nebula flex items-center gap-2">
              <Star className="w-4 h-4" />
              Correlation Analysis
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Dashboard */}
      <main className="relative z-10 px-4 pb-12" id="dashboard">
        <Dashboard githubData={githubData} solarData={solarData} />
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 px-4 border-t border-github-border/30">
        <p className="text-github-muted text-sm">
          Made with ❤️ for developers who believe in cosmic connections
        </p>
      </footer>
    </div>
  );
}

export default App;