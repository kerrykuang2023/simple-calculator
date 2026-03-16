'use strict';

const http = require('http');
const url = require('url');
const Calculator = require('./calculator');

const DEFAULT_API_PORT = 3000;

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(new Error('Invalid JSON'));
            }
        });
        req.on('error', reject);
    });
}

function sendResponse(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(JSON.stringify(data));
}

function handleRequest(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    if (method === 'OPTIONS') {
        sendResponse(res, 200, {});
        return;
    }

    const calc = new Calculator();

    if (pathname === '/api/health' && method === 'GET') {
        sendResponse(res, 200, {
            status: 'ok',
            service: 'calculator-api',
            version: Calculator.version
        });
        return;
    }

    if (pathname === '/api/operations' && method === 'GET') {
        sendResponse(res, 200, {
            operations: Calculator.getOperations()
        });
        return;
    }

    if (pathname === '/api/calculate' && method === 'POST') {
        parseBody(req)
            .then(body => {
                const { operation, a, b } = body;

                if (!operation || a === undefined || b === undefined) {
                    sendResponse(res, 400, {
                        error: '缺少必要参数',
                        required: ['operation', 'a', 'b'],
                        example: { operation: 'add', a: 5, b: 3 }
                    });
                    return;
                }

                const result = calc.calculate(operation, a, b);
                const op = Calculator.OPERATIONS[operation];

                sendResponse(res, 200, {
                    success: true,
                    operation: operation,
                    expression: `${a} ${op.symbol} ${b}`,
                    result: result
                });
            })
            .catch(() => {
                sendResponse(res, 400, {
                    error: '无效的 JSON 格式'
                });
            });
        return;
    }

    if (pathname === '/api/add' && method === 'POST') {
        parseBody(req)
            .then(body => {
                const { a, b } = body;
                if (a === undefined || b === undefined) {
                    sendResponse(res, 400, { error: '缺少参数 a 或 b' });
                    return;
                }
                sendResponse(res, 200, {
                    success: true,
                    expression: `${a} + ${b}`,
                    result: calc.add(a, b)
                });
            })
            .catch(() => {
                sendResponse(res, 400, { error: '无效的 JSON 格式' });
            });
        return;
    }

    if (pathname === '/api/sub' && method === 'POST') {
        parseBody(req)
            .then(body => {
                const { a, b } = body;
                if (a === undefined || b === undefined) {
                    sendResponse(res, 400, { error: '缺少参数 a 或 b' });
                    return;
                }
                sendResponse(res, 200, {
                    success: true,
                    expression: `${a} - ${b}`,
                    result: calc.subtract(a, b)
                });
            })
            .catch(() => {
                sendResponse(res, 400, { error: '无效的 JSON 格式' });
            });
        return;
    }

    if (pathname === '/api/mul' && method === 'POST') {
        parseBody(req)
            .then(body => {
                const { a, b } = body;
                if (a === undefined || b === undefined) {
                    sendResponse(res, 400, { error: '缺少参数 a 或 b' });
                    return;
                }
                sendResponse(res, 200, {
                    success: true,
                    expression: `${a} × ${b}`,
                    result: calc.multiply(a, b)
                });
            })
            .catch(() => {
                sendResponse(res, 400, { error: '无效的 JSON 格式' });
            });
        return;
    }

    if (pathname === '/api/div' && method === 'POST') {
        parseBody(req)
            .then(body => {
                const { a, b } = body;
                if (a === undefined || b === undefined) {
                    sendResponse(res, 400, { error: '缺少参数 a 或 b' });
                    return;
                }
                try {
                    sendResponse(res, 200, {
                        success: true,
                        expression: `${a} ÷ ${b}`,
                        result: calc.divide(a, b)
                    });
                } catch (error) {
                    sendResponse(res, 400, { error: error.message });
                }
            })
            .catch(() => {
                sendResponse(res, 400, { error: '无效的 JSON 格式' });
            });
        return;
    }

    sendResponse(res, 404, {
        error: '接口未找到',
        availableEndpoints: [
            'GET  /api/health',
            'GET  /api/operations',
            'POST /api/calculate',
            'POST /api/add',
            'POST /api/sub',
            'POST /api/mul',
            'POST /api/div'
        ]
    });
}

function startApiServer(port = DEFAULT_API_PORT) {
    const server = http.createServer(handleRequest);

    server.listen(port, () => {
        console.log(`\n🚀 Calculator API 服务已启动！`);
        console.log(`📍 API 地址: http://localhost:${port}`);
        console.log(`\n📖 可用接口:`);
        console.log(`   GET  /api/health      - 健康检查`);
        console.log(`   GET  /api/operations  - 获取支持的操作`);
        console.log(`   POST /api/calculate   - 通用计算接口`);
        console.log(`   POST /api/add         - 加法`);
        console.log(`   POST /api/sub         - 减法`);
        console.log(`   POST /api/mul         - 乘法`);
        console.log(`   POST /api/div         - 除法`);
        console.log(`\n💡 按 Ctrl+C 停止服务\n`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`错误: 端口 ${port} 已被占用`);
        } else {
            console.error('服务器错误:', err.message);
        }
        process.exit(1);
    });

    process.on('SIGINT', () => {
        console.log('\n\n👋 API 服务已关闭');
        server.close();
        process.exit(0);
    });

    return server;
}

module.exports = {
    startApiServer,
    handleRequest,
    DEFAULT_API_PORT
};
