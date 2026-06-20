import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDb } from "./dynamodb";

const EVENTS_TABLE = process.env.DYNAMODB_EVENTS_TABLE || "NexusEvents";
const LEADS_TABLE = process.env.DYNAMODB_LEADS_TABLE || "NexusLeads";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      // In a real app, you would use DynamoDB Queries for specific events
      // For the hackathon, we scan and aggregate all data to demonstrate ROI metrics
      
      const eventsData = await dynamoDb.send(new ScanCommand({ TableName: EVENTS_TABLE }));
      const leadsData = await dynamoDb.send(new ScanCommand({ TableName: LEADS_TABLE }));

      const totalEvents = eventsData.Items?.length || 0;
      const totalLeadsCaptured = leadsData.Items?.length || 0;

      // Calculate mock ROI or average lead score
      const totalScore = leadsData.Items?.reduce((acc, lead) => acc + (lead.score || 50), 0) || 0;
      const averageLeadScore = totalLeadsCaptured > 0 ? Math.round(totalScore / totalLeadsCaptured) : 0;

      return res.status(200).json({
        totalEvents,
        totalLeadsCaptured,
        averageLeadScore,
        healthScore: averageLeadScore > 80 ? 'Excellent' : 'Good',
        activeSponsors: Math.min(totalLeadsCaptured, 5) // Mock metric
      });

    } catch (error: any) {
      console.error("DynamoDB GET Error:", error);
      return res.status(500).json({ error: "Failed to fetch analytics from DynamoDB" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
