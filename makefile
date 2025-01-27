
dev-back:
	bun run --hot backend/app.ts

dev-front:
	bun run astro dev

build-backend:
	bun build --compile \
  	--minify-whitespace \
  	--minify-syntax \
  	--target bun \
  	--outfile backbin \
  	./backend/app.ts

demo: docker-build
	docker run -it --rm --init --network=host market-observer


docker-build:
	docker build -t market-observer .

docker-dev:
	docker run -it --init --rm -p 8080:8080 -p 4321:4321 market-observer

