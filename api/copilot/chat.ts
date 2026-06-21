import type { VercelRequest, VercelResponse } from "@vercel/node";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

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

      // We use Anthropic Claude 3 Haiku via Bedrock for fast, cheap inference
      const modelId = "anthropic.claude-3-haiku-20240307-v1:0";

      const systemPrompt = `You are the Nexus-AI Copilot, an expert professional networking and event scheduling assistant.
      Context: ${JSON.stringify(context || {})}
      Provide concise, highly actionable advice to help the user maximize their event ROI.`;

      const payload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 500,
        temperature: 0.7,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      };

      const command = new InvokeModelCommand({
        modelId,
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(payload),
      });

      const response = await bedrockClient.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));

      return res.status(200).json({ 
        reply: responseBody.content[0].text,
        model: modelId
      });

    } catch (error: any) {
      console.error("Bedrock Invoke Error:", error);
      return res.status(500).json({ error: "Failed to generate AI response from Bedrock", details: error.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
