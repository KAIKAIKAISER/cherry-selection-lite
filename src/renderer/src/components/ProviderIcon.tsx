import React from 'react';
import logo from '../assets/logo.png';

// Dynamically glob all provider SVG icons from Cherry Studio
const lightIcons = import.meta.glob('../assets/providers/light/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const darkIcons = import.meta.glob('../assets/providers/dark/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

// Helper mapping for provider IDs to icon filenames
const iconAliasMap: Record<string, string> = {
  gemini: 'google',
  silicon: 'silicon',
  deepseek: 'deepseek',
  cherryin: 'cherryin',
  zhipu: 'zhipu',
  moonshot: 'moonshot',
  dashscope: 'dashscope',
  doubao: 'doubao',
  minimax: 'minimax',
  '302ai': '302ai',
  aihubmix: 'aihubmix',
  openrouter: 'openrouter',
  ollama: 'ollama',
  groq: 'groq',
  anthropic: 'anthropic',
  openai: 'openai',
  azure: 'azureai',
  'azure-openai': 'azureai',
  vertexai: 'vertexai',
  cohere: 'cohere',
  together: 'together',
  mistral: 'mistral',
  perplexity: 'perplexity',
  tokenhub: 'tencent-cloud-ti',
};

interface ProviderIconProps {
  id: string;
  name?: string;
  className?: string;
}

export const ProviderIcon: React.FC<ProviderIconProps> = ({ id, name, className = 'w-5 h-5' }) => {
  const lowerId = id.toLowerCase();

  // Cherry branding
  if (lowerId.includes('cherry')) {
    return (
      <img
        src={logo}
        alt="Cherry"
        className={`${className} rounded-full object-contain shrink-0`}
        draggable={false}
      />
    );
  }

  // Check alias map or direct ID
  const targetName = iconAliasMap[lowerId] || lowerId;

  // Search in lightIcons / darkIcons
  for (const [path, url] of Object.entries(lightIcons)) {
    if (path.endsWith(`/${targetName}.svg`)) {
      return (
        <img
          src={url}
          alt={name || id}
          className={`${className} object-contain shrink-0 rounded-sm`}
          draggable={false}
        />
      );
    }
  }

  // Fallback: Initial letter icon with pleasant color
  const initial = (name || id).slice(0, 1).toUpperCase();
  const colors = [
    'bg-rose-500',
    'bg-blue-500',
    'bg-emerald-500',
    'bg-violet-500',
    'bg-amber-500',
    'bg-cyan-500',
    'bg-indigo-500',
  ];
  const charCode = lowerId.charCodeAt(0) || 0;
  const colorClass = colors[charCode % colors.length];

  return (
    <div
      className={`${className} ${colorClass} text-white font-semibold text-[11px] flex items-center justify-center rounded-md select-none shrink-0 shadow-sm`}
    >
      {initial}
    </div>
  );
};
