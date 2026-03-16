# Simple Calculator

一个简单的计算器 CLI 工具，支持加减乘除基本运算。

## 功能特性

- CLI 命令行计算
- SDK 模块调用
- REST API 服务
- Web 页面可视化

## 安装

```bash
npm install
npm link
```

## 使用方式

### CLI 命令行

```bash
calc add 5,3      # 加法: 8
calc sub 10,4     # 减法: 6
calc mul 7,8      # 乘法: 56
calc div 20,5     # 除法: 4
calc --web        # 启动 Web 页面
calc --api        # 启动 REST API
```

### SDK 调用

```javascript
const Calculator = require('./lib/calculator');

const calc = new Calculator();
calc.add(5, 3);       // 8
calc.subtract(10, 4); // 6
calc.multiply(7, 8);  // 56
calc.divide(20, 5);   // 4
```

### REST API

```bash
curl -X POST http://localhost:3000/api/add -H "Content-Type: application/json" -d "{\"a\":5,\"b\":3}"
```

## 文档

- [开发流程规范](rules/WORKFLOW.zh.md)
- [版本发布规范](rules/RELEASE.zh.md)
- [Changelog](CHANGELOG.md)
