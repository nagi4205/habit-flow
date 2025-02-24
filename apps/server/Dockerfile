# ベースイメージ
FROM node:20-slim AS base
WORKDIR /app

# npmを使ってpnpmをインストール
RUN npm install -g pnpm

# 依存関係のインストール用ステージ
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ビルド用ステージ
FROM deps AS builder
COPY . .
RUN pnpm build

# ランタイム環境（本番用）
FROM base AS runner
WORKDIR /app

# 実行ユーザーを変更 (セキュリティ対策)
RUN useradd --create-home --shell /bin/bash appuser
USER appuser

# 必要なファイルのみコピー
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./

ENV PORT=8080
EXPOSE 8080
CMD ["pnpm", "start"]
