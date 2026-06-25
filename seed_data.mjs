import fs from 'fs';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

const seedData = async () => {
  try {
    // Read the CSV file to get credentials
    const csvData = fs.readFileSync('nexusai_accessKeys.csv', 'utf8');
    const lines = csvData.trim().split('\n');
    const dataRow = lines[1];
    
    if (!dataRow) throw new Error('CSV file seems empty.');

    const parts = dataRow.split(',');
    const accessKeyId = parts[0]?.replace(/"/g, '').trim();
    const secretAccessKey = parts[1]?.replace(/"/g, '').trim();

    const client = new DynamoDBClient({
      region: 'us-east-1',
      credentials: { accessKeyId, secretAccessKey }
    });

    const leads = [
      { id: 'lead_1', name: 'Sarah Connor', company: 'Cyberdyne Systems', role: 'Director of AI', score: 98, capturedAt: new Date().toISOString() },
      { id: 'lead_2', name: 'Miles Dyson', company: 'Cyberdyne Systems', role: 'Lead Researcher', score: 92, capturedAt: new Date().toISOString() },
      { id: 'lead_3', name: 'Ellen Ripley', company: 'Weyland-Yutani', role: 'Warrant Officer', score: 85, capturedAt: new Date().toISOString() },
      { id: 'lead_4', name: 'David 8', company: 'Weyland Corp', role: 'Synthetics Engineer', score: 99, capturedAt: new Date().toISOString() }
    ];

    const events = [
      { id: 'event_1', title: 'AWS Serverless Keynote', date: '2026-07-15T10:00:00Z', location: 'Main Hall', type: 'Keynote', speaker: 'Dr. AWS', capacity: 5000 },
      { id: 'event_2', title: 'Enterprise AI Mixer', date: '2026-07-15T18:00:00Z', location: 'Expo Hall C', type: 'Networking', speaker: 'Nexus-AI Copilot', capacity: 1500 },
      { id: 'event_3', title: 'B2B SaaS Monetization', date: '2026-07-16T14:00:00Z', location: 'Room 404', type: 'Workshop', speaker: 'Sarah Connor', capacity: 200 }
    ];

    console.log('Seeding DynamoDB NexusLeads table...');

    for (const lead of leads) {
      await client.send(new PutCommand({
        TableName: 'NexusLeads',
        Item: lead
      }));
      console.log(`✅ Inserted Lead: ${lead.name}`);
    }

    console.log('Seeding DynamoDB NexusEvents table...');
    for (const evt of events) {
      await client.send(new PutCommand({
        TableName: 'NexusEvents',
        Item: evt
      }));
      console.log(`✅ Inserted Event: ${evt.title}`);
    }

    console.log('\n🎉 Successfully seeded DynamoDB with Leads and Events!');
  } catch (error) {
    console.error('Error seeding data:', error.message);
  }
};

seedData();
