
dev:
	bun run dev

docker-build:
	docker build -t market-observer .

demo: docker-build
	docker run -it --rm --init -p 4321:4321 market-observer
