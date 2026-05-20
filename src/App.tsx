/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, FormEvent, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Shield, Zap, Globe, Cpu, ArrowRight, 
  Brain, Smartphone, AppWindow, Layers,
  MessageSquare, ChevronRight, ChevronLeft, X, LayoutTemplate, 
  Lock, Settings, Clock, Link as LinkIcon, Github,
  Briefcase, GraduationCap, Scale, HeartPulse, Landmark, Laptop, Terminal, Mail, Rocket
} from 'lucide-react';
import { PixelAnimation } from './components/PixelAnimation';
import { DotFlow, DotFlowProps } from "@/components/ui/dot-flow";
import { PlasticButton } from './components/ui/PlasticButton';
import { GradientBackground } from './components/ui/paper-design-shader-background';
import GradientBars from './components/ui/gradient-bars-bg';
import bg4 from '../bg4.jpeg';
import logo from './logo.png';

const importing = [
    [0, 2, 4, 6, 20, 34, 48, 46, 44, 42, 28, 14, 8, 22, 36, 38, 40, 26, 12, 10, 16, 30, 24, 18, 32],
    [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47],
    [8, 22, 36, 38, 40, 26, 12, 10, 16, 30, 24, 18, 32],
    [9, 11, 15, 17, 19, 23, 25, 29, 31, 33, 37, 39],
    [16, 30, 24, 18, 32],
    [17, 23, 31, 25],
    [24],
    [17, 23, 31, 25],
    [16, 30, 24, 18, 32],
    [9, 11, 15, 17, 19, 23, 25, 29, 31, 33, 37, 39],
    [8, 22, 36, 38, 40, 26, 12, 10, 16, 30, 24, 18, 32],
    [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47],
    [0, 2, 4, 6, 20, 34, 48, 46, 44, 42, 28, 14, 8, 22, 36, 38, 40, 26, 12, 10, 16, 30, 24, 18, 32],
];

const syncing = [
    [45, 38, 31, 24, 17, 23, 25],
    [38, 31, 24, 17, 10, 16, 18],
    [31, 24, 17, 10, 3, 9, 11],
    [24, 17, 10, 3, 2, 4],
    [17, 10, 3],
    [10, 3],
    [3],
    [],
    [45],
    [45, 38, 44, 46],
    [45, 38, 31, 37, 39],
    [45, 38, 31, 24, 30, 32],
];

const searching = [
    [9, 16, 17, 15, 23],
    [10, 17, 18, 16, 24],
    [11, 18, 19, 17, 25],
    [18, 25, 26, 24, 32],
    [25, 32, 33, 31, 39],
    [32, 39, 40, 38, 46],
    [31, 38, 39, 37, 45],
    [30, 37, 38, 36, 44],
    [23, 30, 31, 29, 37],
    [31, 29, 37, 22, 24, 23, 38, 36],
    [16, 23, 24, 22, 30],
];

const heartbit = [
    [],
    [3],
    [10, 2, 4, 3],
    [17, 9, 1, 11, 5, 10, 4, 3, 2],
    [24, 16, 8, 1, 3, 5, 18, 12, 17, 11, 4, 10, 9, 2],
    [31, 23, 15, 8, 10, 2, 4, 12, 25, 19, 24, 18, 11, 17, 16, 9],
    [38, 30, 22, 15, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16],
    [38, 30, 22, 15, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16],
    [38, 30, 22, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16, 45, 37, 29, 21, 14, 8, 15, 12, 20, 27, 33, 39],
    [38, 30, 22, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16, 45, 37, 29, 21, 14, 8, 15, 12, 20, 27, 33, 39],
    [38, 30, 22, 15, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16],
    [38, 30, 22, 15, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16],
    [38, 30, 22, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16, 45, 37, 29, 21, 14, 8, 15, 12, 20, 27, 33, 39],
    [38, 30, 22, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16, 45, 37, 29, 21, 14, 8, 15, 12, 20, 27, 33, 39],
    [38, 30, 22, 15, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16],
    [38, 30, 22, 15, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16],
    [38, 30, 22, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16, 45, 37, 29, 21, 14, 8, 15, 12, 20, 27, 33, 39],
    [38, 30, 22, 17, 9, 11, 19, 32, 26, 31, 25, 18, 24, 23, 16, 45, 37, 29, 21, 14, 8, 15, 12, 20, 27, 33, 39],
    [39, 33, 37, 29, 17, 38, 30, 22, 15, 16, 23, 24, 31, 32, 25, 18, 26, 19],
    [17, 30, 16, 23, 24, 31, 32, 25, 18],
    [24],
];

const shadcn = [
    [],
    [7, 1],
    [15, 9, 7, 1],
    [23, 17, 21, 15, 9, 3],
    [31, 25, 29, 23, 17, 11],
    [39, 33, 37, 31, 25, 19],
    [47, 41, 45, 39, 33, 27],
    [47, 41, 45, 39, 33, 27],
    [47, 41, 45, 39, 33, 27],
    [47, 41, 45, 39, 33, 27],
];

const thinking = [
    [15, 16, 17, 24, 31, 30, 29, 22],
    [16, 17, 24, 31, 30, 29, 22, 15],
    [17, 24, 31, 30, 29, 22, 15, 16],
    [24, 31, 30, 29, 22, 15, 16, 17],
    [31, 30, 29, 22, 15, 16, 17, 24],
    [30, 29, 22, 15, 16, 17, 24, 31],
    [29, 22, 15, 16, 17, 24, 31, 30],
    [22, 15, 16, 17, 24, 31, 30, 29],
];

const matrix = [
    [0, 1, 2, 3, 4, 5, 6],
    [7, 8, 9, 10, 11, 12, 13],
    [14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27],
    [28, 29, 30, 31, 32, 33, 34],
    [35, 36, 37, 38, 39, 40, 41],
    [42, 43, 44, 45, 46, 47, 48],
];

const radar = [
    [24, 17, 10, 3],
    [24, 18, 12, 6],
    [24, 25, 26, 27],
    [24, 32, 40, 48],
    [24, 31, 38, 45],
    [24, 30, 36, 42],
    [24, 23, 22, 21],
    [24, 16, 8, 0],
];

const bounce = [
    [0], [1], [2], [3], [4], [5], [6],
    [13], [20], [27], [34], [41], [48],
    [47], [46], [45], [44], [43], [42],
    [35], [28], [21], [14], [7]
];

const pulse = [
    [24],
    [16, 17, 18, 23, 25, 30, 31, 32],
    [8, 9, 10, 11, 12, 15, 19, 22, 26, 29, 33, 36, 37, 38, 39, 40],
    [0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41, 42, 43, 44, 45, 46, 47, 48],
    [8, 9, 10, 11, 12, 15, 19, 22, 26, 29, 33, 36, 37, 38, 39, 40],
    [16, 17, 18, 23, 25, 30, 31, 32],
    [24],
];

const diagonalSweep = [
    [0], [1, 7], [2, 8, 14], [3, 9, 15, 21], [4, 10, 16, 22, 28], [5, 11, 17, 23, 29, 35], [6, 12, 18, 24, 30, 36, 42],
    [13, 19, 25, 31, 37, 43], [20, 26, 32, 38, 44], [27, 33, 39, 45], [34, 40, 46], [41, 47], [48]
];

const spiral = [
    [24], [17], [18], [25], [32], [31], [30], [23], [16], [9], [10], [11], [12], [19], [26], [33], [40], [39], [38], [37], [36], [29], [22], [15], [8], [1], [2], [3], [4], [5], [6], [13], [20], [27], [34], [41], [48], [47], [46], [45], [44], [43], [42], [35], [28], [21], [14], [7], [0]
];

const cross = [
    [3, 10, 17, 24, 31, 38, 45],
    [21, 22, 23, 24, 25, 26, 27],
    [0, 8, 16, 24, 32, 40, 48],
    [6, 12, 18, 24, 30, 36, 42]
];

const snake = [
    [0], [1], [2], [3], [4], [5], [6],
    [13], [12], [11], [10], [9], [8], [7],
    [14], [15], [16], [17], [18], [19], [20],
    [27], [26], [25], [24], [23], [22], [21],
    [28], [29], [30], [31], [32], [33], [34],
    [41], [40], [39], [38], [37], [36], [35],
    [42], [43], [44], [45], [46], [47], [48]
];

const exploding = [
    [24],
    [16, 17, 18, 23, 25, 30, 31, 32],
    [8, 9, 10, 11, 12, 15, 19, 22, 26, 29, 33, 36, 37, 38, 39, 40],
    [0, 1, 2, 3, 4, 5, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 41, 42, 43, 44, 45, 46, 47, 48],
    []
];

const diamond = [
    [24],
    [17, 23, 25, 31],
    [10, 16, 18, 22, 26, 30, 32, 38],
    [3, 9, 11, 15, 19, 21, 27, 29, 33, 37, 39, 45],
    [2, 4, 8, 12, 14, 20, 28, 34, 36, 40, 44, 46],
    [1, 5, 7, 13, 21, 27, 35, 41, 43, 47],
    [0, 6, 42, 48]
];

const wave = [
    [0, 7, 14, 21, 28, 35, 42],
    [1, 8, 15, 22, 29, 36, 43],
    [2, 9, 16, 23, 30, 37, 44],
    [3, 10, 17, 24, 31, 38, 45],
    [4, 11, 18, 25, 32, 39, 46],
    [5, 12, 19, 26, 33, 40, 47],
    [6, 13, 20, 27, 34, 41, 48]
];

const checkerboard = [
    [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48],
    [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47]
];

const dotFlowItems: DotFlowProps["items"] = [
    {
        title: "Importing",
        frames: importing,
        duration: 200,
    },
    {
        title: "Pulsing",
        frames: pulse,
        repeatCount: 1,
        duration: 150,
    },
    {
        title: "Sweeping",
        frames: diagonalSweep,
        repeatCount: 1,
        duration: 80,
    },
    {
        title: "Snaking",
        frames: snake,
        repeatCount: 1,
        duration: 50,
    },
    {
        title: "Exploding",
        frames: exploding,
        repeatCount: 1,
        duration: 150,
    },
    {
        title: "Diamond",
        frames: diamond,
        repeatCount: 1,
        duration: 120,
    },
    {
        title: "Wave",
        frames: wave,
        repeatCount: 2,
        duration: 100,
    },
    {
        title: "Alternating",
        frames: checkerboard,
        repeatCount: 3,
        duration: 300,
    },
    {
        title: "Syncing",
        frames: syncing,
        repeatCount: 2,
        duration: 100,
    },
    {
        title: "Thinking",
        frames: thinking,
        repeatCount: 3,
        duration: 200,
    },
    {
        title: "Spiral",
        frames: spiral,
        repeatCount: 1,
        duration: 40,
    },
    {
        title: "Scanning",
        frames: radar,
        repeatCount: 2,
        duration: 150,
    },
    {
        title: "Crosshair",
        frames: cross,
        repeatCount: 2,
        duration: 150,
    },
    {
        title: "Processing",
        frames: matrix,
        repeatCount: 1,
        duration: 100,
    },
    {
        title: "Active",
        frames: bounce,
        repeatCount: 1,
        duration: 50,
    },
    {
        title: "Searching",
        frames: searching,
        repeatCount: 2,
        duration: 150,
    },
    {
        title: "Using shadcn",
        frames: shadcn,
        repeatCount: 2,
        duration: 200,
    },
    {
        title: "Like it?",
        frames: heartbit,
        repeatCount: 2,
    },
];

export default function App() {
  const [name, setName] = useState('Zyfleron');
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-[#111] overflow-hidden">
      <Navbar name={name} setName={setName} onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
      
      <main>
        <HeroSection name={name} setName={setName} onOpenWaitlist={() => setIsWaitlistOpen(true)} />
        <FeaturesGrid name={name} />
        <PowerUpSection name={name} />
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full p-3 gap-3">
          <MarqueeSection />
          <CrystalsSection name={name} onOpenWaitlist={() => setIsWaitlistOpen(true)} />
        </div>
        <EntertainmentShowcase name={name} onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      </main>
      
      <Footer name={name} />
      <BetaNotification onOpenWaitlist={() => setIsWaitlistOpen(true)} />
    </div>
  );
}

function BetaNotification({ onOpenWaitlist }: { onOpenWaitlist: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-4 right-4 z-40"
    >
      <div className="relative">
        <div 
          className="flex flex-col items-start gap-4 p-5 pr-10 rounded-2xl bg-[#111] text-white text-sm font-medium shadow-xl border border-white/10 text-left max-w-[320px]"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <span className="font-semibold">Early Beta Access Now Live</span>
            </div>
            <span className="text-white/60 text-xs font-normal leading-relaxed">
              Be among the first to experience personal intelligence at your fingertips. Limited spots available.
            </span>
          </div>
          
          <button
            onClick={onOpenWaitlist}
            className="w-fit relative cursor-pointer z-0 flex items-center justify-center gap-2 overflow-hidden rounded-full border border-zinc-300 bg-zinc-100 px-6 py-2 text-sm font-semibold text-zinc-800 transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-zinc-800 before:transition-transform before:duration-1000 before:content-[''] hover:text-zinc-100 hover:before:translate-x-[0%] hover:before:translate-y-[0%] active:scale-95"
          >
            <span>Join the waitlist</span>
          </button>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}

function NameInput({ name, setName, children }: { name: string, setName: (name: string) => void, children: ReactNode }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile && !isVisible) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleTriggerClick = () => {
    if (isMobile) {
      setIsVisible(!isVisible);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsVisible(true)}
      onMouseLeave={() => !isMobile && setIsVisible(false)}
      onClick={handleTriggerClick}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute md:fixed top-full md:top-auto right-0 md:right-auto mt-2 md:mt-0 z-[60]"
            style={!isMobile ? { 
              left: mousePos.x + 10, 
              top: mousePos.y + 10 
            } : {}}
          >
            <input 
              autoFocus
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name..."
              onClick={(e) => e.stopPropagation()}
              className="w-40 px-3 py-2 rounded-lg bg-white border border-black/10 outline-none text-xs shadow-lg pointer-events-auto"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Navbar({ name, setName, onOpenWaitlist }: { name: string, setName: (name: string) => void, onOpenWaitlist: () => void }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img src={logo} alt="Zyfleron" className="h-6 w-auto object-contain" />
          <div className="hidden md:flex items-center gap-5 text-sm text-black/60 font-medium">
          </div>
        </div>
        <div className="flex items-center gap-4 h-full">
          <div className="flex items-center">
            <NameInput name={name} setName={setName}>
              <div className="px-3 py-1 rounded-none border border-black/10 hover:border-black/20 transition-colors cursor-pointer text-xs font-medium text-black/60 hover:text-black">
                <span className="hidden sm:inline">You can name your companion!</span>
                <span className="sm:hidden">Name companion</span>
              </div>
            </NameInput>
          </div>
          <button 
            onClick={onOpenWaitlist}
            className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-medium hover:bg-black/80 transition-colors"
          >
            Join Beta
          </button>
        </div>
      </div>
    </nav>
  );
}

function WaitlistModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [formName, setFormName] = useState<string>('');
  const [formContact, setFormContact] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setFormName('');
      setFormContact('');
    }
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const waitlistData = {
      type: 'waitlist',
      name: formName,
      contact: formContact,
      timestamp: new Date().toISOString()
    };
    
    try {
      const scriptUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(waitlistData),
        });
      }

      const formspreeUrl = import.meta.env.VITE_FORMSPREE_URL;
      if (formspreeUrl) {
        await fetch(formspreeUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formName,
            contact: formContact,
            message: `New Zyfleron waitlist signup! Name: ${formName}, Contact: ${formContact}`,
          }),
        });
      }
    } catch (error) {
      console.error('Submission failed:', error);
    }
    
    // Save to localStorage as a reliable backup
    const existingWaitlist = JSON.parse(localStorage.getItem('waitlist_responses') || '[]');
    existingWaitlist.push(waitlistData);
    localStorage.setItem('waitlist_responses', JSON.stringify(existingWaitlist));
    
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[90]"
          />
          {/* Center Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)', x: '-50%', y: '-50%' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)', x: '-50%', y: '-50%' }}
            exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)', x: '-50%', y: '-50%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-1/2 top-1/2 w-full max-w-[360px] bg-white border border-black/5 z-[100] p-8 rounded-[32px] flex flex-col shadow-2xl shadow-black/10"
          >
            
            <div className="mt-2" />
            {isSubmitted ? (
              /* Submission Success State */
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 flex flex-col items-center justify-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                  >
                    <svg className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </div>
                <h3 className="text-xl text-black font-medium">Thank you</h3>
              </motion.div>
            ) : (
              /* Form Entry State */
              <motion.form 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                onSubmit={handleWaitlistSubmit}
                className="flex flex-col gap-3"
              >
                {/* Name Input */}
                <motion.div variants={itemVariants} className="flex flex-col gap-1.5 text-left">
                  <div className="relative w-full">
                    <input 
                      type="text" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Full name or first name"
                      className="w-full bg-black/5 border border-black/5 rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black/5 text-black text-sm placeholder:text-black/20 placeholder:text-[11px] transition-all" 
                    />
                  </div>
                </motion.div>
            
                {/* Contact Input */}
                <motion.div variants={itemVariants} className="flex flex-col gap-1.5 text-left">
                  <div className="relative w-full">
                    <textarea 
                      rows={2}
                      value={formContact}
                      onChange={(e) => setFormContact(e.target.value)}
                      placeholder="Email, WhatsApp/Phone or Social links (separated by commas)"
                      className="w-full bg-black/5 border border-black/5 rounded-[18px] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/5 text-black text-sm placeholder:text-black/20 placeholder:text-[11px] transition-all resize-none" 
                    />
                  </div>
                </motion.div>
                
                {/* Submit Button */}
                <motion.div variants={itemVariants} className="mt-0.5 flex justify-center">
                  <button 
                    type="submit"
                    disabled={!formName.trim() || !formContact.trim()}
                    className="px-8 py-2.5 bg-black text-white rounded-full text-sm hover:bg-black/90 transition-all disabled:opacity-20 disabled:cursor-not-allowed active:scale-95 font-medium"
                  >
                    Join waitlist
                  </button>
                </motion.div>
              </motion.form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function HeroSection({ name, setName, onOpenWaitlist }: { name: string, setName: (n: string) => void, onOpenWaitlist: () => void }) {
  return (
    <section className="pt-32 pb-20 px-6 w-full text-center bg-white mt-3 mb-0 relative border-b border-black/5" id="experience">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-4">
          <DotFlow items={dotFlowItems} />
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-semibold tracking-tighter leading-none mb-6 font-serif text-[#111]"
        >
          Your device just got a <br className="hidden md:block"/> massive upgrade!
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-[260px] mx-auto mb-12 space-y-4"
        >
          
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 inline-flex items-center px-5 py-1.5 rounded-t-[12px] bg-neutral-100 text-[11px] font-medium border border-black/5 border-b-0 text-black/80 shadow-[0_-1px_2px_rgba(0,0,0,0.02)]"
      >
        {/* Left Inverted Corner */}
        <div className="absolute bottom-0 -left-4 w-4 h-4 bg-neutral-100 pointer-events-none">
          <div className="w-full h-full bg-white rounded-br-[12px] border-r border-b border-black/5" />
        </div>

        {/* Right Inverted Corner */}
        <div className="absolute bottom-0 -right-4 w-4 h-4 bg-neutral-100 pointer-events-none">
          <div className="w-full h-full bg-white rounded-bl-[12px] border-l border-b border-black/5" />
        </div>

        Personal intelligence at your fingertips
      </motion.div>
    </section>
  );
}


function DeviceShowcase({ name, onOpenWaitlist }: { name: string, onOpenWaitlist: () => void }) {
  const [showModulePopup, setShowModulePopup] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  return (
    <>
      <div 
        className="flex flex-col items-center text-center cursor-default"
        onMouseEnter={() => setShowModulePopup(true)}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setShowModulePopup(false)}
      >
        <h2 className="text-lg font-semibold tracking-tight mb-0 text-[#111] whitespace-nowrap">
          Crystal <span className="font-light text-black/50 uppercase">Portals</span>
        </h2>
      </div>

      {/* Crystal Module Popup */}
      <AnimatePresence>
        {showModulePopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ left: cursorPos.x + 15, top: cursorPos.y + 15 }}
            className="fixed z-[100] bg-white rounded-xl p-3 w-[200px] max-w-[200px] shadow-xl text-center border border-black/10 pointer-events-none"
          >
            <p className="text-xs text-black/60 font-medium leading-relaxed">
              <span className="block font-semibold text-black mb-1">Universal Interaction</span>
              Access any app or website from anywhere. App Store • Play Store • GitHub • Any OS. No lock-in. Every app. One companion.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TabletShowcase({ name, onOpenWaitlist }: { name: string, onOpenWaitlist: () => void }) {
  const [showCapabilitiesPopup, setShowCapabilitiesPopup] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  return (
    <>
      <div 
        className="flex flex-col items-center text-center cursor-default"
        onMouseEnter={() => setShowCapabilitiesPopup(true)}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setShowCapabilitiesPopup(false)}
      >
        <h2 className="text-xl font-semibold tracking-tight mb-4 text-[#111] whitespace-nowrap">
          Crystal <span className="font-light text-black/50 uppercase">Instincts</span>
        </h2>
      </div>

      {/* Crystal Capabilities Popup */}
      <AnimatePresence>
        {showCapabilitiesPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ left: cursorPos.x + 15, top: cursorPos.y + 15 }}
            className="fixed z-[100] bg-white rounded-xl p-3 w-[200px] max-w-[200px] shadow-xl text-center border border-black/10 pointer-events-none"
          >
            <p className="text-xs text-black/60 font-medium leading-relaxed">
              <span className="block font-semibold text-black mb-1">Pure Intelligence. Creativity is Productivity.</span>
              Teach it once. It remembers. Skills.md works. But this is better.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CrystalFusionItem() {
  const [showFoldsPopup, setShowFoldsPopup] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  return (
    <>
      <div 
        className="flex flex-col items-center text-center cursor-default"
        onMouseEnter={() => setShowFoldsPopup(true)}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setShowFoldsPopup(false)}
      >
        <h3 className="text-lg font-semibold tracking-tight mb-0 text-[#111] whitespace-nowrap">
          Crystal <span className="font-light text-black/50 uppercase">Fusion</span>
        </h3>
      </div>

      <AnimatePresence>
        {showFoldsPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ left: cursorPos.x + 15, top: cursorPos.y + 15 }}
            className="fixed z-[100] bg-white rounded-xl p-3 w-[200px] max-w-[200px] shadow-xl text-center border border-black/10 pointer-events-none"
          >
            <p className="text-xs text-black/60 font-medium leading-relaxed">
              <span className="block font-semibold text-black mb-1">Infinite Processes Simplified</span>
              Combine Instincts × Portals into powerful workflows. One Fusion = hours of saved work.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function CrystalAutonsItem() {
  const [showAgentsPopup, setShowAgentsPopup] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  return (
    <>
      <div 
        className="flex flex-col items-center text-center cursor-default"
        onMouseEnter={() => setShowAgentsPopup(true)}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setShowAgentsPopup(false)}
      >
        <h3 className="text-lg font-semibold tracking-tight mb-0 text-[#111] whitespace-nowrap">
          Crystal <span className="font-light text-black/50 uppercase">Autons</span>
        </h3>
      </div>

      <AnimatePresence>
        {showAgentsPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ left: cursorPos.x + 15, top: cursorPos.y + 15 }}
            className="fixed z-[100] bg-white rounded-xl p-3 w-[200px] max-w-[200px] shadow-xl text-center border border-black/10 pointer-events-none"
          >
            <p className="text-xs text-black/60 font-medium leading-relaxed">
              <span className="block font-semibold text-black mb-1">Autonomous Experts</span>
              Combine Instincts × Portals × Fusion into powerful autons. Run hundreds of autons at once. Parallel. 24/7. Either in the background or simultaneously.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function AIModelsItem() {
  const [showModelsPopup, setShowModelsPopup] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  return (
    <>
      <div 
        className="flex flex-col items-center text-center cursor-default"
        onMouseEnter={() => setShowModelsPopup(true)}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setShowModelsPopup(false)}
      >
        <h3 className="text-lg font-semibold tracking-tight mb-0 text-[#111]">AI Models</h3>
      </div>

      <AnimatePresence>
        {showModelsPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ left: cursorPos.x + 15, top: cursorPos.y + 15 }}
            className="fixed z-[100] bg-white rounded-xl p-3 w-[200px] max-w-[200px] shadow-xl text-center border border-black/10 pointer-events-none"
          >
            <p className="text-xs text-black/60 font-medium leading-relaxed">
              <span className="block font-semibold text-black mb-1">Ultimate Brainpower. Download and run any AI model privately & for free.</span>
              Connect and use any AI model seamlessly. Switch between the world's best models instantly. GPT-4, Claude 3, Gemini, and open-source models ready to go.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PromptsItem() {
  const [showPromptsPopup, setShowPromptsPopup] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  return (
    <>
      <div 
        className="flex flex-col items-center text-center cursor-default"
        onMouseEnter={() => setShowPromptsPopup(true)}
        onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setShowPromptsPopup(false)}
      >
        <h3 className="text-lg font-semibold tracking-tight mb-0 text-[#111]">Prompts</h3>
      </div>

      <AnimatePresence>
        {showPromptsPopup && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ left: cursorPos.x + 15, top: cursorPos.y + 15 }}
            className="fixed z-[100] bg-white rounded-xl p-3 w-[200px] max-w-[200px] shadow-xl text-center border border-black/10 pointer-events-none"
          >
            <p className="text-xs text-black/60 font-medium leading-relaxed">
              <span className="block font-semibold text-black mb-1">Master the art of instruction. A library of powerful prompts.</span>
              Save, share, and organize your prompts. Turn plain text into powerful, repeatable actions. Your personal library of intent.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FeaturesGrid({ name }: { name: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const features = [
    {
      icon: <Smartphone size={24} />,
      title: "Control via any device",
      desc: "Phone, laptop, tablet, or smartwatch. Access your companion's memory and capabilities from any screen, perfectly synced in real-time."
    },
    {
      icon: <Brain size={24} />,
      title: "Intelligence",
      desc: "Knows everything about you. Understands intent instantly. No prompts. Just talk naturally. Full memory — never forgets complex tasks from months ago."
    },
    {
      icon: <Shield size={24} />,
      title: "Privacy & Security",
      desc: "Runs fully on your device. No cloud. No data harvesting. No selling your data. On-device first — your data never leaves. You're the customer, not the product."
    },
    {
      icon: <Settings size={24} />,
      title: "Action & Control",
      desc: "Opens apps, edits files, manages tasks. Sends emails, texts, schedules events. Books rides, orders food, pays bills. Your device, fully under your control."
    },
    {
      icon: <Clock size={24} />,
      title: "Behavior",
      desc: "Remembers your preferences locally. Respects your time — no unnecessary noise. Calm, patient, never pushy."
    },
    {
      icon: <Mail size={24} />,
      title: "Personal Digital Identity",
      desc: "Has its own payment wallet, email, and phone number. Seamlessly connects and controls all your digital services, acting as a true proxy for your digital life."
    },
    {
      icon: <Zap size={24} />,
      title: "Always Running",
      desc: "Works offline. Runs across all your apps. Active in the background — even while you sleep."
    },
    {
      icon: <MessageSquare size={24} />,
      title: `Message ${name || 'them'} Anywhere`,
      desc: "WhatsApp, Telegram, Discord, iMessage. Signal, email, CLI. One companion, every channel."
    },
    {
      icon: <LayoutTemplate size={24} />,
      title: "Automations",
      desc: "Scheduled, recurring, trigger-based. Set it and forget it."
    },
    {
      icon: <LinkIcon size={24} />,
      title: "Already works with all your favorite apps.",
      desc: `${name || 'Zyfleron'} integrates deeply with the tools you use every day, making your workflow seamless and automated. No extra steps. No friction.`
    },
    {
      icon: <Globe size={24} />,
      title: "Full Internet Access",
      desc: "Searches, summarizes, compares. Real-time info. Privacy-first browsing."
    },
    {
      icon: <Smartphone size={24} />,
      title: "Your 2nd Device, Virtual",
      desc: "Spin up any Device, any OS. Have a personal, fully functional second device. Do anything on it – test, run apps, browse, compute."
    },
    {
      icon: <Sparkles size={24} />,
      title: "Smart. Efficient. Nice.",
      desc: "Smart – Understands intent. Efficient – Does in seconds what takes minutes. Nice – Friendly, patient, respectful."
    },
    {
      icon: <Cpu size={24} />,
      title: "Built to improve itself",
      desc: "Sleep Learning: Practices on simulated scenarios. Bayesian Logic: Refines decisions. Private Brain: Learns without sending data."
    },
    {
      icon: <AppWindow size={24} />,
      title: `${name || 'They'} as your OS`,
      desc: `Switch to ${name || 'Zyfleron'} -minimalist and simple. Or keep your OS and let ${name || 'them'} sit on top. One companion, deep integration.`
    },
    {
      icon: <Layers size={24} />,
      title: "Truly Multimodal",
      desc: "Processes text, voice, images, and video natively. Understands context across formats—show it a screen, talk about it, and get text back seamlessly."
    },
    {
      icon: <Github size={24} />,
      title: "Connected to GitHub, Install on localhost with one click.",
      desc: "Pull live updates, tools, scripts, and repos instantly!"
    }
  ];

  // Sync scroll position when index changes
  useEffect(() => {
    if (containerRef.current) {
      const card = containerRef.current.children[activeIndex] as HTMLElement;
      if (card) {
        const containerWidth = containerRef.current.offsetWidth;
        const cardWidth = card.offsetWidth;
        const scrollLeft = card.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
        
        containerRef.current.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    // Set a timeout to update the index after scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      if (!containerRef.current) return;
      const scrollLeft = containerRef.current.scrollLeft;
      const containerWidth = containerRef.current.offsetWidth;
      const center = scrollLeft + containerWidth / 2;
      
      const cards = Array.from(containerRef.current.children) as HTMLElement[];
      let closestIndex = activeIndex;
      let minDistance = Infinity;
      
      cards.forEach((card, i) => {
        if (i >= features.length) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(center - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      });
      
      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    }, 150); // Debounce scroll detection
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % features.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <section className="py-24 bg-neutral-100 border-b border-black/5 overflow-hidden w-full mb-3 mt-3" id="os">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">One companion. Your entire life.</h2>
          <p className="text-lg text-black/50 font-medium">Everything you need, handled quietly in the background.</p>
        </div>
      </div>

      <div className="relative group">
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth px-6 md:px-12 xl:px-[calc((100vw-72rem)/2)] after:content-[''] after:pr-6 md:after:pr-12 xl:after:pr-[calc((100vw-72rem)/2)] cursor-grab active:cursor-grabbing"
        >
          {features.map((feat, i) => (
            <div 
              key={i} 
              className="flex-none w-[85vw] sm:w-[340px] md:w-[380px] snap-center p-8 rounded-none bg-white border border-black/5 transition-colors whitespace-normal select-none relative h-[280px] overflow-hidden"
            >
              <div className="absolute top-6 left-6 p-2 text-white" style={{ backgroundColor: ['#86efac', '#c084fc', '#fbbf24', '#60a5fa', '#f87171', '#fb923c', '#d3d3d3', '#e879f9', '#4ade80', '#22d3ee', '#facc15', '#f472b6'][i % 12] }}>
                {feat.icon}
              </div>
              
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                 <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
                    {Array.from({ length: 64 }).map((_, idx) => {
                       const colors = ['#86efac', '#c084fc', '#fbbf24', '#60a5fa', '#f87171', '#fb923c', '#d3d3d3', '#e879f9', '#4ade80', '#22d3ee', '#facc15', '#f472b6'];
                       return (
                         <div key={idx} style={{ backgroundColor: Math.random() > 0.6 ? colors[i % colors.length] : 'transparent' }} />
                       );
                    })}
                 </div>
              </div>

              <div className="mt-20">
                <h3 className="text-xl font-semibold mb-3 tracking-tight">{feat.title}</h3>
                <p className="text-black/60 leading-relaxed text-sm">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center relative mt-8 px-6 md:px-12 xl:px-[calc((100vw-72rem)/2)]">
        <div className="absolute right-6 md:right-12 xl:right-[calc((100vw-72rem)/2)] flex items-center gap-1 bg-gray-100 p-1 rounded-full border border-black/5">
          <button 
            onClick={prevSlide}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white hover:shadow-sm active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={nextSlide}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-white hover:shadow-sm active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function CrystalsSection({ name, onOpenWaitlist }: { name: string, onOpenWaitlist: () => void }) {
  return (
    <div id="crystals" className="py-12 px-8 bg-neutral-50 border border-black/5 flex flex-col justify-center">
      <div className="w-full">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold tracking-widest text-[#0071e3] uppercase mb-2">Crystals</div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-3 text-balance text-[#111]">
            Everything else flows from {name || 'them'}.
          </h2>
          <p className="text-sm text-black/50 font-medium max-w-sm mx-auto">
            Every Crystal is a superpower. Just tell. Your {name || 'companion'} handles the rest.
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10 mt-10 mb-6">
          <DeviceShowcase name={name} onOpenWaitlist={onOpenWaitlist} />
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-10">
            <CrystalFusionItem />
            <CrystalAutonsItem />
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-10">
            <AIModelsItem />
            <PromptsItem />
          </div>
        </div>
      </div>
    </div>
  );
}

const asteriskPath = "M12 2v20M2 12h20m-3.07-7.07L5.07 19.07M19.07 19.07L5.07 4.93";

function MindMap({ name }: { name: string }) {
  const mindMapData = [
    {
      category: "Studies",
      x: 20, y: 35,
    },
    {
      category: "Business",
      x: 58, y: 22,
    },
    {
      category: "Daily Life",
      x: 74, y: 55,
    },
    {
      category: "Health & Finance",
      x: 55, y: 86,
    },
    {
      category: "Creative & Truth",
      x: 22, y: 78,
    }
  ];

  return (
    <div className="relative w-full aspect-[4/3] mx-auto py-10 overflow-visible select-none">
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">

        {/* Cross-branch connections */}
        <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} x1="20%" y1="35%" x2="22%" y2="78%" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
        <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} x1="20%" y1="35%" x2="58%" y2="22%" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
        <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} x1="58%" y1="22%" x2="74%" y2="55%" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
        <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} x1="74%" y1="55%" x2="55%" y2="86%" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
        <motion.line initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} x1="55%" y1="86%" x2="22%" y2="78%" stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
      </svg>

      <div className="absolute inset-0">
        {mindMapData.map((group) => (
          <div key={group.category}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ left: `${group.x}%`, top: `${group.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
            >
              <span className="text-lg font-serif font-medium text-black/80 whitespace-nowrap">{group.category}</span>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScatteredDiagram() {
  const nodes = [
    { label: "Studies", x: 20, y: 25 },
    { label: "Business", x: 80, y: 20 },
    { label: "Daily Life", x: 85, y: 55 },
    { label: "Health & Finance", x: 60, y: 80 },
    { label: "Creative & Truth", x: 15, y: 65 },
  ];

  return (
    <div className="relative w-full aspect-[4/3] mx-auto py-10 overflow-visible select-none">
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          {nodes.map((n1, i) => 
            nodes.map((n2, j) => {
              if (i >= j) return null;
              return (
                <motion.line
                  key={`${i}-${j}`}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.4 }}
                  viewport={{ once: true }}
                  x1={`${n1.x}%`} y1={`${n1.y}%`}
                  x2={`${n2.x}%`} y2={`${n2.y}%`}
                  stroke="#ff6b6b"
                  strokeWidth="0.8"
                />
              );
            })
          )}
        </svg>
        {nodes.map((node, i) => (
          <div 
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff6b6b] shadow-[0_0_8px_rgba(255,107,107,0.3)]" />
            <span className="text-lg font-serif font-medium text-black/80 whitespace-nowrap">
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PowerUpSection({ name }: { name: string }) {
  return (
    <section className="py-32 px-6 bg-white text-black relative overflow-hidden my-3 border-y border-black/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">Power up your life. Every part of it.</h2>
          <p className="text-lg text-black/50 font-medium mb-8">
            {name || 'Zyfleron'} isn't just for one thing. It's for everything.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="z-30"
          >
            <span className="text-2xl md:text-5xl font-serif font-medium tracking-tight text-black/95 drop-shadow-[0_0_30px_rgba(0,0,0,0.05)]">
              Unscattered.
            </span>
          </motion.div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <ScatteredDiagram />
            <MindMap name={name} />
          </div>
        </div>
      </div>
    </section>
  );
}


function MarqueeSection() {
  const commands = [
    "Remind me to take out the trash tomorrow morning at 7am",
    "Add milk, eggs, and bread to my shopping list",
    "What's the weather like this weekend?",
    "Set an alarm for 6:30am tomorrow",
    "Turn off all lights and lock the front door",
    "Order a pizza from the usual place",
    "Cancel my subscription to that app I never use",
    "Summarize the last 10 emails from my boss",
    "Convert this Google Doc to PDF and email it to client",
    "What did my friend say in our group chat last night?",
    "Track my water intake today",
    "Explain quantum physics like I'm 12",
    "Find the cheapest flight to New York"
  ];

  const commands2 = [
    "Draft a professional reply to this email",
    "Wish my dad happy birthday via text",
    "Mute Slack notifications until noon",
    "Find a hotel near the airport under $150",
    "Add 'buy birthday gift' to my to-do list",
    "Find a plumber near me",
    "Order more dog food from Chewy",
    "Suggest a movie to watch tonight",
    "Share my location with my sister",
    "Send \"on my way\" to Papa on WhatsApp"
  ];

  return (
    <div className="py-12 overflow-hidden bg-neutral-50 border border-black/5 flex flex-col justify-center">
      <div className="text-center mb-8 px-6">
        <h3 className="text-xl font-semibold tracking-tight text-[#111]">Daily Interactions</h3>
        <p className="text-sm text-black/50 font-medium">Just speak your mind.</p>
      </div>

      <div className="relative flex overflow-x-hidden group gap-3 mb-3 py-1">
        <motion.div 
          className="flex whitespace-nowrap gap-3 px-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {[...commands, ...commands].map((cmd, i) => (
             <div key={i} className="bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm text-xs font-medium text-black/80 flex-shrink-0">
               {cmd}
             </div>
          ))}
        </motion.div>
      </div>

       <div className="relative flex overflow-x-hidden group gap-3 py-1">
        <motion.div 
          className="flex whitespace-nowrap gap-3 px-2"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
        >
          {[...commands2, ...commands2].map((cmd, i) => (
             <div key={i} className="bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm text-xs font-medium text-black/80 flex-shrink-0">
               {cmd}
             </div>
          ))}
        </motion.div>
      </div>
      
      <div className="relative flex overflow-x-hidden group gap-3 mt-3 py-1">
        <motion.div 
          className="flex whitespace-nowrap gap-3 px-2"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {[...commands, ...commands].reverse().map((cmd, i) => (
             <div key={i} className="bg-white px-4 py-2 rounded-full border border-black/5 shadow-sm text-xs font-medium text-black/80 flex-shrink-0">
               {cmd}
             </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

const roles = [
  "assistant", "doer", "developer", "designer", "marketer", 
  "strategist", "advisor", "founder", "OS", "Companion", 
  "Partner", "computer", "Copilot", "Ally", "Agent", 
  "Teammate", "Guide", "Oracle", "Executor", "Wingman"
];

const sectors = [
  { title: "Business", genre: "For Enterprise", desc: "Accelerate your teams and streamline operations with intelligent, secure workflows tailored for scale.", btnText: "Scale Now" },
  { title: "Education", genre: "For Learning", desc: "Personalized learning paths, automated grading, and comprehensive research tools for modern academia.", btnText: "Learn More" },
  { title: "Legal", genre: "For Law", desc: "Rapid case discovery, contract analysis, and precedent synthesis with robust citation tracking.", btnText: "Analyze Case" },
  { title: "Healthcare", genre: "For Medicine", desc: "Secure patient data insights, diagnostic assistance, and administrative automation with HIPAA-ready capabilities.", btnText: "View Insights" },
  { title: "Government", genre: "For Public Sector", desc: "Secure infrastructure, public service optimization, and deep data analysis for country-level operations.", btnText: "Explore Ops" },
  { title: "Work", genre: "For Productivity", desc: "Your daily companion for emails, reports, meeting notes, and everything in between.", btnText: "Get Started" }
];

function EntertainmentShowcase({ name, onOpenWaitlist }: { name: string, onOpenWaitlist: () => void }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [sectorIndex, setSectorIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredSector, setHoveredSector] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setSectorIndex((prev) => (prev + 1) % sectors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    {
      title: "The intelligence ecosystem.",
      genre: "",
      desc: `Use ${name || 'Zyfleron'} to do it.`,
      color: "bg-white text-black",
      icon: <Brain size={24} stroke="black" />,
      btnText: "Click me",
      isWaitlist: false,
      type: "ecosystem"
    },
    {
      title: "Meet your all new AI",
      genre: "",
      desc: "Experience personal intelligence that knows you, helps you, and evolves with you.",
      color: "",
      icon: <LayoutTemplate size={24} />,
      btnText: "Learn more",
      isWaitlist: true,
      type: "new-ai"
    },
    {
      title: "",
      genre: "",
      desc: "",
      color: "bg-white text-black",
      icon: <LayoutTemplate size={24} stroke="black" />,
      btnText: "Explore Solutions",
      isWaitlist: false,
      type: "solutions",
      backgroundImage: bg4
    },
    {
      title: "Automate Your Team's Daily Tasks With AI in Minutes",
      genre: "Workflow Automation",
      desc: "Create workflows, assign tasks, and generate reports automatically.",
      color: "bg-white text-black",
      icon: <Layers size={24} />,
      btnText: "Start For Free",
      showTrusted: false,
      isWaitlist: false,
      type: "automation",
      features: [
        { icon: <Rocket size={20} />, title: "Boost Productivity", desc: "Automate repetitive tasks so your team can focus on high-impact work." },
        { icon: <Brain size={20} />, title: "Smart AI Workflows", desc: "Intelligent processes that adapt to how your team actually works." },
        { icon: <Clock size={20} />, title: "Save Hours in Minutes", desc: "What used to take hours now runs in minutes, less manual work, more output." },
        { icon: <MessageSquare size={20} />, title: "Automated Reporting", desc: "Generate real-time reports without manual effort, always up to date." }
      ]
    }
  ];

  // Infinite scroll logic
  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      containerRef.current.scrollLeft = scrollWidth / 3;
    }
  }, []);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth } = containerRef.current;
    const oneThird = scrollWidth / 3;

    if (scrollLeft < 100) {
      containerRef.current.scrollLeft = scrollLeft + oneThird;
    } else if (scrollLeft > (scrollWidth - containerRef.current.clientWidth - 100)) {
      containerRef.current.scrollLeft = scrollLeft - oneThird;
    }
  };

  return (
    <section className="py-24 bg-gray-100 overflow-hidden w-full mt-3">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#111]">
          Everything & Anything.
        </h2>
        <p className="text-2xl md:text-3xl text-black/40 font-medium mt-4">
          Possibilities...
        </p>
      </div>

      <div className="relative group">
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-4 px-4 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing snap-x snap-mandatory"
        >
          {[...cards, ...cards, ...cards].map((card, i) => (
            <div 
              key={i} 
              className={`flex-none w-[90vw] md:w-[1250px] h-[calc(90vw*668/1250)] md:h-[668px] relative overflow-hidden group border border-black/5 flex flex-col justify-end ${card.color || 'bg-white'} shadow-sm snap-center`}
            >
              <div 
                className="origin-top-left scale-[calc(90vw/1250)] md:scale-100 w-[1250px] h-[668px] absolute top-0 left-0 flex flex-col justify-end"
                style={card.backgroundImage ? { backgroundImage: `url(${card.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
              >
                {card.type === 'ecosystem' && (
                  <PixelAnimation 
                    backgroundColor="transparent" 
                    pixelGap={12} 
                    maxPixelSize={6} 
                    animationSpeed={0.5} 
                    colorHueRange={100}
                  />
                )}
                {card.type === 'new-ai' && (
                  <GradientBackground />
                )}
                {card.type === 'solutions' && (
                  <div className="flex flex-col gap-4 p-12">
                      {sectors.map((sector, idx) => (
                          <h4 
                            key={idx} 
                            className="font-bold text-2xl md:text-4xl cursor-pointer transition-colors text-white hover:text-white/80" 
                            onClick={onOpenWaitlist}
                            onMouseEnter={() => setHoveredSector(idx)}
                            onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
                            onMouseLeave={() => setHoveredSector(null)}
                          >
                              {sector.title}
                          </h4>
                      ))}
                      {hoveredSector !== null && (
                          <div
                            className="fixed z-[999] pointer-events-none p-4 bg-white border border-black/10 shadow-xl rounded-lg max-w-[200px]"
                            style={{ left: cursorPos.x + 15, top: cursorPos.y + 15 }}
                          >
                              <h4 className="font-bold text-sm mb-1">{sectors[hoveredSector].title}</h4>
                              <p className="text-xs text-black/40 mb-1">{sectors[hoveredSector].genre}</p>
                              <p className="text-xs text-black/60 leading-relaxed">{sectors[hoveredSector].desc}</p>
                          </div>
                      )}
                  </div>
                )}
                <div className={`relative p-10 md:p-14 flex flex-col ${card.type === 'automation' ? 'items-center' : 'items-start'} ${card.isWaitlist ? 'text-white' : 'text-black'} z-20 w-full`}>
                      {card.type === 'automation' ? (
                        <>
                          <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter w-full max-w-2xl text-center">
                            {card.title}
                          </h3>
                          <p className="text-lg md:text-xl font-medium text-black/60 max-w-lg mb-8 text-center">
                            {card.desc}
                          </p>
                      <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                      </div>
                      {card.features && (
                        <div className="grid grid-cols-4 gap-4">
                          {card.features.map((f, idx) => (
                            <div key={idx} className={`p-6 rounded-none bg-gray-50 border border-gray-100 ${
                              idx === 0 ? "col-start-1" :
                              idx === 1 ? "col-start-3" :
                              idx === 2 ? "col-start-2" :
                              idx === 3 ? "col-start-4" : ""
                            }`}>
                              <div className="flex flex-col gap-2">
                               <div className="flex items-center gap-3">
                                  <div className="text-gray-900">{f.icon}</div>
                                  <h4 className="font-bold tracking-tight">{f.title}</h4>
                               </div>
                               <p className="text-sm text-gray-500">{f.desc}</p>
                               </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                  <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter flex items-center gap-3 h-[1.2em] min-w-0">
                    {card.type === 'new-ai' ? (
                      <>
                        <span>{card.title}</span>
                        <span className={`relative flex-1 min-w-0 overflow-hidden h-[1.2em] min-w-[280px] md:min-w-[380px] ${card.isWaitlist ? 'text-white' : 'text-black'} translate-y-[4px]`}>
                          <AnimatePresence mode="popLayout">
                            <motion.span
                              key={roleIndex}
                              initial={{ opacity: 0, y: 40 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -40 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                              className="absolute left-0"
                            >
                              {roles[roleIndex]}
                            </motion.span>
                          </AnimatePresence>
                        </span>
                      </>
                    ) : (
                      card.title
                    )}
                  </h3>
                  )}
                  {card.type !== 'automation' && card.type !== 'solutions' && (
                    <div className="flex flex-wrap items-center gap-6 w-full">
                      <button 
                        onClick={onOpenWaitlist}
                        className={`px-10 py-3.5 ${card.isWaitlist ? 'bg-white text-black' : 'bg-black text-white'} rounded-full font-bold hover:opacity-90 transition-all hover:scale-105 active:scale-95 shadow-lg`}
                      >
                        {card.btnText}
                      </button>
                      {card.desc && card.type !== 'solutions' && (
                        <p className={`text-base md:text-lg font-medium ${card.isWaitlist ? 'text-white/60' : 'text-black/60'} max-w-2xl text-left`}>
                          {card.genre && (
                             <span className={`${card.isWaitlist ? 'text-white' : 'text-black'} font-bold`}>{card.genre} • </span>
                          )}
                          {card.desc}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer({ name }: { name: string }) {
  return (
    <footer className="bg-gray-100 text-[#111] pb-12 pt-8 px-6">
      <div className="max-w-5xl mx-auto border-t border-black/5 pt-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-black/40">
          <div>&copy; {new Date().getFullYear()} {name || 'Zyfleron'}. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}

