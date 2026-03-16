#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');
const open = require('open');
const { startApiServer, DEFAULT_API_PORT } = require('../lib/api');

const DEFAULT_PORT = 8080;

const OPERATIONS = {
    add: { symbol: '+', name: '加法', calc: (a, b) => a + b },
    sub: { symbol: '-', name: '减法', calc: (a, b) => a - b },
    mul: { symbol: '×', name: '乘法', calc: (a, b) => a * b },
    div: { symbol: '÷', name: '除法', calc: (a, b) => a / b }
};

function parseArgs() {
    const args = process.argv.slice(2);
    const options = {
        port: DEFAULT_PORT,
        apiPort: DEFAULT_API_PORT,
        help: false,
        version: false,
        web: false,
        api: false,
        operation: null,
        operands: null
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        
        if (arg === '--port' || arg === '-p') {
            const port = parseInt(args[i + 1], 10);
            if (!isNaN(port) && port > 0 && port < 65536) {
                options.port = port;
                i++;
            } else {
                console.error('错误: 无效的端口号');
                process.exit(1);
            }
        } else if (arg === '--api-port') {
            const port = parseInt(args[i + 1], 10);
            if (!isNaN(port) && port > 0 && port < 65536) {
                options.apiPort = port;
                i++;
            } else {
                console.error('错误: 无效的 API 端口号');
                process.exit(1);
            }
        } else if (arg === '--help' || arg === '-h') {
            options.help = true;
        } else if (arg === '--version' || arg === '-v') {
            options.version = true;
        } else if (arg === '--web' || arg === '-w') {
            options.web = true;
        } else if (arg === '--api' || arg === '-a') {
            options.api = true;
        } else if (OPERATIONS[arg]) {
            options.operation = arg;
            if (args[i + 1]) {
                const operandsStr = args[i + 1];
                const operands = operandsStr.split(',').map(s => parseFloat(s.trim()));
                if (operands.length === 2 && !isNaN(operands[0]) && !isNaN(operands[1])) {
                    options.operands = operands;
                } else {
                    console.error('错误: 操作数格式不正确，请使用格式: X,Y');
                    process.exit(1);
                }
                i++;
            } else {
                console.error('错误: 缺少操作数');
                process.exit(1);
            }
        }
    }

    if (!options.web && !options.api && !options.operation) {
        options.help = true;
    }

    return options;
}

function showHelp() {
    console.log(`
简单计算器 CLI

用法:
  calc <命令> [参数]
  calc [选项]

命令:
  add X,Y     加法运算: X + Y
  sub X,Y     减法运算: X - Y
  mul X,Y     乘法运算: X × Y
  div X,Y     除法运算: X ÷ Y

选项:
  -w, --web             启动 Web 计算器页面
  -a, --api             启动 REST API 服务
  -p, --port <端口>     指定 Web 服务器端口 (默认: 8080)
  --api-port <端口>     指定 API 服务器端口 (默认: 3000)
  -h, --help            显示帮助信息
  -v, --version         显示版本号

示例:
  calc add 5,3          计算 5 + 3 = 8
  calc sub 10,4         计算 10 - 4 = 6
  calc mul 7,8          计算 7 × 8 = 56
  calc div 20,5         计算 20 ÷ 5 = 4
  calc --web            启动 Web 计算器
  calc --web --port 3000    使用端口 3000 启动 Web
  calc --api            启动 REST API 服务
  calc --api --api-port 8080   使用端口 8080 启动 API
`);
}

function showVersion() {
    const packageJson = require('../package.json');
    console.log(`simple-calculator v${packageJson.version}`);
}

function calculate(operation, operands) {
    const op = OPERATIONS[operation];
    const [a, b] = operands;
    
    if (operation === 'div' && b === 0) {
        console.error('错误: 除数不能为零');
        process.exit(1);
    }
    
    const result = op.calc(a, b);
    const roundedResult = Math.round(result * 1000000000) / 1000000000;
    
    console.log(`\n📊 计算结果:`);
    console.log(`   ${a} ${op.symbol} ${b} = ${roundedResult}\n`);
}

function startWebServer(port) {
    const htmlPath = path.join(__dirname, '..', 'src', 'calculator.html');
    
    if (!fs.existsSync(htmlPath)) {
        console.error('错误: 找不到计算器页面文件');
        process.exit(1);
    }

    const server = http.createServer((req, res) => {
        if (req.url === '/' || req.url === '/calculator.html') {
            fs.readFile(htmlPath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('服务器错误');
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            });
        } else {
            res.writeHead(404);
            res.end('页面未找到');
        }
    });

    server.listen(port, () => {
        const url = `http://localhost:${port}`;
        console.log(`\n🧮 Web 计算器已启动！`);
        console.log(`📍 访问地址: ${url}`);
        console.log(`💡 按 Ctrl+C 停止服务器\n`);
        
        open(url).catch(() => {
            console.log(`请在浏览器中手动打开: ${url}`);
        });
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`错误: 端口 ${port} 已被占用，请尝试其他端口`);
            console.log(`提示: 使用 --port 参数指定其他端口，例如: calc --web --port 3000`);
        } else {
            console.error('服务器错误:', err.message);
        }
        process.exit(1);
    });

    process.on('SIGINT', () => {
        console.log('\n\n👋 Web 计算器已关闭');
        server.close();
        process.exit(0);
    });
}

function main() {
    const options = parseArgs();

    if (options.help) {
        showHelp();
        return;
    }

    if (options.version) {
        showVersion();
        return;
    }

    if (options.operation && options.operands) {
        calculate(options.operation, options.operands);
        return;
    }

    if (options.web) {
        startWebServer(options.port);
    } else if (options.api) {
        startApiServer(options.apiPort);
    } else {
        showHelp();
    }
}

main();
