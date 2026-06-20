import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "./dynamodb";

const TABLE_NAME = process.env.DYNAMODB_EVENTS_TABLE || "NexusEvents";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      const command = new ScanCommand({
        TableName: TABLE_NAME,
      });

      const response = await dynamoDb.send(command);
      return res.status(200).json(response.Items || []);
    } catch (error: any) {
      console.error("DynamoDB GET Error:", error);
      return res.status(500).json({ error: "Failed to fetch events from DynamoDB" });
    }
  }

  if (req.method === "POST") {
    try {
      const event = req.body;
      
      // Basic validation
      if (!event || !event.id || !event.title) {
        return res.status(400).json({ error: "Missing required event fields" });
      }

      const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: event,
      });

      await dynamoDb.send(command);
      return res.status(201).json({ message: "Event saved successfully", event });
    } catch (error: any) {
      console.error("DynamoDB POST Error:", error);
      return res.status(500).json({ error: "Failed to save event to DynamoDB" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
