# From Serverless Next.js Demo Instructions

https://github.com/serverless-nextjs/serverless-next.js/tree/master/packages/serverless-components/nextjs-component/examples/create-next-app

## Testing Locally with AWS SAM CLI

- `aws-vault exec [profile] -- code .` to startup VS Code with AWS env set
- `serverless` to setup the deploy directory
- `make copy-router` to copy router code locally
- `make sam-debug`
- Load in browser: http://127.0.0.1:3000/app/1.2.3
- Start 'Attach to SAM CLI' Debug Profile
- At this point the container should startup, debugger will attach, and breakpoints will work

## Install Modules

`yarn`

## Build App

`yarn build`

## Delete old S3 Bucket

`aws-vault exec pwrdrvr-admin -- aws s3 rm --recursive s3://66rb0ct-9zcltne/`

## Publishing - Next.js Serverless

```
# Publish the App
rm .env # Can't have a .env... it messes up serverless
export AWS_REGION=us-east-1
aws-vault exec pwrdrvr-admin -- npx serverless

# Remove all files from S3 bucket if needed
aws-vault exec pwrdrvr-admin -- aws s3 rm --recursive s3://66rb0ct-9zcltne/
```

## Publishing - MicroApp

- Update Lambda function code and create version alias
  - Note: this is hard-coded to `v1_0_0` for now in the Makefile
  - Note: this compiles the code and builds the docker image
  - `aws-vault exec pwrdrvr-admin -- make aws-ecr-login`
  - `aws-vault exec pwrdrvr-admin -- make aws-ecr-publish-svc`
  - Create first time
    - `aws-vault exec pwrdrvr-admin -- make aws-create-alias-svc`
  - Update alias if already exists
    - `aws-vault exec pwrdrvr-admin -- make aws-update-alias-svc`
- Deploy the updated HTML and link to lambda from api gateway
  - `export AWS_REGION=us-east-2`
  - `aws-vault exec pwrdrvr-admin -- dotnet run --project ~/pwrdrvr/microapps-cdk/src/PwrDrvr.MicroApps.DeployTool/`
- Cleanup failed publish
  - `aws-vault exec pwrdrvr-admin -- aws s3 rm --recursive s3://pwrdrvr-apps/nextjs-demo/`
  - `aws-vault exec pwrdrvr-admin -- aws s3 rm --recursive s3://pwrdrvr-apps/nextjs-demo-staging/`
