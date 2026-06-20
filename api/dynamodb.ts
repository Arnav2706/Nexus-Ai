import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Ensure AWS credentials are automatically picked up from environment variables
// (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION)
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
});

const marshallOptions = {
  convertEmptyValues: true,
  removeUndefinedValues: true,
  convertClassInstanceToMap: true,
};

const unmarshallOptions = {
  wrapNumbers: false,
};

export const dynamoDb = DynamoDBDocumentClient.from(client, {
  marshallOptions,
  unmarshallOptions,
});
