import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as ecr from '@aws-cdk/aws-ecr';
import * as iam from '@aws-cdk/aws-iam';
import { IReposExports } from './repos';

export interface ISvcsProps extends cdk.StackProps {
  reposExports: IReposExports;
}

export class SvcsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: ISvcsProps) {
    super(scope, id, props);
    //
    // Reader Service
    //
    const svc = new lambda.DockerImageFunction(this, 'svc', {
      code: lambda.DockerImageCode.fromEcr(props.reposExports.svc),
      functionName: 'app-nextjs-demo',
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        NODE_ENV: 'production',
      },
    });
  }
}
