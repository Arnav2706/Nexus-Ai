import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "./dynamodb";

const TABLE_NAME = process.env.DYNAMODB_LEADS_TABLE || "NexusLeads";

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
      return res.status(500).json({ error: "Failed to fetch leads from DynamoDB" });
    }
  }

  if (req.method === "POST") {
    try {
      const lead = req.body;
      
      if (!lead || !lead.id || !lead.name) {
        return res.status(400).json({ error: "Missing required lead fields" });
      }

      // Automatically add a timestamp
      lead.capturedAt = new Date().toISOString();

      const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: lead,
      });

      await dynamoDb.send(command);
      return res.status(201).json({ message: "Lead captured successfully", lead });
    } catch (error: any) {
      console.error("DynamoDB POST Error:", error);
      return res.status(500).json({ error: "Failed to save lead to DynamoDB" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
