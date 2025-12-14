import { format, subDays } from 'date-fns';

// Generate realistic demo data with interesting patterns
export const generateEnhancedDemoData = () => {
  const githubData = [];
  const solarData = [];
  const today = new Date();
  
  // Create some interesting patterns
  const solarEvents = [5, 12, 18, 25]; // Days with high solar activity
  const weekendEffect = [0, 6]; // Sunday and Saturday (lower activity)
  
  for (let i = 29; i >= 0; i--) {
    const date = subDays(today, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayOfWeek = date.getDay();
    
    // Base activity levels
    let baseCommits = 80;
    let baseSolarFlux = 70;
    
    // Weekend effect (lower GitHub activity)
    if (weekendEffect.includes(dayOfWeek)) {
      baseCommits *= 0.4;
    }
    
    // Solar event effect
    const isSolarEvent = solarEvents.includes(i);
    if (isSolarEvent) {
      baseSolarFlux *= 2.5;
      baseCommits *= 1.3; // Slight increase in commits during solar events
    }
    
    // Add realistic variation
    const commits = Math.floor(baseCommits + (Math.random() - 0.5) * 40);
    const solarFlux = Math.floor(baseSolarFlux + (Math.random() - 0.5) * 30);
    
    githubData.push({
      date: dateStr,
      commits: Math.max(10, commits),
      pullRequests: Math.floor(commits * 0.25) + Math.floor(Math.random() * 8),
      issues: Math.floor(commits * 0.15) + Math.floor(Math.random() * 5)
    });
    
    solarData.push({
      date: dateStr,
      solarFluxIndex: Math.max(20, solarFlux),
      sunspotNumber: Math.floor(solarFlux * 1.5) + Math.floor(Math.random() * 20),
      geomagneticActivity: isSolarEvent ? Math.floor(Math.random() * 3) + 7 : Math.floor(Math.random() * 5) + 1
    });
  }
  
  return { githubData, solarData };
};

// Generate correlation insights
export const generateInsights = (githubData, solarData) => {
  const insights = [];
  
  // Find peak activity days
  const maxCommitDay = githubData.reduce((max, day) => 
    day.commits > max.commits ? day : max, githubData[0]
  );
  
  const maxSolarDay = solarData.reduce((max, day) => 
    day.solarFluxIndex > max.solarFluxIndex ? day : max, solarData[0]
  );
  
  if (maxCommitDay.date === maxSolarDay.date) {
    insights.push({
      type: 'correlation',
      title: 'Peak Activity Alignment!',
      description: `Both GitHub commits and solar activity peaked on ${new Date(maxCommitDay.date).toLocaleDateString()}`,
      confidence: 'high'
    });
  }
  
  // Weekend patterns
  const weekendCommits = githubData.filter(day => {
    const dayOfWeek = new Date(day.date).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  });
  
  const avgWeekendCommits = weekendCommits.reduce((sum, day) => sum + day.commits, 0) / weekendCommits.length;
  const avgWeekdayCommits = githubData.filter(day => {
    const dayOfWeek = new Date(day.date).getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 6;
  }).reduce((sum, day) => sum + day.commits, 0) / (githubData.length - weekendCommits.length);
  
  if (avgWeekdayCommits > avgWeekendCommits * 1.5) {
    insights.push({
      type: 'pattern',
      title: 'Weekend Effect Detected',
      description: `Developers are ${Math.round((avgWeekdayCommits / avgWeekendCommits - 1) * 100)}% more active on weekdays`,
      confidence: 'high'
    });
  }
  
  return insights;
};