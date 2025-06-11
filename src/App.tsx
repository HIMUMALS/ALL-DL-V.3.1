import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Sun, 
  Moon, 
  Link, 
  FileText, 
  Image, 
  Video, 
  Music,
  Archive,
  Smartphone,
  Battery,
  Wifi,
  Signal,
  Clock,
  Activity,
  Zap
} from 'lucide-react';

interface DownloadItem {
  id: string;
  url: string;
  filename: string;
  type: 'image' | 'video' | 'document' | 'audio' | 'archive' | 'other';
  size?: string;
  progress: number;
  status: 'pending' | 'downloading' | 'completed' | 'error';
}

interface UltraMetrics {
  batteryLevel: number;
  signalStrength: number;
  wifiStrength: number;
  downloadSpeed: string;
  activeDownloads: number;
  totalDownloaded: string;
}

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [url, setUrl] = useState('');
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [ultraMetrics, setUltraMetrics] = useState<UltraMetrics>({
    batteryLevel: 87,
    signalStrength: 4,
    wifiStrength: 3,
    downloadSpeed: '0 MB/s',
    activeDownloads: 0,
    totalDownloaded: '0 MB'
  });

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUltraMetrics(prev => ({
        ...prev,
        batteryLevel: Math.max(0, prev.batteryLevel - Math.random() * 0.1),
        downloadSpeed: isDownloading ? `${(Math.random() * 10 + 1).toFixed(1)} MB/s` : '0 MB/s',
        signalStrength: Math.floor(Math.random() * 5),
        wifiStrength: Math.floor(Math.random() * 4) + 1
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isDownloading]);

  const getFileType = (url: string): DownloadItem['type'] => {
    const extension = url.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension || '')) return 'image';
    if (['mp4', 'avi', 'mov', 'wmv', 'flv'].includes(extension || '')) return 'video';
    if (['mp3', 'wav', 'flac', 'aac'].includes(extension || '')) return 'audio';
    if (['zip', 'rar', '7z', 'tar'].includes(extension || '')) return 'archive';
    if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension || '')) return 'document';
    return 'other';
  };

  const getFileIcon = (type: DownloadItem['type']) => {
    switch (type) {
      case 'image': return <Image className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'audio': return <Music className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'archive': return <Archive className="w-5 h-5" />;
      default: return <Link className="w-5 h-5" />;
    }
  };

  const handleDownload = async () => {
    if (!url.trim()) return;

    const newDownload: DownloadItem = {
      id: Date.now().toString(),
      url: url.trim(),
      filename: url.split('/').pop() || 'download',
      type: getFileType(url),
      progress: 0,
      status: 'pending'
    };

    setDownloads(prev => [newDownload, ...prev]);
    setIsDownloading(true);
    setUrl('');

    // Simulate download progress
    const downloadId = newDownload.id;
    let progress = 0;
    
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
        setDownloads(prev => prev.map(d => 
          d.id === downloadId ? { ...d, progress: 100, status: 'completed' } : d
        ));
        setIsDownloading(false);
        
        // Trigger actual download
        const link = document.createElement('a');
        link.href = newDownload.url;
        link.download = newDownload.filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        setDownloads(prev => prev.map(d => 
          d.id === downloadId ? { ...d, progress, status: 'downloading' } : d
        ));
      }
    }, 200);
  };

  const socialPlatforms = [
    {
      name: 'Facebook',
      image: 'https://i.ibb.co/3mhkdYnJ/FB-IMG-1749627956396.jpg',
      color: 'from-blue-600 to-blue-700'
    },
    {
      name: 'Instagram',
      image: 'https://i.ibb.co/GvnFjd7R/8010054795da9ceab6440d0fe99114ea.jpg',
      color: 'from-pink-500 to-purple-600'
    },
    {
      name: 'WhatsApp',
      image: 'https://i.ibb.co/7t6rdtFc/880-1332-754898-20250611-160521.jpg',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Gmail',
      image: 'https://i.ibb.co/JDF8Cyh/4f0bcd72e6f013e2332463b3052c1ef1.jpg',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'
    }`}>
      {/* Ultra Metrics Bar */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-3 backdrop-blur-xl border-b ${
          isDark 
            ? 'bg-gray-900/80 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            {/* Battery */}
            <div className="flex items-center space-x-2">
              <Battery className={`w-4 h-4 ${ultraMetrics.batteryLevel > 20 ? 'text-green-500' : 'text-red-500'}`} />
              <span className="text-sm font-medium">{Math.round(ultraMetrics.batteryLevel)}%</span>
            </div>
            
            {/* Signal Strength */}
            <div className="flex items-center space-x-2">
              <Signal className="w-4 h-4 text-blue-500" />
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-3 rounded-full ${
                      i < ultraMetrics.signalStrength ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* WiFi */}
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4 text-green-500" />
              <div className="flex space-x-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-3 rounded-full ${
                      i < ultraMetrics.wifiStrength ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Download Speed */}
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">{ultraMetrics.downloadSpeed}</span>
            </div>

            {/* Active Downloads */}
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">{ultraMetrics.activeDownloads} active</span>
            </div>

            {/* Time */}
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="pt-20 px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`p-4 rounded-2xl ${
                  isDark ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-blue-600 to-purple-600'
                } shadow-2xl`}
              >
                <Download className="w-8 h-8 text-white" />
              </motion.div>
              
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsDark(!isDark)}
                className={`ml-6 p-3 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-yellow-500 text-gray-900 shadow-yellow-500/25' 
                    : 'bg-gray-800 text-white shadow-gray-800/25'
                } shadow-lg hover:shadow-xl`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            </div>
            
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Universal File Downloader
            </h1>
            <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Download any file from any URL with lightning speed
            </p>
          </motion.div>

          {/* Social Platform Showcase */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className={`text-2xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              Supported Platforms
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {socialPlatforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`relative overflow-hidden rounded-2xl shadow-xl ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } group cursor-pointer`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <div className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-xl overflow-hidden shadow-lg">
                      <img 
                        src={platform.image} 
                        alt={platform.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-lg">{platform.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Download Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${
              isDark ? 'bg-gray-800/50' : 'bg-white/70'
            } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            } mb-8`}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your file URL here..."
                  className={`w-full px-6 py-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20'
                  } text-lg`}
                  onKeyPress={(e) => e.key === 'Enter' && handleDownload()}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                disabled={!url.trim() || isDownloading}
                className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  !url.trim() || isDownloading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                } text-white min-w-[140px]`}
              >
                {isDownloading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Downloading
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Download className="w-5 h-5 mr-2" />
                    Download
                  </div>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Downloads List */}
          <AnimatePresence>
            {downloads.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`${
                  isDark ? 'bg-gray-800/50' : 'bg-white/70'
                } backdrop-blur-xl rounded-3xl p-8 shadow-2xl border ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <h3 className="text-2xl font-bold mb-6">Recent Downloads</h3>
                <div className="space-y-4">
                  {downloads.map((download) => (
                    <motion.div
                      key={download.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-4 rounded-2xl border ${
                        isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-white/50 border-gray-200'
                      } transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            isDark ? 'bg-gray-600' : 'bg-gray-100'
                          }`}>
                            {getFileIcon(download.type)}
                          </div>
                          <div>
                            <p className="font-medium truncate max-w-xs">{download.filename}</p>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {download.type.charAt(0).toUpperCase() + download.type.slice(1)} file
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{Math.round(download.progress)}%</p>
                          <p className={`text-xs ${
                            download.status === 'completed' ? 'text-green-500' :
                            download.status === 'downloading' ? 'text-blue-500' :
                            download.status === 'error' ? 'text-red-500' : 'text-gray-500'
                          }`}>
                            {download.status}
                          </p>
                        </div>
                      </div>
                      <div className={`w-full h-2 rounded-full overflow-hidden ${
                        isDark ? 'bg-gray-600' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${download.progress}%` }}
                          transition={{ duration: 0.5 }}
                          className={`h-full rounded-full ${
                            download.status === 'completed' ? 'bg-green-500' :
                            download.status === 'downloading' ? 'bg-blue-500' :
                            download.status === 'error' ? 'bg-red-500' : 'bg-gray-400'
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default App;