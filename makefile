demo: docker-build
	docker run -it --rm --init --network=host market-observer


dev-back:
	bun install
	bun --watch src/app.ts

build-backend:
	bun build --compile \
  	--minify-whitespace \
  	--minify-syntax \
  	--target bun \
  	--outfile backbin \
  	./src/app.ts

install-prod:
	bun install \
  	--frozen-lockfile \
  	--production

docker-build:
	docker build -t market-observer .

docker-dev:
	docker run -it --init --rm -p 8080:8080 -p 4321:4321 market-observer

docker-postgres:
	docker run --name postgresql -e POSTGRESQL_PASSWORD=postgres --network host bitnami/postgresql:latest
