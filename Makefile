
AWS_PROFILE ?= pwrdrvr
AWS_ACCOUNT ?= 239161478713
REGION ?= us-east-2
ECR_HOST ?= ${AWS_ACCOUNT}.dkr.ecr.${REGION}.amazonaws.com
ECR_REPO ?= app-nextjs-demo
IMAGE_TAG ?= ${ECR_REPO}:0.0.2
LAMBDA_ALIAS ?= v0_0_2

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

# We don't use this anymore now that we have multiple versions
# aws-lambda-update-svc: ## Update the lambda function to use latest image
# 	@aws lambda update-function-code --function-name ${ECR_REPO} \
# 		--image-uri ${ECR_HOST}/${IMAGE_TAG} --region=${REGION} \
# 		--publish


#$(eval VERSION=$$(shell aws lambda publish-version --function-name ${ECR_REPO} | jq -r ".Version"))
aws-create-alias-svc: ## Update the lambda function to use latest image
	# Capture the Revision ID of the newly published code
	@echo "Creating new alias, ${LAMBDA_ALIAS}, pointing to ${ECR_HOST}/${IMAGE_TAG}"
	$(eval VERSION:=$$(shell aws lambda update-function-code --function-name ${ECR_REPO} \
		--image-uri ${ECR_HOST}/${IMAGE_TAG} --region=${REGION} \
		--output json --publish \
		| jq -r ".Version"))
	@echo "New Lambda Version: ${ECR_REPO}/${VERSION}"
	@aws lambda create-alias --function-name ${ECR_REPO} \
		--name ${LAMBDA_ALIAS} --function-version '${VERSION}' --region=${REGION}

aws-update-alias-svc: ## Update the lambda function to use latest image
	# Capture the Revision ID of the newly published code
	@echo "Updating existing alias, ${LAMBDA_ALIAS}, pointing to ${ECR_HOST}/${IMAGE_TAG}"
	$(eval VERSION:=$$(shell aws lambda update-function-code --function-name ${ECR_REPO} \
		--image-uri ${ECR_HOST}/${IMAGE_TAG} --region=${REGION} \
		--output json --publish \
		| jq -r ".Version"))
	@echo "New Lambda Version: ${ECR_REPO}/${VERSION}"
	@aws lambda update-alias --function-name ${ECR_REPO} \
		--name ${LAMBDA_ALIAS} --function-version '${VERSION}' --region=${REGION}

#
# API Gateway Payloads for Testing
#

curl-api-hello-fails: ## Send test request to local app
	@curl -v -XPOST -H "Content-Type: application/json" \
		http://localhost:9000/2015-03-31/functions/function/invocations \
		--data-binary "@test-payloads/api-hello-fails.json"

curl-home: ## Send test request to local app
	@curl -v -XPOST -H "Content-Type: application/json" \
		http://localhost:9000/2015-03-31/functions/function/invocations \
		--data-binary "@test-payloads/home.json"

curl-image: ## Send test request to local app
	@curl -v -XPOST -H "Content-Type: application/json" \
		http://localhost:9000/2015-03-31/functions/function/invocations \
		--data-binary "@test-payloads/image.json"