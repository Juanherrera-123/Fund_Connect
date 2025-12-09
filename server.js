const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const PORT = process.env.PORT || 4000;
const publicDir = path.join(__dirname, 'public');

const funds = [
  {
    id: 'aurora-macro',
    name: 'Aurora Macro Opportunities',
    strategy: 'Global Macro',
    domicile: 'Luxembourg',
    status: 'Open',
    aum: '$650M',
    performance: '+12.4%',
    risk: 'Controlled Vol',
    summary: 'Systematic macro with discretionary overlays across rates, FX, and commodities.',
    highlights: ['Daily transparency', 'UCITS wrapper', '15+ yrs team'],
  },
  {
    id: 'summit-credit',
    name: 'Summit Structured Credit',
    strategy: 'Credit',
    domicile: 'Cayman',
    status: 'Waitlist',
    aum: '$420M',
    performance: '+9.1%',
    risk: 'Low-Medium',
    summary: 'Capital solutions across CLO equity/mezzanine with active risk corridors.',
    highlights: ['Verified trustee data', 'Quarterly liquidity', 'IC-ready reports'],
  },
  {
    id: 'quant-digital',
    name: 'Helix Quant Digital',
    strategy: 'Digital Assets',
    domicile: 'BVI',
    status: 'Open',
    aum: '$180M',
    performance: '+22.3%',
    risk: 'Medium',
    summary: 'Market-neutral digital asset strategy with exchange and custody diversification.',
    highlights: ['24/7 monitoring', 'Counterparty screens', 'SOC2 aligned'],
  },
];

const insights = [
  {
    id: 1,
    title: 'Allocator interest pivoting to hybrid credit sleeves',
    timestamp: 'Last 24h',
    summary: 'Investment committees are prioritizing credit managers with flexible sleeves that can toggle between mezzanine and special situations.',
  },
  {
    id: 2,
    title: 'Operational due diligence clocks trending faster',
    timestamp: 'This week',
    summary: 'Average ODD cycle times have dropped 18% month-over-month as data rooms ship pre-validated compliance artifacts.',
  },
  {
    id: 3,
    title: 'Digital asset volatility compression benefiting neutral books',
    timestamp: 'This week',
    summary: 'Neutral strategies with exchange dispersion are outperforming directional peers by 240 bps on a volatility-adjusted basis.',
  },
];

const contactRequests = [];

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify(payload));
}

function serveStatic(res, pathname) {
  const filePath = path.join(publicDir, pathname === '/' ? 'index.html' : pathname);
  const normalizedPath = path.normalize(filePath);

  if (!normalizedPath.startsWith(publicDir)) {
    return sendJson(res, 403, { error: 'Forbidden' });
  }

  fs.readFile(normalizedPath, (err, data) => {
    if (err) {
      fs.readFile(path.join(publicDir, 'index.html'), (fallbackErr, fallbackData) => {
        if (fallbackErr) {
          res.writeHead(500);
          return res.end('Internal Server Error');
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fallbackData);
      });
      return;
    }

    const ext = path.extname(normalizedPath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(data);
  });
}

function handleContact(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
    if (body.length > 1e6) {
      req.connection.destroy();
    }
  });

  req.on('end', () => {
    let payload = {};
    try {
      payload = JSON.parse(body || '{}');
    } catch (error) {
      return sendJson(res, 400, { error: 'Invalid JSON payload.' });
    }

    const { name, email, role, message } = payload;
    if (!name || !email || !role) {
      return sendJson(res, 400, { error: 'Name, email, and role are required.' });
    }

    const submission = {
      id: contactRequests.length + 1,
      name,
      email,
      role,
      message: message || '',
      receivedAt: new Date().toISOString(),
    };

    contactRequests.push(submission);
    sendJson(res, 201, { ok: true });
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;

  if (req.method === 'GET' && pathname === '/api/health') {
    return sendJson(res, 200, { status: 'ok', funds: funds.length, insights: insights.length });
  }

  if (req.method === 'GET' && pathname === '/api/funds') {
    return sendJson(res, 200, funds);
  }

  if (req.method === 'GET' && pathname === '/api/insights') {
    return sendJson(res, 200, insights);
  }

  if (req.method === 'OPTIONS' && pathname === '/api/contact') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  if (req.method === 'POST' && pathname === '/api/contact') {
    return handleContact(req, res);
  }

  serveStatic(res, pathname);
});

server.listen(PORT, () => {
  console.log(`Fund Connect server running on http://localhost:${PORT}`);
});
