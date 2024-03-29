import { existsSync } from 'fs';
import { Aws, Duration, RemovalPolicy } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
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
   * Removal Policy to pass to assets (e.g. Lambda function)
   */
  readonly removalPolicy?: RemovalPolicy;

  /**
   * NODE_ENV to set on Lambda
   */
  readonly nodeEnv?: 'dev' | 'qa' | 'prod';
}

/**
 * Represents an app
 */
export interface IMicroAppsAppNextjsDemo {
  /**
   * The Lambda function created
   */
  readonly lambdaFunction: lambda.IFunction;
}

/**
 * MicroApps Next.js demo app.
 *
 */
export class MicroAppsAppNextjsDemo extends Construct implements IMicroAppsAppNextjsDemo {
  private _lambdaFunction: lambda.Function;
  public get lambdaFunction(): lambda.IFunction {
    return this._lambdaFunction;
  }

  /**
   * Lambda function, permissions, and assets used by the app
   * @param scope
   * @param id
   * @param props
   */
  constructor(scope: Construct, id: string, props: MicroAppsAppNextjsDemoProps) {
    super(scope, id);

    const { functionName, nodeEnv = 'dev', removalPolicy } = props;

    // Create Lambda Function
    let code: lambda.AssetCode;
    if (existsSync(path.join(__dirname, 'microapps-app-nextjs-demo', 'server', 'server.js'))) {
      // This is for built apps packaged with the CDK construct
      code = lambda.Code.fromAsset(path.join(__dirname, 'microapps-app-nextjs-demo', 'server'));
    } else {
      // This is the path for local / developer builds
      code = lambda.Code.fromAsset(path.join(__dirname, '..', '..', 'app', '.next'));
    }

    //
    // Lambda Function
    //
    this._lambdaFunction = new lambda.Function(this, 'app-lambda', {
      code,
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: 'run.sh',
      functionName,
      environment: {
        AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
        NODE_ENV: 'production',
        NODE_CONFIG_ENV: nodeEnv,
        AWS_XRAY_CONTEXT_MISSING: 'IGNORE_ERROR',
        AWS_LWA_ENABLE_COMPRESSION: 'true',
        AWS_LAMBDA_EXEC_WRAPPER: '/opt/bootstrap',
        RUST_LOG: 'info',
        PORT: '3000',
        READINESS_CHECK_PATH: '/nextjs-demo',
      },
      logRetention: logs.RetentionDays.ONE_MONTH,
      memorySize: 1769,
      timeout: Duration.seconds(15),
      architecture: lambda.Architecture.ARM_64,
      layers: [
        lambda.LayerVersion.fromLayerVersionArn(
          this,
          'lwa-layer',
          // 13 is 0.6.2 w/gzip support
          `arn:aws:lambda:${Aws.REGION}:753240598075:layer:LambdaAdapterLayerArm64:13`,
        ),
      ],
    });
    if (removalPolicy !== undefined) {
      this._lambdaFunction.applyRemovalPolicy(removalPolicy);
    }
  }
}
