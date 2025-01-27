
dev-back:
	bun run --hot server/app.ts

dev-front:
	bun run astro dev

build-docker:
	docker build -t market-observer .

build-backend:
	bun build --compile \
  	--minify-whitespace \
  	--minify-syntax \
  	--target bun \
  	--outfile backbin \
  	./backend/app.ts

demo: docker-build
	docker run -it --rm --init -p 4321:4321 -p 3000:3000 market-observer
