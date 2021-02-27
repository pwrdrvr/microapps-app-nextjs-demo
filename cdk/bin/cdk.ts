#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ReposStack } from '../lib/repos';
import { SvcsStack } from '../lib/svcs';

const app = new cdk.App();

// Add a tag indicating this app can be managed by the
// MicroApp Deployer Lambda function
cdk.Tags.of(app).add('microapp-managed', 'true');
cdk.Tags.of(app).add('microapp-name', 'nexjs-demo');

const reposStack = new ReposStack(app, 'AppNextJsDemoRepos');
new SvcsStack(app, 'AppNextJsDemoSvcs', { reposExports: reposStack });
