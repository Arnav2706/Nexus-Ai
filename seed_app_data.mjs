import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import fs from 'fs';

// Parse credentials
const csvData = fs.readFileSync('nexusai_accessKeys.csv', 'utf8');
const lines = csvData.trim().split('\n');
const headers = lines[0].split(',');
const values = lines[1].split(',');

const creds = {};
headers.forEach((h, i) => {
  creds[h.trim()] = values[i].trim();
});

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: creds['Access key ID'],
    secretAccessKey: creds['Secret access key']
  }
});

const appData = {
  network_matches: [
    { id: 1, name: 'Sarah Chen', role: 'Founder at AI Startup', score: 92, reason: 'Both building AI products and interested in healthcare applications.', skills: ['React', 'Python', 'LLMs'], status: 'online' },
    { id: 2, name: 'David Miller', role: 'Staff Engineer', score: 85, reason: 'Shared interest in performance optimization and open source.', skills: ['Rust', 'WASM', 'Go'], status: 'offline' },
    { id: 3, name: 'Elena Rodriguez', role: 'Product Designer', score: 78, reason: 'Looking for technical co-founders in your exact stack.', skills: ['Figma', 'UI/UX', 'Framer'], status: 'online' }
  ],
  map_hotspots: [
    { id: 1, name: 'Main Stage', x: 200, y: 150, intensity: 'high', label: 'Keynote' },
    { id: 2, name: 'Networking Lounge', x: 400, y: 300, intensity: 'medium', label: 'Crowded' },
    { id: 3, name: 'Workshop Room A', x: 150, y: 450, intensity: 'low', label: 'Available' },
    { id: 4, name: 'Startup Alley', x: 500, y: 100, intensity: 'high', label: 'Trending' }
  ],
  graph_nodes: [
    { id: 'llm', label: 'LLMs', x: 50, y: 40, type: 'topic', color: '#00ffff' },
    { id: 'startups', label: 'Startups', x: 75, y: 30, type: 'topic', color: '#ff00ff' },
    { id: 'sarah', label: 'Sarah Chen', x: 65, y: 60, type: 'person', color: '#000000' },
    { id: 'healthcare', label: 'Healthcare AI', x: 30, y: 65, type: 'topic', color: '#a9f131' },
    { id: 'david', label: 'David Miller', x: 80, y: 70, type: 'person', color: '#000000' },
    { id: 'wasm', label: 'WebAssembly', x: 90, y: 45, type: 'topic', color: '#00ffff' },
    { id: 'workshop', label: 'AI Workshop', x: 45, y: 25, type: 'session', color: '#ff00ff' },
    { id: 'you', label: 'You', x: 55, y: 52, type: 'self', color: '#a9f131' }
  ],
  graph_edges: [
    ['you', 'llm'], ['you', 'startups'], ['you', 'sarah'], ['you', 'workshop'],
    ['sarah', 'llm'], ['sarah', 'healthcare'], ['david', 'wasm'], ['you', 'david'],
    ['workshop', 'llm']
  ],
  insights_live: [
    { id: 1, type: 'trend', message: 'Generative AI workshop is trending. 150+ mentions in last hour.', time: '2m ago' },
    { id: 2, type: 'alert', message: 'Room B is nearing capacity for the Design Systems talk.', time: '5m ago' },
    { id: 3, type: 'feedback', message: 'Cybersecurity keynote receiving excellent feedback (4.9/5).', time: '12m ago' }
  ],
  insights_engagement: [
    { time: '09:00', value: 20 },
    { time: '10:00', value: 45 },
    { time: '11:00', value: 85 },
    { time: '12:00', value: 60 },
    { time: '13:00', value: 95 },
    { time: '14:00', value: 120 }
  ],
  career_opportunities: [
    { id: 1, company: 'DeepMind', role: 'Research Scientist', match: 94, type: 'Research', contact: 'Dr. Elena Sato', status: 'Active' },
    { id: 2, company: 'Andreessen Horowitz', role: 'AI Portfolio Advisor', match: 88, type: 'Investing', contact: 'Mark Chen', status: 'Warm Lead' },
    { id: 3, company: 'Vercel', role: 'Staff Engineer', match: 82, type: 'Engineering', contact: 'Sarah Kim', status: 'Active' },
    { id: 4, company: 'Hugging Face', role: 'Developer Advocate', match: 76, type: 'DevRel', contact: 'Tom Wright', status: 'Active' }
  ],
  wow_features: [
    { id: 1, icon: 'Ghost', title: 'AI Twin', subtitle: "Missing a session? Your digital twin attends for you.", description: "Your AI clone attends sessions you can't make it to — generating notes, summaries, and actionable follow-ups.", color: 'bg-[#a020f0]', badge: 'Experimental', badgeColor: 'bg-white text-black border-black', status: 'LIVE' },
    { id: 2, icon: 'Shuffle', title: 'Serendipity Engine', subtitle: 'Discover the unexpected connection you never knew you needed.', description: 'Hidden opportunities surface through probabilistic graph traversal — find the speaker you never planned to meet.', color: 'bg-[#ff00ff]', badge: 'AI Powered', badgeColor: 'bg-white text-black border-black', status: 'LIVE' },
    { id: 3, icon: 'Rocket', title: 'Startup Finder', subtitle: 'Connect founders with investors through AI matchmaking.', description: 'Founders get matched with investors based on stage, sector, and thesis alignment. Deals happen here.', color: 'bg-[#a9f131]', badge: 'Beta', badgeColor: 'bg-white text-black border-black', status: 'BETA' },
    { id: 4, icon: 'FlaskConical', title: 'Research Matchmaker', subtitle: 'Find researchers working on exactly your problem.', description: 'Semantic embeddings cluster researchers by topic. Discover colleagues working on the same challenges.', color: 'bg-[#00ffff]', badge: 'New', badgeColor: 'bg-white text-black border-black', status: 'NEW' }
  ],
  integrations_apps: [
    { id: 'linkedin', name: 'LinkedIn', desc: 'Sync professional profile and connections', icon: 'Users', status: 'Connected', color: 'bg-[#0077b5]' },
    { id: 'github', name: 'GitHub', desc: 'Import repositories for tech matching', icon: 'Code', status: 'Connected', color: 'bg-[#333]' },
    { id: 'slack', name: 'Slack', desc: 'Receive real-time event notifications', icon: 'MessageCircle', status: 'Available', color: 'bg-[#e01e5a]' },
    { id: 'salesforce', name: 'Salesforce CRM', desc: 'Export leads and warm connections', icon: 'Database', status: 'Available', color: 'bg-[#00a1e0]' }
  ],
  integrations_models: [
    { id: 'gpt4', name: 'Nexus Core (GPT-4)', desc: 'Primary reasoning engine', type: 'Cloud', active: true },
    { id: 'claude', name: 'Nexus Context (Claude 3)', desc: 'Long-context document analysis', type: 'Cloud', active: false },
    { id: 'llama', name: 'Nexus Local (Llama 3)', desc: 'On-device privacy-first mode', type: 'Local', active: false },
    { id: 'custom', name: 'Custom Enterprise Model', desc: 'Bring your own fine-tuned model', type: 'Enterprise', active: false }
  ],
  pulse_trending: [
    { topic: 'Generative AI', mentions: 340, delta: '+22%', hot: true },
    { topic: 'LLM Fine-tuning', mentions: 210, delta: '+18%', hot: true },
    { topic: 'Developer Experience', mentions: 132, delta: '+14%', hot: false }
  ],
  pulse_scores: [72, 84, 95, 88, 91, 78, 96],
  pulse_categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  achievements_badges: [
    { id: 1, icon: 'Star', name: 'Early Bird', desc: 'Checked in on Day 1', earned: true, color: 'bg-primary' },
    { id: 2, icon: 'Users', name: 'Connector', desc: 'Met 5+ matches', earned: true, color: 'bg-[#00ffff]' },
    { id: 3, icon: 'BookOpen', name: 'Knowledge Seeker', desc: 'Attended 10 sessions', earned: false, color: 'bg-[#a020f0]', progress: 70 },
    { id: 4, icon: 'Zap', name: 'Speed Networker', desc: 'Sent 20 connection requests', earned: false, color: 'bg-[#ff00ff]', progress: 45 },
    { id: 5, icon: 'Trophy', name: 'Top Contributor', desc: 'Left 15+ session reviews', earned: false, color: 'bg-primary', progress: 20 },
    { id: 6, icon: 'Award', name: 'VIP Access', desc: 'Attended a private workshop', earned: true, color: 'bg-[#ff00ff]' }
  ]
};

async function seedData() {
  console.log("Seeding NexusAppData table...");
  for (const [key, value] of Object.entries(appData)) {
    try {
      await client.send(new PutItemCommand({
        TableName: "NexusAppData",
        Item: {
          "dataType": { S: key },
          "data": { S: JSON.stringify(value) }
        }
      }));
      console.log(`✅ Seeded ${key}`);
    } catch (err) {
      console.error(`❌ Failed to seed ${key}:`, err);
    }
  }
  console.log("✅ All data seeded!");
}

seedData();
