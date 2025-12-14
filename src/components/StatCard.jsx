import React from 'react';

const StatCard = ({ title, value, icon, color, theme = 'default' }) => {
  const getThemeClasses = () => {
    switch (theme) {
      case 'github':
        return 'glass-github hover:shadow-glow-blue border-github-accent/20';
      case 'solar':
        return 'glass-solar hover:shadow-glow-orange border-solar-flare/20';
      case 'cosmic':
        return 'glass-cosmic hover:shadow-glow-purple border-cosmic-nebula/20';
      default:
        return 'glass-effect hover:bg-white/10 border-github-border/30';
    }
  };

  const getIconAnimation = () => {
    switch (theme) {
      case 'github':
        return 'group-hover:animate-pulse';
      case 'solar':
        return 'group-hover:animate-bounce-slow';
      case 'cosmic':
        return 'group-hover:animate-pulse-slow';
      default:
        return 'group-hover:scale-110';
    }
  };

  return (
    <div className={`group ${getThemeClasses()} rounded-xl p-6 hover-lift transition-all duration-300 cursor-pointer`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-github-muted text-sm font-medium uppercase tracking-wide mb-2">
            {title}
          </p>
          <p className="text-3xl font-bold text-github-text group-hover:text-white transition-colors">
            {value}
          </p>
        </div>
        <div className={`${color} transition-all duration-300 ${getIconAnimation()}`}>
          <div className="p-3 rounded-full bg-white/5 group-hover:bg-white/10">
            {icon}
          </div>
        </div>
      </div>
      
      {/* Animated bottom border */}
      <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
    </div>
  );
};

export default StatCard;