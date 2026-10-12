import React from 'react';
import { Cloud, Sparkles, Cpu, Layers, Box, Zap, Brain, Globe, Database, Flame, Hash, Terminal, Code, Laptop } from 'lucide-react';

interface ProviderIconProps {
  id: string;
  name?: string;
  className?: string;
}

export const ProviderIcon: React.FC<ProviderIconProps> = ({ id, name, className = 'w-4 h-4' }) => {
  const lowerId = id.toLowerCase();

  if (lowerId.includes('tokenhub')) {
    return (
      <div className="w-5 h-5 rounded-md bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
        <Cloud className="w-3.5 h-3.5 fill-white" />
      </div>
    );
  }
  if (lowerId.includes('gemini') || lowerId.includes('google')) {
    return (
      <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-blue-500 via-red-500 to-yellow-500 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
        G
      </div>
    );
  }
  if (lowerId.includes('deepseek')) {
    return (
      <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
        🐳
      </div>
    );
  }
  if (lowerId.includes('amd')) {
    return (
      <div className="w-5 h-5 rounded-md bg-black text-white flex items-center justify-center text-[9px] font-black tracking-tighter shadow-xs">
        AMD
      </div>
    );
  }
  if (lowerId.includes('antigravity')) {
    return (
      <div className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
        A
      </div>
    );
  }
  if (lowerId.includes('cherry')) {
    return (
      <div className="w-5 h-5 rounded-md bg-red-500 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
        🍒
      </div>
    );
  }
  if (lowerId.includes('silicon')) {
    return (
      <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
        <Layers className="w-3 h-3" />
      </div>
    );
  }
  if (lowerId.includes('zhipu')) {
    return (
      <div className="w-5 h-5 rounded-md bg-blue-700 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
        <Brain className="w-3 h-3" />
      </div>
    );
  }
  if (lowerId.includes('aihubmix')) {
    return (
      <div className="w-5 h-5 rounded-md bg-sky-500 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
        <Box className="w-3 h-3" />
      </div>
    );
  }
  if (lowerId.includes('ocoolai')) {
    return (
      <div className="w-5 h-5 rounded-md bg-emerald-600 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
        <Zap className="w-3 h-3" />
      </div>
    );
  }
  if (lowerId.includes('burncloud')) {
    return (
      <div className="w-5 h-5 rounded-md bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold shadow-xs">
        <Flame className="w-3 h-3" />
      </div>
    );
  }

  // Fallback icon
  return (
    <div className="w-5 h-5 rounded-md bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 text-[10px] font-bold">
      {name ? name.slice(0, 1).toUpperCase() : 'AI'}
    </div>
  );
};
