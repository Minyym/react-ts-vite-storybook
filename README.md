# React TypeScript Vite Storybook 组件库

一个现代化的 React 组件库项目，采用 TypeScript + Vite + Storybook 技术栈，具备完整的工程化配置和自动化部署流程。

## 🚀 项目特性

- **现代化技术栈**：React 18 + TypeScript + Vite + Storybook
- **完整的工程化配置**：ESLint + Prettier + Stylelint + Husky + Commitlint
- **多维度测试**：Jest + Vitest + Cypress + Playwright
- **自动化部署**：GitHub Actions + GitHub Pages
- **性能优化**：代码分割、动态导入、Legacy 支持
- **开发体验**：热重载、类型检查、代码格式化

## 📦 技术栈

### 核心技术

- **React 18.2.0** - 现代化的 React 框架
- **TypeScript 4.7.4** - 类型安全的 JavaScript 超集
- **Vite 7.0.6** - 快速的构建工具和开发服务器
- **Storybook 9.0.18** - 组件开发和文档工具

### 样式和 UI

- **Sass 1.89.2** - CSS 预处理器
- **React Icons 5.5.0** - 图标库（支持动态导入）
- **Classnames 2.5.1** - CSS 类名管理工具

### 测试框架

- **Jest 28.1.1** - 单元测试框架
- **Vitest 3.2.4** - Vite 原生测试工具
- **Cypress 10.2.0** - E2E 测试框架
- **Playwright 1.54.1** - 浏览器自动化测试
- **Testing Library** - React 组件测试工具

### 代码质量和格式化

- **ESLint 8.18.0** - JavaScript/TypeScript 代码检查
- **Prettier 2.7.1** - 代码格式化工具
- **Stylelint 15.10.3** - CSS/SCSS 代码检查
- **Husky 8.0.1** - Git hooks 管理
- **Commitlint 17.0.2** - Git 提交信息规范

## 🏗️ 工程化实现

### 1. 代码质量保证

#### ESLint 配置

- 支持 React、TypeScript、JSX A11y 规则
- 自动导入排序和去重
- 测试文件专用规则配置
- Cypress 测试专用规则

#### Prettier 配置

- 统一的代码格式化标准
- 与 ESLint 规则兼容
- 自动格式化提交前代码

#### Stylelint 配置

- SCSS 语法支持
- CSS 属性字母顺序排序
- 禁止使用 `!important`
- 变量和占位符命名规范

### 2. Git 工作流

#### Husky Git Hooks

```bash
# 提交前自动执行
pre-commit: npx lint-staged

# 提交信息规范检查
commit-msg: npx commitlint --edit $1
```

#### Commitlint 规范

- 遵循 Conventional Commits 规范
- 自动检查提交信息格式
- 支持 `git-cz` 交互式提交

### 3. 测试策略

#### 单元测试 (Jest)

- 支持 TypeScript 和 JSX
- 代码覆盖率统计
- 模拟 CSS 模块和静态资源
- 支持路径别名解析

#### 组件测试 (Vitest)

- Vite 原生测试工具
- 浏览器环境测试支持
- Storybook 集成测试

#### E2E 测试 (Cypress)

- 完整的端到端测试
- Vite 开发服务器集成
- 视频录制和截图功能

### 4. 构建优化

#### Vite 配置优化

```typescript
// 代码分割配置
manualChunks: {
  vendor: ['react', 'react-dom'],
  icons: ['react-icons']
}

// Legacy 浏览器支持
legacy({
  targets: ['defaults', 'not IE 11'],
  renderLegacyChunks: true,
  polyfills: [...]
})
```

### 5. CI/CD 自动化

#### GitHub Actions 工作流

- 自动部署 Storybook 到 GitHub Pages
- 触发条件：main 分支推送或手动触发
- 构建环境：Ubuntu Latest + Node 20
- 缓存策略：yarn 依赖缓存

## 🎯 性能优化

### 1. Icon 组件优化

**问题**：原始实现导入整个 `react-icons` 库，导致包大小达到 11,983.90 kB

**解决方案**：使用动态导入

```typescript
const loadIcon = async () => {
  const iconLibrary = await import(`react-icons/${type}`);
  const IconComponent = iconLibrary[icon];
  setIconComponent(() => IconComponent);
};
```

**效果**：

- 包大小减少 99.96%（从 11,983.90 kB 到 5.25 kB）
- 按需加载，提升首屏性能
- 支持错误处理和降级

### 2. 构建优化

#### 代码分割策略

- **Vendor 分割**：React 相关依赖独立打包
- **Icons 分割**：图标库独立打包
- **组件分割**：每个组件独立打包

#### Legacy 浏览器支持

- 完整的 Polyfills 配置
- 现代和传统浏览器双版本构建
- 自动检测和加载合适的版本

## 🚀 快速开始

### 安装依赖

```bash
yarn
```

### 开发模式

```bash
# 启动开发服务器
yarn run dev

# 启动 Storybook
yarn run storybook
```

### 构建

```bash
# 构建组件库
yarn run build

# 构建 Storybook
yarn run build-storybook
```

### 测试

```bash
# 单元测试
yarn run test:unit

# E2E 测试
yarn run test:e2e

# 测试覆盖率
yarn run test:unit:coverage
```

### 代码质量检查

```bash
# 代码检查
yarn run lint

# 代码格式化
yarn run format

# 类型检查
yarn run typecheck
```

## 📝 开发规范

### 提交信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 功能开发
feat: add new button component

# 问题修复
fix: resolve icon loading issue

# 文档更新
docs: update README with new features

# 性能优化
perf: optimize icon component bundle size
```

## 📊 性能指标

### 构建性能

- **构建时间**：20.03s
- **包大小优化**：Icon 组件减少 99.96%
- **代码分割**：支持按需加载
- **Legacy 支持**：兼容旧版浏览器

### 开发体验

- **热重载**：毫秒级响应
- **类型检查**：实时类型错误提示
- **代码格式化**：自动格式化
- **测试反馈**：即时测试结果

---

**作者**: yym  
**版本**: 0.0.0
