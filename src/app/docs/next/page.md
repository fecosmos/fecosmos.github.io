# 搭建 next 项目

## 创建 next 项目

创建项目，可以参考 [How to set up a new Next.js project](https://nextjs.org/docs/app/getting-started/installation)

```bash npm2yarn
npx create-next-app@latest
```

根据需要选择

```bash
What is your project named? my-app
Would you like to use TypeScript? No / Yes
Would you like to use ESLint? No / Yes
Would you like to use Tailwind CSS? No / Yes
Would you like your code inside a `src/` directory? No / Yes
Would you like to use App Router? (recommended) No / Yes
Would you like to customize the import alias (`@/*` by default)? No / Yes
What import alias would you like configured? @/*
```

## 安装 husky

husky 文档参考 https://typicode.github.io/husky/zh/get-started.html

```bash npm2yarn
npm install --save-dev husky
```

init 命令简化了项目中的 husky 设置。它会在 .husky/ 中创建 pre-commit 脚本，并更新 package.json 中的 prepare 脚本。随后可根据你的工作流进行修改。

```bash
npx husky init
```

项目会生成 .husky 文件夹，其中 `.husky/pre-commit` 可以配置我们在 `git commit` 之前做的某些检查

```
npm run lint
```

**注意** windows 系统上确保所有 `husky` 文件都是 `utf-8` 的，否则有可能会报 [cannot execute binary file](https://github.com/typicode/husky/issues/1426)

## 使用 prettier 格式化代码

### 安装配置 prettier

首先安装 [prettier](https://prettier.io) 和 `eslint-config-prettier`

```bash npm2yarn
npm install prettier eslint-config-prettier --save-dev
```

然后再 `eslint` 配置文件中配置 `prettier`

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals", "prettier"]
}
```

然后再项目目录下创建 `prettier` 的配置文件，具体可以参考 https://www.prettier.cn/docs/configuration.html

这里创建一个 `.prettierrc.js` 用来配置我们的代码格式。

```js
module.exports = {
  semi: false,
  singleQuote: true,
}
```

文章参考 https://medium.com/@Pavan_/nextjs-set-up-with-typescript-eslint-and-prettier-26eddd964adf

### 添加格式化代码命令

添加格式化代码命令到 package.json

```json
{
  "scripts": {
    "format": "prettier --write ./src"
  }
}
```

在控制台运行下面命令格式化代码

```bash
npm run format
```

## 安装 commitlint

### commitlint

使用 [commitlint](https://commitlint.js.org) 来检查 git 提交信息是否规范

```bash npm2yarn
npm install --save-dev @commitlint/{cli,config-conventional}
# windows
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

创建 `commitlint.config.js`

```bash
# commitlint.config.js
export default { extends: ['@commitlint/config-conventional'] }
```

这是可以使用 git commit 来测试下提交

```bash
# 这里会因为提交不规范而提交失败
git commit -m 'aaaaaa'
```

### commitizen

commitizen 是一个帮助开发者编写符合规范的提交信息的工具。这里结合 [git-cz](https://github.com/streamich/git-cz) 来辅助提交

```bash npm2yarn
npm install -g commitizen
npm install --save-dev git-cz
```

`package.json`

```json
{
  "config": {
    "commitizen": {
      "path": "git-cz"
    }
  }
}
```

提交时我们可以使用 `git cz` 命令

```bash
git cz
```

自定义配置我们的提交信息

```js
// changelog.config.js
module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: [
    'test',
    'feat',
    'fix',
    'chore',
    'docs',
    'refactor',
    'style',
    'ci',
    'perf',
  ],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: [
    'type',
    'scope',
    'subject',
    'body',
    'breaking',
    'issues',
    'lerna',
  ],
  scopes: [],
  types: {
    chore: {
      description: '构建过程或辅助工具的更改',
      emoji: '🤖',
      value: 'chore',
    },
    ci: {
      description: 'CI 相关的更改',
      emoji: '🎡',
      value: 'ci',
    },
    docs: {
      description: '仅文档更改',
      emoji: '✏️',
      value: 'docs',
    },
    feat: {
      description: '一个新功能',
      emoji: '🎸',
      value: 'feat',
    },
    fix: {
      description: '一个错误修复',
      emoji: '🐛',
      value: 'fix',
    },
    perf: {
      description: '提高性能的代码更改',
      emoji: '⚡️',
      value: 'perf',
    },
    refactor: {
      description: '既不是错误修复也不是功能添加的代码更改',
      emoji: '💡',
      value: 'refactor',
    },
    release: {
      description: '创建一个发布提交',
      emoji: '🏹',
      value: 'release',
    },
    style: {
      description: '标记、空白、格式化、缺少分号等...',
      emoji: '💄',
      value: 'style',
    },
    test: {
      description: '添加缺失的测试',
      emoji: '💍',
      value: 'test',
    },
    messages: {
      type: '选择您要提交的更改类型:',
      customScope: '选择此组件影响的范围:',
      subject: '写一个简短的、更改的命令式描述:\n',
      body: '提供更长的更改描述:\n ',
      breaking: '列出任何重大更改:\n',
      footer: '此提交关闭的问题，例如 #123:',
      confirmCommit: '此提交影响的包\n',
    },
  },
}
```

### 添加到 husky 钩子上

```bash

echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

这时会在生成 `.husky/commit-msg` 文件，文件内容是

```bash
npx --no -- commitlint --edit "$1"
```

### 测试提交

随便输入提交信息进行提交

```
git add .
git commit -m '哈哈哈'
```

这时提交应该会报错

如果提交成功了，需要检查下上面的配置，此时提交是不规范应该无法提交才对，先撤销提交

```bash
# 销最近的提交，但保留更改在工作区
git reset --soft HEAD~1
```

没问题后，然后输入 `git cz`，根据提示输入提交信息

```bash
git cz
```

## lint-staged

`lint-staged` 是一个用于在 Git 暂存区（staged files）上运行 代码检查工具（如 ESLint、Prettier、Stylelint 等）的工具。它的主要作用是 在提交代码前自动检查和格式化暂存区的文件，确保提交的代码符合团队的代码规范。

在执行 `npm run format` 时，我们会格式化所有文件，但是这样会导致提交的文件太多，所以我们可以使用 `lint-staged` 来只格式化暂存区的文件

```bash npm2yarn
npm install --save-dev lint-staged
```

在 `package.json` 中添加配置

```json
{
  "lint-staged": {
    "src/**/*": ["npm run format"],
    "*.{js,ts,mjs,json}": ["npm run format"]
  }
}
```

添加 `lint-staged` 到 `pre-commit` 文件中，这样在提交代码时会自动检查暂存区的文件

```bash
#  pre-commit
npx lint-staged
npm run lint
```

> [!Tip]
>
> 为什么不能添加 `next lint` 呢？因为 `next lint` 因为它会检查所有文件，而不仅仅是暂存区的文件，所以必须保证文件目录完整，而 `lint-staged` 只检查暂存区的文件，所以这里只能使用 `npm run lint` 来检查所有文件

## 安装 shadcn

参考 https://ui.shadcn.com/docs/installation/next

### 安装

```bash npm2yarn
npx shadcn@latest init
```

然后选择

```bash
√ Which style would you like to use? » Default
√ Which color would you like to use as base color? » Zinc
√ Would you like to use CSS variables for colors? ... no / yes
```

然后，安装 Button 组件测试

```bash npm2yarn
npx shadcn@latest add button
```

```tsx
import { Button } from '@/components/ui/button'
```

```tsx
<Button variant="outline">Button</Button>
```

黑白主题切换参考 https://ui.shadcn.com/docs/dark-mode/next

### Next.js 15 + React 19

将 shadcn/ui 与 Next. js 15 和 React 19一起使用。参考 [Next.js 15 + React 19](https://ui.shadcn.com/docs/react-19)

## 部署

可以参考 next.js 官网 [Deploying](https://nextjs.org/docs/app/building-your-application/deploying)

### Docker 部署

官网提供了一个例子，可以参考 [With Docker](https://github.com/vercel/next.js/tree/canary/examples/with-docker)

首先确保已经服务器上[安装 Docker](https://docs.docker.com/get-started/get-docker/)

#### 创建 next docker 项目

你可以在创建项目时选择 docker 模版

```bash npm2yarn
npx create-next-app --example with-docker nextjs-docker
```

#### 添加现有项目

```ts
// next.config.ts
export default {
  // ... rest of the configuration.
  output: 'standalone',
}
```

<details>
  <summary>output: "standalone" 的作用</summary>

- 生成独立的输出目录:
  - 运行 next build 时，Next.js 会生成一个 standalone 目录，包含所有运行应用所需的文件。
- 这个目录是自包含的，可以直接部署到生产环境，无需依赖 node_modules。

- 优化生产部署：
  - 减少部署包的大小，因为 standalone 目录只包含必要的文件。
  - 避免在部署时重新安装依赖，提升部署效率。
- 支持无服务器（Serverless）部署：
  - 生成的 standalone 目录可以直接用于无服务器平台（如 Vercel、AWS Lambda 等）。
  </details>

#### Dockerfile 配置

<details>
  <summary>Dockerfile 配置</summary>

```Dockerfile
# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

</details>

我们还可以在 `Dockerfile` 文件中添加自己的一些配置，例如在 build 之前执行一些初始化操作

#### 运行 Docker

构建你的容器：

```bash
docker build -t nextjs-docker
```

运行你的容器

```bash
docker run -p 3000:3000 nextjs-docker
```

查看所有创建的容器

```bash
docker images
```

### Node.js

运行 `npm run build` 来构建您的应用程序.

```bash
npm run build
```

最后，运行 `npm run start` 以启动 Node. js 服务器

```bash
npm run start
```

### 静态文件

Next. js允许从静态站点或单页应用程序（SPA）开始，然后可以选择升级以使用需要服务器的功能。

```ts
// next.config.ts
export default {
  output: 'export',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
}
```

由于 Next. js 支持这个静态导出，它可以部署和托管在任何可以提供 HTML/CSS/JS 静态资产的 Web 服务器上。这包括 AWS S3、Nginx 或 Apache 等工具。
