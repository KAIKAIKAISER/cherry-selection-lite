# 🍒 Cherry Selection Lite (Windows 专用轻量版 AI 划词助手)

基于 **[Cherry Studio](https://github.com/CherryHQ/cherry-studio)** 深度拆分打造的 Windows 专用轻量级 AI 划词助手。

采用 **Tauri 2.0 (Rust) + Windows WebView2** 架构，将划词助手模块从原项目的 Electron 完整剥离，保持与 Cherry Studio 原版 100% 一致的 UI 质感与交互体验，同时将运行内存从 300~500MB 骤降至 **~30MB**！

---

## ✨ 核心特性与架构升级

1. **UI 完全保持 Cherry Studio 原版风格**：
   - 划词悬浮工具栏、动作结果窗口、设置中心 UI 与原版完全保持一致。
   - 包含 Cherry 标志性樱花粉主题色、毛玻璃磨砂面板、图标动画与布局排版。
   - 动作结果窗口支持打字机流式输出、语法高亮代码块、一键复制代码、追问续写与重新生成。

2. **完整迁移 Cherry Studio 全部 66 个 API 服务商**：
   - 内置 DeepSeek、OpenAI、SiliconFlow（硅基流动）、Anthropic、Gemini、Ollama 本地大模型、Groq、Moonshot（Kimi）、智谱 AI、DashScope 等全部 66 家服务商。
   - 原版服务商管理页面：支持配置 API Key、Base URL、代理地址及自定义请求头。
   - 保留 **「测试连接」**（实时显示延迟）与 **「获取模型列表」**（从真实端点自动拉取最新可用模型）。
   - **新增核心功能**：允许删除默认内置服务商，状态自动持久化，并提供 **「恢复内置服务商」** 弹窗随时一键找回！

3. **专为 Windows 10/11 深度优化**：
   - **Rust 原生核心**：负责窗口生命周期、系统托盘、全局热键 (`Alt+S`)、剪贴板读取与高性能 HTTP SSE 流式传输。
   - **零沉重运行时**：彻底剔除 SQLite/LibSQL、Vector 向量数据库、Drizzle ORM、Agent Loop、MCP 等冗余模块。
   - **纯 JSON 本地持久化**：配置轻量存储在 `%APPDATA%\CherryStudioSelectionLite\config.json`，无后台垃圾常驻。

---

## 🏗️ 架构对比

| 特性 / 指标 | Cherry Studio 原版 | Cherry Selection Lite (Windows 专版) |
| :--- | :--- | :--- |
| **底层核心** | Electron (Node.js + Chromium 完整实例) | **Tauri 2.0 (Rust + Windows OS WebView2)** |
| **内存占用** | 200MB ~ 500MB+ | **~30MB ~ 50MB** |
| **包体大小** | ~130MB 安装包（解压 350MB+） | **~15MB ~ 25MB** |
| **配置存储** | LibSQL / SQLite 原生数据库 | **极简 JSON 存储** |
| **API 服务商** | 全量 66 家服务商 | **全量 66 家服务商（支持删除与随时恢复）** |
| **划词交互** | 工具栏 + 结果窗 + 设置窗 | **三窗独立分离渲染，无焦点锁死** |

---

## 🚀 在线编译与 GitHub Actions CI

本项目已配置完善的 GitHub Actions 持续集成流（运行在 `windows-latest` 纯净原生编译环境），支持一键云端编译并自动生成 Windows x64 安装程序与绿色版可执行文件。

### 在线编译步骤：

1. **Fork 本仓库**到你的 GitHub 个人账户。
2. 进入仓库页面的 **Actions** 标签页，启用 Actions 权限。
3. 点击左侧 **Build Windows x64 (Tauri)** 工作流，点击 **Run workflow** 手动触发在线编译（或直接推送 commit / tag 到 `main` 分支）。
4. 编译完成后，在工作流详情页底部的 **Artifacts** 即可一键下载：
   - `Cherry-Selection-Lite_1.0.4_x64-setup.exe`（Windows 安装程序）
   - `Cherry-Selection-Lite-Portable.exe`（绿色便携免安装版）
5. 若推送版本标签（例如 `git tag v1.0.4 && git push origin v1.0.4`），GitHub Actions 将自动发布正式 Release！

---

## 💻 本地开发与构建

### 1. 安装前端依赖
```bash
npm install
```

### 2. 启动前端热重载开发服务器
```bash
npm run dev
```

### 3. 本地打包 Windows 安装程序
```bash
# 构建前端并调用 Tauri 生成 Windows x64 安装包
npm run pack:win
```

---

## ⚙️ 快捷使用说明

1. 启动后，Cherry Studio 樱花图标将常驻 Windows 系统托盘。
2. 在任意应用（Edge/Chrome、Word、微信、VS Code 等）中选中文本后：
   - 触发方式可在设置中选择：**划词即弹出**、**按住 Ctrl 唤出** 或 **全局热键 `Alt+S`**。
3. 点击工具栏上的功能图标（如「智能翻译」、「核心总结」、「代码解析」等），结果窗口即可飞速流式展现！
4. 点击工具栏右侧齿轮可进入全功能设置中心，管理服务商、测试连接、拉取模型与恢复内置服务商。

---

## 📄 许可证

基于 Apache-2.0 协议开源。致敬原项目 [Cherry Studio](https://github.com/CherryHQ/cherry-studio)。
