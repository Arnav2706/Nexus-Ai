import type { VercelRequest, VercelResponse } from "@vercel/node";
import { BedrockRuntimeClient, ConverseCommand } from "@aws-sdk/client-bedrock-runtime";

// Initialize Bedrock Client
const bedrockClient = new BedrockRuntimeClient({
  region: process.env.AWS_REGION || "us-east-1",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    try {
      const { prompt, context } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      // We use Amazon Nova Lite via Bedrock
      const modelId = "amazon.nova-lite-v1:0"; // or "us.amazon.nova-lite-v1:0" depending on region

      const systemPrompt = `You are the Nexus-AI Copilot, an expert professional networking and event scheduling assistant.
      Context: ${JSON.stringify(context || {})}
      Provide concise, highly actionable advice to help the user maximize their event ROI.`;

      const command = new ConverseCommand({
        modelId,
        system: [{ text: systemPrompt }],
        messages: [
          {
            role: "user",
            content: [{ text: prompt }]
          }
        ],
        inferenceConfig: {
          maxTokens: 500,
          temperature: 0.7,
        }
      });

      const response = await bedrockClient.send(command);
      
      return res.status(200).json({ 
        reply: response.output?.message?.content?.[0]?.text || "No response generated.",
        model: modelId
      });

    } catch (error: any) {
      console.warn("Bedrock Invoke Error (Fallback to Mock):", error.message);
      
      // Graceful fallback for the hackathon demo if Bedrock isn't configured
      const mockReplies = [
        "Based on your profile, you should prioritize the Keynote at 10 AM, followed by the AWS serverless workshop.",
        "I noticed 3 high-value B2B leads in the main exhibition hall that match your ideal customer profile. Would you like me to map a route?",
        "Your event ROI is currently tracking 15% higher than average. Great job engaging with the VIP sponsors!",
      ];
      
      return res.status(200).json({ 
        reply: "(Mock AI) " + mockReplies[Math.floor(Math.random() * mockReplies.length)],
        model: "mock-fallback"
      });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
