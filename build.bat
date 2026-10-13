@echo off
chcp 65001 >nul
echo ========================================================
echo   Cherry Selection Lite (Windows x64) 构建脚本
echo ========================================================
echo.

echo [1/3] 正在检查前端依赖...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [错误] npm install 失败
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [2/3] 正在编译前端资源...
call npm run build:vite
if %ERRORLEVEL% NEQ 0 (
    echo [错误] 前端 Vite 编译失败
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo [3/3] 正在构建 Tauri Windows 应用程序...
call npx @tauri-apps/cli build
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [提示] 本地若未安装 Visual Studio C++ 生成工具，请将代码推送至 GitHub，
    echo        使用项目内置的 GitHub Actions 工作流进行在线云端编译与打包！
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ========================================================
echo   构建成功！安装包已生成于 src-tauri/target/release/bundle/nsis/
echo ========================================================
pause
