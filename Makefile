
AWS_PROFILE ?= pwrdrvr
AWS_ACCOUNT ?= 239161478713
REGION ?= us-east-2
ECR_HOST ?= ${AWS_ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com
ECR_REPO ?= app-nextjs-demo
IMAGE_TAG ?= ${ECR_REPO}:0.0.1

help:
	@echo "Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo


copy-router: ../serverless-nextjs-router/dist/index.js ## Copy compiled Next.js Router to output
	rm .serverless_nextjs/index.js && cp ../serverless-nextjs-router/dist/index.js .serverless_nextjs/

start: ## Start App Docker Container
	docker-compose up --build

sam-debug: ## Start App w/SAM Local for VS Code Debugging
	sam local start-api --debug-port 5859 --warm-containers EAGER

#
# Lambda ECR Publishing
#

aws-ecr-login: ## establish ECR docker login session
	@aws ecr get-login-password --region ${REGION} | docker login \
		--username AWS --password-stdin ${ECR_HOST}

aws-ecr-publish-svc: ## publish updated ECR docker image
	@docker build -f Dockerfile -t ${IMAGE_TAG}  .
	@docker tag ${IMAGE_TAG} ${ECR_HOST}/${IMAGE_TAG}
	@docker tag ${IMAGE_TAG} ${ECR_HOST}/${ECR_REPO}:latest
	@docker push ${ECR_HOST}/${IMAGE_TAG}
	@docker push ${ECR_HOST}/${ECR_REPO}:latest

aws-lambda-update-svc: ## Update the lambda function to use latest image
	@aws lambda update-function-code --function-name ${ECR_REPO} \
		--image-uri ${ECR_HOST}/${IMAGE_TAG} --region=${REGION} \
		--publish