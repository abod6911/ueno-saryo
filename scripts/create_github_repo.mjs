import https from 'https';
import { execSync, spawnSync } from 'child_process';

const credProcess = spawnSync('git', ['credential-manager', 'get'], {
  input: 'protocol=https\nhost=github.com\n\n',
  encoding: 'utf-8',
});

const credOutput = credProcess.stdout || '';
const tokenMatch = credOutput.match(/password=(.+)/);
if (!tokenMatch) {
  console.error('Could not find GitHub token in output:', credOutput);
  process.exit(1);
}

const token = tokenMatch[1].trim();
console.log('Successfully retrieved GitHub token for abod6911.');

const data = JSON.stringify({
  name: 'ueno-saryo',
  description: 'Ueno Saryo (مختبرات الشاي) - Premium Japanese Tea Experience Website',
  private: false,
  auto_init: false,
});

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: '/user/repos',
  method: 'POST',
  headers: {
    'User-Agent': 'Node.js',
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(`GitHub API Status: ${res.statusCode}`);
    try {
      const json = JSON.parse(body);
      if (res.statusCode === 201) {
        console.log('🎉 Successfully created GitHub repository:', json.html_url);
      } else {
        console.log('GitHub API response message:', json.message);
      }

      // Execute git push
      console.log('Pushing local repository to GitHub...');
      const pushRes = execSync('git push -u origin main', { encoding: 'utf-8', stdio: 'inherit' });
      console.log('🎉 Push completed successfully!');
    } catch (e) {
      console.error('Error during execution:', e.message);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(data);
req.end();
