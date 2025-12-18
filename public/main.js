const apiBase = `${window.location.origin.replace(/\/$/, '')}/api`;

const languageOptions = {
  en: { label: 'English', shortLabel: 'EN', locale: 'en' },
  pt: { label: 'Português', shortLabel: 'PT', locale: 'pt' },
  es: { label: 'Español', shortLabel: 'ES', locale: 'es' },
  it: { label: 'Italiano', shortLabel: 'IT', locale: 'it' },
  zh: { label: '中文（简体）', shortLabel: '中文', locale: 'zh-Hans' },
};

const translations = {
  en: {
    navHome: 'Home',
    navWhy: 'Why IGATES',
    navFunds: 'Trending',
    navIntelligence: 'Intelligence',
    navInsights: 'Insights',
    navContact: 'Contact',
    navManagers: 'Fund Manager',
    navFamily: 'Family Offices',
    navLearn: 'Learn',
    navRequestDemo: 'Request Advisory',
    heroEyebrow: 'Institutional Access',
    heroTitle: 'Connecting capital with verified Hedge funds.',
    heroLead: 'Intelligence that moves capital.',
    heroCtaInvestor: 'Request investment advisory',
    heroCtaManager: 'Apply as a manager',
    heroTrust1: 'Operate with regulated entities',
    heroTrust2: 'Segregated accounts and protected funds',
    heroTrust3: 'Verified monthly reporting',
    dashboardPerformanceLabel: 'Fund Performance',
    dashboardRiskLabel: 'Risk Profile',
    dashboardVolatility: 'Volatility',
    dashboardRiskLevel: 'Medium-Low',
    dashboardDrawdown: 'Max Drawdown',
    dashboardAUMLabel: 'Verified AUM Connected',
    dashboardAUMSub: 'Across 10 Managers',
    whyEyebrow: 'Strategic Purpose',
    whyTitle: 'Why IGATES Exists',
    whyLead: 'A curated bridge between qualified capital and the managers shaping the future of global markets.',
    whyCard1Title: 'Verified Data',
    whyCard1Body: 'Institutional-grade datasets, reconciled across custodians, administrators, and audited filings.',
    whyCard2Title: 'Due Diligence Engine',
    whyCard2Body: 'Automated governance, risk, and compliance screening that streamlines onboarding and monitoring.',
    whyCard3Title: 'Strategy Marketplace',
    whyCard3Body: 'Discover and engage with curated managers across credit, macro, digital assets, and differentiated alts.',
    fundsEyebrow: 'Live Universe',
    fundsTitle: 'Featured Fund Programs',
    fundsLead: 'Signal-rich profiles backed by daily reconciled data, ready for allocator review.',
    fundsLoading: 'Loading verified funds...',
    fundsLoadError: 'Unable to load funds. Start the backend server.',
    intelligenceEyebrow: 'Data Fabric',
    intelligenceTitle: 'IGATES Intelligence Engine',
    intelligenceLead: 'Real-time analytics across performance, factor exposures, risk corridors, and capital deployment readiness.',
    intelligenceBullet1: 'Dynamic liquidity mapping',
    intelligenceBullet2: 'Exposure heatmaps with anomaly detection',
    intelligenceBullet3: 'LP-ready reporting with compliance presets',
    intelligenceBadge1: 'API Connected',
    intelligenceBadge2: '24/7 Monitoring',
    intelligenceBadge3: 'SOC2 Ready',
    insightsEyebrow: 'Signals',
    insightsTitle: 'Market & Platform Insights',
    insightsLead: 'Short intelligence bursts designed for investment committees and risk partners.',
    insightsLoading: 'Loading intelligence feed...',
    insightsLoadError: 'Unable to load insights. Start the backend server.',
    learnEyebrow: 'Daily Forum',
    learnTitle: 'Learn & Community',
    learnLead: 'Fresh briefings and forum highlights to keep you updated every day.',
    learnPost1Title: 'Morning allocation radar: credit and macro themes',
    learnPost1Time: 'Today',
    learnPost1Body: 'Top forum threads from allocators discussing cross-asset liquidity, duration risk, and new macro hedges.',
    learnPost2Title: 'Manager spotlight: digital asset neutrality',
    learnPost2Time: 'Updated daily',
    learnPost2Body: 'Daily digest of risk notes and operational updates from the digital asset desk.',
    learnPost3Title: 'Community brief: ops and compliance corner',
    learnPost3Time: 'This week',
    learnPost3Body: 'Forum Q&A covering onboarding checklists, data room hygiene, and audit-ready packaging.',
    investorsEyebrow: 'For Investors',
    investorsTitle: 'Global access to institutional talent.',
    investorsItem1: 'Curated mandates with verified AUM and audited track records.',
    investorsItem2: 'Structured comparables and risk analytics for faster IC approvals.',
    investorsItem3: 'Private access workflows and co-investment visibility.',
    managersEyebrow: 'For Managers',
    managersTitle: 'Purpose-built distribution for elite strategies.',
    managersItem1: 'Engage verified allocators globally with embedded compliance.',
    managersItem2: 'Share data securely with granular permissions and watermarking.',
    managersItem3: 'Pipeline intelligence that prioritizes the right capital.',
    complianceEyebrow: 'Compliance First',
    complianceTitle: 'Regulatory-grade controls at every step.',
    complianceBody: 'SOC2-ready infrastructure, geo-fenced data residency, and layered permissions keep sensitive information protected.',
    complianceIdentityTitle: 'Identity & Access',
    complianceIdentityBody: 'Multi-factor auth, SSO/SAML, and secure vaulting for documents and NDAs.',
    complianceMonitoringTitle: 'Monitoring',
    complianceMonitoringBody: 'Automated audit trails, threshold alerts, and encryption in transit and at rest.',
    complianceGovernanceTitle: 'Governance',
    complianceGovernanceBody: 'Pre-configured policies aligned to institutional due diligence standards.',
    contactEyebrow: 'Talk To Us',
    contactTitle: 'Start your access process.',
    contactLead: 'Tell us about your mandate or strategy. Our team will coordinate data rooms, diligence requests, and secure access.',
    contactResponseLabel: 'Response time',
    contactResponseMetric: '< 24 hours',
    contactCoverageLabel: 'Coverage',
    contactCoverageMetric: 'Global allocators',
    contactSecurityLabel: 'Security',
    contactSecurityMetric: 'SOC2-ready',
    contactNameLabel: 'Name',
    contactNamePlaceholder: 'Your full name',
    contactEmailLabel: 'Email',
    contactEmailPlaceholder: 'you@firm.com',
    contactRoleLabel: 'Role',
    contactRolePlaceholder: 'Select your role',
    contactRoleAllocator: 'Allocator / Investor',
    contactRoleManager: 'Fund Manager',
    contactRoleOps: 'Operations / Compliance',
    contactNotesLabel: 'Notes',
    contactNotesPlaceholder: 'Mandate size, strategies, timing',
    contactSubmit: 'Request Advisory',
    contactStatusSending: 'Sending...',
    contactStatusSuccess: 'We received your request. Our team will respond shortly.',
    contactStatusError: 'Unable to submit right now. Please confirm the backend is running.',
    footerTagline: 'Elite connectivity for fund managers and qualified capital.',
    footerPlatform: 'Platform',
    footerOverview: 'Overview',
    footerFeaturedFunds: 'Featured Funds',
    footerIntelligence: 'Intelligence',
    footerCompany: 'Company',
    footerAbout: 'About',
    footerCompliance: 'Compliance',
    footerCareers: 'Careers',
    footerContact: 'Contact',
    footerRequestCall: 'Request a Call',
    footerInvestorRelations: 'Investor Relations',
    footerRights: '© 2024 IGATES. All rights reserved.',
    footerPrivacy: 'Privacy & Security',
    managersHeroEyebrow: 'For Managers',
    managersHeroTitle: 'Purpose-built distribution for elite strategies.',
    managersHeroLead: 'Connect with verified global allocators using IGATES’ institutional infrastructure.',
    managersHeroCta: 'Apply as a Manager',
    managersHeroTrust1: 'Allocator coverage across macro, credit, digital assets',
    managersHeroTrust2: 'SOC2-ready data exchange',
    managersCardLabel1: 'Live mandates',
    managersCardCopy1: 'Qualified allocators seeking differentiated strategies.',
    managersCardLabel2: 'Avg. review time',
    managersCardCopy2: 'Automated compliance cuts through admin drag.',
    managersBenefitsEyebrow: 'Platform Benefits',
    managersBenefitsTitle: 'Everything you need to scale allocator pipelines.',
    managersBenefit1Title: 'Access curated allocators',
    managersBenefit1Body: 'Targeted introductions to qualified LPs actively allocating to your strategy class.',
    managersBenefit2Title: 'Secure data rooms',
    managersBenefit2Body: 'Permissioned vaults with watermarking and activity visibility for every data room.',
    managersBenefit3Title: 'Compliance workflows',
    managersBenefit3Body: 'Built-in KYC, KYB, and governance checks keep diligence moving without bottlenecks.',
    managersBenefit4Title: 'Embedded performance intelligence',
    managersBenefit4Body: 'Automated telemetry streams performance, risk corridors, and factor drift to LPs.',
    managersOnboardingEyebrow: 'Onboarding',
    managersOnboardingTitle: 'Institutional distribution in four steps.',
    managersStep1: 'Submit strategy profile',
    managersStep2: 'Verification & compliance',
    managersStep3: 'Data integration & risk mapping',
    managersStep4: 'Go live to allocator marketplace',
    managersFormEyebrow: 'Manager Applications',
    managersFormTitle: 'Apply to distribute on IGATES.',
    managersFormLead: 'Provide your strategy details and our team will coordinate diligence and onboarding.',
    managersFormResponseLabel: 'Response time',
    managersFormResponseMetric: '< 48 hours',
    managersFormSecurityLabel: 'Security',
    managersFormSecurityMetric: 'Compliance-first',
    managersFormCoverageLabel: 'Coverage',
    managersFormCoverageMetric: 'Global allocators',
    familyHeroEyebrow: 'Family Offices',
    familyHeroTitle: 'Institutional Access for Modern Family Offices.',
    familyHeroLead: 'Simplify manager discovery, diligence, and allocation workflows.',
    familyHeroCta: 'Request Access',
    familyHeroTrust1: 'Allocator-grade reporting',
    familyHeroTrust2: 'Private data workflows',
    familyCardLabel1: 'Strategies reviewed',
    familyCardCopy1: 'Cross-asset intelligence tailored to mandate criteria.',
    familyCardLabel2: 'Diligence files',
    familyCardCopy2: 'Audit-ready archives with automated updates.',
    familyWhyEyebrow: 'Why IGATES',
    familyWhyTitle: 'Operational clarity for investment principals.',
    familyWhy1Title: 'Verified data streams',
    familyWhy1Body: 'Custodian, admin, and auditor-aligned reporting you can trust.',
    familyWhy2Title: 'Audit-ready reporting',
    familyWhy2Body: 'IC-ready packages with complete attribution and variance breakdowns.',
    familyWhy3Title: 'Consolidated manager reviews',
    familyWhy3Body: 'Side-by-side diligence trackers, notes, and signals in one workspace.',
    familyWhy4Title: 'Risk corridor analytics',
    familyWhy4Body: 'Scenario-aware bands so allocations stay inside mandate corridors.',
    familyCuratedEyebrow: 'Curated Mandates',
    familyCuratedTitle: 'Allocator-first views into leading strategies.',
    familyMandate1: 'Macro',
    familyMandate1Body: 'Global macro managers with disciplined risk corridors.',
    familyMandate2: 'Credit',
    familyMandate2Body: 'Event-driven and structured credit insights with live exposure checks.',
    familyMandate3: 'Digital Assets',
    familyMandate3Body: 'On-chain transparency with institutional-grade custody signals.',
    familyMandate4: 'Systematic Strategies',
    familyMandate4Body: 'Factor-aware systems with monitored model drift and capacity.',
    familyFormEyebrow: 'Access Requests',
    familyFormTitle: 'Request allocator access.',
    familyFormLead: 'Tell us about your mandate, and we will provision secure access to managers.',
    familyFormResponseLabel: 'Response time',
    familyFormResponseMetric: '< 24 hours',
    familyFormSecurityLabel: 'Security',
    familyFormSecurityMetric: 'Compliance-first',
    familyFormCoverageLabel: 'Coverage',
    familyFormCoverageMetric: 'Global managers',
    familyFormSubmit: 'Request Access',
    formNameLabel: 'Name',
    formFirmLabel: 'Firm',
    formStrategyLabel: 'Strategy Type',
    formAumLabel: 'AUM',
    formEmailLabel: 'Email',
    formNotesLabel: 'Notes',
    formSubmit: 'Apply as a Manager',
  },
  pt: {
    navHome: 'Início',
    navWhy: 'Por que a IGATES',
    navFunds: 'Destaques',
    navIntelligence: 'Inteligência',
    navInsights: 'Insights',
    navContact: 'Contato',
    navManagers: 'Gestor de Fundos',
    navFamily: 'Family Offices',
    navLearn: 'Aprender',
    navRequestDemo: 'Solicitar Assessoria',
    heroEyebrow: 'Acesso Institucional',
    heroTitle: 'Conectando capital a gestores verificados.',
    heroLead: 'Inteligência que move capital.',
    heroCtaInvestor: 'Solicitar assessoria de investimento',
    heroCtaManager: 'Aplicar como gestor',
    heroTrust1: 'Operação com entidades reguladas',
    heroTrust2: 'Contas segregadas e fundos protegidos',
    heroTrust3: 'Relatórios mensais verificados',
    dashboardPerformanceLabel: 'Desempenho do Fundo',
    dashboardRiskLabel: 'Perfil de Risco',
    dashboardVolatility: 'Volatilidade',
    dashboardRiskLevel: 'Médio-Baixo',
    dashboardDrawdown: 'Máxima Queda',
    dashboardAUMLabel: 'AUM verificado conectado',
    dashboardAUMSub: 'Com 10 gestores',
    whyEyebrow: 'Propósito Estratégico',
    whyTitle: 'Por que a IGATES existe',
    whyLead: 'Uma ponte curada entre capital qualificado e os gestores que moldam o futuro dos mercados globais.',
    whyCard1Title: 'Dados Verificados',
    whyCard1Body: 'Bases institucionais reconciliadas entre custodiantes, administradores e auditorias.',
    whyCard2Title: 'Motor de Due Diligence',
    whyCard2Body: 'Governança, risco e compliance automatizados que agilizam onboarding e monitoramento.',
    whyCard3Title: 'Marketplace de Estratégias',
    whyCard3Body: 'Descubra gestores curados em crédito, macro, ativos digitais e alternativas diferenciadas.',
    fundsEyebrow: 'Universo ao Vivo',
    fundsTitle: 'Programas de Fundos em Destaque',
    fundsLead: 'Perfis ricos em sinais com dados reconciliados diariamente, prontos para avaliação de alocadores.',
    fundsLoading: 'Carregando fundos verificados...',
    fundsLoadError: 'Não foi possível carregar os fundos. Inicie o servidor backend.',
    intelligenceEyebrow: 'Tecido de Dados',
    intelligenceTitle: 'Motor de Inteligência IGATES',
    intelligenceLead: 'Analytics em tempo real sobre performance, fatores, corredores de risco e prontidão de capital.',
    intelligenceBullet1: 'Mapeamento dinâmico de liquidez',
    intelligenceBullet2: 'Heatmaps de exposição com detecção de anomalias',
    intelligenceBullet3: 'Relatórios prontos para LPs com presets de compliance',
    intelligenceBadge1: 'API Conectada',
    intelligenceBadge2: 'Monitoramento 24/7',
    intelligenceBadge3: 'Pronto para SOC2',
    insightsEyebrow: 'Sinais',
    insightsTitle: 'Insights de Mercado e Plataforma',
    insightsLead: 'Boletins curtos de inteligência para comitês de investimento e parceiros de risco.',
    insightsLoading: 'Carregando feed de inteligência...',
    insightsLoadError: 'Não foi possível carregar os insights. Inicie o servidor backend.',
    learnEyebrow: 'Fórum Diário',
    learnTitle: 'Aprendizado e Comunidade',
    learnLead: 'Briefings e destaques do fórum para mantê-lo atualizado todos os dias.',
    learnPost1Title: 'Radar matinal: temas de crédito e macro',
    learnPost1Time: 'Hoje',
    learnPost1Body: 'Principais threads do fórum sobre liquidez cross-asset, risco de duração e novos hedges macro.',
    learnPost2Title: 'Destaque do gestor: neutralidade em ativos digitais',
    learnPost2Time: 'Atualizado diariamente',
    learnPost2Body: 'Resumo diário de notas de risco e atualizações operacionais da mesa de ativos digitais.',
    learnPost3Title: 'Boletim da comunidade: operações e compliance',
    learnPost3Time: 'Nesta semana',
    learnPost3Body: 'Perguntas e respostas do fórum sobre onboarding, organização de data rooms e pacotes para auditoria.',
    investorsEyebrow: 'Para Investidores',
    investorsTitle: 'Acesso global a talento institucional.',
    investorsItem1: 'Mandatos curados com AUM verificado e histórico auditado.',
    investorsItem2: 'Comparáveis estruturados e analytics de risco para aprovações mais rápidas.',
    investorsItem3: 'Fluxos privados de acesso e visibilidade de coinvestimentos.',
    managersEyebrow: 'Para Gestores',
    managersTitle: 'Distribuição sob medida para estratégias de elite.',
    managersItem1: 'Engaje alocadores verificados globalmente com compliance embarcado.',
    managersItem2: 'Compartilhe dados com permissões granulares e marca d’água.',
    managersItem3: 'Inteligência de pipeline que prioriza o capital certo.',
    complianceEyebrow: 'Compliance em Primeiro Lugar',
    complianceTitle: 'Controles de nível regulatório em cada etapa.',
    complianceBody: 'Infraestrutura pronta para SOC2, residência de dados geofenciada e permissões em camadas protegem informações sensíveis.',
    complianceIdentityTitle: 'Identidade e Acesso',
    complianceIdentityBody: 'MFA, SSO/SAML e cofres seguros para documentos e NDAs.',
    complianceMonitoringTitle: 'Monitoramento',
    complianceMonitoringBody: 'Trilhas de auditoria automáticas, alertas de limite e criptografia em trânsito e em repouso.',
    complianceGovernanceTitle: 'Governança',
    complianceGovernanceBody: 'Políticas pré-configuradas alinhadas aos padrões institucionais de diligência.',
    contactEyebrow: 'Fale Conosco',
    contactTitle: 'Comece seu processo de acesso.',
    contactLead: 'Conte sobre seu mandato ou estratégia. Coordenamos data rooms, diligências e acesso seguro.',
    contactResponseLabel: 'Tempo de resposta',
    contactResponseMetric: '< 24 horas',
    contactCoverageLabel: 'Cobertura',
    contactCoverageMetric: 'Alocadores globais',
    contactSecurityLabel: 'Segurança',
    contactSecurityMetric: 'Pronto para SOC2',
    contactNameLabel: 'Nome',
    contactNamePlaceholder: 'Seu nome completo',
    contactEmailLabel: 'E-mail',
    contactEmailPlaceholder: 'voce@empresa.com',
    contactRoleLabel: 'Função',
    contactRolePlaceholder: 'Selecione sua função',
    contactRoleAllocator: 'Alocador / Investidor',
    contactRoleManager: 'Gestor de Fundos',
    contactRoleOps: 'Operações / Compliance',
    contactNotesLabel: 'Observações',
    contactNotesPlaceholder: 'Tamanho do mandato, estratégias, prazo',
    contactSubmit: 'Solicitar Assessoria',
    contactStatusSending: 'Enviando...',
    contactStatusSuccess: 'Recebemos seu pedido. Nossa equipe responderá em breve.',
    contactStatusError: 'Não foi possível enviar agora. Confirme se o backend está em execução.',
    footerTagline: 'Conectividade de elite para gestores e capital qualificado.',
    footerPlatform: 'Plataforma',
    footerOverview: 'Visão geral',
    footerFeaturedFunds: 'Fundos em Destaque',
    footerIntelligence: 'Inteligência',
    footerCompany: 'Empresa',
    footerAbout: 'Sobre',
    footerCompliance: 'Compliance',
    footerCareers: 'Carreiras',
    footerContact: 'Contato',
    footerRequestCall: 'Solicitar contato',
    footerInvestorRelations: 'Relações com Investidores',
    footerRights: '© 2024 IGATES. Todos os direitos reservados.',
    footerPrivacy: 'Privacidade e Segurança',
    managersHeroEyebrow: 'Para Gestores',
    managersHeroTitle: 'Distribuição sob medida para estratégias de elite.',
    managersHeroLead: 'Conecte-se com alocadores globais verificados usando a infraestrutura institucional da IGATES.',
    managersHeroCta: 'Aplicar como gestor',
    managersHeroTrust1: 'Cobertura de alocadores em macro, crédito e digitais',
    managersHeroTrust2: 'Troca de dados pronta para SOC2',
    managersCardLabel1: 'Mandatos ativos',
    managersCardCopy1: 'Alocadores qualificados buscando estratégias diferenciadas.',
    managersCardLabel2: 'Tempo médio de revisão',
    managersCardCopy2: 'Compliance automatizado reduz burocracia.',
    managersBenefitsEyebrow: 'Benefícios da Plataforma',
    managersBenefitsTitle: 'Tudo o que você precisa para escalar pipelines de alocadores.',
    managersBenefit1Title: 'Acesso a alocadores curados',
    managersBenefit1Body: 'Introduções direcionadas a LPs qualificados ativos no seu segmento.',
    managersBenefit2Title: 'Data rooms seguros',
    managersBenefit2Body: 'Cofres com permissões, marca d’água e visibilidade de atividade.',
    managersBenefit3Title: 'Fluxos de compliance',
    managersBenefit3Body: 'KYC, KYB e governança embutidos mantêm a diligência em movimento.',
    managersBenefit4Title: 'Inteligência de performance integrada',
    managersBenefit4Body: 'Telemetria automatizada entrega performance e risco para LPs.',
    managersOnboardingEyebrow: 'Onboarding',
    managersOnboardingTitle: 'Distribuição institucional em quatro passos.',
    managersStep1: 'Envie o perfil da estratégia',
    managersStep2: 'Verificação e compliance',
    managersStep3: 'Integração de dados e mapeamento de risco',
    managersStep4: 'Live no marketplace de alocadores',
    managersFormEyebrow: 'Aplicações de Gestores',
    managersFormTitle: 'Candidate-se para distribuir na IGATES.',
    managersFormLead: 'Informe sua estratégia e coordenaremos diligência e onboarding.',
    managersFormResponseLabel: 'Tempo de resposta',
    managersFormResponseMetric: '< 48 horas',
    managersFormSecurityLabel: 'Segurança',
    managersFormSecurityMetric: 'Compliance-first',
    managersFormCoverageLabel: 'Cobertura',
    managersFormCoverageMetric: 'Alocadores globais',
    familyHeroEyebrow: 'Family Offices',
    familyHeroTitle: 'Acesso institucional para family offices modernos.',
    familyHeroLead: 'Simplifique descoberta, diligência e alocação de gestores.',
    familyHeroCta: 'Solicitar acesso',
    familyHeroTrust1: 'Relatórios em padrão allocator',
    familyHeroTrust2: 'Fluxos privados de dados',
    familyCardLabel1: 'Estratégias avaliadas',
    familyCardCopy1: 'Inteligência multi-ativo alinhada ao mandato.',
    familyCardLabel2: 'Arquivos de diligência',
    familyCardCopy2: 'Arquivos auditáveis com atualizações automáticas.',
    familyWhyEyebrow: 'Por que IGATES',
    familyWhyTitle: 'Clareza operacional para decisores.',
    familyWhy1Title: 'Streams de dados verificados',
    familyWhy1Body: 'Relatórios alinhados a custodiante, administrador e auditor.',
    familyWhy2Title: 'Relatórios prontos para auditoria',
    familyWhy2Body: 'Pacotes prontos para IC com atribuição completa.',
    familyWhy3Title: 'Revisões de gestores consolidadas',
    familyWhy3Body: 'Acompanhamento lado a lado de diligência e sinais.',
    familyWhy4Title: 'Analytics de corredor de risco',
    familyWhy4Body: 'Faixas de cenário para manter alocações no mandato.',
    familyCuratedEyebrow: 'Mandatos Curados',
    familyCuratedTitle: 'Visão de alocador em estratégias líderes.',
    familyMandate1: 'Macro',
    familyMandate1Body: 'Gestores macro com corredores de risco disciplinados.',
    familyMandate2: 'Crédito',
    familyMandate2Body: 'Crédito estrutural e event-driven com checagens de exposição.',
    familyMandate3: 'Ativos Digitais',
    familyMandate3Body: 'Transparência on-chain com custódia institucional.',
    familyMandate4: 'Estratégias Sistemáticas',
    familyMandate4Body: 'Sistemas factor-aware com monitoramento de drift e capacidade.',
    familyFormEyebrow: 'Pedidos de Acesso',
    familyFormTitle: 'Solicite acesso de alocador.',
    familyFormLead: 'Conte seu mandato e provisionaremos acesso seguro aos gestores.',
    familyFormResponseLabel: 'Tempo de resposta',
    familyFormResponseMetric: '< 24 horas',
    familyFormSecurityLabel: 'Segurança',
    familyFormSecurityMetric: 'Compliance-first',
    familyFormCoverageLabel: 'Cobertura',
    familyFormCoverageMetric: 'Gestores globais',
    familyFormSubmit: 'Solicitar acesso',
    formNameLabel: 'Nome',
    formFirmLabel: 'Empresa',
    formStrategyLabel: 'Tipo de Estratégia',
    formAumLabel: 'AUM',
    formEmailLabel: 'E-mail',
    formNotesLabel: 'Observações',
    formSubmit: 'Aplicar como gestor',
  },
  es: {
    navHome: 'Inicio',
    navWhy: 'Por qué IGATES',
    navFunds: 'Destacados',
    navIntelligence: 'Inteligencia',
    navInsights: 'Insights',
    navContact: 'Contacto',
    navManagers: 'Gestor de fondos',
    navFamily: 'Family Offices',
    navLearn: 'Foro',
    navRequestDemo: 'Solicitar Asesoria',
    heroEyebrow: 'Acceso Institucional',
    heroTitle: 'Conectando capital con gestores verificados.',
    heroLead: 'Inteligencia que mueve capital.',
    heroCtaInvestor: 'Solicitar asesoría de inversión',
    heroCtaManager: 'Postularse como gestor',
    heroTrust1: 'Operación con entidades reguladas',
    heroTrust2: 'Cuentas segregadas y fondos protegidos',
    heroTrust3: 'Reportes mensuales verificados',
    dashboardPerformanceLabel: 'Desempeño del Fondo',
    dashboardRiskLabel: 'Perfil de Riesgo',
    dashboardVolatility: 'Volatilidad',
    dashboardRiskLevel: 'Medio-Bajo',
    dashboardDrawdown: 'Máxima Caída',
    dashboardAUMLabel: 'AUM verificado conectado',
    dashboardAUMSub: 'Con 10 gestores',
    whyEyebrow: 'Propósito Estratégico',
    whyTitle: 'Por qué existe IGATES',
    whyLead: 'Un puente curado entre capital calificado y los gestores que moldean el futuro de los mercados globales.',
    whyCard1Title: 'Datos Verificados',
    whyCard1Body: 'Conjuntos institucionales conciliados entre custodios, administradores y auditorías.',
    whyCard2Title: 'Motor de Due Diligence',
    whyCard2Body: 'Gobernanza, riesgo y cumplimiento automatizados que agilizan onboarding y monitoreo.',
    whyCard3Title: 'Mercado de Estrategias',
    whyCard3Body: 'Descubre gestores curados en crédito, macro, activos digitales y alternativos diferenciados.',
    fundsEyebrow: 'Universo en Vivo',
    fundsTitle: 'Programas de Fondos Destacados',
    fundsLead: 'Perfiles ricos en señales con datos conciliados a diario, listos para revisión de asignadores.',
    fundsLoading: 'Cargando fondos verificados...',
    fundsLoadError: 'No se pudieron cargar los fondos. Inicia el servidor backend.',
    intelligenceEyebrow: 'Tejido de Datos',
    intelligenceTitle: 'Motor de Inteligencia IGATES',
    intelligenceLead: 'Analítica en tiempo real sobre desempeño, exposiciones, corredores de riesgo y preparación de capital.',
    intelligenceBullet1: 'Mapeo dinámico de liquidez',
    intelligenceBullet2: 'Mapas de calor de exposición con detección de anomalías',
    intelligenceBullet3: 'Reportes listos para LP con presets de cumplimiento',
    intelligenceBadge1: 'API Conectada',
    intelligenceBadge2: 'Monitoreo 24/7',
    intelligenceBadge3: 'Listo para SOC2',
    insightsEyebrow: 'Señales',
    insightsTitle: 'Insights de Mercado y Plataforma',
    insightsLead: 'Mini informes de inteligencia para comités de inversión y socios de riesgo.',
    insightsLoading: 'Cargando feed de inteligencia...',
    insightsLoadError: 'No se pudieron cargar los insights. Inicia el servidor backend.',
    learnEyebrow: 'Foro Diario',
    learnTitle: 'Aprender y Comunidad',
    learnLead: 'Briefings y destacados del foro para mantenerte al día cada jornada.',
    learnPost1Title: 'Radar matutino: temas de crédito y macro',
    learnPost1Time: 'Hoy',
    learnPost1Body: 'Principales hilos del foro sobre liquidez cross-asset, riesgo de duración y nuevas coberturas macro.',
    learnPost2Title: 'Destacado de gestor: neutralidad en activos digitales',
    learnPost2Time: 'Actualizado a diario',
    learnPost2Body: 'Resumen diario de notas de riesgo y actualizaciones operativas del desk de activos digitales.',
    learnPost3Title: 'Informe de la comunidad: operaciones y cumplimiento',
    learnPost3Time: 'Esta semana',
    learnPost3Body: 'Preguntas y respuestas del foro sobre onboarding, orden en data rooms y paquetes listos para auditoría.',
    investorsEyebrow: 'Para Inversores',
    investorsTitle: 'Acceso global a talento institucional.',
    investorsItem1: 'Mandatos curados con AUM verificado e historial auditado.',
    investorsItem2: 'Comparables estructurados y analítica de riesgo para aprobaciones más rápidas.',
    investorsItem3: 'Flujos privados de acceso y visibilidad de coinversiones.',
    managersEyebrow: 'Para Gestores',
    managersTitle: 'Distribución diseñada para estrategias de élite.',
    managersItem1: 'Involucra asignadores verificados globalmente con cumplimiento integrado.',
    managersItem2: 'Comparte datos con permisos granulares y marcas de agua.',
    managersItem3: 'Inteligencia de pipeline que prioriza el capital adecuado.',
    complianceEyebrow: 'Cumplimiento Primero',
    complianceTitle: 'Controles de nivel regulatorio en cada paso.',
    complianceBody: 'Infraestructura lista para SOC2, residencia de datos geofijada y permisos en capas protegen información sensible.',
    complianceIdentityTitle: 'Identidad y Acceso',
    complianceIdentityBody: 'MFA, SSO/SAML y resguardo seguro para documentos y NDAs.',
    complianceMonitoringTitle: 'Monitoreo',
    complianceMonitoringBody: 'Registros automáticos, alertas de umbral y cifrado en tránsito y reposo.',
    complianceGovernanceTitle: 'Gobernanza',
    complianceGovernanceBody: 'Políticas preconfiguradas alineadas con estándares institucionales de diligencia.',
    contactEyebrow: 'Hablemos',
    contactTitle: 'Comienza tu proceso de acceso.',
    contactLead: 'Cuéntanos tu mandato o estrategia. Coordinamos data rooms, diligencias y acceso seguro.',
    contactResponseLabel: 'Tiempo de respuesta',
    contactResponseMetric: '< 24 horas',
    contactCoverageLabel: 'Cobertura',
    contactCoverageMetric: 'Asignadores globales',
    contactSecurityLabel: 'Seguridad',
    contactSecurityMetric: 'Listo para SOC2',
    contactNameLabel: 'Nombre',
    contactNamePlaceholder: 'Tu nombre completo',
    contactEmailLabel: 'Correo electrónico',
    contactEmailPlaceholder: 'tu@firma.com',
    contactRoleLabel: 'Rol',
    contactRolePlaceholder: 'Selecciona tu rol',
    contactRoleAllocator: 'Asignador / Inversor',
    contactRoleManager: 'Gestor de Fondos',
    contactRoleOps: 'Operaciones / Cumplimiento',
    contactNotesLabel: 'Notas',
    contactNotesPlaceholder: 'Tamaño del mandato, estrategias, tiempos',
    contactSubmit: 'Solicitar Asesoria',
    contactStatusSending: 'Enviando...',
    contactStatusSuccess: 'Recibimos tu solicitud. Nuestro equipo responderá pronto.',
    contactStatusError: 'No se puede enviar ahora. Confirma que el backend está en ejecución.',
    footerTagline: 'Conectividad de élite para gestores y capital calificado.',
    footerPlatform: 'Plataforma',
    footerOverview: 'Resumen',
    footerFeaturedFunds: 'Fondos Destacados',
    footerIntelligence: 'Inteligencia',
    footerCompany: 'Compañía',
    footerAbout: 'Acerca de',
    footerCompliance: 'Cumplimiento',
    footerCareers: 'Carreras',
    footerContact: 'Contacto',
    footerRequestCall: 'Solicitar llamada',
    footerInvestorRelations: 'Relaciones con Inversores',
    footerRights: '© 2024 IGATES. Todos los derechos reservados.',
    footerPrivacy: 'Privacidad y Seguridad',
    managersHeroEyebrow: 'Para Gestores',
    managersHeroTitle: 'Distribución diseñada para estrategias de élite.',
    managersHeroLead: 'Conéctese con asignadores globales verificados usando la infraestructura institucional de IGATES.',
    managersHeroCta: 'Postularse como gestor',
    managersHeroTrust1: 'Cobertura de asignadores en macro, crédito y digitales',
    managersHeroTrust2: 'Intercambio de datos listo para SOC2',
    managersCardLabel1: 'Mandatos activos',
    managersCardCopy1: 'Asignadores calificados buscando estrategias diferenciadas.',
    managersCardLabel2: 'Tiempo medio de revisión',
    managersCardCopy2: 'El compliance automatizado reduce la fricción administrativa.',
    managersBenefitsEyebrow: 'Beneficios de la Plataforma',
    managersBenefitsTitle: 'Todo lo necesario para escalar pipelines de asignadores.',
    managersBenefit1Title: 'Acceso a asignadores curados',
    managersBenefit1Body: 'Introducciones dirigidas a LPs calificados activos en su clase de estrategia.',
    managersBenefit2Title: 'Data rooms seguros',
    managersBenefit2Body: 'Bóvedas con permisos, marcas de agua y visibilidad de actividad.',
    managersBenefit3Title: 'Flujos de compliance',
    managersBenefit3Body: 'KYC, KYB y gobernanza integrados mantienen la diligencia avanzando.',
    managersBenefit4Title: 'Inteligencia de performance integrada',
    managersBenefit4Body: 'Telemetría automatizada entrega performance y riesgo a LPs.',
    managersOnboardingEyebrow: 'Onboarding',
    managersOnboardingTitle: 'Distribución institucional en cuatro pasos.',
    managersStep1: 'Enviar perfil de estrategia',
    managersStep2: 'Verificación y compliance',
    managersStep3: 'Integración de datos y mapeo de riesgo',
    managersStep4: 'En vivo en el marketplace de asignadores',
    managersFormEyebrow: 'Aplicaciones de Gestores',
    managersFormTitle: 'Postúlese para distribuir en IGATES.',
    managersFormLead: 'Comparta su estrategia y coordinaremos diligencia y onboarding.',
    managersFormResponseLabel: 'Tiempo de respuesta',
    managersFormResponseMetric: '< 48 horas',
    managersFormSecurityLabel: 'Seguridad',
    managersFormSecurityMetric: 'Compliance-first',
    managersFormCoverageLabel: 'Cobertura',
    managersFormCoverageMetric: 'Asignadores globales',
    familyHeroEyebrow: 'Family Offices',
    familyHeroTitle: 'Acceso institucional para family offices modernos.',
    familyHeroLead: 'Simplifique la búsqueda, diligencia y asignación de gestores.',
    familyHeroCta: 'Solicitar acceso',
    familyHeroTrust1: 'Reportes al nivel de los allocators',
    familyHeroTrust2: 'Flujos privados de datos',
    familyCardLabel1: 'Estrategias revisadas',
    familyCardCopy1: 'Inteligencia multi-activo alineada al mandato.',
    familyCardLabel2: 'Archivos de diligencia',
    familyCardCopy2: 'Archivos auditables con actualizaciones automáticas.',
    familyWhyEyebrow: 'Por qué IGATES',
    familyWhyTitle: 'Claridad operativa para los principales decisores.',
    familyWhy1Title: 'Streams de datos verificados',
    familyWhy1Body: 'Reportes alineados con custodio, administrador y auditor.',
    familyWhy2Title: 'Reportes listos para auditoría',
    familyWhy2Body: 'Paquetes listos para IC con atribución completa.',
    familyWhy3Title: 'Revisiones de gestores consolidadas',
    familyWhy3Body: 'Seguimiento comparado de diligencia y señales.',
    familyWhy4Title: 'Analítica de corredores de riesgo',
    familyWhy4Body: 'Bandas de escenario para mantener asignaciones en el mandato.',
    familyCuratedEyebrow: 'Mandatos Curados',
    familyCuratedTitle: 'Visión de asignador en estrategias líderes.',
    familyMandate1: 'Macro',
    familyMandate1Body: 'Gestores macro con corredores de riesgo disciplinados.',
    familyMandate2: 'Crédito',
    familyMandate2Body: 'Crédito estructurado y event-driven con control de exposición.',
    familyMandate3: 'Activos Digitales',
    familyMandate3Body: 'Transparencia on-chain con custodia institucional.',
    familyMandate4: 'Estrategias Sistemáticas',
    familyMandate4Body: 'Sistemas factor-aware con monitoreo de drift y capacidad.',
    familyFormEyebrow: 'Solicitudes de Acceso',
    familyFormTitle: 'Solicite acceso de asignador.',
    familyFormLead: 'Comparta su mandato y habilitaremos acceso seguro a gestores.',
    familyFormResponseLabel: 'Tiempo de respuesta',
    familyFormResponseMetric: '< 24 horas',
    familyFormSecurityLabel: 'Seguridad',
    familyFormSecurityMetric: 'Compliance-first',
    familyFormCoverageLabel: 'Cobertura',
    familyFormCoverageMetric: 'Gestores globales',
    familyFormSubmit: 'Solicitar acceso',
    formNameLabel: 'Nombre',
    formFirmLabel: 'Firma',
    formStrategyLabel: 'Tipo de Estrategia',
    formAumLabel: 'AUM',
    formEmailLabel: 'Correo electrónico',
    formNotesLabel: 'Notas',
    formSubmit: 'Postularse como gestor',
  },
  it: {
    navHome: 'Home',
    navWhy: 'Perché IGATES',
    navFunds: 'In Tendenza',
    navIntelligence: 'Intelligence',
    navInsights: 'Insights',
    navContact: 'Contatti',
    navManagers: 'Gestore di Fondi',
    navFamily: 'Family Offices',
    navLearn: 'Forum',
    navRequestDemo: 'Richiedi Consulenza',
    heroEyebrow: 'Accesso Istituzionale',
    heroTitle: 'Collegare il capitale con gestori verificati.',
    heroLead: 'Intelligenza che muove il capitale.',
    heroCtaInvestor: 'Richiedi consulenza di investimento',
    heroCtaManager: 'Candidati come gestore',
    heroTrust1: 'Operatività con entità regolamentate',
    heroTrust2: 'Conti segregati e fondi protetti',
    heroTrust3: 'Report mensili verificati',
    dashboardPerformanceLabel: 'Performance del Fondo',
    dashboardRiskLabel: 'Profilo di Rischio',
    dashboardVolatility: 'Volatilità',
    dashboardRiskLevel: 'Medio-Basso',
    dashboardDrawdown: 'Massimo Drawdown',
    dashboardAUMLabel: 'AUM verificato connesso',
    dashboardAUMSub: 'Con 10 gestori',
    whyEyebrow: 'Scopo Strategico',
    whyTitle: 'Perché esiste IGATES',
    whyLead: 'Un ponte curato tra capitale qualificato e i gestori che plasmano il futuro dei mercati globali.',
    whyCard1Title: 'Dati Verificati',
    whyCard1Body: 'Dataset istituzionali riconciliati tra depositari, amministratori e revisioni contabili.',
    whyCard2Title: 'Motore di Due Diligence',
    whyCard2Body: 'Governance, rischio e compliance automatizzati che velocizzano onboarding e monitoraggio.',
    whyCard3Title: 'Marketplace di Strategie',
    whyCard3Body: 'Scopri gestori selezionati in credito, macro, asset digitali e alternative differenziate.',
    fundsEyebrow: 'Universo Live',
    fundsTitle: 'Programmi di Fondi in Evidenza',
    fundsLead: 'Profili ricchi di segnali con dati riconciliati quotidianamente, pronti per la revisione degli allocatori.',
    fundsLoading: 'Caricamento dei fondi verificati...',
    fundsLoadError: 'Impossibile caricare i fondi. Avvia il server backend.',
    intelligenceEyebrow: 'Tessuto Dati',
    intelligenceTitle: 'Motore di Intelligence IGATES',
    intelligenceLead: 'Analisi in tempo reale su performance, esposizioni ai fattori, corridoi di rischio e prontezza del capitale.',
    intelligenceBullet1: 'Mappatura dinamica della liquidità',
    intelligenceBullet2: 'Heatmap delle esposizioni con rilevamento anomalie',
    intelligenceBullet3: 'Report pronti per LP con preset di compliance',
    intelligenceBadge1: 'API Connessa',
    intelligenceBadge2: 'Monitoraggio 24/7',
    intelligenceBadge3: 'Pronto per SOC2',
    insightsEyebrow: 'Segnali',
    insightsTitle: 'Insight di Mercato e Piattaforma',
    insightsLead: 'Pillole di intelligence pensate per comitati di investimento e partner di rischio.',
    insightsLoading: 'Caricamento del feed di intelligence...',
    insightsLoadError: 'Impossibile caricare gli insights. Avvia il server backend.',
    learnEyebrow: 'Forum Quotidiano',
    learnTitle: 'Apprendimento e Community',
    learnLead: 'Briefing e highlight del forum per restare aggiornato ogni giorno.',
    learnPost1Title: 'Radar mattutino: temi credito e macro',
    learnPost1Time: 'Oggi',
    learnPost1Body: 'Principali thread del forum su liquidità cross-asset, rischio duration e nuove coperture macro.',
    learnPost2Title: 'Focus gestore: neutralità su asset digitali',
    learnPost2Time: 'Aggiornato ogni giorno',
    learnPost2Body: 'Riepilogo quotidiano di note di rischio e aggiornamenti operativi dal desk digital asset.',
    learnPost3Title: 'Brief della community: operations e compliance',
    learnPost3Time: 'Questa settimana',
    learnPost3Body: 'Q&A del forum su onboarding, ordine nei data room e pacchetti pronti per audit.',
    investorsEyebrow: 'Per Investitori',
    investorsTitle: 'Accesso globale a talento istituzionale.',
    investorsItem1: 'Mandati curati con AUM verificato e storico certificato.',
    investorsItem2: 'Comparabili strutturati e analytics di rischio per approvazioni più rapide.',
    investorsItem3: 'Workflow di accesso privati e visibilità sui coinvestimenti.',
    managersEyebrow: 'Per Gestori',
    managersTitle: 'Distribuzione su misura per strategie di élite.',
    managersItem1: 'Coinvolgi allocatori verificati in tutto il mondo con compliance integrata.',
    managersItem2: 'Condividi dati in sicurezza con permessi granulari e watermark.',
    managersItem3: 'Intelligence di pipeline che dà priorità al capitale giusto.',
    complianceEyebrow: 'Compliance Prima di Tutto',
    complianceTitle: 'Controlli a livello regolatorio in ogni fase.',
    complianceBody: 'Infrastruttura pronta per SOC2, residenza dei dati geolocalizzata e permessi stratificati proteggono le informazioni sensibili.',
    complianceIdentityTitle: 'Identità e Accesso',
    complianceIdentityBody: 'MFA, SSO/SAML e archiviazione sicura per documenti e NDA.',
    complianceMonitoringTitle: 'Monitoraggio',
    complianceMonitoringBody: 'Tracce di audit automatiche, avvisi di soglia e crittografia in transito e a riposo.',
    complianceGovernanceTitle: 'Governance',
    complianceGovernanceBody: 'Policy preconfigurate allineate agli standard istituzionali di due diligence.',
    contactEyebrow: 'Parla con Noi',
    contactTitle: 'Avvia il tuo percorso di accesso.',
    contactLead: 'Raccontaci il tuo mandato o strategia. Coordiniamo data room, richieste di diligence e accesso sicuro.',
    contactResponseLabel: 'Tempo di risposta',
    contactResponseMetric: '< 24 ore',
    contactCoverageLabel: 'Copertura',
    contactCoverageMetric: 'Allocatori globali',
    contactSecurityLabel: 'Sicurezza',
    contactSecurityMetric: 'Pronto per SOC2',
    contactNameLabel: 'Nome',
    contactNamePlaceholder: 'Il tuo nome completo',
    contactEmailLabel: 'Email',
    contactEmailPlaceholder: 'tu@azienda.com',
    contactRoleLabel: 'Ruolo',
    contactRolePlaceholder: 'Seleziona il tuo ruolo',
    contactRoleAllocator: 'Allocatore / Investitore',
    contactRoleManager: 'Gestore di Fondi',
    contactRoleOps: 'Operazioni / Compliance',
    contactNotesLabel: 'Note',
    contactNotesPlaceholder: 'Dimensione mandato, strategie, tempistiche',
    contactSubmit: 'Richiedi Consulenza',
    contactStatusSending: 'Invio in corso...',
    contactStatusSuccess: 'Abbiamo ricevuto la tua richiesta. Ti risponderemo a breve.',
    contactStatusError: 'Impossibile inviare ora. Verifica che il backend sia in esecuzione.',
    footerTagline: 'Connettività di élite per gestori e capitale qualificato.',
    footerPlatform: 'Piattaforma',
    footerOverview: 'Panoramica',
    footerFeaturedFunds: 'Fondi in Evidenza',
    footerIntelligence: 'Intelligence',
    footerCompany: 'Azienda',
    footerAbout: 'Chi siamo',
    footerCompliance: 'Compliance',
    footerCareers: 'Carriere',
    footerContact: 'Contatti',
    footerRequestCall: 'Richiedi una chiamata',
    footerInvestorRelations: 'Relazioni con Investitori',
    footerRights: '© 2024 IGATES. Tutti i diritti riservati.',
    footerPrivacy: 'Privacy e Sicurezza',
    managersHeroEyebrow: 'Per Gestori',
    managersHeroTitle: 'Distribuzione su misura per strategie di élite.',
    managersHeroLead: 'Connettiti con allocatori globali verificati usando l’infrastruttura istituzionale IGATES.',
    managersHeroCta: 'Candidati come gestore',
    managersHeroTrust1: 'Copertura allocatori su macro, credito e digitali',
    managersHeroTrust2: 'Scambio dati pronto per SOC2',
    managersCardLabel1: 'Mandati attivi',
    managersCardCopy1: 'Allocatori qualificati alla ricerca di strategie differenziate.',
    managersCardLabel2: 'Tempo medio di revisione',
    managersCardCopy2: 'Il compliance automatizzato riduce la burocrazia.',
    managersBenefitsEyebrow: 'Benefici della Piattaforma',
    managersBenefitsTitle: 'Tutto ciò che serve per scalare i pipeline di allocatori.',
    managersBenefit1Title: 'Accesso ad allocatori curati',
    managersBenefit1Body: 'Introduzioni mirate a LP qualificati attivi nella tua asset class.',
    managersBenefit2Title: 'Data room sicure',
    managersBenefit2Body: 'Vault con permessi, watermark e visibilità delle attività.',
    managersBenefit3Title: 'Workflow di compliance',
    managersBenefit3Body: 'KYC, KYB e governance integrati mantengono la due diligence veloce.',
    managersBenefit4Title: 'Intelligenza di performance integrata',
    managersBenefit4Body: 'Telemetria automatizzata invia performance e rischio agli LP.',
    managersOnboardingEyebrow: 'Onboarding',
    managersOnboardingTitle: 'Distribuzione istituzionale in quattro passi.',
    managersStep1: 'Invia profilo strategia',
    managersStep2: 'Verifica e compliance',
    managersStep3: 'Integrazione dati e mappatura rischio',
    managersStep4: 'Live nel marketplace per allocatori',
    managersFormEyebrow: 'Candidature Gestori',
    managersFormTitle: 'Candidati per distribuire su IGATES.',
    managersFormLead: 'Condividi la tua strategia e coordineremo diligence e onboarding.',
    managersFormResponseLabel: 'Tempo di risposta',
    managersFormResponseMetric: '< 48 ore',
    managersFormSecurityLabel: 'Sicurezza',
    managersFormSecurityMetric: 'Compliance-first',
    managersFormCoverageLabel: 'Copertura',
    managersFormCoverageMetric: 'Allocatori globali',
    familyHeroEyebrow: 'Family Offices',
    familyHeroTitle: 'Accesso istituzionale per i moderni family office.',
    familyHeroLead: 'Semplifica ricerca, due diligence e workflow di allocazione.',
    familyHeroCta: 'Richiedi accesso',
    familyHeroTrust1: 'Reportistica a livello allocator',
    familyHeroTrust2: 'Flussi di dati privati',
    familyCardLabel1: 'Strategie revisionate',
    familyCardCopy1: 'Intelligenza multi-asset allineata al mandato.',
    familyCardLabel2: 'File di diligence',
    familyCardCopy2: 'Archivi auditabili con aggiornamenti automatici.',
    familyWhyEyebrow: 'Perché IGATES',
    familyWhyTitle: 'Chiarezza operativa per i decisori.',
    familyWhy1Title: 'Stream di dati verificati',
    familyWhy1Body: 'Report allineati a custode, amministratore e revisore.',
    familyWhy2Title: 'Report pronti per audit',
    familyWhy2Body: 'Pacchetti pronti per IC con attribuzione completa.',
    familyWhy3Title: 'Revisioni di gestori consolidate',
    familyWhy3Body: 'Tracker di diligence affiancati con note e segnali.',
    familyWhy4Title: 'Analytics dei corridoi di rischio',
    familyWhy4Body: 'Fasce di scenario per mantenere le allocazioni nel mandato.',
    familyCuratedEyebrow: 'Mandati Curati',
    familyCuratedTitle: 'Visione da allocatore su strategie leader.',
    familyMandate1: 'Macro',
    familyMandate1Body: 'Gestori macro con corridoi di rischio disciplinati.',
    familyMandate2: 'Credito',
    familyMandate2Body: 'Credito strutturato ed event-driven con controllo di esposizione.',
    familyMandate3: 'Asset Digitali',
    familyMandate3Body: 'Trasparenza on-chain con custodia istituzionale.',
    familyMandate4: 'Strategie Sistematiche',
    familyMandate4Body: 'Sistemi factor-aware con monitoraggio di drift e capacità.',
    familyFormEyebrow: 'Richieste di Accesso',
    familyFormTitle: 'Richiedi accesso da allocatore.',
    familyFormLead: 'Raccontaci il tuo mandato e abiliteremo l’accesso sicuro ai gestori.',
    familyFormResponseLabel: 'Tempo di risposta',
    familyFormResponseMetric: '< 24 ore',
    familyFormSecurityLabel: 'Sicurezza',
    familyFormSecurityMetric: 'Compliance-first',
    familyFormCoverageLabel: 'Copertura',
    familyFormCoverageMetric: 'Gestori globali',
    familyFormSubmit: 'Richiedi accesso',
    formNameLabel: 'Nome',
    formFirmLabel: 'Società',
    formStrategyLabel: 'Tipo di strategia',
    formAumLabel: 'AUM',
    formEmailLabel: 'Email',
    formNotesLabel: 'Note',
    formSubmit: 'Candidati come gestore',
  },
  zh: {
    navHome: '首页',
    navWhy: '为什么选择 IGATES',
    navFunds: '热门',
    navIntelligence: '智能引擎',
    navInsights: '洞察',
    navContact: '联系',
    navManagers: '基金经理',
    navFamily: '家族办公室',
    navLearn: '学习',
    navRequestDemo: '申请咨询',
    heroEyebrow: '机构级接入',
    heroTitle: '连接资本与经核验的对冲基金。',
    heroLead: '让智能驱动资本流向。',
    heroCtaInvestor: '申请投资咨询',
    heroCtaManager: '以管理人身份申请',
    heroTrust1: '与受监管机构合作',
    heroTrust2: '隔离账户与资金保护',
    heroTrust3: '经核验的月度报告',
    dashboardPerformanceLabel: '基金表现',
    dashboardRiskLabel: '风险概况',
    dashboardVolatility: '波动率',
    dashboardRiskLevel: '中低',
    dashboardDrawdown: '最大回撤',
    dashboardAUMLabel: '已连接的核验 AUM',
    dashboardAUMSub: '覆盖 10 位管理人',
    whyEyebrow: '战略使命',
    whyTitle: 'IGATES 的意义',
    whyLead: '在合格资本与塑造全球市场未来的管理人之间搭建精选桥梁。',
    whyCard1Title: '数据核验',
    whyCard1Body: '机构级数据集，已在托管行、管理人和审计文件间对账。',
    whyCard2Title: '尽调引擎',
    whyCard2Body: '自动化的治理、风险与合规筛查，加速准入与持续监控。',
    whyCard3Title: '策略集市',
    whyCard3Body: '探索信用、宏观、数字资产及差异化另类策略的精选管理人。',
    fundsEyebrow: '实时宇宙',
    fundsTitle: '精选基金计划',
    fundsLead: '以每日对账的数据支撑的高信号档案，随时供配置人审阅。',
    fundsLoading: '正在加载已核验的基金...',
    fundsLoadError: '无法加载基金。请启动后端服务器。',
    intelligenceEyebrow: '数据织体',
    intelligenceTitle: 'IGATES 智能引擎',
    intelligenceLead: '实时洞察绩效、因子暴露、风险走廊与资本部署就绪度。',
    intelligenceBullet1: '动态流动性地图',
    intelligenceBullet2: '带异常检测的敞口热力图',
    intelligenceBullet3: '带合规预设的 LP 级报告',
    intelligenceBadge1: 'API 已接入',
    intelligenceBadge2: '7×24 监控',
    intelligenceBadge3: '符合 SOC2',
    insightsEyebrow: '信号',
    insightsTitle: '市场与平台洞察',
    insightsLead: '为投委会和风控伙伴设计的精简情报。',
    insightsLoading: '正在加载情报动态...',
    insightsLoadError: '无法加载洞察。请启动后端服务器。',
    learnEyebrow: '每日论坛',
    learnTitle: '学习与社区',
    learnLead: '每日精选简报与论坛亮点，保持持续更新。',
    learnPost1Title: '晨间雷达：信用与宏观话题',
    learnPost1Time: '今天',
    learnPost1Body: '论坛热门讨论涵盖跨资产流动性、久期风险与最新宏观对冲。',
    learnPost2Title: '管理人焦点：数字资产中性策略',
    learnPost2Time: '每日更新',
    learnPost2Body: '数字资产团队的风险提示与运营动态每日速览。',
    learnPost3Title: '社区速递：运营与合规',
    learnPost3Time: '本周',
    learnPost3Body: '论坛问答覆盖上岗清单、数据室规范与审计就绪打包。',
    investorsEyebrow: '面向投资者',
    investorsTitle: '全球获取机构级人才。',
    investorsItem1: '精选 mandate，AUM 已核验且记录经审计。',
    investorsItem2: '结构化对比与风险分析，加快投委批准。',
    investorsItem3: '私密接入流程与共投可见性。',
    managersEyebrow: '面向管理人',
    managersTitle: '为精英策略打造的分销通道。',
    managersItem1: '以内置合规与全球合格配置人互动。',
    managersItem2: '以细粒度权限和水印安全共享数据。',
    managersItem3: '管道情报优先锁定合适的资本。',
    complianceEyebrow: '合规优先',
    complianceTitle: '每一步都具备监管级控制。',
    complianceBody: 'SOC2 级基础设施、地理围栏的数据驻留以及分层权限，保护敏感信息。',
    complianceIdentityTitle: '身份与访问',
    complianceIdentityBody: '多因子认证、SSO/SAML，以及文件与 NDA 的安全保管。',
    complianceMonitoringTitle: '监控',
    complianceMonitoringBody: '自动审计轨迹、阈值告警，传输与存储全程加密。',
    complianceGovernanceTitle: '治理',
    complianceGovernanceBody: '预配置的政策，与机构级尽调标准保持一致。',
    contactEyebrow: '联系我们',
    contactTitle: '开启您的接入流程。',
    contactLead: '告诉我们您的 mandate 或策略。我们会协调数据室、尽调请求与安全访问。',
    contactResponseLabel: '响应时间',
    contactResponseMetric: '< 24 小时',
    contactCoverageLabel: '覆盖',
    contactCoverageMetric: '全球配置人',
    contactSecurityLabel: '安全',
    contactSecurityMetric: '符合 SOC2',
    contactNameLabel: '姓名',
    contactNamePlaceholder: '您的全名',
    contactEmailLabel: '邮箱',
    contactEmailPlaceholder: 'you@firm.com',
    contactRoleLabel: '角色',
    contactRolePlaceholder: '选择您的角色',
    contactRoleAllocator: '配置人 / 投资者',
    contactRoleManager: '基金管理人',
    contactRoleOps: '运营 / 合规',
    contactNotesLabel: '备注',
    contactNotesPlaceholder: 'Mandate 规模、策略、时间',
    contactSubmit: '申请咨询',
    contactStatusSending: '正在发送...',
    contactStatusSuccess: '我们已收到您的请求，稍后将与您联系。',
    contactStatusError: '暂时无法提交。请确认后端已启动。',
    footerTagline: '为基金管理人和合格资本提供精英级连接。',
    footerPlatform: '平台',
    footerOverview: '概览',
    footerFeaturedFunds: '精选基金',
    footerIntelligence: '智能引擎',
    footerCompany: '公司',
    footerAbout: '关于',
    footerCompliance: '合规',
    footerCareers: '招聘',
    footerContact: '联系',
    footerRequestCall: '请求回电',
    footerInvestorRelations: '投资者关系',
    footerRights: '© 2024 IGATES. 版权所有。',
    footerPrivacy: '隐私与安全',
    managersHeroEyebrow: '面向管理人',
    managersHeroTitle: '为精英策略打造的分销通路。',
    managersHeroLead: '依托 IGATES 机构级基础设施连接全球已核验的资本方。',
    managersHeroCta: '申请成为管理人',
    managersHeroTrust1: '覆盖宏观、信用、数字资产等分配需求',
    managersHeroTrust2: 'SOC2 级别的数据交换',
    managersCardLabel1: '在推介的 mandate',
    managersCardCopy1: '合格分配人正在寻找差异化策略。',
    managersCardLabel2: '平均审核时间',
    managersCardCopy2: '自动化合规减少行政摩擦。',
    managersBenefitsEyebrow: '平台优势',
    managersBenefitsTitle: '扩大全球 allocator 管道所需的一切。',
    managersBenefit1Title: '触达精选分配人',
    managersBenefit1Body: '面向活跃 LP 的定向介绍，匹配您的策略类型。',
    managersBenefit2Title: '安全数据室',
    managersBenefit2Body: '带权限、水印与活动可视化的加密资料库。',
    managersBenefit3Title: '合规流程',
    managersBenefit3Body: '内置 KYC、KYB 与治理检查，让尽调不中断。',
    managersBenefit4Title: '内嵌绩效智能',
    managersBenefit4Body: '自动遥测向 LP 推送绩效、风险区间与因子漂移。',
    managersOnboardingEyebrow: '上线步骤',
    managersOnboardingTitle: '四步完成机构级分销。',
    managersStep1: '提交策略档案',
    managersStep2: '核验与合规',
    managersStep3: '数据集成与风险映射',
    managersStep4: '上线 allocator 市场',
    managersFormEyebrow: '管理人申请',
    managersFormTitle: '申请在 IGATES 分销。',
    managersFormLead: '填写策略信息，我们将协调尽调与上线。',
    managersFormResponseLabel: '响应时间',
    managersFormResponseMetric: '< 48 小时',
    managersFormSecurityLabel: '安全',
    managersFormSecurityMetric: '合规优先',
    managersFormCoverageLabel: '覆盖',
    managersFormCoverageMetric: '全球分配人',
    familyHeroEyebrow: '家族办公室',
    familyHeroTitle: '为现代家族办公室提供机构级通道。',
    familyHeroLead: '简化管理人发现、尽调与分配流程。',
    familyHeroCta: '申请访问',
    familyHeroTrust1: 'Allocator 级别报告',
    familyHeroTrust2: '私密数据流',
    familyCardLabel1: '已审阅策略',
    familyCardCopy1: '多资产情报，按 mandate 定制。',
    familyCardLabel2: '尽调文件',
    familyCardCopy2: '可审计档案，自动保持最新。',
    familyWhyEyebrow: '选择 IGATES',
    familyWhyTitle: '为投资决策者带来运营清晰度。',
    familyWhy1Title: '核验数据流',
    familyWhy1Body: '与托管、管理人和审计对齐的报告。',
    familyWhy2Title: '审计就绪的报告',
    familyWhy2Body: '完整归因与差异的 IC 资料包。',
    familyWhy3Title: '合并管理人评审',
    familyWhy3Body: '并排查看尽调跟踪、笔记和信号。',
    familyWhy4Title: '风险走廊分析',
    familyWhy4Body: '基于情景的区间，保持配置在 mandate 内。',
    familyCuratedEyebrow: '精选 mandato',
    familyCuratedTitle: '从分配人视角审视领先策略。',
    familyMandate1: '宏观',
    familyMandate1Body: '纪律化风险走廊的全球宏观管理人。',
    familyMandate2: '信用',
    familyMandate2Body: '事件驱动与结构化信用，实时监控敞口。',
    familyMandate3: '数字资产',
    familyMandate3Body: '链上透明度与机构级托管信号。',
    familyMandate4: '系统化策略',
    familyMandate4Body: '因子敏感的系统，监控模型漂移与容量。',
    familyFormEyebrow: '访问申请',
    familyFormTitle: '申请 allocator 访问。',
    familyFormLead: '告诉我们您的 mandate，我们将开放安全访问。',
    familyFormResponseLabel: '响应时间',
    familyFormResponseMetric: '< 24 小时',
    familyFormSecurityLabel: '安全',
    familyFormSecurityMetric: '合规优先',
    familyFormCoverageLabel: '覆盖',
    familyFormCoverageMetric: '全球管理人',
    familyFormSubmit: '申请访问',
    formNameLabel: '姓名',
    formFirmLabel: '机构',
    formStrategyLabel: '策略类型',
    formAumLabel: '管理规模',
    formEmailLabel: '邮箱',
    formNotesLabel: '备注',
    formSubmit: '申请成为管理人',
  },
};

let currentLanguage = 'en';

function getStrings(lang = currentLanguage) {
  return translations[lang] || translations.en;
}

function updateLanguageToggleLabel(lang) {
  const toggle = document.getElementById('languageToggle');
  if (toggle) {
    const shortLabel = languageOptions[lang]?.shortLabel || 'EN';
    toggle.textContent = `${shortLabel} ▾`;
  }
}

function markActiveLanguage(lang) {
  const menu = document.getElementById('languageMenu');
  if (!menu) return;
  menu.querySelectorAll('[data-lang]').forEach((item) => {
    const isActive = item.dataset.lang === lang;
    item.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

function applyTranslations(lang) {
  const strings = getStrings(lang);
  document.documentElement.lang = languageOptions[lang]?.locale || 'en';

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const value = strings[key];
    if (!value) return;

    const attr = element.dataset.i18nAttr;
    if (attr) {
      element.setAttribute(attr, value);
    } else {
      element.textContent = value;
    }
  });

  updateLanguageToggleLabel(lang);
  markActiveLanguage(lang);
}

function closeLanguageMenu() {
  const toggle = document.getElementById('languageToggle');
  const menu = document.getElementById('languageMenu');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
  if (menu) menu.classList.remove('open');
}

function setLanguage(lang) {
  const resolved = translations[lang] ? lang : 'en';
  currentLanguage = resolved;
  localStorage.setItem('preferredLanguage', resolved);
  applyTranslations(resolved);
}

function initLanguageSwitcher() {
  const toggle = document.getElementById('languageToggle');
  const menu = document.getElementById('languageMenu');
  if (!toggle || !menu) return;

  const storedLanguage = localStorage.getItem('preferredLanguage');
  const browserLanguage = navigator.language ? navigator.language.slice(0, 2).toLowerCase() : 'en';
  const initialLanguage = storedLanguage || (translations[browserLanguage] ? browserLanguage : 'en');
  setLanguage(initialLanguage);

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      closeLanguageMenu();
    } else {
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  menu.querySelectorAll('[data-lang]').forEach((item) => {
    item.addEventListener('click', () => {
      const lang = item.dataset.lang;
      setLanguage(lang);
      closeLanguageMenu();
    });
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      closeLanguageMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLanguageMenu();
    }
  });
}

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
    const strings = getStrings();
    if (grid) grid.innerHTML = `<p class="loading" data-i18n="fundsLoadError">${strings.fundsLoadError}</p>`;
    if (list) list.innerHTML = `<p class="loading" data-i18n="insightsLoadError">${strings.insightsLoadError}</p>`;
  }
}

function attachContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = getStrings().contactStatusSending;

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

      status.textContent = getStrings().contactStatusSuccess;
      form.reset();
    } catch (error) {
      console.error(error);
      status.textContent = getStrings().contactStatusError;
    }
  });
}

function handleFormSubmission(formId, statusId, endpoint) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form || !status) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    status.textContent = 'Sending...';

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${apiBase}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Request failed');

      status.textContent = 'Submitted!';
      console.log(`${endpoint} submitted`, payload);
      form.reset();
    } catch (error) {
      console.error(error);
      status.textContent = 'Unable to submit right now.';
    }
  });
}

function enableSmoothAnchors() {
  document.querySelectorAll('a[href*="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const url = new URL(link.href, window.location.href);

      const samePage =
        url.pathname === window.location.pathname ||
        (url.pathname.endsWith('index.html') && window.location.pathname === '/');

      if (!samePage || !url.hash) {
        return;
      }

      const target = document.querySelector(url.hash);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', url.hash);
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  enableSmoothAnchors();
  loadPageData();
  attachContactForm();
  handleFormSubmission('managerForm', 'managerStatus', '/manager-apply');
  handleFormSubmission('familyForm', 'familyStatus', '/request-access');
});
