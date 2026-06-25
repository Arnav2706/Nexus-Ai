import { DynamoDBClient, CreateTableCommand } from "@aws-sdk/client-dynamodb";
import fs from 'fs';
// Parse credentials
const csvData = fs.readFileSync('nexusai_accessKeys.csv', 'utf8');
const lines = csvData.trim().split('\n');
const headers = lines[0].split(',');
const values = lines[1].split(',');

const creds = {};
headers.forEach((h, i) => {
  creds[h.trim()] = values[i].trim();
});

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: creds['Access key ID'],
    secretAccessKey: creds['Secret access key']
  }
});

async function provisionTable() {
  console.log("Creating NexusAppData DynamoDB table...");
  try {
    await client.send(new CreateTableCommand({
      TableName: "NexusAppData",
      AttributeDefinitions: [
        { AttributeName: "dataType", AttributeType: "S" }
      ],
      KeySchema: [
        { AttributeName: "dataType", KeyType: "HASH" }
      ],
      BillingMode: "PAY_PER_REQUEST"
    }));
    console.log("✅ Created NexusAppData table!");
  } catch (err) {
    if (err.name === 'ResourceInUseException') {
      console.log("✅ NexusAppData table already exists.");
    } else {
      console.error("❌ Failed to create table:", err);
    }
  }
}

provisionTable();
