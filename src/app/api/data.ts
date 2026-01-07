export type Fund = {
  id: string;
  name: string;
  strategy: string;
  domicile: string;
  status: string;
  aum: string;
  performance: string;
  risk: string;
  summary: string;
  highlights: string[];
};

export type Insight = {
  id: number;
  title: string;
  timestamp: string;
  summary: string;
};

export type ContactRequest = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  receivedAt: string;
};

export const funds: Fund[] = [
  {
    id: "aurora-macro",
    name: "Aurora Macro Opportunities",
    strategy: "Global Macro",
    domicile: "Luxembourg",
    status: "Open",
    aum: "$650M",
    performance: "+12.4%",
    risk: "Controlled Vol",
    summary: "Systematic macro with discretionary overlays across rates, FX, and commodities.",
    highlights: ["Daily transparency", "UCITS wrapper", "15+ yrs team"],
  },
  {
    id: "summit-credit",
    name: "Summit Structured Credit",
    strategy: "Credit",
    domicile: "Cayman",
    status: "Waitlist",
    aum: "$420M",
    performance: "+9.1%",
    risk: "Low-Medium",
    summary: "Capital solutions across CLO equity/mezzanine with active risk corridors.",
    highlights: ["Verified trustee data", "Quarterly liquidity", "IC-ready reports"],
  },
  {
    id: "quant-digital",
    name: "Helix Quant Digital",
    strategy: "Digital Assets",
    domicile: "BVI",
    status: "Open",
    aum: "$180M",
    performance: "+22.3%",
    risk: "Medium",
    summary: "Market-neutral digital asset strategy with exchange and custody diversification.",
    highlights: ["24/7 monitoring", "Counterparty screens", "SOC2 aligned"],
  },
];

export const insights: Insight[] = [
  {
    id: 1,
    title: "Allocator interest pivoting to hybrid credit sleeves",
    timestamp: "Last 24h",
    summary:
      "Investment committees are prioritizing credit managers with flexible sleeves that can toggle between mezzanine and special situations.",
  },
  {
    id: 2,
    title: "Operational due diligence clocks trending faster",
    timestamp: "This week",
    summary:
      "Average ODD cycle times have dropped 18% month-over-month as data rooms ship pre-validated compliance artifacts.",
  },
  {
    id: 3,
    title: "Digital asset volatility compression benefiting neutral books",
    timestamp: "This week",
    summary:
      "Neutral strategies with exchange dispersion are outperforming directional peers by 240 bps on a volatility-adjusted basis.",
  },
];

export const contactRequests: ContactRequest[] = [];
