import type { VercelRequest, VercelResponse } from "@vercel/node";
import { CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || "us-east-1",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ error: "Email, password, and name are required." });
      }

      const clientId = process.env.COGNITO_CLIENT_ID;
      if (!clientId) {
        // Return mock success if no Cognito setup yet
        console.warn("No COGNITO_CLIENT_ID found, returning mock success for registration.");
        return res.status(200).json({ message: "Mock registration successful" });
      }

      const command = new SignUpCommand({
        ClientId: clientId,
        Username: email,
        Password: password,
        UserAttributes: [
          {
            Name: "email",
            Value: email,
          },
          {
            Name: "name",
            Value: name,
          }
        ],
      });

      const response = await cognitoClient.send(command);
      
      return res.status(200).json({ 
        message: "Registration successful. Please check your email to verify your account.",
        userSub: response.UserSub
      });

    } catch (error: any) {
      console.error("Cognito Registration Error:", error);
      return res.status(500).json({ error: error.message || "Failed to register user." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
