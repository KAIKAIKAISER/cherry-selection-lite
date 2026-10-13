import urllib.request
import json
import os

proxy_handler = urllib.request.ProxyHandler({'http': 'http://127.0.0.1:7897', 'https': 'http://127.0.0.1:7897'})
opener = urllib.request.build_opener(proxy_handler)

token = os.environ.get('GITHUB_TOKEN', '')
headers = {
    'Authorization': f'Bearer {token}',
    'User-Agent': 'Antigravity',
    'Content-Type': 'application/json'
}

body = {
    'tag_name': 'v1.0.4',
    'target_commitish': 'main',
    'name': 'Cherry Selection Lite v1.0.4 (Windows x64)',
    'body': (
        "## Cherry Selection Lite v1.0.4 (Windows x64)\n\n"
        "基于 [Cherry Studio](https://github.com/CherryHQ/cherry-studio) 开发的 Windows 专用轻量版 AI 划词助手。\n\n"
        "### 核心优势与特性：\n"
        "1. **极致轻量**：采用 Tauri 2.0 (Rust) + 系统原生 WebView2 替代重型 Electron 架构，安装包仅 **5.2 MB**，日常内存占用由数百兆骤降至 30~50MB。\n"
        "2. **UI 1:1 像素级还原**：完整保留 Cherry Studio 划词胶囊工具栏、结果动作窗口、完整 Provider 设置页面及黑暗/明亮主题与动画。\n"
        "3. **全部 66 种 Provider 完整迁移**：保留原有 API Key、Base URL、参数调整、网络连通性测试、一键获取在线模型列表（Model Discovery）。\n"
        "4. **支持删除与恢复默认 Provider**：可自由删除不需要的内置 Provider，配置持久化存储于 `%APPDATA%\\CherryStudioSelectionLite\\config.json`，随时可通过“恢复内置提供商”一键复原。\n"
        "5. **Windows 原生集成**：支持 `Alt+S` 全局划词快捷键、托盘常驻图标与双击调出、划词后自动跟随鼠标定位。\n\n"
        "### 下载二进制文件：\n"
        "- **安装包 (推荐)**: `Cherry-Selection-Lite-1.0.4-x64-setup.exe` (~5.2 MB)\n"
        "- **便携单文件版**: `Cherry-Selection-Lite-Portable.exe` (~16.5 MB)\n"
    ),
    'draft': False,
    'prerelease': False
}

req = urllib.request.Request(
    'https://api.github.com/repos/KAIKAIKAISER/cherry-selection-lite/releases',
    data=json.dumps(body).encode('utf-8'),
    headers=headers,
    method='POST'
)

try:
    res = json.loads(opener.open(req).read().decode('utf-8'))
    print('Release created successfully!')
    print('Release ID:', res.get('id'))
    print('HTML URL:', res.get('html_url'))
    upload_url = res.get('upload_url').split('{')[0]
    
    # Upload assets
    assets = [
        ('Cherry-Selection-Lite-1.0.4-x64-setup.exe', 'dist-ci/Cherry Selection Lite_1.0.4_x64-setup.exe'),
        ('Cherry-Selection-Lite-Portable.exe', 'dist-ci/Cherry-Selection-Lite-Portable.exe')
    ]
    
    for asset_name, asset_path in assets:
        if os.path.exists(asset_path):
            size = os.path.getsize(asset_path)
            print(f'Uploading {asset_name} ({size:,} bytes)...')
            with open(asset_path, 'rb') as f:
                data = f.read()
            upload_req = urllib.request.Request(
                f'{upload_url}?name={asset_name}',
                data=data,
                headers={
                    'Authorization': f'Bearer {token}',
                    'User-Agent': 'Antigravity',
                    'Content-Type': 'application/octet-stream'
                },
                method='POST'
            )
            up_res = json.loads(opener.open(upload_req).read().decode('utf-8'))
            print(f'Uploaded: {up_res.get("browser_download_url")}')
except urllib.error.HTTPError as e:
    print('HTTP Error:', e.code, e.read().decode('utf-8'))
