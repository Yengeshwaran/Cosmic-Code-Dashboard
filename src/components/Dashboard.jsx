import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, GitCommit, Sun, Activity, Zap, Star, GitBranch, AlertCircle } from 'lucide-react';
import StatCard from './StatCard';
import CorrelationChart from './CorrelationChart';

const Dashboard = ({ githubData, solarData }) => {
  // Merge and process data for correlation analysis
  const mergedData = useMemo(() => {
    return githubData.map((github, index) => {
      const solar = solarData[index] || {};
      return {
        ...github,
        ...solar,
        correlationScore: calculateCorrelation(github.commits, solar.solarFluxIndex || 0)
      };
    });
  }, [githubData, solarData]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCommits = githubData.reduce((sum, day) => sum + day.commits, 0);
    const avgSolarActivity = solarData.reduce((sum, day) => sum + (day.solarFluxIndex || 0), 0) / solarData.length;
    const maxCommitDay = githubData.reduce((max, day) => day.commits > max.commits ? day : max, githubData[0] || {});
    const correlationCoeff = calculateOverallCorrelation(mergedData);

    return {
      totalCommits,
      avgSolarActivity: Math.round(avgSolarActivity),
      maxCommitDay: maxCommitDay.date,
      correlationCoeff: Math.round(correlationCoeff * 100) / 100
    };
  }, [githubData, solarData, mergedData]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label, theme = 'github' }) => {
    if (active && payload && payload.length) {
      const bgColor = theme === 'solar' ? 'rgba(255, 107, 53, 0.95)' : 'rgba(22, 27, 34, 0.95)';
      return (
        <div 
          className="backdrop-blur-md rounded-lg p-3 border shadow-lg"
          style={{ 
            backgroundColor: bgColor,
            borderColor: theme === 'solar' ? 'rgba(255, 107, 53, 0.3)' : 'rgba(88, 166, 255, 0.3)'
          }}
        >
          <p className="text-white font-medium mb-2">
            {new Date(label).toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Enhanced Stats Cards */}
      <section id="stats" className="scroll-mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          title="Total Commits"
          value={stats.totalCommits.toLocaleString()}
          icon={<GitCommit className="w-6 h-6" />}
          color="text-github-success"
          theme="github"
        />
        <StatCard
          title="Avg Solar Flux"
          value={stats.avgSolarActivity}
          icon={<Sun className="w-6 h-6" />}
          color="text-solar-corona"
          theme="solar"
        />
        <StatCard
          title="Peak Activity"
          value={new Date(stats.maxCommitDay).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          icon={<TrendingUp className="w-6 h-6" />}
          color="text-github-accent"
          theme="github"
        />
        <StatCard
          title="Correlation"
          value={stats.correlationCoeff}
          icon={<Activity className="w-6 h-6" />}
          color="text-cosmic-nebula"
          theme="cosmic"
        />
        </div>
      </section>

      {/* Main Charts Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* GitHub Activity Chart */}
        <div id="github" className="glass-github rounded-2xl p-6 lg:p-8 hover-lift scroll-mt-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-github-accent/20 rounded-lg">
                <GitCommit className="w-6 h-6 text-github-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-github-text">GitHub Activity</h3>
                <p className="text-github-muted text-sm">Development trends over time</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-github-muted">
              <GitBranch className="w-4 h-4" />
              <span className="text-xs">Live Data</span>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={githubData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(88, 166, 255, 0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(240, 246, 252, 0.7)"
                  tick={{ fontSize: 11, fill: 'rgba(240, 246, 252, 0.7)' }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="rgba(240, 246, 252, 0.7)" tick={{ fontSize: 11, fill: 'rgba(240, 246, 252, 0.7)' }} />
                <Tooltip content={<CustomTooltip theme="github" />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="commits" 
                  stroke="#3fb950" 
                  strokeWidth={3} 
                  name="Commits"
                  dot={{ fill: '#3fb950', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3fb950', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pullRequests" 
                  stroke="#58a6ff" 
                  strokeWidth={2} 
                  name="Pull Requests"
                  dot={{ fill: '#58a6ff', strokeWidth: 2, r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="issues" 
                  stroke="#d29922" 
                  strokeWidth={2} 
                  name="Issues"
                  dot={{ fill: '#d29922', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Solar Activity Chart */}
        <div id="solar" className="glass-solar rounded-2xl p-6 lg:p-8 hover-lift scroll-mt-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-solar-flare/20 rounded-lg">
                <Sun className="w-6 h-6 text-solar-flare" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-github-text">Solar Activity</h3>
                <p className="text-github-muted text-sm">Cosmic energy measurements</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-github-muted">
              <Zap className="w-4 h-4" />
              <span className="text-xs">NOAA Data</span>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={solarData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 107, 53, 0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(240, 246, 252, 0.7)"
                  tick={{ fontSize: 11, fill: 'rgba(240, 246, 252, 0.7)' }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="rgba(240, 246, 252, 0.7)" tick={{ fontSize: 11, fill: 'rgba(240, 246, 252, 0.7)' }} />
                <Tooltip content={<CustomTooltip theme="solar" />} />
                <Legend />
                <Bar 
                  dataKey="solarFluxIndex" 
                  fill="url(#solarGradient)" 
                  name="Solar Flux Index"
                  radius={[2, 2, 0, 0]}
                />
                <Bar 
                  dataKey="sunspotNumber" 
                  fill="url(#sunspotGradient)" 
                  name="Sunspot Number"
                  radius={[2, 2, 0, 0]}
                />
                <defs>
                  <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffd23f" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#ff6b35" stopOpacity={0.7}/>
                  </linearGradient>
                  <linearGradient id="sunspotGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff8c42" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#ff6b35" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Correlation Analysis */}
      <section id="correlation" className="scroll-mt-20">
        <CorrelationChart data={mergedData} />
      </section>

      {/* Insights Panel */}
      <section className="glass-cosmic rounded-2xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-cosmic-nebula/20 rounded-lg">
            <Star className="w-6 h-6 text-cosmic-nebula" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-github-text">Cosmic Insights</h3>
            <p className="text-github-muted text-sm">AI-powered pattern recognition</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-github-warning" />
              <span className="text-github-warning text-sm font-medium">Theory</span>
            </div>
            <p className="text-github-muted text-sm">Solar storms may influence human circadian rhythms and cognitive performance</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-github-success" />
              <span className="text-github-success text-sm font-medium">Observation</span>
            </div>
            <p className="text-github-muted text-sm">Developers show {Math.abs(stats.correlationCoeff) > 0.3 ? 'notable' : 'minimal'} activity correlation with solar events</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-cosmic-nebula" />
              <span className="text-cosmic-nebula text-sm font-medium">Insight</span>
            </div>
            <p className="text-github-muted text-sm">Correlation coefficient: {stats.correlationCoeff} suggests {Math.abs(stats.correlationCoeff) > 0.5 ? 'strong' : 'weak'} relationship</p>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper functions
const calculateCorrelation = (commits, solarActivity) => {
  // Simple correlation calculation with some randomness for demo
  return (Math.random() - 0.5) * 2;
};

const calculateOverallCorrelation = (data) => {
  if (data.length === 0) return 0;
  
  const commits = data.map(d => d.commits);
  const solar = data.map(d => d.solarFluxIndex || 0);
  
  const n = commits.length;
  const sumX = commits.reduce((a, b) => a + b, 0);
  const sumY = solar.reduce((a, b) => a + b, 0);
  const sumXY = commits.reduce((sum, x, i) => sum + x * solar[i], 0);
  const sumX2 = commits.reduce((sum, x) => sum + x * x, 0);
  const sumY2 = solar.reduce((sum, y) => sum + y * y, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  return denominator === 0 ? 0 : numerator / denominator;
};

export default Dashboard;