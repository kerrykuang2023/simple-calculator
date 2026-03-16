# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/lang/zh-CN/).

---

## [Unreleased]

### Added
- 

### Changed
- 

---

## [1.0.0] - 2026-03-16

### Added
- CLI 命令行计算功能
  - `add X,Y` - 加法
  - `sub X,Y` - 减法
  - `mul X,Y` - 乘法
  - `div X,Y` - 除法
- SDK 模块 (`lib/calculator.js`)
  - Calculator 类封装
  - 四则运算方法
  - 错误处理
- REST API 服务 (`lib/api.js`)
  - `GET /api/health` - 健康检查
  - `GET /api/operations` - 获取操作列表
  - `POST /api/calculate` - 通用计算
  - `POST /api/add|sub|mul|div` - 单独运算接口
- Web 页面 (`src/calculator.html`)
  - 可视化计算器界面
  - 支持键盘输入
- 完整测试套件
  - SDK 单元测试 (16个用例)
  - API 集成测试 (11个用例)
  - 端到端验收测试 (4个场景)
  - 代码覆盖率支持 (nyc)
- CI/CD 配置 (`.github/workflows/ci.yml`)
- 研发管理规范 (`rules/`)
  - WORKFLOW.zh.md - 开发流程
  - RELEASE.zh.md - 版本发布规范
  - TESTING.zh.md - 测试规范

### Features

| 功能 | 说明 |
|------|------|
| CLI 命令 | `calc add 5,3` 直接输出结果 |
| Web 页面 | `calc --web` 启动浏览器界面 |
| API 服务 | `calc --api` 启动 REST API |
| SDK | `require('simple-calculator')` 集成 |

---

## [0.0.1] - 2026-03-15

### Added
- 项目初始化
- 基础计算器 HTML 页面
