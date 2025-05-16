
# Campus Network Monitor

![Campus Network Monitor Screenshot](https://i.imgur.com/example-screenshot.jpg)

A real-time dashboard for monitoring campus-wide network infrastructure, designed to improve response time to connectivity issues.

## 🌟 Features

- **Real-Time Network Status** - Instantly view the health of your entire campus network
- **Interactive Campus Map** - Visualize network status across buildings
- **Device Management** - Track all network devices with filterable listings
- **Alert System** - Stay informed of critical issues with priority notifications
- **Performance Analytics** - Monitor response times with historical data visualization

## 🚀 Tech Stack

- **React** - Frontend library for building user interfaces
- **TypeScript** - Static type checking for improved development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Recharts** - Composable chart library built with React components

## 📋 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AlertsPanel.tsx  # Displays network alerts
│   ├── CampusMap.tsx    # Interactive map of campus
│   ├── NetworkDeviceList.tsx  # List of network devices
│   ├── NetworkStatusOverview.tsx  # Summary of network status
│   ├── ResponseTimeChart.tsx  # Response time visualization
│   └── ui/              # UI component library
├── lib/                 # Utilities and helpers
│   ├── mockData.ts      # Mock data for development
│   ├── types.ts         # TypeScript type definitions
│   └── utils.ts         # Utility functions
└── pages/               # Application pages
    └── Index.tsx        # Main dashboard page
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/campus-network-monitor.git
   cd campus-network-monitor
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Navigate to `http://localhost:5173` to see the application

## 📊 Data Structure

The application uses the following data structures:

- **NetworkDevice** - Represents network hardware like routers and switches
- **Building** - Represents campus buildings containing network devices
- **Alert** - Represents network issues that require attention
- **ResponseTimeData** - Historical response time metrics for performance analysis

## 🔄 Deployment

Build the project for production:

```bash
npm run build
# or
yarn build
```

Deploy the contents of the `dist` directory to your web server or hosting provider of choice.

## 📝 License

[MIT](LICENSE)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

If you have any questions, please open an issue in the repository.
