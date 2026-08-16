import https from 'https';
import { spawnSync } from 'child_process';

const credProcess = spawnSync('git', ['credential-manager', 'get'], {
  input: 'protocol=https\nhost=github.com\n\n',
  encoding: 'utf-8',
});
const tokenMatch = (credProcess.stdout || '').match(/password=(.+)/);
const token = tokenMatch ? tokenMatch[1].trim() : '';

const data = JSON.stringify({
  build_type: 'workflow'
});

const req = https.request({
  hostname: 'api.github.com',
  path: '/repos/abod6911/ueno-saryo/pages',
  method: 'PUT',
  headers: {
    'User-Agent': 'Node.js',
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  }
}, (res) => {
  let body = '';
  res.on('data', c => body += c);
  res.on('end', () => {
    console.log('GitHub Pages PUT status:', res.statusCode);
    console.log('Response:', body);
  });
});

req.on('error', (e) => console.error(e));
req.write(data);
req.end();
