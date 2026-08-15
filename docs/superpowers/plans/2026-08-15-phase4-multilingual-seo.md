# Phase 4: Multilingual & SEO — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate all four language translations to native professional quality, add comprehensive SEO infrastructure (metadata, structured data, sitemap, robots.txt), and ensure RTL/language-switching works flawlessly across all pages and 3D components.

**Architecture:** SEO metadata is generated per-page using Next.js `metadata` exports in server components, with a shared `lib/seo.ts` utility that builds localized metadata objects. Structured data is injected as JSON-LD `<script>` tags in the root layout. Translation files are rewritten with professional-grade content for all four languages. A new `app/sitemap.ts` and `app/robots.ts` use the Next.js file convention for automatic generation.

**Tech Stack:** Next.js Metadata API, JSON-LD structured data, Next.js sitemap/robots conventions, existing i18n system (t() + localized())

---

### Task 1: Add SEO Translation Keys to All Four Language Files
**Files:**
- Modify: `translations/en.json`
- Modify: `translations/it.json`
- Modify: `translations/ar.json`
- Modify: `translations/ur.json`

- [ ] **Step 1: Add SEO metadata keys to en.json**

Add these keys before the closing `}` of `translations/en.json`:

```json
  "seo.home.title": "ARTSER — Aluminium Windows, Doors & Facade Systems | Verona, Italy",
  "seo.home.description": "ARTSER specialises in the production, installation, and technical execution of aluminium windows, doors, curtain walls, and facade systems for commercial and industrial projects. Based in Verona, Italy.",
  "seo.about.title": "About ARTSER — 26+ Years in Aluminium & Serramenti",
  "seo.about.description": "Learn about ARTSER's professional background, 26+ years of hands-on experience in the aluminium and serramenti industry, and our commitment to precision workmanship.",
  "seo.services.title": "Services — Aluminium, PVC & Facade Systems | ARTSER",
  "seo.services.description": "Professional aluminium and PVC window and door production, facade installation, curtain wall systems, sliding doors, and sun protection. Serving commercial and industrial projects.",
  "seo.portfolio.title": "Portfolio — Completed Projects | ARTSER",
  "seo.portfolio.description": "A selection of aluminium and serramenti projects delivered by ARTSER across residential, commercial, and industrial sectors in Italy.",
  "seo.jv.title": "Joint Venture Projects | ARTSER",
  "seo.jv.description": "Aluminium and facade projects delivered in partnership with leading Italian construction and serramenti companies.",
  "seo.manufacturing.title": "Manufacturing & Production | ARTSER",
  "seo.manufacturing.description": "Precision aluminium fabrication with certified quality control. Cutting, assembly, and finishing for commercial and industrial window and door systems.",
  "seo.government.title": "Government & Commercial Projects | ARTSER",
  "seo.government.description": "Public-sector and commercial aluminium works delivered to strict technical and safety standards across Italy.",
  "seo.clients.title": "Our Clients | ARTSER",
  "seo.clients.description": "Established companies and organisations that trust ARTSER for aluminium window, door, and facade production and installation services.",
  "seo.gallery.title": "Gallery — Projects & Facilities | ARTSER",
  "seo.gallery.description": "Visual documentation of ARTSER's aluminium and serramenti projects, workshop facilities, and on-site installations.",
  "seo.certifications.title": "Certifications & Qualifications | ARTSER",
  "seo.certifications.description": "ARTSER's professional certifications including workplace safety, height work, MEWPs, fire safety, and first aid qualifications.",
  "seo.quote.title": "Request a Quote | ARTSER",
  "seo.quote.description": "Contact ARTSER for a professional quote on aluminium windows, doors, facades, curtain walls, and installation services.",
  "seo.contact.title": "Contact Us | ARTSER",
  "seo.contact.description": "Get in touch with ARTSER. Based in San Martino Buon Albergo, Verona, Italy. Aluminium and serramenti services.",
  "seo.products.title": "Products — Aluminium Systems & Solutions | ARTSER",
  "seo.products.description": "Discover ARTSER's range of aluminium windows, doors, sliding systems, facades, conservatories, and smart building solutions.",
  "seo.suppliers.title": "Our Suppliers — European Manufacturers | ARTSER",
  "seo.suppliers.description": "ARTSER partners with leading European manufacturers for premium aluminium, PVC, and sun protection systems."
```

- [ ] **Step 2: Add SEO metadata keys to it.json**

Add these keys before the closing `}` of `translations/it.json`:

```json
  "seo.home.title": "ARTSER — Finestre, Porte e Facciate in Alluminio | Verona, Italia",
  "seo.home.description": "ARTSER e specializzata nella produzione, installazione ed esecuzione tecnica di finestre, porte, facciate continue e sistemi di facciata in alluminio per progetti commerciali e industriali. Con sede a Verona.",
  "seo.about.title": "Chi Siamo — Oltre 26 Anni nel Settore Alluminio e Serramenti | ARTSER",
  "seo.about.description": "Scopri il percorso professionale di ARTSER: oltre 26 anni di esperienza pratica nel settore dell'alluminio e dei serramenti, con impegno costante verso la precisione artigianale.",
  "seo.services.title": "Servizi — Alluminio, PVC e Sistemi di Facciata | ARTSER",
  "seo.services.description": "Produzione e installazione professionale di serramenti in alluminio e PVC, facciate continue, sistemi scorrevoli e protezione solare per progetti commerciali e industriali.",
  "seo.portfolio.title": "Portfolio — Progetti Realizzati | ARTSER",
  "seo.portfolio.description": "Una selezione di progetti in alluminio e serramenti realizzati da ARTSER nei settori residenziale, commerciale e industriale in Italia.",
  "seo.jv.title": "Progetti in Joint Venture | ARTSER",
  "seo.jv.description": "Progetti in alluminio e facciate realizzati in partnership con aziende leader italiane nel settore costruzioni e serramenti.",
  "seo.manufacturing.title": "Produzione e Manifattura | ARTSER",
  "seo.manufacturing.description": "Fabbricazione di precisione dell'alluminio con controllo qualita certificato. Taglio, assemblaggio e finitura per sistemi di finestre e porte commerciali e industriali.",
  "seo.government.title": "Progetti Governativi e Commerciali | ARTSER",
  "seo.government.description": "Opere in alluminio per il settore pubblico e commerciale, realizzate nel rispetto di rigorosi standard tecnici e di sicurezza in tutta Italia.",
  "seo.clients.title": "I Nostri Clienti | ARTSER",
  "seo.clients.description": "Aziende e organizzazioni consolidate che si affidano ad ARTSER per la produzione e installazione di finestre, porte e facciate in alluminio.",
  "seo.gallery.title": "Galleria — Progetti e Stabilimenti | ARTSER",
  "seo.gallery.description": "Documentazione visiva dei progetti in alluminio e serramenti di ARTSER, degli stabilimenti produttivi e delle installazioni in cantiere.",
  "seo.certifications.title": "Certificazioni e Qualifiche | ARTSER",
  "seo.certifications.description": "Certificazioni professionali di ARTSER: sicurezza sul lavoro, lavoro in quota, piattaforme elevabili, sicurezza antincendio e primo soccorso.",
  "seo.quote.title": "Richiedi un Preventivo | ARTSER",
  "seo.quote.description": "Contatta ARTSER per un preventivo professionale su finestre, porte, facciate, facciate continue e servizi di installazione in alluminio.",
  "seo.contact.title": "Contatti | ARTSER",
  "seo.contact.description": "Contatta ARTSER. Con sede a San Martino Buon Albergo, Verona, Italia. Servizi professionali in alluminio e serramenti.",
  "seo.products.title": "Prodotti — Sistemi e Soluzioni in Alluminio | ARTSER",
  "seo.products.description": "Scopri la gamma ARTSER: finestre, porte, sistemi scorrevoli, facciate, verande e soluzioni per edifici intelligenti in alluminio.",
  "seo.suppliers.title": "I Nostri Fornitori — Produttori Europei | ARTSER",
  "seo.suppliers.description": "ARTSER collabora con i principali produttori europei di sistemi in alluminio, PVC e protezione solare."
```

- [ ] **Step 3: Add SEO metadata keys to ar.json**

Add these keys before the closing `}` of `translations/ar.json`:

```json
  "seo.home.title": "ARTSER — نوافذ وأبواب وأنظمة واجهات من الألمنيوم | فيرونا، إيطاليا",
  "seo.home.description": "ARTSER متخصصة في إنتاج وتركيب والتنفيذ التقني لنوافذ وأبواب الألمنيوم والجدران الستائرية وأنظمة الواجهات للمشاريع التجارية والصناعية. مقرها فيرونا، إيطاليا.",
  "seo.about.title": "من نحن — أكثر من 26 عاماً في صناعة الألمنيوم والسيراميتي | ARTSER",
  "seo.about.description": "تعرّف على المسيرة المهنية لـ ARTSER، أكثر من 26 عاماً من الخبرة العملية في صناعة الألمنيوم والسيراميتي، والتزامنا بدقة الحرفية.",
  "seo.services.title": "الخدمات — أنظمة الألمنيوم وPVC والواجهات | ARTSER",
  "seo.services.description": "إنتاج وتركيب احترافي لنوافذ وأبواب الألمنيوم وPVC، فاجيات continue، أنظمة منزلقة وحماية شمسية للمشاريع التجارية والصناعية.",
  "seo.portfolio.title": "أعمالنا — المشاريع المنجزة | ARTSER",
  "seo.portfolio.description": "مجموعة مختارة من مشاريع الألمنيوم والسيراميتي المنجزة من قبل ARTSER في القطاعات السكنية والتجارية والصناعية في إيطاليا.",
  "seo.jv.title": "مشاريع الشراكة المشتركة | ARTSER",
  "seo.jv.description": "مشاريع الألمنيوم والواجهات المنجزة بالشراكة مع شركات إيطالية رائدة في قطاع البناء والسيراميتي.",
  "seo.manufacturing.title": "التصنيع والإنتاج | ARTSER",
  "seo.manufacturing.description": "تصنيع دقيق للألمنيوم بمراقبة جودة معتمدة. قطع وتجميع وتشطيب لأنظمة النوافذ والأبواب التجارية والصناعية.",
  "seo.government.title": "المشاريع الحكومية والتجارية | ARTSER",
  "seo.government.description": "أعمال الألمنيوم للقطاعين العام والتجاري، منفّذة وفق معايير تقنية وسلامة صارمة في جميع أنحاء إيطاليا.",
  "seo.clients.title": "عملاؤنا | ARTSER",
  "seo.clients.description": "شركات ومؤسسات راسخة تثق بـ ARTSER في خدمات إنتاج وتركيب نوافذ وأبواب وواجهات الألمنيوم.",
  "seo.gallery.title": "المعرض — المشاريع والمنشآت | ARTSER",
  "seo.gallery.description": "توثيق بصري لمشاريع ARTSER في الألمنيوم والسيراميتي، ومرافق الورشة، والتركيبات الميدانية.",
  "seo.certifications.title": "الشهادات والمؤهلات | ARTSER",
  "seo.certifications.description": "شهادات ARTSER المهنية: السلامة في مكان العمل، العمل على ارتفاعات، المنصات المرتفعة المتحركة، السلامة من الحرائق والإسعافات الأولية.",
  "seo.quote.title": "اطلب عرض سعر | ARTSER",
  "seo.quote.description": "تواصل مع ARTSER للحصول على عرض سعر احترافي لنوافذ وأبواب وواجهات الألمنيوم والجدران الستائرية وخدمات التركيب.",
  "seo.contact.title": "اتصل بنا | ARTSER",
  "seo.contact.description": "تواصل مع ARTSER. مقرها في سان مارتينو بوون ألبيرغو، فيرونا، إيطاليا. خدمات احترافية في الألمنيوم والسيراميتي.",
  "seo.products.title": "المنتجات — أنظمة وحلول الألمنيوم | ARTSER",
  "seo.products.description": "اكتشف مجموعة ARTSER: نوافذ وأبواب وأنظمة منزلقة وواجهات وبيوت زجاجية وحلول المباني الذكية من الألمنيوم.",
  "seo.suppliers.title": "موردونا — منتجون أوروبيون | ARTSER",
  "seo.suppliers.description": "تتعاون ARTSER مع كبار المنتجين الأوروبيين لأنظمة الألمنيوم وPVC والحماية الشمسية."
```

- [ ] **Step 4: Add SEO metadata keys to ur.json**

Add these keys before the closing `}` of `translations/ur.json`:

```json
  "seo.home.title": "ARTSER — ایلومینیم کھڑکیاں، دروازے اور فیساد سسٹمز | ویرونا، اٹلی",
  "seo.home.description": "ARTSER تجارتی اور صنعتی منصوبوں کے لیے ایلومینیم کھڑکیوں، دروازوں، کرٹین والز اور فیساد سسٹمز کی پیداوار، تنصیب اور تکنیکی عمل درآمد میں مہارت رکھتا ہے۔ ویرونا، اٹلی میں مقیم۔",
  "seo.about.title": "ہمارے بارے میں — ایلومینیم اور سیرامینٹی میں 26 سال سے زائد کا تجربہ | ARTSER",
  "seo.about.description": "ARTSER کے پیشہ ورانہ سفر، ایلومینیم اور سیرامینٹی صنعت میں 26 سال سے زائد کے عملی تجربے، اور درست کاریگری کے عزم کے بارے میں جانیں۔",
  "seo.services.title": "خدمات — ایلومینیم، PVC اور فیساد سسٹمز | ARTSER",
  "seo.services.description": "ایلومینیم اور PVC کھڑکیوں اور دروازوں کی پیشہ ورانہ پیداوار و تنصیب، فیساد سسٹمز، کرٹین والز، سلائیڈنگ دروازے اور سن پروٹیکشن۔ تجارتی اور صنعتی منصوبوں کے لیے۔",
  "seo.portfolio.title": "پورٹ فولیو — مکمل شدہ منصوبے | ARTSER",
  "seo.portfolio.description": "اٹلی میں رہائشی، تجارتی اور صنعتی شعبوں میں ARTSER کے ذریعے مکمل کیے گئے ایلومینیم اور سیرامینٹی منصوبوں کا انتخاب۔",
  "seo.jv.title": "مشترکہ منصوبے | ARTSER",
  "seo.jv.description": "اطالوی تعمیراتی اور سیرامینٹی کمپنیوں کے ساتھ شراکت میں مکمل کیے گئے ایلومینیم اور فیساد منصوبے۔",
  "seo.manufacturing.title": "مینوفیکچرنگ اور پیداوار | ARTSER",
  "seo.manufacturing.description": "تصدیق شدہ کوالٹی کنٹرول کے ساتھ درست ایلومینیم فیبریکیشن۔ تجارتی اور صنعتی کھڑکی اور دروازے کے نظاموں کے لیے کٹنگ، اسمبلی اور فنشنگ۔",
  "seo.government.title": "حکومتی اور تجارتی منصوبے | ARTSER",
  "seo.government.description": "پورے اٹلی میں سخت تکنیکی اور حفاظتی معیارات کے مطابق مکمل کیے گئے عوامی اور تجارتی ایلومینیم کے کام۔",
  "seo.clients.title": "ہمارے کلائنٹس | ARTSER",
  "seo.clients.description": "وہ قائم شدہ کمپنیاں اور ادارے جو ایلومینیم کھڑکیوں، دروازوں اور فیساد کی پیداوار و تنصیب کی خدمات کے لیے ARTSER پر اعتماد کرتے ہیں۔",
  "seo.gallery.title": "گیلری — منصوبے اور سہولیات | ARTSER",
  "seo.gallery.description": "ARTSER کے ایلومینیم اور سیرامینٹی منصوبوں، ورکشاپ سہولیات اور سائٹ پر تنصیبات کی بصری دستاویزات۔",
  "seo.certifications.title": "سرٹیفیکیشنز اور اہلیتیں | ARTSER",
  "seo.certifications.description": "ARTSER کی پیشہ ورانہ سرٹیفیکیشنز: کام کی جگہ کی حفاظت، بلندی پر کام، موبائل ایلیویٹڈ پلیٹ فارمز، فائر سیفٹی اور ابتدائی طبی امداد۔",
  "seo.quote.title": "قیمت طلب کریں | ARTSER",
  "seo.quote.description": "ایلومینیم کھڑکیوں، دروازوں، فیساڈ، کرٹین والز اور تنصیب کی خدمات کے لیے ARTSER سے پیشہ ورانہ قیمت حاصل کریں۔",
  "seo.contact.title": "رابطہ کریں | ARTSER",
  "seo.contact.description": "ARTSER سے رابطہ کریں۔ سان مارتینو بوون البیرگو، ویرونا، اٹلی میں مقیم۔ ایلومینیم اور سیرامینٹی کی پیشہ ورانہ خدمات۔",
  "seo.products.title": "مصنوعات — ایلومینیم سسٹمز اور حل | ARTSER",
  "seo.products.description": "ARTSER کی رینج دریافت کریں: ایلومینیم کھڑکیاں، دروازے، سلائیڈنگ سسٹمز، فیساڈ، کنزرویٹریز اور اسمارٹ بلڈنگ حل۔",
  "seo.suppliers.title": "ہمارے سپلائرز — یورپی مصنوعین | ARTSER",
  "seo.suppliers.description": "ARTSER ایلومینیم، PVC اور سن پروٹیکشن سسٹمز کے سرکردہ یورپی مصنوعین کے ساتھ شراکت کرتا ہے۔"
```

---

### Task 2: Upgrade English Translation Quality
**Files:**
- Modify: `translations/en.json`

- [ ] **Step 1: Replace the following English keys with professional architectural/engineering copy**

In `translations/en.json`, find and replace these keys:

```json
  "hero.slogan": "Precision in aluminium. Built to perform.",
  "hero.subtitle": "Production, installation, and technical execution of aluminium systems — delivered to professional standards.",
  "home.servicesTitle": "Our Services",
  "home.projectsTitle": "Selected Projects",
  "home.clientsTitle": "Trusted Partners",
  "about.journey": "Professional Background",
  "about.journeySubtitle": "Industry Experience",
  "about.specializations": "Technical Specialisations",
  "about.collaborations": "Industry Collaborations",
  "about.qualifications": "Professional Qualifications",
  "services.subtitle": "Comprehensive aluminium, PVC, and serramenti services for commercial, industrial, and residential projects.",
  "portfolio.subtitle": "Selected projects across residential, commercial, and industrial sectors.",
  "jv.subtitle": "Projects delivered in collaboration with established Italian serramenti companies.",
  "manufacturing.subtitle": "Precision aluminium fabrication with certified quality control processes.",
  "government.subtitle": "Public-sector and commercial projects executed to strict technical and safety standards.",
  "clients.subtitle": "Established companies that rely on ARTSER for production and installation services.",
  "gallery.subtitle": "Documentation from our projects, workshops, and on-site installations.",
  "certifications.subtitle": "Accredited to Italian and international workplace and safety standards.",
  "quote.subtitle": "Provide your project details and we will respond with a professional assessment.",
  "contact.subtitle": "Reach the ARTSER team for project enquiries and technical consultations.",
  "home.founderTitle": "The Founder",
  "home.founderSubtitle": "Over 26 years of hands-on expertise in aluminium systems and serramenti",
  "home.founderLearnMore": "About our professional background"
```

---

### Task 3: Upgrade Italian Translation Quality
**Files:**
- Modify: `translations/it.json`

- [ ] **Step 1: Replace ALL Italian translations with professional architectural/engineering Italian**

Overwrite the entire content of `translations/it.json` with:

```json
{
  "brand.name": "ARTSER",
  "nav.more": "Altro",
  "home.productsShowcaseTitle": "I nostri sistemi in alluminio: innovazione e sostenibilita",
  "footer.ourProducts": "I nostri prodotti",
  "footer.ourCompany": "L'azienda",
  "footer.contactArtser": "Contatta ARTSER",
  "footer.legalInfo": "Informazioni legali",
  "footer.privacy": "Informativa sulla privacy",
  "footer.cookiePolicy": "Informativa sui cookie",
  "footer.cookieSettings": "Impostazioni cookie",
  "footer.salesConditions": "Condizioni generali di vendita",
  "footer.accessibility": "Dichiarazione di accessibilita",
  "footer.codeOfConduct": "Codice etico",
  "nav.home": "Home",
  "nav.about": "Chi siamo",
  "nav.services": "Servizi",
  "nav.portfolio": "Realizzazioni",
  "nav.jvProjects": "Progetti in collaborazione",
  "nav.manufacturing": "Produzione",
  "nav.government": "Settore pubblico",
  "nav.clients": "Clienti",
  "nav.gallery": "Galleria",
  "nav.certifications": "Certificazioni",
  "nav.requestQuote": "Richiedi preventivo",
  "nav.contact": "Contatti",
  "common.language": "Lingua",
  "common.theme": "Tema",
  "common.menu": "Menu",
  "common.readMore": "Approfondisci",
  "common.viewAll": "Visualizza tutti",
  "common.loading": "Caricamento in corso\u2026",
  "common.year": "Anno",
  "common.location": "Localita",
  "common.category": "Categoria",
  "common.partners": "Partner",
  "common.authority": "Ente committente",
  "hero.slogan": "Precisione nell'alluminio. Progettato per durare.",
  "hero.welcome": "Benvenuti in ARTSER",
  "hero.subtitle": "Produzione, installazione ed esecuzione tecnica di sistemi in alluminio, realizzate secondo standard professionali.",
  "hero.cta": "Richiedi un preventivo",
  "hero.secondaryCta": "Scopri le nostre realizzazioni",
  "home.statsTitle": "ARTSER in cifre",
  "home.servicesTitle": "I nostri servizi",
  "home.projectsTitle": "Progetti selezionati",
  "home.clientsTitle": "Partner di fiducia",
  "about.title": "Chi siamo",
  "about.mission": "La nostra missione",
  "about.vision": "La nostra visione",
  "about.journey": "Percorso professionale",
  "about.journeySubtitle": "Esperienza nel settore",
  "about.specializations": "Specializzazioni tecniche",
  "about.collaborations": "Collaborazioni nel settore",
  "about.qualifications": "Qualifiche professionali",
  "about.yearsExperience": "Anni di esperienza",
  "about.team": "Direzione",
  "services.title": "I nostri servizi",
  "services.subtitle": "Servizi completi in alluminio, PVC e serramenti per progetti commerciali, industriali e residenziali.",
  "portfolio.title": "Realizzazioni",
  "portfolio.subtitle": "Progetti selezionati nei settori residenziale, commerciale e industriale.",
  "jv.title": "Progetti in collaborazione",
  "jv.subtitle": "Lavori realizzati in partnership con aziende affermate nel settore dei serramenti in Italia.",
  "manufacturing.title": "Produzione e lavorazione",
  "manufacturing.subtitle": "Fabbricazione di precisione dell'alluminio con processi di controllo qualita certificati.",
  "government.title": "Settore pubblico e commerciale",
  "government.subtitle": "Opere per il settore pubblico e commerciale eseguite nel rispetto di rigorosi standard tecnici e di sicurezza.",
  "clients.title": "I nostri clienti",
  "clients.subtitle": "Aziende consolidate che si affidano ad ARTSER per i servizi di produzione e installazione.",
  "gallery.title": "Galleria",
  "gallery.subtitle": "Documentazione dei nostri progetti, laboratori e installazioni in cantiere.",
  "certifications.title": "Certificazioni",
  "certifications.subtitle": "Accreditamenti conformi agli standard italiani e internazionali in materia di sicurezza sul lavoro.",
  "quote.title": "Richiedi un preventivo",
  "quote.subtitle": "Descriva il suo progetto e le forniremo una valutazione professionale.",
  "quote.name": "Nome e cognome",
  "quote.company": "Ragione sociale",
  "quote.email": "Indirizzo e-mail",
  "quote.phone": "Numero di telefono",
  "quote.service": "Servizio richiesto",
  "quote.message": "Descrizione del progetto",
  "quote.submit": "Invia la richiesta",
  "quote.success": "Grazie. La Sua richiesta e stata ricevuta e sara elaborata al piu presto.",
  "quote.error": "Si e verificato un errore. La preghiamo di riprovare.",
  "contact.title": "Contatti",
  "contact.subtitle": "Per richieste di progetto e consulenze tecniche, contatti il team ARTSER.",
  "contact.headquarters": "Sede legale",
  "contact.offices": "Sedi operative",
  "contact.followUs": "Seguici",
  "footer.rights": "Tutti i diritti riservati.",
  "footer.quickLinks": "Link rapidi",
  "admin.title": "Pannello di amministrazione",
  "admin.subtitle": "Gestione dei contenuti del sito. Le modifiche vengono salvate nei file JSON.",
  "sidebar.products": "Prodotti",
  "sidebar.company": "Azienda",
  "sidebar.projects": "Progetti",
  "sidebar.resources": "Risorse",
  "sidebar.contact": "Contatti",
  "breadcrumb.home": "Home",
  "breadcrumb.products": "Prodotti",
  "hero.greeting": "Benvenuti in ARTSER",
  "hero.downloadPortfolio": "Scarica il portfolio",
  "hero.scrollToExplore": "Scorri per esplorare",
  "products.title": "Prodotti",
  "products.subtitle": "Sistemi e soluzioni in alluminio: innovazione, prestazioni e sostenibilita.",
  "products.searchCompare": "Cerca e confronta i prodotti",
  "products.windows.title": "Finestre",
  "products.windows.description": "Finestre in alluminio ad alte prestazioni. Funzionalita ottimale, design accurato, sicurezza ed efficienza energetica certificata in sistemi versatili adatti a ogni esigenza progettuale.",
  "products.doors.title": "Porte",
  "products.doors.description": "Sistemi di porte in alluminio che coniugano sicurezza, prestazioni termiche ed eleganza progettuale per applicazioni residenziali e commerciali.",
  "products.sliding.title": "Sistemi scorrevoli e pieghevoli",
  "products.sliding.description": "Sistemi scorrevoli e pieghevoli per ottimizzare gli spazi abitativi. Transizioni fluide tra ambienti interni ed esterni con prestazioni termiche di eccellenza.",
  "products.facades.title": "Facciate",
  "products.facades.description": "Sistemi di facciata in alluminio per involucri edilizi di alto profilo architettonico. Facciate continue e vetrate strutturali progettate per prestazioni, estetica e tenuta alle intemperie.",
  "products.conservatories.title": "Verande e lucernari",
  "products.conservatories.description": "Soluzioni per verande e lucernari che massimizzano l'apporto di luce naturale, progettate per il comfort termico e la resistenza agli agenti atmosferici.",
  "products.smart.title": "Edifici intelligenti",
  "products.smart.description": "Soluzioni integrate per l'edilizia intelligente: automazione, ventilazione e controllo solare per ambienti a elevata efficienza energetica.",
  "nav.suppliers": "Fornitori",
  "suppliers.title": "I nostri fornitori",
  "suppliers.subtitle": "Collaboriamo con i principali produttori europei per offrire sistemi di qualita superiore in alluminio, PVC e schermature solari.",
  "home.suppliersTitle": "I nostri fornitori",
  "home.suppliersSubtitle": "Partner dei migliori produttori europei",
  "suppliers.viewAll": "Tutti i fornitori",
  "suppliers.visitWebsite": "Visita il sito web",
  "suppliers.products": "Prodotti",
  "suppliers.aluminium": "Fornitori di alluminio",
  "suppliers.pvc": "Fornitore PVC",
  "suppliers.shutters": "Avvolgibili e zanzariere",
  "products.keyFeatures": "Caratteristiche tecniche",
  "products.suitableFor": "Ambiti di applicazione",
  "products.otherProducts": "Altri prodotti",
  "products.requestQuote": "Richiedi un preventivo",
  "home.founderTitle": "Il fondatore",
  "home.founderSubtitle": "Oltre 26 anni di esperienza operativa nei sistemi in alluminio e serramenti",
  "home.founderSince": "Attivita indipendente dal 2015",
  "home.founderBased": "Sede a Verona, Italia",
  "home.founderLearnMore": "Il nostro percorso professionale",
  "seo.home.title": "ARTSER \u2014 Finestre, Porte e Facciate in Alluminio | Verona, Italia",
  "seo.home.description": "ARTSER e specializzata nella produzione, installazione ed esecuzione tecnica di finestre, porte, facciate continue e sistemi di facciata in alluminio per progetti commerciali e industriali. Con sede a Verona.",
  "seo.about.title": "Chi Siamo \u2014 Oltre 26 Anni nel Settore Alluminio e Serramenti | ARTSER",
  "seo.about.description": "Scopri il percorso professionale di ARTSER: oltre 26 anni di esperienza pratica nel settore dell'alluminio e dei serramenti, con impegno costante verso la precisione artigianale.",
  "seo.services.title": "Servizi \u2014 Alluminio, PVC e Sistemi di Facciata | ARTSER",
  "seo.services.description": "Produzione e installazione professionale di serramenti in alluminio e PVC, facciate continue, sistemi scorrevoli e protezione solare per progetti commerciali e industriali.",
  "seo.portfolio.title": "Realizzazioni \u2014 Progetti Completati | ARTSER",
  "seo.portfolio.description": "Una selezione di progetti in alluminio e serramenti realizzati da ARTSER nei settori residenziale, commerciale e industriale in Italia.",
  "seo.jv.title": "Progetti in Collaborazione | ARTSER",
  "seo.jv.description": "Progetti in alluminio e facciate realizzati in partnership con aziende leader italiane nel settore costruzioni e serramenti.",
  "seo.manufacturing.title": "Produzione e Lavorazione | ARTSER",
  "seo.manufacturing.description": "Fabbricazione di precisione dell'alluminio con controllo qualita certificato. Taglio, assemblaggio e finitura per sistemi di finestre e porte commerciali e industriali.",
  "seo.government.title": "Settore Pubblico e Commerciale | ARTSER",
  "seo.government.description": "Opere in alluminio per il settore pubblico e commerciale, realizzate nel rispetto di rigorosi standard tecnici e di sicurezza in tutta Italia.",
  "seo.clients.title": "I Nostri Clienti | ARTSER",
  "seo.clients.description": "Aziende e organizzazioni consolidate che si affidano ad ARTSER per la produzione e installazione di finestre, porte e facciate in alluminio.",
  "seo.gallery.title": "Galleria \u2014 Progetti e Stabilimenti | ARTSER",
  "seo.gallery.description": "Documentazione visiva dei progetti in alluminio e serramenti di ARTSER, degli stabilimenti produttivi e delle installazioni in cantiere.",
  "seo.certifications.title": "Certificazioni e Qualifiche | ARTSER",
  "seo.certifications.description": "Certificazioni professionali di ARTSER: sicurezza sul lavoro, lavoro in quota, piattaforme elevabili, sicurezza antincendio e primo soccorso.",
  "seo.quote.title": "Richiedi un Preventivo | ARTSER",
  "seo.quote.description": "Contatti ARTSER per un preventivo professionale su finestre, porte, facciate, facciate continue e servizi di installazione in alluminio.",
  "seo.contact.title": "Contatti | ARTSER",
  "seo.contact.description": "Contatti ARTSER. Con sede a San Martino Buon Albergo, Verona, Italia. Servizi professionali in alluminio e serramenti.",
  "seo.products.title": "Prodotti \u2014 Sistemi e Soluzioni in Alluminio | ARTSER",
  "seo.products.description": "Scopri la gamma ARTSER: finestre, porte, sistemi scorrevoli, facciate, verande e soluzioni per edifici intelligenti in alluminio.",
  "seo.suppliers.title": "I Nostri Fornitori \u2014 Produttori Europei | ARTSER",
  "seo.suppliers.description": "ARTSER collabora con i principali produttori europei di sistemi in alluminio, PVC e schermature solari."
}
```

---

### Task 4: Upgrade Arabic Translation Quality
**Files:**
- Modify: `translations/ar.json`

- [ ] **Step 1: Replace ALL Arabic translations with professional Modern Standard Arabic**

Overwrite the entire content of `translations/ar.json` with:

```json
{
  "brand.name": "ARTSER",
  "nav.more": "المزيد",
  "home.productsShowcaseTitle": "اكتشف أنظمتنا المبتكرة والمستدامة من الألمنيوم",
  "footer.ourProducts": "منتجاتنا",
  "footer.ourCompany": "الشركة",
  "footer.contactArtser": "تواصل مع ARTSER",
  "footer.legalInfo": "المعلومات القانونية",
  "footer.privacy": "سياسة الخصوصية",
  "footer.cookiePolicy": "سياسة ملفات تعريف الارتباط",
  "footer.cookieSettings": "إعدادات ملفات تعريف الارتباط",
  "footer.salesConditions": "الشروط العامة للبيع",
  "footer.accessibility": "بيان إمكانية الوصول",
  "footer.codeOfConduct": "ميثاق السلوك المهني",
  "nav.home": "الرئيسية",
  "nav.about": "من نحن",
  "nav.services": "الخدمات",
  "nav.portfolio": "أعمالنا",
  "nav.jvProjects": "مشاريع الشراكة",
  "nav.manufacturing": "التصنيع",
  "nav.government": "القطاع العام",
  "nav.clients": "العملاء",
  "nav.gallery": "المعرض",
  "nav.certifications": "الشهادات",
  "nav.requestQuote": "طلب عرض سعر",
  "nav.contact": "اتصل بنا",
  "common.language": "اللغة",
  "common.theme": "المظهر",
  "common.menu": "القائمة",
  "common.readMore": "التفاصيل",
  "common.viewAll": "عرض الكل",
  "common.loading": "\u062c\u0627\u0631\u064d \u0627\u0644\u062a\u062d\u0645\u064a\u0644\u2026",
  "common.year": "السنة",
  "common.location": "الموقع",
  "common.category": "التصنيف",
  "common.partners": "الشركاء",
  "common.authority": "الجهة المعنية",
  "hero.slogan": "دقة في الألمنيوم. أداء يدوم.",
  "hero.welcome": "\u0645\u0631\u062d\u0628\u064b\u0627 \u0628\u0643\u0645 \u0641\u064a ARTSER",
  "hero.subtitle": "إنتاج وتركيب وتنفيذ تقني لأنظمة الألمنيوم \u2014 وفق أعلى المعايير المهنية.",
  "hero.cta": "اطلب عرض سعر",
  "hero.secondaryCta": "استعرض أعمالنا",
  "home.statsTitle": "ARTSER بالأرقام",
  "home.servicesTitle": "خدماتنا",
  "home.projectsTitle": "مشاريع مختارة",
  "home.clientsTitle": "شركاء موثوقون",
  "about.title": "من نحن",
  "about.mission": "مهمتنا",
  "about.vision": "رؤيتنا",
  "about.journey": "المسيرة المهنية",
  "about.journeySubtitle": "الخبرة في القطاع",
  "about.specializations": "التخصصات التقنية",
  "about.collaborations": "التعاون مع القطاع",
  "about.qualifications": "المؤهلات المهنية",
  "about.yearsExperience": "سنوات الخبرة",
  "about.team": "الإدارة",
  "services.title": "خدماتنا",
  "services.subtitle": "خدمات شاملة في الألمنيوم وPVC والسيراميتي للمشاريع التجارية والصناعية والسكنية.",
  "portfolio.title": "أعمالنا",
  "portfolio.subtitle": "مشاريع مختارة في القطاعات السكنية والتجارية والصناعية.",
  "jv.title": "مشاريع الشراكة",
  "jv.subtitle": "مشاريع أُنجزت بالتعاون مع شركات سيراميتي إيطالية راسخة.",
  "manufacturing.title": "التصنيع والإنتاج",
  "manufacturing.subtitle": "تصنيع دقيق للألمنيوم وفق عمليات مراقبة جودة معتمدة.",
  "government.title": "القطاع العام والتجاري",
  "government.subtitle": "أعمال للقطاعين العام والتجاري مُنفَّذة وفق معايير تقنية وسلامة صارمة.",
  "clients.title": "عملاؤنا",
  "clients.subtitle": "شركات راسخة تعتمد على ARTSER في خدمات الإنتاج والتركيب.",
  "gallery.title": "المعرض",
  "gallery.subtitle": "توثيق من مشاريعنا وورشنا وتركيباتنا الميدانية.",
  "certifications.title": "الشهادات",
  "certifications.subtitle": "اعتمادات مطابقة للمعايير الإيطالية والدولية في مجال السلامة المهنية.",
  "quote.title": "طلب عرض سعر",
  "quote.subtitle": "قدّم تفاصيل مشروعك وسنوافيك بتقييم مهني.",
  "quote.name": "الاسم الكامل",
  "quote.company": "اسم الشركة",
  "quote.email": "البريد الإلكتروني",
  "quote.phone": "رقم الهاتف",
  "quote.service": "الخدمة المطلوبة",
  "quote.message": "وصف المشروع",
  "quote.submit": "إرسال الطلب",
  "quote.success": "\u0634\u0643\u0631\u064b\u0627 \u0644\u0643. \u062a\u0645 \u0627\u0633\u062a\u0644\u0627\u0645 \u0637\u0644\u0628\u0643 \u0648\u0633\u064a\u062a\u0645 \u0627\u0644\u062a\u0639\u0627\u0645\u0644 \u0645\u0639\u0647 \u0641\u064a \u0623\u0642\u0631\u0628 \u0648\u0642\u062a.",
  "quote.error": "حدث خطأ. يُرجى المحاولة مرة أخرى.",
  "contact.title": "اتصل بنا",
  "contact.subtitle": "للاستفسارات المتعلقة بالمشاريع والاستشارات التقنية، تواصل مع فريق ARTSER.",
  "contact.headquarters": "المقر الرئيسي",
  "contact.offices": "المكاتب",
  "contact.followUs": "تابعنا",
  "footer.rights": "جميع الحقوق محفوظة.",
  "footer.quickLinks": "روابط سريعة",
  "admin.title": "لوحة الإدارة",
  "admin.subtitle": "إدارة محتوى الموقع. تُحفظ التعديلات في ملفات JSON.",
  "sidebar.products": "المنتجات",
  "sidebar.company": "الشركة",
  "sidebar.projects": "المشاريع",
  "sidebar.resources": "الموارد",
  "sidebar.contact": "اتصل بنا",
  "breadcrumb.home": "الرئيسية",
  "breadcrumb.products": "المنتجات",
  "hero.greeting": "\u0645\u0631\u062d\u0628\u064b\u0627 \u0628\u0643\u0645 \u0641\u064a ARTSER",
  "hero.downloadPortfolio": "تحميل ملف الأعمال",
  "hero.scrollToExplore": "مرّر للاستكشاف",
  "products.title": "المنتجات",
  "products.subtitle": "أنظمة وحلول من الألمنيوم: ابتكار وأداء واستدامة.",
  "products.searchCompare": "ابحث وقارن بين المنتجات",
  "products.windows.title": "النوافذ",
  "products.windows.description": "نوافذ ألمنيوم عالية الأداء. وظائف مثلى وتصميم دقيق وسلامة وكفاءة طاقة معتمدة في أنظمة متعددة الاستخدامات تناسب كل متطلبات المشروع.",
  "products.doors.title": "الأبواب",
  "products.doors.description": "أنظمة أبواب ألمنيوم تجمع بين الأمان والأداء الحراري والأناقة التصميمية للتطبيقات السكنية والتجارية.",
  "products.sliding.title": "الأنظمة المنزلقة والقابلة للطي",
  "products.sliding.description": "أنظمة منزلقة وقابلة للطي لتحقيق الاستفادة المثلى من المساحات. انتقالات سلسة بين البيئات الداخلية والخارجية بأداء حراري متفوق.",
  "products.facades.title": "الواجهات",
  "products.facades.description": "أنظمة واجهات ألمنيوم معمارية لأغلفة مبانٍ عالية المستوى. جدران ستائرية وزجاج هيكلي مصمّم للأداء والجماليات ومقاومة العوامل الجوية.",
  "products.conservatories.title": "البيوت الزجاجية والمناور",
  "products.conservatories.description": "حلول للبيوت الزجاجية والمناور تُعظّم الإضاءة الطبيعية، مصمّمة للراحة الحرارية ومقاومة الظروف المناخية.",
  "products.smart.title": "المباني الذكية",
  "products.smart.description": "حلول متكاملة للمباني الذكية: أتمتة وتهوية وتحكم شمسي لبيئات عالية الكفاءة في استهلاك الطاقة.",
  "nav.suppliers": "الموردون",
  "suppliers.title": "موردونا",
  "suppliers.subtitle": "نتعاون مع كبار المصنّعين الأوروبيين لتوفير أنظمة عالية الجودة من الألمنيوم وPVC والحماية الشمسية.",
  "home.suppliersTitle": "موردونا",
  "home.suppliersSubtitle": "شراكة مع أفضل المصنّعين الأوروبيين",
  "suppliers.viewAll": "جميع الموردين",
  "suppliers.visitWebsite": "زيارة الموقع الإلكتروني",
  "suppliers.products": "المنتجات",
  "suppliers.aluminium": "موردو الألمنيوم",
  "suppliers.pvc": "مورد PVC",
  "suppliers.shutters": "الستائر الدوّارة وشبكات الحشرات",
  "products.keyFeatures": "المواصفات التقنية",
  "products.suitableFor": "مجالات التطبيق",
  "products.otherProducts": "منتجات أخرى",
  "products.requestQuote": "طلب عرض سعر",
  "home.founderTitle": "المؤسس",
  "home.founderSubtitle": "أكثر من 26 عاماً من الخبرة العملية في أنظمة الألمنيوم والسيراميتي",
  "home.founderSince": "مستقل منذ عام 2015",
  "home.founderBased": "المقر في فيرونا، إيطاليا",
  "home.founderLearnMore": "المسيرة المهنية",
  "seo.home.title": "ARTSER \u2014 نوافذ وأبواب وأنظمة واجهات من الألمنيوم | فيرونا، إيطاليا",
  "seo.home.description": "ARTSER متخصصة في إنتاج وتركيب والتنفيذ التقني لنوافذ وأبواب الألمنيوم والجدران الستائرية وأنظمة الواجهات للمشاريع التجارية والصناعية. مقرها فيرونا، إيطاليا.",
  "seo.about.title": "من نحن \u2014 أكثر من 26 عاماً في صناعة الألمنيوم والسيراميتي | ARTSER",
  "seo.about.description": "\u062a\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 المسيرة المهنية لـ ARTSER، أكثر من 26 عاماً من الخبرة العملية في صناعة الألمنيوم والسيراميتي، والتزامنا بدقة الحرفية.",
  "seo.services.title": "الخدمات \u2014 أنظمة الألمنيوم وPVC والواجهات | ARTSER",
  "seo.services.description": "إنتاج وتركيب احترافي لنوافذ وأبواب الألمنيوم وPVC، جدران ستائرية، أنظمة منزلقة وحماية شمسية للمشاريع التجارية والصناعية.",
  "seo.portfolio.title": "أعمالنا \u2014 المشاريع المنجزة | ARTSER",
  "seo.portfolio.description": "مجموعة مختارة من مشاريع الألمنيوم والسيراميتي المنجزة من قبل ARTSER في القطاعات السكنية والتجارية والصناعية في إيطاليا.",
  "seo.jv.title": "مشاريع الشراكة | ARTSER",
  "seo.jv.description": "مشاريع الألمنيوم والواجهات المنجزة بالشراكة مع شركات إيطالية رائدة في قطاع البناء والسيراميتي.",
  "seo.manufacturing.title": "التصنيع والإنتاج | ARTSER",
  "seo.manufacturing.description": "تصنيع دقيق للألمنيوم بمراقبة جودة معتمدة. قطع وتجميع وتشطيب لأنظمة النوافذ والأبواب التجارية والصناعية.",
  "seo.government.title": "القطاع العام والتجاري | ARTSER",
  "seo.government.description": "أعمال الألمنيوم للقطاعين العام والتجاري، منفّذة وفق معايير تقنية وسلامة صارمة في جميع أنحاء إيطاليا.",
  "seo.clients.title": "عملاؤنا | ARTSER",
  "seo.clients.description": "شركات ومؤسسات راسخة تثق بـ ARTSER في خدمات إنتاج وتركيب نوافذ وأبواب وواجهات الألمنيوم.",
  "seo.gallery.title": "المعرض \u2014 المشاريع والمنشآت | ARTSER",
  "seo.gallery.description": "توثيق بصري لمشاريع ARTSER في الألمنيوم والسيراميتي، ومرافق الورشة، والتركيبات الميدانية.",
  "seo.certifications.title": "الشهادات والمؤهلات | ARTSER",
  "seo.certifications.description": "شهادات ARTSER المهنية: السلامة في مكان العمل، العمل على ارتفاعات، المنصات المرتفعة المتحركة، السلامة من الحرائق والإسعافات الأولية.",
  "seo.quote.title": "طلب عرض سعر | ARTSER",
  "seo.quote.description": "تواصل مع ARTSER للحصول على عرض سعر احترافي لنوافذ وأبواب وواجهات الألمنيوم والجدران الستائرية وخدمات التركيب.",
  "seo.contact.title": "اتصل بنا | ARTSER",
  "seo.contact.description": "تواصل مع ARTSER. مقرها في سان مارتينو بوون ألبيرغو، فيرونا، إيطاليا. خدمات احترافية في الألمنيوم والسيراميتي.",
  "seo.products.title": "المنتجات \u2014 أنظمة وحلول الألمنيوم | ARTSER",
  "seo.products.description": "اكتشف مجموعة ARTSER: نوافذ وأبواب وأنظمة منزلقة وواجهات وبيوت زجاجية وحلول المباني الذكية من الألمنيوم.",
  "seo.suppliers.title": "موردونا \u2014 منتجون أوروبيون | ARTSER",
  "seo.suppliers.description": "تتعاون ARTSER مع كبار المنتجين الأوروبيين لأنظمة الألمنيوم وPVC والحماية الشمسية."
}
```

---

### Task 5: Upgrade Urdu Translation Quality
**Files:**
- Modify: `translations/ur.json`

- [ ] **Step 1: Replace ALL Urdu translations with professional Urdu script**

Overwrite the entire content of `translations/ur.json` with:

```json
{
  "brand.name": "ARTSER",
  "nav.more": "مزید",
  "home.productsShowcaseTitle": "ہمارے جدید اور پائیدار ایلومینیم نظام دریافت کریں",
  "footer.ourProducts": "ہماری مصنوعات",
  "footer.ourCompany": "ہماری کمپنی",
  "footer.contactArtser": "ARTSER سے رابطہ کریں",
  "footer.legalInfo": "قانونی معلومات",
  "footer.privacy": "رازداری کی پالیسی",
  "footer.cookiePolicy": "کوکی پالیسی",
  "footer.cookieSettings": "کوکی ترتیبات",
  "footer.salesConditions": "فروخت کی عمومی شرائط",
  "footer.accessibility": "رسائی کا بیان",
  "footer.codeOfConduct": "پیشہ ورانہ ضابطہ اخلاق",
  "nav.home": "ہوم",
  "nav.about": "ہمارے بارے میں",
  "nav.services": "خدمات",
  "nav.portfolio": "ہمارے کام",
  "nav.jvProjects": "شراکتی منصوبے",
  "nav.manufacturing": "پیداوار",
  "nav.government": "سرکاری شعبہ",
  "nav.clients": "مؤکلین",
  "nav.gallery": "تصویری نگارخانہ",
  "nav.certifications": "اسناد",
  "nav.requestQuote": "قیمت کی درخواست",
  "nav.contact": "رابطہ",
  "common.language": "زبان",
  "common.theme": "ظاہری شکل",
  "common.menu": "فہرست",
  "common.readMore": "تفصیلات",
  "common.viewAll": "سب دیکھیں",
  "common.loading": "لوڈ ہو رہا ہے\u2026",
  "common.year": "سال",
  "common.location": "مقام",
  "common.category": "زمرہ",
  "common.partners": "شراکت دار",
  "common.authority": "متعلقہ ادارہ",
  "hero.slogan": "ایلومینیم میں درستگی۔ کارکردگی کے لیے بنایا گیا۔",
  "hero.welcome": "ARTSER میں خوش آمدید",
  "hero.subtitle": "ایلومینیم نظاموں کی پیداوار، تنصیب اور تکنیکی عمل درآمد \u2014 پیشہ ورانہ معیارات کے مطابق۔",
  "hero.cta": "قیمت کی درخواست کریں",
  "hero.secondaryCta": "ہمارے کام دیکھیں",
  "home.statsTitle": "ARTSER اعداد و شمار میں",
  "home.servicesTitle": "ہماری خدمات",
  "home.projectsTitle": "منتخب منصوبے",
  "home.clientsTitle": "قابلِ اعتماد شراکت دار",
  "about.title": "ہمارے بارے میں",
  "about.mission": "ہمارا مقصد",
  "about.vision": "ہمارا نصب العین",
  "about.journey": "پیشہ ورانہ سفر",
  "about.journeySubtitle": "شعبے میں تجربہ",
  "about.specializations": "تکنیکی مہارتیں",
  "about.collaborations": "صنعتی تعاون",
  "about.qualifications": "پیشہ ورانہ اہلیتیں",
  "about.yearsExperience": "تجربے کے سال",
  "about.team": "انتظامیہ",
  "services.title": "ہماری خدمات",
  "services.subtitle": "تجارتی، صنعتی اور رہائشی منصوبوں کے لیے ایلومینیم، PVC اور سیرامینٹی میں جامع خدمات۔",
  "portfolio.title": "ہمارے کام",
  "portfolio.subtitle": "رہائشی، تجارتی اور صنعتی شعبوں میں منتخب منصوبے۔",
  "jv.title": "شراکتی منصوبے",
  "jv.subtitle": "اٹلی کی مستند سیرامینٹی کمپنیوں کے ساتھ مل کر مکمل کیے گئے منصوبے۔",
  "manufacturing.title": "پیداوار اور تصنیع",
  "manufacturing.subtitle": "تصدیق شدہ کوالٹی کنٹرول کے عمل کے ساتھ درست ایلومینیم فیبریکیشن۔",
  "government.title": "سرکاری اور تجارتی شعبہ",
  "government.subtitle": "سخت تکنیکی اور حفاظتی معیارات کے مطابق سرکاری اور تجارتی کام۔",
  "clients.title": "ہمارے مؤکلین",
  "clients.subtitle": "وہ مستند کمپنیاں جو پیداوار اور تنصیب کی خدمات کے لیے ARTSER پر انحصار کرتی ہیں۔",
  "gallery.title": "تصویری نگارخانہ",
  "gallery.subtitle": "ہمارے منصوبوں، ورکشاپس اور میدانی تنصیبات کی دستاویزات۔",
  "certifications.title": "اسناد",
  "certifications.subtitle": "کام کی جگہ اور حفاظت کے اطالوی اور بین الاقوامی معیارات کے مطابق اعتبارنامے۔",
  "quote.title": "قیمت کی درخواست",
  "quote.subtitle": "اپنے منصوبے کی تفصیلات فراہم کریں، ہم آپ کو پیشہ ورانہ جائزہ دیں گے۔",
  "quote.name": "پورا نام",
  "quote.company": "کمپنی کا نام",
  "quote.email": "ای میل پتہ",
  "quote.phone": "فون نمبر",
  "quote.service": "مطلوبہ خدمت",
  "quote.message": "منصوبے کی تفصیل",
  "quote.submit": "درخواست بھیجیں",
  "quote.success": "شکریہ۔ آپ کی درخواست موصول ہو گئی ہے اور جلد از جلد اس پر کارروائی کی جائے گی۔",
  "quote.error": "ایک خرابی پیش آئی۔ براہ کرم دوبارہ کوشش کریں۔",
  "contact.title": "رابطہ کریں",
  "contact.subtitle": "منصوبوں سے متعلق استفسارات اور تکنیکی مشاورت کے لیے ARTSER ٹیم سے رابطہ کریں۔",
  "contact.headquarters": "مرکزی دفتر",
  "contact.offices": "دفاتر",
  "contact.followUs": "ہمیں فالو کریں",
  "footer.rights": "جملہ حقوق محفوظ ہیں۔",
  "footer.quickLinks": "فوری روابط",
  "admin.title": "انتظامی پینل",
  "admin.subtitle": "سائٹ کا مواد منظم کریں۔ تبدیلیاں JSON فائلوں میں محفوظ ہوتی ہیں۔",
  "sidebar.products": "مصنوعات",
  "sidebar.company": "کمپنی",
  "sidebar.projects": "منصوبے",
  "sidebar.resources": "وسائل",
  "sidebar.contact": "رابطہ",
  "breadcrumb.home": "ہوم",
  "breadcrumb.products": "مصنوعات",
  "hero.greeting": "ARTSER میں خوش آمدید",
  "hero.downloadPortfolio": "اعمال کی فائل ڈاؤن لوڈ کریں",
  "hero.scrollToExplore": "دریافت کے لیے نیچے سکرول کریں",
  "products.title": "مصنوعات",
  "products.subtitle": "ایلومینیم نظام اور حل: جدت، کارکردگی اور پائیداری۔",
  "products.searchCompare": "مصنوعات تلاش اور موازنہ کریں",
  "products.windows.title": "کھڑکیاں",
  "products.windows.description": "اعلیٰ کارکردگی کی ایلومینیم کھڑکیاں۔ بہترین فعالیت، عمدہ ڈیزائن، حفاظت اور تصدیق شدہ توانائی کارکردگی والے کثیر الاستعمال نظام جو ہر منصوبے کی ضروریات کو پورا کرتے ہیں۔",
  "products.doors.title": "دروازے",
  "products.doors.description": "ایلومینیم دروازوں کے نظام جو سیکیورٹی، حرارتی کارکردگی اور تعمیراتی خوبصورتی کو رہائشی اور تجارتی استعمال کے لیے یکجا کرتے ہیں۔",
  "products.sliding.title": "سلائیڈنگ اور فولڈنگ نظام",
  "products.sliding.description": "جگہ کے بہترین استعمال کے لیے سلائیڈنگ اور فولڈنگ نظام۔ اندرونی اور بیرونی ماحول کے درمیان ہموار منتقلی اور اعلیٰ حرارتی کارکردگی۔",
  "products.facades.title": "فیساد",
  "products.facades.description": "اعلیٰ معمارانہ معیار کی عمارتی پوشش کے لیے ایلومینیم فیساد نظام۔ کارکردگی، جمالیات اور موسمی مزاحمت کے لیے ڈیزائن کیے گئے کرٹین والز اور ساختی شیشے۔",
  "products.conservatories.title": "سبز خانے اور روشن دان",
  "products.conservatories.description": "قدرتی روشنی کو زیادہ سے زیادہ کرنے والے سبز خانے اور روشن دان کے حل، حرارتی آرام اور موسمی مزاحمت کے لیے ڈیزائن کیے گئے۔",
  "products.smart.title": "ذہین عمارتیں",
  "products.smart.description": "ذہین عمارتوں کے مربوط حل: آٹومیشن، وینٹیلیشن اور شمسی کنٹرول کے ذریعے توانائی میں اعلیٰ کارکردگی والے ماحول۔",
  "nav.suppliers": "سپلائرز",
  "suppliers.title": "ہمارے سپلائرز",
  "suppliers.subtitle": "ہم ایلومینیم، PVC اور شمسی تحفظ کے اعلیٰ معیار کے نظام فراہم کرنے کے لیے سرکردہ یورپی مصنوعین کے ساتھ شراکت رکھتے ہیں۔",
  "home.suppliersTitle": "ہمارے سپلائرز",
  "home.suppliersSubtitle": "یورپ کے بہترین مصنوعین کے ساتھ شراکت",
  "suppliers.viewAll": "تمام سپلائرز دیکھیں",
  "suppliers.visitWebsite": "ویب سائٹ ملاحظہ کریں",
  "suppliers.products": "مصنوعات",
  "suppliers.aluminium": "ایلومینیم فراہم کنندگان",
  "suppliers.pvc": "PVC فراہم کنندہ",
  "suppliers.shutters": "رولر شٹرز اور مچھر دانی",
  "products.keyFeatures": "تکنیکی خصوصیات",
  "products.suitableFor": "استعمال کے شعبے",
  "products.otherProducts": "دیگر مصنوعات",
  "products.requestQuote": "قیمت کی درخواست کریں",
  "home.founderTitle": "بانی",
  "home.founderSubtitle": "ایلومینیم نظاموں اور سیرامینٹی میں 26 سال سے زائد کا عملی تجربہ",
  "home.founderSince": "2015 سے آزادانہ سرگرم",
  "home.founderBased": "ویرونا، اٹلی میں مقیم",
  "home.founderLearnMore": "ہمارا پیشہ ورانہ سفر",
  "seo.home.title": "ARTSER \u2014 ایلومینیم کھڑکیاں، دروازے اور فیساد سسٹمز | ویرونا، اٹلی",
  "seo.home.description": "ARTSER تجارتی اور صنعتی منصوبوں کے لیے ایلومینیم کھڑکیوں، دروازوں، کرٹین والز اور فیساد سسٹمز کی پیداوار، تنصیب اور تکنیکی عمل درآمد میں مہارت رکھتا ہے۔ ویرونا، اٹلی میں مقیم۔",
  "seo.about.title": "ہمارے بارے میں \u2014 ایلومینیم اور سیرامینٹی میں 26 سال سے زائد کا تجربہ | ARTSER",
  "seo.about.description": "ARTSER کے پیشہ ورانہ سفر، ایلومینیم اور سیرامینٹی صنعت میں 26 سال سے زائد کے عملی تجربے، اور درست کاریگری کے عزم کے بارے میں جانیں۔",
  "seo.services.title": "خدمات \u2014 ایلومینیم، PVC اور فیساد سسٹمز | ARTSER",
  "seo.services.description": "ایلومینیم اور PVC کھڑکیوں اور دروازوں کی پیشہ ورانہ پیداوار و تنصیب، فیساد سسٹمز، کرٹین والز، سلائیڈنگ دروازے اور سن پروٹیکشن۔ تجارتی اور صنعتی منصوبوں کے لیے۔",
  "seo.portfolio.title": "ہمارے کام \u2014 مکمل شدہ منصوبے | ARTSER",
  "seo.portfolio.description": "اٹلی میں رہائشی، تجارتی اور صنعتی شعبوں میں ARTSER کے ذریعے مکمل کیے گئے ایلومینیم اور سیرامینٹی منصوبوں کا انتخاب۔",
  "seo.jv.title": "شراکتی منصوبے | ARTSER",
  "seo.jv.description": "اطالوی تعمیراتی اور سیرامینٹی کمپنیوں کے ساتھ شراکت میں مکمل کیے گئے ایلومینیم اور فیساد منصوبے۔",
  "seo.manufacturing.title": "پیداوار اور تصنیع | ARTSER",
  "seo.manufacturing.description": "تصدیق شدہ کوالٹی کنٹرول کے ساتھ درست ایلومینیم فیبریکیشن۔ تجارتی اور صنعتی کھڑکی اور دروازے کے نظاموں کے لیے کٹنگ، اسمبلی اور فنشنگ۔",
  "seo.government.title": "سرکاری اور تجارتی منصوبے | ARTSER",
  "seo.government.description": "پورے اٹلی میں سخت تکنیکی اور حفاظتی معیارات کے مطابق مکمل کیے گئے عوامی اور تجارتی ایلومینیم کے کام۔",
  "seo.clients.title": "ہمارے مؤکلین | ARTSER",
  "seo.clients.description": "وہ قائم شدہ کمپنیاں اور ادارے جو ایلومینیم کھڑکیوں، دروازوں اور فیساد کی پیداوار و تنصیب کی خدمات کے لیے ARTSER پر اعتماد کرتے ہیں۔",
  "seo.gallery.title": "تصویری نگارخانہ \u2014 منصوبے اور سہولیات | ARTSER",
  "seo.gallery.description": "ARTSER کے ایلومینیم اور سیرامینٹی منصوبوں، ورکشاپ سہولیات اور میدانی تنصیبات کی بصری دستاویزات۔",
  "seo.certifications.title": "اسناد اور اہلیتیں | ARTSER",
  "seo.certifications.description": "ARTSER کی پیشہ ورانہ اسناد: کام کی جگہ کی حفاظت، بلندی پر کام، موبائل ایلیویٹڈ پلیٹ فارمز، فائر سیفٹی اور ابتدائی طبی امداد۔",
  "seo.quote.title": "قیمت کی درخواست | ARTSER",
  "seo.quote.description": "ایلومینیم کھڑکیوں، دروازوں، فیساد، کرٹین والز اور تنصیب کی خدمات کے لیے ARTSER سے پیشہ ورانہ قیمت حاصل کریں۔",
  "seo.contact.title": "رابطہ کریں | ARTSER",
  "seo.contact.description": "ARTSER سے رابطہ کریں۔ سان مارتینو بوون البیرگو، ویرونا، اٹلی میں مقیم۔ ایلومینیم اور سیرامینٹی کی پیشہ ورانہ خدمات۔",
  "seo.products.title": "مصنوعات \u2014 ایلومینیم نظام اور حل | ARTSER",
  "seo.products.description": "ARTSER کی رینج دریافت کریں: ایلومینیم کھڑکیاں، دروازے، سلائیڈنگ نظام، فیساد، سبز خانے اور ذہین عمارتی حل۔",
  "seo.suppliers.title": "ہمارے سپلائرز \u2014 یورپی مصنوعین | ARTSER",
  "seo.suppliers.description": "ARTSER ایلومینیم، PVC اور شمسی تحفظ کے نظاموں کے سرکردہ یورپی مصنوعین کے ساتھ شراکت رکھتا ہے۔"
}
```

---

### Task 6: Create SEO Metadata Utility
**Files:**
- Create: `lib/seo.ts`

- [ ] **Step 1: Create the SEO metadata builder utility**

```typescript
// lib/seo.ts
import type { Metadata } from "next";
import { LOCALES, type Locale, translate } from "@/lib/i18n";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://artser.it";
const OG_IMAGE = `${SITE_URL}/logo/ARTSER_logo.png`;

/**
 * Build a localized metadata object for a given page.
 * Uses translation keys: seo.<page>.title and seo.<page>.description
 */
export function buildMetadata(
  page: string,
  path: string,
  locale: Locale = "it"
): Metadata {
  const title = translate(locale, `seo.${page}.title`);
  const description = translate(locale, `seo.${page}.description`);
  const url = `${SITE_URL}${path}`;

  // Build hreflang alternates
  const languages: Record<string, string> = {};
  for (const loc of LOCALES) {
    languages[loc] = url;
  }

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "ARTSER",
      locale: locale === "it" ? "it_IT" : locale === "ar" ? "ar_SA" : locale === "ur" ? "ur_PK" : "en_GB",
      type: "website",
      images: [
        {
          url: OG_IMAGE,
          width: 512,
          height: 512,
          alt: "ARTSER Logo",
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

/**
 * Merge page-specific metadata with base defaults.
 * Server components call this in their metadata export.
 */
export function pageMetadata(page: string, path: string): Metadata {
  // Default to Italian since ARTSER is an Italian company
  return buildMetadata(page, path, "it");
}
```

---

### Task 7: Add Metadata to Home Page
**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update root layout metadata with comprehensive SEO defaults**

In `app/layout.tsx`, replace the existing `metadata` export with:

```typescript
export const metadata: Metadata = {
  title: {
    default: "ARTSER — Finestre, Porte e Facciate in Alluminio | Verona, Italia",
    template: "%s | ARTSER",
  },
  description:
    "ARTSER e specializzata nella produzione, installazione ed esecuzione tecnica di finestre, porte, facciate continue e sistemi di facciata in alluminio per progetti commerciali e industriali. Con sede a Verona, Italia.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://artser.it"),
  icons: { icon: "/logo/ARTSER_logo.png" },
  openGraph: {
    type: "website",
    siteName: "ARTSER",
    locale: "it_IT",
    images: [{ url: "/logo/ARTSER_logo.png", width: 512, height: 512, alt: "ARTSER Logo" }],
  },
  twitter: {
    card: "summary",
    images: ["/logo/ARTSER_logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

- [ ] **Step 2: Note that home page (app/page.tsx) is a client component**

Since `app/page.tsx` uses `"use client"`, it cannot export `metadata`. The root layout metadata will serve as the home page metadata. This is acceptable because Next.js uses the nearest layout's metadata when a page does not export its own.

---

### Task 8: Add Metadata to Server-Renderable Pages
**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/services/page.tsx`
- Modify: `app/portfolio/page.tsx`
- Modify: `app/jv-projects/page.tsx`
- Modify: `app/manufacturing/page.tsx`
- Modify: `app/government/page.tsx`
- Modify: `app/clients/page.tsx`
- Modify: `app/gallery/page.tsx`
- Modify: `app/certifications/page.tsx`
- Modify: `app/request-quote/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/products/page.tsx`
- Modify: `app/suppliers/page.tsx`

- [ ] **Step 1: For each page that is a client component ("use client"), add a companion layout.tsx or keep root layout metadata**

Since most pages use `"use client"` (they call `useLanguage()`), we cannot export `metadata` from them directly. Instead, create a `layout.tsx` or `metadata.ts` file for each route. For each route, create a small metadata file.

Create `app/about/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("about", "/about");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create `app/services/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("services", "/services");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create `app/portfolio/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("portfolio", "/portfolio");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create `app/jv-projects/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("jv", "/jv-projects");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create `app/manufacturing/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("manufacturing", "/manufacturing");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create `app/government/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("government", "/government");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create `app/clients/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("clients", "/clients");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create `app/gallery/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("gallery", "/gallery");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create `app/certifications/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("certifications", "/certifications");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create `app/request-quote/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("quote", "/request-quote");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create `app/contact/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("contact", "/contact");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create `app/products/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("products", "/products");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

Create `app/suppliers/layout.tsx`:
```typescript
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("suppliers", "/suppliers");
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

---

### Task 9: Create Sitemap Generator
**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create the Next.js sitemap route**

```typescript
// app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://artser.it";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/jv-projects",
    "/manufacturing",
    "/government",
    "/clients",
    "/gallery",
    "/certifications",
    "/request-quote",
    "/contact",
    "/products",
    "/suppliers",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date("2026-08-15"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/services" || route === "/products" ? 0.9 : 0.7,
  }));
}
```

---

### Task 10: Create Robots.txt Generator
**Files:**
- Create: `app/robots.ts`

- [ ] **Step 1: Create the Next.js robots route**

```typescript
// app/robots.ts
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://artser.it";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

---

### Task 11: Add JSON-LD Structured Data Component
**Files:**
- Create: `components/StructuredData.tsx`

- [ ] **Step 1: Create the JSON-LD structured data component**

```tsx
// components/StructuredData.tsx

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://artser.it";

function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ART SER",
    legalName: "ART SER DI SHEHEZAD TARIQ",
    url: SITE_URL,
    logo: `${SITE_URL}/logo/ARTSER_logo.png`,
    description:
      "Professional aluminium and serramenti services: production, installation, and technical execution of windows, doors, curtain walls, and facade systems for commercial and industrial projects.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via XX Settembre 86",
      addressLocality: "San Martino Buon Albergo",
      addressRegion: "VR",
      postalCode: "37036",
      addressCountry: "IT",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+3903482402248",
      email: "art_ser@outlook.it",
      contactType: "customer service",
      availableLanguage: ["Italian", "English", "Arabic", "Urdu"],
    },
    sameAs: [
      "https://www.instagram.com/ts_khaan",
      "https://www.facebook.com/share/1QTyovYnxS/",
    ],
    foundingDate: "2015",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "1-10",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "ART SER",
    image: `${SITE_URL}/logo/ARTSER_logo.png`,
    url: SITE_URL,
    telephone: "+3903482402248",
    email: "art_ser@outlook.it",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via XX Settembre 86",
      addressLocality: "San Martino Buon Albergo",
      addressRegion: "VR",
      postalCode: "37036",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.4167,
      longitude: 11.0833,
    },
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Italy",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "ARTSER",
    url: SITE_URL,
    inLanguage: ["it", "en", "ar", "ur"],
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ServiceSchema() {
  const services = [
    {
      name: "Aluminium Windows & Doors Production",
      description:
        "Professional production and fabrication of aluminium window and door systems, including cutting, assembly, and quality-controlled finishing.",
    },
    {
      name: "PVC Windows & Doors",
      description:
        "Supply and installation of high-quality PVC window and door systems with excellent thermal insulation and durability.",
    },
    {
      name: "Installation & Assembly",
      description:
        "On-site installation, assembly, and fitting of aluminium and PVC serramenti systems with certified safety practices.",
    },
    {
      name: "Facade & Curtain Wall Systems",
      description:
        "Production and installation of aluminium facade systems, curtain walls, and structural glazing for commercial buildings.",
    },
    {
      name: "Sliding & Folding Systems",
      description:
        "Installation of premium sliding and folding door systems for seamless indoor-outdoor transitions.",
    },
    {
      name: "Sun Protection & Shutters",
      description:
        "Supply and installation of roller shutters, mosquito nets, blinds, and sun protection systems.",
    },
  ];

  const schema = services.map((svc) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    description: svc.description,
    provider: {
      "@type": "Organization",
      name: "ART SER",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Italy",
    },
    serviceType: "Aluminium & Serramenti Services",
  }));

  return (
    <>
      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}

export function StructuredData() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebSiteSchema />
      <ServiceSchema />
    </>
  );
}
```

---

### Task 12: Inject Structured Data into Root Layout
**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Import and render StructuredData in the head**

In `app/layout.tsx`, add the import at the top:

```typescript
import { StructuredData } from "@/components/StructuredData";
```

Then inside the `<head>` tag, add the component after the existing script:

```tsx
<head>
  <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration='manual';window.scrollTo(0,0);` }} />
  <StructuredData />
</head>
```

---

### Task 13: Improve Language Switcher UX
**Files:**
- Modify: `components/LanguageSwitcher.tsx`

- [ ] **Step 1: Update LOCALE_LABELS in lib/i18n.ts to use short labels for the switcher**

In `lib/i18n.ts`, add a new export for short labels used in the switcher:

```typescript
export const LOCALE_SHORT_LABELS: Record<Locale, string> = {
  en: "EN",
  it: "IT",
  ar: "AR",
  ur: "UR"
};
```

- [ ] **Step 2: Replace the entire LanguageSwitcher component**

Overwrite `components/LanguageSwitcher.tsx` with:

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT_LABELS } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <>
      {/* Desktop: inline pill buttons — IT | EN | AR | UR */}
      <div className="hidden sm:flex items-center gap-0.5 rounded-lg border border-border/40 bg-surface/50 px-1 py-0.5 text-sm" role="group" aria-label="Language">
        {LOCALES.map((l, i) => (
          <span key={l} className="flex items-center">
            {i > 0 && <span className="text-border/60 select-none">|</span>}
            <button
              type="button"
              onClick={() => setLocale(l)}
              aria-pressed={l === locale}
              aria-label={LOCALE_LABELS[l]}
              className={`rounded px-2 py-1 font-medium tracking-wide transition-colors ${
                l === locale
                  ? "bg-accent/15 text-accent font-bold"
                  : "text-muted hover:text-foreground hover:bg-surface-alt/50"
              }`}
            >
              {LOCALE_SHORT_LABELS[l]}
            </button>
          </span>
        ))}
      </div>

      {/* Mobile: compact dropdown */}
      <div className="relative sm:hidden" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 rounded-lg border border-border/60 px-2.5 py-1.5 text-xs font-bold text-accent tracking-wider transition hover:border-accent/60"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
          </svg>
          {LOCALE_SHORT_LABELS[locale]}
        </button>
        {open && (
          <div className="absolute end-0 top-full mt-1 z-50 min-w-[160px] rounded-xl border border-border/40 bg-surface/95 p-1.5 shadow-xl backdrop-blur-xl">
            {LOCALES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => { setLocale(l); setOpen(false); }}
                className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  l === locale
                    ? "bg-accent/10 font-bold text-accent"
                    : "text-foreground hover:bg-surface-alt"
                }`}
              >
                <span>{LOCALE_LABELS[l]}</span>
                <span className="text-xs font-medium text-muted">{LOCALE_SHORT_LABELS[l]}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
```

---

### Task 14: Add Transition Smoothing to Language Switch
**Files:**
- Modify: `components/providers/LanguageProvider.tsx`

- [ ] **Step 1: Add metadata update on language change**

In `LanguageProvider.tsx`, update the `useEffect` that sets lang/dir to also update the document title reactively:

Find the existing useEffect:
```typescript
  useEffect(() => {
    const dir = directionFor(locale);
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", dir);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);
```

Replace with:
```typescript
  useEffect(() => {
    const dir = directionFor(locale);
    document.documentElement.setAttribute("lang", locale);
    document.documentElement.setAttribute("dir", dir);
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);

    // Update document title to match current language
    const titleKey = `seo.home.title`;
    const localizedTitle = translate(locale, titleKey);
    if (localizedTitle !== titleKey) {
      // Only update if we have a translation (not fallback to key)
      const currentPath = window.location.pathname;
      const pageMap: Record<string, string> = {
        "/": "home",
        "/about": "about",
        "/services": "services",
        "/portfolio": "portfolio",
        "/jv-projects": "jv",
        "/manufacturing": "manufacturing",
        "/government": "government",
        "/clients": "clients",
        "/gallery": "gallery",
        "/certifications": "certifications",
        "/request-quote": "quote",
        "/contact": "contact",
        "/products": "products",
        "/suppliers": "suppliers",
      };
      const page = pageMap[currentPath] || "home";
      const pageTitle = translate(locale, `seo.${page}.title`);
      if (pageTitle !== `seo.${page}.title`) {
        document.title = pageTitle;
      }
    }
  }, [locale]);
```

Also add the `translate` import to the imports from `@/lib/i18n` if not already present:

```typescript
import {
  Locale,
  Direction,
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isLocale,
  directionFor,
  translate,
  localized as localizedHelper,
  Localized
} from "@/lib/i18n";
```

(The `translate` import is already present in the existing code, so no change needed for the import.)

---

### Task 15: RTL Audit — Verify Component Logical Properties
**Files:**
- Audit: `components/Header.tsx`
- Audit: `components/Footer.tsx`
- Audit: `components/Sidebar.tsx`
- Audit: `components/Section.tsx`
- Audit: `components/Breadcrumbs.tsx`

- [ ] **Step 1: Run a search for physical directional CSS properties across all components and pages**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
grep -rn "text-left\|text-right\|ml-\|mr-\|pl-\|pr-\|left-\|right-\|border-l-\|border-r-\|rounded-l-\|rounded-r-" --include="*.tsx" --include="*.css" components/ app/ | grep -v "node_modules" | grep -v ".next" | grep -v "left-1/2" | grep -v "translate-x"
```

- [ ] **Step 2: For each match found, replace with logical equivalents**

Replacement mapping:
- `text-left` -> `text-start`
- `text-right` -> `text-end`
- `ml-` -> `ms-`
- `mr-` -> `me-`
- `pl-` -> `ps-`
- `pr-` -> `pe-`
- `left-` -> `start-` (for positioning, except `left-1/2` which is centering and fine)
- `right-` -> `end-`
- `border-l-` -> `border-s-`
- `border-r-` -> `border-e-`
- `rounded-l-` -> `rounded-s-`
- `rounded-r-` -> `rounded-e-`

Apply each replacement in the files found. If no matches are found (as the initial grep suggested), this step is a verification pass that confirms RTL readiness.

- [ ] **Step 3: Verify globals.css has no physical directional properties that need fixing**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
grep -n "margin-left\|margin-right\|padding-left\|padding-right\|text-align: left\|text-align: right\|border-left\|border-right" app/globals.css
```

If any are found, replace with logical properties:
- `margin-left` -> `margin-inline-start`
- `margin-right` -> `margin-inline-end`
- `padding-left` -> `padding-inline-start`
- `padding-right` -> `padding-inline-end`
- `text-align: left` -> `text-align: start`
- `text-align: right` -> `text-align: end`
- `border-left` -> `border-inline-start`
- `border-right` -> `border-inline-end`

---

### Task 16: Ensure 3D Scene Labels Work in RTL
**Files:**
- Audit: `components/3d/` (all files)

- [ ] **Step 1: Check if any 3D components use Html from drei with hardcoded positioning**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
grep -rn "Html\|text-left\|text-right\|ml-\|mr-\|pl-\|pr-" --include="*.tsx" components/3d/
```

- [ ] **Step 2: For any Html labels in 3D scenes, ensure their CSS uses logical properties**

If `<Html>` components from drei are found with physical directional styles, update them to use logical equivalents. The `<Html>` component renders normal DOM inside a 3D scene, so standard CSS logical properties apply.

For any found instances, replace:
- `style={{ textAlign: 'left' }}` -> `style={{ textAlign: 'start' }}`
- `className="text-left"` -> `className="text-start"`
- `className="ml-2"` -> `className="ms-2"`

---

### Task 17: Add NEXT_PUBLIC_SITE_URL to Environment
**Files:**
- Create: `.env.local` (if not exists, otherwise modify)
- Modify: `.env.example` (create if not exists)

- [ ] **Step 1: Create .env.example with the site URL variable**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
echo "NEXT_PUBLIC_SITE_URL=https://artser.it" > .env.example
```

- [ ] **Step 2: Create .env.local for development**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
echo "NEXT_PUBLIC_SITE_URL=http://localhost:3000" > .env.local
```

- [ ] **Step 3: Ensure .env.local is in .gitignore**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
grep -q ".env.local" .gitignore || echo ".env.local" >> .gitignore
```

---

### Task 18: Update LOCALE Order — Italian First
**Files:**
- Modify: `lib/i18n.ts`

- [ ] **Step 1: Reorder LOCALES array to put Italian first (ARTSER is an Italian company)**

In `lib/i18n.ts`, change:

```typescript
export const LOCALES: Locale[] = ["en", "it", "ar", "ur"];
```

to:

```typescript
export const LOCALES: Locale[] = ["it", "en", "ar", "ur"];
```

- [ ] **Step 2: Change DEFAULT_LOCALE to Italian**

In `lib/i18n.ts`, change:

```typescript
export const DEFAULT_LOCALE: Locale = "en";
```

to:

```typescript
export const DEFAULT_LOCALE: Locale = "it";
```

This ensures Italian is the primary language (matching the Italian company identity) and appears first in the language switcher. The fallback chain becomes: current locale -> Italian -> first available value.

---

### Task 19: Add RTL-Specific Font Handling in globals.css
**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add Urdu-specific font import and RTL text adjustments**

At the top of `globals.css`, after the existing font import, add:

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap');
```

- [ ] **Step 2: Add RTL-specific rules at the end of globals.css (before any existing RTL section)**

Add at the end of `globals.css`:

```css
/* ============================================
   RTL Language Support
   ============================================ */

[dir="rtl"] {
  font-family: var(--font-arabic), var(--font-sans);
}

[lang="ur"] {
  font-family: "Noto Nastaliq Urdu", var(--font-arabic), var(--font-sans);
  line-height: 2;
}

[lang="ar"] {
  font-family: "Noto Sans Arabic", var(--font-arabic), var(--font-sans);
  line-height: 1.8;
}

/* Ensure proper number rendering in RTL */
[dir="rtl"] .tabular-nums {
  direction: ltr;
  unicode-bidi: embed;
}

/* Fix icon alignment in RTL */
[dir="rtl"] .icon-flip {
  transform: scaleX(-1);
}
```

---

### Task 20: Build Verification
**Files:**
- None (verification only)

- [ ] **Step 1: Run TypeScript type check**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
npx tsc --noEmit
```

- [ ] **Step 2: Run the build**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
npm run build
```

- [ ] **Step 3: Fix any build errors found**

Address any TypeScript or build errors. Common issues:
- Missing imports in layout files
- Type mismatches in metadata objects
- Translation key typos

---

### Task 21: Commit Phase 4 Changes
**Files:**
- All modified and created files

- [ ] **Step 1: Stage all Phase 4 files**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
git add translations/en.json translations/it.json translations/ar.json translations/ur.json lib/seo.ts lib/i18n.ts app/layout.tsx app/sitemap.ts app/robots.ts components/StructuredData.tsx components/LanguageSwitcher.tsx components/providers/LanguageProvider.tsx app/about/layout.tsx app/services/layout.tsx app/portfolio/layout.tsx app/jv-projects/layout.tsx app/manufacturing/layout.tsx app/government/layout.tsx app/clients/layout.tsx app/gallery/layout.tsx app/certifications/layout.tsx app/request-quote/layout.tsx app/contact/layout.tsx app/products/layout.tsx app/suppliers/layout.tsx app/globals.css .env.example
```

- [ ] **Step 2: Commit**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
git commit -m "feat: phase 4 — professional multilingual translations, SEO metadata, structured data, sitemap, and RTL improvements"
```

---

### Task 22: Visual QA — Language Switching Test
**Files:**
- None (manual testing)

- [ ] **Step 1: Start the dev server and verify each language**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
npm run dev
```

Test checklist:
1. Load homepage, verify Italian is default language
2. Switch to English (EN) — verify all text updates, no layout jump
3. Switch to Arabic (AR) — verify RTL layout mirrors correctly, Arabic font renders properly, no text overflow
4. Switch to Urdu (UR) — verify Nastaliq font loads, increased line height, RTL layout works
5. Switch back to Italian (IT) — verify LTR restores, text is professional architectural Italian
6. Navigate to /about, /services, /products while in each language
7. Check that the language switcher shows IT | EN | AR | UR in that order
8. Check mobile view: dropdown shows full language names with short codes
9. View page source: verify JSON-LD structured data is present
10. Check that `<html lang="...">` and `<html dir="...">` update on language switch
