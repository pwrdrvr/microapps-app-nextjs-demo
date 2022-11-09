# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### MicroAppsAppNextjsDemo <a name="MicroAppsAppNextjsDemo" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo"></a>

- *Implements:* <a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo">IMicroAppsAppNextjsDemo</a>

MicroApps Next.js demo app.

#### Initializers <a name="Initializers" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.Initializer"></a>

```typescript
import { MicroAppsAppNextjsDemo } from '@pwrdrvr/microapps-app-nextjs-demo-cdk'

new MicroAppsAppNextjsDemo(scope: Construct, id: string, props: MicroAppsAppNextjsDemoProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.Initializer.parameter.props">props</a></code> | <code><a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps">MicroAppsAppNextjsDemoProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.Initializer.parameter.props"></a>

- *Type:* <a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps">MicroAppsAppNextjsDemoProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.isConstruct"></a>

```typescript
import { MicroAppsAppNextjsDemo } from '@pwrdrvr/microapps-app-nextjs-demo-cdk'

MicroAppsAppNextjsDemo.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.property.lambdaFunction">lambdaFunction</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | The Lambda function created. |

---

##### `node`<sup>Required</sup> <a name="node" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `lambdaFunction`<sup>Required</sup> <a name="lambdaFunction" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo.property.lambdaFunction"></a>

```typescript
public readonly lambdaFunction: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

The Lambda function created.

---


## Structs <a name="Structs" id="Structs"></a>

### MicroAppsAppNextjsDemoProps <a name="MicroAppsAppNextjsDemoProps" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps"></a>

Properties to initialize an instance of `MicroAppsAppNextjsDemo`.

#### Initializer <a name="Initializer" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps.Initializer"></a>

```typescript
import { MicroAppsAppNextjsDemoProps } from '@pwrdrvr/microapps-app-nextjs-demo-cdk'

const microAppsAppNextjsDemoProps: MicroAppsAppNextjsDemoProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps.property.functionName">functionName</a></code> | <code>string</code> | Name for the Lambda function. |
| <code><a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps.property.nodeEnv">nodeEnv</a></code> | <code>string</code> | NODE_ENV to set on Lambda. |
| <code><a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps.property.removalPolicy">removalPolicy</a></code> | <code>aws-cdk-lib.RemovalPolicy</code> | Removal Policy to pass to assets (e.g. Lambda function). |

---

##### `functionName`<sup>Optional</sup> <a name="functionName" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps.property.functionName"></a>

```typescript
public readonly functionName: string;
```

- *Type:* string
- *Default:* auto-generated

Name for the Lambda function.

While this can be random, it's much easier to make it deterministic
so it can be computed for passing to `microapps-publish`.

---

##### `nodeEnv`<sup>Optional</sup> <a name="nodeEnv" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps.property.nodeEnv"></a>

```typescript
public readonly nodeEnv: string;
```

- *Type:* string

NODE_ENV to set on Lambda.

---

##### `removalPolicy`<sup>Optional</sup> <a name="removalPolicy" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemoProps.property.removalPolicy"></a>

```typescript
public readonly removalPolicy: RemovalPolicy;
```

- *Type:* aws-cdk-lib.RemovalPolicy

Removal Policy to pass to assets (e.g. Lambda function).

---


## Protocols <a name="Protocols" id="Protocols"></a>

### IMicroAppsAppNextjsDemo <a name="IMicroAppsAppNextjsDemo" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo"></a>

- *Implemented By:* <a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.MicroAppsAppNextjsDemo">MicroAppsAppNextjsDemo</a>, <a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo">IMicroAppsAppNextjsDemo</a>

Represents an app.


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo.property.lambdaFunction">lambdaFunction</a></code> | <code>aws-cdk-lib.aws_lambda.IFunction</code> | The Lambda function created. |

---

##### `lambdaFunction`<sup>Required</sup> <a name="lambdaFunction" id="@pwrdrvr/microapps-app-nextjs-demo-cdk.IMicroAppsAppNextjsDemo.property.lambdaFunction"></a>

```typescript
public readonly lambdaFunction: IFunction;
```

- *Type:* aws-cdk-lib.aws_lambda.IFunction

The Lambda function created.

---

