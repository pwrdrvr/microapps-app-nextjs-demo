#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { ReposStack } from '../lib/repos';
import { SvcsStack } from '../lib/svcs';

const app = new cdk.App();
const reposStack = new ReposStack(app, 'AppNextJsDemoRepos');
new SvcsStack(app, 'AppNextJsDemoSvcs', { reposExports: reposStack });
