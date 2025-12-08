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
    navFunds: 'Featured Funds',
    navIntelligence: 'Intelligence',
    navInsights: 'Insights',
    navContact: 'Contact',
    navRequestDemo: 'Request Demo',
    heroEyebrow: 'Institutional Access',
    heroTitle: 'Where High-Performing Managers Meet Global Capital.',
    heroLead:
      'Institutional-grade connectivity built for elite fund managers and qualified investors. Curated intelligence, verified data, and frictionless access to performance.',
    heroCtaInvestor: 'Request Investor Access',
    heroCtaManager: 'Apply as a Manager',
    heroTrust1: 'Real-time fund telemetry',
    heroTrust2: 'Pre-built compliance controls',
    heroTrust3: 'LP-ready reporting',
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
    contactSubmit: 'Request Demo',
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
  },
  pt: {
    navHome: 'Início',
    navWhy: 'Por que a IGATES',
    navFunds: 'Fundos em Destaque',
    navIntelligence: 'Inteligência',
    navInsights: 'Insights',
    navContact: 'Contato',
    navRequestDemo: 'Solicitar Demonstração',
    heroEyebrow: 'Acesso Institucional',
    heroTitle: 'Onde gestores de alta performance encontram capital global.',
    heroLead:
      'Conectividade em nível institucional para gestores de ponta e investidores qualificados. Inteligência curada, dados verificados e acesso sem atrito ao desempenho.',
    heroCtaInvestor: 'Solicitar acesso de investidor',
    heroCtaManager: 'Aplicar como gestor',
    heroTrust1: 'Telemetria de fundos em tempo real',
    heroTrust2: 'Controles de compliance prontos',
    heroTrust3: 'Relatórios prontos para LPs',
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
    contactSubmit: 'Solicitar Demonstração',
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
  },
  es: {
    navHome: 'Inicio',
    navWhy: 'Por qué IGATES',
    navFunds: 'Fondos Destacados',
    navIntelligence: 'Inteligencia',
    navInsights: 'Insights',
    navContact: 'Contacto',
    navRequestDemo: 'Solicitar Demo',
    heroEyebrow: 'Acceso Institucional',
    heroTitle: 'Donde los gestores de alto rendimiento se encuentran con capital global.',
    heroLead:
      'Conectividad de nivel institucional para gestores de élite e inversores calificados. Inteligencia curada, datos verificados y acceso sin fricción al desempeño.',
    heroCtaInvestor: 'Solicitar acceso de inversor',
    heroCtaManager: 'Postularse como gestor',
    heroTrust1: 'Telemetría de fondos en tiempo real',
    heroTrust2: 'Controles de cumplimiento preconfigurados',
    heroTrust3: 'Reportes listos para LPs',
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
    contactSubmit: 'Solicitar Demo',
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
  },
  it: {
    navHome: 'Home',
    navWhy: 'Perché IGATES',
    navFunds: 'Fondi in Evidenza',
    navIntelligence: 'Intelligence',
    navInsights: 'Insights',
    navContact: 'Contatti',
    navRequestDemo: 'Richiedi Demo',
    heroEyebrow: 'Accesso Istituzionale',
    heroTitle: 'Dove i gestori ad alte prestazioni incontrano il capitale globale.',
    heroLead:
      'Connettività di livello istituzionale per gestori di élite e investitori qualificati. Intelligenza curata, dati verificati e accesso senza attriti alle performance.',
    heroCtaInvestor: 'Richiedi accesso investitore',
    heroCtaManager: 'Candidati come gestore',
    heroTrust1: 'Telemetria dei fondi in tempo reale',
    heroTrust2: 'Controlli di compliance preconfigurati',
    heroTrust3: 'Report pronti per LP',
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
    contactSubmit: 'Richiedi Demo',
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
  },
  zh: {
    navHome: '首页',
    navWhy: '为什么选择 IGATES',
    navFunds: '精选基金',
    navIntelligence: '智能引擎',
    navInsights: '洞察',
    navContact: '联系',
    navRequestDemo: '申请演示',
    heroEyebrow: '机构级接入',
    heroTitle: '让高绩效管理人连接全球资本。',
    heroLead: '为顶尖基金管理人和合格投资者打造的机构级连接。精选情报、已核验的数据，以及顺畅的业绩获取通道。',
    heroCtaInvestor: '申请投资者访问',
    heroCtaManager: '以管理人身份申请',
    heroTrust1: '实时基金遥测',
    heroTrust2: '预置合规控制',
    heroTrust3: 'LP 级别报告',
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
    contactSubmit: '申请演示',
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

window.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  loadPageData();
  attachContactForm();
});
