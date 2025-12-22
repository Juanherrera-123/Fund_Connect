export const apiBase = "/api";

export const languageOptions = {
  en: { label: "English", shortLabel: "EN", locale: "en" },
  pt: { label: "Português", shortLabel: "PT", locale: "pt" },
  es: { label: "Español", shortLabel: "ES", locale: "es" },
  it: { label: "Italiano", shortLabel: "IT", locale: "it" },
  zh: { label: "中文（简体）", shortLabel: "中文", locale: "zh-Hans" },
};

export const translations = {
  en: {
    fundsLoading: "Loading verified funds...",
    fundsLoadError: "Unable to load funds. Start the backend server.",
    insightsLoading: "Loading intelligence feed...",
    insightsLoadError: "Unable to load insights. Start the backend server.",
    contactStatusSending: "Sending...",
    contactStatusSuccess: "We received your request. Our team will respond shortly.",
    contactStatusError: "Unable to submit right now. Please confirm the backend is running.",
  },
  pt: {
    fundsLoading: "Carregando fundos verificados...",
    fundsLoadError: "Não foi possível carregar os fundos. Inicie o backend.",
    insightsLoading: "Carregando insights...",
    insightsLoadError: "Não foi possível carregar os insights. Inicie o backend.",
    contactStatusSending: "Enviando...",
    contactStatusSuccess: "Recebemos sua solicitação. Responderemos em breve.",
    contactStatusError: "Não foi possível enviar agora. Confirme que o backend está ativo.",
  },
  es: {
    fundsLoading: "Cargando fondos verificados...",
    fundsLoadError: "No se pudieron cargar los fondos. Inicia el backend.",
    insightsLoading: "Cargando inteligencia...",
    insightsLoadError: "No se pudieron cargar los insights. Inicia el backend.",
    contactStatusSending: "Enviando...",
    contactStatusSuccess: "Recibimos tu solicitud. Nuestro equipo responderá pronto.",
    contactStatusError: "No se pudo enviar. Confirma que el backend esté activo.",
  },
  it: {
    fundsLoading: "Caricamento fondi verificati...",
    fundsLoadError: "Impossibile caricare i fondi. Avvia il backend.",
    insightsLoading: "Caricamento insight...",
    insightsLoadError: "Impossibile caricare gli insight. Avvia il backend.",
    contactStatusSending: "Invio in corso...",
    contactStatusSuccess: "Abbiamo ricevuto la tua richiesta. Risponderemo a breve.",
    contactStatusError: "Impossibile inviare ora. Verifica che il backend sia attivo.",
  },
  zh: {
    fundsLoading: "正在加载已验证基金...",
    fundsLoadError: "无法加载基金。请启动后端服务。",
    insightsLoading: "正在加载洞察...",
    insightsLoadError: "无法加载洞察。请启动后端服务。",
    contactStatusSending: "发送中...",
    contactStatusSuccess: "我们已收到您的请求，将尽快回复。",
    contactStatusError: "暂时无法提交，请确认后端正在运行。",
  },
} as const;

export type LanguageKey = keyof typeof languageOptions;

export const MASTER_USER = {
  username: "Sebastian_ACY",
  password: "dB9(NP1O",
  role: "MasterUser",
} as const;

export const STRATEGY_OPTIONS = [
  { label: "Forex", value: "FOREX" },
  { label: "Indices & Macro", value: "INDICES_MACRO" },
  { label: "Commodities & Metales", value: "COMMODITIES_METALES" },
  { label: "Equities CFDs", value: "EQUITIES_CFD" },
  { label: "Crypto Assets", value: "CRYPTO_ASSETS" },
  { label: "Multi-Assets", value: "MULTI_ASSETS" },
];

export const SURVEY_DEFINITIONS = {
  Investor: [
    {
      id: "objective",
      label: "Investment Objective",
      type: "single",
      options: [
        { label: "Preservación de capital", value: "Preservación de capital" },
        { label: "Crecimiento moderado", value: "Crecimiento moderado" },
        { label: "Crecimiento agresivo", value: "Crecimiento agresivo" },
        { label: "Diversificación patrimonial", value: "Diversificación patrimonial" },
        { label: "Generación de ingresos", value: "Generación de ingresos" },
      ],
    },
    {
      id: "horizon",
      label: "Investment Horizon",
      type: "single",
      options: [
        { label: "Menos de 6 meses", value: "Menos de 6 meses" },
        { label: "Entre 6 meses y 1 año", value: "Entre 6 meses y 1 año" },
        { label: "1 a 3 años", value: "1 a 3 años" },
        { label: "Más de 3 años", value: "Más de 3 años" },
      ],
    },
    {
      id: "riskLevel",
      label: "Risk Tolerance",
      type: "single",
      options: [
        { label: "Conservador", value: "Conservador" },
        { label: "Moderado", value: "Moderado" },
        { label: "Balanceado", value: "Balanceado" },
        { label: "Agresivo", value: "Agresivo" },
      ],
    },
    {
      id: "strategyPreferences",
      label: "Preferred Strategy / Assets",
      type: "multi",
      options: STRATEGY_OPTIONS,
    },
    {
      id: "reportingFrequency",
      label: "Reporting Frequency",
      type: "single",
      options: [
        { label: "Mensual", value: "Mensual" },
        { label: "Trimestral", value: "Trimestral" },
        { label: "Solo eventos relevantes", value: "Solo eventos relevantes" },
      ],
    },
  ],
  "Fund Manager": [
    {
      id: "strategyType",
      label: "Primary Strategy / Assets",
      type: "single",
      options: STRATEGY_OPTIONS,
    },
    {
      id: "capitalStatus",
      label: "Capital Status",
      type: "single",
      options: [
        { label: "Opero con capital propio", value: "Opero con capital propio" },
        { label: "Opero con capital de terceros", value: "Opero con capital de terceros" },
        {
          label: "En transición hacia capital de terceros",
          value: "En transición hacia capital de terceros",
        },
        { label: "Track record en desarrollo", value: "Track record en desarrollo" },
      ],
    },
    {
      id: "trackRecordLength",
      label: "Verifiable Track Record Length",
      type: "single",
      options: [
        { label: "Menos de 12 meses", value: "Menos de 12 meses" },
        { label: "12 – 24 meses", value: "12 – 24 meses" },
        { label: "24 – 36 meses", value: "24 – 36 meses" },
        { label: "Más de 36 meses", value: "Más de 36 meses" },
      ],
    },
    {
      id: "operatingStructure",
      label: "Operating Structure",
      type: "single",
      options: [
        { label: "Cuenta segregada", value: "Cuenta segregada" },
        { label: "Managed Account (MAM / PAMM)", value: "Managed Account (MAM / PAMM)" },
        { label: "Vehículo privado (SPV / fondo privado)", value: "Vehículo privado (SPV / fondo privado)" },
        { label: "En proceso de estructuración", value: "En proceso de estructuración" },
      ],
    },
    {
      id: "strategyDescription",
      label: "Strategy Description",
      type: "text",
      prompt:
        "Describe tu estrategia en 2–4 líneas. Incluye instrumentos operados, horizonte típico y cómo gestionas el riesgo.",
    },
  ],
  "Family Office": [
    {
      id: "managementRole",
      label: "Desired Role in Investment Management",
      type: "single",
      options: [
        { label: "Supervisión estratégica", value: "Supervisión estratégica" },
        { label: "Selección activa de gestores", value: "Selección activa de gestores" },
        { label: "Delegación con reporting periódico", value: "Delegación con reporting periódico" },
      ],
    },
    {
      id: "diversificationLevel",
      label: "Desired Diversification Level",
      type: "single",
      options: [
        { label: "1–2 fondos", value: "1–2 fondos" },
        { label: "3–5 fondos", value: "3–5 fondos" },
        { label: "Más de 5 fondos", value: "Más de 5 fondos" },
      ],
    },
    {
      id: "strategyPreferences",
      label: "Preferred Strategy / Assets",
      type: "multi",
      options: STRATEGY_OPTIONS,
    },
    {
      id: "interactionLevel",
      label: "Interaction Level with Managers",
      type: "single",
      options: [
        { label: "Reportes únicamente", value: "Reportes únicamente" },
        { label: "Comunicación ocasional", value: "Comunicación ocasional" },
        { label: "Acceso directo y recurrente", value: "Acceso directo y recurrente" },
      ],
    },
    {
      id: "reportingCustomization",
      label: "Reporting Customization Level",
      type: "single",
      options: [
        { label: "Básico", value: "Básico" },
        { label: "Personalizado", value: "Personalizado" },
        { label: "Totalmente a medida", value: "Totalmente a medida" },
      ],
    },
  ],
} as const;

export const STORAGE_KEYS = {
  profiles: "igatesUserProfiles",
  session: "igatesCurrentSession",
  notifications: "igatesMasterNotifications",
  fundApplications: "igatesFundApplications",
  preferredLanguage: "preferredLanguage",
};

export const baseVerifiedFunds = [
  {
    id: "brenna-funding",
    name: "Brenna Funding",
    country: "Portugal",
    logoLabel: "BF",
    region: "Europa",
    strategy: "Private Credit",
    riskLevel: "Bajo",
    yearProfit: 7.8,
    maxDrawdown: 4.1,
    winRate: 61,
    volatility: 5.2,
    aum: "€120M",
    description:
      "Vehículo de crédito privado con foco en preservación de capital y liquidez trimestral.",
  },
  {
    id: "xetra-capital",
    name: "Xetra Capital",
    country: "Suiza",
    logoLabel: "XC",
    region: "Europa",
    strategy: "Macro",
    riskLevel: "Medio",
    yearProfit: 11.2,
    maxDrawdown: 6.9,
    winRate: 58,
    volatility: 7.4,
    aum: "CHF 210M",
    description: "Estrategia macro institucional con coberturas dinámicas y foco en tasas y FX.",
  },
  {
    id: "capital-management",
    name: "Capital Management",
    country: "Argentina",
    logoLabel: "CM",
    region: "LatAm",
    strategy: "Multi-Strategy",
    riskLevel: "Medio",
    yearProfit: 9.6,
    maxDrawdown: 7.8,
    winRate: 55,
    volatility: 8.1,
    aum: "USD 95M",
    description: "Asignación táctica con sesgo a crédito regional y coberturas cambiarias.",
  },
  {
    id: "bullish-investment",
    name: "Bullish Investment",
    country: "México",
    logoLabel: "BI",
    region: "LatAm",
    strategy: "Equity Long/Short",
    riskLevel: "Alto",
    yearProfit: 13.4,
    maxDrawdown: 10.6,
    winRate: 57,
    volatility: 10.9,
    aum: "USD 140M",
    description: "Cartera long/short con enfoque en consumo y tecnología regional.",
  },
  {
    id: "capital-grow",
    name: "Capital Grow Investment",
    country: "Colombia",
    logoLabel: "CG",
    region: "LatAm",
    strategy: "Real Assets",
    riskLevel: "Bajo",
    yearProfit: 8.4,
    maxDrawdown: 5.2,
    winRate: 60,
    volatility: 6.1,
    aum: "USD 110M",
    description: "Estrategia de activos reales con flujo estable y estructura institucional.",
  },
];

export const countryFlags: Record<string, string> = {
  Portugal: "🇵🇹",
  Suiza: "🇨🇭",
  Argentina: "🇦🇷",
  México: "🇲🇽",
  Colombia: "🇨🇴",
};

export function getStrategyLabel(value: string) {
  return STRATEGY_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function formatStrategyList(values?: string[]) {
  if (!values || !values.length) return "—";
  return values.map((value) => getStrategyLabel(value)).join(", ");
}

export function getFundLogoLabel(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export function formatPercent(value?: number | null, decimals = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

export function formatNumber(value?: number | null, suffix = "", decimals = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return `${value.toFixed(decimals)}${suffix}`;
}
