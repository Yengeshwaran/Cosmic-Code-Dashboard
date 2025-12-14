import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Zap, Users, GitCommit, TrendingUp, TrendingDown, AlertTriangle, Wifi } from 'lucide-react';
import { realtimeService, formatTimestamp, getTimeAgo } from '../services/realtimeService';

const LiveMetricCard = ({ title, value, trend, icon, color, unit = '' }) => {
  const TrendIcon = trend > 0 ? TrendingUp : TrendingDown;
  const trendColor = trend > 0 ? 'text-green-400' : trend < 0 ? 'text-red-400' : 'text-gray-400';

  return (
    <div className="glass-github rounded-xl p-6 hover-lift">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${color} bg-opacity-20`}>
          {icon}
        </div>
        <div className="flex items-center gap-1 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-github-muted">LIVE</span>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-github-muted text-sm font-medium uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-github-text">
            {value.toLocaleString()}{unit}
          </span>
          {trend !== 0 && (
            <div className={`flex items-center gap-1 ${trendColor} text-sm`}>
              <TrendIcon className="w-4 h-4" />
              <span>{Math.abs(trend).toFixed(1)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LiveChart = ({ data, title, dataKey, color, height = 200 }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-github rounded-lg p-3 border border-github-border/30">
          <p className="text-github-text font-medium">
            {formatTimestamp(new Date(label))}
          </p>
          <p style={{ color }}>
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-github rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-github-text">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-github-muted">
          <Wifi className="w-4 h-4" />
          <span>Real-time</span>
        </div>
      </div>
      
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(88, 166, 255, 0.1)" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(value) => formatTimestamp(new Date(value))}
              stroke="rgba(240, 246, 252, 0.7)"
              tick={{ fontSize: 11 }}
            />
            <YAxis stroke="rgba(240, 246, 252, 0.7)" tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fill={color}
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const SpaceWeatherAlert = ({ status }) => {
  const getAlertStyle = () => {
    switch (status.level) {
      case 'high':
        return 'border-red-400/30 bg-red-400/10';
      case 'moderate':
        return 'border-yellow-400/30 bg-yellow-400/10';
      default:
        return 'border-green-400/30 bg-green-400/10';
    }
  };

  const getIcon = () => {
    switch (status.level) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'moderate':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      default:
        return <Activity className="w-5 h-5 text-green-400" />;
    }
  };

  return (
    <div className={`glass-effect rounded-xl p-4 border ${getAlertStyle()}`}>
      <div className="flex items-center gap-3">
        {getIcon()}
        <div>
          <h4 className="font-medium text-github-text">Space Weather Status</h4>
          <p className={`text-sm ${status.color}`}>{status.message}</p>
        </div>
      </div>
    </div>
  );
};

const RealtimeDashboard = () => {
  const [realtimeData, setRealtimeData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const unsubscribe = realtimeService.subscribe((data) => {
      setRealtimeData(data);
      setLastUpdate(new Date());
    });

    return unsubscribe;
  }, []);

  if (!realtimeData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="glass-github rounded-lg p-6 text-center">
          <Activity className="w-8 h-8 text-github-accent mx-auto mb-2 animate-spin" />
          <p className="text-github-muted">Connecting to real-time data...</p>
        </div>
      </div>
    );
  }

  const { current, historical, trends } = realtimeData;
  const spaceWeatherStatus = realtimeService.getSpaceWeatherStatus();

  // Prepare chart data (last 12 hours)
  const chartData = historical.slice(-12).map(item => ({
    timestamp: item.timestamp,
    commits: item.commits,
    developers: item.developers,
    solarFlux: item.solarFlux,
    geomagnetic: item.geomagnetic
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-github-text mb-2">Real-time Cosmic Activity</h2>
          <p className="text-github-muted">
            Last updated: {getTimeAgo(lastUpdate)} • Live data streaming
          </p>
        </div>
        <SpaceWeatherAlert status={spaceWeatherStatus} />
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <LiveMetricCard
          title="Live Commits/Hour"
          value={current.liveCommits}
          trend={trends.commits}
          icon={<GitCommit className="w-6 h-6 text-github-success" />}
          color="bg-github-success"
        />
        <LiveMetricCard
          title="Active Developers"
          value={current.activeDevelopers}
          trend={0}
          icon={<Users className="w-6 h-6 text-github-accent" />}
          color="bg-github-accent"
        />
        <LiveMetricCard
          title="Solar Flux Index"
          value={current.solarFlux}
          trend={trends.solar}
          icon={<Zap className="w-6 h-6 text-solar-corona" />}
          color="bg-solar-corona"
        />
        <LiveMetricCard
          title="Geomagnetic Activity"
          value={current.geomagneticActivity}
          trend={0}
          icon={<Activity className="w-6 h-6 text-cosmic-nebula" />}
          color="bg-cosmic-nebula"
          unit="/9"
        />
      </div>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <LiveChart
          data={chartData}
          title="GitHub Activity Stream"
          dataKey="commits"
          color="#3fb950"
          height={300}
        />
        <LiveChart
          data={chartData}
          title="Solar Activity Monitor"
          dataKey="solarFlux"
          color="#ffd23f"
          height={300}
        />
      </div>

      {/* Correlation Indicator */}
      <div className="glass-cosmic rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-github-text">Live Correlation Analysis</h3>
          <div className="text-sm text-github-muted">
            Updated every 5 seconds
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-cosmic-nebula mb-2">
              {trends.correlation.toFixed(3)}
            </div>
            <div className="text-github-muted text-sm">Correlation Coefficient</div>
          </div>
          
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${trends.commits > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {trends.commits > 0 ? '+' : ''}{trends.commits.toFixed(1)}%
            </div>
            <div className="text-github-muted text-sm">Commits Trend (6h)</div>
          </div>
          
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${trends.solar > 0 ? 'text-yellow-400' : 'text-blue-400'}`}>
              {trends.solar > 0 ? '+' : ''}{trends.solar.toFixed(1)}%
            </div>
            <div className="text-github-muted text-sm">Solar Trend (6h)</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/5 rounded-lg">
          <p className="text-github-muted text-sm text-center">
            {Math.abs(trends.correlation) > 0.3 
              ? `Strong ${trends.correlation > 0 ? 'positive' : 'negative'} correlation detected between solar activity and coding patterns!`
              : 'Monitoring for correlation patterns in real-time data streams...'
            }
          </p>
        </div>
      </div>

      {/* Data Stream Info */}
      <div className="glass-effect rounded-xl p-4">
        <div className="flex items-center justify-center gap-4 text-sm text-github-muted">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>GitHub API Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>NOAA Space Weather Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Correlation Engine Running</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealtimeDashboard;