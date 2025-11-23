import React from 'react';
import { Satellite, ShieldAlert, Cpu, Database, ChevronRight, Activity, BarChart3, Globe } from 'lucide-react';
import { SATELLITE_SOURCES } from '../constants';

interface LandingProps {
  onGetStarted: () => void;
}

const Landing: React.FC<LandingProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-slate-900 text-white font-sans">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.900),theme(colors.slate.900))] opacity-50" />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8 flex justify-center">
               <span className="relative rounded-full px-3 py-1 text-sm leading-6 text-indigo-400 ring-1 ring-white/10 hover:ring-white/20">
                Team ShadowHack Presents
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-cyan-200">
              ASTRASENSE
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              AI-Powered Early Hazard & Environmental Risk Detection. 
              Transforming satellite imagery into real-time actionable intelligence for a climate-resilient future.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button
                onClick={onGetStarted}
                className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all flex items-center gap-2 group"
              >
                Launch Dashboard <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#features" className="text-sm font-semibold leading-6 text-white hover:text-indigo-300">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid (Slide 2 & 3) */}
      <div id="features" className="py-24 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-400">Proposed Solution</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              End-to-End Technical Pipeline
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              From raw satellite data to predictive alerts, our hybrid AI engine handles it all.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4">
              
              <div className="flex flex-col items-start p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition duration-300">
                <div className="rounded-lg bg-indigo-600/10 p-2 ring-1 ring-indigo-500/20 mb-4">
                  <Satellite className="h-6 w-6 text-indigo-400" />
                </div>
                <dt className="text-lg font-semibold leading-7 text-white">Data Acquisition</dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-400">
                  <p className="flex-auto">Automated ingestion from MODIS, Sentinel, and Landsat. Cloud masking and geo-alignment included.</p>
                </dd>
              </div>

              <div className="flex flex-col items-start p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition duration-300">
                <div className="rounded-lg bg-indigo-600/10 p-2 ring-1 ring-indigo-500/20 mb-4">
                  <Cpu className="h-6 w-6 text-indigo-400" />
                </div>
                <dt className="text-lg font-semibold leading-7 text-white">Hybrid AI Engine</dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-400">
                  <p className="flex-auto">CNN for spatial patterns, LSTM for time-series trends, and Autoencoders for anomaly detection.</p>
                </dd>
              </div>

               <div className="flex flex-col items-start p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition duration-300">
                <div className="rounded-lg bg-indigo-600/10 p-2 ring-1 ring-indigo-500/20 mb-4">
                  <ShieldAlert className="h-6 w-6 text-indigo-400" />
                </div>
                <dt className="text-lg font-semibold leading-7 text-white">Predictive Alerts</dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-400">
                  <p className="flex-auto">Early warnings for drought, floods, vegetation stress, and land degradation.</p>
                </dd>
              </div>

              <div className="flex flex-col items-start p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition duration-300">
                <div className="rounded-lg bg-indigo-600/10 p-2 ring-1 ring-indigo-500/20 mb-4">
                  <Database className="h-6 w-6 text-indigo-400" />
                </div>
                <dt className="text-lg font-semibold leading-7 text-white">Scalable Cloud</dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-slate-400">
                  <p className="flex-auto">Deployed on AWS/GCP with Docker and FastAPI. Edge caching for fast dashboard access.</p>
                </dd>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Impact Section (Slide 6) */}
      <div className="py-24">
         <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Value Proposition & Impact</h2>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Activity className="h-6 w-6 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300">Early detection of environmental hazards reducing crop loss.</span>
                  </li>
                   <li className="flex gap-3">
                    <Globe className="h-6 w-6 text-blue-400 flex-shrink-0" />
                    <span className="text-slate-300">Supports government disaster response & planning.</span>
                  </li>
                   <li className="flex gap-3">
                    <BarChart3 className="h-6 w-6 text-orange-400 flex-shrink-0" />
                    <span className="text-slate-300">Improves climate resilience in vulnerable regions.</span>
                  </li>
                   <li className="flex gap-3">
                    <ShieldAlert className="h-6 w-6 text-red-400 flex-shrink-0" />
                    <span className="text-slate-300">Saves lives and minimizes economic damage through timely action.</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                 <div className="absolute inset-0 bg-indigo-500 blur-[100px] opacity-20 rounded-full"></div>
                 <div className="relative bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-4">Data Sources</h3>
                    <div className="flex flex-wrap gap-2">
                      {SATELLITE_SOURCES.map((source, i) => (
                        <span key={i} className="inline-flex items-center rounded-md bg-slate-700/50 px-2 py-1 text-xs font-medium text-indigo-300 ring-1 ring-inset ring-indigo-700/10">
                          {source}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-700">
                       <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
                       <p className="text-sm text-slate-400">Multi-satellite fusion to solve cloud cover issues using our unique CNN + Autoencoder architecture.</p>
                    </div>
                 </div>
              </div>
            </div>
         </div>
      </div>

    </div>
  );
};

export default Landing;