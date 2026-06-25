import fs from 'fs';
import { CognitoIdentityProviderClient, CreateUserPoolCommand, CreateUserPoolClientCommand } from "@aws-sdk/client-cognito-identity-provider";
import { S3Client, CreateBucketCommand, PutBucketCorsCommand } from "@aws-sdk/client-s3";

const provisionAWS = async () => {
  try {
    const csvData = fs.readFileSync('nexusai_accessKeys.csv', 'utf8');
    const lines = csvData.trim().split('\n');
    const dataRow = lines[1];
    
    if (!dataRow) throw new Error('CSV file seems empty.');

    const parts = dataRow.split(',');
    const accessKeyId = parts[0]?.replace(/"/g, '').trim();
    const secretAccessKey = parts[1]?.replace(/"/g, '').trim();

    const credentials = { accessKeyId, secretAccessKey };
    const region = 'us-east-1';

    console.log('🚀 Provisioning AWS Infrastructure...');

    // 1. Provision Cognito
    const cognitoClient = new CognitoIdentityProviderClient({ region, credentials });
    
    console.log('Creating Cognito User Pool...');
    const userPoolRes = await cognitoClient.send(new CreateUserPoolCommand({
      PoolName: 'NexusAI_Enterprise_Pool',
      Policies: {
        PasswordPolicy: {
          MinimumLength: 8,
          RequireUppercase: true,
          RequireLowercase: true,
          RequireNumbers: true,
          RequireSymbols: false,
        }
      },
      UsernameAttributes: ['email'],
      AutoVerifiedAttributes: ['email']
    }));

    const userPoolId = userPoolRes.UserPool.Id;
    console.log(`✅ User Pool Created: ${userPoolId}`);

    console.log('Creating Cognito App Client...');
    const appClientRes = await cognitoClient.send(new CreateUserPoolClientCommand({
      UserPoolId: userPoolId,
      ClientName: 'NexusAI_Web_Client',
      GenerateSecret: false,
      ExplicitAuthFlows: ['ALLOW_USER_PASSWORD_AUTH', 'ALLOW_REFRESH_TOKEN_AUTH']
    }));

    const clientId = appClientRes.UserPoolClient.ClientId;
    console.log(`✅ App Client Created: ${clientId}`);

    // 2. Provision S3
    const s3Client = new S3Client({ region, credentials });
    const bucketName = `nexus-ai-uploads-${Date.now()}`;
    
    console.log(`Creating S3 Bucket: ${bucketName}...`);
    await s3Client.send(new CreateBucketCommand({
      Bucket: bucketName
    }));
    console.log(`✅ S3 Bucket Created: ${bucketName}`);

    console.log('Applying CORS Policy to S3 Bucket...');
    await s3Client.send(new PutBucketCorsCommand({
      Bucket: bucketName,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedHeaders: ['*'],
            AllowedMethods: ['GET', 'PUT', 'POST'],
            AllowedOrigins: ['*'],
            ExposeHeaders: []
          }
        ]
      }
    }));
    console.log('✅ CORS Policy Applied.');

    console.log('\n🎉 PROVISIONING COMPLETE! 🎉');
    console.log('Please add these to your Vercel Environment Variables:');
    console.log(`COGNITO_USER_POOL_ID=${userPoolId}`);
    console.log(`COGNITO_CLIENT_ID=${clientId}`);
    console.log(`S3_BUCKET_NAME=${bucketName}`);
    console.log(`AWS_REGION=${region}`);

  } catch (error) {
    console.error('Error provisioning AWS:', error.message);
  }
};

provisionAWS();
