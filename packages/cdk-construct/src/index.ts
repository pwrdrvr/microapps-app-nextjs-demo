import { existsSync } from 'fs';
import { Construct } from 'constructs';
import { RemovalPolicy, Duration } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as path from 'path';

/**
 * Properties to initialize an instance of `MicroAppsAppNextjsDemo`.
 */
export interface MicroAppsAppNextjsDemoProps {
  /**
   * Name for the Lambda function.
   *
   * While this can be random, it's much easier to make it deterministic
   * so it can be computed for passing to `microapps-publish`.
   *
   * @default auto-generated
   */
  readonly functionName?: string;

  /**
   * Bucket with the static assets of the app.
   *
   * Next.js apps need access to the static assets bucket.
   */
  readonly staticAssetsS3Bucket: s3.IBucket;

  /**
   * Removal Policy to pass to assets (e.g. Lambda function)
   */
  readonly removalPolicy?: RemovalPolicy;

  /**
   * `sharp` node module Lambda Layer for Next.js image adjustments
   *
   * @example https://github.com/zoellner/sharp-heic-lambda-layer/pull/3
   */
  readonly sharpLayer?: lambda.ILayerVersion;

  /**
   * NODE_ENV to set on Lambda
   */
  readonly nodeEnv?: 'dev' | 'qa' | 'prod';
}

/**
 * Represents a NextJS Demo app
 */
export interface IMicroAppsAppNextjsDemo {
  /**
   * The Lambda function created
   */
  readonly lambdaFunction: lambda.IFunction;
}

/**
 * NextJS Demo app for MicroApps framework.
 *
 * @remarks
 * Implemented from the NextJS tutorial.
 *
 * @see {@link https://nextjs.org/learn/basics/create-nextjs-app | Create NextJS App }
 */
export class MicroAppsAppNextjsDemo extends Construct implements IMicroAppsAppNextjsDemo {
  private _lambdaFunction: lambda.Function;
  public get lambdaFunction(): lambda.IFunction {
    return this._lambdaFunction;
  }

  /**
   * Lambda function, permissions, and assets used by the MicroApps Release app
   * @param scope
   * @param id
   * @param props
   */
  constructor(scope: Construct, id: string, props: MicroAppsAppNextjsDemoProps) {
    super(scope, id);

    const {
      functionName,
      nodeEnv = 'dev',
      removalPolicy,
      sharpLayer,
      staticAssetsS3Bucket,
    } = props;

    // Create Lambda Function
    let code: lambda.AssetCode;
    if (existsSync(path.join(__dirname, '.serverless_nextjs', 'index.js'))) {
      // This is for built apps packaged with the CDK construct
      code = lambda.Code.fromAsset(path.join(__dirname, '.serverless_nextjs'));
    } else {
      // This is the path for local / developer builds
      code = lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'app', '.serverless_nextjs'));
    }

    //
    // Lambda Function
    //
    this._lambdaFunction = new lambda.Function(this, 'app-lambda', {
      code,
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler',
      functionName,
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        NODE_ENV: nodeEnv,
        S3BUCKETNAME: staticAssetsS3Bucket.bucketName,
      },
      logRetention: logs.RetentionDays.ONE_MONTH,
      memorySize: 1769,
      timeout: Duration.seconds(15),
    });
    if (removalPolicy !== undefined) {
      this._lambdaFunction.applyRemovalPolicy(removalPolicy);
    }
    // Add the Sharp layer if it was provided, else skip it
    if (sharpLayer !== undefined) {
      this._lambdaFunction.addLayers(sharpLayer);
    }

    // S3 bucket for deployed apps
    // Next.js apps need read/write access to their directory
    staticAssetsS3Bucket.grantReadWrite(this._lambdaFunction);
  }
}
