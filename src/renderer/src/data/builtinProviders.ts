/* Auto-generated from Cherry Studio Provider Registry */
export interface ProviderWebsite {
  official?: string;
  apiKey?: string;
  docs?: string;
  models?: string;
}

export interface ProviderModel {
  id: string;
  name: string;
  group?: string;
  enabled: boolean;
}

export interface ProviderConfigItem {
  id: string;
  name: string;
  description?: string;
  baseUrl: string;
  defaultBaseUrl: string;
  apiKey: string;
  proxyUrl?: string;
  enabled: boolean;
  isBuiltIn: boolean;
  website?: ProviderWebsite;
  defaultChatEndpoint?: string;
  models: ProviderModel[];
}

export const BUILTIN_PROVIDERS: ProviderConfigItem[] = [
  {
    "id": "cherryin",
    "name": "CherryIN",
    "description": "CherryIN - AI model provider",
    "baseUrl": "https://open.cherryin.net",
    "defaultBaseUrl": "https://open.cherryin.net",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://open.cherryin.ai",
      "apiKey": "https://open.cherryin.ai/console/token",
      "docs": "https://open.cherryin.ai",
      "models": "https://open.cherryin.ai/pricing"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "deepseek/deepseek-v3.2",
        "name": "deepseek-v3-2",
        "group": "cherryin",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-122b-a10b",
        "name": "qwen3-5-122b-a10b",
        "group": "cherryin",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-27b",
        "name": "qwen3-5-27b",
        "group": "cherryin",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-35b-a3b",
        "name": "qwen3-5-35b-a3b",
        "group": "cherryin",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-35b-a3b(free)",
        "name": "qwen3-5-35b-a3b-free",
        "group": "cherryin",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-397b-a17b",
        "name": "qwen3-5-397b-a17b",
        "group": "cherryin",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-4b(free)",
        "name": "qwen3-5-4b",
        "group": "cherryin",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-9b",
        "name": "qwen3-5-9b",
        "group": "cherryin",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-9b(free)",
        "name": "qwen3-5-9b-free",
        "group": "cherryin",
        "enabled": true
      }
    ]
  },
  {
    "id": "silicon",
    "name": "Silicon",
    "description": "Silicon - AI model provider",
    "baseUrl": "https://api.siliconflow.cn/v1",
    "defaultBaseUrl": "https://api.siliconflow.cn/v1",
    "apiKey": "",
    "enabled": true,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.siliconflow.cn",
      "apiKey": "https://cloud.siliconflow.cn/i/d1nTBKXU",
      "docs": "https://docs.siliconflow.cn/",
      "models": "https://cloud.siliconflow.cn/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "deepseek-ai/DeepSeek-R1",
        "name": "deepseek-r1",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V3",
        "name": "deepseek-v3",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V3.1",
        "name": "deepseek-v3-1",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V3.1-Terminus",
        "name": "deepseek-v3-1-terminus",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V3.2",
        "name": "deepseek-v3-2",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V3.2-Exp",
        "name": "deepseek-v3-2-exp",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V4-Flash",
        "name": "deepseek-v4-flash",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V4-Pro",
        "name": "deepseek-v4-pro",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "baidu/ERNIE-4.5-300B-A47B",
        "name": "ernie-4-5-300b-a47b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "google/gemma-4-26B-A4B-it",
        "name": "gemma-4-26b-a4b-it",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "google/gemma-4-31B-it",
        "name": "gemma-4-31b-it",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-4.5-Air",
        "name": "glm-4-5-air",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-5",
        "name": "glm-5",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-5.1",
        "name": "glm-5-1",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-5.2",
        "name": "glm-5-2",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-5V-Turbo",
        "name": "glm-5v-turbo",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "openai/gpt-oss-120b",
        "name": "gpt-oss-120b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "openai/gpt-oss-20b",
        "name": "gpt-oss-20b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "tencent/Hunyuan-A13B-Instruct",
        "name": "hunyuan-a13b-instruct",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "tencent/Hy3-preview",
        "name": "hy3-preview",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "moonshotai/Kimi-K2.5",
        "name": "kimi-k2-5",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "moonshotai/Kimi-K2.6",
        "name": "kimi-k2-6",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "inclusionAI/Ling-flash-2.0",
        "name": "ling-flash-2-0",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "MiniMaxAI/MiniMax-M2.5",
        "name": "minimax-m2-5",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen2.5-72B-Instruct",
        "name": "qwen2-5-72b-instruct",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen2.5-7B-Instruct",
        "name": "qwen2-5-7b-instruct",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-14B",
        "name": "qwen3-14b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-235B-A22B-Thinking-2507",
        "name": "qwen3-235b-a22b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-30B-A3B-Instruct-2507",
        "name": "qwen3-30b-a3b-instruct",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-32B",
        "name": "qwen3-32b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3.5-122B-A10B",
        "name": "qwen3-5-122b-a10b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3.5-27B",
        "name": "qwen3-5-27b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3.5-35B-A3B",
        "name": "qwen3-5-35b-a3b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3.5-397B-A17B",
        "name": "qwen3-5-397b-a17b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3.5-9B",
        "name": "qwen3-5-9b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3.6-27B",
        "name": "qwen3-6-27b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3.6-35B-A3B",
        "name": "qwen3-6-35b-a3b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-8B",
        "name": "qwen3-8b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-Coder-30B-A3B-Instruct",
        "name": "qwen3-coder-30b-a3b-instruct",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-Coder-480B-A35B-Instruct",
        "name": "qwen3-coder-480b-a35b-instruct",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-VL-235B-A22B-Thinking",
        "name": "qwen3-vl-235b-a22b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-VL-235B-A22B-Instruct",
        "name": "qwen3-vl-235b-a22b-instruct",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-VL-30B-A3B-Thinking",
        "name": "qwen3-vl-30b-a3b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-VL-30B-A3B-Instruct",
        "name": "qwen3-vl-30b-a3b-instruct",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-VL-32B-Thinking",
        "name": "qwen3-vl-32b",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-VL-32B-Instruct",
        "name": "qwen3-vl-32b-instruct",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-VL-8B-Instruct",
        "name": "qwen3-vl-8b-instruct",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "ByteDance-Seed/Seed-OSS-36B-Instruct",
        "name": "seed-oss-36b-instruct",
        "group": "silicon",
        "enabled": true
      },
      {
        "id": "stepfun-ai/Step-3.5-Flash",
        "name": "step-3-5-flash",
        "group": "silicon",
        "enabled": true
      }
    ]
  },
  {
    "id": "aihubmix",
    "name": "AiHubMix",
    "description": "AiHubMix - AI model provider",
    "baseUrl": "https://aihubmix.com/v1",
    "defaultBaseUrl": "https://aihubmix.com/v1",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://aihubmix.com",
      "apiKey": "https://aihubmix.com",
      "docs": "https://doc.aihubmix.com/",
      "models": "https://aihubmix.com/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "doubao-seedream-4-0",
        "name": "doubao-seedream-4-0",
        "group": "aihubmix",
        "enabled": true
      },
      {
        "id": "doubao-seedream-4-5",
        "name": "doubao-seedream-4-5",
        "group": "aihubmix",
        "enabled": true
      },
      {
        "id": "ernie-irag-edit",
        "name": "ernie-irag-edit",
        "group": "aihubmix",
        "enabled": true
      },
      {
        "id": "flux-2-flex",
        "name": "flux-2-flex",
        "group": "aihubmix",
        "enabled": true
      },
      {
        "id": "flux-2-pro",
        "name": "flux-2-pro",
        "group": "aihubmix",
        "enabled": true
      },
      {
        "id": "ideogram/V3",
        "name": "ideogram-v3",
        "group": "aihubmix",
        "enabled": true
      },
      {
        "id": "imagen-3.0-generate-002",
        "name": "imagen-3-0-generate-002",
        "group": "aihubmix",
        "enabled": true
      },
      {
        "id": "imagen-4.0-fast-generate-001",
        "name": "imagen-4-0-fast-generate-001",
        "group": "aihubmix",
        "enabled": true
      },
      {
        "id": "imagen-4.0-generate-001",
        "name": "imagen-4-0-generate-001",
        "group": "aihubmix",
        "enabled": true
      },
      {
        "id": "imagen-4.0-ultra-generate-001",
        "name": "imagen-4-0-ultra-generate-001",
        "group": "aihubmix",
        "enabled": true
      },
      {
        "id": "irag-1.0",
        "name": "irag-1-0",
        "group": "aihubmix",
        "enabled": true
      },
      {
        "id": "qwen-image",
        "name": "qwen-image",
        "group": "aihubmix",
        "enabled": true
      },
      {
        "id": "qwen-image-edit",
        "name": "qwen-image-edit",
        "group": "aihubmix",
        "enabled": true
      }
    ]
  },
  {
    "id": "ovms",
    "name": "OpenVINO Model Server",
    "description": "OpenVINO Model Server - AI model provider",
    "baseUrl": "http://localhost:8000/v3/",
    "defaultBaseUrl": "http://localhost:8000/v3/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.intel.com/content/www/us/en/developer/tools/openvino-toolkit/overview.html",
      "apiKey": "",
      "docs": "https://docs.openvino.ai/2025/model-server/ovms_what_is_openvino_model_server.html",
      "models": "https://www.modelscope.cn/organization/OpenVINO"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "ovms",
        "enabled": true
      }
    ]
  },
  {
    "id": "ocoolai",
    "name": "ocoolAI",
    "description": "ocoolAI - AI model provider",
    "baseUrl": "https://api.ocoolai.com",
    "defaultBaseUrl": "https://api.ocoolai.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://one.ocoolai.com/",
      "apiKey": "https://one.ocoolai.com/token",
      "docs": "https://docs.ocoolai.com/",
      "models": "https://api.ocoolai.com/info/models/"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "ocoolai",
        "enabled": true
      }
    ]
  },
  {
    "id": "zhipu",
    "name": "ZhiPu",
    "description": "ZhiPu - AI model provider",
    "baseUrl": "https://open.bigmodel.cn/api/paas/v4/",
    "defaultBaseUrl": "https://open.bigmodel.cn/api/paas/v4/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://open.bigmodel.cn/",
      "apiKey": "https://open.bigmodel.cn/apikey/platform",
      "docs": "https://docs.bigmodel.cn/",
      "models": "https://open.bigmodel.cn/modelcenter/square"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "cogview-4",
        "name": "cogview-4",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "embedding-3",
        "name": "Embedding-3",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-3-turbo",
        "name": "GLM-3-Turbo",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4",
        "name": "GLM-4",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-1v",
        "name": "GLM-4.1V-Thinking",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-5",
        "name": "GLM 4.5",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-5-air",
        "name": "GLM 4.5 Air",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-5-flash",
        "name": "GLM-4.5-Flash",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-5v",
        "name": "GLM 4.5V",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-6",
        "name": "GLM 4.6",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-6v",
        "name": "GLM-4.6V",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-7",
        "name": "GLM 4.7",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-7-flash",
        "name": "GLM 4.7 Flash",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-7-flashx",
        "name": "GLM 4.7 FlashX",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-7-maas",
        "name": "GLM-4.7",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-air",
        "name": "GLM-4-Air",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-airx",
        "name": "GLM-4-AirX",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-flash",
        "name": "GLM-4-Flash",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-flashx",
        "name": "GLM-4-FlashX",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-long",
        "name": "GLM-4-Long",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4-plus",
        "name": "GLM-4-Plus",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4v",
        "name": "GLM-4V",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4v-flash",
        "name": "GLM-4V-Flash",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-4v-plus",
        "name": "GLM-4V-Plus",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5",
        "name": "GLM-5",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5-1",
        "name": "GLM-5.1",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5-2",
        "name": "GLM-5.2",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5-2-fast",
        "name": "GLM 5.2 Fast",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5-3",
        "name": "GLM 5.3",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5-3-fast",
        "name": "GLM 5.3 Fast",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5-3-flash",
        "name": "GLM-5.3-Flash",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5-maas",
        "name": "GLM-5",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5-turbo",
        "name": "GLM 5 Turbo",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5v-turbo",
        "name": "GLM 5V Turbo",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-flash-latest",
        "name": "Z.ai: GLM Flash Latest",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-image",
        "name": "glm-image",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-latest",
        "name": "Z.ai: GLM Latest",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-z1",
        "name": "GLM-Z1",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-z1-air",
        "name": "GLM-Z1-Air",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-z1-airx",
        "name": "GLM-Z1-AirX",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-z1-flash",
        "name": "GLM-Z1-Flash",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5.2",
        "name": "glm-5-2",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5.2-fast",
        "name": "glm-5-2-fast",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5.3",
        "name": "glm-5-3",
        "group": "zhipu",
        "enabled": true
      },
      {
        "id": "glm-5.3-flash",
        "name": "glm-5-3-flash",
        "group": "zhipu",
        "enabled": true
      }
    ]
  },
  {
    "id": "deepseek",
    "name": "deepseek",
    "description": "deepseek - AI model provider",
    "baseUrl": "https://api.deepseek.com",
    "defaultBaseUrl": "https://api.deepseek.com",
    "apiKey": "",
    "enabled": true,
    "isBuiltIn": true,
    "website": {
      "official": "https://deepseek.com/",
      "apiKey": "https://platform.deepseek.com/api_keys",
      "docs": "https://api-docs.deepseek.com/",
      "models": "https://api-docs.deepseek.com/"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "deepseek-chat",
        "name": "DeepSeek: DeepSeek V3",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-chat-v3",
        "name": "DeepSeek: DeepSeek V3 0324",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-chat-v3-1",
        "name": "DeepSeek: DeepSeek V3.1",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-flash",
        "name": "deepseek-flash",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-r1",
        "name": "DeepSeek R1",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-r1-distill-llama-70b",
        "name": "DeepSeek R1 Distill Llama 70B",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-r1-distill-llama-8b",
        "name": "DeepSeek R1 Distill Llama 8B",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-r1-distill-qwen-1-5b",
        "name": "DeepSeek R1 Distill Qwen 1.5B",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-r1-distill-qwen-14b",
        "name": "DeepSeek R1 Distill Qwen 14B",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-r1-distill-qwen-32b",
        "name": "DeepSeek R1 Distill Qwen 32B",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-r1-distill-qwen-7b",
        "name": "DeepSeek R1 Distill Qwen 7B",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-v3",
        "name": "DeepSeek V3",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-v3-1",
        "name": "DeepSeek V3.1",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-v3-1-maas",
        "name": "DeepSeek V3.1",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-v3-1-terminus",
        "name": "siliconflow/deepseek-v3.1-terminus",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-v3-2",
        "name": "siliconflow/deepseek-v3.2",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-v3-2-exp",
        "name": "DeepSeek V3.2 Exp",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-v3-2-maas",
        "name": "DeepSeek V3.2",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-v4-1-flash",
        "name": "DeepSeek: DeepSeek V4.1 Flash",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-v4-1-flash-beta",
        "name": "DeepSeek V4.1 Flash Beta",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-v4-flash",
        "name": "DeepSeek V4 Flash",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-v4-flash-vision-exp",
        "name": "DeepSeek V4 Flash Vision Exp",
        "group": "deepseek",
        "enabled": true
      },
      {
        "id": "deepseek-v4-pro",
        "name": "deepseek-v4-pro",
        "group": "deepseek",
        "enabled": true
      }
    ]
  },
  {
    "id": "alayanew",
    "name": "AlayaNew",
    "description": "AlayaNew - AI model provider",
    "baseUrl": "https://deepseek.alayanew.com",
    "defaultBaseUrl": "https://deepseek.alayanew.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.alayanew.com/",
      "apiKey": "https://www.alayanew.com/",
      "docs": "https://docs.alayanew.com/docs/modelService/interview",
      "models": "https://www.alayanew.com/product/deepseek"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "alayanew",
        "enabled": true
      }
    ]
  },
  {
    "id": "dmxapi",
    "name": "DMXAPI",
    "description": "DMXAPI - AI model provider",
    "baseUrl": "https://www.dmxapi.cn",
    "defaultBaseUrl": "https://www.dmxapi.cn",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.dmxapi.cn/",
      "apiKey": "https://www.dmxapi.cn/",
      "docs": "https://doc.dmxapi.cn/",
      "models": "https://www.dmxapi.cn/pricing"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "dall-e-3",
        "name": "dall-e-3",
        "group": "dmxapi",
        "enabled": true
      },
      {
        "id": "doubao-seedream-4-0",
        "name": "doubao-seedream-4-0",
        "group": "dmxapi",
        "enabled": true
      },
      {
        "id": "doubao-seedream-4-5",
        "name": "doubao-seedream-4-5",
        "group": "dmxapi",
        "enabled": true
      },
      {
        "id": "doubao-seedream-5.0-lite",
        "name": "doubao-seedream-5-0-lite",
        "group": "dmxapi",
        "enabled": true
      },
      {
        "id": "gemini-2.5-flash-image",
        "name": "gemini-2-5-flash-image",
        "group": "dmxapi",
        "enabled": true
      },
      {
        "id": "gemini-3.1-flash-image-preview",
        "name": "gemini-3-1-flash-image-preview",
        "group": "dmxapi",
        "enabled": true
      },
      {
        "id": "gpt-image-1.5",
        "name": "gpt-image-1-5",
        "group": "dmxapi",
        "enabled": true
      },
      {
        "id": "musesteamer-air-image",
        "name": "musesteamer-air-image",
        "group": "dmxapi",
        "enabled": true
      },
      {
        "id": "nano-banana",
        "name": "nano-banana",
        "group": "dmxapi",
        "enabled": true
      },
      {
        "id": "nano-banana-2",
        "name": "nano-banana-2",
        "group": "dmxapi",
        "enabled": true
      },
      {
        "id": "qwen-image",
        "name": "qwen-image",
        "group": "dmxapi",
        "enabled": true
      },
      {
        "id": "wan2.6-t2i",
        "name": "wan2-6-t2i",
        "group": "dmxapi",
        "enabled": true
      }
    ]
  },
  {
    "id": "aionly",
    "name": "AIOnly",
    "description": "AIOnly - AI model provider",
    "baseUrl": "https://api.aiionly.com",
    "defaultBaseUrl": "https://api.aiionly.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.aiionly.com",
      "apiKey": "https://maas.aiionly.com/keyApi",
      "docs": "https://maas.aiionly.com/document",
      "models": "https://maas.aiionly.com"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "aionly",
        "enabled": true
      }
    ]
  },
  {
    "id": "burncloud",
    "name": "BurnCloud",
    "description": "BurnCloud - AI model provider",
    "baseUrl": "https://ai.burncloud.com",
    "defaultBaseUrl": "https://ai.burncloud.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://ai.burncloud.com/",
      "apiKey": "https://ai.burncloud.com/token",
      "docs": "https://ai.burncloud.com/docs",
      "models": "https://ai.burncloud.com/pricing"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "burncloud",
        "enabled": true
      }
    ]
  },
  {
    "id": "302ai",
    "name": "302.AI",
    "description": "302.AI - AI model provider",
    "baseUrl": "https://api.302.ai",
    "defaultBaseUrl": "https://api.302.ai",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://302.ai",
      "apiKey": "https://dash.302.ai/apis/list",
      "docs": "https://302ai.apifox.cn/api-147522039",
      "models": "https://302.ai/pricing/"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "claude-fable-5",
        "name": "claude-fable-5",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "claude-fable-5-1",
        "name": "claude-fable-5-1",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "claude-haiku-4-5-20251001",
        "name": "claude-haiku-4-5",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "claude-opus-4-1-20250805",
        "name": "claude-opus-4-1",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "claude-opus-4-5-20251101",
        "name": "claude-opus-4-5",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "claude-opus-4-7-thinking",
        "name": "claude-opus-4-7",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "claude-opus-4-8",
        "name": "claude-opus-4-8",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "claude-opus-5",
        "name": "claude-opus-5",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4-5-20250929-thinking",
        "name": "claude-sonnet-4-5",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4-6",
        "name": "claude-sonnet-4-6",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "claude-sonnet-5",
        "name": "claude-sonnet-5",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "deepseek-v3.2-thinking",
        "name": "deepseek-v3-2",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "doubao-seed-1-6-thinking-250715",
        "name": "doubao-seed-1-6",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "doubao-seed-1-6-vision-250815",
        "name": "doubao-seed-1-6-vision",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "doubao-seed-1-8-251215",
        "name": "doubao-seed-1-8",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-2.0-flash-lite",
        "name": "gemini-2-0-flash-lite",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-2.5-flash-nothink",
        "name": "gemini-2-5-flash",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-2.5-flash-image",
        "name": "gemini-2-5-flash-image",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-2.5-flash-lite-preview-09-2025",
        "name": "gemini-2-5-flash-lite-preview-09-2025",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-2.5-flash-preview-09-2025",
        "name": "gemini-2-5-flash-preview-09-2025",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-2.5-pro",
        "name": "gemini-2-5-pro",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-3.1-flash-image-preview",
        "name": "gemini-3-1-flash-image-preview",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-3.1-flash-lite",
        "name": "gemini-3-1-flash-lite",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-3.1-flash-lite-preview",
        "name": "gemini-3-1-flash-lite-preview",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-3.1-pro-preview",
        "name": "gemini-3-1-pro-preview",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-3.5-flash-thinking",
        "name": "gemini-3-5-flash",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-3.5-flash-lite",
        "name": "gemini-3-5-flash-lite",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-3.6-flash",
        "name": "gemini-3-6-flash",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-3.7-flash",
        "name": "gemini-3-7-flash",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-3.8-flash",
        "name": "gemini-3-8-flash",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-3-flash-preview",
        "name": "gemini-3-flash-preview",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-3-pro-image-preview",
        "name": "gemini-3-pro-image-preview",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gemini-3-pro-preview",
        "name": "gemini-3-pro-preview",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "glm-4.5",
        "name": "glm-4-5",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "glm-4.5v",
        "name": "glm-4-5v",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "glm-4.6",
        "name": "glm-4-6",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "glm-4.6v",
        "name": "glm-4-6v",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "glm-4.7",
        "name": "glm-4-7",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "glm-5",
        "name": "glm-5",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "glm-5.1",
        "name": "glm-5-1",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "glm-5.2",
        "name": "glm-5-2",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "glm-5.3",
        "name": "glm-5-3",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "glm-5.3-flash",
        "name": "glm-5-3-flash",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "glm-5-turbo",
        "name": "glm-5-turbo",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "glm-5v-turbo",
        "name": "glm-5v-turbo",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gpt-4.1",
        "name": "gpt-4-1",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gpt-4.1-mini",
        "name": "gpt-4-1-mini",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gpt-4.1-nano",
        "name": "gpt-4-1-nano",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gpt-4o",
        "name": "gpt-4o",
        "group": "302ai",
        "enabled": true
      },
      {
        "id": "gpt-5-thinking",
        "name": "gpt-5",
        "group": "302ai",
        "enabled": true
      }
    ]
  },
  {
    "id": "lanyun",
    "name": "LANYUN",
    "description": "LANYUN - AI model provider",
    "baseUrl": "https://maas-api.lanyun.net",
    "defaultBaseUrl": "https://maas-api.lanyun.net",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://maas.lanyun.net",
      "apiKey": "https://maas.lanyun.net/#/system/apiKey",
      "docs": "https://archive.lanyun.net/#/maas/",
      "models": "https://maas.lanyun.net/#/model/modelSquare"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "deepseek-r1",
        "name": "deepseek-r1",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "deepseek-v3.1",
        "name": "deepseek-v3-1",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "/maas/deepseek-ai/DeepSeek-V3.2",
        "name": "deepseek-v3-2",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "deepseek-v3.2-exp",
        "name": "deepseek-v3-2-exp",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "/maas/zhipuai/GLM-4.7",
        "name": "glm-4-7",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "/maas/zhipuai/GLM-5",
        "name": "glm-5",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "kimi-k2",
        "name": "kimi-k2",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "MiniMax-M2.1",
        "name": "minimax-m2-1",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "/maas/minimax/MiniMax-M2.5",
        "name": "minimax-m2-5",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "/maas/qwen/Qwen2.5-72B-Instruct",
        "name": "qwen2-5-72b-instruct",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "/maas/qwen/Qwen3-235B-A22B",
        "name": "qwen3-235b-a22b",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "qwen3-32b",
        "name": "qwen3-32b",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "/maas/qwen/Qwen3-VL-32B-Instruct",
        "name": "qwen3-vl-32b-instruct",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "/maas/qwen/QwQ-32B",
        "name": "qwq-32b",
        "group": "lanyun",
        "enabled": true
      },
      {
        "id": "/maas/jieyue/step-3.5-flash",
        "name": "step-3-5-flash",
        "group": "lanyun",
        "enabled": true
      }
    ]
  },
  {
    "id": "ph8",
    "name": "PH8",
    "description": "PH8 - AI model provider",
    "baseUrl": "https://ph8.co",
    "defaultBaseUrl": "https://ph8.co",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://ph8.co",
      "apiKey": "https://ph8.co/apiKey",
      "docs": "https://m1r239or5aw.feishu.cn/wiki/SegzwS4x1i2P4OksFY2cMvujn9f",
      "models": "https://ph8.co/v1/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "ph8",
        "enabled": true
      }
    ]
  },
  {
    "id": "sophnet",
    "name": "SophNet",
    "description": "SophNet - AI model provider",
    "baseUrl": "https://www.sophnet.com/api/open-apis/v1",
    "defaultBaseUrl": "https://www.sophnet.com/api/open-apis/v1",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://sophnet.com",
      "apiKey": "https://sophnet.com/#/project/key",
      "docs": "https://sophnet.com/docs/component/introduce.html",
      "models": "https://sophnet.com/#/model/list"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "DeepSeek-R1-0528",
        "name": "deepseek-r1",
        "group": "sophnet",
        "enabled": true
      },
      {
        "id": "DeepSeek-v3",
        "name": "deepseek-v3",
        "group": "sophnet",
        "enabled": true
      }
    ]
  },
  {
    "id": "ppio",
    "name": "PPIO",
    "description": "PPIO - AI model provider",
    "baseUrl": "https://api.ppinfra.com/v3/openai/",
    "defaultBaseUrl": "https://api.ppinfra.com/v3/openai/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://ppio.com/",
      "apiKey": "https://ppio.com/settings/key-management",
      "docs": "https://docs.cherry-ai.com/pre-basic/providers/ppio",
      "models": "https://ppio.com/model-api/product/llm-api"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "zai-org/autoglm-phone-9b-multilingual",
        "name": "autoglm-phone-multilingual",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "baai/bge-m3",
        "name": "bge-m3",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-r1-0528",
        "name": "deepseek-r1",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-r1-distill-llama-70b",
        "name": "deepseek-r1-distill-llama-70b",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v3.1",
        "name": "deepseek-v3-1",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v3.1-terminus",
        "name": "deepseek-v3-1-terminus",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v3.2",
        "name": "deepseek-v3-2",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v3.2-exp",
        "name": "deepseek-v3-2-exp",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "baidu/ernie-4.5-vl-424b-a47b",
        "name": "ernie-4-5-vl-424b-a47b",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "zai-org/glm-4.5",
        "name": "glm-4-5",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "zai-org/glm-4.5-air",
        "name": "glm-4-5-air",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "zai-org/glm-4.5v",
        "name": "glm-4-5v",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "zai-org/glm-4.6",
        "name": "glm-4-6",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "zai-org/glm-4.6v",
        "name": "glm-4-6v",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "zai-org/glm-4.7",
        "name": "glm-4-7",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "zai-org/glm-4.7-flash",
        "name": "glm-4-7-flash",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "zai-org/glm-5",
        "name": "glm-5",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "glm-image",
        "name": "glm-image",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "hunyuan-image-3",
        "name": "hunyuan-image-3",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "jimeng-txt2img-v3.0",
        "name": "jimeng-txt2img-v3-0",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "jimeng-txt2img-v3.1",
        "name": "jimeng-txt2img-v3-1",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "moonshotai/kimi-k2-thinking",
        "name": "kimi-k2",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "moonshotai/kimi-k2.5",
        "name": "kimi-k2-5",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "moonshotai/kimi-k2-instruct",
        "name": "kimi-k2-instruct",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "xiaomimimo/mimo-v2-flash",
        "name": "mimo-v2-flash",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "minimax/minimax-m2",
        "name": "minimax-m2",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "minimax/minimax-m2.1",
        "name": "minimax-m2-1",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "minimax/minimax-m2.5",
        "name": "minimax-m2-5",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "minimax/minimax-m2.5-highspeed",
        "name": "minimax-m2-5-highspeed",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen-2.5-72b-instruct",
        "name": "qwen-2-5-72b-instruct",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen-image-txt2img",
        "name": "qwen-image",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen-image-edit",
        "name": "qwen-image-edit",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen2.5-7b-instruct",
        "name": "qwen2-5-7b-instruct",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen2.5-vl-72b-instruct",
        "name": "qwen2-5-vl-72b-instruct",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3-235b-a22b-fp8",
        "name": "qwen3-235b-a22b",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3-235b-a22b-thinking-2507",
        "name": "qwen3-235b-a22b-thinking",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3-30b-a3b-fp8",
        "name": "qwen3-30b-a3b",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3-32b-fp8",
        "name": "qwen3-32b",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-122b-a10b",
        "name": "qwen3-5-122b-a10b",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-27b",
        "name": "qwen3-5-27b",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-35b-a3b",
        "name": "qwen3-5-35b-a3b",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-397b-a17b",
        "name": "qwen3-5-397b-a17b",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.5-plus",
        "name": "qwen3-5-plus",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3-coder-30b-a3b-instruct",
        "name": "qwen3-coder-30b-a3b-instruct",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3-coder-480b-a35b-instruct",
        "name": "qwen3-coder-480b-a35b-instruct",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3-coder-next",
        "name": "qwen3-coder-next",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3-embedding-0.6b",
        "name": "qwen3-embedding-0-6b",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3-next-80b-a3b-thinking",
        "name": "qwen3-next-80b-a3b",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3-next-80b-a3b-instruct",
        "name": "qwen3-next-80b-a3b-instruct",
        "group": "ppio",
        "enabled": true
      },
      {
        "id": "qwen/qwen3-vl-235b-a22b-thinking",
        "name": "qwen3-vl-235b-a22b",
        "group": "ppio",
        "enabled": true
      }
    ]
  },
  {
    "id": "qiniu",
    "name": "Qiniu",
    "description": "Qiniu - AI model provider",
    "baseUrl": "https://api.qnaigc.com",
    "defaultBaseUrl": "https://api.qnaigc.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://qiniu.com",
      "apiKey": "https://portal.qiniu.com/ai-inference/api-key",
      "docs": "https://developer.qiniu.com/aitokenapi",
      "models": "https://developer.qiniu.com/aitokenapi/12883/model-list"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "mimo-v2-flash",
        "name": "mimo-v2-flash",
        "group": "qiniu",
        "enabled": true
      }
    ]
  },
  {
    "id": "openrouter",
    "name": "OpenRouter",
    "description": "OpenRouter - AI model provider",
    "baseUrl": "https://openrouter.ai/api/v1/",
    "defaultBaseUrl": "https://openrouter.ai/api/v1/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://openrouter.ai/",
      "apiKey": "https://openrouter.ai/settings/keys",
      "docs": "https://openrouter.ai/docs/quick-start",
      "models": "https://openrouter.ai/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "aion-labs/aion-2.0",
        "name": "aion-2-0",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "aion-labs/aion-3.0",
        "name": "aion-3-0",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "aion-labs/aion-3.0-mini",
        "name": "aion-3-0-mini",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "aion-labs/aion-rp-llama-3.1-8b",
        "name": "aion-rp-llama-3-1-8b",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-3-haiku",
        "name": "claude-3-haiku",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-fable-5",
        "name": "claude-fable-5",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-fable-5.1",
        "name": "claude-fable-5-1",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "~anthropic/claude-fable-latest",
        "name": "claude-fable-latest",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-haiku-4.5",
        "name": "claude-haiku-4-5",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "~anthropic/claude-haiku-latest",
        "name": "claude-haiku-latest",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-4",
        "name": "claude-opus-4",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-4.1",
        "name": "claude-opus-4-1",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-4.5",
        "name": "claude-opus-4-5",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-4.6",
        "name": "claude-opus-4-6",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-4.7",
        "name": "claude-opus-4-7",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-4.8",
        "name": "claude-opus-4-8",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-5",
        "name": "claude-opus-5",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-5.5",
        "name": "claude-opus-5-5",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "~anthropic/claude-opus-latest",
        "name": "claude-opus-latest",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-sonnet-4",
        "name": "claude-sonnet-4",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-sonnet-4.5",
        "name": "claude-sonnet-4-5",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-sonnet-4.6",
        "name": "claude-sonnet-4-6",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-sonnet-5",
        "name": "claude-sonnet-5",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "anthropic/claude-sonnet-5.5",
        "name": "claude-sonnet-5-5",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "~anthropic/claude-sonnet-latest",
        "name": "claude-sonnet-latest",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "mistralai/codestral-2508",
        "name": "codestral",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "cohere/command-a",
        "name": "command-a",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "cohere/command-r-08-2024",
        "name": "command-r-08-2024",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "cohere/command-r-plus-08-2024",
        "name": "command-r-plus-08-2024",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "cohere/command-r7b-12-2024",
        "name": "command-r7b-12-2024",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "thedrummer/cydonia-24b-v4.1",
        "name": "cydonia-24b-v4-1",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-chat",
        "name": "deepseek-chat",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-chat-v3-0324",
        "name": "deepseek-chat-v3",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-chat-v3.1",
        "name": "deepseek-chat-v3-1",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-r1",
        "name": "deepseek-r1",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-r1-distill-llama-70b",
        "name": "deepseek-r1-distill-llama-70b",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v3.1-terminus",
        "name": "deepseek-v3-1-terminus",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v3.2",
        "name": "deepseek-v3-2",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v3.2-exp",
        "name": "deepseek-v3-2-exp",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v4.1-flash",
        "name": "deepseek-v4-1-flash",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v4-flash-0731",
        "name": "deepseek-v4-flash",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "~deepseek/deepseek-v4-flash-latest",
        "name": "deepseek-v4-flash-latest",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v4-flash-vision-exp",
        "name": "deepseek-v4-flash-vision-exp",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v4-pro-0813",
        "name": "deepseek-v4-pro",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "mistralai/devstral-2512",
        "name": "devstral",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "cognitivecomputations/dolphin-mistral-24b-venice-edition",
        "name": "dolphin-mistral-24b-venice-edition",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "dots-studio/dots-3-note-preview:free",
        "name": "dots-3-note-preview",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "baidu/ernie-4.5-vl-424b-a47b",
        "name": "ernie-4-5-vl-424b-a47b",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "black-forest-labs/flux.2-flex",
        "name": "flux-2-flex",
        "group": "openrouter",
        "enabled": true
      },
      {
        "id": "black-forest-labs/flux.2-klein-4b",
        "name": "flux-2-klein-4b",
        "group": "openrouter",
        "enabled": true
      }
    ]
  },
  {
    "id": "ollama",
    "name": "Ollama",
    "description": "Ollama - AI model provider",
    "baseUrl": "http://localhost:11434",
    "defaultBaseUrl": "http://localhost:11434",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://ollama.com/",
      "apiKey": "",
      "docs": "https://github.com/ollama/ollama/tree/main/docs",
      "models": "https://ollama.com/library"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "x/flux2-klein",
        "name": "x/flux2-klein",
        "group": "ollama",
        "enabled": true
      },
      {
        "id": "x/z-image-turbo",
        "name": "x/z-image-turbo",
        "group": "ollama",
        "enabled": true
      }
    ]
  },
  {
    "id": "radeon-cloud",
    "name": "AMD GPU Cloud",
    "description": "AMD GPU Cloud - AI model provider",
    "baseUrl": "https://developer.amd.com.cn/radeon/v1",
    "defaultBaseUrl": "https://developer.amd.com.cn/radeon/v1",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://developer.amd.com.cn/radeon/",
      "apiKey": "https://developer.amd.com.cn/radeon/tokenfactory?source=cherry-studio",
      "docs": "https://developer.amd.com.cn/radeon/",
      "models": "https://developer.amd.com.cn/radeon/tokenfactory?source=cherry-studio"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "DeepSeek-V4-Flash",
        "name": "deepseek-v4-flash",
        "group": "radeon-cloud",
        "enabled": true
      },
      {
        "id": "DeepSeek-V4-Pro",
        "name": "deepseek-v4-pro",
        "group": "radeon-cloud",
        "enabled": true
      },
      {
        "id": "GLM-5.1",
        "name": "glm-5-1",
        "group": "radeon-cloud",
        "enabled": true
      },
      {
        "id": "GLM-5.2",
        "name": "glm-5-2",
        "group": "radeon-cloud",
        "enabled": true
      },
      {
        "id": "gpt-oss-120b",
        "name": "gpt-oss-120b",
        "group": "radeon-cloud",
        "enabled": true
      },
      {
        "id": "Kimi-K2.6",
        "name": "kimi-k2-6",
        "group": "radeon-cloud",
        "enabled": true
      },
      {
        "id": "Qwen3.6-35B-A3B",
        "name": "qwen3-6-35b-a3b",
        "group": "radeon-cloud",
        "enabled": true
      }
    ]
  },
  {
    "id": "tokendance",
    "name": "TokenDance",
    "description": "TokenDance - AI model provider",
    "baseUrl": "https://tokendance.space/gateway",
    "defaultBaseUrl": "https://tokendance.space/gateway",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://tokendance.space",
      "apiKey": "https://tokendance.space/keys",
      "docs": "https://tokendance.space/docs/cherry-studio",
      "models": "https://tokendance.space/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "tokendance",
        "enabled": true
      }
    ]
  },
  {
    "id": "new-api",
    "name": "New API",
    "description": "New API - AI model provider",
    "baseUrl": "http://localhost:3000",
    "defaultBaseUrl": "http://localhost:3000",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://docs.newapi.pro/",
      "apiKey": "",
      "docs": "https://docs.newapi.pro",
      "models": ""
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "new-api",
        "enabled": true
      }
    ]
  },
  {
    "id": "lmstudio",
    "name": "LM Studio",
    "description": "LM Studio - AI model provider",
    "baseUrl": "http://localhost:1234",
    "defaultBaseUrl": "http://localhost:1234",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://lmstudio.ai/",
      "apiKey": "",
      "docs": "https://lmstudio.ai/docs",
      "models": "https://lmstudio.ai/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "lmstudio",
        "enabled": true
      }
    ]
  },
  {
    "id": "litellm",
    "name": "LiteLLM",
    "description": "LiteLLM - AI model provider",
    "baseUrl": "http://localhost:4000",
    "defaultBaseUrl": "http://localhost:4000",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.litellm.ai/",
      "apiKey": "https://docs.litellm.ai/docs/proxy/virtual_keys",
      "docs": "https://docs.litellm.ai/docs/proxy/quick_start",
      "models": ""
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "litellm",
        "enabled": true
      }
    ]
  },
  {
    "id": "anthropic",
    "name": "Anthropic",
    "description": "Anthropic - AI model provider",
    "baseUrl": "https://api.anthropic.com",
    "defaultBaseUrl": "https://api.anthropic.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://anthropic.com/",
      "apiKey": "https://console.anthropic.com/settings/keys",
      "docs": "https://docs.anthropic.com/en/docs",
      "models": "https://docs.anthropic.com/en/docs/about-claude/models"
    },
    "defaultChatEndpoint": "anthropic-messages",
    "models": [
      {
        "id": "claude-3-haiku",
        "name": "Claude Haiku 3",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-fable-5",
        "name": "Claude Fable 5",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-fable-5-1",
        "name": "Claude Fable 5.1",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-fable-latest",
        "name": "Anthropic: Claude Fable Latest",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-haiku-4-5",
        "name": "Claude Haiku 4.5",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-haiku-5-5",
        "name": "Claude Haiku 5.5",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-haiku-latest",
        "name": "Anthropic Claude Haiku Latest",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-opus-4",
        "name": "Claude Opus 4",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-opus-4-1",
        "name": "Claude Opus 4.1",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-opus-4-5",
        "name": "Claude Opus 4.5",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-opus-4-6",
        "name": "Claude Opus 4.6",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-opus-4-6-v1",
        "name": "Claude Opus 4.6 (US)",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-opus-4-7",
        "name": "Claude Opus 4.7",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-opus-4-8",
        "name": "Claude Opus 4.8",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-opus-4-8-fast",
        "name": "Claude Opus 4.8 (Fast)",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-opus-5",
        "name": "Claude Opus 5",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-opus-5-5",
        "name": "Claude Opus 5.5",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-opus-5-fast",
        "name": "Claude Opus 5 (Fast)",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-opus-latest",
        "name": "Anthropic: Claude Opus Latest",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4",
        "name": "Claude Sonnet 4",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4-5",
        "name": "Claude Sonnet 4.5",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4-6",
        "name": "Claude Sonnet 4.6",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-sonnet-5",
        "name": "Claude Sonnet 5",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-sonnet-5-5",
        "name": "Claude Sonnet 5.5",
        "group": "anthropic",
        "enabled": true
      },
      {
        "id": "claude-sonnet-latest",
        "name": "Anthropic Claude Sonnet Latest",
        "group": "anthropic",
        "enabled": true
      }
    ]
  },
  {
    "id": "claude-code",
    "name": "Claude Code",
    "description": "Claude Code - AI model provider",
    "baseUrl": "https://api.anthropic.com",
    "defaultBaseUrl": "https://api.anthropic.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.anthropic.com/claude-code",
      "apiKey": "",
      "docs": "https://docs.claude.com/en/docs/claude-code/overview",
      "models": ""
    },
    "defaultChatEndpoint": "anthropic-messages",
    "models": [
      {
        "id": "claude-fable-5",
        "name": "claude-fable-5",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-fable-5-1",
        "name": "claude-fable-5-1",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-haiku-4-5",
        "name": "claude-haiku-4-5",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-haiku-5-5",
        "name": "claude-haiku-5-5",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-opus-4-1",
        "name": "claude-opus-4-1",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-opus-4-5",
        "name": "claude-opus-4-5",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-opus-4-6",
        "name": "claude-opus-4-6",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-opus-4-6[1m]",
        "name": "claude-opus-4-6",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-opus-4-7",
        "name": "claude-opus-4-7",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-opus-4-7[1m]",
        "name": "claude-opus-4-7",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-opus-4-8",
        "name": "claude-opus-4-8",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-opus-4-8[1m]",
        "name": "claude-opus-4-8",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-opus-5",
        "name": "claude-opus-5",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-opus-5[1m]",
        "name": "claude-opus-5",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-opus-5-5",
        "name": "claude-opus-5-5",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4-5",
        "name": "claude-sonnet-4-5",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4-6",
        "name": "claude-sonnet-4-6",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4-6[1m]",
        "name": "claude-sonnet-4-6",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-sonnet-5",
        "name": "claude-sonnet-5",
        "group": "claude-code",
        "enabled": true
      },
      {
        "id": "claude-sonnet-5-5",
        "name": "claude-sonnet-5-5",
        "group": "claude-code",
        "enabled": true
      }
    ]
  },
  {
    "id": "openai-codex",
    "name": "OpenAI Codex",
    "description": "OpenAI Codex - AI model provider",
    "baseUrl": "https://chatgpt.com/backend-api/codex",
    "defaultBaseUrl": "https://chatgpt.com/backend-api/codex",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://openai.com/codex",
      "apiKey": "",
      "docs": "https://platform.openai.com/docs/codex",
      "models": ""
    },
    "defaultChatEndpoint": "openai-responses",
    "models": [
      {
        "id": "gpt-5.3-codex-spark",
        "name": "gpt-5-3-codex-spark",
        "group": "openai-codex",
        "enabled": true
      },
      {
        "id": "gpt-5.4",
        "name": "gpt-5-4",
        "group": "openai-codex",
        "enabled": true
      },
      {
        "id": "gpt-5.4-mini",
        "name": "gpt-5-4-mini",
        "group": "openai-codex",
        "enabled": true
      },
      {
        "id": "gpt-5.5",
        "name": "gpt-5-5",
        "group": "openai-codex",
        "enabled": true
      },
      {
        "id": "gpt-5.6-luna",
        "name": "gpt-5-6-luna",
        "group": "openai-codex",
        "enabled": true
      },
      {
        "id": "gpt-5.6-sol",
        "name": "gpt-5-6-sol",
        "group": "openai-codex",
        "enabled": true
      },
      {
        "id": "gpt-5.6-terra",
        "name": "gpt-5-6-terra",
        "group": "openai-codex",
        "enabled": true
      },
      {
        "id": "gpt-6.1-sol",
        "name": "gpt-6-1-sol",
        "group": "openai-codex",
        "enabled": true
      },
      {
        "id": "gpt-6-astra",
        "name": "gpt-6-astra",
        "group": "openai-codex",
        "enabled": true
      },
      {
        "id": "gpt-6-luna",
        "name": "gpt-6-luna",
        "group": "openai-codex",
        "enabled": true
      },
      {
        "id": "gpt-6-sol",
        "name": "gpt-6-sol",
        "group": "openai-codex",
        "enabled": true
      }
    ]
  },
  {
    "id": "grok-cli",
    "name": "Grok CLI",
    "description": "Grok CLI - AI model provider",
    "baseUrl": "https://cli-chat-proxy.grok.com/v1",
    "defaultBaseUrl": "https://cli-chat-proxy.grok.com/v1",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://x.ai",
      "apiKey": "",
      "docs": "https://docs.x.ai",
      "models": ""
    },
    "defaultChatEndpoint": "openai-responses",
    "models": [
      {
        "id": "grok-4.20-0309-non-reasoning",
        "name": "grok-4-20-0309-non-reasoning",
        "group": "grok-cli",
        "enabled": true
      },
      {
        "id": "grok-4.20-0309-reasoning",
        "name": "grok-4-20-0309-reasoning",
        "group": "grok-cli",
        "enabled": true
      },
      {
        "id": "grok-4.20-multi-agent-0309",
        "name": "grok-4-20-multi-agent-0309",
        "group": "grok-cli",
        "enabled": true
      },
      {
        "id": "grok-4.3",
        "name": "grok-4-3",
        "group": "grok-cli",
        "enabled": true
      },
      {
        "id": "grok-4.5",
        "name": "grok-4-5",
        "group": "grok-cli",
        "enabled": true
      },
      {
        "id": "grok-4.6",
        "name": "grok-4-6",
        "group": "grok-cli",
        "enabled": true
      },
      {
        "id": "grok-4.7",
        "name": "grok-4-7",
        "group": "grok-cli",
        "enabled": true
      },
      {
        "id": "grok-4.7-build-fast",
        "name": "grok-4-7-build-fast",
        "group": "grok-cli",
        "enabled": true
      },
      {
        "id": "grok-build",
        "name": "grok-build",
        "group": "grok-cli",
        "enabled": true
      },
      {
        "id": "grok-composer-2.5-fast",
        "name": "grok-composer-2-5-fast",
        "group": "grok-cli",
        "enabled": true
      }
    ]
  },
  {
    "id": "omlx",
    "name": "oMLX",
    "description": "oMLX - AI model provider",
    "baseUrl": "http://localhost:8000",
    "defaultBaseUrl": "http://localhost:8000",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://omlx.ai",
      "apiKey": "",
      "docs": "https://github.com/jundot/omlx",
      "models": ""
    },
    "defaultChatEndpoint": "openai-responses",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "omlx",
        "enabled": true
      }
    ]
  },
  {
    "id": "openai",
    "name": "OpenAI",
    "description": "OpenAI - AI model provider",
    "baseUrl": "https://api.openai.com",
    "defaultBaseUrl": "https://api.openai.com",
    "apiKey": "",
    "enabled": true,
    "isBuiltIn": true,
    "website": {
      "official": "https://openai.com/",
      "apiKey": "https://platform.openai.com/api-keys",
      "docs": "https://platform.openai.com/docs",
      "models": "https://platform.openai.com/docs/models"
    },
    "defaultChatEndpoint": "openai-responses",
    "models": [
      {
        "id": "chatgpt-image-latest",
        "name": "chatgpt-image-latest",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "dall-e-2",
        "name": "Dall E 2",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "dall-e-3",
        "name": "DALL-E-3",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-3-5-turbo",
        "name": "GPT-3.5 Turbo",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-3-5-turbo-16k",
        "name": "OpenAI: GPT-3.5 Turbo 16k",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-3-5-turbo-instruct",
        "name": "OpenAI: GPT-3.5 Turbo Instruct",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-4",
        "name": "GPT-4",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-4-1",
        "name": "GPT-4.1",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-4-1-mini",
        "name": "GPT-4.1 mini",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-4-1-nano",
        "name": "GPT-4.1 nano",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-4-turbo",
        "name": "GPT-4 Turbo",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-4-turbo-preview",
        "name": "OpenAI: GPT-4 Turbo Preview",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-4o",
        "name": "GPT-4o",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-4o-mini",
        "name": "GPT-4o mini",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-4o-mini-transcribe",
        "name": "GPT-4o mini Transcribe",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-4o-transcribe",
        "name": "GPT-4o Transcribe",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5",
        "name": "GPT-5",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-1",
        "name": "GPT 5.1 Thinking",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-1-codex",
        "name": "GPT-5.1-Codex",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-1-codex-max",
        "name": "GPT 5.1 Codex Max",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-1-codex-mini",
        "name": "GPT-5.1 Codex mini",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-2",
        "name": "GPT-5.2",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-2-chat",
        "name": "OpenAI: GPT-5.2 Chat",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-2-chat-latest",
        "name": "GPT-5.2 Chat",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-2-codex",
        "name": "GPT-5.2-Codex",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-2-pro",
        "name": "GPT 5.2 ",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-3-chat-latest",
        "name": "GPT-5.3 Chat (latest)",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-3-codex",
        "name": "GPT 5.3 Codex",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-3-codex-spark",
        "name": "GPT-5.3 Codex Spark",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-4",
        "name": "GPT 5.4",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-4-mini",
        "name": "GPT 5.4 Mini",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-4-nano",
        "name": "GPT 5.4 Nano",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-4-pro",
        "name": "GPT 5.4 Pro",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-5",
        "name": "GPT 5.5",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-5-pro",
        "name": "GPT 5.5 Pro",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-6",
        "name": "GPT-5.6",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-6-luna",
        "name": "GPT 5.6 Luna",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-6-luna-pro",
        "name": "OpenAI: GPT-5.6 Luna Pro",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-6-sol",
        "name": "GPT 5.6 Sol",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-6-sol-pro",
        "name": "OpenAI: GPT-5.6 Sol Pro",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-6-terra",
        "name": "GPT 5.6 Terra",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-6-terra-pro",
        "name": "OpenAI: GPT-5.6 Terra Pro",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-chat",
        "name": "GPT-5 Chat",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-codex",
        "name": "GPT-5-Codex",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-image",
        "name": "OpenAI: GPT-5 Image",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-image-mini",
        "name": "OpenAI: GPT-5 Image Mini",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-mini",
        "name": "GPT-5 Mini",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-nano",
        "name": "GPT-5 Nano",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-5-pro",
        "name": "GPT-5 pro",
        "group": "openai",
        "enabled": true
      },
      {
        "id": "gpt-6-1-sol",
        "name": "GPT-6.1 Sol",
        "group": "openai",
        "enabled": true
      }
    ]
  },
  {
    "id": "opencode",
    "name": "OpenCode Go",
    "description": "OpenCode Go - AI model provider",
    "baseUrl": "https://opencode.ai/zen/go/v1",
    "defaultBaseUrl": "https://opencode.ai/zen/go/v1",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://opencode.ai",
      "apiKey": "https://opencode.ai/auth",
      "docs": "https://opencode.ai/docs/go/",
      "models": "https://opencode.ai/zen/go/v1/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "deepseek-flash",
        "name": "deepseek-flash",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "deepseek-v4.1-flash",
        "name": "deepseek-v4-1-flash",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "deepseek-v4-flash",
        "name": "deepseek-v4-flash",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "deepseek-v4-flash-vision-exp",
        "name": "deepseek-v4-flash-vision-exp",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "deepseek-v4-pro",
        "name": "deepseek-v4-pro",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "glm-5",
        "name": "glm-5",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "glm-5.1",
        "name": "glm-5-1",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "glm-5.2",
        "name": "glm-5-2",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "glm-5.3",
        "name": "glm-5-3",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "glm-5.3-flash",
        "name": "glm-5-3-flash",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "gpt-5.6-luna",
        "name": "gpt-5-6-luna",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "grok-4.5",
        "name": "grok-4-5",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "grok-4.6",
        "name": "grok-4-6",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "grok-4.7",
        "name": "grok-4-7",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "hy3",
        "name": "hy3",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "hy4-preview",
        "name": "hy4-preview",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "kimi-k2.5",
        "name": "kimi-k2-5",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "kimi-k2.6",
        "name": "kimi-k2-6",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "kimi-k2.7-code",
        "name": "kimi-k2-7-code",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "kimi-k3",
        "name": "kimi-k3",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "longcat-2.0",
        "name": "longcat-2-0",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "mimo-v2.5",
        "name": "mimo-v2-5",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "mimo-v2.5-pro",
        "name": "mimo-v2-5-pro",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "mimo-v2.6-flash",
        "name": "mimo-v2-6-flash",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "mimo-v2.6-pro",
        "name": "mimo-v2-6-pro",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "mimo-v2-omni",
        "name": "mimo-v2-omni",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "mimo-v2-pro",
        "name": "mimo-v2-pro",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "minimax-m2.5",
        "name": "minimax-m2-5",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "minimax-m2.7",
        "name": "minimax-m2-7",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "minimax-m3",
        "name": "minimax-m3",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "muse-spark-1.2-contributor",
        "name": "muse-spark-1-2-contributor",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "muse-spark-1.3-contributor",
        "name": "muse-spark-1-3-contributor",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "omen-alpha",
        "name": "omen-alpha",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "ox-alpha-free",
        "name": "ox-alpha",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "qwen3.5-plus",
        "name": "qwen3-5-plus",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "qwen3.6-plus",
        "name": "qwen3-6-plus",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "qwen3.7-max",
        "name": "qwen3-7-max",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "qwen3.7-plus",
        "name": "qwen3-7-plus",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "qwen3.8-flash",
        "name": "qwen3-8-flash",
        "group": "opencode",
        "enabled": true
      },
      {
        "id": "qwen3.8-max",
        "name": "qwen3-8-max",
        "group": "opencode",
        "enabled": true
      }
    ]
  },
  {
    "id": "azure-openai",
    "name": "Azure OpenAI",
    "description": "Azure OpenAI - AI model provider",
    "baseUrl": "",
    "defaultBaseUrl": "",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://azure.microsoft.com/en-us/products/ai-services/openai-service",
      "apiKey": "https://portal.azure.com/",
      "docs": "https://learn.microsoft.com/en-us/azure/ai-services/openai/",
      "models": "https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "azure-openai",
        "enabled": true
      }
    ]
  },
  {
    "id": "gemini",
    "name": "Gemini",
    "description": "Gemini - AI model provider",
    "baseUrl": "https://generativelanguage.googleapis.com",
    "defaultBaseUrl": "https://generativelanguage.googleapis.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://gemini.google.com/",
      "apiKey": "https://aistudio.google.com/app/apikey",
      "docs": "https://ai.google.dev/gemini-api/docs",
      "models": "https://ai.google.dev/gemini-api/docs/models/gemini"
    },
    "defaultChatEndpoint": "google-generate-content",
    "models": [
      {
        "id": "deep-research-max-preview-04-2026",
        "name": "Deep Research Max Preview (Apr-21-2026)",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "deep-research-preview-04-2026",
        "name": "Deep Research Preview (Apr-21-2026)",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-2-5-computer-use-preview-10-2025",
        "name": "Gemini 2.5 Computer Use Preview 10-2025",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-2-5-flash",
        "name": "Gemini 2.5 Flash",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-2-5-flash-image",
        "name": "gemini-2.5-flash-image",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-2-5-flash-image-preview",
        "name": "Nano Banana Preview (Gemini 2.5 Flash Image Preview)",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-2-5-flash-lite",
        "name": "Gemini 2.5 Flash-Lite",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-2-5-flash-preview-tts",
        "name": "Gemini 2.5 Flash Preview TTS",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-2-5-flash-tts",
        "name": "Gemini 2.5 Flash TTS",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-2-5-pro",
        "name": "Gemini 2.5 Pro",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-2-5-pro-preview",
        "name": "Google: Gemini 2.5 Pro Preview 06-05",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-2-5-pro-preview-05-06",
        "name": "Google: Gemini 2.5 Pro Preview 05-06",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-2-5-pro-preview-tts",
        "name": "Gemini 2.5 Pro Preview TTS",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-2-5-pro-tts",
        "name": "Gemini 2.5 Pro TTS",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-1-flash-image",
        "name": "Nano Banana 2",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-1-flash-image-preview",
        "name": "Google: Nano Banana 2 (Gemini 3.1 Flash Image Preview)",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-1-flash-lite",
        "name": "Gemini 3.1 Flash Lite",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-1-flash-lite-image",
        "name": "Nano Banana 2 Lite",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-1-flash-lite-preview",
        "name": "Gemini 3.1 Flash Lite Preview",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-1-flash-live-preview",
        "name": "Gemini 3.1 Flash Live Preview",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-1-flash-tts-preview",
        "name": "Gemini 3.1 Flash TTS Preview",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-1-pro-preview",
        "name": "Gemini 3.1 Pro Preview",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-1-pro-preview-customtools",
        "name": "Gemini 3.1 Pro Preview Custom Tools",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-5-flash",
        "name": "Gemini 3.5 Flash",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-5-flash-lite",
        "name": "Gemini 3.5 Flash Lite",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-5-live-translate-preview",
        "name": "Gemini 3.5 Live Translate Preview",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-5-transcribe",
        "name": "Gemini 3.5 Transcribe",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-5-transcribe-live",
        "name": "Gemini 3.5 Transcribe Live",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-6-flash",
        "name": "Gemini 3.6 Flash",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-7-flash",
        "name": "Gemini 3.7 Flash",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-8-flash",
        "name": "Gemini 3.8 Flash",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-flash",
        "name": "Gemini 3 Flash",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-flash-preview",
        "name": "Gemini 3 Flash Preview",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-pro-image",
        "name": "Nano Banana Pro (Gemini 3 Pro Image)",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-3-pro-image-preview",
        "name": "gemini-3-pro-image-preview",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-embedding-001",
        "name": "Gemini Embedding 001",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-embedding-2",
        "name": "Gemini Embedding 2",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-flash-latest",
        "name": "Gemini Flash Latest",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-flash-lite-latest",
        "name": "Gemini Flash-Lite Latest",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-omni-flash-preview",
        "name": "Gemini Omni Flash Preview",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemini-pro-latest",
        "name": "Google Gemini Pro Latest",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemma-2-27b-it",
        "name": "Google: Gemma 2 27B",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemma-2-2b-it",
        "name": "Gemma 2 2b It",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemma-3-12b-it",
        "name": "Gemma 3 12B IT",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemma-3-27b-it",
        "name": "Google Gemma 3 27B Instruct",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemma-3-4b-it",
        "name": "Gemma 3 4B IT",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemma-3n-e2b-it",
        "name": "Gemma 3n E2b It",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemma-3n-e4b-it",
        "name": "Gemma 3n E4b It",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemma-4-26b-a4b-it",
        "name": "Gemma 4 26B A4B IT",
        "group": "gemini",
        "enabled": true
      },
      {
        "id": "gemma-4-31b-it",
        "name": "Gemma-4-31B-IT",
        "group": "gemini",
        "enabled": true
      }
    ]
  },
  {
    "id": "vertexai",
    "name": "VertexAI",
    "description": "VertexAI - AI model provider",
    "baseUrl": "",
    "defaultBaseUrl": "",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://cloud.google.com/vertex-ai",
      "apiKey": "https://console.cloud.google.com/apis/credentials",
      "docs": "https://cloud.google.com/vertex-ai/generative-ai/docs",
      "models": "https://cloud.google.com/vertex-ai/generative-ai/docs/learn/models"
    },
    "defaultChatEndpoint": "google-generate-content",
    "models": [
      {
        "id": "claude-fable-5@default",
        "name": "claude-fable-5",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-fable-5-1@default",
        "name": "claude-fable-5-1",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-haiku-4-5@20251001",
        "name": "claude-haiku-4-5",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-opus-4@20250514",
        "name": "claude-opus-4",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-opus-4-1@20250805",
        "name": "claude-opus-4-1",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-opus-4-5@20251101",
        "name": "claude-opus-4-5",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-opus-4-6@default",
        "name": "claude-opus-4-6",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-opus-4-7@default",
        "name": "claude-opus-4-7",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-opus-4-8@default",
        "name": "claude-opus-4-8",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-opus-5@default",
        "name": "claude-opus-5",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-opus-5-5@default",
        "name": "claude-opus-5-5",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4@20250514",
        "name": "claude-sonnet-4",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4-5@20250929",
        "name": "claude-sonnet-4-5",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4-6@default",
        "name": "claude-sonnet-4-6",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-sonnet-5@default",
        "name": "claude-sonnet-5",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "claude-sonnet-5-5@default",
        "name": "claude-sonnet-5-5",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "deepseek-ai/deepseek-v3.1-maas",
        "name": "deepseek-v3-1-maas",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "deepseek-ai/deepseek-v3.2-maas",
        "name": "deepseek-v3-2-maas",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-2.5-flash",
        "name": "gemini-2-5-flash",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-2.5-flash-image",
        "name": "gemini-2-5-flash-image",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-2.5-flash-lite",
        "name": "gemini-2-5-flash-lite",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-2.5-flash-tts",
        "name": "gemini-2-5-flash-tts",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-2.5-pro",
        "name": "gemini-2-5-pro",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-2.5-pro-tts",
        "name": "gemini-2-5-pro-tts",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-3.1-flash-image",
        "name": "gemini-3-1-flash-image",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-3.1-flash-lite",
        "name": "gemini-3-1-flash-lite",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-3.1-flash-lite-preview",
        "name": "gemini-3-1-flash-lite-preview",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-3.1-pro-preview",
        "name": "gemini-3-1-pro-preview",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-3.1-pro-preview-customtools",
        "name": "gemini-3-1-pro-preview-customtools",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-3.5-flash",
        "name": "gemini-3-5-flash",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-3.5-flash-lite",
        "name": "gemini-3-5-flash-lite",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-3.6-flash",
        "name": "gemini-3-6-flash",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-3.7-flash",
        "name": "gemini-3-7-flash",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-3.8-flash",
        "name": "gemini-3-8-flash",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-3-flash-preview",
        "name": "gemini-3-flash-preview",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-3-pro-image",
        "name": "gemini-3-pro-image",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-embedding-001",
        "name": "gemini-embedding-001",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-flash-latest",
        "name": "gemini-flash-latest",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "gemini-flash-lite-latest",
        "name": "gemini-flash-lite-latest",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "zai-org/glm-4.7-maas",
        "name": "glm-4-7-maas",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "zai-org/glm-5-maas",
        "name": "glm-5-maas",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "openai/gpt-oss-120b-maas",
        "name": "gpt-oss-120b-maas",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "openai/gpt-oss-20b-maas",
        "name": "gpt-oss-20b-maas",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "moonshotai/kimi-k2-thinking-maas",
        "name": "kimi-k2-thinking-maas",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "meta/llama-3.3-70b-instruct-maas",
        "name": "llama-3-3-70b-instruct-maas",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "meta/llama-4-maverick-17b-128e-instruct-maas",
        "name": "llama-4-maverick-17b-128e-instruct-maas",
        "group": "vertexai",
        "enabled": true
      },
      {
        "id": "qwen/qwen3-235b-a22b-instruct-2507-maas",
        "name": "qwen3-235b-a22b-instruct-2507-maas",
        "group": "vertexai",
        "enabled": true
      }
    ]
  },
  {
    "id": "copilot",
    "name": "Github Copilot",
    "description": "Github Copilot - AI model provider",
    "baseUrl": "https://api.githubcopilot.com/",
    "defaultBaseUrl": "https://api.githubcopilot.com/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://github.com/features/copilot",
      "apiKey": "",
      "docs": "",
      "models": ""
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "claude-fable-5",
        "name": "claude-fable-5",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "claude-fable-5.1",
        "name": "claude-fable-5-1",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "claude-haiku-4.5",
        "name": "claude-haiku-4-5",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "claude-opus-4.7",
        "name": "claude-opus-4-7",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "claude-opus-4.8",
        "name": "claude-opus-4-8",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "claude-opus-5",
        "name": "claude-opus-5",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4.6",
        "name": "claude-sonnet-4-6",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "claude-sonnet-5",
        "name": "claude-sonnet-5",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "claude-sonnet-5.5",
        "name": "claude-sonnet-5-5",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gemini-3.5-flash",
        "name": "gemini-3-5-flash",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gemini-3.6-flash",
        "name": "gemini-3-6-flash",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gemini-3.7-flash",
        "name": "gemini-3-7-flash",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gemini-3.8-flash",
        "name": "gemini-3-8-flash",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gpt-5.3-codex",
        "name": "gpt-5-3-codex",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gpt-5.4",
        "name": "gpt-5-4",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gpt-5.4-mini",
        "name": "gpt-5-4-mini",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gpt-5.4-nano",
        "name": "gpt-5-4-nano",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gpt-5.5",
        "name": "gpt-5-5",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gpt-5.6-luna",
        "name": "gpt-5-6-luna",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gpt-5.6-sol",
        "name": "gpt-5-6-sol",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gpt-5.6-terra",
        "name": "gpt-5-6-terra",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gpt-5-mini",
        "name": "gpt-5-mini",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "gpt-6-astra",
        "name": "gpt-6-astra",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "grok-4.5",
        "name": "grok-4-5",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "grok-4.6",
        "name": "grok-4-6",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "grok-4.7",
        "name": "grok-4-7",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "kimi-k2.7-code",
        "name": "kimi-k2-7-code",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "kimi-k3",
        "name": "kimi-k3",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "mai-code-1.1-flash",
        "name": "mai-code-1-1-flash",
        "group": "copilot",
        "enabled": true
      },
      {
        "id": "mai-code-1-flash-picker",
        "name": "mai-code-1-flash-picker",
        "group": "copilot",
        "enabled": true
      }
    ]
  },
  {
    "id": "moonshot",
    "name": "Moonshot AI",
    "description": "Moonshot AI - AI model provider",
    "baseUrl": "https://api.moonshot.cn",
    "defaultBaseUrl": "https://api.moonshot.cn",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.moonshot.cn/",
      "apiKey": "https://platform.moonshot.cn/console/api-keys",
      "docs": "https://platform.moonshot.cn/docs/",
      "models": "https://platform.moonshot.cn/docs/"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "kimi-k2",
        "name": "Moonshot Kimi K2 Thinking",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-k2-5",
        "name": "Moonshot Kimi K2.5",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-k2-6",
        "name": "Moonshot Kimi K2.6",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-k2-7-code",
        "name": "Kimi K2.7 Code",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-k2-7-code-highspeed",
        "name": "Kimi K2.7 Code High Speed",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-k2-instruct",
        "name": "Kimi K2 0905",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-k2-thinking-maas",
        "name": "Kimi K2 Thinking",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-k3",
        "name": "kimi-k3",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-k3-fast",
        "name": "kimi-k3-fast",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-latest",
        "name": "kimi-latest",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-k2.5",
        "name": "kimi-k2-5",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-k2.6",
        "name": "kimi-k2-6",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-k2.7-code",
        "name": "kimi-k2-7-code",
        "group": "moonshot",
        "enabled": true
      },
      {
        "id": "kimi-k2.7-code-highspeed",
        "name": "kimi-k2-7-code-highspeed",
        "group": "moonshot",
        "enabled": true
      }
    ]
  },
  {
    "id": "moonshot-global",
    "name": "Moonshot",
    "description": "Moonshot - AI model provider",
    "baseUrl": "https://api.moonshot.ai",
    "defaultBaseUrl": "https://api.moonshot.ai",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.moonshot.ai/",
      "apiKey": "https://platform.moonshot.ai/console/api-keys",
      "docs": "https://platform.moonshot.ai/docs/",
      "models": "https://platform.moonshot.ai/docs/"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "kimi-k2.5",
        "name": "kimi-k2-5",
        "group": "moonshot-global",
        "enabled": true
      },
      {
        "id": "kimi-k2.6",
        "name": "kimi-k2-6",
        "group": "moonshot-global",
        "enabled": true
      },
      {
        "id": "kimi-k2.7-code",
        "name": "kimi-k2-7-code",
        "group": "moonshot-global",
        "enabled": true
      },
      {
        "id": "kimi-k2.7-code-highspeed",
        "name": "kimi-k2-7-code-highspeed",
        "group": "moonshot-global",
        "enabled": true
      },
      {
        "id": "kimi-k3",
        "name": "kimi-k3",
        "group": "moonshot-global",
        "enabled": true
      },
      {
        "id": "kimi-k3-fast",
        "name": "kimi-k3-fast",
        "group": "moonshot-global",
        "enabled": true
      },
      {
        "id": "kimi-latest",
        "name": "kimi-latest",
        "group": "moonshot-global",
        "enabled": true
      }
    ]
  },
  {
    "id": "baichuan",
    "name": "BAICHUAN AI",
    "description": "BAICHUAN AI - AI model provider",
    "baseUrl": "https://api.baichuan-ai.com",
    "defaultBaseUrl": "https://api.baichuan-ai.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.baichuan-ai.com/",
      "apiKey": "https://platform.baichuan-ai.com/console/apikey",
      "docs": "https://platform.baichuan-ai.com/docs",
      "models": "https://platform.baichuan-ai.com/prices"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "baichuan",
        "enabled": true
      }
    ]
  },
  {
    "id": "dashscope",
    "name": "Bailian",
    "description": "Bailian - AI model provider",
    "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1/",
    "defaultBaseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.aliyun.com/product/bailian",
      "apiKey": "https://bailian.console.aliyun.com/?tab=model#/api-key",
      "docs": "https://help.aliyun.com/zh/model-studio/getting-started/",
      "models": "https://bailian.console.aliyun.com/?tab=model#/model-market"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "qvq-max",
        "name": "QVQ Max",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-2-5-72b-instruct",
        "name": "Qwen2.5 72B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-2-5-7b-instruct",
        "name": "Qwen: Qwen2.5 7B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-2-5-coder-32b-instruct",
        "name": "Qwen2.5 Coder 32B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-3-14b",
        "name": "Qwen3-14B",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-3-235b",
        "name": "Qwen3 235B A22B Instruct 2507",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-3-30b",
        "name": "Qwen3-30B-A3B",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-3-32b",
        "name": "Qwen 3.32B",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-3-6-max-preview",
        "name": "Qwen 3.6 Max Preview",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-deep-research",
        "name": "Qwen Deep Research",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-doc-turbo",
        "name": "Qwen Doc Turbo",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-flash",
        "name": "qwen-flash",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-image",
        "name": "qwen-image",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-image-3",
        "name": "Qwen: Qwen Image 3",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-image-3-0",
        "name": "Qwen Image 3.0",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-image-3-0-pro",
        "name": "Qwen Image 3.0 Pro",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-image-3-pro",
        "name": "Qwen: Qwen Image 3 Pro",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-image-edit",
        "name": "qwen-image-edit",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-long",
        "name": "Qwen Long",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-math-plus",
        "name": "Qwen Math Plus",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-math-turbo",
        "name": "Qwen Math Turbo",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-max",
        "name": "Qwen Max",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-mt-plus",
        "name": "Qwen-MT Plus",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-mt-turbo",
        "name": "Qwen-MT Turbo",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-omni-turbo",
        "name": "Qwen-Omni Turbo",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-omni-turbo-realtime",
        "name": "Qwen-Omni Turbo Realtime",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-plus",
        "name": "qwen-plus",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-plus-character",
        "name": "qwen-plus-character",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-plus-character-ja",
        "name": "Qwen Plus Character (Japanese)",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-turbo",
        "name": "qwen-turbo",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-vl-max",
        "name": "Qwen-VL Max",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-vl-ocr",
        "name": "Qwen-VL OCR",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen-vl-plus",
        "name": "Qwen-VL Plus",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen2-5-14b-instruct",
        "name": "Qwen2.5 14B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen2-5-32b-instruct",
        "name": "Qwen2.5 32B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen2-5-72b-instruct",
        "name": "Qwen2.5 72B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen2-5-7b-instruct",
        "name": "Qwen2.5 7B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen2-5-coder-32b-instruct",
        "name": "Qwen2.5-Coder 32B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen2-5-coder-7b-instruct",
        "name": "Qwen2.5-Coder 7B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen2-5-math-72b-instruct",
        "name": "Qwen2.5-Math 72B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen2-5-math-7b-instruct",
        "name": "Qwen2.5-Math 7B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen2-5-omni-7b",
        "name": "Qwen2.5-Omni 7B",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen2-5-vl-72b-instruct",
        "name": "Qwen2.5-VL 72B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen2-5-vl-7b-instruct",
        "name": "Qwen2.5-VL 7B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen3-14b",
        "name": "qwen3-14b",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen3-235b-a22b",
        "name": "qwen3-235b-a22b",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen3-235b-a22b-instruct-2507-maas",
        "name": "Qwen3 235B A22B Instruct",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen3-30b-a3b",
        "name": "Qwen: Qwen3 30B A3B Thinking 2507",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen3-30b-a3b-instruct",
        "name": "Qwen: Qwen3 30B A3B Instruct 2507",
        "group": "dashscope",
        "enabled": true
      },
      {
        "id": "qwen3-32b",
        "name": "qwen3-32b",
        "group": "dashscope",
        "enabled": true
      }
    ]
  },
  {
    "id": "stepfun",
    "name": "StepFun",
    "description": "StepFun - AI model provider",
    "baseUrl": "https://api.stepfun.com",
    "defaultBaseUrl": "https://api.stepfun.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://platform.stepfun.com/",
      "apiKey": "https://platform.stepfun.com/interface-key",
      "docs": "https://platform.stepfun.com/docs/overview/concept",
      "models": "https://platform.stepfun.com/docs/llm/text"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "step-1-32k",
        "name": "Step 1 (32K)",
        "group": "stepfun",
        "enabled": true
      },
      {
        "id": "step-2-16k",
        "name": "Step 2 (16K)",
        "group": "stepfun",
        "enabled": true
      },
      {
        "id": "step-3-5-flash",
        "name": "Step 3.5 Flash 2603",
        "group": "stepfun",
        "enabled": true
      },
      {
        "id": "step-3-7-flash",
        "name": "Step 3.7 Flash",
        "group": "stepfun",
        "enabled": true
      },
      {
        "id": "step-tts-2",
        "name": "Step TTS 2",
        "group": "stepfun",
        "enabled": true
      },
      {
        "id": "stepaudio-2-5-asr",
        "name": "StepAudio 2.5 ASR",
        "group": "stepfun",
        "enabled": true
      },
      {
        "id": "stepaudio-2-5-tts",
        "name": "StepAudio 2.5 TTS",
        "group": "stepfun",
        "enabled": true
      }
    ]
  },
  {
    "id": "doubao",
    "name": "Doubao",
    "description": "Doubao - AI model provider",
    "baseUrl": "https://ark.cn-beijing.volces.com/api/v3/",
    "defaultBaseUrl": "https://ark.cn-beijing.volces.com/api/v3/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://console.volcengine.com/ark/",
      "apiKey": "https://www.volcengine.com/experience/ark",
      "docs": "https://console.volcengine.com/ark/region:cn-beijing/docs/82379/1099455?lang=zh",
      "models": "https://console.volcengine.com/ark/region:cn-beijing/model?view=CARD_VIEW"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "doubao-1-5-lite-32k",
        "name": "Doubao 1.5 Lite 32k",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-1-5-pro-256k",
        "name": "Doubao 1.5 Pro 256k",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-1-5-pro-32k",
        "name": "Doubao 1.5 Pro 32k",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-1-5-thinking-pro",
        "name": "Doubao 1.5 Thinking Pro",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-1-5-thinking-pro-m",
        "name": "doubao-1-5-thinking-pro-m",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-1-5-thinking-vision-pro",
        "name": "doubao-1-5-thinking-vision-pro",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-1-5-ui-tars",
        "name": "Doubao 1.5 UI-TARS",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-1-5-vision-lite",
        "name": "Doubao 1.5 Vision Lite",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-1-5-vision-pro",
        "name": "Doubao 1.5 Vision Pro",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-1-5-vision-pro-32k",
        "name": "Doubao 1.5 Vision Pro 32k",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-embedding-large-text",
        "name": "Doubao Embedding Large Text",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-embedding-text",
        "name": "Doubao Embedding Text",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-embedding-vision",
        "name": "Doubao Embedding Vision",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-1-6",
        "name": "Doubao Seed 1.6",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-1-6-flash",
        "name": "Doubao Seed 1.6 Flash",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-1-6-lite",
        "name": "Doubao Seed 1.6 Lite",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-1-6-vision",
        "name": "Doubao Seed 1.6 Vision",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-1-8",
        "name": "doubao-seed-1-8",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-2-0-code-preview",
        "name": "Doubao Seed 2.0 Code",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-2-0-lite",
        "name": "Doubao Seed 2.0 Lite",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-2-0-mini",
        "name": "Doubao Seed 2.0 Mini",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-2-0-pro",
        "name": "Doubao Seed 2.0 Pro",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-2-1-pro",
        "name": "Doubao Seed 2.1 Pro",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-2-1-turbo",
        "name": "Doubao Seed 2.1 Turbo",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-character",
        "name": "Doubao Seed Character",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-code-preview",
        "name": "Doubao Seed Code",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-evolving",
        "name": "doubao-seed-evolving",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seed-translation",
        "name": "Doubao Seed Translation",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seedance-1-0-lite-i2v",
        "name": "Doubao Seedance 1.0 Lite I2V",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seedance-1-0-lite-t2v",
        "name": "Doubao Seedance 1.0 Lite T2V",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seedance-1-0-pro",
        "name": "Doubao Seedance 1.0 Pro",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seedance-1-0-pro-fast",
        "name": "Doubao Seedance 1.0 Pro Fast",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seedance-2-0",
        "name": "Doubao Seedance 2.0",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seedance-2-0-fast",
        "name": "Doubao Seedance 2.0 Fast",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seedance-2-0-mini",
        "name": "Doubao Seedance 2.0 Mini",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seededit-3-0-i2i",
        "name": "Doubao SeedEdit 3.0 I2I",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seedream-3-0-t2i",
        "name": "Doubao Seedream 3.0 T2I",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seedream-4-0",
        "name": "Doubao Seedream 4 0",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seedream-4-5",
        "name": "Doubao Seedream 4 5",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seedream-5-0-lite",
        "name": "Doubao Seedream 5.0 Lite",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "doubao-seedream-5-0-pro",
        "name": "Doubao Seedream 5.0 Pro",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "seed-1-6",
        "name": "Seed 1.6",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "seed-1-8",
        "name": "Seed 1.8",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "seed-oss-36b-instruct",
        "name": "ByteDance-Seed/Seed-OSS-36B-Instruct",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "seedance-2-0",
        "name": "Seedance 2.0",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "seedance-2-0-fast",
        "name": "Seedance 2.0 Fast",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "seedance-2-0-mini",
        "name": "Seedance 2.0 Mini",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "seedance-2-5",
        "name": "Seedance 2.5",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "seedance-v1-0-pro",
        "name": "Seedance v1.0 Pro",
        "group": "doubao",
        "enabled": true
      },
      {
        "id": "seedance-v1-0-pro-fast",
        "name": "Seedance v1.0 Pro Fast",
        "group": "doubao",
        "enabled": true
      }
    ]
  },
  {
    "id": "minimax",
    "name": "MiniMax",
    "description": "MiniMax - AI model provider",
    "baseUrl": "https://api.minimaxi.com/v1/",
    "defaultBaseUrl": "https://api.minimaxi.com/v1/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://platform.minimaxi.com/",
      "apiKey": "https://platform.minimaxi.com/user-center/basic-information/interface-key",
      "docs": "https://platform.minimaxi.com/docs/api-reference/text-openai-api",
      "models": "https://platform.minimaxi.com/document/Models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "image-01",
        "name": "image-01",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "image-01-live",
        "name": "image-01-live",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-01",
        "name": "MiniMax: MiniMax-01",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-h3",
        "name": "MiniMax H3",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-h3-max",
        "name": "MiniMax H3 Max",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-m1",
        "name": "MiniMax: MiniMax M1",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-m2",
        "name": "MiniMax-M2",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-m2-1",
        "name": "MiniMax-M2.1",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-m2-1-lightning",
        "name": "MiniMax M2.1 Lightning",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-m2-5",
        "name": "MiniMax-M2.5",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-m2-5-highspeed",
        "name": "MiniMax-M2.5-highspeed",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-m2-7",
        "name": "MiniMax-M2.7",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-m2-7-highspeed",
        "name": "MiniMax-M2.7-highspeed",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-m2-her",
        "name": "MiniMax: MiniMax M2-her",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-m3",
        "name": "minimax-m3",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "minimax-m3-1-flash-preview",
        "name": "MiniMax-M3.1-Flash-Preview",
        "group": "minimax",
        "enabled": true
      },
      {
        "id": "MiniMax-M3.1-Flash-Preview",
        "name": "minimax-m3-1-flash-preview",
        "group": "minimax",
        "enabled": true
      }
    ]
  },
  {
    "id": "groq",
    "name": "Groq",
    "description": "Groq - AI model provider",
    "baseUrl": "https://api.groq.com/openai",
    "defaultBaseUrl": "https://api.groq.com/openai",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://groq.com/",
      "apiKey": "https://console.groq.com/keys",
      "docs": "https://console.groq.com/docs/quickstart",
      "models": "https://console.groq.com/docs/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "allam-2-7b",
        "name": "allam-2-7b",
        "group": "groq",
        "enabled": true
      },
      {
        "id": "openai/gpt-oss-120b",
        "name": "gpt-oss-120b",
        "group": "groq",
        "enabled": true
      },
      {
        "id": "openai/gpt-oss-20b",
        "name": "gpt-oss-20b",
        "group": "groq",
        "enabled": true
      },
      {
        "id": "openai/gpt-oss-safeguard-20b",
        "name": "gpt-oss-safeguard-20b",
        "group": "groq",
        "enabled": true
      },
      {
        "id": "llama-3.1-8b-instant",
        "name": "llama-3-1-8b-instant",
        "group": "groq",
        "enabled": true
      },
      {
        "id": "llama-3.3-70b-versatile",
        "name": "llama-3-3-70b-versatile",
        "group": "groq",
        "enabled": true
      },
      {
        "id": "meta-llama/llama-prompt-guard-2-22m",
        "name": "llama-prompt-guard-2-22m",
        "group": "groq",
        "enabled": true
      },
      {
        "id": "meta-llama/llama-prompt-guard-2-86m",
        "name": "llama-prompt-guard-2-86m",
        "group": "groq",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.6-27b",
        "name": "qwen3-6-27b",
        "group": "groq",
        "enabled": true
      },
      {
        "id": "qwen/qwen3.8-27b",
        "name": "qwen3-8-27b",
        "group": "groq",
        "enabled": true
      }
    ]
  },
  {
    "id": "together",
    "name": "Together",
    "description": "Together - AI model provider",
    "baseUrl": "https://api.together.ai",
    "defaultBaseUrl": "https://api.together.ai",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.together.ai",
      "apiKey": "https://api.together.ai/settings/projects/~current/api-keys",
      "docs": "https://docs.together.ai/intro",
      "models": "https://docs.together.ai/docs/serverless/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "deepseek-ai/DeepSeek-V4-Pro",
        "name": "deepseek-v4-pro",
        "group": "together",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-5",
        "name": "glm-5",
        "group": "together",
        "enabled": true
      },
      {
        "id": "openai/gpt-oss-120b",
        "name": "gpt-oss-120b",
        "group": "together",
        "enabled": true
      },
      {
        "id": "openai/gpt-oss-20b",
        "name": "gpt-oss-20b",
        "group": "together",
        "enabled": true
      },
      {
        "id": "moonshotai/Kimi-K2.6",
        "name": "kimi-k2-6",
        "group": "together",
        "enabled": true
      },
      {
        "id": "MiniMaxAI/MiniMax-M2.7",
        "name": "minimax-m2-7",
        "group": "together",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3.5-9B",
        "name": "qwen3-5-9b",
        "group": "together",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3.6-Plus",
        "name": "qwen3-6-plus",
        "group": "together",
        "enabled": true
      }
    ]
  },
  {
    "id": "fireworks",
    "name": "Fireworks",
    "description": "Fireworks - AI model provider",
    "baseUrl": "https://api.fireworks.ai/inference",
    "defaultBaseUrl": "https://api.fireworks.ai/inference",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://fireworks.ai/",
      "apiKey": "https://fireworks.ai/account/api-keys",
      "docs": "https://docs.fireworks.ai/getting-started/introduction",
      "models": "https://fireworks.ai/dashboard/models"
    },
    "defaultChatEndpoint": "openai-responses",
    "models": [
      {
        "id": "accounts/fireworks/models/deepseek-v4-flash-0731",
        "name": "deepseek-v4-flash",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/deepseek-v4-flash-vision-exp",
        "name": "deepseek-v4-flash-vision-exp",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/deepseek-v4-pro-0813",
        "name": "deepseek-v4-pro",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/routers/glm-5p1-fast",
        "name": "glm-5-1-fast",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/glm-5p2",
        "name": "glm-5-2",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/routers/glm-5p2-fast",
        "name": "glm-5-2-fast",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/glm-5p3",
        "name": "glm-5-3",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/routers/glm-5p3-fast",
        "name": "glm-5-3-fast",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/glm-5p3-flash",
        "name": "glm-5-3-flash",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/gpt-oss-120b",
        "name": "gpt-oss-120b",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/gpt-oss-20b",
        "name": "gpt-oss-20b",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/inkling",
        "name": "inkling",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/kimi-k2p6",
        "name": "kimi-k2-6",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/routers/kimi-k2p6-fast",
        "name": "kimi-k2-6-fast",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/routers/kimi-k2p6-turbo",
        "name": "kimi-k2-6-turbo",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/kimi-k2p7-code",
        "name": "kimi-k2-7-code",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/routers/kimi-k2p7-code-fast",
        "name": "kimi-k2-7-code-fast",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/kimi-k3",
        "name": "kimi-k3",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/routers/kimi-k3-fast",
        "name": "kimi-k3-fast",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/minimax-m2p7",
        "name": "minimax-m2-7",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/minimax-m3",
        "name": "minimax-m3",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/muse-glimmer-30b",
        "name": "muse-glimmer-30b",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/nemotron-3-ultra-nvfp4",
        "name": "nemotron-3-ultra-nvfp4",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/nemotron-lightning-3p5-30b-a3b",
        "name": "nemotron-lightning-3-5-30b-a3b",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/qwen3p7-plus",
        "name": "qwen3-7-plus",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/qwen3p8-2p4t-a95b",
        "name": "qwen3-8-2-4t-a95b",
        "group": "fireworks",
        "enabled": true
      },
      {
        "id": "accounts/fireworks/models/qwen3p8-max",
        "name": "qwen3-8-max",
        "group": "fireworks",
        "enabled": true
      }
    ]
  },
  {
    "id": "nvidia",
    "name": "nvidia",
    "description": "nvidia - AI model provider",
    "baseUrl": "https://integrate.api.nvidia.com",
    "defaultBaseUrl": "https://integrate.api.nvidia.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://build.nvidia.com/explore/discover",
      "apiKey": "https://build.nvidia.com/meta/llama-3_1-405b-instruct",
      "docs": "https://docs.api.nvidia.com/nim/reference/llm-apis",
      "models": "https://build.nvidia.com/nim"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "active-speaker-detection",
        "name": "Active Speaker Detection",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "bevformer",
        "name": "bevformer",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "cosmos-predict1-5b",
        "name": "cosmos-predict1-5b",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "cosmos-reason2-8b",
        "name": "Cosmos Reason2 8B",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "cosmos-transfer1-7b",
        "name": "cosmos-transfer1-7b",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "cosmos-transfer2-5-2b",
        "name": "cosmos-transfer2.5-2b",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "esm2-650m",
        "name": "esm2-650m",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "esmfold",
        "name": "esmfold",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "gliner-pii",
        "name": "gliner-pii",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "laguna-xs-2-1",
        "name": "Laguna XS 2.1",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "llama-3-1-nemotron-70b-instruct",
        "name": "Llama 3.1 Nemotron 70B Instruct",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "llama-3-1-nemotron-nano-8b-v1",
        "name": "Llama 3.1 Nemotron Nano 8B v1",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "llama-3-1-nemotron-nano-vl-8b-v1",
        "name": "Llama 3.1 Nemotron Nano VL 8B v1",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "llama-3-1-nemotron-safety-guard-8b-v3",
        "name": "llama-3.1-nemotron-safety-guard-8b-v3",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "llama-3-1-nemotron-ultra-253b-v1",
        "name": "Llama 3.1 Nemotron Ultra 253B",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "magpie-tts-zeroshot",
        "name": "magpie-tts-zeroshot",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "mixtral-8x22b-instruct",
        "name": "Mistral: Mixtral 8x22B Instruct",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "mixtral-8x7b-instruct",
        "name": "Mistral: Mixtral 8x7B Instruct",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "muse-glimmer-30b",
        "name": "Muse Glimmer 30B",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-3-5-content-safety",
        "name": "NVIDIA: Nemotron 3.5 Content Safety",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-3-5-lightning",
        "name": "Nemotron 3.5 Lightning 30B",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-3-5-lightning-30b-a3b",
        "name": "Nemotron 3.5 Lightning 30B A3B",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-3-content-safety",
        "name": "nemotron-3-content-safety",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-3-nano-30b-a3b",
        "name": "nemotron-3-nano-30b-a3b",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-3-nano-omni-30b-a3b",
        "name": "Nemotron 3 Nano Omni",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-3-super-120b-a12b",
        "name": "Nemotron 3 Super",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-3-ultra-550b-a55b",
        "name": "Nemotron 3 Ultra 550B A55B",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-content-safety-reasoning-4b",
        "name": "nemotron-content-safety-reasoning-4b",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-mini-4b-instruct",
        "name": "nemotron-mini-4b-instruct",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-nano-12b-v2",
        "name": "NVIDIA Nemotron Nano 12B v2 VL BF16",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-nano-12b-v2-vl",
        "name": "Nemotron Nano 12B v2 VL",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-nano-3-30b",
        "name": "NVIDIA Nemotron Nano 3 30B",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-nano-9b-v2",
        "name": "nvidia-nemotron-nano-9b-v2",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-super-3-120b",
        "name": "NVIDIA Nemotron 3 Super 120B A12B",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nemotron-voicechat",
        "name": "nemotron-voicechat",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nv-embed-v1",
        "name": "nv-embed-v1",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nv-embedcode-7b-v1",
        "name": "nv-embedcode-7b-v1",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "paligemma",
        "name": "paligemma",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "rerank-qa-mistral-4b",
        "name": "rerank-qa-mistral-4b",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "riva-translate-4b-instruct-v1-1",
        "name": "riva-translate-4b-instruct-v1_1",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "sarvam-m",
        "name": "sarvam-m",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "sparsedrive",
        "name": "sparsedrive",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "streampetr",
        "name": "streampetr",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "studiovoice",
        "name": "studiovoice",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "synthetic-video-detector",
        "name": "synthetic-video-detector",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "usdcode",
        "name": "usdcode",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "usdvalidate",
        "name": "usdvalidate",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "whisper-large-v3",
        "name": "Whisper Large v3",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nvidia/active-speaker-detection",
        "name": "active-speaker-detection",
        "group": "nvidia",
        "enabled": true
      },
      {
        "id": "nvidia/bevformer",
        "name": "bevformer",
        "group": "nvidia",
        "enabled": true
      }
    ]
  },
  {
    "id": "grok",
    "name": "Grok",
    "description": "Grok - AI model provider",
    "baseUrl": "https://api.x.ai",
    "defaultBaseUrl": "https://api.x.ai",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://x.ai/",
      "apiKey": "",
      "docs": "https://docs.x.ai/",
      "models": "https://docs.x.ai/docs/models"
    },
    "defaultChatEndpoint": "openai-responses",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "grok",
        "enabled": true
      }
    ]
  },
  {
    "id": "mistral",
    "name": "Mistral",
    "description": "Mistral - AI model provider",
    "baseUrl": "https://api.mistral.ai",
    "defaultBaseUrl": "https://api.mistral.ai",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://mistral.ai",
      "apiKey": "https://console.mistral.ai/api-keys/",
      "docs": "https://docs.mistral.ai",
      "models": "https://docs.mistral.ai/getting-started/models/models_overview"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "codestral",
        "name": "Codestral (latest)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "codestral-embed",
        "name": "Codestral Embed",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "codestral-latest",
        "name": "Codestral (latest)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "devstral",
        "name": "Devstral 2",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "devstral-2",
        "name": "Devstral 2",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "devstral-2-123b",
        "name": "Devstral 2 123B",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "devstral-latest",
        "name": "Devstral 2",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "devstral-medium",
        "name": "Devstral Medium",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "devstral-medium-latest",
        "name": "Devstral 2 (latest)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "devstral-small",
        "name": "Devstral Small",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "devstral-small-2",
        "name": "Devstral Small 2",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "magistral-medium-latest",
        "name": "Magistral Medium (latest)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "magistral-small",
        "name": "Magistral Small 2506",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "ministral-14b",
        "name": "Ministral 14B",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "ministral-14b-instruct",
        "name": "Ministral 3 14B Instruct 2512",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "ministral-3-14b-instruct",
        "name": "Ministral 14B 3.0",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "ministral-3-3b-instruct",
        "name": "Ministral 3 3B",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "ministral-3-8b-instruct",
        "name": "Ministral 3 8B",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "ministral-3b",
        "name": "Ministral 3B (latest)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "ministral-3b-latest",
        "name": "Ministral 3B (latest)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "ministral-8b",
        "name": "Ministral 8B (latest)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "ministral-8b-latest",
        "name": "Ministral 8B (latest)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-7b-instruct-v0-3",
        "name": "Mistral-7B-Instruct-v0.3",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-embed",
        "name": "Mistral Embed",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-large",
        "name": "Mistral Large 3",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-large-3",
        "name": "Mistral Large 3",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-large-3-675b-instruct",
        "name": "Mistral Large 3 675B Instruct 2512",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-large-latest",
        "name": "Mistral Large (latest)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-medium",
        "name": "Mistral Medium 3.1",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-medium-3",
        "name": "Mistral: Mistral Medium 3",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-medium-3-1",
        "name": "Mistral: Mistral Medium 3.1",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-medium-3-5",
        "name": "Mistral Medium Latest",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-medium-3-5-128b",
        "name": "Mistral Medium 3.5",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-medium-3-instruct",
        "name": "Mistral Medium 3",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-medium-latest",
        "name": "Mistral Medium (latest)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-nemo",
        "name": "Mistral Nemo",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-nemotron",
        "name": "mistral-nemotron",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-saba",
        "name": "Mistral: Saba",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-small",
        "name": "Mistral Small (latest)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-small-24b-instruct",
        "name": "Mistral: Mistral Small 3",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-small-3-1-24b-instruct",
        "name": "Mistral: Mistral Small 3.1 24B",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-small-3-2-24b-instruct",
        "name": "Mistral: Mistral Small 3.2 24B",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-small-4-119b",
        "name": "mistral-small-4-119b-2603",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "mistral-small-latest",
        "name": "Mistral Small (latest)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "open-mistral-7b",
        "name": "Mistral 7B",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "open-mixtral-8x22b",
        "name": "Mixtral 8x22B",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "open-mixtral-8x7b",
        "name": "Mixtral 8x7B",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "pixtral-12b",
        "name": "Pixtral 12B",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "pixtral-large",
        "name": "Pixtral Large (25.02) (EU)",
        "group": "mistral",
        "enabled": true
      },
      {
        "id": "pixtral-large-latest",
        "name": "Pixtral Large (latest)",
        "group": "mistral",
        "enabled": true
      }
    ]
  },
  {
    "id": "jina",
    "name": "Jina",
    "description": "Jina - AI model provider",
    "baseUrl": "https://api.jina.ai",
    "defaultBaseUrl": "https://api.jina.ai",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://jina.ai",
      "apiKey": "https://jina.ai/",
      "docs": "https://api.jina.ai/scalar",
      "models": "https://jina.ai"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "jina-clip-v1",
        "name": "Jina CLIP v1",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-clip-v2",
        "name": "Jina CLIP v2",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-code-embeddings-0-5b",
        "name": "Jina Code Embeddings 0.5B",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-code-embeddings-1-5b",
        "name": "Jina Code Embeddings 1.5B",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-colbert-v1-en",
        "name": "Jina ColBERT v1 EN",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-colbert-v2",
        "name": "Jina ColBERT v2",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-embedding-b-en-v1",
        "name": "Jina Embedding B EN v1",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-embeddings-v2-base-code",
        "name": "Jina Embeddings v2 Base Code",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-embeddings-v2-base-de",
        "name": "Jina Embeddings v2 Base DE",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-embeddings-v2-base-en",
        "name": "Jina Embeddings v2 Base EN",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-embeddings-v2-base-es",
        "name": "Jina Embeddings v2 Base ES",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-embeddings-v2-base-zh",
        "name": "Jina Embeddings v2 Base ZH",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-embeddings-v3",
        "name": "Jina Embeddings v3",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-embeddings-v4",
        "name": "Jina Embeddings v4",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-embeddings-v5-omni-nano",
        "name": "Jina Embeddings v5 Omni Nano",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-embeddings-v5-omni-small",
        "name": "Jina Embeddings v5 Omni Small",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-embeddings-v5-text-nano",
        "name": "Jina Embeddings v5 Text Nano",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-embeddings-v5-text-small",
        "name": "Jina Embeddings v5 Text Small",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-reranker-m0",
        "name": "Jina Reranker m0",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-reranker-v1-base-en",
        "name": "Jina Reranker v1 Base EN",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-reranker-v1-tiny-en",
        "name": "Jina Reranker v1 Tiny EN",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-reranker-v1-turbo-en",
        "name": "Jina Reranker v1 Turbo EN",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-reranker-v2-base-multilingual",
        "name": "Jina Reranker v2 Base Multilingual",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-reranker-v3",
        "name": "Jina Reranker v3",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-code-embeddings-0.5b",
        "name": "jina-code-embeddings-0-5b",
        "group": "jina",
        "enabled": true
      },
      {
        "id": "jina-code-embeddings-1.5b",
        "name": "jina-code-embeddings-1-5b",
        "group": "jina",
        "enabled": true
      }
    ]
  },
  {
    "id": "perplexity",
    "name": "Perplexity",
    "description": "Perplexity - AI model provider",
    "baseUrl": "https://api.perplexity.ai/",
    "defaultBaseUrl": "https://api.perplexity.ai/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://perplexity.ai/",
      "apiKey": "https://www.perplexity.ai/settings/api",
      "docs": "https://docs.perplexity.ai/home",
      "models": "https://docs.perplexity.ai/guides/model-cards"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "sonar",
        "name": "Sonar",
        "group": "perplexity",
        "enabled": true
      },
      {
        "id": "sonar-deep-research",
        "name": "Perplexity Sonar Deep Research",
        "group": "perplexity",
        "enabled": true
      },
      {
        "id": "sonar-pro",
        "name": "Sonar Pro",
        "group": "perplexity",
        "enabled": true
      },
      {
        "id": "sonar-reasoning-pro",
        "name": "Sonar Reasoning Pro",
        "group": "perplexity",
        "enabled": true
      }
    ]
  },
  {
    "id": "modelscope",
    "name": "ModelScope",
    "description": "ModelScope - AI model provider",
    "baseUrl": "https://api-inference.modelscope.cn/v1/",
    "defaultBaseUrl": "https://api-inference.modelscope.cn/v1/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://modelscope.cn",
      "apiKey": "https://modelscope.cn/my/myaccesstoken",
      "docs": "https://modelscope.cn/docs/model-service/API-Inference/intro",
      "models": "https://modelscope.cn/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "ZhipuAI/GLM-4.5",
        "name": "glm-4-5",
        "group": "modelscope",
        "enabled": true
      },
      {
        "id": "ZhipuAI/GLM-4.6",
        "name": "glm-4-6",
        "group": "modelscope",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-235B-A22B-Thinking-2507",
        "name": "qwen3-235b-a22b",
        "group": "modelscope",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-235B-A22B-Instruct-2507",
        "name": "qwen3-235b-a22b-instruct",
        "group": "modelscope",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-30B-A3B-Thinking-2507",
        "name": "qwen3-30b-a3b",
        "group": "modelscope",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-30B-A3B-Instruct-2507",
        "name": "qwen3-30b-a3b-instruct",
        "group": "modelscope",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-Coder-30B-A3B-Instruct",
        "name": "qwen3-coder-30b-a3b-instruct",
        "group": "modelscope",
        "enabled": true
      }
    ]
  },
  {
    "id": "xirang",
    "name": "Xirang",
    "description": "Xirang - AI model provider",
    "baseUrl": "https://wishub-x1.ctyun.cn",
    "defaultBaseUrl": "https://wishub-x1.ctyun.cn",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.ctyun.cn",
      "apiKey": "https://huiju.ctyun.cn/service/serviceGroup",
      "docs": "https://www.ctyun.cn/products/ctxirang",
      "models": "https://huiju.ctyun.cn/modelSquare/"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "xirang",
        "enabled": true
      }
    ]
  },
  {
    "id": "tokenhub",
    "name": "TokenHub",
    "description": "TokenHub - AI model provider",
    "baseUrl": "https://tokenhub.tencentmaas.com/v1",
    "defaultBaseUrl": "https://tokenhub.tencentmaas.com/v1",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://cloud.tencent.com/product/tokenhub",
      "apiKey": "https://console.cloud.tencent.com/tokenhub/apikey",
      "docs": "https://cloud.tencent.com/document/product/1823",
      "models": "https://cloud.tencent.com/document/product/1823/130079"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "deepseek-v4-flash",
        "name": "deepseek-v4-flash",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "deepseek-v4-flash-202605",
        "name": "deepseek-v4-flash",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "deepseek-v4-pro",
        "name": "deepseek-v4-pro",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "deepseek-v4-pro-202606",
        "name": "deepseek-v4-pro",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "seedream-image-v5.0-lite",
        "name": "doubao-seedream-5-0-lite",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "seedream-image-v5.0-pro",
        "name": "doubao-seedream-5-0-pro",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "glm-5",
        "name": "glm-5",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "glm-5.1",
        "name": "glm-5-1",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "glm-5.2",
        "name": "glm-5-2",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "glm-5-turbo",
        "name": "glm-5-turbo",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "glm-5v-turbo",
        "name": "glm-5v-turbo",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "hy-image-v3",
        "name": "hy-image-v3-0",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "hy-mt2-lite",
        "name": "hy-mt2-lite",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "hy-mt2-plus",
        "name": "hy-mt2-plus",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "hy-mt2-pro",
        "name": "hy-mt2-pro",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "hy-role",
        "name": "hy-role",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "hy4-preview",
        "name": "hy4-preview",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "kimi-k2.5",
        "name": "kimi-k2-5",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "kimi-k2.6",
        "name": "kimi-k2-6",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "kimi-k2.7-code",
        "name": "kimi-k2-7-code",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "minimax-m2.7",
        "name": "minimax-m2-7",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "minimax-m3",
        "name": "minimax-m3",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "qwen3.5-flash",
        "name": "qwen3-5-flash",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "qwen3.5-plus",
        "name": "qwen3-5-plus",
        "group": "tokenhub",
        "enabled": true
      },
      {
        "id": "vidu-image-q2",
        "name": "viduq2",
        "group": "tokenhub",
        "enabled": true
      }
    ]
  },
  {
    "id": "baidu-cloud",
    "name": "Baidu Cloud",
    "description": "Baidu Cloud - AI model provider",
    "baseUrl": "https://qianfan.baidubce.com/v2/",
    "defaultBaseUrl": "https://qianfan.baidubce.com/v2/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://cloud.baidu.com/",
      "apiKey": "https://console.bce.baidu.com/iam/#/iam/apikey/list",
      "docs": "https://cloud.baidu.com/doc/index.html",
      "models": "https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Fm2vrveyu"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "baidu-cloud",
        "enabled": true
      }
    ]
  },
  {
    "id": "gpustack",
    "name": "GPUStack",
    "description": "GPUStack - AI model provider",
    "baseUrl": "",
    "defaultBaseUrl": "",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://gpustack.ai/",
      "apiKey": "",
      "docs": "https://docs.gpustack.ai/latest/",
      "models": "https://docs.gpustack.ai/latest/overview/#supported-models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "gpustack",
        "enabled": true
      }
    ]
  },
  {
    "id": "voyageai",
    "name": "VoyageAI",
    "description": "VoyageAI - AI model provider",
    "baseUrl": "https://api.voyageai.com",
    "defaultBaseUrl": "https://api.voyageai.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.voyageai.com/",
      "apiKey": "https://dashboard.voyageai.com/organization/api-keys",
      "docs": "https://docs.voyageai.com/docs",
      "models": "https://docs.voyageai.com/docs"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "rerank-1",
        "name": "rerank-1",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "rerank-2",
        "name": "rerank-2",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "rerank-2-5",
        "name": "rerank-2-5",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "rerank-2-5-lite",
        "name": "rerank-2-5-lite",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "rerank-2-lite",
        "name": "rerank-2-lite",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "rerank-lite-1",
        "name": "rerank-lite-1",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-2",
        "name": "voyage-2",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-3",
        "name": "voyage-3",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-3-5",
        "name": "voyage-3-5",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-3-5-lite",
        "name": "voyage-3-5-lite",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-3-large",
        "name": "voyage-3-large",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-3-lite",
        "name": "voyage-3-lite",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-4",
        "name": "voyage-4",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-4-large",
        "name": "voyage-4-large",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-4-lite",
        "name": "voyage-4-lite",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-4-nano",
        "name": "voyage-4-nano",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-code-2",
        "name": "voyage-code-2",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-code-3",
        "name": "voyage-code-3",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-finance-2",
        "name": "voyage-finance-2",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-large-2",
        "name": "voyage-large-2",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-large-2-instruct",
        "name": "voyage-large-2-instruct",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-law-2",
        "name": "voyage-law-2",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-multilingual-2",
        "name": "voyage-multilingual-2",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-multimodal-3",
        "name": "voyage-multimodal-3",
        "group": "voyageai",
        "enabled": true
      },
      {
        "id": "voyage-multimodal-3-5",
        "name": "voyage-multimodal-3-5",
        "group": "voyageai",
        "enabled": true
      }
    ]
  },
  {
    "id": "aws-bedrock",
    "name": "AWS Bedrock",
    "description": "AWS Bedrock - AI model provider",
    "baseUrl": "",
    "defaultBaseUrl": "",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://aws.amazon.com/bedrock/",
      "apiKey": "https://docs.aws.amazon.com/bedrock/latest/userguide/security-iam.html",
      "docs": "https://docs.aws.amazon.com/bedrock/",
      "models": "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html"
    },
    "defaultChatEndpoint": "anthropic-messages",
    "models": [
      {
        "id": "global.anthropic.claude-fable-5",
        "name": "claude-fable-5",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "global.anthropic.claude-haiku-4-5-20251001-v1:0",
        "name": "claude-haiku-4-5",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "anthropic.claude-opus-4-1-20250805-v1:0",
        "name": "claude-opus-4-1",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "global.anthropic.claude-opus-4-5-20251101-v1:0",
        "name": "claude-opus-4-5",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "global.anthropic.claude-opus-4-6-v1",
        "name": "claude-opus-4-6",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "global.anthropic.claude-opus-4-7",
        "name": "claude-opus-4-7",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "global.anthropic.claude-opus-4-8",
        "name": "claude-opus-4-8",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "global.anthropic.claude-sonnet-4-5-20250929-v1:0",
        "name": "claude-sonnet-4-5",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "global.anthropic.claude-sonnet-4-6",
        "name": "claude-sonnet-4-6",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "deepseek.r1-v1:0",
        "name": "deepseek-r1",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "deepseek.v3-v1:0",
        "name": "deepseek-v3",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "deepseek.v3.2",
        "name": "deepseek-v3-2",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "mistral.devstral-2-123b",
        "name": "devstral-2-123b",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "google.gemma-3-12b-it",
        "name": "gemma-3-12b-it",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "google.gemma-3-27b-it",
        "name": "gemma-3-27b-it",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "google.gemma-3-4b-it",
        "name": "gemma-3-4b-it",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "zai.glm-4.7",
        "name": "glm-4-7",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "zai.glm-4.7-flash",
        "name": "glm-4-7-flash",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "zai.glm-5",
        "name": "glm-5",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "openai.gpt-oss-120b",
        "name": "gpt-oss-120b",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "openai.gpt-oss-20b",
        "name": "gpt-oss-20b",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "openai.gpt-oss-safeguard-120b",
        "name": "gpt-oss-safeguard-120b",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "openai.gpt-oss-safeguard-20b",
        "name": "gpt-oss-safeguard-20b",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "moonshot.kimi-k2-thinking",
        "name": "kimi-k2",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "moonshotai.kimi-k2.5",
        "name": "kimi-k2-5",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "meta.llama3-1-70b-instruct-v1:0",
        "name": "llama3-1-70b-instruct",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "meta.llama3-1-8b-instruct-v1:0",
        "name": "llama3-1-8b-instruct",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "meta.llama3-3-70b-instruct-v1:0",
        "name": "llama3-3-70b-instruct",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "meta.llama4-maverick-17b-instruct-v1:0",
        "name": "llama4-maverick-17b-instruct",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "meta.llama4-scout-17b-instruct-v1:0",
        "name": "llama4-scout-17b-instruct",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "mistral.magistral-small-2509",
        "name": "magistral-small",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "minimax.minimax-m2",
        "name": "minimax-m2",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "minimax.minimax-m2.1",
        "name": "minimax-m2-1",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "minimax.minimax-m2.5",
        "name": "minimax-m2-5",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "mistral.ministral-3-14b-instruct",
        "name": "ministral-3-14b-instruct",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "mistral.ministral-3-3b-instruct",
        "name": "ministral-3-3b-instruct",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "mistral.ministral-3-8b-instruct",
        "name": "ministral-3-8b-instruct",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "mistral.mistral-large-3-675b-instruct",
        "name": "mistral-large-3-675b-instruct",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "nvidia.nemotron-nano-12b-v2",
        "name": "nemotron-nano-12b",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "nvidia.nemotron-nano-3-30b",
        "name": "nemotron-nano-3-30b",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "nvidia.nemotron-nano-9b-v2",
        "name": "nemotron-nano-9b",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "nvidia.nemotron-super-3-120b",
        "name": "nemotron-super-3-120b",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "amazon.nova-2-lite-v1:0",
        "name": "nova-2-lite",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "amazon.nova-lite-v1:0",
        "name": "nova-lite",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "amazon.nova-micro-v1:0",
        "name": "nova-micro",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "amazon.nova-pro-v1:0",
        "name": "nova-pro",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "writer.palmyra-x4-v1:0",
        "name": "palmyra-x4",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "writer.palmyra-x5-v1:0",
        "name": "palmyra-x5",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "mistral.pixtral-large-2502-v1:0",
        "name": "pixtral-large",
        "group": "aws-bedrock",
        "enabled": true
      },
      {
        "id": "qwen.qwen3-235b-a22b-2507-v1:0",
        "name": "qwen3-235b-a22b",
        "group": "aws-bedrock",
        "enabled": true
      }
    ]
  },
  {
    "id": "poe",
    "name": "Poe",
    "description": "Poe - AI model provider",
    "baseUrl": "https://api.poe.com/v1/",
    "defaultBaseUrl": "https://api.poe.com/v1/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://poe.com/",
      "apiKey": "https://poe.com/api/keys",
      "docs": "https://creator.poe.com/docs",
      "models": "https://poe.com/api/models"
    },
    "defaultChatEndpoint": "openai-responses",
    "models": [
      {
        "id": "claude-haiku-4.5",
        "name": "claude-haiku-4-5",
        "group": "poe",
        "enabled": true
      },
      {
        "id": "claude-opus-4.5",
        "name": "claude-opus-4-5",
        "group": "poe",
        "enabled": true
      },
      {
        "id": "Claude-Opus-4.6",
        "name": "claude-opus-4-6",
        "group": "poe",
        "enabled": true
      },
      {
        "id": "Claude-Opus-4.7",
        "name": "claude-opus-4-7",
        "group": "poe",
        "enabled": true
      },
      {
        "id": "Claude-Opus-4.8",
        "name": "claude-opus-4-8",
        "group": "poe",
        "enabled": true
      },
      {
        "id": "claude-sonnet-4.5",
        "name": "claude-sonnet-4-5",
        "group": "poe",
        "enabled": true
      },
      {
        "id": "Claude-Sonnet-4.6",
        "name": "claude-sonnet-4-6",
        "group": "poe",
        "enabled": true
      },
      {
        "id": "Gemini-3.1-Pro",
        "name": "gemini-3-1-pro-preview",
        "group": "poe",
        "enabled": true
      },
      {
        "id": "GPT-5.4",
        "name": "gpt-5-4",
        "group": "poe",
        "enabled": true
      }
    ]
  },
  {
    "id": "longcat",
    "name": "LongCat",
    "description": "LongCat - AI model provider",
    "baseUrl": "https://api.longcat.chat/openai",
    "defaultBaseUrl": "https://api.longcat.chat/openai",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://longcat.chat",
      "apiKey": "https://longcat.chat/platform/api_keys",
      "docs": "https://longcat.chat/platform/docs/zh/",
      "models": "https://longcat.chat/platform/docs/zh/APIDocs.html"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "LongCat-2.0",
        "name": "longcat-2-0",
        "group": "longcat",
        "enabled": true
      }
    ]
  },
  {
    "id": "huggingface",
    "name": "Hugging Face",
    "description": "Hugging Face - AI model provider",
    "baseUrl": "https://router.huggingface.co/v1/",
    "defaultBaseUrl": "https://router.huggingface.co/v1/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://huggingface.co/",
      "apiKey": "https://huggingface.co/settings/tokens",
      "docs": "https://huggingface.co/docs",
      "models": "https://huggingface.co/models"
    },
    "defaultChatEndpoint": "openai-responses",
    "models": [
      {
        "id": "deepseek-ai/DeepSeek-R1-0528",
        "name": "deepseek-r1",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V3",
        "name": "deepseek-v3",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V3.1",
        "name": "deepseek-v3-1",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V3.2",
        "name": "deepseek-v3-2",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V4-Flash",
        "name": "deepseek-v4-flash",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V4-Flash-Vision-Exp",
        "name": "deepseek-v4-flash-vision-exp",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "deepseek-ai/DeepSeek-V4-Pro-0813",
        "name": "deepseek-v4-pro",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "google/gemma-4-26B-A4B-it",
        "name": "gemma-4-26b-a4b-it",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "google/gemma-4-31B-it",
        "name": "gemma-4-31b-it",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-4.5",
        "name": "glm-4-5",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-4.5-Air",
        "name": "glm-4-5-air",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-4.5V",
        "name": "glm-4-5v",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-4.6",
        "name": "glm-4-6",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-4.6V-Flash",
        "name": "glm-4-6v-flash",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-4.7",
        "name": "glm-4-7",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-4.7-Flash",
        "name": "glm-4-7-flash",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-5",
        "name": "glm-5",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-5.1",
        "name": "glm-5-1",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-5.2",
        "name": "glm-5-2",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-5.3",
        "name": "glm-5-3",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "zai-org/GLM-5.3-Flash",
        "name": "glm-5-3-flash",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "openai/gpt-oss-120b",
        "name": "gpt-oss-120b",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "openai/gpt-oss-20b",
        "name": "gpt-oss-20b",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "tencent/Hy3",
        "name": "hy3",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "thinkingmachines/Inkling",
        "name": "inkling",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "thinkingmachines/Inkling-Small",
        "name": "inkling-small",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "moonshotai/Kimi-K2-Thinking",
        "name": "kimi-k2",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "moonshotai/Kimi-K2.5",
        "name": "kimi-k2-5",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "moonshotai/Kimi-K2.6",
        "name": "kimi-k2-6",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "moonshotai/Kimi-K2.7-Code",
        "name": "kimi-k2-7-code",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "moonshotai/Kimi-K2-Instruct-0905",
        "name": "kimi-k2-instruct",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "moonshotai/Kimi-K3",
        "name": "kimi-k3",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "meta-llama/Llama-3.1-8B-Instruct",
        "name": "llama-3-1-8b-instruct",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "meta-llama/Llama-3.3-70B-Instruct",
        "name": "llama-3-3-70b-instruct",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "XiaomiMiMo/MiMo-V2.5",
        "name": "mimo-v2-5",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "XiaomiMiMo/MiMo-V2.5-Pro",
        "name": "mimo-v2-5-pro",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "XiaomiMiMo/MiMo-V2-Flash",
        "name": "mimo-v2-flash",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "MiniMaxAI/MiniMax-M2",
        "name": "minimax-m2",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "MiniMaxAI/MiniMax-M2.1",
        "name": "minimax-m2-1",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "MiniMaxAI/MiniMax-M2.5",
        "name": "minimax-m2-5",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "MiniMaxAI/MiniMax-M2.7",
        "name": "minimax-m2-7",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "MiniMaxAI/MiniMax-M3",
        "name": "minimax-m3",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen2.5-Coder-32B-Instruct",
        "name": "qwen2-5-coder-32b-instruct",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-235B-A22B",
        "name": "qwen3-235b-a22b",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-235B-A22B-Instruct-2507",
        "name": "qwen3-235b-a22b-instruct",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-30B-A3B",
        "name": "qwen3-30b-a3b",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3-32B",
        "name": "qwen3-32b",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3.5-122B-A10B",
        "name": "qwen3-5-122b-a10b",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3.5-27B",
        "name": "qwen3-5-27b",
        "group": "huggingface",
        "enabled": true
      },
      {
        "id": "Qwen/Qwen3.5-35B-A3B",
        "name": "qwen3-5-35b-a3b",
        "group": "huggingface",
        "enabled": true
      }
    ]
  },
  {
    "id": "gateway",
    "name": "Vercel AI Gateway",
    "description": "Vercel AI Gateway - AI model provider",
    "baseUrl": "https://ai-gateway.vercel.sh/v1/ai",
    "defaultBaseUrl": "https://ai-gateway.vercel.sh/v1/ai",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://vercel.com/ai-gateway",
      "apiKey": "https://vercel.com/",
      "docs": "https://vercel.com/docs/ai-gateway",
      "models": "https://vercel.com/ai-gateway/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "anthropic/claude-3-haiku",
        "name": "claude-3-haiku",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-fable-5",
        "name": "claude-fable-5",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-fable-5.1",
        "name": "claude-fable-5-1",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-haiku-4.5",
        "name": "claude-haiku-4-5",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-4",
        "name": "claude-opus-4",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-4.5",
        "name": "claude-opus-4-5",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-4.6",
        "name": "claude-opus-4-6",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-4.7",
        "name": "claude-opus-4-7",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-4.8",
        "name": "claude-opus-4-8",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-4.8-fast",
        "name": "claude-opus-4-8-fast",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-5",
        "name": "claude-opus-5",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-5.5",
        "name": "claude-opus-5-5",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-opus-5-fast",
        "name": "claude-opus-5-fast",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-sonnet-4",
        "name": "claude-sonnet-4",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-sonnet-4.5",
        "name": "claude-sonnet-4-5",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-sonnet-4.6",
        "name": "claude-sonnet-4-6",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-sonnet-5",
        "name": "claude-sonnet-5",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "anthropic/claude-sonnet-5.5",
        "name": "claude-sonnet-5-5",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "mistral/codestral",
        "name": "codestral",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "cohere/command-a",
        "name": "command-a",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-r1",
        "name": "deepseek-r1",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v3.1",
        "name": "deepseek-v3-1",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v3.1-terminus",
        "name": "deepseek-v3-1-terminus",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v3.2-thinking",
        "name": "deepseek-v3-2",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v4.1-flash-beta",
        "name": "deepseek-v4-1-flash-beta",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v4-flash-0731",
        "name": "deepseek-v4-flash",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v4-flash-vision-exp",
        "name": "deepseek-v4-flash-vision-exp",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "deepseek/deepseek-v4-pro-0813",
        "name": "deepseek-v4-pro",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "mistral/devstral-2",
        "name": "devstral-2",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "mistral/devstral-small-2",
        "name": "devstral-small-2",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "sakana/fugu-ultra",
        "name": "fugu-ultra",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-2.5-flash",
        "name": "gemini-2-5-flash",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-2.5-flash-image",
        "name": "gemini-2-5-flash-image",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-2.5-flash-lite",
        "name": "gemini-2-5-flash-lite",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-2.5-pro",
        "name": "gemini-2-5-pro",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3.1-flash-image",
        "name": "gemini-3-1-flash-image",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3.1-flash-image-preview",
        "name": "gemini-3-1-flash-image-preview",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3.1-flash-lite",
        "name": "gemini-3-1-flash-lite",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3.1-flash-lite-image",
        "name": "gemini-3-1-flash-lite-image",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3.1-pro-preview",
        "name": "gemini-3-1-pro-preview",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3.5-flash",
        "name": "gemini-3-5-flash",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3.5-flash-lite",
        "name": "gemini-3-5-flash-lite",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3.5-transcribe",
        "name": "gemini-3-5-transcribe",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3.6-flash",
        "name": "gemini-3-6-flash",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3.7-flash",
        "name": "gemini-3-7-flash",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3.8-flash",
        "name": "gemini-3-8-flash",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3-flash",
        "name": "gemini-3-flash",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-3-pro-image",
        "name": "gemini-3-pro-image",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemini-omni-flash-preview",
        "name": "gemini-omni-flash-preview",
        "group": "gateway",
        "enabled": true
      },
      {
        "id": "google/gemma-4-26b-a4b-it",
        "name": "gemma-4-26b-a4b-it",
        "group": "gateway",
        "enabled": true
      }
    ]
  },
  {
    "id": "cerebras",
    "name": "Cerebras AI",
    "description": "Cerebras AI - AI model provider",
    "baseUrl": "https://api.cerebras.ai/v1",
    "defaultBaseUrl": "https://api.cerebras.ai/v1",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.cerebras.ai",
      "apiKey": "https://cloud.cerebras.ai",
      "docs": "https://inference-docs.cerebras.ai/introduction",
      "models": "https://inference-docs.cerebras.ai/models/overview"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "gpt-oss-120b",
        "name": "gpt-oss-120b",
        "group": "cerebras",
        "enabled": true
      },
      {
        "id": "qwen-3.8-27b",
        "name": "qwen-3-8-27b",
        "group": "cerebras",
        "enabled": true
      }
    ]
  },
  {
    "id": "comfyui",
    "name": "ComfyUI",
    "description": "ComfyUI - AI model provider",
    "baseUrl": "http://localhost:8188",
    "defaultBaseUrl": "http://localhost:8188",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://www.comfy.org",
      "apiKey": "",
      "docs": "https://docs.comfy.org",
      "models": ""
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "comfyui",
        "enabled": true
      }
    ]
  },
  {
    "id": "mimo",
    "name": "Xiaomi MiMo",
    "description": "Xiaomi MiMo - AI model provider",
    "baseUrl": "https://api.xiaomimimo.com",
    "defaultBaseUrl": "https://api.xiaomimimo.com",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://mimo.mi.com/",
      "apiKey": "https://platform.xiaomimimo.com/",
      "docs": "https://mimo.mi.com/docs/zh-CN",
      "models": "https://mimo.mi.com/docs/zh-CN/quick-start/summary/model"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "mimo-v2-5",
        "name": "mimo-v2-5",
        "group": "mimo",
        "enabled": true
      },
      {
        "id": "mimo-v2-5-pro",
        "name": "mimo-v2-5-pro",
        "group": "mimo",
        "enabled": true
      },
      {
        "id": "mimo-v2-5-pro-ultraspeed",
        "name": "mimo-v2-5-pro-ultraspeed",
        "group": "mimo",
        "enabled": true
      },
      {
        "id": "mimo-v2-6-flash",
        "name": "mimo-v2-6-flash",
        "group": "mimo",
        "enabled": true
      },
      {
        "id": "mimo-v2-6-pro",
        "name": "mimo-v2-6-pro",
        "group": "mimo",
        "enabled": true
      },
      {
        "id": "mimo-v2-6-pro-ultraspeed",
        "name": "mimo-v2-6-pro-ultraspeed",
        "group": "mimo",
        "enabled": true
      }
    ]
  },
  {
    "id": "zai",
    "name": "zai",
    "description": "zai - AI model provider",
    "baseUrl": "https://api.z.ai/api/paas/v4/",
    "defaultBaseUrl": "https://api.z.ai/api/paas/v4/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://z.ai",
      "apiKey": "https://z.ai/manage-apikey/apikey-list",
      "docs": "https://docs.z.ai/",
      "models": "https://docs.z.ai/models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "default",
        "name": "Default Model",
        "group": "zai",
        "enabled": true
      }
    ]
  },
  {
    "id": "minimax-global",
    "name": "minimax-global",
    "description": "minimax-global - AI model provider",
    "baseUrl": "https://api.minimax.io/v1/",
    "defaultBaseUrl": "https://api.minimax.io/v1/",
    "apiKey": "",
    "enabled": false,
    "isBuiltIn": true,
    "website": {
      "official": "https://platform.minimax.io/",
      "apiKey": "https://platform.minimax.io/user-center/basic-information/interface-key",
      "docs": "https://platform.minimax.io/docs/api-reference/text-openai-api",
      "models": "https://platform.minimax.io/document/Models"
    },
    "defaultChatEndpoint": "openai-chat-completions",
    "models": [
      {
        "id": "image-01",
        "name": "image-01",
        "group": "minimax-global",
        "enabled": true
      },
      {
        "id": "image-01-live",
        "name": "image-01-live",
        "group": "minimax-global",
        "enabled": true
      },
      {
        "id": "minimax-m3",
        "name": "minimax-m3",
        "group": "minimax-global",
        "enabled": true
      },
      {
        "id": "MiniMax-M3.1-Flash-Preview",
        "name": "minimax-m3-1-flash-preview",
        "group": "minimax-global",
        "enabled": true
      }
    ]
  }
];
