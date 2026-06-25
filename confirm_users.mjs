import fs from 'fs';
import { CognitoIdentityProviderClient, ListUsersCommand, AdminConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const confirmUsers = async () => {
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
    
    // Read user pool id from .env.local
    const envData = fs.readFileSync('.env.local', 'utf8');
    const userPoolIdMatch = envData.match(/COGNITO_USER_POOL_ID="?([^"\n]+)"?/);
    let userPoolId = userPoolIdMatch ? userPoolIdMatch[1] : null;

    if (!userPoolId) {
      userPoolId = 'us-east-1_izDvfX5gO'; // Fallback to the one we created earlier
    }

    const client = new CognitoIdentityProviderClient({ region, credentials });

    console.log(`Fetching users from Pool: ${userPoolId}...`);
    const listRes = await client.send(new ListUsersCommand({
      UserPoolId: userPoolId
    }));

    const users = listRes.Users || [];
    console.log(`Found ${users.length} users.`);

    for (const user of users) {
      if (user.UserStatus === 'UNCONFIRMED') {
        console.log(`Confirming user: ${user.Username}...`);
        await client.send(new AdminConfirmSignUpCommand({
          UserPoolId: userPoolId,
          Username: user.Username
        }));
        console.log(`✅ Successfully confirmed ${user.Username}!`);
      } else {
        console.log(`User ${user.Username} is already ${user.UserStatus}.`);
      }
    }

    console.log('\n🎉 All users have been verified. You can now log in!');
  } catch (error) {
    console.error('Error confirming users:', error.message);
  }
};

confirmUsers();
