import { readFileSync } from 'fs';

const envFile = readFileSync('.env', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...val] = line.split('=');
  if (key && val) env[key.trim()] = val.join('=').trim();
});

const baseUrl = 'https://eqmegunsvpyemtbydlxc.supabase.co';
const key = env['VITE_SUPABASE_ANON_KEY'];

const headers = { 
  'Content-Type': 'application/json', 
  'apikey': key, 
  'Authorization': `Bearer ${key}` 
};

const tests = [
  { method: 'POST', url: `${baseUrl}/rest/v1/rpc/combined_report`, body: undefined },
  { method: 'POST', url: `${baseUrl}/rest/v1/rpc/combined_report`, body: JSON.stringify({}) },
  { method: 'GET', url: `${baseUrl}/rest/v1/rpc/combined_report`, body: undefined },
  { method: 'GET', url: `${baseUrl}/rest/v1/combined_report`, body: undefined },
  { method: 'GET', url: `${baseUrl}/rest/v1/combined_report?select=*`, body: undefined },
  { method: 'POST', url: `${baseUrl}/functions/v1/combined_report`, body: undefined }
];

async function runTests() {
  for (const t of tests) {
    try {
      const req = { method: t.method, headers };
      if (t.body) req.body = t.body;
      const res = await fetch(t.url, req);
      const text = await res.text();
      console.log(`[${t.method}] ${t.url} -> ${res.status}`);
      if (res.status === 200 || res.status === 201) {
        console.log(`SUCCESS! Data: ${text.slice(0, 200)}...`);
      }
    } catch (e) {
      console.log(`[${t.method}] ${t.url} -> ERROR: ${e.message}`);
    }
  }
}

runTests();
