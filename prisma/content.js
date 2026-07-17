/*
 * Approved PeakNova marketing copy (EN/TR/FR), shared by prisma/seed.js
 * (create-if-missing baseline seeding) and prisma/refresh-content.js
 * (controlled content refresh of existing records).
 *
 * Every section key, card shape, image path and icon name here matches
 * what the public components in components/** already read — see
 * repositories/*.js and the [locale] page components for the contract.
 */

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
// Home service summaries / logos
// ---------------------------------------------------------------------------
const LOGO_DESCRIPTIONS = {
  en: {
    'sales-cloud': 'Design a clearer sales process with structured qualification, opportunity management, forecasting, approvals, automation and reporting built around the way your commercial team works.',
    'service-cloud': 'Bring cases, customer history, support workflows, service levels and agent activity into a structured environment that improves visibility and consistency.',
    'marketing-cloud': 'Connect customer data, segmentation, journeys and campaign automation so marketing activity is coordinated with sales and customer lifecycle information.',
    'commerce-cloud': 'Connect digital commerce experiences with customer, product, order and service data to create a more consistent buying and post-purchase journey.',
    'tableau-analytics': 'Turn Salesforce and connected operational data into dashboards that help teams understand pipeline, service performance, customer activity and business risk.',
    'einstein-ai': 'Identify practical AI use cases for productivity, customer communication, recommendations, summarisation and decision support without losing control of data and business rules.',
    'mulesoft-integration': 'Connect Salesforce with ERP, finance, marketing, support and custom applications through controlled APIs, reliable data flows and maintainable integration architecture.',
    'slack': 'Bring alerts, approvals, collaboration and Salesforce context into Slack so teams can act on operational information without losing traceability.',
  },
  tr: {
    'sales-cloud': 'Yapılandırılmış nitelendirme, fırsat yönetimi, tahminleme, onaylar, otomasyon ve raporlama ile satış ekibinizin gerçek çalışma şekline uygun, daha net bir satış süreci tasarlayın.',
    'service-cloud': 'Vakaları, müşteri geçmişini, destek süreçlerini, hizmet seviyelerini ve temsilci aktivitesini yapılandırılmış bir ortamda birleştirerek görünürlüğü ve tutarlılığı artırın.',
    'marketing-cloud': 'Müşteri verisini, segmentasyonu, yolculukları ve kampanya otomasyonunu birbirine bağlayarak pazarlama faaliyetlerini satış ve müşteri yaşam döngüsü bilgileriyle koordine edin.',
    'commerce-cloud': 'Dijital ticaret deneyimlerini müşteri, ürün, sipariş ve hizmet verileriyle bağlayarak daha tutarlı bir satın alma ve satış sonrası süreç oluşturun.',
    'tableau-analytics': 'Salesforce ve bağlı operasyonel verileri; pipeline, hizmet performansı, müşteri aktivitesi ve iş riskini anlamanıza yardımcı olan panolara dönüştürün.',
    'einstein-ai': 'Veri ve iş kurallarının kontrolünü kaybetmeden verimlilik, müşteri iletişimi, öneriler, özetleme ve karar desteği için pratik yapay zeka kullanım alanları belirleyin.',
    'mulesoft-integration': 'Salesforce\'u; kontrollü API\'ler, güvenilir veri akışları ve sürdürülebilir entegrasyon mimarisiyle ERP, finans, pazarlama, destek ve özel uygulamalara bağlayın.',
    'slack': 'Uyarıları, onayları, iş birliğini ve Salesforce bağlamını Slack\'e taşıyarak ekiplerin izlenebilirliği kaybetmeden operasyonel bilgiye göre hareket etmesini sağlayın.',
  },
  fr: {
    'sales-cloud': 'Concevez un processus commercial plus clair grâce à une qualification structurée, une gestion des opportunités, des prévisions, des validations, de l\'automatisation et un reporting adaptés au fonctionnement réel de votre équipe commerciale.',
    'service-cloud': 'Rassemblez dossiers, historique client, processus de support, niveaux de service et activité des agents dans un environnement structuré qui améliore la visibilité et la cohérence.',
    'marketing-cloud': 'Connectez données clients, segmentation, parcours et automatisation des campagnes afin que le marketing soit coordonné avec les informations commerciales et de cycle de vie client.',
    'commerce-cloud': 'Connectez les expériences de commerce digital aux données client, produit, commande et service pour créer un parcours d\'achat et d\'après-vente plus cohérent.',
    'tableau-analytics': 'Transformez les données Salesforce et les données opérationnelles connectées en tableaux de bord qui aident les équipes à comprendre le pipeline, la performance du service, l\'activité client et les risques métier.',
    'einstein-ai': 'Identifiez des cas d\'usage IA concrets pour la productivité, la communication client, les recommandations, la synthèse et l\'aide à la décision, sans perdre le contrôle des données et des règles métier.',
    'mulesoft-integration': 'Connectez Salesforce à vos systèmes ERP, finance, marketing, support et applications spécifiques via des API maîtrisées, des flux de données fiables et une architecture d\'intégration maintenable.',
    'slack': 'Faites entrer alertes, validations, collaboration et contexte Salesforce dans Slack afin que les équipes puissent agir sur l\'information opérationnelle sans perdre la traçabilité.',
  },
}

function logosFor(lang) {
  return SERVICE_META.map((s) => ({ ...s, description: LOGO_DESCRIPTIONS[lang][s.slug] }))
}

// ---------------------------------------------------------------------------
// PageContent (home / about / project / blogs / single)
// ---------------------------------------------------------------------------
const PAGE_CONTENT = {
  en: {
    'home-hero': {
      title: 'Build a Salesforce operation your teams can rely on',
      description: 'PeakNova helps companies implement, improve and support Salesforce around the way their sales, service and operations teams actually work. We combine process design, platform configuration, automation and integration to create a CRM environment that is practical today and ready to scale tomorrow.',
      buttonText: 'Book a Salesforce consultation',
      image: 'illustrations/crm-operations-hub.svg',
    },
    'home-problem': {
      title: 'Salesforce should reduce operational friction — not create more of it',
      description: 'The platform is powerful, but results depend on how it is designed, configured and adopted. When Salesforce does not reflect the real operation, teams return to spreadsheets, reports lose credibility and every change becomes more expensive.',
      cards: [
        { Icon: 'MdOutlinePersonSearch', title: 'Low user adoption', description: 'Users avoid Salesforce when screens, fields and workflows do not match the way they sell, support customers or manage daily work.', color: 'sales' },
        { Icon: 'FaChartArea', title: 'Unreliable data and reporting', description: 'Duplicate records, inconsistent processes and unclear ownership make dashboards difficult to trust and automation risky to expand.', color: 'tableau' },
        { Icon: 'RiGlobalLine', title: 'Disconnected business systems', description: 'Salesforce cannot provide a complete operational view when ERP, finance, marketing, support and internal tools remain isolated.', color: 'mulesoft' },
        { Icon: 'MdOutlineSecurity', title: 'Uncontrolled customisation', description: 'Years of quick fixes can create technical debt, fragile automation and a platform that becomes harder to maintain with every release.', color: 'service' },
      ],
    },
    'home-info1': {
      image: 'illustrations/process-to-configuration.svg',
      title: 'Business process first. Salesforce configuration second.',
      description: 'We begin by understanding how work moves through your organisation: how leads are qualified, opportunities progress, customers are supported, approvals are made and information moves between teams. Configuration decisions are then tied to those real processes, reducing unnecessary complexity and improving adoption.',
    },
    'home-info2': {
      image: 'illustrations/crm-architecture-layers.svg',
      title: 'A CRM architecture designed for change',
      description: 'Salesforce should continue supporting the business as teams, products and processes evolve. We favour maintainable configuration, documented automation, controlled permissions and clear integration patterns so future improvements do not require rebuilding the platform from the ground up.',
    },
    'home-action': {
      title: 'Need to implement Salesforce, improve an existing org or regain control of a difficult setup?',
      buttonText: 'Discuss your Salesforce project',
      image: 'talk.svg',
      color: 'primary',
    },
    'home-contact': {
      title: 'Tell us what is not working — or what you need to build',
      description: 'Share your current situation, objectives and constraints. PeakNova will review the request and arrange an initial conversation to understand the business process, Salesforce scope, integrations and expected next steps.',
    },
    'about-hero': {
      title: 'Salesforce expertise focused on how the business actually operates',
      description: 'PeakNova helps organisations turn Salesforce into a dependable part of daily operations. Our work connects business-process analysis, CRM architecture, automation, integration and ongoing improvement so the platform supports the teams using it — not only the project plan that created it. PeakNova is a Salesforce Provisional Consulting Partner, helping organisations implement, improve and integrate Salesforce around real operational requirements.',
      buttonText: 'Talk to PeakNova',
      image: 'illustrations/discovery-to-delivery.svg',
    },
    'about-team': {
      title: 'How we work',
      description: 'Our delivery principles are intended to reduce project risk and create better long-term ownership.',
      cards: [
        { title: 'Understand the process', description: 'We document the current workflow, pain points, responsibilities and exceptions before defining the future solution.' },
        { title: 'Design the operating model', description: 'We clarify data ownership, user roles, approval points, automation boundaries and integration responsibilities.' },
        { title: 'Deliver in controlled stages', description: 'Work is divided into reviewable increments so stakeholders can validate functionality before major production changes.' },
        { title: 'Test real scenarios', description: 'Testing is based on realistic user journeys, data conditions and exceptions rather than only confirming that a screen loads.' },
        { title: 'Prepare users and administrators', description: 'Training, documentation and knowledge transfer are considered part of delivery, not optional work after launch.' },
        { title: 'Improve after go-live', description: 'Once the system is in real use, we can review adoption, process gaps, reporting needs and new automation opportunities.' },
      ],
    },
    'about-action': {
      title: 'From initial Salesforce planning to complex improvement projects',
      description: 'PeakNova can support first-time implementations, existing-org reviews, automation, data work, integrations, reporting and ongoing administration. The engagement is shaped around the operational problem rather than a fixed package.',
      buttonText: 'Explore Salesforce services',
      image: 'illustrations/implementation-stages.svg',
    },
    'about-contact': {
      title: 'Let us review your current Salesforce situation',
      description: 'Whether you are starting from zero, replacing manual processes or trying to stabilise an existing implementation, the first step is to understand the business and technical context.',
    },
    'project-hero': {
      title: 'Representative Salesforce delivery scenarios',
      description: 'The examples below illustrate the type of Salesforce challenges PeakNova can address. They are representative engagement scenarios and must not be presented as named customer case studies or as verified performance claims.',
      image: 'illustrations/engagement-scenario.svg',
    },
    'project-step': {
      title: 'How a Salesforce engagement progresses',
      cards: [
        { Icon: 'MdOutlinePersonSearch', title: 'Discovery and operational mapping', description: 'We review the current process, users, data, systems, risks and expected outcomes before defining the solution scope.', color: 'sales' },
        { Icon: 'GiScales', title: 'Architecture and delivery planning', description: 'We define the Salesforce model, automation boundaries, integrations, permissions, migration approach and delivery stages.', color: 'einstein' },
        { Icon: 'MdOutlineSecurity', title: 'Configuration and validation', description: 'The solution is built in controlled increments and reviewed against realistic user scenarios and business exceptions.', color: 'service' },
        { Icon: 'BiSupport', title: 'Data, testing and preparation', description: 'Migration, permissions, user acceptance testing, documentation and go-live preparation are managed as part of the delivery plan.', color: 'tableau' },
        { Icon: 'FaChartLine', title: 'Launch and improvement', description: 'After production release, we review adoption, issues, reporting needs and opportunities for further optimisation.', color: 'mulesoft' },
      ],
    },
    'project-image': {
      image: 'bg-1.png',
      cards: [
        { id: 'p1', Icon: 'FaChartLine', title: 'Sales pipeline structure', description: 'Turning a fragmented sales process into a pipeline the team can trust.' },
        { id: 'p2', Icon: 'RiCustomerService2Line', title: 'Service consolidation', description: 'Bringing scattered support channels into a single, structured Service Cloud process.' },
        { id: 'p3', Icon: 'TbHexagonLetterMFilled', title: 'System integration', description: 'Connecting Salesforce to ERP and finance systems with controlled, documented API flows.' },
      ],
    },
    'project-project': {
      title: 'Examples of the problems we can help solve',
    },
    'project-contact': {
      title: 'Have a Salesforce challenge that does not fit a standard package?',
      description: 'Most Salesforce projects involve a combination of process, platform, data and integration decisions. Share the current situation and we will help structure the next step.',
    },
    'blogs-hero': {
      title: 'Practical Salesforce guidance for business and technical teams',
      description: 'Articles on Salesforce implementation, adoption, automation, data quality, integration, governance and long-term platform improvement.',
    },
    'blogs-contact': {
      title: 'Need advice on a Salesforce situation specific to your organisation?',
      description: 'An article can explain the general approach. A focused discussion can help determine how it applies to your processes, data, users and connected systems.',
    },
    'single-contact': {
      title: 'Need advice on a Salesforce situation specific to your organisation?',
      description: 'An article can explain the general approach. A focused discussion can help determine how it applies to your processes, data, users and connected systems.',
    },
  },
  tr: {
    'home-hero': {
      title: 'Ekiplerinizin güvenebileceği bir Salesforce yapısı kurun',
      description: 'PeakNova, satış, hizmet ve operasyon ekiplerinizin gerçek çalışma şekline uygun bir Salesforce kurmanıza, geliştirmenize ve desteklemenize yardımcı olur. Süreç tasarımı, platform yapılandırması, otomasyon ve entegrasyonu bir araya getirerek bugün pratik, yarın büyümeye hazır bir CRM ortamı oluşturuyoruz.',
      buttonText: 'Salesforce görüşmesi planlayın',
      image: 'illustrations/crm-operations-hub.svg',
    },
    'home-problem': {
      title: 'Salesforce operasyonel sürtünmeyi azaltmalı — artırmamalı',
      description: 'Platform güçlüdür, ancak sonuçlar nasıl tasarlandığına, yapılandırıldığına ve benimsendiğine bağlıdır. Salesforce gerçek operasyonu yansıtmadığında ekipler Excel\'e geri döner, raporlar güvenilirliğini yitirir ve her değişiklik daha maliyetli hale gelir.',
      cards: [
        { Icon: 'MdOutlinePersonSearch', title: 'Düşük kullanıcı benimsemesi', description: 'Ekranlar, alanlar ve iş akışları satış yapma, müşteriye destek verme veya günlük işi yönetme şekliyle uyuşmadığında kullanıcılar Salesforce\'tan kaçınır.', color: 'sales' },
        { Icon: 'FaChartArea', title: 'Güvenilmez veri ve raporlama', description: 'Yinelenen kayıtlar, tutarsız süreçler ve belirsiz sahiplik, panolara güvenmeyi zorlaştırır ve otomasyonu genişletmeyi riskli hale getirir.', color: 'tableau' },
        { Icon: 'RiGlobalLine', title: 'Bağlantısız iş sistemleri', description: 'ERP, finans, pazarlama, destek ve iç araçlar izole kaldığında Salesforce tam bir operasyonel görünüm sağlayamaz.', color: 'mulesoft' },
        { Icon: 'MdOutlineSecurity', title: 'Kontrolsüz özelleştirme', description: 'Yıllar içinde birikmiş hızlı çözümler; teknik borç, kırılgan otomasyon ve her sürümde bakımı zorlaşan bir platform yaratabilir.', color: 'service' },
      ],
    },
    'home-info1': {
      image: 'illustrations/process-to-configuration.svg',
      title: 'Önce iş süreci, sonra Salesforce yapılandırması',
      description: 'İşin kuruluşunuz içinde nasıl ilerlediğini anlayarak başlarız: müşteri adayları nasıl nitelendiriliyor, fırsatlar nasıl ilerliyor, müşterilere nasıl destek veriliyor, onaylar nasıl alınıyor ve bilgi ekipler arasında nasıl akıyor. Yapılandırma kararları bu gerçek süreçlere bağlanır; böylece gereksiz karmaşıklık azalır ve benimseme artar.',
    },
    'home-info2': {
      image: 'illustrations/crm-architecture-layers.svg',
      title: 'Değişime göre tasarlanmış bir CRM mimarisi',
      description: 'Ekipler, ürünler ve süreçler geliştikçe Salesforce işletmeyi desteklemeye devam etmelidir. Sürdürülebilir yapılandırmayı, belgelenmiş otomasyonu, kontrollü yetkilendirmeyi ve net entegrasyon modellerini tercih ediyoruz; böylece gelecekteki geliştirmeler platformu sıfırdan yeniden kurmayı gerektirmez.',
    },
    'home-action': {
      title: 'Salesforce kurmanız, mevcut bir ortamı geliştirmeniz ya da zorlu bir kurulumun kontrolünü yeniden ele almanız mı gerekiyor?',
      buttonText: 'Salesforce projenizi görüşelim',
      image: 'talk.svg',
      color: 'primary',
    },
    'home-contact': {
      title: 'Neyin çalışmadığını — ya da neyi kurmanız gerektiğini anlatın',
      description: 'Mevcut durumunuzu, hedeflerinizi ve kısıtlarınızı paylaşın. PeakNova talebi inceleyecek ve iş süreci, Salesforce kapsamı, entegrasyonlar ve beklenen sonraki adımları anlamak için bir ilk görüşme planlayacaktır.',
    },
    'about-hero': {
      title: 'İşletmenin gerçekte nasıl çalıştığına odaklanan Salesforce uzmanlığı',
      description: 'PeakNova, Salesforce\'u günlük operasyonların güvenilir bir parçası haline getirmenize yardımcı olur. Çalışmalarımız iş süreci analizini, CRM mimarisini, otomasyonu, entegrasyonu ve sürekli geliştirmeyi bir araya getirir; böylece platform yalnızca onu kuran proje planını değil, onu kullanan ekipleri de destekler. PeakNova, kuruluşların gerçek operasyonel ihtiyaçları etrafında Salesforce\'u kurmasına, geliştirmesine ve entegre etmesine yardımcı olan bir Salesforce Geçici (Provisional) Danışmanlık Ortağı\'dır.',
      buttonText: 'PeakNova ile görüşün',
      image: 'illustrations/discovery-to-delivery.svg',
    },
    'about-team': {
      title: 'Nasıl çalışıyoruz',
      description: 'Teslimat ilkelerimiz proje riskini azaltmayı ve daha iyi bir uzun vadeli sahiplenme sağlamayı amaçlar.',
      cards: [
        { title: 'Süreci anlamak', description: 'Gelecekteki çözümü tanımlamadan önce mevcut iş akışını, sorun noktalarını, sorumlulukları ve istisnaları belgeleriz.' },
        { title: 'Çalışma modelini tasarlamak', description: 'Veri sahipliğini, kullanıcı rollerini, onay noktalarını, otomasyon sınırlarını ve entegrasyon sorumluluklarını netleştiririz.' },
        { title: 'Kontrollü aşamalarla teslim etmek', description: 'Çalışma, paydaşların büyük üretim değişikliklerinden önce işlevselliği doğrulayabileceği, gözden geçirilebilir artışlara bölünür.' },
        { title: 'Gerçek senaryoları test etmek', description: 'Testler yalnızca bir ekranın açıldığını doğrulamak yerine gerçekçi kullanıcı yolculuklarına, veri koşullarına ve istisnalara dayanır.' },
        { title: 'Kullanıcıları ve yöneticileri hazırlamak', description: 'Eğitim, dokümantasyon ve bilgi aktarımı, devreye almadan sonraki isteğe bağlı bir iş değil, teslimatın bir parçası olarak ele alınır.' },
        { title: 'Devreye almadan sonra geliştirmek', description: 'Sistem gerçek kullanıma geçtiğinde; benimsemeyi, süreç eksikliklerini, raporlama ihtiyaçlarını ve yeni otomasyon fırsatlarını gözden geçirebiliriz.' },
      ],
    },
    'about-action': {
      title: 'İlk Salesforce planlamasından karmaşık geliştirme projelerine',
      description: 'PeakNova; ilk kurulumları, mevcut ortam incelemelerini, otomasyonu, veri çalışmalarını, entegrasyonları, raporlamayı ve sürekli yönetimi destekleyebilir. Çalışma, sabit bir paket yerine operasyonel soruna göre şekillendirilir.',
      buttonText: 'Salesforce hizmetlerini keşfedin',
      image: 'illustrations/implementation-stages.svg',
    },
    'about-contact': {
      title: 'Mevcut Salesforce durumunuzu birlikte inceleyelim',
      description: 'İster sıfırdan başlıyor, ister manuel süreçlerin yerini alıyor, ister mevcut bir kurulumu stabilize etmeye çalışıyor olun, ilk adım iş ve teknik bağlamı anlamaktır.',
    },
    'project-hero': {
      title: 'Temsili Salesforce proje senaryoları',
      description: 'Aşağıdaki örnekler PeakNova\'nın ele alabileceği Salesforce zorluklarının türünü göstermektedir. Bunlar temsili proje senaryolarıdır ve isimlendirilmiş müşteri vaka çalışmaları ya da doğrulanmış performans iddiaları olarak sunulmamalıdır.',
      image: 'illustrations/engagement-scenario.svg',
    },
    'project-step': {
      title: 'Bir Salesforce projesi nasıl ilerler',
      cards: [
        { Icon: 'MdOutlinePersonSearch', title: 'Keşif ve operasyonel haritalama', description: 'Çözüm kapsamını tanımlamadan önce mevcut süreci, kullanıcıları, veriyi, sistemleri, riskleri ve beklenen sonuçları inceleriz.', color: 'sales' },
        { Icon: 'GiScales', title: 'Mimari ve teslimat planlaması', description: 'Salesforce modelini, otomasyon sınırlarını, entegrasyonları, yetkilendirmeleri, geçiş yaklaşımını ve teslimat aşamalarını tanımlarız.', color: 'einstein' },
        { Icon: 'MdOutlineSecurity', title: 'Yapılandırma ve doğrulama', description: 'Çözüm kontrollü artışlarla kurulur ve gerçekçi kullanıcı senaryolarına ve iş istisnalarına göre gözden geçirilir.', color: 'service' },
        { Icon: 'BiSupport', title: 'Veri, test ve hazırlık', description: 'Geçiş, yetkilendirme, kullanıcı kabul testi, dokümantasyon ve devreye alma hazırlığı teslimat planının bir parçası olarak yönetilir.', color: 'tableau' },
        { Icon: 'FaChartLine', title: 'Devreye alma ve geliştirme', description: 'Üretime geçtikten sonra benimsemeyi, sorunları, raporlama ihtiyaçlarını ve ileri optimizasyon fırsatlarını gözden geçiririz.', color: 'mulesoft' },
      ],
    },
    'project-image': {
      image: 'bg-1.png',
      cards: [
        { id: 'p1', Icon: 'FaChartLine', title: 'Satış pipeline yapısı', description: 'Dağınık bir satış sürecini ekibin güvenebileceği bir pipeline\'a dönüştürmek.' },
        { id: 'p2', Icon: 'RiCustomerService2Line', title: 'Hizmet konsolidasyonu', description: 'Dağınık destek kanallarını tek, yapılandırılmış bir Service Cloud sürecine taşımak.' },
        { id: 'p3', Icon: 'TbHexagonLetterMFilled', title: 'Sistem entegrasyonu', description: 'Salesforce\'u kontrollü, belgelenmiş API akışlarıyla ERP ve finans sistemlerine bağlamak.' },
      ],
    },
    'project-project': {
      title: 'Çözmenize yardımcı olabileceğimiz sorun örnekleri',
    },
    'project-contact': {
      title: 'Standart bir pakete uymayan bir Salesforce sorununuz mu var?',
      description: 'Çoğu Salesforce projesi süreç, platform, veri ve entegrasyon kararlarının bir bileşimini içerir. Mevcut durumu paylaşın, sonraki adımı birlikte yapılandıralım.',
    },
    'blogs-hero': {
      title: 'İş ve teknik ekipler için pratik Salesforce rehberliği',
      description: 'Salesforce kurulumu, benimseme, otomasyon, veri kalitesi, entegrasyon, yönetişim ve uzun vadeli platform geliştirme üzerine makaleler.',
    },
    'blogs-contact': {
      title: 'Kuruluşunuza özgü bir Salesforce durumu hakkında tavsiyeye mi ihtiyacınız var?',
      description: 'Bir makale genel yaklaşımı anlatabilir. Odaklı bir görüşme, bunun sizin süreçlerinize, verinize, kullanıcılarınıza ve bağlı sistemlerinize nasıl uygulandığını belirlemeye yardımcı olabilir.',
    },
    'single-contact': {
      title: 'Kuruluşunuza özgü bir Salesforce durumu hakkında tavsiyeye mi ihtiyacınız var?',
      description: 'Bir makale genel yaklaşımı anlatabilir. Odaklı bir görüşme, bunun sizin süreçlerinize, verinize, kullanıcılarınıza ve bağlı sistemlerinize nasıl uygulandığını belirlemeye yardımcı olabilir.',
    },
  },
  fr: {
    'home-hero': {
      title: 'Construisez un environnement Salesforce sur lequel vos équipes peuvent compter',
      description: 'PeakNova aide les entreprises à implémenter, améliorer et accompagner Salesforce en fonction de la façon dont leurs équipes commerciales, service client et opérations travaillent réellement. Nous combinons conception des processus, configuration de la plateforme, automatisation et intégration pour créer un environnement CRM à la fois opérationnel aujourd\'hui et prêt à évoluer demain.',
      buttonText: 'Réserver une consultation Salesforce',
      image: 'illustrations/crm-operations-hub.svg',
    },
    'home-problem': {
      title: 'Salesforce devrait réduire les frictions opérationnelles — pas en créer davantage',
      description: 'La plateforme est puissante, mais les résultats dépendent de la façon dont elle est conçue, configurée et adoptée. Quand Salesforce ne reflète pas l\'activité réelle, les équipes reviennent aux tableurs, les rapports perdent leur crédibilité et chaque changement devient plus coûteux.',
      cards: [
        { Icon: 'MdOutlinePersonSearch', title: 'Faible adoption par les utilisateurs', description: 'Les utilisateurs évitent Salesforce quand les écrans, champs et processus ne correspondent pas à leur façon de vendre, de traiter les clients ou de gérer leur travail quotidien.', color: 'sales' },
        { Icon: 'FaChartArea', title: 'Données et reporting peu fiables', description: 'Doublons, processus incohérents et propriété des données mal définie rendent les tableaux de bord difficiles à croire et l\'automatisation risquée à étendre.', color: 'tableau' },
        { Icon: 'RiGlobalLine', title: 'Systèmes métiers déconnectés', description: 'Salesforce ne peut offrir une vision opérationnelle complète quand l\'ERP, la finance, le marketing, le support et les outils internes restent cloisonnés.', color: 'mulesoft' },
        { Icon: 'MdOutlineSecurity', title: 'Personnalisation non maîtrisée', description: 'Des années de correctifs rapides peuvent créer de la dette technique, une automatisation fragile et une plateforme de plus en plus difficile à maintenir à chaque mise à jour.', color: 'service' },
      ],
    },
    'home-info1': {
      image: 'illustrations/process-to-configuration.svg',
      title: 'Le processus métier d\'abord. La configuration Salesforce ensuite.',
      description: 'Nous commençons par comprendre comment le travail circule dans votre organisation : comment les leads sont qualifiés, comment les opportunités progressent, comment les clients sont accompagnés, comment les validations sont réalisées et comment l\'information circule entre les équipes. Les décisions de configuration sont ensuite reliées à ces processus réels, ce qui réduit la complexité inutile et améliore l\'adoption.',
    },
    'home-info2': {
      image: 'illustrations/crm-architecture-layers.svg',
      title: 'Une architecture CRM conçue pour évoluer',
      description: 'Salesforce doit continuer à soutenir l\'entreprise à mesure que les équipes, les produits et les processus évoluent. Nous privilégions une configuration maintenable, une automatisation documentée, des permissions maîtrisées et des schémas d\'intégration clairs afin que les évolutions futures ne nécessitent pas de reconstruire la plateforme depuis zéro.',
    },
    'home-action': {
      title: 'Besoin d\'implémenter Salesforce, d\'améliorer un environnement existant ou de reprendre le contrôle d\'une configuration difficile ?',
      buttonText: 'Discuter de votre projet Salesforce',
      image: 'talk.svg',
      color: 'primary',
    },
    'home-contact': {
      title: 'Dites-nous ce qui ne fonctionne pas — ou ce que vous devez construire',
      description: 'Partagez votre situation actuelle, vos objectifs et vos contraintes. PeakNova examinera la demande et organisera un premier échange pour comprendre le processus métier, le périmètre Salesforce, les intégrations et les prochaines étapes attendues.',
    },
    'about-hero': {
      title: 'Une expertise Salesforce centrée sur le fonctionnement réel de l\'entreprise',
      description: 'PeakNova aide les organisations à faire de Salesforce un pilier fiable de leurs opérations quotidiennes. Notre travail relie l\'analyse des processus métiers, l\'architecture CRM, l\'automatisation, l\'intégration et l\'amélioration continue, afin que la plateforme serve les équipes qui l\'utilisent — et pas seulement le plan de projet qui l\'a créée. PeakNova est un partenaire de conseil Salesforce en statut provisoire (Provisional Consulting Partner), qui aide les organisations à implémenter, améliorer et intégrer Salesforce autour de besoins opérationnels réels.',
      buttonText: 'Contacter PeakNova',
      image: 'illustrations/discovery-to-delivery.svg',
    },
    'about-team': {
      title: 'Notre façon de travailler',
      description: 'Nos principes de délivery visent à réduire le risque projet et à garantir une meilleure appropriation à long terme.',
      cards: [
        { title: 'Comprendre le processus', description: 'Nous documentons le flux de travail actuel, les points de friction, les responsabilités et les exceptions avant de définir la solution future.' },
        { title: 'Concevoir le modèle opérationnel', description: 'Nous clarifions la propriété des données, les rôles utilisateurs, les points de validation, les limites de l\'automatisation et les responsabilités d\'intégration.' },
        { title: 'Livrer par étapes maîtrisées', description: 'Le travail est découpé en incréments vérifiables afin que les parties prenantes valident les fonctionnalités avant les changements majeurs en production.' },
        { title: 'Tester des scénarios réels', description: 'Les tests s\'appuient sur des parcours utilisateurs réalistes, des conditions de données et des exceptions, plutôt que sur la simple vérification qu\'un écran s\'affiche.' },
        { title: 'Préparer utilisateurs et administrateurs', description: 'Formation, documentation et transfert de compétences font partie intégrante de la livraison, et non une option après le lancement.' },
        { title: 'Améliorer après la mise en service', description: 'Une fois le système en usage réel, nous pouvons revoir l\'adoption, les manques de processus, les besoins de reporting et les nouvelles opportunités d\'automatisation.' },
      ],
    },
    'about-action': {
      title: 'De la planification Salesforce initiale aux projets d\'amélioration complexes',
      description: 'PeakNova peut accompagner les premières implémentations, les audits d\'environnements existants, l\'automatisation, les travaux sur la donnée, les intégrations, le reporting et l\'administration continue. La mission est façonnée autour du problème opérationnel plutôt que d\'un forfait figé.',
      buttonText: 'Découvrir les services Salesforce',
      image: 'illustrations/implementation-stages.svg',
    },
    'about-contact': {
      title: 'Faisons le point sur votre situation Salesforce actuelle',
      description: 'Que vous partiez de zéro, remplaciez des processus manuels ou cherchiez à stabiliser une implémentation existante, la première étape consiste à comprendre le contexte métier et technique.',
    },
    'project-hero': {
      title: 'Scénarios représentatifs de missions Salesforce',
      description: 'Les exemples ci-dessous illustrent le type de défis Salesforce que PeakNova peut traiter. Ce sont des scénarios de mission représentatifs et ils ne doivent pas être présentés comme des études de cas clients nommées ni comme des résultats de performance vérifiés.',
      image: 'illustrations/engagement-scenario.svg',
    },
    'project-step': {
      title: 'Déroulement d\'une mission Salesforce',
      cards: [
        { Icon: 'MdOutlinePersonSearch', title: 'Découverte et cartographie opérationnelle', description: 'Nous examinons le processus actuel, les utilisateurs, les données, les systèmes, les risques et les résultats attendus avant de définir le périmètre de la solution.', color: 'sales' },
        { Icon: 'GiScales', title: 'Architecture et planification de la livraison', description: 'Nous définissons le modèle Salesforce, les limites de l\'automatisation, les intégrations, les permissions, l\'approche de migration et les étapes de livraison.', color: 'einstein' },
        { Icon: 'MdOutlineSecurity', title: 'Configuration et validation', description: 'La solution est construite par incréments maîtrisés et évaluée au regard de scénarios utilisateurs réalistes et d\'exceptions métier.', color: 'service' },
        { Icon: 'BiSupport', title: 'Données, tests et préparation', description: 'Migration, permissions, recette utilisateur, documentation et préparation de la mise en service sont gérées dans le cadre du plan de livraison.', color: 'tableau' },
        { Icon: 'FaChartLine', title: 'Lancement et amélioration', description: 'Après la mise en production, nous examinons l\'adoption, les incidents, les besoins de reporting et les opportunités d\'optimisation supplémentaires.', color: 'mulesoft' },
      ],
    },
    'project-image': {
      image: 'bg-1.png',
      cards: [
        { id: 'p1', Icon: 'FaChartLine', title: 'Structuration du pipeline commercial', description: 'Transformer un processus commercial fragmenté en un pipeline fiable pour l\'équipe.' },
        { id: 'p2', Icon: 'RiCustomerService2Line', title: 'Consolidation du service client', description: 'Rassembler des canaux de support dispersés dans un processus Service Cloud unique et structuré.' },
        { id: 'p3', Icon: 'TbHexagonLetterMFilled', title: 'Intégration système', description: 'Connecter Salesforce à des systèmes ERP et financiers via des flux API maîtrisés et documentés.' },
      ],
    },
    'project-project': {
      title: 'Exemples de problèmes que nous pouvons vous aider à résoudre',
    },
    'project-contact': {
      title: 'Un défi Salesforce qui ne correspond pas à un forfait standard ?',
      description: 'La plupart des projets Salesforce combinent des décisions de processus, de plateforme, de données et d\'intégration. Partagez votre situation actuelle et nous vous aiderons à structurer la prochaine étape.',
    },
    'blogs-hero': {
      title: 'Des conseils Salesforce concrets pour les équipes métier et techniques',
      description: 'Articles sur l\'implémentation Salesforce, l\'adoption, l\'automatisation, la qualité des données, l\'intégration, la gouvernance et l\'amélioration de plateforme à long terme.',
    },
    'blogs-contact': {
      title: 'Besoin de conseils sur une situation Salesforce propre à votre organisation ?',
      description: 'Un article peut expliquer l\'approche générale. Un échange ciblé permet de déterminer comment elle s\'applique à vos processus, vos données, vos utilisateurs et vos systèmes connectés.',
    },
    'single-contact': {
      title: 'Besoin de conseils sur une situation Salesforce propre à votre organisation ?',
      description: 'Un article peut expliquer l\'approche générale. Un échange ciblé permet de déterminer comment elle s\'applique à vos processus, vos données, vos utilisateurs et vos systèmes connectés.',
    },
  },
}

// ---------------------------------------------------------------------------
// About model (Our purpose / Our approach / Our commitment)
// ---------------------------------------------------------------------------
const ABOUT_ITEMS = {
  en: [
    { title: 'Our purpose', description: 'Salesforce can become one of the most valuable operating platforms in a company, but only when technology decisions reflect real workflows, responsibilities and customer journeys. PeakNova exists to close the gap between platform capability and day-to-day execution.' },
    { title: 'Our approach', description: 'We begin with the operation rather than the feature list. We identify what users need to accomplish, where information is created, how decisions are made, which systems must exchange data and where control is required. The Salesforce solution is then designed around those findings.' },
    { title: 'Our commitment', description: 'We aim to leave clients with a Salesforce environment that is clearer, more stable and easier to evolve. That means avoiding unnecessary complexity, documenting important decisions and continuing to support optimisation after initial delivery.' },
  ],
  tr: [
    { title: 'Amacımız', description: 'Salesforce, bir şirketteki en değerli işletim platformlarından biri haline gelebilir, ancak yalnızca teknoloji kararları gerçek iş akışlarını, sorumlulukları ve müşteri yolculuklarını yansıttığında. PeakNova, platform kapasitesi ile günlük yürütme arasındaki farkı kapatmak için var.' },
    { title: 'Yaklaşımımız', description: 'Özellik listesiyle değil, operasyonla başlarız. Kullanıcıların neyi başarması gerektiğini, bilginin nerede oluştuğunu, kararların nasıl alındığını, hangi sistemlerin veri alışverişi yapması gerektiğini ve nerede kontrol gerektiğini belirleriz. Salesforce çözümü bu bulgular etrafında tasarlanır.' },
    { title: 'Taahhüdümüz', description: 'Müşterilere daha net, daha stabil ve geliştirilmesi daha kolay bir Salesforce ortamı bırakmayı hedefliyoruz. Bu; gereksiz karmaşıklıktan kaçınmak, önemli kararları belgelemek ve ilk teslimattan sonra da optimizasyonu desteklemeye devam etmek anlamına gelir.' },
  ],
  fr: [
    { title: 'Notre raison d\'être', description: 'Salesforce peut devenir l\'une des plateformes opérationnelles les plus précieuses d\'une entreprise, mais seulement lorsque les décisions technologiques reflètent les flux de travail réels, les responsabilités et les parcours clients. PeakNova existe pour combler l\'écart entre le potentiel de la plateforme et son exécution quotidienne.' },
    { title: 'Notre approche', description: 'Nous partons de l\'activité plutôt que de la liste de fonctionnalités. Nous identifions ce que les utilisateurs doivent accomplir, où l\'information est créée, comment les décisions sont prises, quels systèmes doivent échanger des données et où un contrôle est nécessaire. La solution Salesforce est ensuite conçue à partir de ces constats.' },
    { title: 'Notre engagement', description: 'Nous visons à laisser aux clients un environnement Salesforce plus clair, plus stable et plus facile à faire évoluer. Cela signifie éviter la complexité inutile, documenter les décisions importantes et continuer à accompagner l\'optimisation après la livraison initiale.' },
  ],
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------
const FAQ_ITEMS = {
  en: [
    { question: 'What types of Salesforce projects does PeakNova support?', answer: 'PeakNova supports first-time implementations, existing-org optimisation, Sales Cloud, Service Cloud, automation, reporting, data migration, integrations, Salesforce AI use cases and ongoing administration. The exact scope is defined after reviewing the business process and current technical environment.' },
    { question: 'Can you improve an existing Salesforce implementation?', answer: 'Yes. We can review the current configuration, automation, permissions, data quality, reporting, integrations and user experience. The result can be a prioritised improvement roadmap or a staged optimisation engagement.' },
    { question: 'Do you only work with companies that already use Salesforce?', answer: 'No. PeakNova can support both companies evaluating or implementing Salesforce for the first time and organisations that already have an active Salesforce environment.' },
    { question: 'How do you begin a Salesforce project?', answer: 'We begin with discovery. This includes the business process, user groups, current systems, data, operational pain points, risks and desired outcomes. The delivery approach is then proposed based on that context.' },
    { question: 'Can you integrate Salesforce with our existing systems?', answer: 'Yes. PeakNova can help design and implement integrations with ERP, finance, marketing, support, e-commerce and custom applications using APIs, webhooks, middleware or MuleSoft where appropriate.' },
    { question: 'Do you provide Salesforce automation services?', answer: 'Yes. We can design and improve Salesforce Flow automation, approvals, routing, reminders, notifications and connected workflows. Automation is reviewed in the context of ownership, exceptions, permissions and maintainability.' },
    { question: 'Can you help with Salesforce data migration?', answer: 'Yes. Data-migration work can include source analysis, mapping, cleansing, deduplication, validation, import planning and post-migration checks. The exact approach depends on the source systems and data quality.' },
    { question: 'Do you provide ongoing Salesforce support?', answer: 'Yes. Ongoing support can include administration, troubleshooting, incremental improvements, reporting, automation changes, user support and platform reviews.' },
    { question: 'Can PeakNova support international teams?', answer: 'PeakNova can communicate with English, French and Turkish-speaking stakeholders. This can be useful for organisations whose decision-makers, operational users and technical teams work across different countries or languages.' },
    { question: 'How long does a Salesforce project take?', answer: 'The timeline depends on the number of processes, user groups, integrations, data sources and required controls. A focused improvement may take a few weeks, while a broader implementation or integration programme requires a staged plan. A realistic estimate is provided after discovery.' },
    { question: 'Will our internal team be able to maintain the system?', answer: 'Maintainability is an important design objective. We aim to use structured configuration, documented decisions and knowledge transfer so the client is not unnecessarily dependent on external support for every change.' },
    { question: 'How do we start?', answer: 'Send PeakNova a summary of the current situation, the main operational problem and the desired outcome. We will arrange an initial discussion and recommend the most appropriate next step.' },
  ],
  tr: [
    { question: 'PeakNova hangi Salesforce projelerini destekliyor?', answer: 'PeakNova; ilk kurulumları, mevcut ortam optimizasyonunu, Sales Cloud, Service Cloud, otomasyon, raporlama, veri geçişi, entegrasyonları, Salesforce yapay zeka kullanım alanlarını ve sürekli yönetimi destekler. Kesin kapsam, iş süreci ve mevcut teknik ortam incelendikten sonra belirlenir.' },
    { question: 'Mevcut bir Salesforce kurulumunu geliştirebilir misiniz?', answer: 'Evet. Mevcut yapılandırmayı, otomasyonu, yetkilendirmeleri, veri kalitesini, raporlamayı, entegrasyonları ve kullanıcı deneyimini inceleyebiliriz. Sonuç, önceliklendirilmiş bir geliştirme yol haritası veya aşamalı bir optimizasyon çalışması olabilir.' },
    { question: 'Yalnızca zaten Salesforce kullanan şirketlerle mi çalışıyorsunuz?', answer: 'Hayır. PeakNova, Salesforce\'u ilk kez değerlendiren veya kuran şirketleri de, halihazırda aktif bir Salesforce ortamı olan kuruluşları da destekleyebilir.' },
    { question: 'Bir Salesforce projesine nasıl başlıyorsunuz?', answer: 'Keşif ile başlarız. Bu; iş süreci, kullanıcı grupları, mevcut sistemler, veri, operasyonel sorun noktaları, riskler ve istenen sonuçları kapsar. Teslimat yaklaşımı bu bağlama göre önerilir.' },
    { question: 'Salesforce\'u mevcut sistemlerimizle entegre edebilir misiniz?', answer: 'Evet. PeakNova; API\'ler, webhook\'lar, ara katman yazılımları veya uygun olduğunda MuleSoft kullanarak ERP, finans, pazarlama, destek, e-ticaret ve özel uygulamalarla entegrasyonlar tasarlamaya ve uygulamaya yardımcı olabilir.' },
    { question: 'Salesforce otomasyon hizmetleri sunuyor musunuz?', answer: 'Evet. Salesforce Flow otomasyonunu, onayları, yönlendirmeyi, hatırlatmaları, bildirimleri ve bağlı iş akışlarını tasarlayabilir ve geliştirebiliriz. Otomasyon; sahiplik, istisnalar, yetkilendirme ve sürdürülebilirlik bağlamında değerlendirilir.' },
    { question: 'Salesforce veri geçişine yardımcı olabilir misiniz?', answer: 'Evet. Veri geçişi çalışması; kaynak analizi, eşleme, temizleme, yineleme giderme, doğrulama, içe aktarma planlaması ve geçiş sonrası kontrolleri kapsayabilir. Kesin yaklaşım kaynak sistemlere ve veri kalitesine bağlıdır.' },
    { question: 'Sürekli Salesforce desteği sağlıyor musunuz?', answer: 'Evet. Sürekli destek; yönetim, sorun giderme, kademeli geliştirmeler, raporlama, otomasyon değişiklikleri, kullanıcı desteği ve platform incelemelerini kapsayabilir.' },
    { question: 'PeakNova uluslararası ekipleri destekleyebilir mi?', answer: 'PeakNova İngilizce, Fransızca ve Türkçe konuşan paydaşlarla iletişim kurabilir. Bu; karar vericilerin, operasyonel kullanıcıların ve teknik ekiplerin farklı ülkelerde veya dillerde çalıştığı kuruluşlar için faydalı olabilir.' },
    { question: 'Bir Salesforce projesi ne kadar sürer?', answer: 'Süre; süreç sayısına, kullanıcı gruplarına, entegrasyonlara, veri kaynaklarına ve gerekli kontrollere bağlıdır. Odaklı bir geliştirme birkaç hafta sürebilirken, daha geniş bir kurulum veya entegrasyon programı aşamalı bir plan gerektirir. Gerçekçi bir tahmin keşif sonrasında sunulur.' },
    { question: 'Dahili ekibimiz sistemi sürdürebilecek mi?', answer: 'Sürdürülebilirlik önemli bir tasarım hedefidir. Yapılandırılmış yapılandırma, belgelenmiş kararlar ve bilgi aktarımı kullanmayı hedefliyoruz; böylece müşteri her değişiklik için gereksiz yere dış desteğe bağımlı kalmaz.' },
    { question: 'Nasıl başlıyoruz?', answer: 'PeakNova\'ya mevcut durumun, temel operasyonel sorunun ve istenen sonucun bir özetini gönderin. Bir ilk görüşme planlayacak ve en uygun sonraki adımı önereceğiz.' },
  ],
  fr: [
    { question: 'Quels types de projets Salesforce PeakNova accompagne-t-il ?', answer: 'PeakNova accompagne les premières implémentations, l\'optimisation d\'environnements existants, Sales Cloud, Service Cloud, l\'automatisation, le reporting, la migration de données, les intégrations, les cas d\'usage de l\'IA Salesforce et l\'administration continue. Le périmètre exact est défini après examen du processus métier et de l\'environnement technique actuel.' },
    { question: 'Pouvez-vous améliorer une implémentation Salesforce existante ?', answer: 'Oui. Nous pouvons examiner la configuration actuelle, l\'automatisation, les permissions, la qualité des données, le reporting, les intégrations et l\'expérience utilisateur. Le résultat peut être une feuille de route d\'amélioration priorisée ou une mission d\'optimisation par étapes.' },
    { question: 'Travaillez-vous uniquement avec des entreprises qui utilisent déjà Salesforce ?', answer: 'Non. PeakNova peut accompagner aussi bien les entreprises qui évaluent ou implémentent Salesforce pour la première fois que celles disposant déjà d\'un environnement Salesforce actif.' },
    { question: 'Comment démarrez-vous un projet Salesforce ?', answer: 'Nous commençons par la découverte : processus métier, groupes d\'utilisateurs, systèmes actuels, données, points de friction opérationnels, risques et résultats souhaités. L\'approche de livraison est ensuite proposée sur cette base.' },
    { question: 'Pouvez-vous intégrer Salesforce à nos systèmes existants ?', answer: 'Oui. PeakNova peut aider à concevoir et implémenter des intégrations avec l\'ERP, la finance, le marketing, le support, l\'e-commerce et des applications spécifiques, via API, webhooks, middleware ou MuleSoft selon les cas.' },
    { question: 'Proposez-vous des services d\'automatisation Salesforce ?', answer: 'Oui. Nous pouvons concevoir et améliorer l\'automatisation Salesforce Flow, les validations, le routage, les rappels, les notifications et les workflows connectés. L\'automatisation est examinée sous l\'angle de la propriété, des exceptions, des permissions et de la maintenabilité.' },
    { question: 'Pouvez-vous nous aider sur la migration de données Salesforce ?', answer: 'Oui. Le travail de migration peut inclure l\'analyse des sources, le mapping, le nettoyage, la déduplication, la validation, la planification de l\'import et les contrôles post-migration. L\'approche exacte dépend des systèmes source et de la qualité des données.' },
    { question: 'Proposez-vous un support Salesforce continu ?', answer: 'Oui. Le support continu peut inclure l\'administration, le dépannage, des améliorations incrémentales, le reporting, des évolutions d\'automatisation, le support utilisateurs et des revues de plateforme.' },
    { question: 'PeakNova peut-il accompagner des équipes internationales ?', answer: 'PeakNova peut échanger avec des parties prenantes anglophones, francophones et turcophones. C\'est utile pour les organisations dont les décideurs, les utilisateurs opérationnels et les équipes techniques travaillent dans différents pays ou langues.' },
    { question: 'Combien de temps dure un projet Salesforce ?', answer: 'Le délai dépend du nombre de processus, de groupes d\'utilisateurs, d\'intégrations, de sources de données et des contrôles requis. Une amélioration ciblée peut prendre quelques semaines, tandis qu\'une implémentation ou un programme d\'intégration plus large nécessite un plan par étapes. Une estimation réaliste est fournie après la découverte.' },
    { question: 'Notre équipe interne pourra-t-elle maintenir le système ?', answer: 'La maintenabilité est un objectif de conception important. Nous visons une configuration structurée, des décisions documentées et un transfert de compétences afin que le client ne dépende pas inutilement d\'un support externe pour chaque changement.' },
    { question: 'Comment démarrer ?', answer: 'Envoyez à PeakNova un résumé de votre situation actuelle, du problème opérationnel principal et du résultat souhaité. Nous organiserons un premier échange et recommanderons la prochaine étape la plus appropriée.' },
  ],
}

// ---------------------------------------------------------------------------
// Representative projects
// ---------------------------------------------------------------------------
const PROJECTS = {
  en: [
    { name: 'sales-process-structure', title: 'Structuring a fragmented B2B sales process', description: 'A representative engagement involving lead qualification, account ownership, opportunity stages, approval rules, follow-up automation and management reporting for a company moving away from spreadsheets and inconsistent sales practices.', image: 'project1.png' },
    { name: 'service-operations-consolidation', title: 'Consolidating customer service operations', description: 'A representative Service Cloud scenario bringing email-based requests, case ownership, escalation, customer history and service reporting into a single controlled support process.', image: 'project2.png' },
    { name: 'salesforce-erp-integration', title: 'Connecting Salesforce with an ERP environment', description: 'A representative integration engagement defining system ownership, customer and product mappings, order or invoice data flows, validation rules, error handling and operational monitoring.', image: 'project1.png' },
    { name: 'salesforce-org-recovery', title: 'Stabilising an over-customised Salesforce org', description: 'A representative optimisation project reviewing automation, permissions, duplicate functionality, technical debt, data quality and user adoption before defining a controlled improvement roadmap.', image: 'project2.png' },
  ],
  tr: [
    { name: 'sales-process-structure', title: 'Dağınık bir B2B satış sürecini yapılandırmak', description: 'Excel tablolarından ve tutarsız satış uygulamalarından uzaklaşan bir şirket için müşteri adayı nitelendirme, hesap sahipliği, fırsat aşamaları, onay kuralları, takip otomasyonu ve yönetim raporlamasını içeren temsili bir proje.', image: 'project1.png' },
    { name: 'service-operations-consolidation', title: 'Müşteri hizmetleri operasyonlarını birleştirmek', description: 'E-posta tabanlı talepleri, vaka sahipliğini, yükseltmeyi, müşteri geçmişini ve hizmet raporlamasını tek, kontrollü bir destek sürecinde birleştiren temsili bir Service Cloud senaryosu.', image: 'project2.png' },
    { name: 'salesforce-erp-integration', title: 'Salesforce\'u bir ERP ortamına bağlamak', description: 'Sistem sahipliğini, müşteri ve ürün eşlemelerini, sipariş veya fatura veri akışlarını, doğrulama kurallarını, hata yönetimini ve operasyonel izlemeyi tanımlayan temsili bir entegrasyon projesi.', image: 'project1.png' },
    { name: 'salesforce-org-recovery', title: 'Aşırı özelleştirilmiş bir Salesforce ortamını stabilize etmek', description: 'Kontrollü bir geliştirme yol haritası tanımlamadan önce otomasyonu, yetkilendirmeleri, yinelenen işlevleri, teknik borcu, veri kalitesini ve kullanıcı benimsemesini gözden geçiren temsili bir optimizasyon projesi.', image: 'project2.png' },
  ],
  fr: [
    { name: 'sales-process-structure', title: 'Structurer un processus commercial B2B fragmenté', description: 'Une mission représentative portant sur la qualification des leads, la propriété des comptes, les étapes d\'opportunité, les règles de validation, l\'automatisation du suivi et le reporting de gestion, pour une entreprise qui abandonne les tableurs et des pratiques commerciales incohérentes.', image: 'project1.png' },
    { name: 'service-operations-consolidation', title: 'Consolider les opérations de service client', description: 'Un scénario Service Cloud représentatif regroupant demandes par e-mail, propriété des dossiers, escalade, historique client et reporting de service dans un processus de support unique et maîtrisé.', image: 'project2.png' },
    { name: 'salesforce-erp-integration', title: 'Connecter Salesforce à un environnement ERP', description: 'Une mission d\'intégration représentative définissant la propriété des systèmes, les correspondances client et produit, les flux de données de commande ou de facturation, les règles de validation, la gestion des erreurs et la supervision opérationnelle.', image: 'project1.png' },
    { name: 'salesforce-org-recovery', title: 'Stabiliser un environnement Salesforce trop personnalisé', description: 'Un projet d\'optimisation représentatif passant en revue l\'automatisation, les permissions, les fonctionnalités redondantes, la dette technique, la qualité des données et l\'adoption utilisateur avant de définir une feuille de route d\'amélioration maîtrisée.', image: 'project2.png' },
  ],
}

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------
const SEO = {
  en: {
    home: {
      slug: 'seo-home-en',
      title: 'Salesforce Consulting, Implementation and Integration | PeakNova',
      description: 'PeakNova helps companies implement, improve and support Salesforce through process design, automation, integration, data migration, reporting and ongoing CRM expertise.',
      keywords: ['Salesforce consulting', 'Salesforce implementation', 'Salesforce integration', 'Salesforce automation', 'Sales Cloud consulting', 'Service Cloud consulting', 'Salesforce optimisation', 'Salesforce support', 'Salesforce Flow', 'MuleSoft integration', 'Salesforce AI', 'CRM consulting Europe'],
    },
    about: {
      slug: 'seo-about-en',
      title: 'About PeakNova | Salesforce-Focused Consultancy',
      description: 'Learn how PeakNova approaches Salesforce implementation, optimisation, automation and integration through practical process analysis and maintainable CRM architecture.',
      keywords: ['about PeakNova', 'Salesforce Provisional Consulting Partner', 'Salesforce consultancy', 'Salesforce-focused consultancy'],
    },
    services: {
      slug: 'seo-services-en',
      title: 'Salesforce Services | Implementation, Automation and Support',
      description: 'Explore PeakNova Salesforce services including Sales Cloud, Service Cloud, automation, integrations, data migration, analytics, AI and ongoing support.',
      keywords: ['Salesforce services', 'Sales Cloud', 'Service Cloud', 'Marketing Cloud', 'Commerce Cloud', 'Salesforce automation', 'Salesforce integration', 'Salesforce AI', 'Salesforce support'],
    },
    projects: {
      slug: 'seo-projects-en',
      title: 'Salesforce Project Scenarios and Delivery Approach | PeakNova',
      description: 'Explore representative Salesforce implementation, optimisation, Service Cloud and integration scenarios and learn how PeakNova structures delivery.',
      keywords: ['Salesforce project examples', 'Salesforce delivery approach', 'Salesforce implementation scenario', 'Salesforce integration scenario'],
    },
    blogs: {
      slug: 'seo-blogs-en',
      title: 'Salesforce Implementation and Automation Insights | PeakNova',
      description: 'Practical articles on Salesforce implementation, CRM adoption, automation, integration, data quality, analytics and platform improvement.',
      keywords: ['Salesforce blog', 'Salesforce implementation insights', 'Salesforce automation', 'CRM adoption'],
    },
  },
  tr: {
    home: {
      slug: 'seo-home-tr',
      title: 'Salesforce Danışmanlığı, Kurulumu ve Entegrasyonu | PeakNova',
      description: 'PeakNova; süreç tasarımı, otomasyon, entegrasyon, veri geçişi, raporlama ve sürekli CRM uzmanlığı ile şirketlerin Salesforce\'u kurmasına, geliştirmesine ve desteklemesine yardımcı olur.',
      keywords: ['Salesforce danışmanlığı', 'Salesforce kurulumu', 'Salesforce entegrasyonu', 'Salesforce otomasyonu', 'Sales Cloud danışmanlığı', 'Service Cloud danışmanlığı', 'Salesforce optimizasyonu', 'Salesforce desteği', 'Salesforce Flow', 'MuleSoft entegrasyonu', 'Salesforce yapay zeka', 'Avrupa CRM danışmanlığı'],
    },
    about: {
      slug: 'seo-about-tr',
      title: 'PeakNova Hakkında | Salesforce Odaklı Danışmanlık',
      description: 'PeakNova\'nın; pratik süreç analizi ve sürdürülebilir CRM mimarisi ile Salesforce kurulumuna, optimizasyonuna, otomasyonuna ve entegrasyonuna nasıl yaklaştığını öğrenin.',
      keywords: ['PeakNova hakkında', 'Salesforce Geçici Danışmanlık Ortağı', 'Salesforce danışmanlığı', 'Salesforce odaklı danışmanlık'],
    },
    services: {
      slug: 'seo-services-tr',
      title: 'Salesforce Hizmetleri | Kurulum, Otomasyon ve Destek',
      description: 'Sales Cloud, Service Cloud, otomasyon, entegrasyonlar, veri geçişi, analitik, yapay zeka ve sürekli destek dahil PeakNova Salesforce hizmetlerini keşfedin.',
      keywords: ['Salesforce hizmetleri', 'Sales Cloud', 'Service Cloud', 'Marketing Cloud', 'Commerce Cloud', 'Salesforce otomasyonu', 'Salesforce entegrasyonu', 'Salesforce yapay zeka', 'Salesforce desteği'],
    },
    projects: {
      slug: 'seo-projects-tr',
      title: 'Salesforce Proje Senaryoları ve Teslimat Yaklaşımı | PeakNova',
      description: 'Temsili Salesforce kurulum, optimizasyon, Service Cloud ve entegrasyon senaryolarını keşfedin ve PeakNova\'nın teslimatı nasıl yapılandırdığını öğrenin.',
      keywords: ['Salesforce proje örnekleri', 'Salesforce teslimat yaklaşımı', 'Salesforce kurulum senaryosu', 'Salesforce entegrasyon senaryosu'],
    },
    blogs: {
      slug: 'seo-blogs-tr',
      title: 'Salesforce Kurulum ve Otomasyon İçgörüleri | PeakNova',
      description: 'Salesforce kurulumu, CRM benimsemesi, otomasyon, entegrasyon, veri kalitesi, analitik ve platform geliştirme üzerine pratik makaleler.',
      keywords: ['Salesforce blog', 'Salesforce kurulum içgörüleri', 'Salesforce otomasyonu', 'CRM benimsemesi'],
    },
  },
  fr: {
    home: {
      slug: 'seo-home-fr',
      title: 'Conseil, implémentation et intégration Salesforce | PeakNova',
      description: 'PeakNova aide les entreprises à implémenter, améliorer et accompagner Salesforce grâce à la conception des processus, l\'automatisation, l\'intégration, la migration de données, le reporting et une expertise CRM continue.',
      keywords: ['conseil Salesforce', 'implémentation Salesforce', 'intégration Salesforce', 'automatisation Salesforce', 'conseil Sales Cloud', 'conseil Service Cloud', 'optimisation Salesforce', 'support Salesforce', 'Salesforce Flow', 'intégration MuleSoft', 'IA Salesforce', 'conseil CRM Europe'],
    },
    about: {
      slug: 'seo-about-fr',
      title: 'À propos de PeakNova | Conseil spécialisé Salesforce',
      description: 'Découvrez comment PeakNova aborde l\'implémentation, l\'optimisation, l\'automatisation et l\'intégration Salesforce grâce à une analyse concrète des processus et une architecture CRM maintenable.',
      keywords: ['à propos de PeakNova', 'partenaire de conseil Salesforce provisoire', 'conseil Salesforce', 'conseil spécialisé Salesforce'],
    },
    services: {
      slug: 'seo-services-fr',
      title: 'Services Salesforce | Implémentation, automatisation et support',
      description: 'Découvrez les services Salesforce de PeakNova : Sales Cloud, Service Cloud, automatisation, intégrations, migration de données, analytique, IA et support continu.',
      keywords: ['services Salesforce', 'Sales Cloud', 'Service Cloud', 'Marketing Cloud', 'Commerce Cloud', 'automatisation Salesforce', 'intégration Salesforce', 'IA Salesforce', 'support Salesforce'],
    },
    projects: {
      slug: 'seo-projects-fr',
      title: 'Scénarios de projets Salesforce et approche de livraison | PeakNova',
      description: 'Découvrez des scénarios représentatifs d\'implémentation Salesforce, d\'optimisation, de Service Cloud et d\'intégration, et la façon dont PeakNova structure sa livraison.',
      keywords: ['exemples de projets Salesforce', 'approche de livraison Salesforce', 'scénario d\'implémentation Salesforce', 'scénario d\'intégration Salesforce'],
    },
    blogs: {
      slug: 'seo-blogs-fr',
      title: 'Implémentation Salesforce et automatisation | Blog PeakNova',
      description: 'Articles pratiques sur l\'implémentation Salesforce, l\'adoption du CRM, l\'automatisation, l\'intégration, la qualité des données, l\'analytique et l\'amélioration de plateforme.',
      keywords: ['blog Salesforce', 'implémentation Salesforce', 'automatisation Salesforce', 'adoption CRM'],
    },
  },
}

// ---------------------------------------------------------------------------
// Blog posts (unchanged from the existing baseline — not covered by the
// approved-copy brief, kept as-is to avoid inventing new editorial content)
// ---------------------------------------------------------------------------
const BLOGS = {
  en: [
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
  tr: [
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
  fr: [
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

// ---------------------------------------------------------------------------
// Individual service pages (hero / ladder / reasons / why / action / contact)
// ---------------------------------------------------------------------------
const SERVICE_COPY = {
  'sales-cloud': {
    en: {
      hero: { title: 'Create a sales process your team can follow and leadership can measure', description: 'PeakNova designs and improves Sales Cloud around the complete commercial process — from lead qualification and account ownership to opportunity stages, approvals, forecasting and management reporting.', buttonText: 'Discuss your Sales Cloud project' },
      ladder: { title: 'Build structure into the full sales cycle', description: 'A useful Sales Cloud implementation does more than store opportunities. It creates clear rules for how work enters the pipeline, how it progresses, who owns each decision and which information management can trust.' },
      reasons: {
        title: 'What a stronger Sales Cloud environment should deliver',
        cards: [
          { id: 'r1', title: 'A consistent sales process', description: 'Sales teams follow shared qualification, stage and handover rules rather than relying on individual spreadsheets or personal methods.' },
          { id: 'r2', title: 'Reliable pipeline visibility', description: 'Management reports reflect meaningful opportunity data, ownership and next actions rather than incomplete or outdated records.' },
          { id: 'r3', title: 'Less manual administration', description: 'Automation can reduce repetitive updates, reminders, routing and approval tasks while keeping users in control of important decisions.' },
          { id: 'r4', title: 'A platform ready to evolve', description: 'The solution is structured so new products, teams, territories and reporting needs can be introduced without destabilising the existing process.' },
        ],
      },
      why: {
        title: 'Where Sales Cloud configuration makes the difference',
        description: 'A closer look at what a well-structured setup gives your commercial team.',
        cards: [
          { Icon: 'FaChartLine', title: 'Forecasting you can trust', description: 'Pipeline and forecasting dashboards built on structured opportunity stages and clear ownership rules.' },
          { Icon: 'MdOutlineSecurity', title: 'Clean account and contact data', description: 'Migrated and deduplicated records structured around a clear account and contact architecture.' },
          { Icon: 'MdSelfImprovement', title: 'Less manual follow-up', description: 'Automated reminders and activity tracking so opportunities do not stall for lack of a next step.' },
          { Icon: 'RiTeamLine', title: 'A setup your team can use', description: 'Roles, permissions and onboarding documentation designed for real day-to-day use, not just go-live.' },
        ],
      },
    },
    tr: {
      hero: { title: 'Ekibinizin izleyebileceği, yönetimin ölçebileceği bir satış süreci oluşturun', description: 'PeakNova, Sales Cloud\'u; müşteri adayı nitelendirmeden hesap sahipliğine, fırsat aşamalarından onaylara, tahminlemeye ve yönetim raporlamasına kadar tüm ticari süreç etrafında tasarlar ve geliştirir.', buttonText: 'Sales Cloud projenizi görüşelim' },
      ladder: { title: 'Tüm satış döngüsüne yapı kazandırın', description: 'İşe yarayan bir Sales Cloud kurulumu yalnızca fırsatları depolamaz. İşin pipeline\'a nasıl gireceğine, nasıl ilerleyeceğine, her kararın kime ait olduğuna ve yönetimin hangi bilgiye güvenebileceğine dair net kurallar oluşturur.' },
      reasons: {
        title: 'Daha güçlü bir Sales Cloud ortamı neler sağlamalı',
        cards: [
          { id: 'r1', title: 'Tutarlı bir satış süreci', description: 'Satış ekipleri, bireysel Excel tablolarına veya kişisel yöntemlere güvenmek yerine ortak nitelendirme, aşama ve devir kurallarını takip eder.' },
          { id: 'r2', title: 'Güvenilir pipeline görünürlüğü', description: 'Yönetim raporları, eksik veya güncelliğini yitirmiş kayıtlar yerine anlamlı fırsat verisini, sahipliği ve sonraki adımları yansıtır.' },
          { id: 'r3', title: 'Daha az manuel yönetim', description: 'Otomasyon; önemli kararların kontrolünü kullanıcılarda tutarken tekrarlayan güncellemeleri, hatırlatmaları, yönlendirmeyi ve onay görevlerini azaltabilir.' },
          { id: 'r4', title: 'Gelişmeye hazır bir platform', description: 'Çözüm; yeni ürünlerin, ekiplerin, bölgelerin ve raporlama ihtiyaçlarının mevcut süreci istikrarsızlaştırmadan devreye alınabileceği şekilde yapılandırılır.' },
        ],
      },
      why: {
        title: 'Sales Cloud yapılandırmasının fark yarattığı noktalar',
        description: 'İyi yapılandırılmış bir kurulumun ticari ekibinize neler kazandırdığına yakından bakış.',
        cards: [
          { Icon: 'FaChartLine', title: 'Güvenilir tahminleme', description: 'Yapılandırılmış fırsat aşamaları ve net sahiplik kurallarına dayanan pipeline ve tahminleme panoları.' },
          { Icon: 'MdOutlineSecurity', title: 'Temiz hesap ve kişi verisi', description: 'Net bir hesap ve kişi mimarisi etrafında yapılandırılmış, geçişi yapılmış ve yinelemeleri giderilmiş kayıtlar.' },
          { Icon: 'MdSelfImprovement', title: 'Daha az manuel takip', description: 'Fırsatların sonraki adım eksikliği nedeniyle durmaması için otomatik hatırlatmalar ve aktivite takibi.' },
          { Icon: 'RiTeamLine', title: 'Ekibinizin kullanabileceği bir kurulum', description: 'Yalnızca devreye alma için değil, gerçek günlük kullanım için tasarlanmış roller, yetkilendirmeler ve katılım dokümantasyonu.' },
        ],
      },
    },
    fr: {
      hero: { title: 'Créez un processus commercial que votre équipe peut suivre et que la direction peut mesurer', description: 'PeakNova conçoit et améliore Sales Cloud autour du processus commercial complet — de la qualification des leads et la propriété des comptes aux étapes d\'opportunité, aux validations, aux prévisions et au reporting de gestion.', buttonText: 'Discuter de votre projet Sales Cloud' },
      ladder: { title: 'Structurer l\'ensemble du cycle commercial', description: 'Une implémentation Sales Cloud utile ne se contente pas de stocker des opportunités. Elle établit des règles claires sur la façon dont le travail entre dans le pipeline, comment il progresse, qui possède chaque décision et à quelles informations la direction peut se fier.' },
      reasons: {
        title: 'Ce qu\'un environnement Sales Cloud plus solide doit apporter',
        cards: [
          { id: 'r1', title: 'Un processus commercial cohérent', description: 'Les équipes commerciales suivent des règles communes de qualification, d\'étape et de transmission plutôt que de s\'appuyer sur des tableurs individuels ou des méthodes personnelles.' },
          { id: 'r2', title: 'Une visibilité pipeline fiable', description: 'Les rapports de gestion reflètent des données d\'opportunité pertinentes, une propriété claire et les prochaines actions, plutôt que des enregistrements incomplets ou obsolètes.' },
          { id: 'r3', title: 'Moins d\'administration manuelle', description: 'L\'automatisation peut réduire les mises à jour répétitives, les rappels, le routage et les tâches de validation, tout en laissant les utilisateurs maîtres des décisions importantes.' },
          { id: 'r4', title: 'Une plateforme prête à évoluer', description: 'La solution est structurée pour que de nouveaux produits, équipes, territoires et besoins de reporting puissent être introduits sans déstabiliser le processus existant.' },
        ],
      },
      why: {
        title: 'Là où la configuration Sales Cloud fait la différence',
        description: 'Un aperçu de ce qu\'une configuration bien structurée apporte à votre équipe commerciale.',
        cards: [
          { Icon: 'FaChartLine', title: 'Des prévisions fiables', description: 'Des tableaux de bord de pipeline et de prévision construits sur des étapes d\'opportunité structurées et des règles de propriété claires.' },
          { Icon: 'MdOutlineSecurity', title: 'Des données comptes et contacts propres', description: 'Des enregistrements migrés et dédupliqués, structurés autour d\'une architecture claire de comptes et de contacts.' },
          { Icon: 'MdSelfImprovement', title: 'Moins de suivi manuel', description: 'Des rappels automatisés et un suivi des activités pour que les opportunités ne stagnent pas faute de prochaine étape.' },
          { Icon: 'RiTeamLine', title: 'Une configuration que votre équipe peut utiliser', description: 'Rôles, permissions et documentation d\'onboarding conçus pour un usage quotidien réel, pas seulement pour la mise en service.' },
        ],
      },
    },
  },
  'service-cloud': {
    en: {
      hero: { title: 'Give customer service teams a complete and controlled way to manage support', description: 'PeakNova configures Service Cloud to centralise cases, customer context, service workflows, ownership, escalation and reporting so support teams can work consistently and managers can see where service is at risk.', buttonText: 'Discuss your Service Cloud requirements' },
      ladder: { title: 'Turn customer support into a visible operational process', description: 'Service Cloud should help agents understand the customer, manage the case and follow the correct resolution path without searching across disconnected tools.' },
      reasons: {
        title: 'What an effective Service Cloud implementation changes',
        cards: [
          { id: 'r1', title: 'Clear ownership', description: 'Every case has a defined owner, status, priority and next action.' },
          { id: 'r2', title: 'Faster access to context', description: 'Agents can see the customer history, related transactions and previous interactions without moving between multiple tools.' },
          { id: 'r3', title: 'More consistent service', description: 'Queues, templates, knowledge and escalation rules help teams handle similar situations in a controlled way.' },
          { id: 'r4', title: 'Better management visibility', description: 'Dashboards reveal volume, backlog, response time, resolution performance and recurring service issues.' },
        ],
      },
      why: {
        title: 'Where Service Cloud configuration makes the difference',
        description: 'A closer look at what a well-structured setup gives your support team.',
        cards: [
          { Icon: 'FaChartLine', title: 'SLA visibility', description: 'Service dashboards and SLA reporting that show where cases are at risk before they escalate.' },
          { Icon: 'MdOutlineSecurity', title: 'Consistent case ownership', description: 'Queues, routing and escalation rules that keep every case assigned to a clear owner.' },
          { Icon: 'MdSelfImprovement', title: 'Less repetitive admin', description: 'Support-process automation that removes manual routing and status updates from the agent\'s day.' },
          { Icon: 'RiTeamLine', title: 'One agent workspace', description: 'Case history, customer context and knowledge brought into a single configured workspace.' },
        ],
      },
    },
    tr: {
      hero: { title: 'Müşteri hizmetleri ekiplerine desteği yönetmenin eksiksiz ve kontrollü bir yolunu sunun', description: 'PeakNova, Service Cloud\'u; vakaları, müşteri bağlamını, hizmet süreçlerini, sahipliği, yükseltmeyi ve raporlamayı merkezileştirecek şekilde yapılandırır; böylece destek ekipleri tutarlı çalışabilir ve yöneticiler hizmetin nerede risk altında olduğunu görebilir.', buttonText: 'Service Cloud ihtiyaçlarınızı görüşelim' },
      ladder: { title: 'Müşteri desteğini görünür bir operasyonel sürece dönüştürün', description: 'Service Cloud, temsilcilerin bağlantısız araçlar arasında arama yapmadan müşteriyi anlamasına, vakayı yönetmesine ve doğru çözüm yolunu izlemesine yardımcı olmalıdır.' },
      reasons: {
        title: 'Etkili bir Service Cloud kurulumu neyi değiştirir',
        cards: [
          { id: 'r1', title: 'Net sahiplik', description: 'Her vakanın tanımlı bir sahibi, durumu, önceliği ve sonraki adımı vardır.' },
          { id: 'r2', title: 'Bağlama daha hızlı erişim', description: 'Temsilciler, birden fazla araç arasında geçiş yapmadan müşteri geçmişini, ilgili işlemleri ve önceki etkileşimleri görebilir.' },
          { id: 'r3', title: 'Daha tutarlı hizmet', description: 'Kuyruklar, şablonlar, bilgi tabanı ve yükseltme kuralları ekiplerin benzer durumları kontrollü bir şekilde ele almasına yardımcı olur.' },
          { id: 'r4', title: 'Daha iyi yönetim görünürlüğü', description: 'Panolar; hacmi, birikmiş işleri, yanıt süresini, çözüm performansını ve tekrarlayan hizmet sorunlarını ortaya koyar.' },
        ],
      },
      why: {
        title: 'Service Cloud yapılandırmasının fark yarattığı noktalar',
        description: 'İyi yapılandırılmış bir kurulumun destek ekibinize neler kazandırdığına yakından bakış.',
        cards: [
          { Icon: 'FaChartLine', title: 'SLA görünürlüğü', description: 'Vakaların yükselmeden önce nerede risk altında olduğunu gösteren hizmet panoları ve SLA raporlaması.' },
          { Icon: 'MdOutlineSecurity', title: 'Tutarlı vaka sahipliği', description: 'Her vakayı net bir sahibe bağlı tutan kuyruk, yönlendirme ve yükseltme kuralları.' },
          { Icon: 'MdSelfImprovement', title: 'Daha az tekrarlayan iş', description: 'Manuel yönlendirmeyi ve durum güncellemelerini temsilcinin gününden kaldıran destek süreci otomasyonu.' },
          { Icon: 'RiTeamLine', title: 'Tek bir temsilci çalışma alanı', description: 'Vaka geçmişi, müşteri bağlamı ve bilgi tabanının tek, yapılandırılmış bir çalışma alanında birleşmesi.' },
        ],
      },
    },
    fr: {
      hero: { title: 'Offrez à vos équipes de service client un moyen complet et maîtrisé de gérer le support', description: 'PeakNova configure Service Cloud pour centraliser les dossiers, le contexte client, les processus de service, la propriété, l\'escalade et le reporting, afin que les équipes de support travaillent de façon cohérente et que les managers voient où le service est à risque.', buttonText: 'Discuter de vos besoins Service Cloud' },
      ladder: { title: 'Faire du support client un processus opérationnel visible', description: 'Service Cloud doit aider les agents à comprendre le client, gérer le dossier et suivre le bon chemin de résolution sans avoir à chercher dans des outils déconnectés.' },
      reasons: {
        title: 'Ce qu\'une implémentation Service Cloud efficace change',
        cards: [
          { id: 'r1', title: 'Une propriété claire', description: 'Chaque dossier a un propriétaire défini, un statut, une priorité et une prochaine action.' },
          { id: 'r2', title: 'Un accès plus rapide au contexte', description: 'Les agents peuvent voir l\'historique client, les transactions liées et les interactions précédentes sans naviguer entre plusieurs outils.' },
          { id: 'r3', title: 'Un service plus cohérent', description: 'Files d\'attente, modèles, base de connaissances et règles d\'escalade aident les équipes à traiter des situations similaires de façon maîtrisée.' },
          { id: 'r4', title: 'Une meilleure visibilité managériale', description: 'Les tableaux de bord révèlent le volume, le retard accumulé, le temps de réponse, la performance de résolution et les problèmes de service récurrents.' },
        ],
      },
      why: {
        title: 'Là où la configuration Service Cloud fait la différence',
        description: 'Un aperçu de ce qu\'une configuration bien structurée apporte à votre équipe support.',
        cards: [
          { Icon: 'FaChartLine', title: 'Visibilité sur les SLA', description: 'Tableaux de bord de service et reporting SLA qui montrent où les dossiers sont à risque avant qu\'ils n\'escaladent.' },
          { Icon: 'MdOutlineSecurity', title: 'Une propriété des dossiers cohérente', description: 'Files d\'attente, routage et règles d\'escalade qui gardent chaque dossier assigné à un propriétaire clair.' },
          { Icon: 'MdSelfImprovement', title: 'Moins de tâches répétitives', description: 'Une automatisation des processus de support qui retire le routage manuel et les mises à jour de statut du quotidien de l\'agent.' },
          { Icon: 'RiTeamLine', title: 'Un espace de travail agent unifié', description: 'Historique des dossiers, contexte client et base de connaissances réunis dans un espace de travail unique et configuré.' },
        ],
      },
    },
  },
  'marketing-cloud': {
    en: {
      hero: { title: 'Connect marketing activity with customer data and lifecycle decisions', description: 'PeakNova helps organisations structure Marketing Cloud journeys, segmentation and automation around reliable customer data and measurable business objectives.', buttonText: 'Discuss your marketing automation needs' },
      ladder: { title: 'Move from isolated campaigns to coordinated customer journeys', description: 'Marketing automation creates value when customer data, consent, segmentation, timing and follow-up rules are designed as one operating model.' },
      reasons: {
        title: 'What a structured Marketing Cloud setup should achieve',
        cards: [
          { id: 'r1', title: 'Relevant audience selection', description: 'Campaigns use defined customer attributes and lifecycle signals rather than broad, disconnected contact lists.' },
          { id: 'r2', title: 'Coordinated journeys', description: 'Messages, delays, decisions and handovers follow a controlled customer journey.' },
          { id: 'r3', title: 'Better CRM alignment', description: 'Marketing activity and sales follow-up share the customer context needed for effective engagement.' },
          { id: 'r4', title: 'Measurable automation', description: 'Teams can understand which journeys are active, how contacts move through them and where performance needs improvement.' },
        ],
      },
      why: {
        title: 'Where Marketing Cloud configuration makes the difference',
        description: 'A closer look at what a well-structured setup gives your marketing team.',
        cards: [
          { Icon: 'FaChartLine', title: 'Campaign reporting that connects to CRM', description: 'Campaign performance reported alongside the CRM data it is meant to influence.' },
          { Icon: 'MdOutlineSecurity', title: 'Consent handled properly', description: 'Preference and consent handling built into segmentation and journey design from the start.' },
          { Icon: 'MdSelfImprovement', title: 'Automated nurturing', description: 'Triggered communication and lead nurturing that reduce manual campaign management.' },
          { Icon: 'RiTeamLine', title: 'A clean handover to sales', description: 'Campaign handover rules so marketing-qualified activity reaches sales with the right context.' },
        ],
      },
    },
    tr: {
      hero: { title: 'Pazarlama faaliyetlerini müşteri verisi ve yaşam döngüsü kararlarıyla birleştirin', description: 'PeakNova, kuruluşların Marketing Cloud yolculuklarını, segmentasyonunu ve otomasyonunu güvenilir müşteri verisi ve ölçülebilir iş hedefleri etrafında yapılandırmasına yardımcı olur.', buttonText: 'Pazarlama otomasyonu ihtiyaçlarınızı görüşelim' },
      ladder: { title: 'İzole kampanyalardan koordineli müşteri yolculuklarına geçin', description: 'Pazarlama otomasyonu; müşteri verisi, onay, segmentasyon, zamanlama ve takip kuralları tek bir çalışma modeli olarak tasarlandığında değer yaratır.' },
      reasons: {
        title: 'Yapılandırılmış bir Marketing Cloud kurulumu neyi başarmalı',
        cards: [
          { id: 'r1', title: 'İlgili hedef kitle seçimi', description: 'Kampanyalar; geniş, bağlantısız kişi listeleri yerine tanımlı müşteri niteliklerini ve yaşam döngüsü sinyallerini kullanır.' },
          { id: 'r2', title: 'Koordineli yolculuklar', description: 'Mesajlar, gecikmeler, kararlar ve devirler kontrollü bir müşteri yolculuğunu takip eder.' },
          { id: 'r3', title: 'Daha iyi CRM uyumu', description: 'Pazarlama faaliyeti ve satış takibi, etkili bir etkileşim için gereken müşteri bağlamını paylaşır.' },
          { id: 'r4', title: 'Ölçülebilir otomasyon', description: 'Ekipler; hangi yolculukların aktif olduğunu, kişilerin bu yolculuklarda nasıl ilerlediğini ve performansın nerede geliştirilmesi gerektiğini anlayabilir.' },
        ],
      },
      why: {
        title: 'Marketing Cloud yapılandırmasının fark yarattığı noktalar',
        description: 'İyi yapılandırılmış bir kurulumun pazarlama ekibinize neler kazandırdığına yakından bakış.',
        cards: [
          { Icon: 'FaChartLine', title: 'CRM ile bağlantılı kampanya raporlaması', description: 'Kampanya performansının, etkilemesi gereken CRM verisiyle birlikte raporlanması.' },
          { Icon: 'MdOutlineSecurity', title: 'Onay süreci doğru yönetilir', description: 'Tercih ve onay yönetiminin baştan itibaren segmentasyon ve yolculuk tasarımına dahil edilmesi.' },
          { Icon: 'MdSelfImprovement', title: 'Otomatik besleme', description: 'Manuel kampanya yönetimini azaltan tetiklenen iletişim ve müşteri adayı besleme.' },
          { Icon: 'RiTeamLine', title: 'Satışa temiz devir', description: 'Pazarlama nitelikli faaliyetin doğru bağlamla satışa ulaşmasını sağlayan kampanya devir kuralları.' },
        ],
      },
    },
    fr: {
      hero: { title: 'Connectez l\'activité marketing aux données client et aux décisions de cycle de vie', description: 'PeakNova aide les organisations à structurer les parcours, la segmentation et l\'automatisation Marketing Cloud autour de données client fiables et d\'objectifs métier mesurables.', buttonText: 'Discuter de vos besoins en automatisation marketing' },
      ladder: { title: 'Passer de campagnes isolées à des parcours clients coordonnés', description: 'L\'automatisation marketing crée de la valeur lorsque les données client, le consentement, la segmentation, le timing et les règles de suivi sont conçus comme un seul modèle opérationnel.' },
      reasons: {
        title: 'Ce qu\'une configuration Marketing Cloud structurée doit apporter',
        cards: [
          { id: 'r1', title: 'Une sélection d\'audience pertinente', description: 'Les campagnes utilisent des attributs client définis et des signaux de cycle de vie plutôt que de larges listes de contacts déconnectées.' },
          { id: 'r2', title: 'Des parcours coordonnés', description: 'Messages, délais, décisions et transmissions suivent un parcours client maîtrisé.' },
          { id: 'r3', title: 'Un meilleur alignement CRM', description: 'L\'activité marketing et le suivi commercial partagent le contexte client nécessaire à un engagement efficace.' },
          { id: 'r4', title: 'Une automatisation mesurable', description: 'Les équipes peuvent comprendre quels parcours sont actifs, comment les contacts y progressent et où la performance doit s\'améliorer.' },
        ],
      },
      why: {
        title: 'Là où la configuration Marketing Cloud fait la différence',
        description: 'Un aperçu de ce qu\'une configuration bien structurée apporte à votre équipe marketing.',
        cards: [
          { Icon: 'FaChartLine', title: 'Un reporting de campagne connecté au CRM', description: 'La performance des campagnes rapportée aux côtés des données CRM qu\'elle est censée influencer.' },
          { Icon: 'MdOutlineSecurity', title: 'Un consentement correctement géré', description: 'La gestion des préférences et du consentement intégrée dès la conception de la segmentation et des parcours.' },
          { Icon: 'MdSelfImprovement', title: 'Une nurture automatisée', description: 'Des communications déclenchées et un nurturing des leads qui réduisent la gestion manuelle des campagnes.' },
          { Icon: 'RiTeamLine', title: 'Une transmission propre vers les ventes', description: 'Des règles de transmission de campagnes pour que l\'activité qualifiée par le marketing arrive aux ventes avec le bon contexte.' },
        ],
      },
    },
  },
  'commerce-cloud': {
    en: {
      hero: { title: 'Connect digital commerce with customer, order and service operations', description: 'PeakNova helps organisations align Commerce Cloud experiences with Salesforce customer data, product information, order processes, support and downstream business systems.', buttonText: 'Discuss your Commerce Cloud project' },
      ladder: { title: 'Design commerce as part of the complete customer operation', description: 'A digital storefront cannot operate effectively in isolation. Customer, product, inventory, order, payment and service information must move between the systems responsible for each stage.' },
      reasons: {
        title: 'What connected commerce should deliver',
        cards: [
          { id: 'r1', title: 'Consistent customer data', description: 'Commerce, CRM and service teams work with aligned customer and account information.' },
          { id: 'r2', title: 'Clear order visibility', description: 'Relevant order and fulfilment information becomes available to the teams responsible for sales and customer support.' },
          { id: 'r3', title: 'Stronger lifecycle communication', description: 'Marketing and service processes can respond to real purchase and customer events.' },
          { id: 'r4', title: 'Scalable integration', description: 'System responsibilities and API flows are defined clearly enough to support future channels, products and business models.' },
        ],
      },
      why: {
        title: 'Where Commerce Cloud configuration makes the difference',
        description: 'A closer look at what connected commerce gives your operation.',
        cards: [
          { Icon: 'FaChartLine', title: 'Operational reporting', description: 'Order and commerce activity reported alongside CRM and service data, not in isolation.' },
          { Icon: 'MdOutlineSecurity', title: 'Synchronised order data', description: 'Order-data synchronisation between commerce, CRM and fulfilment systems.' },
          { Icon: 'MdSelfImprovement', title: 'Post-purchase workflows', description: 'Automated post-purchase service workflows instead of manual follow-up on every order.' },
          { Icon: 'RiTeamLine', title: 'B2B and B2C, handled properly', description: 'Account and buyer access models designed for the way each customer segment actually buys.' },
        ],
      },
    },
    tr: {
      hero: { title: 'Dijital ticareti müşteri, sipariş ve hizmet operasyonlarıyla birleştirin', description: 'PeakNova, kuruluşların Commerce Cloud deneyimlerini Salesforce müşteri verisi, ürün bilgisi, sipariş süreçleri, destek ve alt sistemlerle uyumlu hale getirmesine yardımcı olur.', buttonText: 'Commerce Cloud projenizi görüşelim' },
      ladder: { title: 'Ticareti eksiksiz müşteri operasyonunun bir parçası olarak tasarlayın', description: 'Dijital bir mağaza izole şekilde etkin çalışamaz. Müşteri, ürün, envanter, sipariş, ödeme ve hizmet bilgisi, her aşamadan sorumlu sistemler arasında akmalıdır.' },
      reasons: {
        title: 'Bağlı ticaret neler sağlamalı',
        cards: [
          { id: 'r1', title: 'Tutarlı müşteri verisi', description: 'Ticaret, CRM ve hizmet ekipleri uyumlu müşteri ve hesap bilgisiyle çalışır.' },
          { id: 'r2', title: 'Net sipariş görünürlüğü', description: 'İlgili sipariş ve teslimat bilgisi, satış ve müşteri desteğinden sorumlu ekipler için kullanılabilir hale gelir.' },
          { id: 'r3', title: 'Daha güçlü yaşam döngüsü iletişimi', description: 'Pazarlama ve hizmet süreçleri gerçek satın alma ve müşteri olaylarına yanıt verebilir.' },
          { id: 'r4', title: 'Ölçeklenebilir entegrasyon', description: 'Sistem sorumlulukları ve API akışları, gelecekteki kanalları, ürünleri ve iş modellerini destekleyecek kadar net tanımlanır.' },
        ],
      },
      why: {
        title: 'Commerce Cloud yapılandırmasının fark yarattığı noktalar',
        description: 'Bağlı ticaretin operasyonunuza neler kazandırdığına yakından bakış.',
        cards: [
          { Icon: 'FaChartLine', title: 'Operasyonel raporlama', description: 'Sipariş ve ticaret faaliyetinin izole değil, CRM ve hizmet verisiyle birlikte raporlanması.' },
          { Icon: 'MdOutlineSecurity', title: 'Senkronize sipariş verisi', description: 'Ticaret, CRM ve teslimat sistemleri arasında sipariş verisi senkronizasyonu.' },
          { Icon: 'MdSelfImprovement', title: 'Satış sonrası iş akışları', description: 'Her sipariş için manuel takip yerine otomatik satış sonrası hizmet iş akışları.' },
          { Icon: 'RiTeamLine', title: 'B2B ve B2C doğru şekilde ele alınır', description: 'Her müşteri segmentinin gerçek satın alma şekline göre tasarlanmış hesap ve alıcı erişim modelleri.' },
        ],
      },
    },
    fr: {
      hero: { title: 'Connecter le commerce digital aux opérations client, commande et service', description: 'PeakNova aide les organisations à aligner les expériences Commerce Cloud avec les données client Salesforce, les informations produit, les processus de commande, le support et les systèmes métiers en aval.', buttonText: 'Discuter de votre projet Commerce Cloud' },
      ladder: { title: 'Concevoir le commerce comme un élément de l\'opération client complète', description: 'Une boutique digitale ne peut pas fonctionner efficacement isolée. Les informations client, produit, stock, commande, paiement et service doivent circuler entre les systèmes responsables de chaque étape.' },
      reasons: {
        title: 'Ce qu\'un commerce connecté doit apporter',
        cards: [
          { id: 'r1', title: 'Des données client cohérentes', description: 'Les équipes commerce, CRM et service travaillent avec des informations client et compte alignées.' },
          { id: 'r2', title: 'Une visibilité claire sur les commandes', description: 'Les informations pertinentes de commande et de traitement deviennent disponibles pour les équipes commerciales et de support.' },
          { id: 'r3', title: 'Une communication de cycle de vie renforcée', description: 'Les processus marketing et service peuvent répondre à de véritables événements d\'achat et client.' },
          { id: 'r4', title: 'Une intégration évolutive', description: 'Les responsabilités des systèmes et les flux API sont définis assez clairement pour supporter de futurs canaux, produits et modèles économiques.' },
        ],
      },
      why: {
        title: 'Là où la configuration Commerce Cloud fait la différence',
        description: 'Un aperçu de ce qu\'un commerce connecté apporte à votre organisation.',
        cards: [
          { Icon: 'FaChartLine', title: 'Un reporting opérationnel', description: 'L\'activité de commande et de commerce rapportée aux côtés des données CRM et service, et non isolément.' },
          { Icon: 'MdOutlineSecurity', title: 'Des données de commande synchronisées', description: 'Une synchronisation des données de commande entre le commerce, le CRM et les systèmes de traitement.' },
          { Icon: 'MdSelfImprovement', title: 'Des workflows après-vente', description: 'Des workflows de service après-vente automatisés plutôt qu\'un suivi manuel de chaque commande.' },
          { Icon: 'RiTeamLine', title: 'B2B et B2C, correctement traités', description: 'Des modèles d\'accès compte et acheteur conçus pour la façon dont chaque segment client achète réellement.' },
        ],
      },
    },
  },
  'tableau-analytics': {
    en: {
      hero: { title: 'Turn Salesforce data into decisions teams can act on', description: 'PeakNova designs dashboards and analytics around the questions leadership and operational teams need to answer — not simply around the fields available in the database.', buttonText: 'Discuss your reporting requirements' },
      ladder: { title: 'Build reporting that supports management decisions', description: 'Dashboards are valuable only when the underlying definitions, ownership and data quality are clear. We connect reporting requirements with the Salesforce processes responsible for creating the data.' },
      reasons: {
        title: 'What reliable analytics requires',
        cards: [
          { id: 'r1', title: 'Shared definitions', description: 'Teams agree on how metrics such as pipeline, conversion, backlog or resolution time are calculated.' },
          { id: 'r2', title: 'Trustworthy source data', description: 'Reporting is connected to ownership rules, required fields and process controls that improve data reliability.' },
          { id: 'r3', title: 'Role-relevant visibility', description: 'Executives, managers and operational users receive information suited to the decisions they make.' },
          { id: 'r4', title: 'Actionable dashboards', description: 'Reports highlight exceptions, risk and required action rather than presenting large volumes of disconnected information.' },
        ],
      },
      why: {
        title: 'Where analytics configuration makes the difference',
        description: 'A closer look at what governed reporting gives your leadership team.',
        cards: [
          { Icon: 'FaChartLine', title: 'Metrics everyone agrees on', description: 'KPI and metric definitions documented so pipeline, service and data-quality figures mean the same thing to everyone.' },
          { Icon: 'MdOutlineSecurity', title: 'Role-based access', description: 'Dashboard access designed around roles, so each audience sees the information relevant to their decisions.' },
          { Icon: 'MdSelfImprovement', title: 'Cross-system analysis', description: 'Reporting that connects Salesforce data with other operational systems instead of stopping at the CRM boundary.' },
          { Icon: 'RiTeamLine', title: 'Executive-ready reporting', description: 'Executive reporting built on governed definitions and documented data sources.' },
        ],
      },
    },
    tr: {
      hero: { title: 'Salesforce verisini ekiplerin harekete geçebileceği kararlara dönüştürün', description: 'PeakNova, panoları ve analitiği; yalnızca veritabanındaki alanlara göre değil, yönetimin ve operasyonel ekiplerin yanıtlaması gereken sorular etrafında tasarlar.', buttonText: 'Raporlama ihtiyaçlarınızı görüşelim' },
      ladder: { title: 'Yönetim kararlarını destekleyen raporlama oluşturun', description: 'Panolar yalnızca temel tanımlar, sahiplik ve veri kalitesi net olduğunda değerlidir. Raporlama gereksinimlerini, veriyi oluşturan Salesforce süreçleriyle birbirine bağlarız.' },
      reasons: {
        title: 'Güvenilir analitik neyi gerektirir',
        cards: [
          { id: 'r1', title: 'Ortak tanımlar', description: 'Ekipler; pipeline, dönüşüm, birikmiş iş veya çözüm süresi gibi metriklerin nasıl hesaplandığı konusunda anlaşır.' },
          { id: 'r2', title: 'Güvenilir kaynak verisi', description: 'Raporlama; veri güvenilirliğini artıran sahiplik kurallarına, zorunlu alanlara ve süreç kontrollerine bağlıdır.' },
          { id: 'r3', title: 'Role uygun görünürlük', description: 'Yöneticiler, müdürler ve operasyonel kullanıcılar aldıkları kararlara uygun bilgiyi alır.' },
          { id: 'r4', title: 'Harekete geçirilebilir panolar', description: 'Raporlar; büyük hacimli bağlantısız bilgiler yerine istisnaları, riski ve gereken eylemi öne çıkarır.' },
        ],
      },
      why: {
        title: 'Analitik yapılandırmasının fark yarattığı noktalar',
        description: 'Yönetişimli raporlamanın yönetim ekibinize neler kazandırdığına yakından bakış.',
        cards: [
          { Icon: 'FaChartLine', title: 'Herkesin üzerinde anlaştığı metrikler', description: 'Pipeline, hizmet ve veri kalitesi rakamlarının herkes için aynı anlama gelmesi için belgelenmiş KPI ve metrik tanımları.' },
          { Icon: 'MdOutlineSecurity', title: 'Role dayalı erişim', description: 'Her kitlenin kendi kararlarıyla ilgili bilgiyi görmesi için role göre tasarlanmış pano erişimi.' },
          { Icon: 'MdSelfImprovement', title: 'Sistemler arası analiz', description: 'Yalnızca CRM sınırında durmak yerine Salesforce verisini diğer operasyonel sistemlerle birleştiren raporlama.' },
          { Icon: 'RiTeamLine', title: 'Yönetim düzeyinde raporlama', description: 'Yönetişimli tanımlara ve belgelenmiş veri kaynaklarına dayanan üst yönetim raporlaması.' },
        ],
      },
    },
    fr: {
      hero: { title: 'Transformez les données Salesforce en décisions concrètes pour vos équipes', description: 'PeakNova conçoit tableaux de bord et analytique autour des questions auxquelles la direction et les équipes opérationnelles doivent répondre — pas simplement autour des champs disponibles en base.', buttonText: 'Discuter de vos besoins de reporting' },
      ladder: { title: 'Construire un reporting qui soutient les décisions de gestion', description: 'Les tableaux de bord n\'ont de valeur que lorsque les définitions sous-jacentes, la propriété et la qualité des données sont claires. Nous relions les besoins de reporting aux processus Salesforce responsables de la création de la donnée.' },
      reasons: {
        title: 'Ce qu\'exige un reporting fiable',
        cards: [
          { id: 'r1', title: 'Des définitions partagées', description: 'Les équipes s\'accordent sur la façon dont sont calculés des indicateurs comme le pipeline, la conversion, le retard accumulé ou le temps de résolution.' },
          { id: 'r2', title: 'Des données source fiables', description: 'Le reporting est relié à des règles de propriété, des champs obligatoires et des contrôles de processus qui améliorent la fiabilité des données.' },
          { id: 'r3', title: 'Une visibilité adaptée à chaque rôle', description: 'Dirigeants, managers et utilisateurs opérationnels reçoivent l\'information adaptée aux décisions qu\'ils prennent.' },
          { id: 'r4', title: 'Des tableaux de bord actionnables', description: 'Les rapports mettent en avant les exceptions, les risques et les actions requises plutôt que de grands volumes d\'informations déconnectées.' },
        ],
      },
      why: {
        title: 'Là où la configuration analytique fait la différence',
        description: 'Un aperçu de ce qu\'un reporting gouverné apporte à votre direction.',
        cards: [
          { Icon: 'FaChartLine', title: 'Des indicateurs partagés par tous', description: 'Des définitions de KPI documentées pour que les chiffres de pipeline, de service et de qualité des données signifient la même chose pour chacun.' },
          { Icon: 'MdOutlineSecurity', title: 'Un accès basé sur les rôles', description: 'Un accès aux tableaux de bord conçu par rôle, pour que chaque public voie l\'information pertinente à ses décisions.' },
          { Icon: 'MdSelfImprovement', title: 'Une analyse inter-systèmes', description: 'Un reporting qui relie les données Salesforce à d\'autres systèmes opérationnels au lieu de s\'arrêter à la frontière du CRM.' },
          { Icon: 'RiTeamLine', title: 'Un reporting prêt pour la direction', description: 'Un reporting exécutif construit sur des définitions gouvernées et des sources de données documentées.' },
        ],
      },
    },
  },
  'einstein-ai': {
    en: {
      hero: { title: 'Apply Salesforce AI where it can improve real work', description: 'PeakNova helps organisations identify, design and govern practical Salesforce AI use cases across sales, service, productivity and customer communication.', buttonText: 'Explore Salesforce AI opportunities' },
      ladder: { title: 'Start with the business decision, not the AI feature', description: 'AI should support defined tasks and decisions with suitable data, permissions and human oversight. We assess where Salesforce AI can create practical value and what controls are needed before implementation.' },
      reasons: {
        title: 'A responsible path to Salesforce AI',
        cards: [
          { id: 'r1', title: 'Use-case clarity', description: 'AI initiatives are tied to a specific task, user group and measurable operational objective.' },
          { id: 'r2', title: 'Data readiness', description: 'The source information, access permissions and quality limitations are evaluated before relying on AI output.' },
          { id: 'r3', title: 'Human control', description: 'Important customer, financial or operational decisions retain appropriate review and approval.' },
          { id: 'r4', title: 'Practical adoption', description: 'AI capabilities are introduced into workflows where users can understand, review and benefit from the result.' },
        ],
      },
      why: {
        title: 'Where a governed approach to AI makes the difference',
        description: 'A closer look at what a controlled Salesforce AI rollout gives your organisation.',
        cards: [
          { Icon: 'FaChartLine', title: 'Use cases tied to real tasks', description: 'AI-use-case discovery focused on specific sales, service and productivity tasks rather than generic features.' },
          { Icon: 'MdOutlineSecurity', title: 'Data-readiness assessment', description: 'Source data, permissions and quality limitations reviewed before AI output is relied on.' },
          { Icon: 'MdSelfImprovement', title: 'Human-review checkpoints', description: 'Important decisions keep a human-review checkpoint rather than being fully automated.' },
          { Icon: 'RiTeamLine', title: 'Governance built in', description: 'AI adoption and governance planning so usage stays visible and controlled as it scales.' },
        ],
      },
    },
    tr: {
      hero: { title: 'Salesforce yapay zekasını gerçek işi iyileştirebileceği yerlerde kullanın', description: 'PeakNova, kuruluşların satış, hizmet, verimlilik ve müşteri iletişimi genelinde pratik Salesforce yapay zeka kullanım alanlarını belirlemesine, tasarlamasına ve yönetmesine yardımcı olur.', buttonText: 'Salesforce yapay zeka fırsatlarını keşfedin' },
      ladder: { title: 'Yapay zeka özelliğiyle değil, iş kararıyla başlayın', description: 'Yapay zeka, uygun veri, yetkilendirme ve insan gözetimiyle tanımlı görevleri ve kararları desteklemelidir. Uygulamadan önce Salesforce yapay zekasının nerede pratik değer yaratabileceğini ve hangi kontrollerin gerektiğini değerlendiririz.' },
      reasons: {
        title: 'Salesforce yapay zekasına sorumlu bir yol',
        cards: [
          { id: 'r1', title: 'Net kullanım alanı', description: 'Yapay zeka girişimleri belirli bir göreve, kullanıcı grubuna ve ölçülebilir operasyonel hedefe bağlanır.' },
          { id: 'r2', title: 'Veri hazırlığı', description: 'Yapay zeka çıktısına güvenmeden önce kaynak bilgi, erişim yetkileri ve kalite sınırlamaları değerlendirilir.' },
          { id: 'r3', title: 'İnsan kontrolü', description: 'Önemli müşteri, finansal veya operasyonel kararlar uygun inceleme ve onay sürecini korur.' },
          { id: 'r4', title: 'Pratik benimseme', description: 'Yapay zeka yetenekleri, kullanıcıların sonucu anlayabileceği, inceleyebileceği ve yararlanabileceği iş akışlarına dahil edilir.' },
        ],
      },
      why: {
        title: 'Yönetişimli bir yapay zeka yaklaşımının fark yarattığı noktalar',
        description: 'Kontrollü bir Salesforce yapay zeka devreye almasının kuruluşunuza neler kazandırdığına yakından bakış.',
        cards: [
          { Icon: 'FaChartLine', title: 'Gerçek görevlere bağlı kullanım alanları', description: 'Genel özellikler yerine belirli satış, hizmet ve verimlilik görevlerine odaklanan yapay zeka kullanım alanı keşfi.' },
          { Icon: 'MdOutlineSecurity', title: 'Veri hazırlığı değerlendirmesi', description: 'Yapay zeka çıktısına güvenilmeden önce gözden geçirilen kaynak veri, yetkiler ve kalite sınırlamaları.' },
          { Icon: 'MdSelfImprovement', title: 'İnsan incelemesi kontrol noktaları', description: 'Önemli kararlar tamamen otomatikleştirilmek yerine bir insan inceleme kontrol noktasını korur.' },
          { Icon: 'RiTeamLine', title: 'Yönetişim baştan dahil edilir', description: 'Kullanımın ölçeklendikçe görünür ve kontrollü kalması için yapay zeka benimseme ve yönetişim planlaması.' },
        ],
      },
    },
    fr: {
      hero: { title: 'Appliquer l\'IA Salesforce là où elle peut améliorer le travail réel', description: 'PeakNova aide les organisations à identifier, concevoir et gouverner des cas d\'usage IA Salesforce concrets dans les ventes, le service, la productivité et la communication client.', buttonText: 'Explorer les opportunités d\'IA Salesforce' },
      ladder: { title: 'Partir de la décision métier, pas de la fonctionnalité IA', description: 'L\'IA doit soutenir des tâches et décisions définies, avec des données adaptées, des permissions et une supervision humaine. Nous évaluons où l\'IA Salesforce peut créer de la valeur concrète et quels contrôles sont nécessaires avant l\'implémentation.' },
      reasons: {
        title: 'Une voie responsable vers l\'IA Salesforce',
        cards: [
          { id: 'r1', title: 'Des cas d\'usage clairs', description: 'Les initiatives IA sont rattachées à une tâche précise, un groupe d\'utilisateurs et un objectif opérationnel mesurable.' },
          { id: 'r2', title: 'Une préparation des données', description: 'Les informations source, les permissions d\'accès et les limites de qualité sont évaluées avant de s\'appuyer sur les résultats de l\'IA.' },
          { id: 'r3', title: 'Un contrôle humain', description: 'Les décisions client, financières ou opérationnelles importantes conservent une revue et une validation appropriées.' },
          { id: 'r4', title: 'Une adoption concrète', description: 'Les capacités IA sont introduites dans des workflows où les utilisateurs peuvent comprendre, vérifier et tirer profit du résultat.' },
        ],
      },
      why: {
        title: 'Là où une approche gouvernée de l\'IA fait la différence',
        description: 'Un aperçu de ce qu\'un déploiement maîtrisé de l\'IA Salesforce apporte à votre organisation.',
        cards: [
          { Icon: 'FaChartLine', title: 'Des cas d\'usage liés à des tâches réelles', description: 'Une découverte des cas d\'usage IA centrée sur des tâches précises de vente, de service et de productivité plutôt que sur des fonctionnalités génériques.' },
          { Icon: 'MdOutlineSecurity', title: 'Une évaluation de la préparation des données', description: 'Données source, permissions et limites de qualité examinées avant de s\'appuyer sur les résultats de l\'IA.' },
          { Icon: 'MdSelfImprovement', title: 'Des points de contrôle humains', description: 'Les décisions importantes conservent un point de contrôle humain plutôt que d\'être entièrement automatisées.' },
          { Icon: 'RiTeamLine', title: 'Une gouvernance intégrée', description: 'Une planification de l\'adoption et de la gouvernance IA pour que l\'usage reste visible et maîtrisé à mesure qu\'il se développe.' },
        ],
      },
    },
  },
  'mulesoft-integration': {
    en: {
      hero: { title: 'Connect Salesforce to the systems that run the rest of the business', description: 'PeakNova designs integrations between Salesforce and ERP, finance, marketing, support, e-commerce and custom applications using clear system responsibilities and maintainable API flows.', buttonText: 'Discuss your integration landscape' },
      ladder: { title: 'Build reliable data movement across the operation', description: 'Integration is not only a technical connection. It requires decisions about system ownership, data mapping, timing, validation, failure handling, security and operational support.' },
      reasons: {
        title: 'What a dependable Salesforce integration needs',
        cards: [
          { id: 'r1', title: 'Clear system ownership', description: 'Each customer, order, invoice, product or service record has a defined authoritative source.' },
          { id: 'r2', title: 'Controlled data mapping', description: 'Fields, values and business rules are translated consistently between systems.' },
          { id: 'r3', title: 'Failure visibility', description: 'Errors, retries and rejected records can be identified and managed rather than failing silently.' },
          { id: 'r4', title: 'Maintainable architecture', description: 'Integration logic is documented and structured so future systems and changes can be introduced safely.' },
        ],
      },
      why: {
        title: 'Where integration architecture makes the difference',
        description: 'A closer look at what a well-governed integration gives your operation.',
        cards: [
          { Icon: 'FaChartLine', title: 'A defined source of truth', description: 'Each customer, order and product record has a clearly defined authoritative system.' },
          { Icon: 'MdOutlineSecurity', title: 'Controlled authentication and access', description: 'Authentication and access design reviewed as part of every integration, not an afterthought.' },
          { Icon: 'MdSelfImprovement', title: 'Errors do not fail silently', description: 'Error handling, retries and monitoring so failed records can be identified and resolved.' },
          { Icon: 'RiTeamLine', title: 'Documented integration logic', description: 'Integration flows documented so future systems and changes can be introduced safely.' },
        ],
      },
    },
    tr: {
      hero: { title: 'Salesforce\'u işin geri kalanını yürüten sistemlere bağlayın', description: 'PeakNova; Salesforce ile ERP, finans, pazarlama, destek, e-ticaret ve özel uygulamalar arasındaki entegrasyonları net sistem sorumlulukları ve sürdürülebilir API akışlarıyla tasarlar.', buttonText: 'Entegrasyon yapınızı görüşelim' },
      ladder: { title: 'Operasyon genelinde güvenilir veri hareketi oluşturun', description: 'Entegrasyon yalnızca teknik bir bağlantı değildir. Sistem sahipliği, veri eşleme, zamanlama, doğrulama, hata yönetimi, güvenlik ve operasyonel destek konusunda kararlar gerektirir.' },
      reasons: {
        title: 'Güvenilir bir Salesforce entegrasyonu neye ihtiyaç duyar',
        cards: [
          { id: 'r1', title: 'Net sistem sahipliği', description: 'Her müşteri, sipariş, fatura, ürün veya hizmet kaydının tanımlı bir yetkili kaynağı vardır.' },
          { id: 'r2', title: 'Kontrollü veri eşleme', description: 'Alanlar, değerler ve iş kuralları sistemler arasında tutarlı bir şekilde çevrilir.' },
          { id: 'r3', title: 'Hata görünürlüğü', description: 'Hatalar, yeniden denemeler ve reddedilen kayıtlar sessizce başarısız olmak yerine tespit edilip yönetilebilir.' },
          { id: 'r4', title: 'Sürdürülebilir mimari', description: 'Entegrasyon mantığı; gelecekteki sistemlerin ve değişikliklerin güvenle devreye alınabilmesi için belgelenir ve yapılandırılır.' },
        ],
      },
      why: {
        title: 'Entegrasyon mimarisinin fark yarattığı noktalar',
        description: 'İyi yönetişimli bir entegrasyonun operasyonunuza neler kazandırdığına yakından bakış.',
        cards: [
          { Icon: 'FaChartLine', title: 'Tanımlı bir doğruluk kaynağı', description: 'Her müşteri, sipariş ve ürün kaydının net tanımlı bir yetkili sistemi vardır.' },
          { Icon: 'MdOutlineSecurity', title: 'Kontrollü kimlik doğrulama ve erişim', description: 'Sonradan eklenen bir konu değil, her entegrasyonun bir parçası olarak gözden geçirilen kimlik doğrulama ve erişim tasarımı.' },
          { Icon: 'MdSelfImprovement', title: 'Hatalar sessizce kaybolmaz', description: 'Başarısız kayıtların tespit edilip çözülebilmesi için hata yönetimi, yeniden deneme ve izleme.' },
          { Icon: 'RiTeamLine', title: 'Belgelenmiş entegrasyon mantığı', description: 'Gelecekteki sistemlerin ve değişikliklerin güvenle devreye alınabilmesi için belgelenmiş entegrasyon akışları.' },
        ],
      },
    },
    fr: {
      hero: { title: 'Connecter Salesforce aux systèmes qui font tourner le reste de l\'entreprise', description: 'PeakNova conçoit des intégrations entre Salesforce et l\'ERP, la finance, le marketing, le support, l\'e-commerce et des applications spécifiques, avec des responsabilités système claires et des flux API maintenables.', buttonText: 'Discuter de votre paysage d\'intégration' },
      ladder: { title: 'Construire une circulation de données fiable dans toute l\'activité', description: 'L\'intégration n\'est pas qu\'une connexion technique. Elle implique des décisions sur la propriété des systèmes, le mapping des données, le timing, la validation, la gestion des échecs, la sécurité et le support opérationnel.' },
      reasons: {
        title: 'Ce dont une intégration Salesforce fiable a besoin',
        cards: [
          { id: 'r1', title: 'Une propriété système claire', description: 'Chaque enregistrement client, commande, facture, produit ou service a une source faisant autorité clairement définie.' },
          { id: 'r2', title: 'Un mapping de données maîtrisé', description: 'Champs, valeurs et règles métier sont traduits de façon cohérente entre les systèmes.' },
          { id: 'r3', title: 'Une visibilité sur les échecs', description: 'Erreurs, tentatives et enregistrements rejetés peuvent être identifiés et gérés au lieu d\'échouer silencieusement.' },
          { id: 'r4', title: 'Une architecture maintenable', description: 'La logique d\'intégration est documentée et structurée pour que de futurs systèmes et changements puissent être introduits en toute sécurité.' },
        ],
      },
      why: {
        title: 'Là où l\'architecture d\'intégration fait la différence',
        description: 'Un aperçu de ce qu\'une intégration bien gouvernée apporte à votre activité.',
        cards: [
          { Icon: 'FaChartLine', title: 'Une source de vérité définie', description: 'Chaque enregistrement client, commande et produit dispose d\'un système faisant autorité clairement défini.' },
          { Icon: 'MdOutlineSecurity', title: 'Authentification et accès maîtrisés', description: 'La conception de l\'authentification et des accès examinée pour chaque intégration, pas ajoutée après coup.' },
          { Icon: 'MdSelfImprovement', title: 'Les erreurs n\'échouent pas silencieusement', description: 'Gestion des erreurs, tentatives et supervision pour que les enregistrements en échec puissent être identifiés et résolus.' },
          { Icon: 'RiTeamLine', title: 'Une logique d\'intégration documentée', description: 'Des flux d\'intégration documentés pour que de futurs systèmes et changements puissent être introduits en toute sécurité.' },
        ],
      },
    },
  },
  'slack': {
    en: {
      hero: { title: 'Bring Salesforce decisions and collaboration into the flow of work', description: 'PeakNova connects Salesforce and Slack so teams can receive alerts, coordinate actions, manage approvals and collaborate with the right CRM context.', buttonText: 'Discuss Salesforce and Slack workflows' },
      ladder: { title: 'Turn notifications into controlled business action', description: 'Slack integration should do more than send messages. It should help users understand the event, identify ownership, complete the next action and preserve the relevant Salesforce record history.' },
      reasons: {
        title: 'What effective Slack integration should improve',
        cards: [
          { id: 'r1', title: 'Faster awareness', description: 'Teams receive relevant Salesforce events in the channels where work is already coordinated.' },
          { id: 'r2', title: 'Clearer action', description: 'Notifications include context, ownership and an appropriate next step rather than creating additional noise.' },
          { id: 'r3', title: 'Better collaboration', description: 'Sales, service and operational stakeholders can coordinate around the same Salesforce record.' },
          { id: 'r4', title: 'Maintained traceability', description: 'Important actions remain connected to the CRM process rather than disappearing inside unstructured chat.' },
        ],
      },
      why: {
        title: 'Where Slack integration makes the difference',
        description: 'A closer look at what connected workflows give your team.',
        cards: [
          { Icon: 'FaChartLine', title: 'Alerts with context', description: 'Salesforce alerts in Slack that include account and customer context, not just a notification.' },
          { Icon: 'MdOutlineSecurity', title: 'Controlled visibility', description: 'Access and visibility controls so sensitive Salesforce information stays appropriately scoped in Slack.' },
          { Icon: 'MdSelfImprovement', title: 'Faster approvals', description: 'Approval workflows and escalation notifications handled directly inside Slack.' },
          { Icon: 'RiTeamLine', title: 'Conversations linked to records', description: 'Record-linked conversations that keep collaboration traceable back to the Salesforce process.' },
        ],
      },
    },
    tr: {
      hero: { title: 'Salesforce kararlarını ve iş birliğini işin akışına taşıyın', description: 'PeakNova, Salesforce ve Slack\'i bağlar; böylece ekipler uyarı alabilir, eylemleri koordine edebilir, onayları yönetebilir ve doğru CRM bağlamıyla iş birliği yapabilir.', buttonText: 'Salesforce ve Slack iş akışlarını görüşelim' },
      ladder: { title: 'Bildirimleri kontrollü iş eylemine dönüştürün', description: 'Slack entegrasyonu yalnızca mesaj göndermekten fazlasını yapmalıdır. Kullanıcıların olayı anlamasına, sahipliği belirlemesine, sonraki adımı tamamlamasına ve ilgili Salesforce kayıt geçmişini korumasına yardımcı olmalıdır.' },
      reasons: {
        title: 'Etkili bir Slack entegrasyonu neyi geliştirmeli',
        cards: [
          { id: 'r1', title: 'Daha hızlı farkındalık', description: 'Ekipler ilgili Salesforce olaylarını, işin zaten koordine edildiği kanallarda alır.' },
          { id: 'r2', title: 'Daha net eylem', description: 'Bildirimler; ek gürültü yaratmak yerine bağlam, sahiplik ve uygun bir sonraki adım içerir.' },
          { id: 'r3', title: 'Daha iyi iş birliği', description: 'Satış, hizmet ve operasyonel paydaşlar aynı Salesforce kaydı etrafında koordine olabilir.' },
          { id: 'r4', title: 'Sürdürülen izlenebilirlik', description: 'Önemli eylemler, yapılandırılmamış bir sohbette kaybolmak yerine CRM süreciyle bağlantılı kalır.' },
        ],
      },
      why: {
        title: 'Slack entegrasyonunun fark yarattığı noktalar',
        description: 'Bağlı iş akışlarının ekibinize neler kazandırdığına yakından bakış.',
        cards: [
          { Icon: 'FaChartLine', title: 'Bağlamlı uyarılar', description: 'Yalnızca bir bildirim değil, hesap ve müşteri bağlamını içeren Slack üzerindeki Salesforce uyarıları.' },
          { Icon: 'MdOutlineSecurity', title: 'Kontrollü görünürlük', description: 'Hassas Salesforce bilgisinin Slack\'te uygun şekilde sınırlı kalması için erişim ve görünürlük kontrolleri.' },
          { Icon: 'MdSelfImprovement', title: 'Daha hızlı onaylar', description: 'Doğrudan Slack içinde yönetilen onay iş akışları ve yükseltme bildirimleri.' },
          { Icon: 'RiTeamLine', title: 'Kayıtlara bağlı konuşmalar', description: 'İş birliğinin Salesforce süreciyle izlenebilir kalmasını sağlayan, kayıtlara bağlı konuşmalar.' },
        ],
      },
    },
    fr: {
      hero: { title: 'Intégrer les décisions Salesforce et la collaboration dans le flux de travail', description: 'PeakNova connecte Salesforce et Slack afin que les équipes reçoivent des alertes, coordonnent des actions, gèrent des validations et collaborent avec le bon contexte CRM.', buttonText: 'Discuter des workflows Salesforce et Slack' },
      ladder: { title: 'Transformer les notifications en action métier maîtrisée', description: 'L\'intégration Slack doit faire plus qu\'envoyer des messages. Elle doit aider les utilisateurs à comprendre l\'événement, identifier le propriétaire, réaliser la prochaine action et préserver l\'historique de l\'enregistrement Salesforce concerné.' },
      reasons: {
        title: 'Ce qu\'une intégration Slack efficace doit améliorer',
        cards: [
          { id: 'r1', title: 'Une prise de conscience plus rapide', description: 'Les équipes reçoivent les événements Salesforce pertinents dans les canaux où le travail est déjà coordonné.' },
          { id: 'r2', title: 'Une action plus claire', description: 'Les notifications incluent contexte, propriétaire et une prochaine étape appropriée plutôt que de créer du bruit supplémentaire.' },
          { id: 'r3', title: 'Une meilleure collaboration', description: 'Les parties prenantes commerciales, service et opérationnelles peuvent se coordonner autour du même enregistrement Salesforce.' },
          { id: 'r4', title: 'Une traçabilité maintenue', description: 'Les actions importantes restent liées au processus CRM au lieu de disparaître dans un chat non structuré.' },
        ],
      },
      why: {
        title: 'Là où l\'intégration Slack fait la différence',
        description: 'Un aperçu de ce que des workflows connectés apportent à votre équipe.',
        cards: [
          { Icon: 'FaChartLine', title: 'Des alertes avec contexte', description: 'Des alertes Salesforce dans Slack qui incluent le contexte compte et client, pas seulement une notification.' },
          { Icon: 'MdOutlineSecurity', title: 'Une visibilité maîtrisée', description: 'Des contrôles d\'accès et de visibilité pour que les informations Salesforce sensibles restent correctement cadrées dans Slack.' },
          { Icon: 'MdSelfImprovement', title: 'Des validations plus rapides', description: 'Des workflows de validation et des notifications d\'escalade gérés directement dans Slack.' },
          { Icon: 'RiTeamLine', title: 'Des conversations liées aux enregistrements', description: 'Des conversations liées aux enregistrements qui gardent la collaboration traçable jusqu\'au processus Salesforce.' },
        ],
      },
    },
  },
}

const SERVICE_ACTION_CONTACT = {
  en: (name) => ({
    action: {
      title: `Ready to strengthen your ${name} setup?`,
      description: `Share your current situation and objectives — we will help you define the right next step for ${name}.`,
      buttonText: `Discuss your ${name} project`,
      image: 'illustrations/salesforce-consultation.svg',
    },
    contact: {
      title: `Talk to us about ${name}`,
      description: 'Tell us about your current situation and goals, and we will arrange an initial conversation.',
    },
    ladderButton: 'Talk to a consultant',
  }),
  tr: (name) => ({
    action: {
      title: `${name} kurulumunuzu güçlendirmeye hazır mısınız?`,
      description: `Mevcut durumunuzu ve hedeflerinizi paylaşın — ${name} için doğru sonraki adımı birlikte belirleyelim.`,
      buttonText: `${name} projenizi görüşelim`,
      image: 'illustrations/salesforce-consultation.svg',
    },
    contact: {
      title: `${name} hakkında bizimle konuşun`,
      description: 'Mevcut durumunuzu ve hedeflerinizi anlatın, ilk görüşmeyi planlayalım.',
    },
    ladderButton: 'Bir danışmanla görüşün',
  }),
  fr: (name) => ({
    action: {
      title: `Prêt à renforcer votre environnement ${name} ?`,
      description: `Partagez votre situation actuelle et vos objectifs — nous vous aiderons à définir la prochaine étape pour ${name}.`,
      buttonText: `Discuter de votre projet ${name}`,
      image: 'illustrations/salesforce-consultation.svg',
    },
    contact: {
      title: `Parlons de ${name}`,
      description: 'Décrivez-nous votre situation actuelle et vos objectifs, nous organiserons un premier échange.',
    },
    ladderButton: 'Échanger avec un consultant',
  }),
}

function serviceContent(lang, svc) {
  const copy = SERVICE_COPY[svc.slug][lang]
  const generic = SERVICE_ACTION_CONTACT[lang](svc.name)

  return {
    hero: { ...copy.hero, image: 'questions.svg' },
    ladder: { ...copy.ladder, buttonText: generic.ladderButton, image: 'ladder.svg' },
    reasons: copy.reasons,
    why: copy.why,
    action: generic.action,
    contact: generic.contact,
  }
}

module.exports = {
  LANGS,
  SERVICE_META,
  logosFor,
  PAGE_CONTENT,
  ABOUT_ITEMS,
  FAQ_ITEMS,
  PROJECTS,
  SEO,
  BLOGS,
  serviceContent,
}
