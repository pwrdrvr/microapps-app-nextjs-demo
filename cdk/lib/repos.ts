import * as cdk from '@aws-cdk/core';
import * as ecr from '@aws-cdk/aws-ecr';

export interface IReposExports {
  svc: ecr.Repository;
}

export class ReposStack extends cdk.Stack implements IReposExports {
  private readonly _repotsvc: ecr.Repository;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    this._repotsvc = new ecr.Repository(this, 'app-nextjs-demo-repo', {
      repositoryName: 'app-nextjs-demo',
    });
  }

  public get svc(): ecr.Repository {
    return this._repotsvc;
  }
}
