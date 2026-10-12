import React from 'react';
import logo from '../assets/logo.png';

interface ProviderIconProps {
  id: string;
  name?: string;
  className?: string;
}

export const ProviderIcon: React.FC<ProviderIconProps> = ({ id, name, className = 'w-5 h-5' }) => {
  const lowerId = id.toLowerCase();

  // Cherry / CherryAI
  if (lowerId.includes('cherry')) {
    return (
      <img
        src={logo}
        alt="Cherry"
        className={`${className} rounded-full object-contain shrink-0`}
      />
    );
  }

  // DeepSeek
  if (lowerId.includes('deepseek')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#F0F4FF" />
        <path
          fill="#4D6BFE"
          d="M92.3161 40.0273C91.6283 39.6903 91.3298 40.3345 90.9292 40.6633C90.7909 40.7694 90.6747 40.908 90.5583 41.033C89.5508 42.112 88.3754 42.8187 86.8398 42.7344C84.5946 42.6094 82.6772 43.3161 80.9818 45.0393C80.6216 42.9138 79.4246 41.6473 77.6046 40.8319C76.6513 40.4079 75.6872 39.9866 75.0182 39.0652C74.5524 38.4101 74.4251 37.679 74.1922 36.9615C74.0433 36.5266 73.8943 36.0836 73.3986 36.0102C72.857 35.9259 72.6458 36.3798 72.4345 36.7604C71.5868 38.315 71.2591 40.0273 71.2916 41.7614C71.3647 45.6645 73.006 48.7738 76.2694 50.9835C76.6405 51.2363 76.7352 51.4918 76.6188 51.8615C76.3967 52.6225 76.1313 53.3618 75.8984 54.1255C75.7495 54.612 75.5273 54.7153 75.0073 54.506C73.2504 53.7482 71.6544 52.6595 70.3058 51.2988C67.9849 49.0483 65.8887 46.5641 63.2725 44.618C62.6662 44.1685 62.0438 43.7415 61.4064 43.3378C58.7388 40.7368 61.7585 38.6004 62.4573 38.3476C63.1885 38.0813 62.7091 37.1735 60.3475 37.1844C57.9859 37.1952 55.8247 37.9861 53.0703 39.0435C52.6611 39.2009 52.2399 39.3253 51.811 39.4158C49.2372 38.9291 46.6048 38.8356 44.003 39.1386C38.898 39.7094 34.822 42.1338 31.824 46.2679C28.222 51.2363 27.3743 56.8843 28.4115 62.7714C29.503 68.9793 32.6608 74.119 37.5113 78.1361C42.5433 82.3028 48.3363 84.344 54.9472 83.9526C58.9609 83.7216 63.4322 83.1807 68.4723 78.8972C69.7452 79.5332 71.0776 79.7859 73.293 79.9762C74.9993 80.1366 76.6405 79.8947 77.9107 79.6283C79.9012 79.2043 79.7631 77.3533 79.0454 77.0163C73.2091 74.2874 74.4901 75.3991 73.3228 74.4994C76.2911 70.9769 80.7597 67.3186 82.5093 55.4655C82.6447 54.5223 82.5283 53.9298 82.5093 53.1687C82.4984 52.7067 82.6041 52.5246 83.1322 52.473C84.5975 52.3204 86.0189 51.8819 87.3165 51.1819C91.097 49.1081 92.6245 45.7052 92.985 41.6228C93.0394 40.9977 92.9744 40.3562 92.3161 40.0273Z"
        />
      </svg>
    );
  }

  // SiliconFlow (硅基流动)
  if (lowerId.includes('silicon')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#F3EEFF" />
        <path
          fill="#6E29F6"
          fillRule="evenodd"
          d="M90.1725 45H61.9137C60.351 45 59.0863 46.2639 59.0863 47.8194V56.2723C59.0863 57.8305 57.8242 59.0917 56.2615 59.0917H30.8275C29.2648 59.0917 28 60.3528 28 61.9111V73.1833C28 74.7388 29.2648 76 30.8275 76H59.0863C60.649 76 61.9137 74.7388 61.9137 73.1833V64.7305C61.9137 63.1695 63.1758 61.9111 64.7385 61.9111H90.1725C91.7355 61.9111 93 60.6499 93 59.0917V47.8194C93 46.2639 91.7355 45 90.1725 45Z"
        />
      </svg>
    );
  }

  // OpenAI
  if (lowerId.includes('openai')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#10A37F" />
        <path
          fill="#FFFFFF"
          d="M60 30c-16.5 0-30 13.5-30 30 0 5.2 1.3 10 3.7 14.3l4.2-2.4c-1.8-3.6-2.9-7.7-2.9-11.9 0-13.8 11.2-25 25-25s25 11.2 25 25c0 4.2-1.1 8.3-2.9 11.9l4.2 2.4c2.4-4.3 3.7-9.1 3.7-14.3 0-16.5-13.5-30-30-30zm0 15c-8.3 0-15 6.7-15 15 0 2.6.7 5.1 1.9 7.2l4.3-2.5c-.8-1.4-1.2-3-1.2-4.7 0-5.5 4.5-10 10-10s10 4.5 10 10c0 1.7-.4 3.3-1.2 4.7l4.3 2.5c1.2-2.1 1.9-4.6 1.9-7.2 0-8.3-6.7-15-15-15z"
        />
        <circle cx="60" cy="60" r="8" fill="#FFFFFF" />
      </svg>
    );
  }

  // Anthropic / Claude
  if (lowerId.includes('anthropic') || lowerId.includes('claude')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#CA9F7B" />
        <path
          fill="#191918"
          d="M74.865 37H64.9209L83.0554 83H93L74.865 37ZM46.1348 37L28 83H38.1405L41.8491 73.3403H60.8216L64.5298 83H74.6702L56.5352 37H46.1348ZM45.5566 63.6811L51.3354 48.6186L57.1143 63.6811H45.5566Z"
        />
      </svg>
    );
  }

  // Moonshot / Kimi
  if (lowerId.includes('moonshot') || lowerId.includes('kimi')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#18181B" />
        <circle cx="50" cy="60" r="24" fill="#38BDF8" />
        <circle cx="62" cy="60" r="22" fill="#18181B" />
      </svg>
    );
  }

  // Zhipu (智谱 AI)
  if (lowerId.includes('zhipu')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#3859FF" />
        <path
          fill="#FFFFFF"
          d="M36 40h48v8H36zm0 16h36v8H36zm0 16h48v8H36z"
        />
        <circle cx="84" cy="68" r="5" fill="#60A5FA" />
      </svg>
    );
  }

  // Google / Gemini
  if (lowerId.includes('google') || lowerId.includes('gemini')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#FFFFFF" />
        <path
          fill="#4285F4"
          d="M60 30c16.5 0 28.5 7.5 35 13.5l-14 14c-4.5-4-11.5-8-21-8-16.5 0-30 13.5-30 30.5s13.5 30.5 30 30.5c19 0 26.5-13.5 27.5-20.5H60V72h48c.5 2.5 1 5.5 1 9 0 28.5-19.5 49-49 49-33 0-60-27-60-60s27-60 60-60z"
          transform="scale(0.8) translate(15, 15)"
        />
      </svg>
    );
  }

  // Baichuan (百川智能)
  if (lowerId.includes('baichuan')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#FF5E00" />
        <path
          fill="#FFFFFF"
          d="M48.6657 30H39.2111L33.302 42.7824V76.61L27 89H42.3636L48.3554 76.61L48.6657 30ZM70.3343 30H54.9707V89H70.3343V30ZM76.6364 46.9124H92V89H76.6364V46.9124ZM92 30H76.6364V42.1923H92V30Z"
        />
      </svg>
    );
  }

  // Doubao / Bytedance (豆包 / 字节跳动)
  if (lowerId.includes('doubao') || lowerId.includes('bytedance')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#1E40AF" />
        <path
          fill="#00EAD1"
          d="M69.1986 78.0514L64.1641 76.7367V52.7107L69.5531 51.3456C72.5076 50.5952 74.9894 49.9835 75.1075 50.0072C75.2021 50.0072 75.273 56.6106 75.273 64.6971V79.3898L74.753 79.3659C74.4458 79.3659 71.9403 78.7576"
        />
        <rect x="36" y="44" width="20" height="32" rx="4" fill="#3B82F6" />
      </svg>
    );
  }

  // Bailian / DashScope (阿里百炼 / 通义千问)
  if (lowerId.includes('bailian') || lowerId.includes('dashscope')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#6366F1" />
        <path
          fill="#FFFFFF"
          d="M45.4547 52.1572V68.8473L59.9047 60.4967L45.4574 52.1599L45.4547 52.1572Z"
        />
        <path fill="#00EAD1" d="M60 40l16 10v20L60 80z" />
      </svg>
    );
  }

  // Groq
  if (lowerId.includes('groq')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#F54F35" />
        <text x="60" y="74" fill="#FFFFFF" fontSize="42" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
          g
        </text>
      </svg>
    );
  }

  // Ollama
  if (lowerId.includes('ollama')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#000000" />
        <circle cx="60" cy="60" r="26" fill="#FFFFFF" />
        <circle cx="52" cy="56" r="4" fill="#000000" />
        <circle cx="68" cy="56" r="4" fill="#000000" />
        <ellipse cx="60" cy="68" rx="8" ry="4" fill="#000000" />
      </svg>
    );
  }

  // TokenHub
  if (lowerId.includes('tokenhub')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#0284C7" />
        <path
          fill="#FFFFFF"
          d="M40 70c0-11 9-20 20-20 3.5 0 6.8 1 9.5 2.7C72.8 45.7 80 41 88 41c11 0 20 9 20 20 0 1.6-.2 3.2-.6 4.8C109.8 68 112 73 112 78c0 8.8-7.2 16-16 16H44c-8.8 0-16-7.2-16-16 0-5.5 2.8-10.4 7.2-13.3.4-1.5.8-3.1.8-4.7z"
          transform="scale(0.8) translate(12, 10)"
        />
      </svg>
    );
  }

  // BurnCloud
  if (lowerId.includes('burncloud')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#EA580C" />
        <path
          fill="#FFFFFF"
          d="M60 30c2 12-5 20-10 28-5 8-8 16-8 25 0 18 15 32 33 32s33-14 33-32c0-12-6-22-15-30 0 0-2 15-13 20 0-14-8-31-20-43z"
        />
      </svg>
    );
  }

  // AiHubMix
  if (lowerId.includes('aihubmix')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#006FFB" />
        <path fill="#FFFFFF" d="M60 32L86 47v30L60 92 34 77V47z" />
      </svg>
    );
  }

  // LM Studio
  if (lowerId.includes('lmstudio')) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} shrink-0 rounded-md`}>
        <rect width="120" height="120" rx="24" fill="#6366F1" />
        <rect x="36" y="36" width="48" height="48" rx="8" fill="#FFFFFF" />
        <circle cx="50" cy="50" r="5" fill="#4F46E5" />
        <circle cx="70" cy="70" r="5" fill="#4F46E5" />
      </svg>
    );
  }

  // Default / fallback
  const initial = name ? name.slice(0, 1).toUpperCase() : id.slice(0, 1).toUpperCase();
  return (
    <div
      className={`${className} rounded-md bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-200 text-[11px] font-bold shrink-0 select-none shadow-xs`}
    >
      {initial}
    </div>
  );
};
