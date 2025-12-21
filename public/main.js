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
    navIntelligence: 'Intelligence',
    navInsights: 'Insights',
    navContact: 'Contact',
    navManagers: 'Fund Manager',
    navFamily: 'Family Offices',
    navLearn: 'Learn',
    navRequestDemo: 'Request Advisory',
    navAuth: 'Sign Up / Log In',
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
    whyLead: 'A curated bridge between qualified capital and private managers with verified track records.',
    whyCard1Title: 'Audited accounts and verified capital',
    whyCard1Body: 'We only work with funds that show more than 12 months of audited history, operating real capital with regulated custodians and entities.',
    whyCard1Badge: '12+ months of audited track record',
    whyCard2Title: 'Ongoing guidance and risk control',
    whyCard2Body: 'Active support during onboarding and throughout the investment cycle. We deliver monthly reports and align risk-level adjustments between investors and private managers.',
    whyCard2Flow1: 'Onboarding',
    whyCard2Flow2: 'Investment',
    whyCard2Flow3: 'Reporting',
    whyCard2Flow4: 'Risk adjustments',
    whyCard3Title: 'Global managers and diversified strategies',
    whyCard3Body: 'Access private managers across regions operating credit, macro, digital assets, and alternative strategies. Select the fund that matches your profile and confidence level.',
    whyCard3Tag1: 'Credit',
    whyCard3Tag2: 'Macro',
    whyCard3Tag3: 'Digital Assets',
    whyCard3Tag4: 'Alternatives',
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
    navIntelligence: 'Inteligência',
    navInsights: 'Insights',
    navContact: 'Contato',
    navManagers: 'Gestor de Fundos',
    navFamily: 'Family Offices',
    navLearn: 'Aprender',
    navRequestDemo: 'Solicitar Assessoria',
    navAuth: 'Cadastro / Login',
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
    whyLead: 'Uma ponte curada entre capital qualificado e gestores privados com histórico verificado.',
    whyCard1Title: 'Contas auditadas e capital verificado',
    whyCard1Body: 'Trabalhamos apenas com fundos que apresentam mais de 12 meses de histórico auditado, operando capital real com custodiante e entidades reguladas.',
    whyCard1Badge: '12+ meses de track record auditado',
    whyCard2Title: 'Acompanhamento contínuo e controle de risco',
    whyCard2Body: 'Suporte ativo durante o onboarding e em todo o ciclo de investimento. Entregamos relatórios mensais e ajustamos o nível de risco em consenso entre investidores e gestores privados.',
    whyCard2Flow1: 'Onboarding',
    whyCard2Flow2: 'Investimento',
    whyCard2Flow3: 'Relatórios',
    whyCard2Flow4: 'Ajustes de risco',
    whyCard3Title: 'Gestores globais e estratégias diversificadas',
    whyCard3Body: 'Acesso a gestores privados em diferentes regiões, operando crédito, macro, ativos digitais e estratégias alternativas. Escolha o fundo que se adapta ao seu perfil e nível de confiança.',
    whyCard3Tag1: 'Crédito',
    whyCard3Tag2: 'Macro',
    whyCard3Tag3: 'Ativos Digitais',
    whyCard3Tag4: 'Alternativos',
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
    managersEyebrow: 'Para Gestores Privados',
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
    managersHeroEyebrow: 'Para Gestores Privados',
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
    managersFormEyebrow: 'Aplicações de Gestores Privados',
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
    familyMandate1Body: 'Gestores Privados macro com corredores de risco disciplinados.',
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
    familyFormCoverageMetric: 'Gestores Privados globais',
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
    navIntelligence: 'Inteligencia',
    navInsights: 'Insights',
    navContact: 'Contacto',
    navManagers: 'Gestor de fondos',
    navFamily: 'Family Offices',
    navLearn: 'Foro',
    navRequestDemo: 'Solicitar Asesoria',
    navAuth: 'Registro / Ingreso',
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
    whyLead: 'Un puente curado entre capital calificado y gestores privados con historial verificado.',
    whyCard1Title: 'Cuentas auditadas y capital verificado',
    whyCard1Body: 'Trabajamos exclusivamente con fondos que cuentan con más de 12 meses de historial auditado, operando capital real bajo custodios y entidades reguladas.',
    whyCard1Badge: '12+ meses de track record auditado',
    whyCard2Title: 'Acompañamiento continuo y control de riesgo',
    whyCard2Body: 'Soporte activo durante el onboarding y a lo largo del ciclo de inversión. Entregamos reportes mensuales y realizamos ajustes de nivel de riesgo en consenso entre inversionistas y gestores privados.',
    whyCard2Flow1: 'Onboarding',
    whyCard2Flow2: 'Inversión',
    whyCard2Flow3: 'Reportes',
    whyCard2Flow4: 'Ajustes de riesgo',
    whyCard3Title: 'Gestores globales y estrategias diversificadas',
    whyCard3Body: 'Acceso a gestores privados en distintas regiones del mundo, operando crédito, macro, activos digitales y estrategias alternativas. Elige el fondo que mejor se adapte a tu perfil y nivel de confianza.',
    whyCard3Tag1: 'Crédito',
    whyCard3Tag2: 'Macro',
    whyCard3Tag3: 'Digital Assets',
    whyCard3Tag4: 'Alternativos',
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
    managersEyebrow: 'Para Gestores Privados',
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
    managersHeroEyebrow: 'Para Gestores Privados',
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
    managersFormEyebrow: 'Aplicaciones de Gestores Privados',
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
    familyMandate1Body: 'Gestores Privados macro con corredores de riesgo disciplinados.',
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
    familyFormCoverageMetric: 'Gestores Privados globales',
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
    navIntelligence: 'Intelligence',
    navInsights: 'Insights',
    navContact: 'Contatti',
    navManagers: 'Gestore di Fondi',
    navFamily: 'Family Offices',
    navLearn: 'Forum',
    navRequestDemo: 'Richiedi Consulenza',
    navAuth: 'Registrati / Accedi',
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
    whyLead: 'Un ponte curato tra capitale qualificato e gestori privati con track record verificato.',
    whyCard1Title: 'Conti auditati e capitale verificato',
    whyCard1Body: 'Lavoriamo solo con fondi che presentano oltre 12 mesi di storico auditato, gestendo capitale reale con depositari ed entità regolamentate.',
    whyCard1Badge: '12+ mesi di track record auditato',
    whyCard2Title: 'Accompagnamento continuo e controllo del rischio',
    whyCard2Body: "Supporto attivo durante l'onboarding e in tutto il ciclo di investimento. Forniamo report mensili e adeguiamo il livello di rischio in consenso tra investitori e gestori privati.",
    whyCard2Flow1: 'Onboarding',
    whyCard2Flow2: 'Investimento',
    whyCard2Flow3: 'Report',
    whyCard2Flow4: 'Adeguamenti di rischio',
    whyCard3Title: 'Gestori globali e strategie diversificate',
    whyCard3Body: 'Accesso a gestori privati in diverse regioni che operano credito, macro, asset digitali e strategie alternative. Scegli il fondo che meglio si adatta al tuo profilo e alla tua fiducia.',
    whyCard3Tag1: 'Credito',
    whyCard3Tag2: 'Macro',
    whyCard3Tag3: 'Asset Digitali',
    whyCard3Tag4: 'Alternativi',
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
    navIntelligence: '智能引擎',
    navInsights: '洞察',
    navContact: '联系',
    navManagers: '基金经理',
    navFamily: '家族办公室',
    navLearn: '学习',
    navRequestDemo: '申请咨询',
    navAuth: '注册 / 登录',
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
    whyLead: '在合格资本与具有验证业绩的私人管理人之间搭建精选桥梁。',
    whyCard1Title: '已审计账户与验证资本',
    whyCard1Body: '我们只合作具备超过12个月审计历史、在受监管托管行和机构下运作真实资金的基金。',
    whyCard1Badge: '12+个月审计业绩记录',
    whyCard2Title: '持续陪伴与风险控制',
    whyCard2Body: '从准入到整个投资周期提供主动支持。按月交付报告，并在投资人和私人管理人之间共识调整风险水平。',
    whyCard2Flow1: '准入',
    whyCard2Flow2: '投资',
    whyCard2Flow3: '报告',
    whyCard2Flow4: '风险调整',
    whyCard3Title: '全球管理人与多元策略',
    whyCard3Body: '连接全球各地区的私人管理人，覆盖信用、宏观、数字资产与另类策略。选择与您风险偏好和信任度匹配的基金。',
    whyCard3Tag1: '信用',
    whyCard3Tag2: '宏观',
    whyCard3Tag3: '数字资产',
    whyCard3Tag4: '另类',
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



const MASTER_USER = {
  username: 'Sebastian_ACY',
  password: 'dB9(NP1O',
  role: 'MasterUser',
};

const STRATEGY_OPTIONS = [
  { label: 'Forex', value: 'FOREX' },
  { label: 'Indices & Macro', value: 'INDICES_MACRO' },
  { label: 'Commodities & Metales', value: 'COMMODITIES_METALES' },
  { label: 'Equities CFDs', value: 'EQUITIES_CFD' },
  { label: 'Crypto Assets', value: 'CRYPTO_ASSETS' },
  { label: 'Multi-Assets', value: 'MULTI_ASSETS' },
];

const SURVEY_DEFINITIONS = {
  Investor: [
    {
      id: 'objective',
      label: 'Investment Objective',
      type: 'single',
      options: [
        { label: 'Preservación de capital', value: 'Preservación de capital' },
        { label: 'Crecimiento moderado', value: 'Crecimiento moderado' },
        { label: 'Crecimiento agresivo', value: 'Crecimiento agresivo' },
        { label: 'Diversificación patrimonial', value: 'Diversificación patrimonial' },
        { label: 'Generación de ingresos', value: 'Generación de ingresos' },
      ],
    },
    {
      id: 'horizon',
      label: 'Investment Horizon',
      type: 'single',
      options: [
        { label: 'Menos de 6 meses', value: 'Menos de 6 meses' },
        { label: 'Entre 6 meses y 1 año', value: 'Entre 6 meses y 1 año' },
        { label: '1 a 3 años', value: '1 a 3 años' },
        { label: 'Más de 3 años', value: 'Más de 3 años' },
      ],
    },
    {
      id: 'riskLevel',
      label: 'Risk Tolerance',
      type: 'single',
      options: [
        { label: 'Conservador', value: 'Conservador' },
        { label: 'Moderado', value: 'Moderado' },
        { label: 'Balanceado', value: 'Balanceado' },
        { label: 'Agresivo', value: 'Agresivo' },
      ],
    },
    {
      id: 'strategyPreferences',
      label: 'Preferred Strategy / Assets',
      type: 'multi',
      options: STRATEGY_OPTIONS,
    },
    {
      id: 'reportingFrequency',
      label: 'Reporting Frequency',
      type: 'single',
      options: [
        { label: 'Mensual', value: 'Mensual' },
        { label: 'Trimestral', value: 'Trimestral' },
        { label: 'Solo eventos relevantes', value: 'Solo eventos relevantes' },
      ],
    },
  ],
  'Fund Manager': [
    {
      id: 'strategyType',
      label: 'Primary Strategy / Assets',
      type: 'single',
      options: STRATEGY_OPTIONS,
    },
    {
      id: 'capitalStatus',
      label: 'Capital Status',
      type: 'single',
      options: [
        { label: 'Opero con capital propio', value: 'Opero con capital propio' },
        { label: 'Opero con capital de terceros', value: 'Opero con capital de terceros' },
        { label: 'En transición hacia capital de terceros', value: 'En transición hacia capital de terceros' },
        { label: 'Track record en desarrollo', value: 'Track record en desarrollo' },
      ],
    },
    {
      id: 'trackRecordLength',
      label: 'Verifiable Track Record Length',
      type: 'single',
      options: [
        { label: 'Menos de 12 meses', value: 'Menos de 12 meses' },
        { label: '12 – 24 meses', value: '12 – 24 meses' },
        { label: '24 – 36 meses', value: '24 – 36 meses' },
        { label: 'Más de 36 meses', value: 'Más de 36 meses' },
      ],
    },
    {
      id: 'operatingStructure',
      label: 'Operating Structure',
      type: 'single',
      options: [
        { label: 'Cuenta segregada', value: 'Cuenta segregada' },
        { label: 'Managed Account (MAM / PAMM)', value: 'Managed Account (MAM / PAMM)' },
        { label: 'Vehículo privado (SPV / fondo privado)', value: 'Vehículo privado (SPV / fondo privado)' },
        { label: 'En proceso de estructuración', value: 'En proceso de estructuración' },
      ],
    },
    {
      id: 'strategyDescription',
      label: 'Strategy Description',
      type: 'text',
      prompt:
        'Describe tu estrategia en 2–4 líneas. Incluye instrumentos operados, horizonte típico y cómo gestionas el riesgo.',
    },
  ],
  'Family Office': [
    {
      id: 'managementRole',
      label: 'Desired Role in Investment Management',
      type: 'single',
      options: [
        { label: 'Supervisión estratégica', value: 'Supervisión estratégica' },
        { label: 'Selección activa de gestores', value: 'Selección activa de gestores' },
        { label: 'Delegación con reporting periódico', value: 'Delegación con reporting periódico' },
      ],
    },
    {
      id: 'diversificationLevel',
      label: 'Desired Diversification Level',
      type: 'single',
      options: [
        { label: '1–2 fondos', value: '1–2 fondos' },
        { label: '3–5 fondos', value: '3–5 fondos' },
        { label: 'Más de 5 fondos', value: 'Más de 5 fondos' },
      ],
    },
    {
      id: 'strategyPreferences',
      label: 'Preferred Strategy / Assets',
      type: 'multi',
      options: STRATEGY_OPTIONS,
    },
    {
      id: 'interactionLevel',
      label: 'Interaction Level with Managers',
      type: 'single',
      options: [
        { label: 'Reportes únicamente', value: 'Reportes únicamente' },
        { label: 'Comunicación ocasional', value: 'Comunicación ocasional' },
        { label: 'Acceso directo y recurrente', value: 'Acceso directo y recurrente' },
      ],
    },
    {
      id: 'reportingCustomization',
      label: 'Reporting Customization Level',
      type: 'single',
      options: [
        { label: 'Básico', value: 'Básico' },
        { label: 'Personalizado', value: 'Personalizado' },
        { label: 'Totalmente a medida', value: 'Totalmente a medida' },
      ],
    },
  ],
};

const STORAGE_KEYS = {
  profiles: 'igatesUserProfiles',
  session: 'igatesCurrentSession',
  notifications: 'igatesMasterNotifications',
  fundApplications: 'igatesFundApplications',
};

function getStrategyLabel(value) {
  return STRATEGY_OPTIONS.find((option) => option.value === value)?.label || value;
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Unable to read ${key}`, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getStoredProfiles() {
  return readStorage(STORAGE_KEYS.profiles, []);
}

function saveStoredProfiles(profiles) {
  writeStorage(STORAGE_KEYS.profiles, profiles);
}

function getSession() {
  return readStorage(STORAGE_KEYS.session, null);
}

function setSession(session) {
  writeStorage(STORAGE_KEYS.session, session);
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session);
}

function getCurrentProfile() {
  const session = getSession();
  if (!session || session.role === 'MasterUser') return null;
  const profiles = getStoredProfiles();
  return profiles.find((profile) => profile.id === session.id) || null;
}

function updateProfile(updatedProfile) {
  const profiles = getStoredProfiles();
  const nextProfiles = profiles.map((profile) =>
    profile.id === updatedProfile.id ? updatedProfile : profile,
  );
  saveStoredProfiles(nextProfiles);
  return updatedProfile;
}

function addMasterNotification(notification) {
  const notifications = readStorage(STORAGE_KEYS.notifications, []);
  notifications.unshift(notification);
  writeStorage(STORAGE_KEYS.notifications, notifications);
}

function updateAuthLinks() {
  const session = getSession();
  document.querySelectorAll('.auth-link').forEach((link) => {
    if (!session) {
      link.textContent = 'Sign Up / Log In';
      link.href = 'auth.html';
      return;
    }

    if (session.role === 'MasterUser') {
      link.textContent = 'Master Dashboard';
      link.href = 'master-dashboard.html';
      return;
    }

    link.textContent = 'My Profile';
    link.href = 'profile.html';
  });
}

function buildSurveySteps(questions) {
  const groups = [];
  for (let index = 0; index < questions.length; index += 2) {
    groups.push(questions.slice(index, index + 2));
  }
  return groups;
}

function renderQuestion(question, value) {
  const optionsMarkup =
    question.type === 'text'
      ? `<textarea name="${question.id}" rows="3" placeholder="${question.prompt}">${value || ''}</textarea>`
      : `<div class="choice-grid">${question.options
          .map((option) => {
            const isMulti = question.type === 'multi';
            const inputType = isMulti ? 'checkbox' : 'radio';
            const isChecked = isMulti
              ? Array.isArray(value) && value.includes(option.value)
              : value === option.value;
            return `
              <label class="choice-card">
                <input type="${inputType}" name="${question.id}" value="${option.value}" ${
              isChecked ? 'checked' : ''
            } />
                <span>${option.label}</span>
              </label>
            `;
          })
          .join('')}</div>`;

  return `
    <div class="question-block">
      <span class="question-label">${question.label}</span>
      ${question.type === 'text' ? `<p class="small">${question.prompt}</p>` : ''}
      ${optionsMarkup}
    </div>
  `;
}

function initAuthPage() {
  const signupForm = document.getElementById('signupForm');
  if (!signupForm) return;

  const signupPanel = document.getElementById('signupPanel');
  const loginPanel = document.getElementById('loginPanel');
  const signupProgress = document.getElementById('signupProgress');
  const signupActions = document.getElementById('signupActions');
  const signupStatus = document.getElementById('signupStatus');
  const loginForm = document.getElementById('loginForm');
  const loginStatus = document.getElementById('loginStatus');

  document.querySelectorAll('[data-auth-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.authTab;
      document.querySelectorAll('[data-auth-tab]').forEach((item) => {
        item.classList.toggle('is-active', item === tab);
        item.setAttribute('aria-selected', item === tab ? 'true' : 'false');
      });
      signupPanel.classList.toggle('is-hidden', target !== 'signup');
      loginPanel.classList.toggle('is-hidden', target !== 'login');
    });
  });

  const signupState = {
    stepIndex: 0,
    role: null,
    steps: [],
    answers: {
      kyc: {},
      survey: {},
    },
  };

  function buildSteps() {
    const role = signupState.role;
    const surveyQuestions = role ? SURVEY_DEFINITIONS[role] : [];
    signupState.steps = [
      { type: 'kyc' },
      ...buildSurveySteps(surveyQuestions).map((group) => ({ type: 'survey', questions: group })),
    ];
  }

  function renderKycStep() {
    const { kyc } = signupState.answers;
    signupForm.innerHTML = `
      <label>
        <span>Nombre completo</span>
        <input type="text" name="fullName" placeholder="Nombre y apellido" value="${
          kyc.fullName || ''
        }" required />
      </label>
      <label>
        <span>Email</span>
        <input type="email" name="email" placeholder="tu@email.com" value="${
          kyc.email || ''
        }" required />
      </label>
      <label>
        <span>Teléfono</span>
        <input type="tel" name="phone" placeholder="+34 600 000 000" value="${
          kyc.phone || ''
        }" required />
      </label>
      <label>
        <span>País</span>
        <input type="text" name="country" placeholder="País" value="${
          kyc.country || ''
        }" required />
      </label>
      <label>
        <span>Tipo de perfil</span>
        <select name="role" required>
          <option value="">Selecciona un perfil</option>
          ${Object.keys(SURVEY_DEFINITIONS)
            .map(
              (roleOption) =>
                `<option value="${roleOption}" ${
                  signupState.role === roleOption ? 'selected' : ''
                }>${roleOption}</option>`,
            )
            .join('')}
        </select>
      </label>
      <label>
        <span>Contraseña</span>
        <input type="password" name="password" placeholder="Crea una contraseña" value="${
          kyc.password || ''
        }" required />
      </label>
    `;
  }

  function renderSurveyStep(questions) {
    const { survey } = signupState.answers;
    signupForm.innerHTML = questions.map((question) => renderQuestion(question, survey[question.id])).join('');
  }

  function renderStep() {
    if (!signupState.steps.length) buildSteps();
    const currentStep = signupState.steps[signupState.stepIndex];
    const totalSteps = signupState.role ? signupState.steps.length : 4;
    signupProgress.textContent = `Step ${signupState.stepIndex + 1} of ${totalSteps}`;
    signupStatus.textContent = '';

    if (currentStep.type === 'kyc') {
      renderKycStep();
    } else {
      renderSurveyStep(currentStep.questions);
    }

    signupActions.innerHTML = '';
    const backButton = document.createElement('button');
    backButton.type = 'button';
    backButton.className = 'btn btn-secondary';
    backButton.textContent = 'Back';
    backButton.disabled = signupState.stepIndex === 0;

    const nextButton = document.createElement('button');
    nextButton.type = 'button';
    nextButton.className = 'btn btn-primary';
    nextButton.textContent =
      signupState.stepIndex === signupState.steps.length - 1 ? 'Complete onboarding' : 'Next';

    signupActions.appendChild(backButton);
    signupActions.appendChild(nextButton);

    backButton.addEventListener('click', () => {
      signupState.stepIndex = Math.max(0, signupState.stepIndex - 1);
      renderStep();
    });

    nextButton.addEventListener('click', () => {
      if (!collectStepAnswers(currentStep)) return;
      if (signupState.stepIndex === signupState.steps.length - 1) {
        completeSignup();
        return;
      }
      signupState.stepIndex += 1;
      renderStep();
    });
  }

  function collectStepAnswers(step) {
    if (step.type === 'kyc') {
      const formData = new FormData(signupForm);
      const payload = Object.fromEntries(formData.entries());
      const requiredFields = ['fullName', 'email', 'phone', 'country', 'role', 'password'];
      const missing = requiredFields.filter((field) => !payload[field]);
      if (missing.length) {
        signupStatus.textContent = 'Completa todos los campos para continuar.';
        return false;
      }
      signupState.answers.kyc = payload;
      signupState.role = payload.role;
      buildSteps();
      return true;
    }

    const answers = { ...signupState.answers.survey };
    let isValid = true;
    step.questions.forEach((question) => {
      if (question.type === 'multi') {
        const selections = [...signupForm.querySelectorAll(`input[name="${question.id}"]:checked`)].map(
          (input) => input.value,
        );
        answers[question.id] = selections;
        if (!selections.length) isValid = false;
        return;
      }

      if (question.type === 'text') {
        const value = signupForm.querySelector(`textarea[name="${question.id}"]`)?.value.trim() || '';
        answers[question.id] = value;
        if (!value) isValid = false;
        return;
      }

      const value = signupForm.querySelector(`input[name="${question.id}"]:checked`)?.value;
      answers[question.id] = value || '';
      if (!value) isValid = false;
    });

    if (!isValid) {
      signupStatus.textContent = 'Responde todas las preguntas para continuar.';
      return false;
    }

    signupState.answers.survey = answers;
    return true;
  }

  function completeSignup() {
    const profiles = getStoredProfiles();
    const { kyc, survey } = signupState.answers;

    if (profiles.some((profile) => profile.email.toLowerCase() === kyc.email.toLowerCase())) {
      signupStatus.textContent = 'Este email ya está registrado.';
      return;
    }

    const profileId = `profile-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
    const baseProfile = {
      id: profileId,
      fullName: kyc.fullName,
      email: kyc.email,
      phone: kyc.phone,
      country: kyc.country,
      role: signupState.role,
      password: kyc.password,
      onboarding: {
        role: signupState.role,
        completedAt: new Date().toISOString(),
      },
    };

    if (signupState.role === 'Investor') {
      const preferences = {
        objective: survey.objective,
        horizon: survey.horizon,
        riskLevel: survey.riskLevel,
        strategyPreferences: survey.strategyPreferences,
        reportingFrequency: survey.reportingFrequency,
      };
      baseProfile.investorPreferences = preferences;
      baseProfile.onboarding.investorPreferences = preferences;
      baseProfile.waitlistFunds = [];
    }

    if (signupState.role === 'Fund Manager') {
      const managerProfile = {
        strategyType: survey.strategyType,
        strategyTypeLabel: getStrategyLabel(survey.strategyType),
        capitalStatus: survey.capitalStatus,
        trackRecordLength: survey.trackRecordLength,
        operatingStructure: survey.operatingStructure,
        strategyDescription: survey.strategyDescription,
        status: 'pending-review',
      };
      baseProfile.fundManagerProfile = managerProfile;
      baseProfile.onboarding.fundManagerProfile = managerProfile;
      addMasterNotification({
        id: `notif-${Date.now()}`,
        type: 'fund-manager-profile',
        title: 'Nuevo gestor pendiente',
        message: `${baseProfile.fullName} envió su perfil de gestor.`,
        createdAt: new Date().toISOString(),
      });
    }

    if (signupState.role === 'Family Office') {
      const familyPreferences = {
        managementRole: survey.managementRole,
        diversificationLevel: survey.diversificationLevel,
        strategyPreferences: survey.strategyPreferences,
        interactionLevel: survey.interactionLevel,
        reportingCustomization: survey.reportingCustomization,
      };
      baseProfile.familyOfficePreferences = familyPreferences;
      baseProfile.onboarding.familyOfficePreferences = familyPreferences;
    }

    saveStoredProfiles([...profiles, baseProfile]);
    setSession({ id: profileId, role: baseProfile.role });

    if (baseProfile.role === 'Investor') {
      window.location.href = 'funds-explore.html';
      return;
    }

    if (baseProfile.role === 'Fund Manager') {
      window.location.href = 'pending-review.html';
      return;
    }

    if (baseProfile.role === 'Family Office') {
      window.location.href = 'family-dashboard.html';
    }
  }

  renderStep();

  loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    loginStatus.textContent = '';
    const formData = new FormData(loginForm);
    const identifier = String(formData.get('identifier') || '').trim();
    const password = String(formData.get('password') || '').trim();

    if (!identifier || !password) {
      loginStatus.textContent = 'Ingresa tus credenciales.';
      return;
    }

    if (identifier === MASTER_USER.username && password === MASTER_USER.password) {
      setSession({ role: 'MasterUser', username: MASTER_USER.username });
      window.location.href = 'master-dashboard.html';
      return;
    }

    const profiles = getStoredProfiles();
    const match = profiles.find(
      (profile) => profile.email.toLowerCase() === identifier.toLowerCase() && profile.password === password,
    );

    if (!match) {
      loginStatus.textContent = 'Credenciales inválidas.';
      return;
    }

    setSession({ id: match.id, role: match.role });
    window.location.href = 'profile.html';
  });
}

function formatStrategyList(values) {
  if (!values || !values.length) return '—';
  return values.map((value) => getStrategyLabel(value)).join(', ');
}

function initProfilePage() {
  const profileContent = document.getElementById('profileContent');
  const profileOverview = document.getElementById('profileOverview');
  if (!profileContent || !profileOverview) return;

  const profile = getCurrentProfile();
  if (!profile) {
    profileContent.innerHTML = '<div class="status-banner">Inicia sesión para ver tu perfil.</div>';
    return;
  }

  document.getElementById('profileName').textContent = profile.fullName;
  document.getElementById('profileRole').textContent = profile.role;
  document.getElementById('profileSubtitle').textContent = profile.email;

  profileOverview.innerHTML = `
    <div class="profile-card">
      <p class="small">Email</p>
      <p><strong>${profile.email}</strong></p>
    </div>
    <div class="profile-card">
      <p class="small">Teléfono</p>
      <p><strong>${profile.phone}</strong></p>
    </div>
    <div class="profile-card">
      <p class="small">País</p>
      <p><strong>${profile.country}</strong></p>
    </div>
    <div class="profile-card">
      <p class="small">Estado</p>
      <span class="status-pill ${profile.role === 'Fund Manager' ? 'warning' : 'success'}">${
        profile.role === 'Fund Manager' ? profile.fundManagerProfile?.status || 'Pendiente' : 'Activo'
      }</span>
    </div>
  `;

  const actions = `
    <div class="profile-actions">
      <a class="btn btn-secondary" href="index.html">Volver al inicio</a>
      <button class="btn btn-primary" type="button" id="logoutButton">Cerrar sesión</button>
    </div>
  `;

  if (profile.role === 'Investor') {
    profileContent.innerHTML = `
      <div class="profile-card">
        <h3>Preferencias del inversionista</h3>
        <div class="data-list">
          <span><strong>Objetivo:</strong> ${profile.investorPreferences?.objective || '—'}</span>
          <span><strong>Horizonte:</strong> ${profile.investorPreferences?.horizon || '—'}</span>
          <span><strong>Riesgo:</strong> ${profile.investorPreferences?.riskLevel || '—'}</span>
          <span><strong>Estrategias:</strong> ${formatStrategyList(
            profile.investorPreferences?.strategyPreferences,
          )}</span>
          <span><strong>Reporting:</strong> ${profile.investorPreferences?.reportingFrequency || '—'}</span>
        </div>
      </div>
      <div class="profile-card">
        <h3>Lista de espera</h3>
        <div class="data-list">
          ${(profile.waitlistFunds || []).length ? profile.waitlistFunds.map((fund) => `<span>• ${fund}</span>`).join('') : '<span>Sin fondos aún.</span>'}
        </div>
        <div class="profile-actions">
          <a class="btn btn-primary" href="funds-explore.html">Explorar fondos</a>
        </div>
      </div>
      ${actions}
    `;
  }

  if (profile.role === 'Fund Manager') {
    profileContent.innerHTML = `
      <div class="profile-card">
        <h3>Perfil del gestor</h3>
        <div class="data-list">
          <span><strong>Estrategia:</strong> ${profile.fundManagerProfile?.strategyTypeLabel || '—'}</span>
          <span><strong>Capital:</strong> ${profile.fundManagerProfile?.capitalStatus || '—'}</span>
          <span><strong>Track record:</strong> ${profile.fundManagerProfile?.trackRecordLength || '—'}</span>
          <span><strong>Estructura:</strong> ${profile.fundManagerProfile?.operatingStructure || '—'}</span>
          <span><strong>Descripción:</strong> ${profile.fundManagerProfile?.strategyDescription || '—'}</span>
        </div>
      </div>
      <div class="profile-card">
        <h3>Registrar fondo</h3>
        <form class="inline-form" id="fundRegistrationForm">
          <label>
            <span>Nombre del fondo</span>
            <input type="text" name="fundName" placeholder="Nombre del fondo" required />
          </label>
          <label>
            <span>País</span>
            <input type="text" name="country" placeholder="País" required />
          </label>
          <label>
            <span>Región</span>
            <input type="text" name="region" placeholder="LatAm, EU, Global" required />
          </label>
          <label>
            <span>AUM estimado</span>
            <input type="text" name="aum" placeholder="$250M" required />
          </label>
          <label>
            <span>Estrategia principal</span>
            <select name="strategy" required>
              <option value="">Selecciona una estrategia</option>
              ${STRATEGY_OPTIONS.map((option) => `<option value="${option.value}">${option.label}</option>`).join('')}
            </select>
          </label>
          <label>
            <span>Descripción breve</span>
            <textarea name="description" rows="3" placeholder="Resumen del fondo y foco operativo" required></textarea>
          </label>
          <button class="btn btn-primary" type="submit">Enviar a revisión</button>
          <p class="form-status" id="fundRegistrationStatus" aria-live="polite"></p>
        </form>
      </div>
      ${actions}
    `;

    const fundForm = document.getElementById('fundRegistrationForm');
    const fundStatus = document.getElementById('fundRegistrationStatus');
    fundForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      fundStatus.textContent = '';
      const formData = new FormData(fundForm);
      const payload = Object.fromEntries(formData.entries());
      if (!payload.fundName || !payload.country || !payload.region || !payload.aum || !payload.strategy) {
        fundStatus.textContent = 'Completa todos los campos requeridos.';
        return;
      }
      const applications = readStorage(STORAGE_KEYS.fundApplications, []);
      const application = {
        id: `fund-${Date.now()}`,
        fundName: payload.fundName,
        country: payload.country,
        region: payload.region,
        aum: payload.aum,
        strategy: payload.strategy,
        strategyLabel: getStrategyLabel(payload.strategy),
        description: payload.description,
        status: 'pending',
        managerId: profile.id,
        submittedAt: new Date().toISOString(),
      };
      applications.unshift(application);
      writeStorage(STORAGE_KEYS.fundApplications, applications);
      addMasterNotification({
        id: `notif-${Date.now()}`,
        type: 'fund-registration',
        title: 'Nuevo fondo en revisión',
        message: `${profile.fullName} registró ${payload.fundName}.`,
        createdAt: new Date().toISOString(),
      });
      fundStatus.textContent = 'Fondo enviado a revisión.';
      fundForm.reset();
    });
  }

  if (profile.role === 'Family Office') {
    profileContent.innerHTML = `
      <div class="profile-card">
        <h3>Preferencias Family Office</h3>
        <div class="data-list">
          <span><strong>Rol:</strong> ${profile.familyOfficePreferences?.managementRole || '—'}</span>
          <span><strong>Diversificación:</strong> ${profile.familyOfficePreferences?.diversificationLevel || '—'}</span>
          <span><strong>Estrategias:</strong> ${formatStrategyList(
            profile.familyOfficePreferences?.strategyPreferences,
          )}</span>
          <span><strong>Interacción:</strong> ${profile.familyOfficePreferences?.interactionLevel || '—'}</span>
          <span><strong>Reporting:</strong> ${profile.familyOfficePreferences?.reportingCustomization || '—'}</span>
        </div>
      </div>
      <div class="profile-card">
        <h3>Acceso directo</h3>
        <div class="data-list">
          <span>• Chat directo con gestores verificados</span>
          <span>• Canal preferente con MasterUser</span>
          <span>• Informes personalizados por fondo</span>
        </div>
        <div class="profile-actions">
          <a class="btn btn-primary" href="family-dashboard.html">Ir al dashboard</a>
        </div>
      </div>
      ${actions}
    `;
  }

  const logoutButton = document.getElementById('logoutButton');
  logoutButton?.addEventListener('click', () => {
    clearSession();
    window.location.href = 'auth.html';
  });
}

function initPendingReviewPage() {
  const container = document.getElementById('pendingReviewContent');
  if (!container) return;
  const profile = getCurrentProfile();
  if (!profile || profile.role !== 'Fund Manager') {
    container.innerHTML = '<div class="status-banner">Inicia sesión como gestor para ver este panel.</div>';
    return;
  }

  const applications = readStorage(STORAGE_KEYS.fundApplications, []);
  const myApplications = applications.filter((item) => item.managerId === profile.id);
  container.innerHTML = `
    <div class="profile-grid">
      <div class="profile-card">
        <h3>Perfil</h3>
        <p class="small">Estado de onboarding</p>
        <span class="status-pill warning">${profile.fundManagerProfile?.status || 'Pendiente'}</span>
        <p class="small">Revisión por MasterUser.</p>
      </div>
      <div class="profile-card">
        <h3>Fondos registrados</h3>
        <div class="data-list">
          ${myApplications.length ? myApplications.map((item) => `<span>• ${item.fundName} (${item.status})</span>`).join('') : '<span>No hay fondos registrados.</span>'}
        </div>
      </div>
    </div>
  `;
}

async function initFundsExplorePage() {
  const grid = document.getElementById('exploreFundGrid');
  if (!grid) return;
  const profile = getCurrentProfile();
  if (!profile || profile.role !== 'Investor') {
    grid.innerHTML = '<div class="status-banner">Inicia sesión como inversionista para ver los fondos.</div>';
    return;
  }

  try {
    const funds = await fetchJson('/funds');
    grid.innerHTML = '';
    funds.forEach((fund) => {
      const card = document.createElement('div');
      card.className = 'fund-card';
      const isWaitlisted = profile.waitlistFunds?.includes(fund.name);
      card.innerHTML = `
        <div class="fund-card__header">
          <div>
            <p class="fund-card__name">${fund.name}</p>
            <div class="fund-card__meta">
              <span class="badge">${fund.strategy}</span>
              <span class="badge">${fund.domicile}</span>
            </div>
          </div>
          <span class="badge">${fund.status}</span>
        </div>
        <p class="fund-card__description">${fund.summary}</p>
        <div class="fund-card__tags">
          <span class="tag subtle">AUM ${fund.aum}</span>
          <span class="tag subtle">${fund.performance}</span>
        </div>
        <div class="profile-actions">
          <button class="btn btn-primary" type="button" data-fund-name="${fund.name}">
            ${isWaitlisted ? 'En waitlist' : 'Unirse a waitlist'}
          </button>
        </div>
      `;
      const button = card.querySelector('button');
      button.addEventListener('click', () => {
        const waitlist = new Set(profile.waitlistFunds || []);
        if (waitlist.has(fund.name)) {
          waitlist.delete(fund.name);
        } else {
          waitlist.add(fund.name);
        }
        profile.waitlistFunds = Array.from(waitlist);
        updateProfile(profile);
        button.textContent = waitlist.has(fund.name) ? 'En waitlist' : 'Unirse a waitlist';
      });
      grid.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    grid.innerHTML = '<div class="status-banner">No se pudieron cargar los fondos.</div>';
  }
}

function initFamilyDashboardPage() {
  const container = document.getElementById('familyDashboardContent');
  if (!container) return;
  const profile = getCurrentProfile();
  if (!profile || profile.role !== 'Family Office') {
    container.innerHTML = '<div class="status-banner">Inicia sesión como Family Office.</div>';
    return;
  }

  container.innerHTML = `
    <div class="profile-grid">
      <div class="profile-card">
        <h3>Mandato activo</h3>
        <div class="data-list">
          <span><strong>Rol:</strong> ${profile.familyOfficePreferences?.managementRole || '—'}</span>
          <span><strong>Diversificación:</strong> ${profile.familyOfficePreferences?.diversificationLevel || '—'}</span>
          <span><strong>Estrategias:</strong> ${formatStrategyList(
            profile.familyOfficePreferences?.strategyPreferences,
          )}</span>
        </div>
      </div>
      <div class="profile-card">
        <h3>Interacción y reporting</h3>
        <div class="data-list">
          <span><strong>Nivel de interacción:</strong> ${profile.familyOfficePreferences?.interactionLevel || '—'}</span>
          <span><strong>Reporting:</strong> ${profile.familyOfficePreferences?.reportingCustomization || '—'}</span>
          <span>Acceso directo con gestores y MasterUser activo.</span>
        </div>
      </div>
      <div class="profile-card">
        <h3>Acciones rápidas</h3>
        <div class="profile-actions">
          <a class="btn btn-primary" href="gestores-verificados.html">Ver gestores verificados</a>
          <a class="btn btn-secondary" href="profile.html">Ver perfil</a>
        </div>
      </div>
    </div>
  `;
}

function initMasterDashboard() {
  const pendingContainer = document.getElementById('masterPendingApplications');
  const summaryContainer = document.getElementById('masterSurveySummaries');
  const notificationsContainer = document.getElementById('masterNotifications');
  if (!pendingContainer || !summaryContainer || !notificationsContainer) return;

  const session = getSession();
  if (!session || session.role !== 'MasterUser') {
    notificationsContainer.innerHTML = '<div class="status-banner">Acceso exclusivo para MasterUser.</div>';
    return;
  }

  const notifications = readStorage(STORAGE_KEYS.notifications, []);
  notificationsContainer.innerHTML = notifications.length
    ? `
      <div class="profile-grid">
        ${notifications
          .slice(0, 4)
          .map(
            (note) => `
          <div class="profile-card">
            <p class="small">${new Date(note.createdAt).toLocaleString()}</p>
            <h3>${note.title}</h3>
            <p class="small">${note.message}</p>
          </div>
        `,
          )
          .join('')}
      </div>
    `
    : '<div class="status-banner">Sin notificaciones pendientes.</div>';

  const profiles = getStoredProfiles();
  const pendingManagers = profiles.filter(
    (profile) => profile.role === 'Fund Manager' && profile.fundManagerProfile?.status === 'pending-review',
  );
  const fundApplications = readStorage(STORAGE_KEYS.fundApplications, []);
  const pendingFunds = fundApplications.filter((item) => item.status === 'pending');

  pendingContainer.innerHTML = [
    ...pendingManagers.map(
      (manager) => `
        <div class="dashboard-card">
          <span class="status-pill warning">Gestor pendiente</span>
          <h3>${manager.fullName}</h3>
          <p class="small">${manager.email}</p>
          <p class="small">${manager.fundManagerProfile?.strategyTypeLabel}</p>
          <button class="btn btn-primary" type="button" data-approve-manager="${manager.id}">Aprobar perfil</button>
        </div>
      `,
    ),
    ...pendingFunds.map(
      (fund) => `
        <div class="dashboard-card">
          <span class="status-pill warning">Fondo pendiente</span>
          <h3>${fund.fundName}</h3>
          <p class="small">${fund.strategyLabel} · ${fund.region}</p>
          <button class="btn btn-primary" type="button" data-approve-fund="${fund.id}">Aprobar fondo</button>
        </div>
      `,
    ),
  ].join('');

  pendingContainer.querySelectorAll('[data-approve-manager]').forEach((button) => {
    button.addEventListener('click', () => {
      const managerId = button.dataset.approveManager;
      const updatedProfiles = profiles.map((profile) => {
        if (profile.id !== managerId) return profile;
        return {
          ...profile,
          fundManagerProfile: {
            ...profile.fundManagerProfile,
            status: 'verified',
          },
        };
      });
      saveStoredProfiles(updatedProfiles);
      addMasterNotification({
        id: `notif-${Date.now()}`,
        type: 'manager-approved',
        title: 'Perfil aprobado',
        message: 'Un gestor fue aprobado por MasterUser.',
        createdAt: new Date().toISOString(),
      });
      initMasterDashboard();
    });
  });

  pendingContainer.querySelectorAll('[data-approve-fund]').forEach((button) => {
    button.addEventListener('click', () => {
      const fundId = button.dataset.approveFund;
      const updatedApplications = fundApplications.map((application) =>
        application.id === fundId ? { ...application, status: 'verified' } : application,
      );
      writeStorage(STORAGE_KEYS.fundApplications, updatedApplications);
      addMasterNotification({
        id: `notif-${Date.now()}`,
        type: 'fund-approved',
        title: 'Fondo aprobado',
        message: 'Un fondo fue aprobado para gestores verificados.',
        createdAt: new Date().toISOString(),
      });
      initMasterDashboard();
    });
  });

  summaryContainer.innerHTML = profiles.length
    ? profiles
        .map((profile) => {
          const isInvestor = profile.role === 'Investor';
          const isManager = profile.role === 'Fund Manager';
          const isFamily = profile.role === 'Family Office';
          const summary = isInvestor
            ? `Objetivo: ${profile.investorPreferences?.objective || '—'}<br />Riesgo: ${
                profile.investorPreferences?.riskLevel || '—'
              }<br />Estrategias: ${formatStrategyList(profile.investorPreferences?.strategyPreferences)}`
            : isManager
              ? `Estrategia: ${profile.fundManagerProfile?.strategyTypeLabel || '—'}<br />Capital: ${
                  profile.fundManagerProfile?.capitalStatus || '—'
                }<br />Track record: ${profile.fundManagerProfile?.trackRecordLength || '—'}`
              : `Rol: ${profile.familyOfficePreferences?.managementRole || '—'}<br />Diversificación: ${
                  profile.familyOfficePreferences?.diversificationLevel || '—'
                }<br />Estrategias: ${formatStrategyList(profile.familyOfficePreferences?.strategyPreferences)}`;
          return `
            <div class="dashboard-card">
              <span class="status-pill success">${profile.role}</span>
              <h3>${profile.fullName}</h3>
              <p class="small">${profile.email}</p>
              <p class="small">${summary}</p>
            </div>
          `;
        })
        .join('')
    : '<div class="status-banner">No hay perfiles registrados aún.</div>';
}
window.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  enableSmoothAnchors();
  loadPageData();
  attachContactForm();
  handleFormSubmission('managerForm', 'managerStatus', '/manager-apply');
  handleFormSubmission('familyForm', 'familyStatus', '/request-access');
  updateAuthLinks();
  initAuthPage();
  initProfilePage();
  initPendingReviewPage();
  initFundsExplorePage();
  initFamilyDashboardPage();
  initMasterDashboard();
});
