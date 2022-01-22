# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### MicroAppsAppNextjsDemo <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo"></a>

- *Implements:* [`@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo`](#@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo)

NextJS Demo app for MicroApps framework.

> {@link https://nextjs.org/learn/basics/create-nextjs-app | Create NextJS App }

#### Initializer <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.Initializer"></a>

```typescript
import { MicroAppsAppNextjsDemo } from '@pwrdrvr/microapps-app-nextjs-demo-cdk'

new MicroAppsAppNextjsDemo(scope: Construct, id: string, props: MicroAppsAppNextjsDemoProps)
```

##### `scope`<sup>Required</sup> <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.scope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.id"></a>

- *Type:* `string`

---

##### `props`<sup>Required</sup> <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.props"></a>

- *Type:* [`@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps`](#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps)

---



#### Properties <a name="Properties"></a>

##### `lambdaFunction`<sup>Required</sup> <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.lambdaFunction"></a>

- *Type:* [`aws-cdk-lib.aws_lambda.IFunction`](#aws-cdk-lib.aws_lambda.IFunction)

The Lambda function created.

---


## Structs <a name="Structs"></a>

### MicroAppsAppNextjsDemoProps <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps"></a>

Properties to initialize an instance of `MicroAppsAppNextjsDemo`.

#### Initializer <a name="[object Object].Initializer"></a>

```typescript
import { MicroAppsAppNextjsDemoProps } from '@pwrdrvr/microapps-app-nextjs-demo-cdk'

const microAppsAppNextjsDemoProps: MicroAppsAppNextjsDemoProps = { ... }
```

##### `staticAssetsS3Bucket`<sup>Required</sup> <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps.staticAssetsS3Bucket"></a>

- *Type:* [`aws-cdk-lib.aws_s3.IBucket`](#aws-cdk-lib.aws_s3.IBucket)

Bucket with the static assets of the app.

Next.js apps need access to the static assets bucket.

---

##### `functionName`<sup>Optional</sup> <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps.functionName"></a>

- *Type:* `string`
- *Default:* auto-generated

Name for the Lambda function.

While this can be random, it's much easier to make it deterministic
so it can be computed for passing to `microapps-publish`.

---

##### `nodeEnv`<sup>Optional</sup> <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps.nodeEnv"></a>

- *Type:* `string`

NODE_ENV to set on Lambda.

---

##### `removalPolicy`<sup>Optional</sup> <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps.removalPolicy"></a>

- *Type:* [`aws-cdk-lib.RemovalPolicy`](#aws-cdk-lib.RemovalPolicy)

Removal Policy to pass to assets (e.g. Lambda function).

---

##### `sharpLayer`<sup>Optional</sup> <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps.sharpLayer"></a>

- *Type:* [`aws-cdk-lib.aws_lambda.ILayerVersion`](#aws-cdk-lib.aws_lambda.ILayerVersion)

`sharp` node module Lambda Layer for Next.js image adjustments.

---


## Protocols <a name="Protocols"></a>

### IMicroAppsAppNextjsDemo <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo"></a>

- *Implemented By:* [`@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo`](#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo), [`@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo`](#@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo)

Represents a NextJS Demo app.


#### Properties <a name="Properties"></a>

##### `lambdaFunction`<sup>Required</sup> <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo.lambdaFunction"></a>

- *Type:* [`aws-cdk-lib.aws_lambda.IFunction`](#aws-cdk-lib.aws_lambda.IFunction)

The Lambda function created.

---

