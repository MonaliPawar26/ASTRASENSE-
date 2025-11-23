import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Legend 
} from 'recharts';
import { AlertTriangle, Droplets, Thermometer, Wind, RefreshCw } from 'lucide-react';
import { MOCK_SENSOR_HISTORY, MOCK_REGIONS } from '../constants';
import { Alert, RiskLevel } from '../types';

const Dashboard: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedRegion, setSelectedRegion] = useState(MOCK_REGIONS[0]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate fetching live alerts
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'Drought',
        severity: RiskLevel.HIGH,
        location: 'Vidarbha Zone A',
        timestamp: '10:45 AM',
        message: 'LST exceeding 42°C for 5 consecutive days. Vegetation stress detected.'
      },
      {
        id: '2',
        type: 'Flood',
        severity: RiskLevel.MODERATE,
        location: 'Kuttanad Wetlands',
        timestamp: '09:30 AM',
        message: 'Water levels rising. NDWI index +15% above seasonal average.'
      }
    ];
    setAlerts(mockAlerts);
  }, []);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Live Hazard Monitor</h1>
            <p className="text-slate-400">Real-time satellite telemetry ingestion</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
             <select 
              className="bg-slate-800 border border-slate-700 text-white rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              value={selectedRegion.id}
              onChange={(e) => {
                const r = MOCK_REGIONS.find(reg => reg.id === e.target.value);
                if (r) setSelectedRegion(r);
              }}
            >
              {MOCK_REGIONS.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
            <button 
              onClick={refreshData}
              className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>

        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Thermometer size={64} />
            </div>
            <p className="text-sm font-medium text-slate-400">Avg LST (Temp)</p>
            <p className="mt-2 text-3xl font-bold text-orange-400">42.5°C</p>
            <p className="text-xs text-orange-300/70 mt-1">↑ 2.3°C vs avg</p>
          </div>

          <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wind size={64} />
            </div>
            <p className="text-sm font-medium text-slate-400">NDVI (Vegetation)</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">0.45</p>
            <p className="text-xs text-red-400 mt-1">↓ Stress Detected</p>
          </div>

          <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
              <Droplets size={64} />
            </div>
            <p className="text-sm font-medium text-slate-400">NDWI (Water)</p>
            <p className="mt-2 text-3xl font-bold text-cyan-400">-0.12</p>
            <p className="text-xs text-slate-400 mt-1">Normal Range</p>
          </div>

          <div className="glass-panel rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <AlertTriangle size={64} />
            </div>
            <p className="text-sm font-medium text-slate-400">Active Alerts</p>
            <p className="mt-2 text-3xl font-bold text-red-500">{alerts.length}</p>
            <p className="text-xs text-slate-400 mt-1">Last 24 hours</p>
          </div>
        </div>

        {/* Charts & Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart */}
          <div className="lg:col-span-2 glass-panel rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Temporal Analysis (Today)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_SENSOR_HISTORY}>
                  <defs>
                    <linearGradient id="colorNdvi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorLst" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                    itemStyle={{ color: '#f1f5f9' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="ndvi" stroke="#10b981" fillOpacity={1} fill="url(#colorNdvi)" name="Vegetation Index (NDVI)" />
                  <Area type="monotone" dataKey="lst" stroke="#f97316" fillOpacity={1} fill="url(#colorLst)" name="Surface Temp (LST)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alert Feed */}
          <div className="glass-panel rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Real-Time Alerts</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-slate-800/50 rounded-lg p-3 border-l-4 border-red-500">
                  <div className="flex justify-between items-start">
                    <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded font-bold uppercase">{alert.type}</span>
                    <span className="text-xs text-slate-500">{alert.timestamp}</span>
                  </div>
                  <h4 className="font-medium text-white mt-1">{alert.location}</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-snug">{alert.message}</p>
                </div>
              ))}
              <div className="bg-slate-800/50 rounded-lg p-3 border-l-4 border-yellow-500">
                 <div className="flex justify-between items-start">
                    <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded font-bold uppercase">System</span>
                    <span className="text-xs text-slate-500">08:00 AM</span>
                  </div>
                  <h4 className="font-medium text-white mt-1">Satellite Data Synced</h4>
                  <p className="text-sm text-slate-400 mt-1 leading-snug">MODIS and Sentinel-2 data ingestion complete for all sectors.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simulated Map View */}
        <div className="glass-panel rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Geospatial Visualization</h3>
          <div className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden group">
            <img 
              src={selectedRegion.imageUrl} 
              alt="Satellite View" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            
            {/* Overlay Elements */}
            <div className="absolute bottom-4 left-4 p-4 bg-black/60 backdrop-blur rounded border border-white/10">
              <h4 className="text-white font-bold">{selectedRegion.name}</h4>
              <p className="text-xs text-slate-300">{selectedRegion.coordinates}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${selectedRegion.currentRisk === RiskLevel.CRITICAL ? 'bg-red-500 animate-ping' : 'bg-green-500'}`}></div>
                <span className="text-sm font-medium text-white">Risk Level: {selectedRegion.currentRisk}</span>
              </div>
            </div>

            {/* Simulated Heatmap Overlay - CSS Gradient */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-500/20 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;