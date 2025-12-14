import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Activity, Zap, TrendingUp, Brain } from 'lucide-react';

const CorrelationChart = ({ data }) => {
  // Prepare scatter plot data
  const scatterData = data.map(item => ({
    commits: item.commits,
    solarFlux: item.solarFluxIndex || 0,
    date: item.date,
    pullRequests: item.pullRequests || 0,
    issues: item.issues || 0
  }));

  // Calculate correlation strength
  const correlation = calculateCorrelation(scatterData);
  const correlationStrength = Math.abs(correlation);
  const correlationLabel = correlationStrength > 0.7 ? 'Strong' : 
                          correlationStrength > 0.4 ? 'Moderate' : 
                          correlationStrength > 0.2 ? 'Weak' : 'Minimal';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-cosmic rounded-lg p-4 border border-cosmic-nebula/30 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-cosmic-nebula" />
            <p className="text-github-text font-medium">
              {new Date(data.date).toLocaleDateString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="space-y-1 text-sm">
            <p className="text-github-success">Commits: {data.commits.toLocaleString()}</p>
            <p className="text-solar-corona">Solar Flux: {data.solarFlux}</p>
            <p className="text-github-accent">PRs: {data.pullRequests}</p>
            <p className="text-github-warning">Issues: {data.issues}</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-cosmic rounded-2xl p-6 lg:p-8 hover-lift">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div className="flex items-center gap-3 mb-4 lg:mb-0">
          <div className="p-2 bg-cosmic-nebula/20 rounded-lg">
            <Activity className="w-6 h-6 text-cosmic-nebula" />
          </div>
          <div>
            <h3 className="text-xl lg:text-2xl font-semibold text-github-text">
              Correlation Analysis
            </h3>
            <p className="text-github-muted text-sm">GitHub Commits vs Solar Activity</p>
          </div>
        </div>
        
        {/* Correlation Indicator */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-cosmic-nebula">{correlation.toFixed(3)}</div>
            <div className="text-xs text-github-muted uppercase tracking-wide">Correlation</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-github-text">{correlationLabel}</div>
            <div className="text-xs text-github-muted uppercase tracking-wide">Strength</div>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
        <p className="text-github-muted text-sm leading-relaxed">
          This scatter plot explores whether solar flares and cosmic events influence developer productivity. 
          Each point represents a day's activity, plotting GitHub commits against solar flux index. 
          <span className="text-cosmic-nebula font-medium"> Look for patterns and clusters!</span>
        </p>
      </div>

      {/* Chart */}
      <div className="h-96 lg:h-[500px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={scatterData} margin={{ top: 20, right: 30, bottom: 60, left: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.1)" />
            <XAxis 
              type="number" 
              dataKey="solarFlux" 
              name="Solar Flux Index"
              stroke="rgba(240, 246, 252, 0.7)"
              tick={{ fontSize: 11, fill: 'rgba(240, 246, 252, 0.7)' }}
              label={{ 
                value: 'Solar Flux Index', 
                position: 'insideBottom', 
                offset: -40, 
                style: { textAnchor: 'middle', fill: 'rgba(240, 246, 252, 0.7)', fontSize: '12px' } 
              }}
            />
            <YAxis 
              type="number" 
              dataKey="commits" 
              name="GitHub Commits"
              stroke="rgba(240, 246, 252, 0.7)"
              tick={{ fontSize: 11, fill: 'rgba(240, 246, 252, 0.7)' }}
              label={{ 
                value: 'GitHub Commits', 
                angle: -90, 
                position: 'insideLeft', 
                style: { textAnchor: 'middle', fill: 'rgba(240, 246, 252, 0.7)', fontSize: '12px' } 
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              dataKey="commits" 
              fill="url(#scatterGradient)"
              fillOpacity={0.8}
              stroke="#8b5cf6"
              strokeWidth={1}
              r={6}
            />
            
            {/* Trend line */}
            {correlationStrength > 0.2 && (
              <ReferenceLine 
                segment={[
                  { x: Math.min(...scatterData.map(d => d.solarFlux)), y: Math.min(...scatterData.map(d => d.commits)) },
                  { x: Math.max(...scatterData.map(d => d.solarFlux)), y: Math.max(...scatterData.map(d => d.commits)) }
                ]}
                stroke="rgba(139, 92, 246, 0.5)"
                strokeDasharray="8 4"
                strokeWidth={2}
              />
            )}
            
            <defs>
              <radialGradient id="scatterGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity={1}/>
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.6}/>
              </radialGradient>
            </defs>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-github-accent/10 to-github-accent/5 rounded-xl p-4 border border-github-accent/20">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="w-5 h-5 text-github-accent" />
            <span className="text-github-accent text-sm font-semibold uppercase tracking-wide">Theory</span>
          </div>
          <p className="text-github-muted text-sm leading-relaxed">
            Solar electromagnetic activity may influence human circadian rhythms, potentially affecting cognitive performance and coding productivity.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-solar-flare/10 to-solar-flare/5 rounded-xl p-4 border border-solar-flare/20">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-solar-flare" />
            <span className="text-solar-flare text-sm font-semibold uppercase tracking-wide">Observation</span>
          </div>
          <p className="text-github-muted text-sm leading-relaxed">
            Current data shows a <strong className="text-github-text">{correlationLabel.toLowerCase()}</strong> correlation 
            ({correlation > 0 ? 'positive' : 'negative'}) between solar activity and developer contributions.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-cosmic-nebula/10 to-cosmic-nebula/5 rounded-xl p-4 border border-cosmic-nebula/20">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-cosmic-nebula" />
            <span className="text-cosmic-nebula text-sm font-semibold uppercase tracking-wide">Insight</span>
          </div>
          <p className="text-github-muted text-sm leading-relaxed">
            While correlation doesn't imply causation, the patterns suggest interesting relationships worth exploring further in cosmic coding research.
          </p>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate correlation coefficient
const calculateCorrelation = (data) => {
  if (data.length === 0) return 0;
  
  const commits = data.map(d => d.commits);
  const solar = data.map(d => d.solarFlux);
  
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

export default CorrelationChart;