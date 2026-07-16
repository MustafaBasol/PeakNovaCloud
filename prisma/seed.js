/*
 * Seeds professional Salesforce-consulting content for PeakNova, in EN/TR/FR.
 * Idempotent: skips rows that already exist for a given language/section/slug,
 * so operator edits made from the dashboard are never overwritten.
 * Usage: node prisma/seed.js  (DATABASE_URL must be set)
 */
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required to run the seed')
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const LANGS = ['en', 'tr', 'fr']

const SERVICE_META = [
  { slug: 'sales-cloud', name: 'Sales Cloud', icon: 'MdOutlineSell', color: 'sales' },
  { slug: 'service-cloud', name: 'Service Cloud', icon: 'RiCustomerService2Line', color: 'service' },
  { slug: 'marketing-cloud', name: 'Marketing Cloud', icon: 'FaComments', color: 'marketing' },
  { slug: 'commerce-cloud', name: 'Commerce Cloud', icon: 'FaShoppingCart', color: 'commerce' },
  { slug: 'tableau-analytics', name: 'Tableau Analytics', icon: 'BsFillBarChartFill', color: 'tableau' },
  { slug: 'einstein-ai', name: 'Einstein AI', icon: 'MdSmartToy', color: 'einstein' },
  { slug: 'mulesoft-integration', name: 'MuleSoft Integration', icon: 'TbHexagonLetterMFilled', color: 'mulesoft' },
  { slug: 'slack', name: 'Slack', icon: 'FaSlack', color: 'slack' },
]

// ---------------------------------------------------------------------------
// EN
// ---------------------------------------------------------------------------
const en = {
  seo: {
    home: {
      slug: 'seo-home-en',
      title: 'PeakNova | Professional Salesforce Consulting Services',
      description: 'PeakNova helps growing businesses implement, customize, and get more value from Salesforce — from Sales Cloud to Einstein AI.',
      keywords: ['Salesforce consulting', 'Salesforce implementation', 'Salesforce customization', 'Salesforce integration', 'Salesforce managed services', 'Sales Cloud', 'Service Cloud', 'Marketing Cloud', 'Einstein AI'],
      ogTitle: 'PeakNova | Professional Salesforce Consulting Services',
      ogDescription: 'Certified Salesforce consultants helping teams implement, integrate, and optimize their CRM.',
    },
    about: {
      slug: 'seo-about-en',
      title: 'About PeakNova | Salesforce Consulting Partner',
      description: 'Learn about PeakNova, a Salesforce consulting partner focused on practical, measurable CRM outcomes.',
      keywords: ['about PeakNova', 'Salesforce partner', 'Salesforce consultancy'],
    },
    blogs: {
      slug: 'seo-blogs-en',
      title: 'Salesforce Insights & News | PeakNova Blog',
      description: 'Practical guides and updates on Salesforce implementation, automation, and best practice.',
      keywords: ['Salesforce blog', 'Salesforce news', 'Salesforce best practices'],
    },
  },
  logos: SERVICE_META.map((s) => ({
    ...s,
    description: {
      'sales-cloud': 'Pipeline visibility, forecasting, and automation that help your sales team close more, faster.',
      'service-cloud': 'Unified case management and self-service tools that turn support into a competitive advantage.',
      'marketing-cloud': 'Journeys, segmentation, and campaign automation that connect with customers at the right moment.',
      'commerce-cloud': 'Unified B2B and B2C storefronts connected directly to your CRM and fulfillment data.',
      'tableau-analytics': 'Dashboards and reporting that turn raw CRM data into decisions your team can act on.',
      'einstein-ai': 'Predictive scoring, generative assistance, and AI-driven recommendations built into your workflows.',
      'mulesoft-integration': 'API-led integration connecting Salesforce to your ERP, finance, and legacy systems.',
      'slack': 'Slack-first workflows that bring deals, cases, and approvals into the tools your team already uses.',
    }[s.slug],
  })),
  pageContent: {
    'home-hero': {
      title: 'Salesforce, implemented the right way',
      description: 'PeakNova is a Salesforce consulting partner helping growing teams configure, integrate, and automate their CRM — so it actually gets used.',
      buttonText: 'Book a consultation',
      image: 'office-workers-2.jpg',
    },
    'home-problem': {
      title: 'Where most Salesforce projects go wrong',
      description: 'CRM rollouts fail for predictable reasons. We are built around fixing exactly these.',
      cards: [
        { Icon: 'MdOutlinePersonSearch', title: 'Low adoption', description: 'Teams revert to spreadsheets when Salesforce is not built around how they actually work.', color: 'sales' },
        { Icon: 'MdOutlineSecurity', title: 'Fragile customizations', description: 'Ad-hoc configuration breaks with every release and turns into technical debt.', color: 'service' },
        { Icon: 'RiGlobalLine', title: 'Disconnected systems', description: 'Data trapped in silos means your CRM is never the single source of truth it should be.', color: 'mulesoft' },
        { Icon: 'FaChartArea', title: 'No visibility', description: 'Without the right reporting, leadership is making decisions on gut feel, not data.', color: 'tableau' },
      ],
    },
    'home-info1': {
      image: 'about-action.jpg',
      title: 'Certified consultants, not just contractors',
      description: 'Our team holds Salesforce certifications across Sales Cloud, Service Cloud, and Platform Development, so recommendations come from real hands-on experience, not guesswork.',
    },
    'home-info2': {
      image: 'info-two.jpg',
      title: 'Built to be maintained, not just delivered',
      description: 'We document every configuration and follow Salesforce\'s own architecture guidelines, so your admin team can own the platform after we hand it off.',
    },
    'home-action': {
      title: 'Ready to see what a well-run Salesforce org feels like?',
      buttonText: 'Talk to our team',
      image: 'talk.svg',
      color: 'primary',
    },
    'home-contact': {
      title: 'Tell us about your project',
      description: 'Share a few details and a PeakNova consultant will follow up within one business day.',
    },
    'about-hero': {
      title: 'A consulting partner that stays accountable after go-live',
      description: 'PeakNova was founded to close the gap between Salesforce\'s potential and how it actually gets used day to day.',
      buttonText: 'Get in touch',
      image: 'about.jpg',
    },
    'about-team': {
      title: 'How we work',
      description: 'A small set of principles that shape every engagement, from a two-week configuration to a multi-cloud rollout.',
      cards: [
        { title: 'Discovery first', description: 'We map your existing process before touching a single configuration screen.' },
        { title: 'Iterative delivery', description: 'You see working functionality in weeks, not months, with feedback built into every sprint.' },
        { title: 'Knowledge transfer', description: 'Documentation and admin training are part of every project, not an afterthought.' },
        { title: 'Long-term support', description: 'We stay engaged after launch to tune, extend, and troubleshoot as your org grows.' },
      ],
    },
    'about-action': {
      title: 'Certified across the Salesforce platform',
      description: 'From Sales Cloud configuration to Apex development and MuleSoft integration, our team covers the full stack your business needs.',
      buttonText: 'See our services',
      image: 'about-action.jpg',
    },
    'about-contact': {
      title: 'Let\'s talk about your Salesforce org',
      description: 'Whether you are starting from scratch or fixing a rollout gone wrong, we would like to hear about it.',
    },
    'project-hero': {
      title: 'Representative Salesforce solutions',
      description: 'A sample of the kind of Salesforce work we do — implementation, integration, and platform modernization across industries.',
      image: 'red.jpg',
    },
    'project-step': {
      title: 'How a typical engagement runs',
      cards: [
        { Icon: 'MdOutlinePersonSearch', title: 'Discovery & scoping', description: 'We audit your current setup and define clear, measurable success criteria.', color: 'sales' },
        { Icon: 'GiScales', title: 'Build & configure', description: 'Iterative sprints deliver working functionality you can test as we go.', color: 'einstein' },
        { Icon: 'MdOutlineSecurity', title: 'Launch & support', description: 'We handle rollout, training, and stay on for post-launch tuning.', color: 'service' },
      ],
    },
    'project-image': {
      image: 'bg-1.png',
      cards: [
        { id: 'p1', Icon: 'FaChartLine', title: 'Sales pipeline overhaul', description: 'Rebuilt forecasting and opportunity stages for a distribution business.' },
        { id: 'p2', Icon: 'RiCustomerService2Line', title: 'Support desk consolidation', description: 'Migrated three support tools into a single Service Cloud console.' },
        { id: 'p3', Icon: 'TbHexagonLetterMFilled', title: 'ERP integration', description: 'Connected Salesforce to a legacy ERP with MuleSoft APIs.' },
      ],
    },
    'project-project': {
      title: 'Example engagements',
    },
    'project-contact': {
      title: 'Have a similar project in mind?',
      description: 'Tell us what you are trying to solve and we will walk you through how we would approach it.',
    },
    'blogs-hero': {
      title: 'Latest news from Salesforce',
      description: 'Practical insights on implementation, automation, and getting more from your CRM.',
    },
    'blogs-contact': {
      title: 'Have a Salesforce question?',
      description: 'Reach out and one of our consultants will get back to you.',
    },
    'single-contact': {
      title: 'Enjoyed this article?',
      description: 'Talk to us about how this applies to your own Salesforce org.',
    },
  },
  about: [
    { title: 'Our mission', description: 'To make Salesforce implementations that teams actually want to use — built around real workflows, not just best-practice checklists.' },
    { title: 'Our approach', description: 'We combine certified technical expertise with hands-on discovery, so every configuration decision traces back to a business reason.' },
    { title: 'Our commitment', description: 'We stay engaged after go-live. A Salesforce org is never really "done" — it should evolve with your business.' },
  ],
  faq: [
    { question: 'What Salesforce clouds do you work with?', answer: 'We work across Sales Cloud, Service Cloud, Marketing Cloud, Commerce Cloud, Tableau, Einstein AI, MuleSoft, and Slack integrations.' },
    { question: 'Do you work with businesses that are new to Salesforce?', answer: 'Yes. We handle everything from first-time implementations to optimizing an existing, heavily customized org.' },
    { question: 'How long does a typical implementation take?', answer: 'A focused Sales Cloud rollout can take four to six weeks; multi-cloud projects with integrations typically run two to four months.' },
    { question: 'Do you offer ongoing support after launch?', answer: 'Yes, we offer managed support plans for admin tasks, troubleshooting, and incremental enhancements after go-live.' },
    { question: 'Can you integrate Salesforce with our existing systems?', answer: 'Yes. We use MuleSoft and native APIs to connect Salesforce with ERP, finance, marketing, and legacy systems.' },
    { question: 'Do you provide user training?', answer: 'Every engagement includes admin and end-user training, plus documentation your team can reference afterward.' },
    { question: 'Are your consultants Salesforce certified?', answer: 'Yes, our team holds active certifications across Sales Cloud, Service Cloud, and Salesforce Platform Development.' },
    { question: 'How do we get started?', answer: 'Book a consultation through the contact form — we will schedule a discovery call to understand your goals before proposing an approach.' },
  ],
  projects: [
    { name: 'distribution-sales-cloud', title: 'Sales Cloud rollout for a distribution company', description: 'Replaced a spreadsheet-driven sales process with a fully configured Sales Cloud pipeline, cutting quote turnaround time significantly.', image: 'project1.png' },
    { name: 'support-service-cloud', title: 'Service Cloud consolidation', description: 'Migrated three disconnected support tools into a single Service Cloud console with omni-channel routing.', image: 'project2.png' },
    { name: 'erp-mulesoft-integration', title: 'ERP integration with MuleSoft', description: 'Built a real-time integration between Salesforce and a legacy ERP system, eliminating manual data entry.', image: 'project1.png' },
    { name: 'marketing-automation', title: 'Marketing Cloud journey automation', description: 'Designed automated customer journeys that increased campaign engagement and reduced manual campaign work.', image: 'project2.png' },
  ],
  blogs: [
    {
      slug: 'why-salesforce-implementations-fail',
      title: 'Why Salesforce Implementations Fail (and How to Avoid It)',
      summary: 'The most common reasons Salesforce rollouts stall after launch — and the fixes that actually work.',
      coverImage: 'action.jpg',
      content: [
        { type: 'paragraph', text: 'Most failed Salesforce projects are not failures of the platform — they are failures of process. Teams configure Salesforce around a theoretical ideal instead of how people actually sell, support, or market.' },
        { type: 'heading', text: 'Start with discovery, not configuration' },
        { type: 'paragraph', text: 'Before opening Setup, map your current process end to end. Every field, automation, and page layout should trace back to a real step someone takes today.' },
        { type: 'heading', text: 'Adoption is a design problem' },
        { type: 'paragraph', text: 'If your team has to leave Salesforce to get their job done, they will. The fix is rarely more training — it is usually a simpler, faster-to-use configuration.' },
      ],
    },
    {
      slug: 'sales-cloud-vs-service-cloud',
      title: 'Sales Cloud vs. Service Cloud: Which Do You Need First?',
      summary: 'A practical breakdown of when to start with Sales Cloud, Service Cloud, or both together.',
      coverImage: 'about-action.jpg',
      content: [
        { type: 'paragraph', text: 'Sales Cloud and Service Cloud share a data model, but they solve different problems — one is built around pipeline, the other around case resolution.' },
        { type: 'heading', text: 'Start where the pain is' },
        { type: 'paragraph', text: 'If your sales team is tracking deals in spreadsheets, start with Sales Cloud. If support tickets are scattered across email and a helpdesk tool, Service Cloud comes first.' },
      ],
    },
    {
      slug: 'getting-started-with-einstein-ai',
      title: 'Getting Started with Einstein AI in Salesforce',
      summary: 'What Einstein AI actually does out of the box, and where it delivers value fastest.',
      coverImage: 'info-two.jpg',
      content: [
        { type: 'paragraph', text: 'Einstein AI is not one feature — it is a set of predictive and generative capabilities layered across Sales, Service, and Marketing Cloud.' },
        { type: 'heading', text: 'Where to start' },
        { type: 'paragraph', text: 'Lead scoring and case classification tend to deliver the fastest, most measurable wins before moving on to generative use cases.' },
      ],
    },
  ],
}

// Templates reused across every service page (kept generic enough to hold up
// per service, with the service name interpolated in).
function serviceContent(lang, svc) {
  const name = svc.name
  if (lang === 'en') {
    return {
      hero: {
        title: `${name} Consulting & Implementation`,
        description: `We help you configure ${name} around how your team actually works — from first-time setup to fixing a rollout gone wrong.`,
        buttonText: 'Request a consultation',
        image: 'questions.svg',
      },
      ladder: {
        title: `Get more out of ${name}`,
        description: `Whether you're starting fresh or optimizing an existing org, we build a ${name} setup your team will actually adopt.`,
        buttonText: 'Start the conversation',
        image: 'ladder.svg',
      },
      reasons: {
        title: `Why teams choose us for ${name}`,
        cards: [
          { id: 'r1', title: 'Certified expertise', description: `Our consultants hold active ${name} certifications, not just general Salesforce experience.` },
          { id: 'r2', title: 'Built around your process', description: 'We configure around how your team actually works, not a generic template.' },
          { id: 'r3', title: 'Clean, maintainable setup', description: 'Every automation and customization is documented so your admins can own it.' },
          { id: 'r4', title: 'Support after go-live', description: 'We stay engaged to tune and extend the platform as your needs change.' },
        ],
      },
      action: {
        title: `Ready to put ${name} to work?`,
        description: 'Book a free consultation and we\'ll walk you through the fastest path to value.',
        buttonText: 'Book a consultation',
        image: 'action.jpg',
      },
      why: {
        title: `Why ${name}`,
        description: 'A quick look at what a well-configured setup delivers for your team.',
        cards: [
          { Icon: 'FaChartLine', title: 'Better visibility', description: 'Real-time reporting your team can actually act on.' },
          { Icon: 'MdOutlineSecurity', title: 'Reliable data', description: 'Clean, validated data instead of duplicate and stale records.' },
          { Icon: 'MdSelfImprovement', title: 'Less manual work', description: 'Automation handles the repetitive tasks your team shouldn\'t have to.' },
          { Icon: 'RiTeamLine', title: 'Team adoption', description: 'A setup built around real workflows, so people actually use it.' },
        ],
      },
      contact: {
        title: `Talk to us about ${name}`,
        description: 'Tell us about your goals and we will follow up within one business day.',
      },
    }
  }
  if (lang === 'tr') {
    return {
      hero: {
        title: `${name} Danışmanlığı ve Kurulumu`,
        description: `${name} platformunu ekibinizin gerçek çalışma şekline göre yapılandırıyoruz — ilk kurulumdan, aksayan bir projeyi düzeltmeye kadar.`,
        buttonText: 'Görüşme talep edin',
        image: 'questions.svg',
      },
      ladder: {
        title: `${name} platformundan daha fazlasını alın`,
        description: `İster sıfırdan başlayın ister mevcut yapınızı optimize edin, ekibinizin gerçekten kullanacağı bir ${name} kurulumu tasarlıyoruz.`,
        buttonText: 'Görüşmeye başlayın',
        image: 'ladder.svg',
      },
      reasons: {
        title: `${name} için neden bizi seçmelisiniz`,
        cards: [
          { id: 'r1', title: 'Sertifikalı uzmanlık', description: `Danışmanlarımız yalnızca genel Salesforce değil, aktif ${name} sertifikalarına sahiptir.` },
          { id: 'r2', title: 'Sürecinize göre kurulum', description: 'Genel bir şablon yerine ekibinizin gerçekte nasıl çalıştığına göre yapılandırıyoruz.' },
          { id: 'r3', title: 'Sürdürülebilir yapı', description: 'Her otomasyon ve özelleştirme belgelenir, böylece yöneticileriniz sahiplenebilir.' },
          { id: 'r4', title: 'Kurulum sonrası destek', description: 'İhtiyaçlarınız değiştikçe platformu geliştirmek için yanınızda kalırız.' },
        ],
      },
      action: {
        title: `${name} platformunu devreye almaya hazır mısınız?`,
        description: 'Ücretsiz bir görüşme planlayın, size en hızlı değer yolunu gösterelim.',
        buttonText: 'Görüşme planlayın',
        image: 'action.jpg',
      },
      why: {
        title: `Neden ${name}`,
        description: 'Doğru yapılandırılmış bir kurulumun ekibinize neler kazandırdığına kısa bir bakış.',
        cards: [
          { Icon: 'FaChartLine', title: 'Daha iyi görünürlük', description: 'Ekibinizin harekete geçebileceği gerçek zamanlı raporlama.' },
          { Icon: 'MdOutlineSecurity', title: 'Güvenilir veri', description: 'Yinelenen ve güncel olmayan kayıtlar yerine temiz, doğrulanmış veri.' },
          { Icon: 'MdSelfImprovement', title: 'Daha az manuel iş', description: 'Otomasyon, ekibinizin uğraşmaması gereken tekrarlayan işleri üstlenir.' },
          { Icon: 'RiTeamLine', title: 'Ekip benimsemesi', description: 'Gerçek iş akışlarına göre kurulan bir yapı, gerçekten kullanılır.' },
        ],
      },
      contact: {
        title: `${name} hakkında bizimle konuşun`,
        description: 'Hedeflerinizi bize anlatın, bir iş günü içinde size dönüş yapalım.',
      },
    }
  }
  // fr
  return {
    hero: {
      title: `Conseil et implémentation ${name}`,
      description: `Nous configurons ${name} autour de la façon dont votre équipe travaille réellement — de la première mise en place à la correction d'un déploiement raté.`,
      buttonText: 'Demander une consultation',
      image: 'questions.svg',
    },
    ladder: {
      title: `Tirez davantage parti de ${name}`,
      description: `Que vous démarriez de zéro ou optimisiez une organisation existante, nous construisons une configuration ${name} que votre équipe adoptera réellement.`,
      buttonText: 'Démarrer la discussion',
      image: 'ladder.svg',
    },
    reasons: {
      title: `Pourquoi nous choisir pour ${name}`,
      cards: [
        { id: 'r1', title: 'Expertise certifiée', description: `Nos consultants détiennent des certifications ${name} actives, pas seulement une expérience Salesforce générale.` },
        { id: 'r2', title: 'Adapté à votre process', description: 'Nous configurons selon le fonctionnement réel de votre équipe, pas un modèle générique.' },
        { id: 'r3', title: 'Configuration maintenable', description: 'Chaque automatisation et personnalisation est documentée pour que vos administrateurs puissent la gérer.' },
        { id: 'r4', title: 'Support après la mise en service', description: 'Nous restons impliqués pour ajuster et faire évoluer la plateforme selon vos besoins.' },
      ],
    },
    action: {
      title: `Prêt à exploiter ${name} ?`,
      description: 'Réservez une consultation gratuite et nous vous montrerons le chemin le plus rapide vers la valeur.',
      buttonText: 'Réserver une consultation',
      image: 'action.jpg',
    },
    why: {
      title: `Pourquoi ${name}`,
      description: 'Un aperçu rapide de ce qu\'une configuration bien menée apporte à votre équipe.',
      cards: [
        { Icon: 'FaChartLine', title: 'Meilleure visibilité', description: 'Des rapports en temps réel que votre équipe peut réellement exploiter.' },
        { Icon: 'MdOutlineSecurity', title: 'Données fiables', description: 'Des données propres et validées plutôt que des enregistrements dupliqués ou obsolètes.' },
        { Icon: 'MdSelfImprovement', title: 'Moins de tâches manuelles', description: 'L\'automatisation prend en charge les tâches répétitives dont votre équipe n\'a pas à s\'occuper.' },
        { Icon: 'RiTeamLine', title: 'Adoption par l\'équipe', description: 'Une configuration construite autour de flux de travail réels, donc réellement utilisée.' },
      ],
    },
    contact: {
      title: `Parlons de ${name}`,
      description: 'Partagez vos objectifs, un consultant vous répondra sous un jour ouvré.',
    },
  }
}

// ---------------------------------------------------------------------------
// TR
// ---------------------------------------------------------------------------
const tr = {
  seo: {
    home: {
      slug: 'seo-home-tr',
      title: 'PeakNova | Profesyonel Salesforce Danışmanlık Hizmetleri',
      description: 'PeakNova, büyüyen işletmelerin Salesforce\'u kurmasına, özelleştirmesine ve ondan daha fazla değer elde etmesine yardımcı olur — Sales Cloud\'dan Einstein AI\'a kadar.',
      keywords: ['Salesforce danışmanlık', 'Salesforce kurulumu', 'Salesforce özelleştirme', 'Salesforce entegrasyon', 'Sales Cloud', 'Service Cloud', 'Marketing Cloud', 'Einstein AI'],
      ogTitle: 'PeakNova | Profesyonel Salesforce Danışmanlık Hizmetleri',
      ogDescription: 'Ekiplerin CRM\'lerini kurmasına, entegre etmesine ve optimize etmesine yardımcı olan sertifikalı Salesforce danışmanları.',
    },
    about: {
      slug: 'seo-about-tr',
      title: 'PeakNova Hakkında | Salesforce Danışmanlık Ortağı',
      description: 'Ölçülebilir CRM sonuçlarına odaklanan Salesforce danışmanlık ortağı PeakNova hakkında bilgi edinin.',
      keywords: ['PeakNova hakkında', 'Salesforce ortağı', 'Salesforce danışmanlığı'],
    },
    blogs: {
      slug: 'seo-blogs-tr',
      title: 'Salesforce İçgörüleri ve Haberleri | PeakNova Blog',
      description: 'Salesforce kurulumu, otomasyon ve en iyi uygulamalar hakkında pratik rehberler.',
      keywords: ['Salesforce blog', 'Salesforce haberleri', 'Salesforce en iyi uygulamalar'],
    },
  },
  logos: SERVICE_META.map((s) => ({
    ...s,
    description: {
      'sales-cloud': 'Satış ekibinizin daha hızlı kapanış yapmasını sağlayan pipeline görünürlüğü, tahminleme ve otomasyon.',
      'service-cloud': 'Desteği rekabet avantajına dönüştüren birleşik vaka yönetimi ve self servis araçları.',
      'marketing-cloud': 'Müşterilerle doğru anda bağlantı kuran yolculuklar, segmentasyon ve kampanya otomasyonu.',
      'commerce-cloud': 'CRM ve sipariş karşılama verilerinize doğrudan bağlı birleşik B2B ve B2C mağazalar.',
      'tableau-analytics': 'Ham CRM verisini ekibinizin harekete geçebileceği kararlara dönüştüren raporlama.',
      'einstein-ai': 'İş akışlarınıza entegre edilmiş öngörücü puanlama, üretken yapay zeka desteği ve öneriler.',
      'mulesoft-integration': 'Salesforce\'u ERP, finans ve eski sistemlerinize bağlayan API tabanlı entegrasyon.',
      'slack': 'Anlaşmaları, vakaları ve onayları ekibinizin zaten kullandığı araçlara taşıyan Slack odaklı iş akışları.',
    }[s.slug],
  })),
  pageContent: {
    'home-hero': {
      title: 'Salesforce, doğru şekilde kurulur',
      description: 'PeakNova, büyüyen ekiplerin CRM\'lerini yapılandırmasına, entegre etmesine ve otomatikleştirmesine yardımcı olan bir Salesforce danışmanlık ortağıdır — böylece gerçekten kullanılır.',
      buttonText: 'Görüşme planlayın',
      image: 'office-workers-2.jpg',
    },
    'home-problem': {
      title: 'Salesforce projeleri çoğunlukla nerede hataya düşer',
      description: 'CRM kurulumları öngörülebilir nedenlerle başarısız olur. Biz tam olarak bunları çözmek için kurulduk.',
      cards: [
        { Icon: 'MdOutlinePersonSearch', title: 'Düşük benimseme', description: 'Salesforce ekibin gerçek çalışma şekline göre kurulmadığında ekipler Excel\'e geri döner.', color: 'sales' },
        { Icon: 'MdOutlineSecurity', title: 'Kırılgan özelleştirmeler', description: 'Plansız yapılandırma her sürümde bozulur ve teknik borca dönüşür.', color: 'service' },
        { Icon: 'RiGlobalLine', title: 'Bağlantısız sistemler', description: 'Verinin silolarda sıkışması, CRM\'in olması gereken tek doğruluk kaynağı olmasını engeller.', color: 'mulesoft' },
        { Icon: 'FaChartArea', title: 'Görünürlük eksikliği', description: 'Doğru raporlama olmadan yönetim, veriye değil sezgiye dayanarak karar verir.', color: 'tableau' },
      ],
    },
    'home-info1': {
      image: 'about-action.jpg',
      title: 'Sadece yüklenici değil, sertifikalı danışmanlar',
      description: 'Ekibimiz Sales Cloud, Service Cloud ve Platform Development alanlarında Salesforce sertifikalarına sahiptir; önerilerimiz tahmine değil gerçek deneyime dayanır.',
    },
    'home-info2': {
      image: 'info-two.jpg',
      title: 'Sadece teslim edilmek için değil, sürdürülmek için kurulur',
      description: 'Her yapılandırmayı belgeleriz ve Salesforce\'un kendi mimari yönergelerini izleriz; böylece admin ekibiniz platformu bizden devraldıktan sonra sahiplenebilir.',
    },
    'home-action': {
      title: 'İyi yönetilen bir Salesforce ortamının nasıl hissettirdiğini görmeye hazır mısınız?',
      buttonText: 'Ekibimizle konuşun',
      image: 'talk.svg',
      color: 'primary',
    },
    'home-contact': {
      title: 'Projenizden bahsedin',
      description: 'Birkaç detay paylaşın, bir PeakNova danışmanı bir iş günü içinde size dönüş yapsın.',
    },
    'about-hero': {
      title: 'Devreye almadan sonra da sorumluluğunu sürdüren bir danışmanlık ortağı',
      description: 'PeakNova, Salesforce\'un potansiyeli ile günlük olarak nasıl kullanıldığı arasındaki farkı kapatmak için kuruldu.',
      buttonText: 'İletişime geçin',
      image: 'about.jpg',
    },
    'about-team': {
      title: 'Nasıl çalışıyoruz',
      description: 'İki haftalık bir yapılandırmadan çok bulutlu bir kuruluma kadar her projeyi şekillendiren birkaç ilke.',
      cards: [
        { title: 'Önce keşif', description: 'Tek bir yapılandırma ekranına dokunmadan önce mevcut sürecinizi baştan sona haritalandırırız.' },
        { title: 'Aşamalı teslimat', description: 'Aylar değil haftalar içinde çalışan işlevsellik görürsünüz; her sprinte geri bildirim dahil edilir.' },
        { title: 'Bilgi aktarımı', description: 'Dokümantasyon ve admin eğitimi her projenin parçasıdır, sonradan akla gelen bir ek değil.' },
        { title: 'Uzun vadeli destek', description: 'Kuruluşunuz büyüdükçe ayarlamak, genişletmek ve sorun gidermek için devreye almadan sonra da yanınızdayız.' },
      ],
    },
    'about-action': {
      title: 'Salesforce platformunun tamamında sertifikalı',
      description: 'Sales Cloud yapılandırmasından Apex geliştirmeye ve MuleSoft entegrasyonuna kadar ekibimiz işletmenizin ihtiyaç duyduğu tüm katmanı kapsar.',
      buttonText: 'Hizmetlerimize göz atın',
      image: 'about-action.jpg',
    },
    'about-contact': {
      title: 'Salesforce ortamınız hakkında konuşalım',
      description: 'İster sıfırdan başlıyor olun ister aksayan bir kurulumu düzeltiyor olun, bunu duymak isteriz.',
    },
    'project-hero': {
      title: 'Temsili Salesforce çözümleri',
      description: 'Yaptığımız Salesforce çalışmalarından bir örnek — sektörler genelinde kurulum, entegrasyon ve platform modernizasyonu.',
      image: 'red.jpg',
    },
    'project-step': {
      title: 'Tipik bir proje nasıl ilerler',
      cards: [
        { Icon: 'MdOutlinePersonSearch', title: 'Keşif ve kapsam belirleme', description: 'Mevcut kurulumunuzu inceler, net ve ölçülebilir başarı kriterleri tanımlarız.', color: 'sales' },
        { Icon: 'GiScales', title: 'Kurulum ve yapılandırma', description: 'Aşamalı sprintler, ilerledikçe test edebileceğiniz çalışan işlevsellik sunar.', color: 'einstein' },
        { Icon: 'MdOutlineSecurity', title: 'Devreye alma ve destek', description: 'Devreye almayı, eğitimi yönetir ve sonrasında ince ayar için yanınızda kalırız.', color: 'service' },
      ],
    },
    'project-image': {
      image: 'bg-1.png',
      cards: [
        { id: 'p1', Icon: 'FaChartLine', title: 'Satış pipeline yenilemesi', description: 'Bir dağıtım şirketi için tahminleme ve fırsat aşamalarını yeniden kurduk.' },
        { id: 'p2', Icon: 'RiCustomerService2Line', title: 'Destek masası birleştirme', description: 'Üç destek aracını tek bir Service Cloud konsoluna taşıdık.' },
        { id: 'p3', Icon: 'TbHexagonLetterMFilled', title: 'ERP entegrasyonu', description: 'Salesforce\'u MuleSoft API\'leriyle eski bir ERP sistemine bağladık.' },
      ],
    },
    'project-project': {
      title: 'Örnek projeler',
    },
    'project-contact': {
      title: 'Benzer bir projeniz mi var?',
      description: 'Çözmeye çalıştığınız şeyi anlatın, nasıl bir yaklaşım izleyeceğimizi sizinle paylaşalım.',
    },
    'blogs-hero': {
      title: 'Salesforce\'tan en son haberler',
      description: 'Kurulum, otomasyon ve CRM\'inizden daha fazlasını almak üzerine pratik içgörüler.',
    },
    'blogs-contact': {
      title: 'Salesforce ile ilgili bir sorunuz mu var?',
      description: 'Bize ulaşın, danışmanlarımızdan biri size dönüş yapsın.',
    },
    'single-contact': {
      title: 'Bu yazıyı beğendiniz mi?',
      description: 'Bunun kendi Salesforce ortamınıza nasıl uygulanabileceği hakkında bizimle konuşun.',
    },
  },
  about: [
    { title: 'Misyonumuz', description: 'Ekiplerin gerçekten kullanmak isteyeceği Salesforce kurulumları yapmak — yalnızca en iyi uygulama kontrol listelerine değil, gerçek iş akışlarına dayalı.' },
    { title: 'Yaklaşımımız', description: 'Sertifikalı teknik uzmanlığı uygulamalı keşifle birleştiriyoruz; böylece her yapılandırma kararı gerçek bir iş gerekçesine dayanır.' },
    { title: 'Taahhüdümüz', description: 'Devreye almadan sonra da bağlı kalıyoruz. Bir Salesforce ortamı asla gerçekten "tamamlanmış" değildir — işletmenizle birlikte gelişmelidir.' },
  ],
  faq: [
    { question: 'Hangi Salesforce bulutlarıyla çalışıyorsunuz?', answer: 'Sales Cloud, Service Cloud, Marketing Cloud, Commerce Cloud, Tableau, Einstein AI, MuleSoft ve Slack entegrasyonları üzerinde çalışıyoruz.' },
    { question: 'Salesforce\'a yeni başlayan işletmelerle çalışıyor musunuz?', answer: 'Evet. İlk kurulumdan mevcut, ağır özelleştirilmiş bir ortamı optimize etmeye kadar her şeyi yönetiyoruz.' },
    { question: 'Tipik bir kurulum ne kadar sürer?', answer: 'Odaklı bir Sales Cloud kurulumu dört ila altı hafta sürebilir; entegrasyonlu çok bulutlu projeler genellikle iki ila dört ay sürer.' },
    { question: 'Devreye almadan sonra sürekli destek sunuyor musunuz?', answer: 'Evet, devreye almadan sonra admin görevleri, sorun giderme ve kademeli geliştirmeler için yönetilen destek planları sunuyoruz.' },
    { question: 'Salesforce\'u mevcut sistemlerimizle entegre edebilir misiniz?', answer: 'Evet. Salesforce\'u ERP, finans, pazarlama ve eski sistemlerle bağlamak için MuleSoft ve native API\'ler kullanıyoruz.' },
    { question: 'Kullanıcı eğitimi veriyor musunuz?', answer: 'Her proje, admin ve son kullanıcı eğitiminin yanı sıra ekibinizin sonradan başvurabileceği dokümantasyonu içerir.' },
    { question: 'Danışmanlarınız Salesforce sertifikalı mı?', answer: 'Evet, ekibimiz Sales Cloud, Service Cloud ve Salesforce Platform Development alanlarında aktif sertifikalara sahiptir.' },
    { question: 'Nasıl başlayabiliriz?', answer: 'İletişim formu üzerinden bir görüşme planlayın — bir yaklaşım önermeden önce hedeflerinizi anlamak için bir keşif görüşmesi ayarlayalım.' },
  ],
  projects: [
    { name: 'distribution-sales-cloud', title: 'Bir dağıtım şirketi için Sales Cloud kurulumu', description: 'Excel tabanlı satış sürecini tam yapılandırılmış bir Sales Cloud pipeline\'ı ile değiştirerek teklif süresini önemli ölçüde kısalttık.', image: 'project1.png' },
    { name: 'support-service-cloud', title: 'Service Cloud birleştirmesi', description: 'Üç bağlantısız destek aracını omni-channel yönlendirmeli tek bir Service Cloud konsoluna taşıdık.', image: 'project2.png' },
    { name: 'erp-mulesoft-integration', title: 'MuleSoft ile ERP entegrasyonu', description: 'Salesforce ile eski bir ERP sistemi arasında gerçek zamanlı entegrasyon kurarak manuel veri girişini ortadan kaldırdık.', image: 'project1.png' },
    { name: 'marketing-automation', title: 'Marketing Cloud yolculuk otomasyonu', description: 'Kampanya etkileşimini artıran ve manuel kampanya işini azaltan otomatik müşteri yolculukları tasarladık.', image: 'project2.png' },
  ],
  blogs: [
    {
      slug: 'salesforce-projeleri-neden-basarisiz-olur',
      title: 'Salesforce Projeleri Neden Başarısız Olur (ve Nasıl Önlenir)',
      summary: 'Devreye almadan sonra Salesforce kurulumlarının duraksamasının en yaygın nedenleri — ve gerçekten işe yarayan çözümler.',
      coverImage: 'action.jpg',
      content: [
        { type: 'paragraph', text: 'Başarısız Salesforce projelerinin çoğu platformun değil, sürecin başarısızlığıdır. Ekipler, insanların gerçekte nasıl satış yaptığına, destek verdiğine veya pazarlama yaptığına göre değil, teorik bir ideale göre Salesforce\'u yapılandırır.' },
        { type: 'heading', text: 'Yapılandırmayla değil keşifle başlayın' },
        { type: 'paragraph', text: 'Setup\'ı açmadan önce mevcut sürecinizi baştan sona haritalandırın. Her alan, otomasyon ve sayfa düzeni bugün birinin attığı gerçek bir adıma dayanmalıdır.' },
        { type: 'heading', text: 'Benimseme bir tasarım sorunudur' },
        { type: 'paragraph', text: 'Ekibiniz işini yapmak için Salesforce\'tan çıkmak zorunda kalıyorsa, çıkacaktır. Çözüm nadiren daha fazla eğitimdir — genellikle daha basit, daha hızlı kullanılan bir yapılandırmadır.' },
      ],
    },
    {
      slug: 'sales-cloud-mi-service-cloud-mu',
      title: 'Sales Cloud mu, Service Cloud mu: Önce Hangisine İhtiyacınız Var?',
      summary: 'Sales Cloud, Service Cloud veya ikisiyle birlikte başlamanın ne zaman doğru olduğuna dair pratik bir rehber.',
      coverImage: 'about-action.jpg',
      content: [
        { type: 'paragraph', text: 'Sales Cloud ve Service Cloud aynı veri modelini paylaşır, ancak farklı sorunları çözerler — biri pipeline etrafında, diğeri vaka çözümü etrafında kuruludur.' },
        { type: 'heading', text: 'Sorunun olduğu yerden başlayın' },
        { type: 'paragraph', text: 'Satış ekibiniz anlaşmaları Excel\'de takip ediyorsa Sales Cloud ile başlayın. Destek talepleri e-posta ve bir helpdesk aracına dağılmışsa önce Service Cloud gelir.' },
      ],
    },
    {
      slug: 'salesforcede-einstein-ai-ile-baslangic',
      title: 'Salesforce\'ta Einstein AI\'a Başlangıç',
      summary: 'Einstein AI kutudan çıktığında gerçekte ne yapar ve en hızlı nerede değer sağlar.',
      coverImage: 'info-two.jpg',
      content: [
        { type: 'paragraph', text: 'Einstein AI tek bir özellik değildir — Sales, Service ve Marketing Cloud üzerine katmanlanmış bir dizi öngörücü ve üretken yetenektir.' },
        { type: 'heading', text: 'Nereden başlamalı' },
        { type: 'paragraph', text: 'Üretken kullanım senaryolarına geçmeden önce potansiyel müşteri puanlama ve vaka sınıflandırması genellikle en hızlı ve ölçülebilir kazanımları sağlar.' },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// FR
// ---------------------------------------------------------------------------
const fr = {
  seo: {
    home: {
      slug: 'seo-home-fr',
      title: 'PeakNova | Services de conseil Salesforce professionnels',
      description: 'PeakNova aide les entreprises en croissance à implémenter, personnaliser et tirer davantage de valeur de Salesforce — de Sales Cloud à Einstein AI.',
      keywords: ['conseil Salesforce', 'implémentation Salesforce', 'personnalisation Salesforce', 'intégration Salesforce', 'Sales Cloud', 'Service Cloud', 'Marketing Cloud', 'Einstein AI'],
      ogTitle: 'PeakNova | Services de conseil Salesforce professionnels',
      ogDescription: 'Des consultants Salesforce certifiés qui aident les équipes à implémenter, intégrer et optimiser leur CRM.',
    },
    about: {
      slug: 'seo-about-fr',
      title: 'À propos de PeakNova | Partenaire de conseil Salesforce',
      description: 'Découvrez PeakNova, un partenaire de conseil Salesforce axé sur des résultats CRM concrets et mesurables.',
      keywords: ['à propos de PeakNova', 'partenaire Salesforce', 'conseil Salesforce'],
    },
    blogs: {
      slug: 'seo-blogs-fr',
      title: 'Actualités et conseils Salesforce | Blog PeakNova',
      description: 'Guides pratiques et actualités sur l\'implémentation Salesforce, l\'automatisation et les bonnes pratiques.',
      keywords: ['blog Salesforce', 'actualités Salesforce', 'bonnes pratiques Salesforce'],
    },
  },
  logos: SERVICE_META.map((s) => ({
    ...s,
    description: {
      'sales-cloud': 'Visibilité du pipeline, prévisions et automatisation pour aider votre équipe commerciale à conclure plus vite.',
      'service-cloud': 'Gestion unifiée des dossiers et outils en libre-service qui font du support un avantage concurrentiel.',
      'marketing-cloud': 'Parcours, segmentation et automatisation des campagnes pour toucher vos clients au bon moment.',
      'commerce-cloud': 'Boutiques B2B et B2C unifiées, connectées directement à vos données CRM et de traitement des commandes.',
      'tableau-analytics': 'Tableaux de bord et rapports qui transforment les données CRM brutes en décisions concrètes.',
      'einstein-ai': 'Scoring prédictif, assistance générative et recommandations IA intégrées à vos processus.',
      'mulesoft-integration': 'Intégration API connectant Salesforce à vos systèmes ERP, financiers et existants.',
      'slack': 'Des flux de travail centrés sur Slack qui rapprochent deals, dossiers et validations des outils déjà utilisés par votre équipe.',
    }[s.slug],
  })),
  pageContent: {
    'home-hero': {
      title: 'Salesforce, implémenté comme il se doit',
      description: 'PeakNova est un partenaire de conseil Salesforce qui aide les équipes en croissance à configurer, intégrer et automatiser leur CRM — pour qu\'il soit réellement utilisé.',
      buttonText: 'Réserver une consultation',
      image: 'office-workers-2.jpg',
    },
    'home-problem': {
      title: 'Où la plupart des projets Salesforce échouent',
      description: 'Les déploiements CRM échouent pour des raisons prévisibles. Nous sommes conçus pour résoudre exactement celles-ci.',
      cards: [
        { Icon: 'MdOutlinePersonSearch', title: 'Faible adoption', description: 'Les équipes retournent aux tableurs quand Salesforce n\'est pas construit autour de leur façon réelle de travailler.', color: 'sales' },
        { Icon: 'MdOutlineSecurity', title: 'Personnalisations fragiles', description: 'Les configurations improvisées se cassent à chaque mise à jour et deviennent de la dette technique.', color: 'service' },
        { Icon: 'RiGlobalLine', title: 'Systèmes déconnectés', description: 'Des données cloisonnées empêchent votre CRM d\'être la source unique de vérité qu\'il devrait être.', color: 'mulesoft' },
        { Icon: 'FaChartArea', title: 'Manque de visibilité', description: 'Sans les bons rapports, la direction décide à l\'instinct plutôt qu\'avec des données.', color: 'tableau' },
      ],
    },
    'home-info1': {
      image: 'about-action.jpg',
      title: 'Des consultants certifiés, pas de simples prestataires',
      description: 'Notre équipe détient des certifications Salesforce en Sales Cloud, Service Cloud et Platform Development, donc nos recommandations viennent d\'une expérience concrète.',
    },
    'home-info2': {
      image: 'info-two.jpg',
      title: 'Conçu pour être maintenu, pas seulement livré',
      description: 'Nous documentons chaque configuration et suivons les propres directives d\'architecture de Salesforce, afin que votre équipe d\'administration puisse reprendre la main.',
    },
    'home-action': {
      title: 'Prêt à découvrir ce qu\'est un environnement Salesforce bien géré ?',
      buttonText: 'Contactez notre équipe',
      image: 'talk.svg',
      color: 'primary',
    },
    'home-contact': {
      title: 'Parlez-nous de votre projet',
      description: 'Partagez quelques détails et un consultant PeakNova vous recontactera sous un jour ouvré.',
    },
    'about-hero': {
      title: 'Un partenaire de conseil qui reste engagé après la mise en service',
      description: 'PeakNova a été fondé pour combler l\'écart entre le potentiel de Salesforce et son usage réel au quotidien.',
      buttonText: 'Nous contacter',
      image: 'about.jpg',
    },
    'about-team': {
      title: 'Notre façon de travailler',
      description: 'Quelques principes qui façonnent chaque mission, d\'une configuration de deux semaines à un déploiement multi-cloud.',
      cards: [
        { title: 'La découverte d\'abord', description: 'Nous cartographions votre processus existant avant de toucher le moindre écran de configuration.' },
        { title: 'Livraison itérative', description: 'Vous voyez des fonctionnalités opérationnelles en semaines, pas en mois, avec des retours à chaque sprint.' },
        { title: 'Transfert de connaissances', description: 'La documentation et la formation des administrateurs font partie de chaque projet, pas un ajout de dernière minute.' },
        { title: 'Support à long terme', description: 'Nous restons impliqués après le lancement pour ajuster, étendre et dépanner à mesure que votre organisation grandit.' },
      ],
    },
    'about-action': {
      title: 'Certifiés sur l\'ensemble de la plateforme Salesforce',
      description: 'De la configuration Sales Cloud au développement Apex en passant par l\'intégration MuleSoft, notre équipe couvre tout ce dont votre entreprise a besoin.',
      buttonText: 'Voir nos services',
      image: 'about-action.jpg',
    },
    'about-contact': {
      title: 'Parlons de votre environnement Salesforce',
      description: 'Que vous partiez de zéro ou corrigiez un déploiement raté, nous aimerions en discuter.',
    },
    'project-hero': {
      title: 'Solutions Salesforce représentatives',
      description: 'Un aperçu du type de travail Salesforce que nous réalisons — implémentation, intégration et modernisation de plateforme, tous secteurs confondus.',
      image: 'red.jpg',
    },
    'project-step': {
      title: 'Déroulement d\'une mission type',
      cards: [
        { Icon: 'MdOutlinePersonSearch', title: 'Découverte et cadrage', description: 'Nous auditons votre configuration actuelle et définissons des critères de succès clairs et mesurables.', color: 'sales' },
        { Icon: 'GiScales', title: 'Construction et configuration', description: 'Des sprints itératifs livrent des fonctionnalités opérationnelles que vous pouvez tester au fur et à mesure.', color: 'einstein' },
        { Icon: 'MdOutlineSecurity', title: 'Lancement et support', description: 'Nous gérons le déploiement, la formation, et restons présents pour les ajustements post-lancement.', color: 'service' },
      ],
    },
    'project-image': {
      image: 'bg-1.png',
      cards: [
        { id: 'p1', Icon: 'FaChartLine', title: 'Refonte du pipeline commercial', description: 'Reconstruction des prévisions et des étapes d\'opportunité pour une entreprise de distribution.' },
        { id: 'p2', Icon: 'RiCustomerService2Line', title: 'Consolidation du support', description: 'Migration de trois outils de support vers une console Service Cloud unique.' },
        { id: 'p3', Icon: 'TbHexagonLetterMFilled', title: 'Intégration ERP', description: 'Connexion de Salesforce à un ERP existant via des API MuleSoft.' },
      ],
    },
    'project-project': {
      title: 'Exemples de missions',
    },
    'project-contact': {
      title: 'Un projet similaire en tête ?',
      description: 'Dites-nous ce que vous cherchez à résoudre et nous vous expliquerons notre approche.',
    },
    'blogs-hero': {
      title: 'Dernières actualités Salesforce',
      description: 'Des conseils pratiques sur l\'implémentation, l\'automatisation et la valorisation de votre CRM.',
    },
    'blogs-contact': {
      title: 'Une question sur Salesforce ?',
      description: 'Contactez-nous, un de nos consultants vous répondra.',
    },
    'single-contact': {
      title: 'Cet article vous a plu ?',
      description: 'Discutons de la façon dont cela s\'applique à votre propre environnement Salesforce.',
    },
  },
  about: [
    { title: 'Notre mission', description: 'Réaliser des implémentations Salesforce que les équipes ont réellement envie d\'utiliser — construites autour de flux de travail réels, pas seulement de listes de bonnes pratiques.' },
    { title: 'Notre approche', description: 'Nous combinons expertise technique certifiée et découverte pratique, afin que chaque décision de configuration réponde à un besoin métier réel.' },
    { title: 'Notre engagement', description: 'Nous restons impliqués après la mise en service. Un environnement Salesforce n\'est jamais vraiment "terminé" — il doit évoluer avec votre entreprise.' },
  ],
  faq: [
    { question: 'Avec quels clouds Salesforce travaillez-vous ?', answer: 'Nous travaillons avec Sales Cloud, Service Cloud, Marketing Cloud, Commerce Cloud, Tableau, Einstein AI, MuleSoft et les intégrations Slack.' },
    { question: 'Travaillez-vous avec des entreprises novices sur Salesforce ?', answer: 'Oui. Nous gérons tout, des premières implémentations à l\'optimisation d\'un environnement existant fortement personnalisé.' },
    { question: 'Combien de temps dure une implémentation type ?', answer: 'Un déploiement Sales Cloud ciblé prend quatre à six semaines ; les projets multi-cloud avec intégrations durent généralement deux à quatre mois.' },
    { question: 'Proposez-vous un support après le lancement ?', answer: 'Oui, nous proposons des forfaits de support gérés pour les tâches d\'administration, le dépannage et les améliorations continues après la mise en service.' },
    { question: 'Pouvez-vous intégrer Salesforce à nos systèmes existants ?', answer: 'Oui. Nous utilisons MuleSoft et les API natives pour connecter Salesforce à vos systèmes ERP, financiers, marketing et existants.' },
    { question: 'Proposez-vous une formation des utilisateurs ?', answer: 'Chaque mission inclut une formation administrateurs et utilisateurs finaux, ainsi qu\'une documentation que votre équipe pourra consulter.' },
    { question: 'Vos consultants sont-ils certifiés Salesforce ?', answer: 'Oui, notre équipe détient des certifications actives en Sales Cloud, Service Cloud et Salesforce Platform Development.' },
    { question: 'Comment démarrer ?', answer: 'Réservez une consultation via le formulaire de contact — nous planifierons un appel de découverte pour comprendre vos objectifs avant de proposer une approche.' },
  ],
  projects: [
    { name: 'distribution-sales-cloud', title: 'Déploiement Sales Cloud pour une entreprise de distribution', description: 'Remplacement d\'un processus commercial basé sur des tableurs par un pipeline Sales Cloud entièrement configuré, réduisant nettement le délai de devis.', image: 'project1.png' },
    { name: 'support-service-cloud', title: 'Consolidation Service Cloud', description: 'Migration de trois outils de support déconnectés vers une console Service Cloud unique avec routage omnicanal.', image: 'project2.png' },
    { name: 'erp-mulesoft-integration', title: 'Intégration ERP avec MuleSoft', description: 'Mise en place d\'une intégration en temps réel entre Salesforce et un ERP existant, éliminant la saisie manuelle.', image: 'project1.png' },
    { name: 'marketing-automation', title: 'Automatisation de parcours Marketing Cloud', description: 'Conception de parcours clients automatisés ayant augmenté l\'engagement des campagnes et réduit le travail manuel.', image: 'project2.png' },
  ],
  blogs: [
    {
      slug: 'pourquoi-les-implementations-salesforce-echouent',
      title: 'Pourquoi les implémentations Salesforce échouent (et comment l\'éviter)',
      summary: 'Les raisons les plus courantes pour lesquelles les déploiements Salesforce stagnent après le lancement — et les solutions qui fonctionnent réellement.',
      coverImage: 'action.jpg',
      content: [
        { type: 'paragraph', text: 'La plupart des projets Salesforce ratés ne sont pas des échecs de la plateforme, mais des échecs de processus. Les équipes configurent Salesforce autour d\'un idéal théorique plutôt que de la façon dont les gens vendent, assistent ou font du marketing.' },
        { type: 'heading', text: 'Commencer par la découverte, pas la configuration' },
        { type: 'paragraph', text: 'Avant d\'ouvrir Setup, cartographiez votre processus actuel de bout en bout. Chaque champ, automatisation et mise en page doit correspondre à une étape réelle que quelqu\'un effectue aujourd\'hui.' },
        { type: 'heading', text: 'L\'adoption est un problème de conception' },
        { type: 'paragraph', text: 'Si votre équipe doit quitter Salesforce pour faire son travail, elle le fera. La solution est rarement plus de formation — c\'est généralement une configuration plus simple et plus rapide à utiliser.' },
      ],
    },
    {
      slug: 'sales-cloud-vs-service-cloud-fr',
      title: 'Sales Cloud vs Service Cloud : par lequel commencer ?',
      summary: 'Un aperçu pratique pour savoir quand démarrer avec Sales Cloud, Service Cloud, ou les deux ensemble.',
      coverImage: 'about-action.jpg',
      content: [
        { type: 'paragraph', text: 'Sales Cloud et Service Cloud partagent un modèle de données, mais résolvent des problèmes différents — l\'un est construit autour du pipeline, l\'autre autour de la résolution des dossiers.' },
        { type: 'heading', text: 'Commencez là où se situe la douleur' },
        { type: 'paragraph', text: 'Si votre équipe commerciale suit ses affaires dans des tableurs, commencez par Sales Cloud. Si les tickets de support sont éparpillés entre e-mails et un outil de helpdesk, Service Cloud vient en premier.' },
      ],
    },
    {
      slug: 'demarrer-avec-einstein-ai',
      title: 'Démarrer avec Einstein AI dans Salesforce',
      summary: 'Ce qu\'Einstein AI fait réellement dès la sortie de la boîte, et où il apporte le plus de valeur, le plus vite.',
      coverImage: 'info-two.jpg',
      content: [
        { type: 'paragraph', text: 'Einstein AI n\'est pas une seule fonctionnalité — c\'est un ensemble de capacités prédictives et génératives réparties sur Sales, Service et Marketing Cloud.' },
        { type: 'heading', text: 'Par où commencer' },
        { type: 'paragraph', text: 'Le scoring des leads et la classification des dossiers offrent généralement les gains les plus rapides et mesurables avant de passer aux cas d\'usage génératifs.' },
      ],
    },
  ],
}

const CONTENT = { en, tr, fr }

async function upsertIfMissing(model, where, data) {
  const existing = await prisma[model].findFirst({ where })
  if (existing) {
    return existing
  }
  return prisma[model].create({ data })
}

async function seedLanguage(lang) {
  const c = CONTENT[lang]

  for (const logo of c.logos) {
    await upsertIfMissing(
      'logos',
      { language: lang, name: logo.name },
      { name: logo.name, description: logo.description, icon: logo.icon, color: logo.color, language: lang },
    )
  }

  for (const [section, data] of Object.entries(c.pageContent)) {
    await upsertIfMissing(
      'pageContent',
      { language: lang, section },
      { section, language: lang, title: data.title ?? null, description: data.description ?? null, image: data.image ?? null, buttonText: data.buttonText ?? null, cards: data.cards ?? undefined },
    )
  }

  for (const item of c.about) {
    await upsertIfMissing('about', { language: lang, title: item.title }, { ...item, language: lang })
  }

  for (const item of c.faq) {
    await upsertIfMissing('faq', { language: lang, question: item.question }, { ...item, language: lang })
  }

  for (const item of c.projects) {
    await upsertIfMissing('project', { language: lang, name: item.name }, { ...item, language: lang })
  }

  for (const svc of SERVICE_META) {
    const sections = serviceContent(lang, svc)
    for (const [section, data] of Object.entries(sections)) {
      await upsertIfMissing(
        'servicePage',
        { language: lang, service: svc.slug, section },
        { service: svc.slug, section, language: lang, title: data.title ?? null, description: data.description ?? null, image: data.image ?? null, buttonText: data.buttonText ?? null, cards: data.cards ?? undefined },
      )
    }
  }

  for (const [page, seo] of Object.entries(c.seo)) {
    await prisma.seo.upsert({
      where: { slug: seo.slug },
      update: {},
      create: {
        page,
        language: lang,
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        slug: seo.slug,
        ogTitle: seo.ogTitle ?? null,
        ogDescription: seo.ogDescription ?? null,
      },
    })
  }

  for (const blog of c.blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {},
      create: {
        title: blog.title,
        slug: blog.slug,
        content: blog.content,
        coverImage: blog.coverImage ?? null,
        language: lang,
        summary: blog.summary,
      },
    })
  }

  console.log(`Seeded ${lang}`)
}

async function main() {
  for (const lang of LANGS) {
    await seedLanguage(lang)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })
