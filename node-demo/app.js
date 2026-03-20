/**
 * 🤖 Eolo 的 Node.js 演示程序
 * 功能：HTTP 服务器 + 文件操作 + 系统信息
 */

const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const os = require('os');

// 配置
const PORT = 3001;
const DATA_FILE = path.join(__dirname, 'data.txt');

// 启动横幅
console.log('\n🤖 Eolo 的 Node.js 演示程序');
console.log(`Node.js ${process.version}\n`);

// 演示 1: 系统信息
async function showSystemInfo() {
  console.log('📊 系统信息：');
  console.log(`   CPU: ${os.cpus()[0].model}`);
  console.log(`   核心数：${os.cpus().length}`);
  console.log(`   内存：${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
  console.log(`   可用内存：${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
  console.log(`   运行时间：${(os.uptime() / 3600).toFixed(2)} 小时`);
  console.log(`   平台：${os.platform()} ${os.arch()}`);
  console.log('');
}

// 演示 2: 文件操作
async function fileDemo() {
  console.log('📁 文件操作演示：');
  
  try {
    const content = `Hello from Node.js! 🤖\n创建时间：${new Date().toLocaleString('zh-CN')}\n这是一个测试文件`;
    await fs.writeFile(DATA_FILE, content, 'utf-8');
    console.log(`   ✅ 写入文件：${DATA_FILE}`);
    
    const readContent = await fs.readFile(DATA_FILE, 'utf-8');
    console.log('   ✅ 读取内容:');
    readContent.split('\n').forEach(line => {
      console.log(`      ${line}`);
    });
    
    const stats = await fs.stat(DATA_FILE);
    console.log(`   ✅ 文件大小：${stats.size} 字节`);
    console.log(`   ✅ 创建时间：${stats.birthtime.toLocaleString('zh-CN')}`);
    
  } catch (err) {
    console.log(`   ❌ 文件操作失败：${err.message}`);
  }
  console.log('');
}

// 演示 3: HTTP 服务器
function startServer() {
  const server = http.createServer(async (req, res) => {
    const url = req.url;
    
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${url}`);
    
    if (url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🤖 Eolo Node.js 演示</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            min-height: 100vh;
            color: #fff;
            padding: 40px 20px;
        }
        .container { max-width: 800px; margin: 0 auto; }
        h1 {
            font-size: 2.5em;
            text-align: center;
            margin-bottom: 30px;
            background: linear-gradient(90deg, #00d4ff, #00ff88);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .card {
            background: rgba(255,255,255,0.05);
            border-radius: 15px;
            padding: 25px;
            margin: 20px 0;
            border: 1px solid rgba(0,212,255,0.2);
        }
        .card h2 { color: #00d4ff; margin-bottom: 15px; font-size: 1.3em; }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .info-row:last-child { border-bottom: none; }
        .label { color: #8892b0; }
        .value { color: #00ff88; font-weight: bold; }
        .refresh { text-align: center; margin-top: 30px; }
        .refresh a {
            color: #00d4ff;
            text-decoration: none;
            padding: 12px 30px;
            border: 2px solid #00d4ff;
            border-radius: 25px;
            transition: all 0.3s;
        }
        .refresh a:hover { background: #00d4ff; color: #1a1a2e; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🤖 Eolo Node.js 演示</h1>
        
        <div class="card">
            <h2>🖥️ 系统信息</h2>
            <div class="info-row">
                <span class="label">Node.js 版本</span>
                <span class="value">${process.version}</span>
            </div>
            <div class="info-row">
                <span class="label">平台</span>
                <span class="value">${os.platform()} ${os.arch()}</span>
            </div>
            <div class="info-row">
                <span class="label">CPU 核心</span>
                <span class="value">${os.cpus().length} 核</span>
            </div>
            <div class="info-row">
                <span class="label">内存总量</span>
                <span class="value">${(os.totalmem()/1024/1024/1024).toFixed(2)} GB</span>
            </div>
            <div class="info-row">
                <span class="label">可用内存</span>
                <span class="value">${(os.freemem()/1024/1024/1024).toFixed(2)} GB</span>
            </div>
            <div class="info-row">
                <span class="label">运行时间</span>
                <span class="value">${(os.uptime()/3600).toFixed(2)} 小时</span>
            </div>
        </div>
        
        <div class="card">
            <h2>🌐 请求信息</h2>
            <div class="info-row">
                <span class="label">当前时间</span>
                <span class="value">${new Date().toLocaleString('zh-CN')}</span>
            </div>
            <div class="info-row">
                <span class="label">请求路径</span>
                <span class="value">${url}</span>
            </div>
            <div class="info-row">
                <span class="label">请求方法</span>
                <span class="value">${req.method}</span>
            </div>
        </div>
        
        <div class="card">
            <h2>📁 文件状态</h2>
            <div class="info-row">
                <span class="label">数据文件</span>
                <span class="value">${DATA_FILE}</span>
            </div>
        </div>
        
        <div class="refresh">
            <a href="/">🔄 刷新页面</a>
            <a href="/api/info" style="margin-left: 10px;">📊 API 数据</a>
        </div>
    </div>
</body>
</html>
      `);
    }
    else if (url === '/api/info') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({
        nodeVersion: process.version,
        platform: os.platform(),
        arch: os.arch(),
        cpus: os.cpus().length,
        totalMemory: (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + ' GB',
        freeMemory: (os.freemem() / 1024 / 1024 / 1024).toFixed(2) + ' GB',
        uptime: (os.uptime() / 3600).toFixed(2) + ' 小时',
        timestamp: new Date().toISOString()
      }, null, 2));
    }
    else {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1 style="text-align:center;margin-top:50px;color:#00d4ff;">404 - 页面未找到</h1><p style="text-align:center;"><a href="/" style="color:#00ff88;">返回首页</a></p>');
    }
  });
  
  server.listen(PORT, () => {
    console.log('════════════════════════════════════════');
    console.log(`   ✅ 服务器启动成功！`);
    console.log(`   🌐 http://localhost:${PORT}`);
    console.log(`   📊 API: http://localhost:${PORT}/api/info`);
    console.log('════════════════════════════════════════\n');
    console.log('💡 提示：按 Ctrl+C 停止服务器\n');
  });
}

// 主程序
async function main() {
  await showSystemInfo();
  await fileDemo();
  startServer();
}

// 优雅退出
process.on('SIGINT', () => {
  console.log('\n👋 服务器已停止，再见 sir!');
  process.exit(0);
});

// 运行
main();
