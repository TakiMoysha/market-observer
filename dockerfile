FROM oven/bun:1.1 AS base
WORKDIR /usr/app


FROM base AS builder
WORKDIR /tmp/build
COPY . .
RUN bun install --frozen-lockfile --production

# Frontend
RUN bun run build

# Backend
RUN bun build --compile \
  --minify-whitespace \
  --minify-syntax \
  --target bun \
  --outfile backend_bin \
  ./backend/app.ts


FROM base AS stage
COPY --from=builder /tmp/build/node_modules node_modules
COPY --from=builder /tmp/build/public public
COPY --from=builder /tmp/build/dist/ dist
COPY --from=builder /tmp/build/backend_bin /usr/app/

ENV NODE_ENV=production
# RUN bun test


FROM base AS release
COPY --from=builder /tmp/build/node_modules node_modules
COPY --from=builder /tmp/build/public public
COPY --from=stage /usr/app/dist/ /usr/app/
COPY --from=stage /usr/app/backend_bin /usr/app/


RUN addgroup --system --gid 65532 workers \
  && adduser --no-create-home --system --uid 65532 backend \
  && chown -R backend:workers /usr


USER backend
EXPOSE 4321
EXPOSE 3000
STOPSIGNAL SIGINT
# ENTRYPOINT [ "bun", "run", "server/entry.mjs", "--host", "0.0.0.0"]
ENTRYPOINT [ "backend_bin" ]
