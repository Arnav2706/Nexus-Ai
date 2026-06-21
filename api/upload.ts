import type { VercelRequest, VercelResponse } from "@vercel/node";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    try {
      const { filename, contentType } = req.body;

      if (!filename || !contentType) {
        return res.status(400).json({ error: "Filename and contentType are required" });
      }

      const bucketName = process.env.AWS_S3_BUCKET_NAME || "nexus-ai-uploads";
      const key = `uploads/${Date.now()}-${filename}`;

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        ContentType: contentType,
      });

      // Generate a pre-signed URL that expires in 5 minutes (300 seconds)
      const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });

      return res.status(200).json({ 
        uploadUrl: signedUrl,
        fileKey: key,
        fileUrl: `https://${bucketName}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${key}`
      });

    } catch (error: any) {
      console.error("S3 Presign Error:", error);
      return res.status(500).json({ error: "Failed to generate S3 upload URL", details: error.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
