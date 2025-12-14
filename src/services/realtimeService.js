import { format, subMinutes, subHours } from 'date-fns';

// Real-time data simulation service
class RealtimeDataService {
  constructor() {
    this.subscribers = new Set();
    this.isRunning = false;
    this.currentData = {
      liveCommits: 0,
      activeDevelopers: 0,
      solarFlux: 0,
      geomagneticActivity: 0,
      timestamp: new Date()
    };
    this.historicalData = [];
    this.initializeHistoricalData();
  }

  initializeHistoricalData() {
    // Generate last 24 hours of data
    for (let i = 23; i >= 0; i--) {
      const timestamp = subHours(new Date(), i);
      this.historicalData.push({
        timestamp,
        commits: Math.floor(Math.random() * 50) + 20,
        developers: Math.floor(Math.random() * 200) + 100,
        solarFlux: Math.floor(Math.random() * 100) + 50,
        geomagnetic: Math.floor(Math.random() * 9) + 1,
        pullRequests: Math.floor(Math.random() * 15) + 5,
        issues: Math.floor(Math.random() * 10) + 2
      });
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    
    // Send initial data
    callback({
      current: this.currentData,
      historical: this.historicalData,
      trends: this.calculateTrends()
    });

    // Start real-time updates if not already running
    if (!this.isRunning) {
      this.startRealTimeUpdates();
    }

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(callback);
      if (this.subscribers.size === 0) {
        this.stopRealTimeUpdates();
      }
    };
  }

  startRealTimeUpdates() {
    this.isRunning = true;
    
    // Update every 5 seconds
    this.updateInterval = setInterval(() => {
      this.updateCurrentData();
      this.notifySubscribers();
    }, 5000);

    // Add new historical data every minute
    this.historicalInterval = setInterval(() => {
      this.addHistoricalDataPoint();
      this.notifySubscribers();
    }, 60000);
  }

  stopRealTimeUpdates() {
    this.isRunning = false;
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    if (this.historicalInterval) {
      clearInterval(this.historicalInterval);
    }
  }

  updateCurrentData() {
    const now = new Date();
    const hour = now.getHours();
    
    // Simulate realistic patterns
    let baseCommits = 30;
    let baseDevelopers = 150;
    let baseSolarFlux = 70;
    
    // Working hours effect (higher activity during work hours)
    if (hour >= 9 && hour <= 17) {
      baseCommits *= 1.5;
      baseDevelopers *= 1.3;
    }
    
    // Weekend effect (lower activity on weekends)
    const dayOfWeek = now.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      baseCommits *= 0.6;
      baseDevelopers *= 0.7;
    }

    // Add some randomness and solar correlation
    const solarVariation = (Math.random() - 0.5) * 40;
    const solarFlux = Math.max(20, baseSolarFlux + solarVariation);
    
    // Slight correlation between solar activity and commits
    const solarInfluence = (solarFlux - 70) * 0.1;
    
    this.currentData = {
      liveCommits: Math.max(0, Math.floor(baseCommits + (Math.random() - 0.5) * 20 + solarInfluence)),
      activeDevelopers: Math.max(50, Math.floor(baseDevelopers + (Math.random() - 0.5) * 50)),
      solarFlux: Math.floor(solarFlux),
      geomagneticActivity: Math.floor(Math.random() * 9) + 1,
      timestamp: now
    };
  }

  addHistoricalDataPoint() {
    const now = new Date();
    const newDataPoint = {
      timestamp: now,
      commits: this.currentData.liveCommits,
      developers: this.currentData.activeDevelopers,
      solarFlux: this.currentData.solarFlux,
      geomagnetic: this.currentData.geomagneticActivity,
      pullRequests: Math.floor(this.currentData.liveCommits * 0.3),
      issues: Math.floor(this.currentData.liveCommits * 0.2)
    };

    this.historicalData.push(newDataPoint);
    
    // Keep only last 24 hours
    if (this.historicalData.length > 24 * 60) {
      this.historicalData.shift();
    }
  }

  calculateTrends() {
    if (this.historicalData.length < 2) return { commits: 0, solar: 0, correlation: 0 };

    const recent = this.historicalData.slice(-6); // Last 6 hours
    const previous = this.historicalData.slice(-12, -6); // Previous 6 hours

    const recentAvgCommits = recent.reduce((sum, d) => sum + d.commits, 0) / recent.length;
    const previousAvgCommits = previous.reduce((sum, d) => sum + d.commits, 0) / previous.length;
    
    const recentAvgSolar = recent.reduce((sum, d) => sum + d.solarFlux, 0) / recent.length;
    const previousAvgSolar = previous.reduce((sum, d) => sum + d.solarFlux, 0) / previous.length;

    const commitsTrend = ((recentAvgCommits - previousAvgCommits) / previousAvgCommits) * 100;
    const solarTrend = ((recentAvgSolar - previousAvgSolar) / previousAvgSolar) * 100;

    // Calculate simple correlation
    const correlation = this.calculateCorrelation(
      recent.map(d => d.commits),
      recent.map(d => d.solarFlux)
    );

    return {
      commits: Math.round(commitsTrend * 10) / 10,
      solar: Math.round(solarTrend * 10) / 10,
      correlation: Math.round(correlation * 1000) / 1000
    };
  }

  calculateCorrelation(x, y) {
    const n = x.length;
    if (n === 0) return 0;

    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return denominator === 0 ? 0 : numerator / denominator;
  }

  notifySubscribers() {
    const data = {
      current: this.currentData,
      historical: this.historicalData,
      trends: this.calculateTrends()
    };

    this.subscribers.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error('Error notifying subscriber:', error);
      }
    });
  }

  // Simulate solar events
  triggerSolarEvent() {
    this.currentData.solarFlux = Math.floor(Math.random() * 50) + 150;
    this.currentData.geomagneticActivity = Math.floor(Math.random() * 3) + 7;
    this.notifySubscribers();
  }

  // Get current space weather status
  getSpaceWeatherStatus() {
    const { solarFlux, geomagneticActivity } = this.currentData;
    
    if (solarFlux > 120 || geomagneticActivity > 6) {
      return { level: 'high', message: 'High solar activity detected!', color: 'text-red-400' };
    } else if (solarFlux > 90 || geomagneticActivity > 4) {
      return { level: 'moderate', message: 'Moderate solar activity', color: 'text-yellow-400' };
    } else {
      return { level: 'low', message: 'Quiet space weather', color: 'text-green-400' };
    }
  }
}

// Export singleton instance
export const realtimeService = new RealtimeDataService();

// Export additional utilities
export const formatTimestamp = (timestamp) => {
  return format(timestamp, 'HH:mm:ss');
};

export const getTimeAgo = (timestamp) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};