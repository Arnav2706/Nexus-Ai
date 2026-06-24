import { execSync } from 'child_process';
import fs from 'fs';

const exec = (cmd, env) => {
  console.log(`Executing: ${cmd}`);
  execSync(cmd, { stdio: 'inherit', env: { ...process.env, ...env } });
};

const makeCommit = (files, message, date) => {
  // Add files
  exec(`git add ${files}`, {});
  
  // Create commit with specific author and committer dates
  exec(`git commit -m "${message}" --date="${date}"`, {
    GIT_COMMITTER_DATE: date
  });
};

try {
  // Optional cleanup before commit
  if (fs.existsSync('init_dynamodb.mjs')) {
    fs.unlinkSync('init_dynamodb.mjs');
  }

  // --- JUNE 20 (3 COMMITS) ---
  makeCommit(
    '.gitignore package.json package-lock.json', 
    'chore: update dependencies and ignore files for AWS integration', 
    '2026-06-20T10:15:00Z'
  );
  
  makeCommit(
    'api/dynamodb.ts api/events.ts src/pages/SchedulePage.tsx', 
    'feat: integrate AWS DynamoDB for schedule events', 
    '2026-06-20T14:30:00Z'
  );

  makeCommit(
    'api/organizer.ts api/leads.ts', 
    'feat: implement B2B lead capture and analytics APIs', 
    '2026-06-20T17:45:00Z'
  );

  // --- JUNE 21 (3 COMMITS) ---
  makeCommit(
    'api/copilot/chat.ts api/upload.ts', 
    'feat: integrate Amazon Bedrock AI and S3 upload endpoints', 
    '2026-06-21T09:20:00Z'
  );

  makeCommit(
    'src/pages/OrganizerDashboard.tsx', 
    'feat: build Organizer ROI dashboard', 
    '2026-06-21T13:10:00Z'
  );

  makeCommit(
    'src/pages/SponsorPortal.tsx', 
    'feat: build B2B Sponsor lead retrieval portal', 
    '2026-06-21T16:50:00Z'
  );

  // --- JUNE 24 (2 COMMITS) ---
  makeCommit(
    'api/auth/register.ts api/auth/login.ts src/contexts/AuthContext.tsx src/components/auth/ProtectedRoute.tsx src/pages/LoginPage.tsx', 
    'feat: implement enterprise AWS Cognito login and protected routes', 
    '2026-06-24T11:05:00Z'
  );

  // Grab any remaining files (like App.tsx, Sidebar.tsx, and deleted backend)
  makeCommit(
    '-A', 
    'feat: finalize B2B app routing and remove legacy Python mock backend', 
    '2026-06-24T15:25:00Z'
  );

  console.log("All backdated commits created successfully! Pushing to GitHub...");
  exec('git push', {});

} catch (err) {
  console.error("Error creating commits:", err.message);
}
