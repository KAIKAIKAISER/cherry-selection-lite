import React from 'react';
import { Languages, HelpCircle, ScanText, Search, ClipboardCopy, Wand2, Quote, Sparkles } from 'lucide-react';

interface ActionIconProps {
  id: string;
  className?: string;
}

export const ActionIcon: React.FC<ActionIconProps> = ({ id, className = 'w-4 h-4' }) => {
  switch (id) {
    case 'translate':
      return (
        <span className="font-semibold text-xs tracking-tighter inline-flex items-center">
          文A
        </span>
      );
    case 'explain':
      return (
        <span className="font-bold text-xs inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-current text-[11px] leading-none">
          ?
        </span>
      );
    case 'summary':
      return <ScanText className={className} />;
    case 'search':
      return <Search className={className} />;
    case 'copy':
      return <ClipboardCopy className={className} />;
    case 'refine':
      return <Wand2 className={className} />;
    case 'quote':
      return <Quote className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};
