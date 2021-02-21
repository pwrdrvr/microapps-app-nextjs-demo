
copy-router: ../serverless-nextjs-router/dist/index.js
	rm .serverless_nextjs/index.js && cp ../serverless-nextjs-router/dist/index.js .serverless_nextjs/

start:
	docker-compose up --build

sam-debug:
	sam local start-api --debug-port 5859 --warm-containers EAGER
