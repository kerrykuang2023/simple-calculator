# 🧮 Simple Calculator

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg" alt="Version">
  <img src="https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg" alt="Node.js">
  <img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="License">
</p>

<p align="center">
  <b>一个简单而强大的计算器 CLI 工具</b><br>
  支持命令行、SDK、REST API 和 Web 界面四种使用方式
</p>

---

## ✨ 功能特性

- 🖥️ **CLI 命令行** - 快速计算，无需打开浏览器
- 📦 **SDK 模块** - 轻松集成到你的 Node.js 项目
- 🌐 **REST API** - 通过 HTTP 接口调用计算服务
- 🎨 **Web 界面** - 美观的可视化计算器

---

## 🚀 快速开始

### 安装

```bash
# 克隆项目
git clone https://github.com/kerrykuang2023/simple-calculator.git
cd simple-calculator

# 安装依赖
npm install

# 全局安装（可选，用于使用 calc 命令）
npm link
```

---

## 📖 使用指南

### 1️⃣ CLI 命令行

最快捷的计算方式，直接在终端输入命令：

```bash
# 基础运算
calc add 5,3      # 输出: 5 + 3 = 8
calc sub 10,4     # 输出: 10 - 4 = 6
calc mul 7,8      # 输出: 7 × 8 = 56
calc div 20,5     # 输出: 20 ÷ 5 = 4

# 启动服务
calc --web        # 启动 Web 计算器（端口 8080）
calc --api        # 启动 REST API（端口 3000）

# 查看帮助
calc --help
```

### 2️⃣ SDK 模块调用

在你的 Node.js 项目中使用：

```javascript
const Calculator = require('simple-calculator');

const calc = new Calculator();

// 基础运算
console.log(calc.add(5, 3));        // 8
console.log(calc.subtract(10, 4));  // 6
console.log(calc.multiply(7, 8));   // 56
console.log(calc.divide(20, 5));    // 4

// 通用计算接口
console.log(calc.calculate('add', 5, 3));  // 8

// 获取最后结果
console.log(calc.getLastResult());  // 4
```

### 3️⃣ REST API

启动 API 服务后，通过 HTTP 请求调用：

```bash
# 启动 API 服务
calc --api

# 加法运算
curl -X POST http://localhost:3000/api/add \
  -H "Content-Type: application/json" \
  -d '{"a": 5, "b": 3}'
# 返回: {"success": true, "expression": "5 + 3", "result": 8}

# 通用计算
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation": "mul", "a": 7, "b": 8}'
# 返回: {"success": true, "operation": "mul", "expression": "7 × 8", "result": 56}
```

**可用接口：**

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/health` | 健康检查 |
| GET | `/api/operations` | 获取支持的操作列表 |
| POST | `/api/add` | 加法运算 |
| POST | `/api/sub` | 减法运算 |
| POST | `/api/mul` | 乘法运算 |
| POST | `/api/div` | 除法运算 |
| POST | `/api/calculate` | 通用计算接口 |

### 4️⃣ Web 界面

启动 Web 服务，在浏览器中使用可视化计算器：

```bash
calc --web
```

浏览器将自动打开 http://localhost:8080

---

## 📸 操作截图

> 💡 **提示：** 以下截图展示了项目的实际运行效果。你可以在运行项目后，使用截图工具捕获自己的操作界面替换此处。

### CLI 命令行计算
```
$ calc add 5,3

📊 计算结果:
   5 + 3 = 8

$ calc mul 7,8

📊 计算结果:
   7 × 8 = 56
```

### Web 界面预览
启动 `calc --web` 后，你将看到：
- 🎨 现代化的计算器界面
- ⌨️ 支持键盘输入
- 📱 响应式设计，支持移动端

*[此处可添加 Web 界面截图]*

### API 测试示例
```bash
$ curl -X POST http://localhost:3000/api/add \
    -H "Content-Type: application/json" \
    -d '{"a": 10, "b": 20}'

{"success": true, "expression": "10 + 20", "result": 30}
```

*[此处可添加 API 测试工具截图，如 Postman 或 curl 执行结果]*

---

## 🧪 测试

项目包含完整的测试套件：

```bash
# 运行所有测试
make ci

# 单元测试（SDK）
make test
npm test

# 集成测试（API）
make test-integration
npm run test-integration

# 验收测试（端到端）
make test-at
npm run test-at

# 代码覆盖率
make test-cover
npm run test-cover
```

**测试结果：**
- ✅ SDK 单元测试：16 个用例全部通过
- ✅ API 集成测试：11 个用例全部通过  
- ✅ 端到端验收测试：4 个场景全部通过

---

## 📁 项目结构

```
simple-calculator/
├── bin/
│   └── calculator.js          # CLI 入口
├── lib/
│   ├── calculator.js          # SDK 核心
│   └── api.js                 # REST API
├── src/
│   └── calculator.html        # Web 页面
├── test/
│   ├── sdk-test.js           # SDK 单元测试
│   ├── integration-test.js   # API 集成测试
│   └── at-test.js            # 验收测试
├── docs/
│   └── design/               # 设计文档
├── rules/                    # 研发规范
├── scripts/                  # 脚本工具
├── Makefile                  # 构建脚本
├── CHANGELOG.md              # 变更日志
└── README.md                 # 项目说明
```

---

## 📚 文档

- [开发流程规范](rules/WORKFLOW.zh.md) - 团队研发协作规范
- [版本发布规范](rules/RELEASE.zh.md) - 版本管理和发布流程
- [测试规范](rules/TESTING.zh.md) - 测试策略和规范
- [Changelog](CHANGELOG.md) - 版本变更记录

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

- [Bug 报告](.github/ISSUE_TEMPLATE/bug_report.md)
- [Feature 申请](.github/ISSUE_TEMPLATE/feature_request.md)
- [Pull Request 模板](.github/PULL_REQUEST_TEMPLATE.md)

---

## 📄 许可证

[MIT](LICENSE) © 2026 Simple Calculator Team
