const apiBase = `${window.location.origin.replace(/\/$/, '')}/api`;

async function fetchJson(path) {
  const response = await fetch(`${apiBase}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

function renderFunds(funds) {
  const grid = document.getElementById('fundGrid');
  if (!grid) return;
  grid.innerHTML = '';

  funds.forEach((fund) => {
    const card = document.createElement('article');
    card.className = 'fund-card';
    card.innerHTML = `
      <header>
        <div>
          <div class="fund-name">${fund.name}</div>
          <div class="fund-meta">
            <span class="tag">${fund.strategy}</span>
            <span class="tag">${fund.domicile}</span>
          </div>
        </div>
        <span class="badge">${fund.status}</span>
      </header>
      <p class="small">${fund.summary}</p>
      <div class="stat-row"><span>AUM</span><strong>${fund.aum}</strong></div>
      <div class="stat-row"><span>YTD</span><strong>${fund.performance}</strong></div>
      <div class="stat-row"><span>Risk</span><strong>${fund.risk}</strong></div>
      <div class="pill-row">
        ${fund.highlights.map((item) => `<span class="pill">${item}</span>`).join('')}
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderInsights(insights) {
  const list = document.getElementById('insightList');
  if (!list) return;
  list.innerHTML = '';

  insights.forEach((insight) => {
    const card = document.createElement('article');
    card.className = 'insight-card';
    card.innerHTML = `
      <header>
        <span class="insight-title">${insight.title}</span>
        <span class="timestamp">${insight.timestamp}</span>
      </header>
      <p class="small">${insight.summary}</p>
    `;
    list.appendChild(card);
  });
}

async function loadPageData() {
  try {
    const [funds, insights] = await Promise.all([
      fetchJson('/funds'),
      fetchJson('/insights'),
    ]);
    renderFunds(funds);
    renderInsights(insights);
  } catch (error) {
    console.error(error);
    const grid = document.getElementById('fundGrid');
    const list = document.getElementById('insightList');
    if (grid) grid.innerHTML = '<p class="loading">Unable to load funds. Start the backend server.</p>';
    if (list) list.innerHTML = '<p class="loading">Unable to load insights. Start the backend server.</p>';
  }
}

function attachContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = 'Sending...';

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${apiBase}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      status.textContent = 'We received your request. Our team will respond shortly.';
      form.reset();
    } catch (error) {
      console.error(error);
      status.textContent = 'Unable to submit right now. Please confirm the backend is running.';
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  loadPageData();
  attachContactForm();
});
