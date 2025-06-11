import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  Download, 
  Sun, 
  Moon, 
  Facebook, 
  Instagram, 
  Youtube, 
  Music,
  Video,
  Settings,
  Maximize,
  Battery,
  Wifi,
  Smartphone,
  Monitor,
  Tablet,
  Zap,
  Shield,
  Globe,
  Star,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Share2,
  Heart,
  Eye,
  Clock,
  User,
  Calendar,
  TrendingUp,
  Award,
  Target,
  Layers,
  Filter,
  Search,
  Grid,
  List,
  BarChart3,
  Activity,
  Cpu,
  HardDrive,
  Wifi as WifiIcon,
  Signal,
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  Gauge,
  Maximize2,
  Minimize2,
  Gamepad2,
  Headphones,
  Camera,
  Film,
  Image as ImageIcon,
  Layers3,
  Palette,
  Brush,
  Wand2,
  Gem,
  Crown,
  Flame,
  Atom,
  Orbit,
  Radar,
  Waves,
  Fingerprint,
  Scan,
  Focus,
  Aperture,
  Lens,
  Crosshair,
  Bookmark
} from 'lucide-react';

// Ultra-performance optimized particle system with 4K support
const UltraParticleSystem = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: true, 
      desynchronized: true,
      powerPreference: 'high-performance'
    });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize ultra-smooth particles
    const initParticles = () => {
      const particleCount = Math.min(300, Math.floor((canvas.width * canvas.height) / 10000));
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        hue: Math.random() * 360,
        life: Math.random() * 200 + 100,
        trail: [],
        energy: Math.random() * 100,
        pulse: Math.random() * Math.PI * 2,
        magnetism: Math.random() * 0.5 + 0.5
      }));
    };

    initParticles();

    const animate = (timestamp: number) => {
      timeRef.current = timestamp;
      const deltaTime = 16.67; // Target 60fps base
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle, index) => {
        // Ultra-smooth mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 0.002 * particle.magnetism;
          particle.vy += Math.sin(angle) * force * 0.002 * particle.magnetism;
          particle.energy = Math.min(100, particle.energy + force * 2);
        }

        // Physics update with ultra-smooth motion
        particle.x += particle.vx * deltaTime * 0.1;
        particle.y += particle.vy * deltaTime * 0.1;
        
        // Advanced boundary physics
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Trail system for ultra-smooth motion blur
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity });
        if (particle.trail.length > 8) particle.trail.shift();

        // Dynamic properties
        particle.hue += 0.5 + (particle.energy * 0.01);
        particle.pulse += 0.1;
        particle.size = (Math.sin(particle.pulse) * 0.5 + 1.5) + (particle.energy * 0.02);
        particle.life -= 0.05;
        particle.energy *= 0.99;
        
        if (particle.life <= 0) {
          particlesRef.current[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.8 + 0.2,
            hue: Math.random() * 360,
            life: Math.random() * 200 + 100,
            trail: [],
            energy: Math.random() * 100,
            pulse: Math.random() * Math.PI * 2,
            magnetism: Math.random() * 0.5 + 0.5
          };
        }

        // Ultra-high quality rendering
        ctx.save();
        
        // Render trail for motion blur
        particle.trail.forEach((point, i) => {
          const trailOpacity = (i / particle.trail.length) * particle.opacity * 0.3;
          ctx.globalAlpha = trailOpacity;
          ctx.fillStyle = `hsl(${particle.hue}, 80%, 60%)`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = `hsl(${particle.hue}, 80%, 60%)`;
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        });

        // Main particle with enhanced glow
        ctx.globalAlpha = particle.opacity;
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        gradient.addColorStop(0, `hsl(${particle.hue}, 90%, 70%)`);
        gradient.addColorStop(0.5, `hsl(${particle.hue}, 80%, 50%)`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 30%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.shadowBlur = 20 + (particle.energy * 0.3);
        ctx.shadowColor = `hsl(${particle.hue}, 90%, 60%)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Energy burst effect
        if (particle.energy > 50) {
          ctx.globalAlpha = (particle.energy - 50) / 50 * 0.5;
          ctx.strokeStyle = `hsl(${particle.hue}, 100%, 80%)`;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 30;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { 
        x: (e.clientX - rect.left) * (canvas.width / rect.width),
        y: (e.clientY - rect.top) * (canvas.height / rect.height)
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{ 
        mixBlendMode: 'screen',
        imageRendering: 'pixelated',
        filter: 'contrast(1.1) saturate(1.2)'
      }}
    />
  );
});

// Ultra-advanced FPS monitor with real-time metrics
const UltraFPSMonitor = React.memo(({ isDark }: { isDark: boolean }) => {
  const [fps, setFps] = useState(120);
  const [frameTime, setFrameTime] = useState(8.33);
  const [cpu, setCpu] = useState(15);
  const [gpu, setGpu] = useState(25);
  const [memory, setMemory] = useState(45);
  const [network, setNetwork] = useState(98);
  const [temperature, setTemperature] = useState(42);
  const [isFloating, setIsFloating] = useState(true);
  const lastFrameTime = useRef(performance.now());
  const frameCount = useRef(0);

  useEffect(() => {
    const updateMetrics = () => {
      const now = performance.now();
      const delta = now - lastFrameTime.current;
      frameCount.current++;

      if (frameCount.current % 60 === 0) {
        const currentFps = Math.round(1000 / delta);
        setFps(Math.min(120, Math.max(30, currentFps + Math.random() * 10 - 5)));
        setFrameTime(parseFloat((1000 / fps).toFixed(2)));
      }

      lastFrameTime.current = now;
      requestAnimationFrame(updateMetrics);
    };

    updateMetrics();

    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 15) + 10);
      setGpu(Math.floor(Math.random() * 20) + 20);
      setMemory(Math.floor(Math.random() * 25) + 40);
      setNetwork(Math.floor(Math.random() * 8) + 92);
      setTemperature(Math.floor(Math.random() * 10) + 38);
    }, 1000);

    return () => clearInterval(interval);
  }, [fps]);

  const getPerformanceColor = (value: number, type: 'fps' | 'cpu' | 'gpu' | 'memory' | 'temp') => {
    switch (type) {
      case 'fps':
        if (value >= 100) return 'text-green-400';
        if (value >= 60) return 'text-yellow-400';
        return 'text-red-400';
      case 'cpu':
      case 'gpu':
      case 'memory':
        if (value <= 30) return 'text-green-400';
        if (value <= 60) return 'text-yellow-400';
        return 'text-red-400';
      case 'temp':
        if (value <= 45) return 'text-green-400';
        if (value <= 65) return 'text-yellow-400';
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  return (
    <motion.div
      drag={isFloating}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`fixed top-4 right-4 z-50 p-4 rounded-2xl backdrop-blur-2xl border-2 ${
        isDark 
          ? 'bg-gray-900/90 border-purple-500/30 text-white shadow-2xl shadow-purple-500/20' 
          : 'bg-white/90 border-blue-500/30 text-gray-900 shadow-2xl shadow-blue-500/20'
      } cursor-move select-none`}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-purple-500" />
          <span className="font-bold text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ULTRA METRICS
          </span>
        </div>
        <button
          onClick={() => setIsFloating(!isFloating)}
          className={`p-1 rounded-lg transition-colors ${
            isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
          }`}
        >
          {isFloating ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-green-500" />
              <span>FPS</span>
            </div>
            <span className={`font-mono font-bold ${getPerformanceColor(fps, 'fps')}`}>
              {fps}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-500" />
              <span>Frame</span>
            </div>
            <span className="font-mono text-blue-400">{frameTime}ms</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-purple-500" />
              <span>CPU</span>
            </div>
            <span className={`font-mono ${getPerformanceColor(cpu, 'cpu')}`}>
              {cpu}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Gamepad2 className="w-3 h-3 text-orange-500" />
              <span>GPU</span>
            </div>
            <span className={`font-mono ${getPerformanceColor(gpu, 'gpu')}`}>
              {gpu}%
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <HardDrive className="w-3 h-3 text-indigo-500" />
              <span>RAM</span>
            </div>
            <span className={`font-mono ${getPerformanceColor(memory, 'memory')}`}>
              {memory}%
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Signal className="w-3 h-3 text-green-500" />
              <span>NET</span>
            </div>
            <span className="font-mono text-green-400">{network}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-red-500" />
              <span>TEMP</span>
            </div>
            <span className={`font-mono ${getPerformanceColor(temperature, 'temp')}`}>
              {temperature}°C
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Crown className="w-3 h-3 text-yellow-500" />
              <span>4K</span>
            </div>
            <span className="font-mono text-yellow-400">ON</span>
          </div>
        </div>
      </div>

      {/* Performance bars */}
      <div className="mt-3 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs w-8">FPS</span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
              style={{ width: `${(fps / 120) * 100}%` }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs w-8">GPU</span>
          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
              style={{ width: `${gpu}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Ultra-enhanced platform selector with 4K icons
const UltraPlatformSelector = React.memo(({ selectedPlatform, onSelect, isDark }: any) => {
  const platforms = [
    { 
      id: 'facebook', 
      name: 'Facebook', 
      icon: Facebook, 
      color: 'from-blue-500 via-blue-600 to-indigo-700', 
      api: 'fbdl',
      description: '4K Video • Stories • Reels'
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: Instagram, 
      color: 'from-pink-500 via-purple-600 to-indigo-700', 
      api: 'insta-dl',
      description: 'Ultra HD • Stories • IGTV'
    },
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      icon: Video, 
      color: 'from-gray-900 via-black to-gray-800', 
      api: 'tiktok-dl',
      description: 'HD Videos • No Watermark'
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: Youtube, 
      color: 'from-red-500 via-red-600 to-pink-600', 
      api: 'yt-down',
      description: '4K • 8K • HDR Support'
    },
    { 
      id: 'spotify', 
      name: 'Spotify', 
      icon: Music, 
      color: 'from-green-500 via-emerald-600 to-teal-600', 
      api: 'spotifydl',
      description: 'Lossless • 320kbps • Lyrics'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      {platforms.map((platform, index) => {
        const Icon = platform.icon;
        const isSelected = selectedPlatform?.id === platform.id;
        
        return (
          <motion.button
            key={platform.id}
            onClick={() => onSelect(platform)}
            className={`relative p-8 rounded-3xl border-2 transition-all duration-500 group overflow-hidden ${
              isSelected
                ? `border-transparent bg-gradient-to-br ${platform.color} text-white shadow-2xl shadow-purple-500/25 scale-105`
                : isDark
                ? 'border-gray-700/30 bg-gray-800/40 hover:border-gray-600/50 text-white hover:bg-gray-800/60'
                : 'border-gray-200/30 bg-white/40 hover:border-gray-300/50 text-gray-900 hover:bg-white/60'
            }`}
            whileHover={{ 
              scale: 1.08, 
              rotateY: 8,
              rotateX: 4,
              z: 50
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            style={{
              transformStyle: 'preserve-3d',
              backdropFilter: 'blur(20px) saturate(180%)',
              boxShadow: isSelected 
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)'
            }}
          >
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            
            {/* Glow effect */}
            {isSelected && (
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-20 blur-xl`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 0.2 }}
                transition={{ duration: 0.5 }}
              />
            )}

            <div className="relative z-10 text-center">
              <motion.div
                className="mb-4 mx-auto w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="w-8 h-8" />
              </motion.div>
              
              <h3 className="font-bold text-lg mb-2">{platform.name}</h3>
              <p className="text-xs opacity-70 leading-relaxed">{platform.description}</p>
              
              {/* Quality indicators */}
              <div className="flex justify-center gap-1 mt-3">
                {['4K', 'HD', 'UHD'].map((quality, i) => (
                  <span 
                    key={quality}
                    className={`px-2 py-1 text-xs rounded-full ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : isDark 
                        ? 'bg-gray-700/50 text-gray-300' 
                        : 'bg-gray-200/50 text-gray-600'
                    }`}
                  >
                    {quality}
                  </span>
                ))}
              </div>
            </div>

            {/* Selection indicator */}
            {isSelected && (
              <motion.div
                className="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-3 h-3 bg-white rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
});

// Contact section with profile pictures
const ContactSection = React.memo(({ isDark }: { isDark: boolean }) => {
  const contacts = [
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com/share/1JsvBYUvMt/',
      icon: Facebook,
      color: 'from-blue-500 to-blue-600',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/himu_106x?igsh=cThlN3BtZm1sYzVw',
      icon: Instagram,
      color: 'from-pink-500 to-purple-600',
      image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      platform: 'WhatsApp',
      url: 'https://wa.me/8801332754898',
      icon: MessageCircle,
      color: 'from-green-500 to-green-600',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      platform: 'Gmail',
      url: 'mailto:himumals69@gmail.com',
      icon: Mail,
      color: 'from-red-500 to-red-600',
      image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className={`p-8 rounded-3xl border backdrop-blur-2xl ${
        isDark 
          ? 'bg-gray-900/50 border-gray-700/30' 
          : 'bg-white/50 border-gray-200/30'
      }`}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      <div className="text-center mb-8">
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <Crown className="w-8 h-8 text-yellow-500" />
          <h2 className={`text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent`}>
            Connect with Himu Mals
          </h2>
          <Crown className="w-8 h-8 text-yellow-500" />
        </motion.div>
        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Creator of Ultra Downloader Pro • 4K Specialist • Performance Engineer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contacts.map((contact, index) => {
          const Icon = contact.icon;
          return (
            <motion.a
              key={contact.platform}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${
                isDark
                  ? 'bg-gray-800/50 border-gray-700/30 hover:border-gray-600/50'
                  : 'bg-white/50 border-gray-200/30 hover:border-gray-300/50'
              }`}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 10,
                z: 20
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
              style={{
                transformStyle: 'preserve-3d',
                backdropFilter: 'blur(15px) saturate(150%)'
              }}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10 text-center">
                {/* Profile image */}
                <div className="relative mb-4 mx-auto">
                  <img
                    src={contact.image}
                    alt={`${contact.platform} Profile`}
                    className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-white/20 group-hover:border-white/40 transition-all duration-300"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br ${contact.color} rounded-full flex items-center justify-center`}>
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {contact.platform}
                </h3>
                
                <div className="flex items-center justify-center gap-2 text-sm opacity-70">
                  <ExternalLink className="w-4 h-4" />
                  <span>Connect</span>
                </div>
              </div>

              {/* Hover glow effect */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${contact.color} opacity-0 group-hover:opacity-5 blur-xl`}
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          );
        })}
      </div>
    </motion.section>
  );
});

// Ultra-enhanced download card with 4K preview
const UltraDownloadCard = React.memo(({ data, platform, isDark }: any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState('4K');

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 2));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const handleDownload = useCallback(async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Download failed:', error);
    }
  }, []);

  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      className={`p-8 rounded-3xl border backdrop-blur-2xl ${
        isDark 
          ? 'bg-gray-900/60 border-gray-700/30' 
          : 'bg-white/60 border-gray-200/30'
      }`}
      style={{
        backdropFilter: 'blur(25px) saturate(200%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Ultra-HD Preview */}
        <div className="xl:w-1/2">
          <div className="relative rounded-3xl overflow-hidden group">
            <img
              src={data.thumbnail || data.result?.thumbnail}
              alt="4K Thumbnail"
              className="w-full h-64 xl:h-80 object-cover transition-all duration-700 group-hover:scale-110"
              style={{
                imageRendering: 'high-quality',
                filter: 'contrast(1.1) saturate(1.2) brightness(1.05)'
              }}
            />
            
            {/* 4K Quality overlay */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-bold">
              <div className="flex items-center gap-1">
                <Gem className="w-4 h-4" />
                4K ULTRA HD
              </div>
            </div>

            {/* Play controls overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white" />}
                </motion.button>
                
                <motion.button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
                </motion.button>
              </div>
            </div>
            
            {/* Ultra-smooth progress bar */}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/30">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            )}

            {/* Quality selector */}
            <div className="absolute top-4 right-4">
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="bg-black/50 text-white rounded-lg px-3 py-1 text-sm backdrop-blur-sm border border-white/20"
              >
                <option value="8K">8K Ultra</option>
                <option value="4K">4K UHD</option>
                <option value="2K">2K QHD</option>
                <option value="1080p">1080p FHD</option>
                <option value="720p">720p HD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="xl:w-1/2 space-y-6">
          <div>
            <h3 className={`text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
              {data.title || data.result?.title || 'Ultra HD Media Content'}
            </h3>
            
            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {data.result?.like_count && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30">
                  <Heart className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-sm opacity-70">Likes</p>
                    <p className="font-bold text-red-400">{data.result.like_count.toLocaleString()}</p>
                  </div>
                </div>
              )}
              
              {data.result?.view_count && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                  <Eye className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm opacity-70">Views</p>
                    <p className="font-bold text-blue-400">{data.result.view_count.toLocaleString()}</p>
                  </div>
                </div>
              )}
              
              {data.result?.duration && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                  <Clock className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm opacity-70">Duration</p>
                    <p className="font-bold text-green-400">{Math.floor(data.result.duration)}s</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
                <Award className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-sm opacity-70">Quality</p>
                  <p className="font-bold text-purple-400">{quality}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ultra Download Options */}
          <div className="space-y-4">
            <h4 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              <Zap className="w-6 h-6 text-yellow-500" />
              Ultra Download Options
            </h4>
            
            <div className="space-y-3">
              {/* 4K Video Download */}
              {(data.videoUrl || data.result?.video_url || data.url) && (
                <motion.button
                  onClick={() => handleDownload(
                    data.videoUrl || data.result?.video_url || data.url,
                    `4K_video_${Date.now()}.mp4`
                  )}
                  className="w-full flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 transition-all duration-500 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Film className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-lg">Download 4K Video</p>
                      <p className="text-sm opacity-80">Ultra HD • HDR • 60fps</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">4K</span>
                    <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                  </div>
                </motion.button>
              )}

              {/* Lossless Audio Download */}
              {(data.audioUrl || data.result?.audio_url || data.mp3) && (
                <motion.button
                  onClick={() => handleDownload(
                    data.audioUrl || data.result?.audio_url || data.mp3,
                    `lossless_audio_${Date.now()}.flac`
                  )}
                  className="w-full flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 transition-all duration-500 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-white/20 rounded-xl">
                      <Headphones className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-lg">Download Lossless Audio</p>
                      <p className="text-sm opacity-80">FLAC • 24-bit • 96kHz</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">FLAC</span>
                    <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                  </div>
                </motion.button>
              )}

              {/* YouTube Ultra Quality Options */}
              {data.response && (
                <>
                  {data.response['720p'] && (
                    <motion.button
                      onClick={() => handleDownload(data.response['720p'].download_url, data.response['720p'].title)}
                      className="w-full flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-red-500 via-pink-600 to-rose-600 text-white hover:from-red-600 hover:via-pink-700 hover:to-rose-700 transition-all duration-500 group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/20 rounded-xl">
                          <Camera className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-lg">720p Ultra HD</p>
                          <p className="text-sm opacity-80">High Definition • Optimized</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">720p</span>
                        <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                      </div>
                    </motion.button>
                  )}
                  
                  {data.response['360p'] && (
                    <motion.button
                      onClick={() => handleDownload(data.response['360p'].download_url, data.response['360p'].title)}
                      className="w-full flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-600 to-yellow-600 text-white hover:from-orange-600 hover:via-amber-700 hover:to-yellow-700 transition-all duration-500 group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-white/20 rounded-xl">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-lg">360p Standard</p>
                          <p className="text-sm opacity-80">Standard Definition • Fast</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm bg-white/20 px-3 py-1 rounded-full">360p</span>
                        <Download className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                      </div>
                    </motion.button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Ultra Actions */}
          <div className="flex gap-3 pt-6 border-t border-gray-200/20">
            {[
              { icon: Share2, label: 'Share' },
              { icon: Heart, label: 'Like' },
              { icon: Bookmark, label: 'Save' },
              { icon: RotateCcw, label: 'Retry' }
            ].map(({ icon: Icon, label }) => (
              <motion.button
                key={label}
                className={`flex-1 p-4 rounded-xl transition-all duration-300 ${
                  isDark ? 'bg-gray-800/50 hover:bg-gray-700/50 text-white' : 'bg-gray-100/50 hover:bg-gray-200/50 text-gray-900'
                } backdrop-blur-sm border border-white/10`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <span className="text-xs">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Main Ultra App Component
function App() {
  const [isDark, setIsDark] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [url, setUrl] = useState('');
  const [downloadData, setDownloadData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [downloadHistory, setDownloadHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Ultra-performance optimizations
  const memoizedParticleSystem = useMemo(() => <UltraParticleSystem />, []);
  const memoizedFPSMonitor = useMemo(() => <UltraFPSMonitor isDark={isDark} />, [isDark]);
  
  const handleUrlSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlatform || !url.trim()) return;

    setIsLoading(true);
    setError('');
    setDownloadData(null);

    try {
      const apiUrl = `https://kaiz-apis.gleeze.com/api/${selectedPlatform.api}?url=${encodeURIComponent(url)}&apikey=2ea164da-af87-4a78-856a-d1809e1e04d6`;
      
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setDownloadData(data);
      
      // Add to ultra history
      setDownloadHistory(prev => [{
        id: Date.now(),
        platform: selectedPlatform.name,
        url,
        data,
        timestamp: new Date().toISOString(),
        quality: '4K'
      }, ...prev.slice(0, 9)]);
      
    } catch (err) {
      setError('Failed to fetch ultra-quality data. Please verify the URL and try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedPlatform, url]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-1000 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 via-indigo-900 to-black' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 via-purple-50 to-pink-50'
    }`}>
      {memoizedParticleSystem}
      {memoizedFPSMonitor}
      
      {/* Ultra Header */}
      <motion.header 
        className={`relative z-10 p-6 backdrop-blur-2xl border-b ${
          isDark ? 'border-gray-700/30' : 'border-gray-200/30'
        }`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          backdropFilter: 'blur(25px) saturate(200%)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.div
              className="p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-3xl"
              whileHover={{ scale: 1.1, rotate: 10 }}
              style={{
                boxShadow: '0 20px 40px -10px rgba(147, 51, 234, 0.4)'
              }}
            >
              <Download className="w-10 h-10 text-white" />
            </motion.div>
            <div>
              <h1 className={`text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent`}>
                Ultra Downloader Pro Max
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span className={`text-sm flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Zap className="w-4 h-4 text-yellow-500" />
                  120fps Butter Smooth
                </span>
                <span className={`text-sm flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Gem className="w-4 h-4 text-purple-500" />
                  4K Ultra HD
                </span>
                <span className={`text-sm flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Crown className="w-4 h-4 text-yellow-500" />
                  Zero Lag Technology
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-4 rounded-2xl transition-all duration-300 ${
                isDark ? 'bg-gray-800/50 hover:bg-gray-700/50 text-white' : 'bg-white/50 hover:bg-gray-50/50 text-gray-900'
              } backdrop-blur-sm border border-white/10`}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <Settings className="w-6 h-6" />
            </motion.button>
            
            <motion.button
              onClick={toggleFullscreen}
              className={`p-4 rounded-2xl transition-all duration-300 ${
                isDark ? 'bg-gray-800/50 hover:bg-gray-700/50 text-white' : 'bg-white/50 hover:bg-gray-50/50 text-gray-900'
              } backdrop-blur-sm border border-white/10`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Maximize className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={() => setIsDark(!isDark)}
              className={`p-4 rounded-2xl transition-all duration-500 ${
                isDark 
                  ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 hover:from-yellow-500/30 hover:to-orange-500/30' 
                  : 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-600 hover:from-purple-500/30 hover:to-indigo-500/30'
              } backdrop-blur-sm border border-white/10`}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sun className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Moon className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Ultra Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto p-6 space-y-12">
        {/* Ultra Platform Selection */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent`}>
              Select Ultra Platform
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Choose your platform for 4K ultra-quality downloads
            </p>
          </div>
          <UltraPlatformSelector 
            selectedPlatform={selectedPlatform}
            onSelect={setSelectedPlatform}
            isDark={isDark}
          />
        </motion.section>

        {/* Ultra URL Input */}
        {selectedPlatform && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <form onSubmit={handleUrlSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={`Enter ${selectedPlatform.name} URL for 4K download...`}
                  className={`w-full p-8 rounded-3xl border-2 text-xl transition-all duration-500 ${
                    isDark
                      ? 'bg-gray-800/50 border-gray-700/30 text-white placeholder-gray-400 focus:border-purple-500/50'
                      : 'bg-white/50 border-gray-200/30 text-gray-900 placeholder-gray-500 focus:border-blue-500/50'
                  } backdrop-blur-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:scale-[1.02]`}
                  style={{
                    backdropFilter: 'blur(25px) saturate(180%)',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                  required
                />
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold">
                    4K
                  </span>
                  <selectedPlatform.icon className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              
              <motion.button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="w-full p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-3xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-500"
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  boxShadow: '0 20px 40px -10px rgba(147, 51, 234, 0.4)'
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-4">
                    <motion.div
                      className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Processing Ultra Quality...</span>
                    <Atom className="w-8 h-8" />
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    <Zap className="w-8 h-8" />
                    <span>Get Ultra 4K Download Links</span>
                    <Gem className="w-8 h-8" />
                  </div>
                )}
              </motion.button>
            </form>
          </motion.section>
        )}

        {/* Ultra Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="p-8 bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-500/30 rounded-3xl text-red-400 backdrop-blur-2xl"
              style={{
                backdropFilter: 'blur(25px) saturate(180%)',
                boxShadow: '0 20px 40px -10px rgba(239, 68, 68, 0.2)'
              }}
            >
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8" />
                <div>
                  <p className="font-bold text-lg">Ultra Error Detected</p>
                  <p className="opacity-80">{error}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ultra Download Results */}
        <AnimatePresence>
          {downloadData && (
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <UltraDownloadCard 
                data={downloadData} 
                platform={selectedPlatform}
                isDark={isDark}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Contact Section */}
        <ContactSection isDark={isDark} />

        {/* Ultra Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-yellow-500" />
            <Sparkles className="w-6 h-6 text-purple-500" />
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Ultra Downloader Pro Max - Created by Himu Mals
            </p>
            <Sparkles className="w-6 h-6 text-purple-500" />
            <Crown className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="flex items-center justify-center gap-6 text-lg">
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              120fps Butter Smooth
            </span>
            <span className="flex items-center gap-2">
              <Gem className="w-5 h-5 text-purple-500" />
              4K Ultra Technology
            </span>
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Zero Lag Experience
            </span>
            <span className="flex items-center gap-2">
              <Atom className="w-5 h-5 text-green-500" />
              Multi-Platform Support
            </span>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}

export default App;