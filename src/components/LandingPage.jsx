import React, { useState, useEffect } from 'react';
import { Github, Sun, Activity, Zap, Star, ArrowRight, Play, Code, Satellite, TrendingUp } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <div 
      className="glass-effect rounded-xl p-6 hover-lift group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-gradient-to-br from-cosmic-nebula/20 to-github-accent/20 rounded-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-github-text">{title}</h3>
      </div>
      <p className="text-github-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const LandingPage = ({ onEnterDashboard }) => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const stats = [
    { label: 'GitHub Repositories Analyzed', value: 50000, suffix: '+' },
    { label: 'Solar Events Tracked', value: 1247, suffix: '' },
    { label: 'Correlation Patterns Found', value: 89, suffix: '%' },
    { label: 'Days of Data Analysis', value: 365, suffix: '' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleEnterDashboard = () => {
    setIsLoading(true);
    setTimeout(() => {
      onEnterDashboard();
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-github-bg via-github-surface to-cosmic-900"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <Github className="w-32 h-32 text-github-accent animate-float" />
      </div>
      <div className="absolute top-40 right-20 opacity-20">
        <Sun className="w-24 h-24 text-solar-corona animate-pulse-slow" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-20">
        <Satellite className="w-20 h-20 text-cosmic-nebula animate-bounce-slow" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Logo Animation */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="relative">
              <Github className="w-16 h-16 text-github-accent animate-float" />
              <div className="absolute -top-2 -right-2">
                <Zap className="w-6 h-6 text-solar-flare animate-pulse" />
              </div>
            </div>
            <div className="text-6xl font-bold text-github-muted animate-pulse">×</div>
            <div className="relative">
              <Sun className="w-16 h-16 text-solar-corona animate-float" style={{ animationDelay: '1s' }} />
              <div className="absolute -inset-4 bg-solar-corona/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-github-accent via-solar-corona to-cosmic-nebula bg-clip-text text-transparent">
            Cosmic Code
          </h1>
          <h2 className="text-3xl lg:text-4xl font-semibold text-github-text mb-6">
            Dashboard
          </h2>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-github-muted mb-8 leading-relaxed">
            Discover the mysterious connection between 
            <span className="text-solar-flare font-semibold"> solar activity </span>
            and 
            <span className="text-github-success font-semibold"> developer productivity</span>
          </p>

          {/* Dynamic Stats */}
          <div className="glass-effect rounded-2xl p-6 mb-12 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cosmic-nebula mb-2">
                <AnimatedCounter end={stats[currentStat].value} suffix={stats[currentStat].suffix} />
              </div>
              <div className="text-github-muted text-sm">
                {stats[currentStat].label}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleEnterDashboard}
            disabled={isLoading}
            className="group relative px-12 py-4 bg-gradient-to-r from-github-accent to-cosmic-nebula rounded-full text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-glow-blue disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 animate-spin" />
                Initializing Cosmic Connection...
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Begin Exploration
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            )}
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <FeatureCard
            icon={<TrendingUp className="w-6 h-6 text-github-success" />}
            title="Real-time Analytics"
            description="Live GitHub activity tracking with instant correlation analysis"
            delay={100}
          />
          <FeatureCard
            icon={<Sun className="w-6 h-6 text-solar-corona" />}
            title="Solar Data Integration"
            description="NOAA space weather data with solar flux and geomagnetic indices"
            delay={200}
          />
          <FeatureCard
            icon={<Activity className="w-6 h-6 text-cosmic-nebula" />}
            title="Correlation Engine"
            description="Advanced statistical analysis revealing cosmic coding patterns"
            delay={300}
          />
          <FeatureCard
            icon={<Star className="w-6 h-6 text-github-accent" />}
            title="Interactive Visualizations"
            description="Beautiful charts and graphs that tell the cosmic story"
            delay={400}
          />
        </div>

        {/* Scientific Disclaimer */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <p className="text-github-muted text-sm leading-relaxed">
            <span className="text-cosmic-nebula font-medium">Scientific Exploration:</span> 
            This dashboard investigates potential correlations between solar electromagnetic activity 
            and human cognitive patterns in software development. While correlation doesn't imply 
            causation, the patterns revealed are fascinating to explore.
          </p>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-effect rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Activity className="w-12 h-12 text-cosmic-nebula animate-spin" />
            </div>
            <h3 className="text-xl font-semibold text-github-text mb-2">
              Synchronizing with the Universe
            </h3>
            <p className="text-github-muted">Connecting to cosmic data streams...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;