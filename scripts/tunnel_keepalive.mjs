import https from 'https';

const url = 'https://rehabilitation-insulation-joins-tune.trycloudflare.com';

function ping() {
  https.get(url, (res) => {
    // Keep connection alive
  }).on('error', () => {});
}

// Ping every 25 seconds
setInterval(ping, 25000);
ping();
