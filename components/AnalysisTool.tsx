import React, { useState, useRef, useEffect } from 'react';
import { analyzeSatelliteImage, chatWithAstrasense } from '../services/geminiService';
import { MOCK_REGIONS } from '../constants';
import { Brain, MessageSquare, Send, Loader2, FileUp, X, CheckCircle, ImageIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AnalysisTool: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState(MOCK_REGIONS[0].id);
  const [report, setReport] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // File upload state
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'model', text: string}[]>([]);
  const [isChatting, setIsChatting] = useState(false);

  // Cleanup preview URL on unmount or change
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setImageError(false);
      
      // Attempt to create preview for image types
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const clearFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setImageError(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(5);
    setReport('');
    const region = MOCK_REGIONS.find(r => r.id === selectedRegionId) || MOCK_REGIONS[0];
    
    // Simulate some variable parameters for the prompt to make it dynamic
    const randomNDVI = (Math.random() * 0.5 + 0.1).toFixed(2);
    const randomLST = (Math.random() * 20 + 25).toFixed(1);

    // If file is uploaded, we include that context in the region name passed to the service
    const analysisRegionName = uploadedFile 
      ? `${region.name} (Source: ${uploadedFile.name})`
      : region.name;

    // Progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return 90;
        return prev + Math.random() * 10;
      });
    }, 400);

    try {
      // Simulate heavier processing time for file analysis
      if (uploadedFile) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      const result = await analyzeSatelliteImage(
        analysisRegionName, 
        parseFloat(randomNDVI), 
        parseFloat(randomLST), 
        region.coordinates
      );
      
      setReport(result);
      setProgress(100);
    } catch (e) {
      console.error(e);
    } finally {
      clearInterval(interval);
      setTimeout(() => setIsAnalyzing(false), 800);
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatting(true);

    const historyStrings = chatHistory.map(h => h.text);
    const response = await chatWithAstrasense(historyStrings, userMsg);
    
    setChatHistory(prev => [...prev, { role: 'model', text: response }]);
    setIsChatting(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-slate-100">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Col: Analysis Control */}
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Brain className="text-indigo-400" />
              Hybrid AI Engine Analysis
            </h2>
            <p className="text-slate-400 mb-6 text-sm">
              Deploy the CNN + LSTM + Autoencoder pipeline to detect anomalies in selected regions.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Region</label>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:ring-2 focus:ring-indigo-500"
                  value={selectedRegionId}
                  onChange={(e) => setSelectedRegionId(e.target.value)}
                >
                   {MOCK_REGIONS.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              {/* File Upload Area */}
              <div 
                onClick={() => !uploadedFile && fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg text-center transition-all group relative overflow-hidden ${
                  uploadedFile 
                    ? 'border-indigo-500 bg-slate-800/50 p-4' 
                    : 'border-slate-700 bg-slate-800/30 hover:border-indigo-500/50 hover:bg-slate-800/50 cursor-pointer p-8'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".tif,.tiff,.hdf,.nc,.jpg,.png"
                />
                
                {uploadedFile ? (
                  <div className="relative animate-in fade-in zoom-in duration-300 flex flex-col items-center">
                     <button 
                       onClick={clearFile}
                       className="absolute top-0 right-0 p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-full transition-colors z-10"
                     >
                       <X size={16} />
                     </button>

                     {previewUrl && !imageError ? (
                        <div className="relative w-full h-48 mb-3 bg-black/20 rounded-lg overflow-hidden border border-slate-700">
                          <img 
                            src={previewUrl} 
                            alt="Satellite Imagery Preview" 
                            className="w-full h-full object-contain"
                            onError={() => setImageError(true)}
                          />
                        </div>
                     ) : (
                       <div className="h-16 w-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-3">
                         <ImageIcon className="h-8 w-8 text-indigo-400" />
                       </div>
                     )}

                     <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        <p className="text-sm font-medium text-white truncate max-w-[200px]">{uploadedFile.name}</p>
                     </div>
                     <p className="text-xs text-slate-400">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                     <p className="text-xs text-indigo-300 mt-2">Ready for AI processing</p>
                  </div>
                ) : (
                  <>
                    <FileUp className="mx-auto h-10 w-10 text-slate-500 mb-2 group-hover:text-indigo-400 transition-colors" />
                    <p className="text-sm text-slate-400 font-medium">Upload custom satellite imagery</p>
                    <p className="text-xs text-slate-500 mt-1 mb-3">Supported: GeoTIFF, HDF, JPG, PNG</p>
                    <span className="text-xs bg-slate-700 group-hover:bg-slate-600 px-3 py-1 rounded text-white transition-colors">
                      Browse Files
                    </span>
                  </>
                )}
              </div>

              <button 
                onClick={handleAnalysis}
                disabled={isAnalyzing}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-bold py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex justify-center items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Processing...
                  </>
                ) : (
                  'Generate Risk Report'
                )}
              </button>

              {/* Progress Bar Section */}
              {isAnalyzing && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span className="font-medium text-indigo-300">
                      {progress < 30 ? 'Ingesting Satellite Data...' : 
                       progress < 60 ? 'Running CNN Feature Extraction...' : 
                       progress < 85 ? 'Calculating Risk Indices...' : 'Generating Report...'}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Report Output */}
          {report && (
            <div className="glass-panel rounded-xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-500 border-l-4 border-emerald-500">
              <h3 className="text-lg font-bold text-emerald-400 mb-4">Analysis Report</h3>
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{report}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Chat Assistant */}
        <div className="glass-panel rounded-xl p-6 flex flex-col h-[600px]">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-700">
            <MessageSquare className="text-indigo-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Ask ASTRASENSE</h2>
              <p className="text-xs text-slate-400">Powered by Gemini 2.5 Flash</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
            {chatHistory.length === 0 && (
              <div className="text-center text-slate-500 mt-20">
                <p>Hello! I am your environmental risk assistant.</p>
                <p className="text-sm mt-2">Ask me about flood risks in Kerala or drought patterns in Vidarbha.</p>
              </div>
            )}
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-slate-700 text-slate-200 rounded-bl-none'
                }`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
             {isChatting && (
              <div className="flex justify-start">
                <div className="bg-slate-700 text-slate-200 rounded-lg rounded-bl-none p-3 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleChatSubmit} className="relative">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about risk predictions..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-4 pr-12 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <button 
              type="submit" 
              disabled={!chatInput.trim() || isChatting}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-400 hover:text-white disabled:text-slate-600 transition"
            >
              <Send size={20} />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AnalysisTool;