import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { CfnOutput } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
      const handler = new Function(this, 'hello-lambdas2',{
        runtime: Runtime.PYTHON_3_9,
        memorySize:512,
        handler: 'lamda-list.main',
        code: Code.fromAsset(join(__dirname,'../lambdas')),
        environment:{
          NAME:'dante',
          SURRNAME:'panella'
        }
      });

      const listBucketPolicy = new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:*'],
        resources: ['*']
      });

      const listLambdaPolicy = new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['lambda:*'],
        resources: ['*']
      });
      
      handler.role?.attachInlinePolicy(
        new iam.Policy(this,'list-resources',{
          statements:[listBucketPolicy,listLambdaPolicy]
        })
      )

      new CfnOutput(this, 'function-arn',{
        value: handler.functionArn
      })
  }
}
