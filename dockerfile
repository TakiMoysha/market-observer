FROM oven/bun:1.1 AS base
WORKDIR /usr/app


FROM base AS builder
WORKDIR /tmp/build
COPY . .
RUN bun install \
  # --frozen-lockfile \
  --production

# Frontend
RUN bun run build

# Backend
RUN bun install \
  --frozen-lockfile \
  --production

RUN bun build \
  --compile \
  --minify-whitespace \
  --minify-syntax \
  --target bun \
  --outfile backbin \
  ./backend/app.ts


FROM base AS stage
ENV NODE_ENV=production
COPY --from=builder /tmp/build/node_modules node_modules
COPY --from=builder /tmp/build/public public
COPY --from=builder /tmp/build/dist/ dist
COPY --from=builder /tmp/build/backbin /usr/app/

# RUN bun test


FROM base AS release
ENV NODE_ENV=production
COPY --from=builder /tmp/build/node_modules node_modules
COPY --from=builder /tmp/build/public public
COPY --from=stage /usr/app/dist/ /usr/app/
COPY --from=stage /usr/app/backbin /usr/app/


RUN addgroup --system --gid 65532 workers \
  && adduser --no-create-home --system --uid 65532 backend \
  && chown -R backend:workers /usr


USER backend
EXPOSE 4321
EXPOSE 8080 
STOPSIGNAL SIGINT
# ENTRYPOINT [ "bun", "run", "server/entry.mjs", "--host", "0.0.0.0"]
ENTRYPOINT [ "./backbin" ]
