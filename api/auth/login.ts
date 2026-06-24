import type { VercelRequest, VercelResponse } from "@vercel/node";
import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || "us-east-1",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }

      const clientId = process.env.COGNITO_CLIENT_ID;
      if (!clientId) {
        // Return mock success token if no Cognito setup yet
        console.warn("No COGNITO_CLIENT_ID found, returning mock success for login.");
        return res.status(200).json({ 
          token: "mock-jwt-token-12345",
          user: { email, role: "organizer" }
        });
      }

      const command = new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: clientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      });

      const response = await cognitoClient.send(command);
      
      if (response.AuthenticationResult) {
        return res.status(200).json({ 
          token: response.AuthenticationResult.AccessToken,
          idToken: response.AuthenticationResult.IdToken,
          refreshToken: response.AuthenticationResult.RefreshToken,
          user: { email }
        });
      } else {
        return res.status(401).json({ error: "Authentication failed. Additional challenge required." });
      }

    } catch (error: any) {
      console.error("Cognito Login Error:", error);
      return res.status(401).json({ error: error.message || "Invalid credentials." });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
