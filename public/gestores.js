const verifiedFunds = [
  {
    id: 'aurora-macro',
    name: 'Aurora Macro Opportunities',
    region: 'EU',
    strategy: 'Macro',
    riskProfile: 'Moderado',
    drawdownBucket: '<10%',
    aumBucket: '+25M',
    trackRecord: '+36 meses',
    ytd: '+9.4%',
    drawdown: '-6.2%',
    volatility: '6.8%',
    aum: '€85M',
    riskScore: 42,
    reporting: 'Mensual',
    custody: 'BNP Paribas • CSSF',
    access: 'Mínimo €1M • Lock-up 6 meses',
    riskPolicy:
      'Cobertura dinámica con límites diarios y recortes semanales cuando la volatilidad supera el 12%.',
    performance: ['+0.8%', '+1.1%', '+0.4%', '+1.9%', '+1.2%', '+0.6%'],
  },
  {
    id: 'summit-fx',
    name: 'Summit FX Systematic',
    region: 'US',
    strategy: 'FX',
    riskProfile: 'Conservador',
    drawdownBucket: '<5%',
    aumBucket: '+100M',
    trackRecord: '+24 meses',
    ytd: '+5.2%',
    drawdown: '-3.4%',
    volatility: '4.1%',
    aum: '$240M',
    riskScore: 28,
    reporting: 'Mensual',
    custody: 'State Street • CFTC',
    access: 'Mínimo $5M • Liquidez mensual',
    riskPolicy:
      'Modelo cuantitativo con stops de VaR intradía y rebalanceo automático ante gaps superiores al 1.2%.',
    performance: ['+0.4%', '+0.6%', '+0.2%', '+0.8%', '+0.7%', '+0.5%'],
  },
  {
    id: 'helix-digital',
    name: 'Helix Digital Neutral',
    region: 'Global',
    strategy: 'Digital Assets',
    riskProfile: 'Moderado',
    drawdownBucket: '<15%',
    aumBucket: '+25M',
    trackRecord: '+24 meses',
    ytd: '+14.2%',
    drawdown: '-9.8%',
    volatility: '9.9%',
    aum: '$110M',
    riskScore: 58,
    reporting: 'Semanal',
    custody: 'Coinbase Custody • SOC2',
    access: 'Mínimo $1M • Lock-up 3 meses',
    riskPolicy:
      'Coberturas delta-neutrales con límites de exposición a exchanges y contraparte multi-firma.',
    performance: ['+1.2%', '+2.3%', '+0.9%', '+3.1%', '+2.7%', '+1.1%'],
  },
  {
    id: 'atlantic-credit',
    name: 'Atlantic Structured Credit',
    region: 'LATAM',
    strategy: 'Crédito',
    riskProfile: 'Moderado',
    drawdownBucket: '<10%',
    aumBucket: '+100M',
    trackRecord: '+36 meses',
    ytd: '+8.1%',
    drawdown: '-7.4%',
    volatility: '5.5%',
    aum: '$320M',
    riskScore: 45,
    reporting: 'Trimestral',
    custody: 'Citi • Regulado CNV',
    access: 'Mínimo $10M • Liquidez trimestral',
    riskPolicy:
      'Cartera con coberturas por tramos y límites de concentración por emisor y jurisdicción.',
    performance: ['+0.7%', '+1.3%', '+0.5%', '+1.6%', '+1.4%', '+0.9%'],
  },
  {
    id: 'latitude-multi',
    name: 'Latitude Multi-Strategy',
    region: 'Global',
    strategy: 'Multi-Strategy',
    riskProfile: 'Agresivo',
    drawdownBucket: '<15%',
    aumBucket: '+25M',
    trackRecord: '+12 meses',
    ytd: '+16.5%',
    drawdown: '-12.1%',
    volatility: '11.3%',
    aum: '$95M',
    riskScore: 67,
    reporting: 'Mensual',
    custody: 'Northern Trust • FCA',
    access: 'Mínimo $2M • Lock-up 9 meses',
    riskPolicy:
      'Asignación táctica con límites por bucket y fricciones controladas para evitar solapamiento de riesgos.',
    performance: ['+1.4%', '+2.1%', '+1.2%', '+3.4%', '+2.9%', '+1.8%'],
  },
];

const filterState = {
  strategy: new Set(),
  risk: new Set(),
  drawdown: new Set(),
  aum: new Set(),
  track: new Set(),
};

const comparisonSelection = new Set();

function toggleFilter(button, group) {
  const value = button.dataset.value;
  if (filterState[group].has(value)) {
    filterState[group].delete(value);
    button.classList.remove('active');
  } else {
    filterState[group].add(value);
    button.classList.add('active');
  }
  renderManagers();
}

function fundMatchesFilters(fund) {
  const checks = [
    !filterState.strategy.size || filterState.strategy.has(fund.strategy),
    !filterState.risk.size || filterState.risk.has(fund.riskProfile),
    !filterState.drawdown.size || filterState.drawdown.has(fund.drawdownBucket),
    !filterState.aum.size || filterState.aum.has(fund.aumBucket),
    !filterState.track.size || filterState.track.has(fund.trackRecord),
  ];
  return checks.every(Boolean);
}

function renderRiskBar(score) {
  return `<div class="risk-bar"><span style="width:${score}%"></span></div>`;
}

function renderManagerCard(fund) {
  const card = document.createElement('article');
  card.className = 'fund-card manager-card';

  const isChecked = comparisonSelection.has(fund.id) ? 'checked' : '';

  card.innerHTML = `
    <header class="manager-card__header">
      <div>
        <div class="fund-name">${fund.name}</div>
        <div class="fund-meta">
          <span class="badge success">✔ Verificado</span>
          <span class="tag">${fund.region}</span>
          <span class="tag subtle">${fund.strategy}</span>
        </div>
      </div>
      <label class="compare-toggle">
        <input type="checkbox" data-compare="${fund.id}" ${isChecked} aria-label="Comparar ${fund.name}" />
        <span>Comparar</span>
      </label>
    </header>
    <div class="metrics-grid">
      <div class="metric-tile">
        <p class="label">Rentabilidad YTD</p>
        <p class="value positive">${fund.ytd}</p>
      </div>
      <div class="metric-tile">
        <p class="label">Máx. Drawdown</p>
        <p class="value">${fund.drawdown}</p>
      </div>
      <div class="metric-tile">
        <p class="label">Volatilidad</p>
        <p class="value">${fund.volatility}</p>
      </div>
      <div class="metric-tile">
        <p class="label">AUM gestionado</p>
        <p class="value">${fund.aum}</p>
      </div>
    </div>
    <div class="risk-row">
      <div>
        <p class="label">Perfil de riesgo</p>
        <p class="value">${fund.riskProfile}</p>
      </div>
      ${renderRiskBar(fund.riskScore)}
    </div>
    <div class="card-actions">
      <button class="btn btn-primary btn-compact" data-details="${fund.id}">Ver detalles</button>
      <button class="btn btn-secondary btn-compact" data-report="${fund.id}">Ver reporte</button>
      <button class="btn btn-secondary btn-compact" data-advisory="${fund.id}">Solicitar asesoría</button>
    </div>
  `;
  return card;
}

function renderManagers() {
  const grid = document.getElementById('managerGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = verifiedFunds.filter(fundMatchesFilters);

  if (!filtered.length) {
    grid.innerHTML = '<p class="loading">No hay gestores con esos criterios.</p>';
    return;
  }

  filtered.forEach((fund) => grid.appendChild(renderManagerCard(fund)));
  attachCardEvents();
}

function attachFilterEvents() {
  document.querySelectorAll('.filter-group').forEach((group) => {
    const groupName = group.dataset.filterGroup;
    group.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => toggleFilter(chip, groupName));
    });
  });
}

function attachCardEvents() {
  document.querySelectorAll('[data-details]').forEach((button) => {
    button.addEventListener('click', () => openDetail(button.dataset.details));
  });

  document.querySelectorAll('[data-report]').forEach((button) => {
    button.addEventListener('click', () => openDetail(button.dataset.report));
  });

  document.querySelectorAll('[data-advisory]').forEach((button) => {
    button.addEventListener('click', () => openDetail(button.dataset.advisory));
  });

  document.querySelectorAll('[data-compare]').forEach((checkbox) => {
    checkbox.addEventListener('change', (event) => toggleComparison(event.target.dataset.compare, event.target.checked));
  });
}

function renderComparison() {
  const panel = document.getElementById('comparisonBody');
  const headerButton = document.getElementById('resetComparison');
  if (!panel) return;

  if (!comparisonSelection.size) {
    panel.innerHTML = '<p class="muted">Marca “Comparar” en los fondos para visualizar diferencias clave.</p>';
    headerButton.disabled = true;
    headerButton.classList.add('disabled');
    return;
  }

  headerButton.disabled = false;
  headerButton.classList.remove('disabled');

  const selectedFunds = verifiedFunds.filter((fund) => comparisonSelection.has(fund.id));
  const rows = selectedFunds
    .map(
      (fund) => `
        <div class="comparison-row">
          <div>
            <p class="label">${fund.name}</p>
            <p class="muted small">${fund.strategy} • ${fund.region}</p>
          </div>
          <div class="comparison-metric"><span class="label">YTD</span><strong>${fund.ytd}</strong></div>
          <div class="comparison-metric"><span class="label">Drawdown</span><strong>${fund.drawdown}</strong></div>
          <div class="comparison-metric"><span class="label">Volatilidad</span><strong>${fund.volatility}</strong></div>
          <div class="comparison-metric"><span class="label">AUM</span><strong>${fund.aum}</strong></div>
        </div>
      `
    )
    .join('');

  panel.innerHTML = `
    <div class="comparison-grid">${rows}</div>
  `;
}

function toggleComparison(fundId, checked) {
  if (checked) {
    if (comparisonSelection.size >= 3) {
      alert('Solo puedes comparar hasta 3 fondos a la vez.');
      const checkbox = document.querySelector(`input[data-compare="${fundId}"]`);
      if (checkbox) checkbox.checked = false;
      return;
    }
    comparisonSelection.add(fundId);
  } else {
    comparisonSelection.delete(fundId);
  }
  renderComparison();
}

function openDetail(fundId) {
  const modal = document.getElementById('fundDetailModal');
  const fund = verifiedFunds.find((item) => item.id === fundId);
  if (!modal || !fund) return;

  document.getElementById('modalRegion').textContent = `${fund.region} • ${fund.reporting}`;
  document.getElementById('modalTitle').textContent = fund.name;
  document.getElementById('modalStrategy').textContent = `${fund.strategy} | ${fund.riskProfile}`;

  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  const tableRows = months
    .map(
      (month, index) => `
        <tr>
          <td>${month}</td>
          <td>${fund.performance[index]}</td>
        </tr>
      `
    )
    .join('');

  document.getElementById('modalBody').innerHTML = `
    <div class="detail-grid">
      <div>
        <p class="label">Curva de equity (placeholder)</p>
        <div class="placeholder-chart" role="img" aria-label="Curva de equity placeholder">
          <div class="placeholder-bars">
            <span style="height: 40%"></span>
            <span style="height: 60%"></span>
            <span style="height: 75%"></span>
            <span style="height: 55%"></span>
            <span style="height: 80%"></span>
          </div>
        </div>
      </div>
      <div>
        <p class="label">Desempeño mensual</p>
        <table class="performance-table">
          <thead>
            <tr><th>Mes</th><th>Retorno</th></tr>
          </thead>
          <tbody>${tableRows}</tbody>
        </table>
      </div>
    </div>
    <div class="detail-meta">
      <div>
        <p class="label">Política de riesgo</p>
        <p class="muted">${fund.riskPolicy}</p>
      </div>
      <div class="detail-columns">
        <div>
          <p class="label">Custodia / Broker / Regulación</p>
          <p class="value">${fund.custody}</p>
        </div>
        <div>
          <p class="label">Frecuencia de reporte</p>
          <p class="value">${fund.reporting}</p>
        </div>
        <div>
          <p class="label">Condiciones de acceso</p>
          <p class="value">${fund.access}</p>
        </div>
      </div>
    </div>
  `;

  modal.removeAttribute('aria-hidden');
  modal.classList.add('open');
}

function closeDetail() {
  const modal = document.getElementById('fundDetailModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function attachModalEvents() {
  const modal = document.getElementById('fundDetailModal');
  const close = document.getElementById('closeModal');
  if (!modal || !close) return;

  close.addEventListener('click', closeDetail);
  modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-backdrop')) {
      closeDetail();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeDetail();
    }
  });
}

function attachFiltersToggle() {
  const toggle = document.getElementById('filtersToggle');
  const grid = document.getElementById('filtersGrid');
  if (!toggle || !grid) return;

  toggle.addEventListener('click', () => {
    const isHidden = grid.classList.toggle('collapsed');
    toggle.textContent = isHidden ? 'Mostrar' : 'Ocultar';
    toggle.setAttribute('aria-expanded', String(!isHidden));
  });
}

function attachResetComparison() {
  const reset = document.getElementById('resetComparison');
  if (!reset) return;
  reset.addEventListener('click', () => {
    comparisonSelection.clear();
    document.querySelectorAll('[data-compare]').forEach((checkbox) => {
      checkbox.checked = false;
    });
    renderComparison();
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderManagers();
  attachFilterEvents();
  attachModalEvents();
  attachFiltersToggle();
  attachResetComparison();
  renderComparison();
});
