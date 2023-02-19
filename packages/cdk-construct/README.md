![Build/Deploy CI](https://github.com/pwrdrvr/microapps-app-nextjs-demo/actions/workflows/ci.yml/badge.svg) ![JSII](https://github.com/pwrdrvr/microapps-app-nextjs-demo/actions/workflows/jsii.yml/badge.svg) ![Release](https://github.com/pwrdrvr/microapps-app-nextjs-demo/actions/workflows/release.yml/badge.svg)

# Overview

This is the Release Console for the MicroApps framework.

# Development

- Install `pnpm`
  - https://pnpm.io/installation
  - `npm i -g pnpm`
  - This is needed to prevent hoisting of deps in `packages/app/` which is needed so that `output: standalone` can see the deps and work correctly
- `nvm use`
- For Mac
  - Install Xcode
  - `xcode-select --install`
  - `brew install vips`
- `npm i`
- `npm run dev`
- Open in browser: `http://localhost:3000/nextjs-demo`

# Publish New Version of Microapp

See GitHub Actions workflows for example commands.
