FROM oven/bun:1.1 AS base
WORKDIR /usr/app


FROM base AS builder
WORKDIR /tmp/build
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile --production


FROM base AS stage
COPY --from=builder /tmp/build/node_modules node_modules
COPY . .

ENV NODE_ENV=production
RUN bun test
RUN bun run build


FROM base AS release
COPY --from=builder /tmp/build/node_modules node_modules
COPY --from=stage /usr/app/dist/ /usr/app


RUN addgroup --system --gid 65532 workers \
  && adduser --no-create-home --system --uid 65532 backend \
  && chown -R backend:workers /usr


USER backend
EXPOSE 4321
STOPSIGNAL SIGINT
ENTRYPOINT [ "bun", "run", "server/entry.mjs", "--host", "0.0.0.0"]
