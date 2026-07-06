FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /repo

FROM base AS deps
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/backend/package.json apps/backend/package.json
RUN pnpm install --frozen-lockfile --filter backend...

FROM deps AS build
COPY apps/backend apps/backend
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
RUN pnpm --filter backend exec prisma generate
RUN pnpm --filter backend build
RUN pnpm --filter backend deploy --prod /prod/backend

FROM node:22-alpine AS runtime
RUN apk add --no-cache openssl && \
    addgroup -S appgroup && \
    adduser -S appuser -G appgroup
WORKDIR /app
COPY --from=build /prod/backend/dist ./dist
COPY --from=build /prod/backend/node_modules ./node_modules
COPY --from=build /prod/backend/prisma ./prisma
COPY --from=build /prod/backend/package.json ./package.json
RUN chown -R appuser:appgroup /app
USER appuser
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/main.js"]