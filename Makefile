
copy-router:
	rm .serverless_nextjs/index.js && cp ../serverless-nextjs-router/dist/index.js .serverless_nextjs/

start:
	docker-compose up --build
