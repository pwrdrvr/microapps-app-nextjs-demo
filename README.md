![Build/Deploy CI](https://github.com/pwrdrvr/serverless-nextjs-demo/actions/workflows/ci.yml/badge.svg) ![Main Build](https://github.com/pwrdrvr/serverless-nextjs-demo/actions/workflows/jsii.yml/badge.svg) ![Deploy](https://github.com/pwrdrvr/serverless-nextjs-demo/actions/workflows/deploy.yml/badge.svg) ![Release](https://github.com/pwrdrvr/serverless-nextjs-demo/actions/workflows/release.yml/badge.svg)
# From Serverless Next.js Demo Instructions

https://github.com/serverless-nextjs/serverless-next.js/tree/master/packages/serverless-components/nextjs-component/examples/create-next-app

# Development

- `nvm use`
- For Mac
  - Install Xcode
  - `xcode-select --install`
  - `brew install vips`
- `npm i`
- `npm run dev`
- Open in browser: `http://localhost:3000/nextjs-demo/0.0.0`


# Publish New Version of Microapp
#
See GitHub Actions workflows for example commands.

## Testing Locally with AWS SAM CLI

- `aws-vault exec [profile] -- code .` to startup VS Code with AWS env set
- `serverless` to setup the deploy directory
- `make copy-router` to copy router code locally
- `make sam-debug`
- Load in browser: http://127.0.0.1:3000/app/1.2.3
- Start 'Attach to SAM CLI' Debug Profile
- At this point the container should startup, debugger will attach, and breakpoints will work

## Delete old S3 Bucket

`aws-vault exec pwrdrvr-admin -- aws s3 rm --recursive s3://66rb0ct-9zcltne/`
