# API Reference <a name="API Reference"></a>

## Constructs <a name="Constructs"></a>

### MicroAppsAppNextjsDemo <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo"></a>

- *Implements:* [`@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo`](#@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo)

MicroApps Next.js demo app.

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


## Protocols <a name="Protocols"></a>

### IMicroAppsAppNextjsDemo <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo"></a>

- *Implemented By:* [`@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo`](#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo), [`@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo`](#@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo)

Represents an app.


#### Properties <a name="Properties"></a>

##### `lambdaFunction`<sup>Required</sup> <a name="@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo.lambdaFunction"></a>

- *Type:* [`aws-cdk-lib.aws_lambda.IFunction`](#aws-cdk-lib.aws_lambda.IFunction)

The Lambda function created.

---

