# 🌌 Cosmic Code Dashboard

An interactive serverless dashboard that explores the fascinating correlation between GitHub repository activity and solar activity. This creative project mashes up two completely unrelated data sources to discover if cosmic events influence developer productivity!

🌌 Try Demo(https://yengeshwaran.github.io/Cosmic-Code-Dashboard/)

## 🚀 Features

- **Real-time Data Integration**: Fetches live data from GitHub API and NOAA Space Weather services
- **Interactive Visualizations**: Beautiful charts showing GitHub commits, pull requests, issues, and solar activity
- **Correlation Analysis**: Scatter plots and statistical analysis to explore potential relationships
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Glass Morphism UI**: Modern, attractive interface with cosmic theme
- **Zero Cost**: Uses only free APIs and can be deployed on free hosting platforms

## 🛠 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom cosmic theme
- **Charts**: Recharts for interactive data visualizations
- **Data Sources**: 
  - GitHub API (public repository statistics)
  - NOAA Space Weather API (solar activity data)
- **Deployment**: Can be deployed on Vercel, Netlify, or GitHub Pages (all free)

## 📊 Data Sources

### GitHub Activity
- Repository commit statistics from popular open-source projects
- Pull request and issue tracking
- Aggregated activity metrics across multiple repositories

### Solar Activity
- Solar flux index from NOAA
- Sunspot numbers
- Geomagnetic activity levels (Kp index)

## 🎯 The Hypothesis

This dashboard explores the intriguing question: **Do solar flares and cosmic events influence developer productivity?**

While correlation doesn't imply causation, some theories suggest:
- Solar storms might affect human circadian rhythms
- Electromagnetic activity could influence mood and focus
- Developers might be more active during interesting cosmic events

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cosmic-code-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🌐 Deployment Options (All Free!)

### Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Netlify
1. Drag and drop the `dist` folder to Netlify
2. Or connect GitHub repository for continuous deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages

## 🎨 Customization

- **Add more repositories**: Edit `src/services/dataService.js` to include more GitHub repositories
- **Different time ranges**: Modify the date range in data fetching functions
- **New visualizations**: Add more chart types in the Dashboard component
- **Styling**: Customize the cosmic theme in `tailwind.config.js`

## 📈 Future Enhancements

- Add more data sources (cryptocurrency prices, weather data, etc.)
- Implement machine learning for better correlation analysis
- Add user authentication to track personal GitHub activity
- Include more space weather metrics
- Add export functionality for data and charts

## 🤝 Contributing

Feel free to contribute by:
- Adding new data sources
- Improving visualizations
- Enhancing the correlation analysis
- Fixing bugs or improving performance

## 📄 License

MIT License - feel free to use this project for learning, experimentation, or building your own cosmic dashboards!

---

*"In space, no one can hear you code... but they can see your commits!"* 🚀👨‍💻

## 🌐 Live Demo
Visit the live dashboard: [Cosmic Code Dashboard](https://yengeshwaran.github.io/Cosmic-Code-Dashboard/)
