demo: docker-build
	docker run -it --rm --init --network=host market-observer


server:
	bun install
	bun --watch server/app.ts

build-server:	
	bun build --compile \
	  --minify-whitespace \
	  --minify-syntax \
	  --target bun \
	  --outfile server_bin \
	  ./server/app.ts

docker-build:
	docker build -t market-observer .

docker-dev:
	docker run -it --init --rm -p 8080:8080 -p 4321:4321 market-observer

docker-postgres:
	docker run --name postgresql -e POSTGRESQL_PASSWORD=postgres --network host bitnami/postgresql:latest
