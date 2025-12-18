const verifiedFunds = [
  {
    id: 'brenna-funding',
    name: 'Brenna Funding',
    country: 'Portugal',
    logoLabel: 'BF',
    region: 'Europa',
    strategy: 'Private Credit',
    riskLevel: 'Bajo',
    yearProfit: 7.8,
    maxDrawdown: 4.1,
    winRate: 61,
    volatility: 5.2,
    aum: '€120M',
    description: 'Vehículo de crédito privado con foco en preservación de capital y liquidez trimestral.',
  },
  {
    id: 'xetra-capital',
    name: 'Xetra Capital',
    country: 'Suiza',
    logoLabel: 'XC',
    region: 'Europa',
    strategy: 'Macro',
    riskLevel: 'Medio',
    yearProfit: 11.2,
    maxDrawdown: 6.9,
    winRate: 58,
    volatility: 7.4,
    aum: 'CHF 210M',
    description: 'Estrategia macro institucional con coberturas dinámicas y foco en tasas y FX.',
  },
  {
    id: 'capital-management',
    name: 'Capital Management',
    country: 'Argentina',
    logoLabel: 'CM',
    region: 'LatAm',
    strategy: 'Multi-Strategy',
    riskLevel: 'Medio',
    yearProfit: 9.6,
    maxDrawdown: 7.8,
    winRate: 55,
    volatility: 8.1,
    aum: 'USD 95M',
    description: 'Asignación táctica con sesgo a crédito regional y coberturas cambiarias.',
  },
  {
    id: 'bullish-investment',
    name: 'Bullish Investment',
    country: 'México',
    logoLabel: 'BI',
    region: 'LatAm',
    strategy: 'Equity Long/Short',
    riskLevel: 'Alto',
    yearProfit: 13.4,
    maxDrawdown: 10.6,
    winRate: 57,
    volatility: 10.9,
    aum: 'USD 140M',
    description: 'Cartera long/short con enfoque en consumo y tecnología regional.',
  },
  {
    id: 'capital-grow',
    name: 'Capital Grow Investment',
    country: 'Colombia',
    logoLabel: 'CG',
    region: 'LatAm',
    strategy: 'Real Assets',
    riskLevel: 'Bajo',
    yearProfit: 8.4,
    maxDrawdown: 5.2,
    winRate: 60,
    volatility: 6.1,
    aum: 'USD 110M',
    description: 'Estrategia de activos reales con flujo estable y estructura institucional.',
  },
];

let filteredFunds = [...verifiedFunds];
let currentIndex = 0;

function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

function renderCarousel() {
  const carousel = document.getElementById('fundCarousel');
  const track = document.getElementById('fundCarouselTrack');
  if (!carousel || !track) return;

  track.innerHTML = '';

  if (!filteredFunds.length) {
    track.innerHTML = '<div class="empty-state">No hay fondos con estos criterios.</div>';
    renderDetail(null);
    updateControls();
    return;
  }

  filteredFunds.forEach((fund, index) => {
    const card = document.createElement('button');
    card.className = 'fund-card';
    card.setAttribute('type', 'button');
    card.dataset.index = index;
    card.setAttribute('aria-label', `Ver detalle de ${fund.name}`);
    card.innerHTML = `
      <div class="fund-card__header">
        <div class="fund-logo" aria-hidden="true">${fund.logoLabel}</div>
        <div>
          <p class="fund-card__name">${fund.name}</p>
          <div class="fund-card__meta">
            <span class="badge country">${fund.country}</span>
            <span class="badge success">✅ Verificado</span>
          </div>
        </div>
      </div>
      <p class="fund-card__description">${fund.description}</p>
      <div class="fund-card__tags">
        <span class="tag subtle">${fund.strategy}</span>
        <span class="tag subtle">${fund.region}</span>
      </div>
    `;

    card.addEventListener('click', () => setSelectedFund(index));
    track.appendChild(card);
  });

  if (currentIndex >= filteredFunds.length) {
    currentIndex = 0;
  }

  setSelectedFund(currentIndex);
}

function renderDetail(fund) {
  const detailCard = document.getElementById('detailCard');
  if (!detailCard) return;

  if (!fund) {
    detailCard.innerHTML = '<div class="empty-state">Selecciona un fondo para ver el detalle.</div>';
    return;
  }

  detailCard.classList.add('is-transitioning');

  window.setTimeout(() => {
    detailCard.innerHTML = `
      <div class="fund-detail-header">
        <div class="fund-logo" aria-hidden="true">${fund.logoLabel}</div>
        <div>
          <div class="fund-detail-title-row">
            <h3>${fund.name}</h3>
            <span class="badge country">${fund.country}</span>
            <span class="badge success">✅ Verificado</span>
          </div>
          <p class="fund-detail-description">${fund.description}</p>
        </div>
      </div>
      <div class="fund-stats primary">
        <div class="fund-stat-card primary">
          <p class="label">Year Total Profit</p>
          <p class="value">${formatPercent(fund.yearProfit)}</p>
        </div>
        <div class="fund-stat-card primary">
          <p class="label">Max Drawdown</p>
          <p class="value">-${fund.maxDrawdown.toFixed(1)}%</p>
        </div>
        <div class="fund-stat-card primary">
          <p class="label">Win Rate</p>
          <p class="value">${fund.winRate}%</p>
        </div>
        <div class="fund-stat-card primary">
          <p class="label">Nivel de Riesgo</p>
          <p class="value">${fund.riskLevel}</p>
        </div>
      </div>
      <div class="fund-stats secondary">
        <div class="stat-chip">Volatilidad <strong>${fund.volatility.toFixed(1)}%</strong></div>
        <div class="stat-chip">AUM aprox. <strong>${fund.aum}</strong></div>
        <div class="stat-chip">Estrategia <strong>${fund.strategy}</strong></div>
        <div class="stat-chip">Región <strong>${fund.region}</strong></div>
      </div>
      <div class="fund-cta">
        <button class="btn btn-primary" id="ctaInfo">Quiero más información</button>
        <p class="muted small">Accede a documentación, estructura operativa y proceso de inversión.</p>
      </div>
    `;

    detailCard.classList.remove('is-transitioning');

    detailCard.querySelector('#ctaInfo')?.addEventListener('click', () => {
      window.location.href = 'index.html#contact';
    });
  }, 120);
}

function updateCarouselState() {
  const track = document.getElementById('fundCarouselTrack');
  if (!track) return;

  track.querySelectorAll('.fund-card').forEach((card) => {
    const index = Number(card.dataset.index);
    card.classList.toggle('active', index === currentIndex);
    card.classList.toggle('prev', index === currentIndex - 1);
    card.classList.toggle('next', index === currentIndex + 1);
    card.classList.toggle('far', Math.abs(index - currentIndex) > 1);
  });

  updateCarouselPosition();
  updateControls();
}

function updateCarouselPosition() {
  const carousel = document.getElementById('fundCarousel');
  const track = document.getElementById('fundCarouselTrack');
  if (!carousel || !track) return;

  const activeCard = track.querySelector(`.fund-card[data-index="${currentIndex}"]`);
  if (!activeCard) return;

  const containerWidth = carousel.offsetWidth;
  const cardCenter = activeCard.offsetLeft + activeCard.offsetWidth / 2;
  const offset = containerWidth / 2 - cardCenter;

  track.style.transform = `translateX(${offset}px)`;
}

function updateControls() {
  const prevButton = document.getElementById('carouselPrev');
  const nextButton = document.getElementById('carouselNext');

  if (!prevButton || !nextButton) return;

  prevButton.disabled = currentIndex <= 0;
  nextButton.disabled = currentIndex >= filteredFunds.length - 1;
}

function setSelectedFund(index) {
  if (!filteredFunds.length) return;

  currentIndex = Math.max(0, Math.min(index, filteredFunds.length - 1));
  renderDetail(filteredFunds[currentIndex]);
  window.requestAnimationFrame(updateCarouselState);
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

    const matchesRisk = !riskLevel || fund.riskLevel === riskLevel;

    const matchesWinRate =
      winRateValue === null ||
      (winRateCondition === 'above' ? fund.winRate >= winRateValue : fund.winRate <= winRateValue);

    return matchesProfit && matchesDrawdown && matchesRisk && matchesWinRate;
  });

  currentIndex = 0;
  renderCarousel();
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
  currentIndex = 0;
  renderCarousel();
}

function handleSwipe(carousel) {
  let startX = 0;
  let deltaX = 0;

  carousel.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
  });

  carousel.addEventListener('touchmove', (event) => {
    deltaX = event.touches[0].clientX - startX;
  });

  carousel.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        setSelectedFund(currentIndex + 1);
      } else {
        setSelectedFund(currentIndex - 1);
      }
    }
    deltaX = 0;
  });
}

function attachEvents() {
  document.getElementById('applyFilters')?.addEventListener('click', applyFilters);
  document.getElementById('resetFilters')?.addEventListener('click', resetFilters);

  document.getElementById('carouselPrev')?.addEventListener('click', () => {
    setSelectedFund(currentIndex - 1);
  });

  document.getElementById('carouselNext')?.addEventListener('click', () => {
    setSelectedFund(currentIndex + 1);
  });

  const carousel = document.getElementById('fundCarousel');
  if (carousel) {
    handleSwipe(carousel);
  }

  window.addEventListener('resize', updateCarouselPosition);
}

window.addEventListener('DOMContentLoaded', () => {
  renderCarousel();
  attachEvents();
});
