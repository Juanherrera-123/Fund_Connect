const verifiedFunds = [
  {
    id: 'aurora-macro',
    name: 'Aurora Macro Opportunities',
    region: 'EU',
    strategy: 'Macro',
    riskProfile: 'Moderado',
    yearProfit: 9.4,
    maxDrawdown: 6.2,
    winRate: 58,
    volatility: 6.8,
    aum: '€85M',
    highlight: '+9.4% YTD',
    description: 'Estrategia macro discrecional con coberturas dinámicas y disciplina de riesgo diaria.',
    tags: ['Macro', 'Multi-asset', 'Europa'],
  },
  {
    id: 'summit-fx',
    name: 'Summit FX Systematic',
    region: 'US',
    strategy: 'FX',
    riskProfile: 'Conservador',
    yearProfit: 5.2,
    maxDrawdown: 3.4,
    winRate: 62,
    volatility: 4.1,
    aum: '$240M',
    highlight: '+5.2% YTD',
    description: 'Modelo cuantitativo FX con stops de VaR intradía y rebalanceo automático.',
    tags: ['FX', 'Sistemático', 'USD base'],
  },
  {
    id: 'helix-digital',
    name: 'Helix Digital Neutral',
    region: 'Global',
    strategy: 'Digital Assets',
    riskProfile: 'Moderado',
    yearProfit: 14.2,
    maxDrawdown: 9.8,
    winRate: 55,
    volatility: 9.9,
    aum: '$110M',
    highlight: '+14.2% YTD',
    description: 'Enfoque delta neutral con límites de exposición a contraparte y cobertura continua.',
    tags: ['Digital Assets', 'Neutral', 'Custodia institucional'],
  },
  {
    id: 'atlantic-credit',
    name: 'Atlantic Structured Credit',
    region: 'LATAM',
    strategy: 'Crédito',
    riskProfile: 'Moderado',
    yearProfit: 8.1,
    maxDrawdown: 7.4,
    winRate: 60,
    volatility: 5.5,
    aum: '$320M',
    highlight: '+8.1% YTD',
    description: 'Cartera de crédito estructurado con coberturas por tramos y límites de concentración.',
    tags: ['Crédito', 'Estructurado', 'LATAM'],
  },
  {
    id: 'latitude-multi',
    name: 'Latitude Multi-Strategy',
    region: 'Global',
    strategy: 'Multi-Strategy',
    riskProfile: 'Agresivo',
    yearProfit: 16.5,
    maxDrawdown: 12.1,
    winRate: 53,
    volatility: 11.3,
    aum: '$95M',
    highlight: '+16.5% YTD',
    description: 'Asignación táctica multi-estrategia con control de solapamiento y liquidez escalonada.',
    tags: ['Multi-Strategy', 'Táctico', 'Global'],
  },
];

let filteredFunds = [...verifiedFunds];
let selectedFund = null;

function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

function renderCarousel() {
  const carousel = document.getElementById('fundCarousel');
  if (!carousel) return;

  carousel.innerHTML = '';

  if (!filteredFunds.length) {
    carousel.innerHTML = '<div class="empty-state">No hay fondos con estos criterios.</div>';
    renderDetail(null);
    return;
  }

  filteredFunds.forEach((fund) => {
    const card = document.createElement('button');
    card.className = `fund-pill ${selectedFund?.id === fund.id ? 'active' : ''}`;
    card.setAttribute('type', 'button');
    card.setAttribute('aria-label', `Ver detalle de ${fund.name}`);
    card.innerHTML = `
      <div class="fund-pill__top">
        <div>
          <p class="fund-name">${fund.name}</p>
          <div class="fund-meta">
            <span class="badge success">Verificado</span>
            <span class="tag">${fund.strategy}</span>
            <span class="tag subtle">${fund.region}</span>
          </div>
        </div>
        <div class="fund-highlight">${fund.highlight}</div>
      </div>
      <div class="fund-pill__meta">
        <span>${fund.strategy}</span>
        <span class="divider">•</span>
        <span>${fund.region}</span>
        <span class="divider">•</span>
        <span>${fund.riskProfile}</span>
      </div>
    `;

    card.addEventListener('click', () => setSelectedFund(fund));
    carousel.appendChild(card);
  });

  if (!selectedFund || !filteredFunds.find((fund) => fund.id === selectedFund.id)) {
    setSelectedFund(filteredFunds[0]);
  }
}

function renderDetail(fund) {
  const detailCard = document.getElementById('detailCard');
  if (!detailCard) return;

  if (!fund) {
    detailCard.innerHTML = '<div class="empty-state">Selecciona un fondo para ver el detalle.</div>';
    selectedFund = null;
    return;
  }

  selectedFund = fund;

  const stats = [
    { label: 'Year Total Profit', value: formatPercent(fund.yearProfit) },
    { label: 'Max Drawdown', value: `-${fund.maxDrawdown.toFixed(1)}%` },
    { label: 'Win Rate', value: `${fund.winRate}%` },
    { label: 'Volatilidad', value: `${fund.volatility.toFixed(1)}%` },
    { label: 'AUM aprox.', value: fund.aum || '—' },
  ];

  const tags = fund.tags
    .map((tag) => `<span class="tag subtle">${tag}</span>`)
    .join('');

  const statsGrid = stats
    .map(
      (stat) => `
        <div class="stat-tile">
          <p class="label">${stat.label}</p>
          <p class="value">${stat.value}</p>
        </div>
      `,
    )
    .join('');

  detailCard.innerHTML = `
    <div class="detail-columns">
      <div>
        <p class="eyebrow">Fondo seleccionado</p>
        <h3 class="detail-title">${fund.name}</h3>
        <p class="muted">${fund.description}</p>
        <div class="tag-row">${tags}</div>
      </div>
      <div class="stats-grid">${statsGrid}</div>
    </div>
  `;

  document.querySelectorAll('.fund-pill').forEach((pill) => {
    pill.classList.toggle('active', pill.querySelector('.fund-name').textContent === fund.name);
  });
}

function parseValue(inputId) {
  const value = document.getElementById(inputId)?.value;
  const numeric = value ? parseFloat(value) : null;
  return Number.isFinite(numeric) ? numeric : null;
}

function applyFilters() {
  const yearProfitValue = parseValue('yearProfit');
  const yearProfitCondition = document.getElementById('yearProfitCondition')?.value || 'above';
  const drawdownValue = parseValue('drawdown');
  const drawdownCondition = document.getElementById('drawdownCondition')?.value || 'below';
  const riskLevel = document.getElementById('riskLevel')?.value || '';
  const winRateValue = parseValue('winRate');
  const winRateCondition = document.getElementById('winRateCondition')?.value || 'above';

  filteredFunds = verifiedFunds.filter((fund) => {
    const matchesProfit =
      yearProfitValue === null ||
      (yearProfitCondition === 'above' ? fund.yearProfit >= yearProfitValue : fund.yearProfit <= yearProfitValue);

    const matchesDrawdown =
      drawdownValue === null ||
      (drawdownCondition === 'below' ? fund.maxDrawdown <= drawdownValue : fund.maxDrawdown >= drawdownValue);

    const matchesRisk = !riskLevel || fund.riskProfile === riskLevel;

    const matchesWinRate =
      winRateValue === null ||
      (winRateCondition === 'above' ? fund.winRate >= winRateValue : fund.winRate <= winRateValue);

    return matchesProfit && matchesDrawdown && matchesRisk && matchesWinRate;
  });

  renderCarousel();
  renderDetail(filteredFunds[0]);
}

function resetFilters() {
  document.getElementById('yearProfit').value = '';
  document.getElementById('yearProfitCondition').value = 'above';
  document.getElementById('drawdown').value = '';
  document.getElementById('drawdownCondition').value = 'below';
  document.getElementById('riskLevel').value = '';
  document.getElementById('winRate').value = '';
  document.getElementById('winRateCondition').value = 'above';

  filteredFunds = [...verifiedFunds];
  setSelectedFund(filteredFunds[0]);
  renderCarousel();
}

function setSelectedFund(fund) {
  renderDetail(fund);
  document.querySelectorAll('.fund-pill').forEach((pill) => {
    const name = pill.querySelector('.fund-name')?.textContent;
    pill.classList.toggle('active', fund ? name === fund.name : false);
  });
}

function attachEvents() {
  document.getElementById('applyFilters')?.addEventListener('click', applyFilters);
  document.getElementById('resetFilters')?.addEventListener('click', resetFilters);
  document.getElementById('ctaInfo')?.addEventListener('click', () => {
    window.location.href = 'index.html#contact';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  setSelectedFund(verifiedFunds[0]);
  renderCarousel();
  attachEvents();
  renderDetail(selectedFund);
});
