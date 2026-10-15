# 网站基础项目 · 初页

基于 React、TypeScript 和 Vite 的中文网站起点，包含响应式首页、深浅主题切换、主题偏好保存和基础键盘可访问性。

这是可继续开发的前端基础项目；目前不包含后端、账号系统、数据库或线上部署。

## 开发环境

- 推荐 Node.js **24.19.0**（版本记录在 `.nvmrc`），也支持 Node.js 22.12 及以上的 22.x 版本。
- npm；无需额外密钥或环境变量。

```bash
npm ci
npm run dev
```

开发服务器监听端口 **5173**。命令在仓库根目录执行；支持热更新。

如果云环境默认 npm 缓存目录不可写，先执行：

```bash
export npm_config_cache=/workspace/.cache/npm
```

## 检查与构建

```bash
npm run typecheck
npm run build
npm run preview
```

`build` 包含 TypeScript 检查，生产产物在 `dist/`。`preview` 在端口 **4173** 提供构建结果的本地验证服务，不是正式部署服务器。

本地或 CI 安装都使用锁文件对应的 `npm ci`。GitHub Actions 会对提交和拉取请求执行生产构建。

手动验证：检查桌面和手机宽度下的页面、切换主题并刷新确认保存、使用 Tab 导航和“跳转到正文”链接。

## 文件位置

- `src/App.tsx`：首页内容和主题交互。
- `src/styles.css`：布局、配色和移动端适配。
- `src/main.tsx`：React 入口。
- `public/`：无需编译的静态资源。
- `vite.config.ts`：开发和构建配置。

修改 `src/App.tsx` 即可开始定制网站内容。`node_modules/`、构建输出和本地密钥文件不会提交到 Git。
