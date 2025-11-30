import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc, SubnetType, IpAddresses } from 'aws-cdk-lib/aws-ec2';

export class S3PeEc2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'MyVpc', {
      ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
      maxAzs: 2,

      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'public-subnet',
          subnetType: SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'private-subnet',
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],

      natGateways: 0,
      restrictDefaultSecurityGroup: false
    });
  }
}