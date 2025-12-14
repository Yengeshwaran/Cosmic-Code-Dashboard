import React, { useState, useEffect } from 'react';
import { Sun, Github, Activity, TrendingUp, Calendar, Zap, Star, ArrowLeft } from 'lucide-react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import RealtimeDashboard from './components/RealtimeDashboard';
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
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'dashboard', 'realtime'
  const [showNavigation, setShowNavigation] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (currentView === 'dashboard') {
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
      }
    };

    loadData();
  }, [currentView]);

  const handleEnterDashboard = () => {
    setCurrentView('dashboard');
    setShowNavigation(true);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setShowNavigation(false);
    setLoading(true);
    setError(null);
  };

  // Show landing page
  if (currentView === 'landing') {
    return <LandingPage onEnterDashboard={handleEnterDashboard} />;
  }

  // Show loading for dashboard data
  if (currentView === 'dashboard' && loading) {
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

  // Show error for dashboard
  if (currentView === 'dashboard' && error) {
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
          <div className="flex gap-3 mt-6">
            <button 
              onClick={handleBackToLanding}
              className="px-6 py-2 bg-github-surface hover:bg-github-border text-github-text rounded-lg transition-colors"
            >
              Back to Home
            </button>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-github-accent hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render main dashboard application
  return (
    <div className="min-h-screen relative">
      <StarField />
      <ScrollProgress />
      
      {/* Navigation */}
      {showNavigation && (
        <>
          <MobileMenu 
            isOpen={mobileMenuOpen} 
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)} 
          />
          <FloatingActionButton onClick={scrollToTop} />
          
          {/* Top Navigation Bar */}
          <nav className="relative z-20 glass-github border-b border-github-border/30">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleBackToLanding}
                    className="flex items-center gap-2 text-github-muted hover:text-github-text transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Back to Home</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <Github className="w-6 h-6 text-github-accent" />
                    <Sun className="w-6 h-6 text-solar-corona" />
                    <span className="font-semibold text-github-text">Cosmic Code</span>
                  </div>
                </div>
                
                <div className="hidden md:flex items-center gap-4">
                  <button
                    onClick={() => handleViewChange('realtime')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentView === 'realtime' 
                        ? 'bg-github-accent text-white' 
                        : 'text-github-muted hover:text-github-text hover:bg-github-surface'
                    }`}
                  >
                    Real-time
                  </button>
                  <button
                    onClick={() => handleViewChange('dashboard')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentView === 'dashboard' 
                        ? 'bg-github-accent text-white' 
                        : 'text-github-muted hover:text-github-text hover:bg-github-surface'
                    }`}
                  >
                    Analytics
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </>
      )}
      
      {/* Main Content */}
      <main className="relative z-10 px-4 py-8">
        {currentView === 'realtime' && <RealtimeDashboard />}
        {currentView === 'dashboard' && (
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-github-text mb-2">
                Historical Analysis Dashboard
              </h1>
              <p className="text-github-muted">
                30-day correlation analysis between solar activity and GitHub contributions
              </p>
            </div>
            <Dashboard githubData={githubData} solarData={solarData} />
          </div>
        )}
      </main>

      {/* Footer */}
      {showNavigation && (
        <footer className="relative z-10 text-center py-8 px-4 border-t border-github-border/30">
          <p className="text-github-muted text-sm">
            Made with ❤️ for developers who believe in cosmic connections
          </p>
        </footer>
      )}
    </div>
  );
}

export default App;