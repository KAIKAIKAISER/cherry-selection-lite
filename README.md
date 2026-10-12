# 🍒 Cherry Selection Lite (Windows 专版)

基于 **Cherry Studio** 的 Selection Assistant（划词助手）模块深度拆分重构的 Windows 平台轻量化、独立 API 驱动型 AI 划词客户端。

保持原项目的现代 UI 质感与交互体验，剥离聊天、知识库、Agent 等沉重模块，打造极速启动、低内存占用的 Windows 系统级 AI 助手。

---

## ✨ 核心特性

- **Windows 全局划词监听 & 悬浮工具栏**：支持在任意 Windows 应用程序（浏览器、Word、VSCode、微信、PDF 等）中选中文本即刻弹出胶囊工具栏，或使用 `Ctrl` 键防误触、全局快捷键（默认 `Alt+S`）唤起。
- **内置与自定义 Prompt 动作**：开箱即用支持「智能翻译」、「概念解释」、「核心总结」、「深度润色」、「代码解析」以及自定义 Prompt。
- **现代美学 UI**：完美继承 Cherry Studio 标志性设计语言（樱花粉主色调、毛玻璃磨砂面板、暗色/亮色自适应主题）。
- **流式 Markdown 渲染**：Action 结果窗口支持打字机式流式生成、代码高亮与一键复制代码、追问续写、重新生成。
- **OpenAI Compatible 架构**：无缝直连任何兼容 API（DeepSeek、OpenAI、硅基流动 SiliconFlow、Ollama 本地大模型、OneAPI 等）。
- **极简独立架构**：移除 SQLite/LibSQL、Vector DB、Drizzle ORM、PDF 解析等冗余依赖，内存占用低至 ~50MB。
- **独立设置中心**：内置全功能设置面板，支持 API 密钥管理、接口连通性实时测试、快捷动作编辑、Windows 应用黑名单过滤。

---

## 🏗️ 架构拆分对比

| 模块 / 指标 | Cherry Studio 原版 | Cherry Selection Lite (Windows) |
| :--- | :--- | :--- |
| **适配平台** | 跨平台桌面客户端 | **专注于 Windows 系统优化** |
| **应用定位** | 全功能多智能体 AI 工作台 | 专用轻量 Windows 系统级划词助手 |
| **内存占用** | 200MB ~ 500MB+ | **~50MB ~ 80MB** |
| **安装包体积** | 120MB+（解压后 350MB+） | **~45MB ~ 60MB** |
| **数据库** | LibSQL / SQLite / Drizzle ORM | **轻量 JSON 存储（零原生绑定）** |
| **非必要模块** | 聊天历史、知识库、Agent Loop、MCP | **完全剔除** |
| **划词支持** | `selection-hook` + 窗口吸附 | **`selection-hook` + Windows 全局热键双模式** |
| **窗口体系** | Main + Quick + Selection | **Toolbar + Action + Settings 3 窗分离** |

---

## 🚀 快速开始

### 1. 安装依赖

```bash
cd cherry-selection-lite
npm install
```

### 2. 本地开发调试

```bash
npm run dev
```

### 3. 构建与打包 Windows 安装包

```bash
# 编译并生成 Windows x64 安装包 (.exe)
npm run pack:win
```

---

## ⚙️ 快捷配置说明

1. 启动应用后，点击托盘图标或工具栏右侧的齿轮图标进入 **设置 (Settings)**。
2. 在「模型与 API 服务」中，选择预设（如 **DeepSeek**）或填写你的自定义 API 地址和 Key。
3. 点击 **「测试 API 连通性」** 验证网络通畅。
4. 在任意 Windows 应用中选中一段文字，工具栏将即刻浮现！

---

## 📄 许可证

基于 Apache-2.0 协议开源。
致敬原开源项目 [Cherry Studio](https://github.com/CherryHQ/cherry-studio)。
