import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { type } = req.query;
    if (!type || typeof type !== 'string') {
      return res.status(400).json({ error: 'Missing or invalid type parameter' });
    }

    const command = new GetItemCommand({
      TableName: process.env.DYNAMODB_APP_DATA_TABLE || 'NexusAppData',
      Key: {
        dataType: { S: type }
      }
    });

    const response = await client.send(command);

    if (!response.Item || !response.Item.data) {
      return res.status(404).json({ error: 'Data not found' });
    }

    const data = JSON.parse(response.Item.data.S as string);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error('DynamoDB Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
