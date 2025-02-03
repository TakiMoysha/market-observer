FROM oven/bun:1.1 AS base
WORKDIR /usr/app


FROM base AS builder
ENV NODE_ENV=production
WORKDIR /tmp/build
COPY . .

# Frontend
# RUN bun run build

# Backend 
RUN bun install \
  --frozen-lockfile \
  --production

RUN bun build --compile \
  --minify-whitespace \
  --minify-syntax \
  --target bun \
  --outfile server_bin \
  ./server/app.ts

FROM base AS stage
ENV NODE_ENV=production
COPY --from=builder /tmp/build/node_modules node_modules
COPY --from=builder /tmp/build/public public
# COPY --from=builder /tmp/build/dist/ dist  # frontend
COPY --from=builder /tmp/build/server_bin /usr/app/


FROM base AS release
ENV NODE_ENV=production
COPY --from=builder /tmp/build/node_modules node_modules
COPY --from=builder /tmp/build/public public
# COPY --from=stage /usr/app/dist/ /usr/app/ # frontend
COPY --from=stage /usr/app/server_bin /usr/app/

RUN addgroup --system --gid 65532 work-group \
  && adduser --no-create-home --system --uid 65532 server \
  && chown -R server:work-group /usr

USER server 
EXPOSE 4321
EXPOSE 8080 
STOPSIGNAL SIGINT
# ENTRYPOINT [ "bun", "run", "server/entry.mjs", "--host", "0.0.0.0"]
CMD [ "./server_bin" ]
