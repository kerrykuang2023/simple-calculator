---
issue: "#1"
branch: "feature/1-cli-calculator"
module: "cli"
status: "implemented"
author: "@developer"
created: "2026-03-16"
pr: "#1"
---

# Feature #1: CLI 计算器

## 背景与目标

创建一个简单的计算器 CLI 工具，支持加减乘除基本运算，可通过命令行直接调用。

## 方案设计

### 概要

实现一个 Node.js CLI 工具，提供以下调用方式：
- CLI 命令行计算
- SDK 模块调用
- REST API 服务
- Web 页面可视化

### 模块划分

```
simple-calculator/
├── bin/calculator.js      # CLI 入口
├── lib/calculator.js     # SDK 核心
├── lib/api.js           # REST API
└── src/calculator.html  # Web 页面
```

### API 设计

#### CLI 命令
```bash
calc add 5,3      # 输出: 5 + 3 = 8
calc --web        # 启动 Web 页面
calc --api        # 启动 API 服务
```

#### REST API
- `POST /api/add` - 加法
- `POST /api/sub` - 减法
- `POST /api/mul` - 乘法
- `POST /api/div` - 除法

## 验收标准

- [x] CLI 命令行计算功能正常
- [x] Web 页面可正常访问
- [x] API 接口可正常调用
- [x] SDK 可被其他项目引用

## 测试策略

- SDK 单元测试通过
- API 接口测试通过
- CLI 命令手动测试通过

## 影响分析

- **向后兼容性**：是
- **依赖变更**：新增 open 依赖
- **性能影响**：无明显影响
