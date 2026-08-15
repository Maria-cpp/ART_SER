# Phase 2: Homepage Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing homepage (hero slideshow + typewriter, flip cards, simple grids) with a premium 9-section architectural narrative: Hero, Material/Engineering, Services, Selected Projects, Engineering Process, Company Story, Partners/Suppliers, Products/Systems, and Contact CTA — all using the single ARTSER dark theme established in Phase 1.

**Architecture:** The current monolithic `app/page.tsx` will be broken into 9 self-contained section components under `components/sections/`. Each section is a client component that uses `useLanguage()` for i18n and `useScrollReveal()` for entrance animations. New translation keys are added to all 4 locale files. New data structures (engineering process steps, material flow steps, timeline milestones) are added to existing JSON files or as new JSON files with typed loaders. The existing Section component continues as a layout primitive but sections use direct markup where needed for full-width layouts.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 3, CSS custom properties, IntersectionObserver scroll reveals

---

### Task 1: Add Phase 2 Translation Keys — English

**Files:**
- Modify: `translations/en.json`

- [ ] **Step 1: Add all new homepage translation keys to en.json**

Add the following keys to the end of the JSON object (before the closing `}`):

```json
  "hero.headline": "ENGINEERED TO FRAME ARCHITECTURE.",
  "hero.subheadline": "Engineering, manufacturing, and installation of architectural aluminium systems.",
  "hero.ctaPrimary": "Request a Consultation",
  "hero.ctaSecondary": "View Our Projects",
  "hero.scrollIndicator": "Scroll to discover",
  "material.sectionLabel": "01 — MATERIAL",
  "material.title": "From Material to Architecture",
  "material.subtitle": "Every architectural element begins with precision engineering and material science.",
  "material.step1": "MATERIAL",
  "material.step1Desc": "Premium aluminium alloys selected for structural performance and longevity.",
  "material.step2": "PRECISION",
  "material.step2Desc": "CNC-controlled cutting and machining to exacting dimensional tolerances.",
  "material.step3": "ENGINEERING",
  "material.step3Desc": "Technical design integrating thermal, structural, and aesthetic requirements.",
  "material.step4": "FABRICATION",
  "material.step4Desc": "Assembly of profiles, glass, gaskets, and hardware into complete systems.",
  "material.step5": "ARCHITECTURE",
  "material.step5Desc": "Finished systems installed as integral elements of the building envelope.",
  "material.labelProfile": "Aluminium Profile",
  "material.labelGlass": "Glass",
  "material.labelThermalBreak": "Thermal Break",
  "material.labelGasket": "Gasket",
  "material.labelFrame": "Frame",
  "services.sectionLabel": "02 — SERVICES",
  "services.homeTitle": "Engineering & Installation Services",
  "services.homeSubtitle": "Comprehensive aluminium and PVC system capabilities — from production to installation.",
  "services.learnMore": "Learn more",
  "projects.sectionLabel": "03 — PROJECTS",
  "projects.homeTitle": "Selected Projects",
  "projects.homeSubtitle": "Architectural systems engineered, fabricated, and installed by ARTSER.",
  "projects.viewProject": "VIEW PROJECT",
  "projects.viewAll": "View all projects",
  "projects.scope": "Scope",
  "projects.systems": "Systems",
  "process.sectionLabel": "04 — PROCESS",
  "process.title": "Engineering Process",
  "process.subtitle": "From consultation to completed architecture — a structured approach to every project.",
  "process.step1": "Consultation",
  "process.step1Desc": "Understanding project requirements, site conditions, and architectural intent.",
  "process.step2": "Measurement",
  "process.step2Desc": "Precise on-site dimensional surveys and technical assessments.",
  "process.step3": "Engineering & Design",
  "process.step3Desc": "Technical design, structural calculations, and system specification.",
  "process.step4": "Fabrication",
  "process.step4Desc": "CNC cutting, machining, welding, and quality-controlled production.",
  "process.step5": "Finishing",
  "process.step5Desc": "Surface treatment, powder coating, anodizing, and quality inspection.",
  "process.step6": "Assembly",
  "process.step6Desc": "Integration of profiles, glass, hardware, gaskets, and sealing systems.",
  "process.step7": "Installation",
  "process.step7Desc": "Professional on-site fitting with certified safety practices.",
  "process.step8": "Final Result",
  "process.step8Desc": "Completed architectural elements — tested, sealed, and commissioned.",
  "story.sectionLabel": "05 — COMPANY",
  "story.title": "26+ Years of Experience",
  "story.subtitle": "Building trust through precision, reliability, and continuous professional development.",
  "story.yearsLabel": "YEARS OF EXPERIENCE",
  "story.since": "Since 2001",
  "story.milestone1Year": "2001",
  "story.milestone1Title": "Beginning",
  "story.milestone1Desc": "Entered the aluminium window and door industry with Dal Bosco Serramenti srl.",
  "story.milestone2Year": "2001–2015",
  "story.milestone2Title": "Experience",
  "story.milestone2Desc": "Developed expertise in production, assembly, and installation of aluminium systems.",
  "story.milestone3Year": "2015",
  "story.milestone3Title": "Independence",
  "story.milestone3Desc": "Established ART SER as an independent professional entity in Verona.",
  "story.milestone4Year": "2015–Present",
  "story.milestone4Title": "Growth",
  "story.milestone4Desc": "Collaborated with leading Italian companies on residential and industrial projects.",
  "story.milestone5Year": "Today",
  "story.milestone5Title": "ARTSER Today",
  "story.milestone5Desc": "26+ years of field experience. Engineering, fabrication, and installation across Italy.",
  "partners.sectionLabel": "06 — PARTNERS",
  "partners.title": "Partner Ecosystem",
  "partners.subtitle": "ARTSER combines high-quality systems from leading manufacturers with own engineering and installation expertise.",
  "partners.categoryAluminium": "Aluminium Systems",
  "partners.categoryPVC": "PVC Systems",
  "partners.categoryProtection": "Sun Protection",
  "partners.artserLabel": "ARTSER — Engineering & Installation",
  "products.sectionLabel": "07 — PRODUCTS",
  "products.homeTitle": "Products & Systems",
  "products.homeSubtitle": "Premium architectural aluminium and PVC systems for every application.",
  "products.viewDetails": "View details",
  "products.application": "Application",
  "products.material": "Material",
  "cta.sectionLabel": "08 — CONTACT",
  "cta.title": "LET'S BUILD SOMETHING.",
  "cta.subtitle": "Have a project in mind? Let's discuss how ARTSER can contribute.",
  "cta.action": "Request a Consultation",
  "cta.secondaryAction": "Contact Us",
  "cta.email": "Or email us directly"
```

---

### Task 2: Add Phase 2 Translation Keys — Italian

**Files:**
- Modify: `translations/it.json`

- [ ] **Step 1: Add all new homepage translation keys to it.json**

Add the following keys to the end of the JSON object (before the closing `}`):

```json
  "hero.headline": "PROGETTATI PER DEFINIRE L'ARCHITETTURA.",
  "hero.subheadline": "Progettazione, produzione e installazione di sistemi architettonici in alluminio.",
  "hero.ctaPrimary": "Richiedi una consulenza",
  "hero.ctaSecondary": "Scopri i nostri progetti",
  "hero.scrollIndicator": "Scorri per scoprire",
  "material.sectionLabel": "01 — MATERIALE",
  "material.title": "Dal materiale all'architettura",
  "material.subtitle": "Ogni elemento architettonico nasce dalla precisione ingegneristica e dalla scienza dei materiali.",
  "material.step1": "MATERIALE",
  "material.step1Desc": "Leghe di alluminio di alta qualit\u00e0 selezionate per prestazioni strutturali e longevit\u00e0.",
  "material.step2": "PRECISIONE",
  "material.step2Desc": "Taglio e lavorazione a controllo numerico CNC con tolleranze dimensionali rigorose.",
  "material.step3": "INGEGNERIA",
  "material.step3Desc": "Progettazione tecnica che integra requisiti termici, strutturali ed estetici.",
  "material.step4": "FABBRICAZIONE",
  "material.step4Desc": "Assemblaggio di profili, vetro, guarnizioni e ferramenta in sistemi completi.",
  "material.step5": "ARCHITETTURA",
  "material.step5Desc": "Sistemi finiti installati come elementi integrali dell'involucro edilizio.",
  "material.labelProfile": "Profilo in alluminio",
  "material.labelGlass": "Vetro",
  "material.labelThermalBreak": "Taglio termico",
  "material.labelGasket": "Guarnizione",
  "material.labelFrame": "Telaio",
  "services.sectionLabel": "02 — SERVIZI",
  "services.homeTitle": "Servizi di ingegneria e installazione",
  "services.homeSubtitle": "Competenze complete nei sistemi in alluminio e PVC — dalla produzione all'installazione.",
  "services.learnMore": "Scopri di pi\u00f9",
  "projects.sectionLabel": "03 — PROGETTI",
  "projects.homeTitle": "Progetti selezionati",
  "projects.homeSubtitle": "Sistemi architettonici progettati, fabbricati e installati da ARTSER.",
  "projects.viewProject": "VEDI PROGETTO",
  "projects.viewAll": "Vedi tutti i progetti",
  "projects.scope": "Ambito",
  "projects.systems": "Sistemi",
  "process.sectionLabel": "04 — PROCESSO",
  "process.title": "Processo ingegneristico",
  "process.subtitle": "Dalla consulenza all'architettura realizzata — un approccio strutturato per ogni progetto.",
  "process.step1": "Consulenza",
  "process.step1Desc": "Comprensione dei requisiti di progetto, delle condizioni del sito e dell'intento architettonico.",
  "process.step2": "Rilievo",
  "process.step2Desc": "Rilievi dimensionali precisi in cantiere e valutazioni tecniche.",
  "process.step3": "Progettazione tecnica",
  "process.step3Desc": "Progettazione tecnica, calcoli strutturali e specifiche di sistema.",
  "process.step4": "Fabbricazione",
  "process.step4Desc": "Taglio CNC, lavorazione, saldatura e produzione con controllo qualit\u00e0.",
  "process.step5": "Finitura",
  "process.step5Desc": "Trattamento superficiale, verniciatura a polvere, anodizzazione e ispezione qualit\u00e0.",
  "process.step6": "Assemblaggio",
  "process.step6Desc": "Integrazione di profili, vetro, ferramenta, guarnizioni e sistemi di tenuta.",
  "process.step7": "Installazione",
  "process.step7Desc": "Posa in opera professionale con pratiche di sicurezza certificate.",
  "process.step8": "Risultato finale",
  "process.step8Desc": "Elementi architettonici completati — collaudati, sigillati e messi in esercizio.",
  "story.sectionLabel": "05 — AZIENDA",
  "story.title": "Oltre 26 anni di esperienza",
  "story.subtitle": "Costruire fiducia attraverso precisione, affidabilit\u00e0 e sviluppo professionale continuo.",
  "story.yearsLabel": "ANNI DI ESPERIENZA",
  "story.since": "Dal 2001",
  "story.milestone1Year": "2001",
  "story.milestone1Title": "Inizio",
  "story.milestone1Desc": "Ingresso nel settore dei serramenti in alluminio con Dal Bosco Serramenti srl.",
  "story.milestone2Year": "2001\u20132015",
  "story.milestone2Title": "Esperienza",
  "story.milestone2Desc": "Sviluppo di competenze nella produzione, assemblaggio e installazione di sistemi in alluminio.",
  "story.milestone3Year": "2015",
  "story.milestone3Title": "Indipendenza",
  "story.milestone3Desc": "Costituzione di ART SER come entit\u00e0 professionale indipendente a Verona.",
  "story.milestone4Year": "2015\u2013oggi",
  "story.milestone4Title": "Crescita",
  "story.milestone4Desc": "Collaborazione con aziende italiane leader in progetti residenziali e industriali.",
  "story.milestone5Year": "Oggi",
  "story.milestone5Title": "ARTSER oggi",
  "story.milestone5Desc": "Oltre 26 anni di esperienza sul campo. Ingegneria, fabbricazione e installazione in tutta Italia.",
  "partners.sectionLabel": "06 — PARTNER",
  "partners.title": "Ecosistema dei partner",
  "partners.subtitle": "ARTSER unisce sistemi di alta qualit\u00e0 dai principali produttori alla propria competenza ingegneristica e di installazione.",
  "partners.categoryAluminium": "Sistemi in alluminio",
  "partners.categoryPVC": "Sistemi in PVC",
  "partners.categoryProtection": "Protezione solare",
  "partners.artserLabel": "ARTSER — Ingegneria e installazione",
  "products.sectionLabel": "07 — PRODOTTI",
  "products.homeTitle": "Prodotti e sistemi",
  "products.homeSubtitle": "Sistemi architettonici premium in alluminio e PVC per ogni applicazione.",
  "products.viewDetails": "Scopri i dettagli",
  "products.application": "Applicazione",
  "products.material": "Materiale",
  "cta.sectionLabel": "08 — CONTATTO",
  "cta.title": "COSTRUIAMO QUALCOSA INSIEME.",
  "cta.subtitle": "Hai un progetto? Parliamo di come ARTSER pu\u00f2 contribuire.",
  "cta.action": "Richiedi una consulenza",
  "cta.secondaryAction": "Contattaci",
  "cta.email": "Oppure scrivici direttamente"
```

---

### Task 3: Add Phase 2 Translation Keys — Arabic

**Files:**
- Modify: `translations/ar.json`

- [ ] **Step 1: Add all new homepage translation keys to ar.json**

Add the following keys to the end of the JSON object (before the closing `}`):

```json
  "hero.headline": "\u0647\u0646\u062f\u0633\u0629 \u062a\u0635\u0648\u063a \u0627\u0644\u0639\u0645\u0627\u0631\u0629.",
  "hero.subheadline": "\u0647\u0646\u062f\u0633\u0629 \u0648\u062a\u0635\u0646\u064a\u0639 \u0648\u062a\u0631\u0643\u064a\u0628 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0623\u0644\u0645\u0646\u064a\u0648\u0645 \u0627\u0644\u0645\u0639\u0645\u0627\u0631\u064a\u0629.",
  "hero.ctaPrimary": "\u0627\u0637\u0644\u0628 \u0627\u0633\u062a\u0634\u0627\u0631\u0629",
  "hero.ctaSecondary": "\u0627\u0633\u062a\u0639\u0631\u0636 \u0645\u0634\u0627\u0631\u064a\u0639\u0646\u0627",
  "hero.scrollIndicator": "\u0645\u0631\u0631 \u0644\u0644\u0623\u0633\u0641\u0644 \u0644\u0644\u0627\u0643\u062a\u0634\u0627\u0641",
  "material.sectionLabel": "01 \u2014 \u0627\u0644\u0645\u0627\u062f\u0629",
  "material.title": "\u0645\u0646 \u0627\u0644\u0645\u0627\u062f\u0629 \u0625\u0644\u0649 \u0627\u0644\u0639\u0645\u0627\u0631\u0629",
  "material.subtitle": "\u0643\u0644 \u0639\u0646\u0635\u0631 \u0645\u0639\u0645\u0627\u0631\u064a \u064a\u0628\u062f\u0623 \u0628\u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0627\u0644\u062f\u0642\u064a\u0642\u0629 \u0648\u0639\u0644\u0645 \u0627\u0644\u0645\u0648\u0627\u062f.",
  "material.step1": "\u0627\u0644\u0645\u0627\u062f\u0629",
  "material.step1Desc": "\u0633\u0628\u0627\u0626\u0643 \u0623\u0644\u0645\u0646\u064a\u0648\u0645 \u0645\u062a\u0645\u064a\u0632\u0629 \u0645\u062e\u062a\u0627\u0631\u0629 \u0644\u0644\u0623\u062f\u0627\u0621 \u0627\u0644\u0647\u064a\u0643\u0644\u064a \u0648\u0627\u0644\u0639\u0645\u0631 \u0627\u0644\u0637\u0648\u064a\u0644.",
  "material.step2": "\u0627\u0644\u062f\u0642\u0629",
  "material.step2Desc": "\u0642\u0637\u0639 \u0648\u062a\u0634\u063a\u064a\u0644 \u0628\u0627\u0644\u062a\u062d\u0643\u0645 \u0627\u0644\u0631\u0642\u0645\u064a CNC \u0628\u062a\u0641\u0627\u0648\u062a\u0627\u062a \u0623\u0628\u0639\u0627\u062f \u062f\u0642\u064a\u0642\u0629.",
  "material.step3": "\u0627\u0644\u0647\u0646\u062f\u0633\u0629",
  "material.step3Desc": "\u062a\u0635\u0645\u064a\u0645 \u062a\u0642\u0646\u064a \u064a\u062f\u0645\u062c \u0627\u0644\u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u062d\u0631\u0627\u0631\u064a\u0629 \u0648\u0627\u0644\u0647\u064a\u0643\u0644\u064a\u0629 \u0648\u0627\u0644\u062c\u0645\u0627\u0644\u064a\u0629.",
  "material.step4": "\u0627\u0644\u062a\u0635\u0646\u064a\u0639",
  "material.step4Desc": "\u062a\u062c\u0645\u064a\u0639 \u0627\u0644\u0628\u0631\u0648\u0641\u0627\u064a\u0644\u0627\u062a \u0648\u0627\u0644\u0632\u062c\u0627\u062c \u0648\u0627\u0644\u062d\u0634\u064a\u0627\u062a \u0648\u0627\u0644\u0639\u062a\u0627\u062f \u0641\u064a \u0623\u0646\u0638\u0645\u0629 \u0645\u062a\u0643\u0627\u0645\u0644\u0629.",
  "material.step5": "\u0627\u0644\u0639\u0645\u0627\u0631\u0629",
  "material.step5Desc": "\u0623\u0646\u0638\u0645\u0629 \u062c\u0627\u0647\u0632\u0629 \u0645\u0631\u0643\u0628\u0629 \u0643\u0639\u0646\u0627\u0635\u0631 \u0623\u0633\u0627\u0633\u064a\u0629 \u0641\u064a \u063a\u0644\u0627\u0641 \u0627\u0644\u0645\u0628\u0646\u0649.",
  "material.labelProfile": "\u0628\u0631\u0648\u0641\u0627\u064a\u0644 \u0623\u0644\u0645\u0646\u064a\u0648\u0645",
  "material.labelGlass": "\u0632\u062c\u0627\u062c",
  "material.labelThermalBreak": "\u0642\u0637\u0639 \u062d\u0631\u0627\u0631\u064a",
  "material.labelGasket": "\u062d\u0634\u064a\u0629",
  "material.labelFrame": "\u0625\u0637\u0627\u0631",
  "services.sectionLabel": "02 \u2014 \u0627\u0644\u062e\u062f\u0645\u0627\u062a",
  "services.homeTitle": "\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0648\u0627\u0644\u062a\u0631\u0643\u064a\u0628",
  "services.homeSubtitle": "\u0642\u062f\u0631\u0627\u062a \u0634\u0627\u0645\u0644\u0629 \u0641\u064a \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0623\u0644\u0645\u0646\u064a\u0648\u0645 \u0648PVC \u2014 \u0645\u0646 \u0627\u0644\u0625\u0646\u062a\u0627\u062c \u0625\u0644\u0649 \u0627\u0644\u062a\u0631\u0643\u064a\u0628.",
  "services.learnMore": "\u0627\u0639\u0631\u0641 \u0627\u0644\u0645\u0632\u064a\u062f",
  "projects.sectionLabel": "03 \u2014 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639",
  "projects.homeTitle": "\u0645\u0634\u0627\u0631\u064a\u0639 \u0645\u062e\u062a\u0627\u0631\u0629",
  "projects.homeSubtitle": "\u0623\u0646\u0638\u0645\u0629 \u0645\u0639\u0645\u0627\u0631\u064a\u0629 \u0635\u0645\u0645\u062a \u0648\u0635\u0646\u0639\u062a \u0648\u0631\u0643\u0628\u062a \u0628\u0648\u0627\u0633\u0637\u0629 ARTSER.",
  "projects.viewProject": "\u0639\u0631\u0636 \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
  "projects.viewAll": "\u0639\u0631\u0636 \u062c\u0645\u064a\u0639 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639",
  "projects.scope": "\u0627\u0644\u0646\u0637\u0627\u0642",
  "projects.systems": "\u0627\u0644\u0623\u0646\u0638\u0645\u0629",
  "process.sectionLabel": "04 \u2014 \u0627\u0644\u0639\u0645\u0644\u064a\u0629",
  "process.title": "\u0627\u0644\u0639\u0645\u0644\u064a\u0629 \u0627\u0644\u0647\u0646\u062f\u0633\u064a\u0629",
  "process.subtitle": "\u0645\u0646 \u0627\u0644\u0627\u0633\u062a\u0634\u0627\u0631\u0629 \u0625\u0644\u0649 \u0627\u0644\u0639\u0645\u0627\u0631\u0629 \u0627\u0644\u0645\u0643\u062a\u0645\u0644\u0629 \u2014 \u0646\u0647\u062c \u0645\u0646\u0638\u0645 \u0644\u0643\u0644 \u0645\u0634\u0631\u0648\u0639.",
  "process.step1": "\u0627\u0644\u0627\u0633\u062a\u0634\u0627\u0631\u0629",
  "process.step1Desc": "\u0641\u0647\u0645 \u0645\u062a\u0637\u0644\u0628\u0627\u062a \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u0648\u0638\u0631\u0648\u0641 \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0631\u0624\u064a\u0629 \u0627\u0644\u0645\u0639\u0645\u0627\u0631\u064a\u0629.",
  "process.step2": "\u0627\u0644\u0642\u064a\u0627\u0633",
  "process.step2Desc": "\u0645\u0633\u0648\u062d\u0627\u062a \u0623\u0628\u0639\u0627\u062f \u062f\u0642\u064a\u0642\u0629 \u0641\u064a \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u062a\u0642\u064a\u064a\u0645\u0627\u062a \u062a\u0642\u0646\u064a\u0629.",
  "process.step3": "\u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0648\u0627\u0644\u062a\u0635\u0645\u064a\u0645",
  "process.step3Desc": "\u062a\u0635\u0645\u064a\u0645 \u062a\u0642\u0646\u064a \u0648\u062d\u0633\u0627\u0628\u0627\u062a \u0647\u064a\u0643\u0644\u064a\u0629 \u0648\u0645\u0648\u0627\u0635\u0641\u0627\u062a \u0627\u0644\u0646\u0638\u0627\u0645.",
  "process.step4": "\u0627\u0644\u062a\u0635\u0646\u064a\u0639",
  "process.step4Desc": "\u0642\u0637\u0639 CNC \u0648\u062a\u0634\u063a\u064a\u0644 \u0648\u0644\u062d\u0627\u0645 \u0648\u0625\u0646\u062a\u0627\u062c \u0628\u0645\u0631\u0627\u0642\u0628\u0629 \u0627\u0644\u062c\u0648\u062f\u0629.",
  "process.step5": "\u0627\u0644\u062a\u0634\u0637\u064a\u0628",
  "process.step5Desc": "\u0645\u0639\u0627\u0644\u062c\u0629 \u0633\u0637\u062d\u064a\u0629 \u0648\u062f\u0647\u0627\u0646 \u0628\u0627\u0644\u0645\u0633\u062d\u0648\u0642 \u0648\u0623\u0646\u0648\u062f\u0629 \u0648\u0641\u062d\u0635 \u0627\u0644\u062c\u0648\u062f\u0629.",
  "process.step6": "\u0627\u0644\u062a\u062c\u0645\u064a\u0639",
  "process.step6Desc": "\u062f\u0645\u062c \u0627\u0644\u0628\u0631\u0648\u0641\u0627\u064a\u0644\u0627\u062a \u0648\u0627\u0644\u0632\u062c\u0627\u062c \u0648\u0627\u0644\u0639\u062a\u0627\u062f \u0648\u0627\u0644\u062d\u0634\u064a\u0627\u062a \u0648\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0625\u062d\u0643\u0627\u0645.",
  "process.step7": "\u0627\u0644\u062a\u0631\u0643\u064a\u0628",
  "process.step7Desc": "\u062a\u0631\u0643\u064a\u0628 \u0645\u064a\u062f\u0627\u0646\u064a \u0627\u062d\u062a\u0631\u0627\u0641\u064a \u0628\u0645\u0645\u0627\u0631\u0633\u0627\u062a \u0633\u0644\u0627\u0645\u0629 \u0645\u0639\u062a\u0645\u062f\u0629.",
  "process.step8": "\u0627\u0644\u0646\u062a\u064a\u062c\u0629 \u0627\u0644\u0646\u0647\u0627\u0626\u064a\u0629",
  "process.step8Desc": "\u0639\u0646\u0627\u0635\u0631 \u0645\u0639\u0645\u0627\u0631\u064a\u0629 \u0645\u0643\u062a\u0645\u0644\u0629 \u2014 \u0645\u062e\u062a\u0628\u0631\u0629 \u0648\u0645\u062d\u0643\u0645\u0629 \u0627\u0644\u0625\u063a\u0644\u0627\u0642 \u0648\u0645\u0639\u062a\u0645\u062f\u0629.",
  "story.sectionLabel": "05 \u2014 \u0627\u0644\u0634\u0631\u0643\u0629",
  "story.title": "\u0623\u0643\u062b\u0631 \u0645\u0646 26 \u0639\u0627\u0645\u064b\u0627 \u0645\u0646 \u0627\u0644\u062e\u0628\u0631\u0629",
  "story.subtitle": "\u0628\u0646\u0627\u0621 \u0627\u0644\u062b\u0642\u0629 \u0645\u0646 \u062e\u0644\u0627\u0644 \u0627\u0644\u062f\u0642\u0629 \u0648\u0627\u0644\u0645\u0648\u062b\u0648\u0642\u064a\u0629 \u0648\u0627\u0644\u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0645\u0647\u0646\u064a \u0627\u0644\u0645\u0633\u062a\u0645\u0631.",
  "story.yearsLabel": "\u0633\u0646\u0648\u0627\u062a \u0645\u0646 \u0627\u0644\u062e\u0628\u0631\u0629",
  "story.since": "\u0645\u0646\u0630 2001",
  "story.milestone1Year": "2001",
  "story.milestone1Title": "\u0627\u0644\u0628\u062f\u0627\u064a\u0629",
  "story.milestone1Desc": "\u062f\u062e\u0648\u0644 \u0635\u0646\u0627\u0639\u0629 \u0646\u0648\u0627\u0641\u0630 \u0648\u0623\u0628\u0648\u0627\u0628 \u0627\u0644\u0623\u0644\u0645\u0646\u064a\u0648\u0645 \u0645\u0639 \u0634\u0631\u0643\u0629 Dal Bosco Serramenti srl.",
  "story.milestone2Year": "2001\u20132015",
  "story.milestone2Title": "\u0627\u0644\u062e\u0628\u0631\u0629",
  "story.milestone2Desc": "\u062a\u0637\u0648\u064a\u0631 \u0627\u0644\u0643\u0641\u0627\u0621\u0627\u062a \u0641\u064a \u0627\u0644\u0625\u0646\u062a\u0627\u062c \u0648\u0627\u0644\u062a\u062c\u0645\u064a\u0639 \u0648\u062a\u0631\u0643\u064a\u0628 \u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0623\u0644\u0645\u0646\u064a\u0648\u0645.",
  "story.milestone3Year": "2015",
  "story.milestone3Title": "\u0627\u0644\u0627\u0633\u062a\u0642\u0644\u0627\u0644",
  "story.milestone3Desc": "\u062a\u0623\u0633\u064a\u0633 ART SER \u0643\u0643\u064a\u0627\u0646 \u0645\u0647\u0646\u064a \u0645\u0633\u062a\u0642\u0644 \u0641\u064a \u0641\u064a\u0631\u0648\u0646\u0627.",
  "story.milestone4Year": "2015\u2013\u0627\u0644\u064a\u0648\u0645",
  "story.milestone4Title": "\u0627\u0644\u0646\u0645\u0648",
  "story.milestone4Desc": "\u062a\u0639\u0627\u0648\u0646 \u0645\u0639 \u0634\u0631\u0643\u0627\u062a \u0625\u064a\u0637\u0627\u0644\u064a\u0629 \u0631\u0627\u0626\u062f\u0629 \u0641\u064a \u0645\u0634\u0627\u0631\u064a\u0639 \u0633\u0643\u0646\u064a\u0629 \u0648\u0635\u0646\u0627\u0639\u064a\u0629.",
  "story.milestone5Year": "\u0627\u0644\u064a\u0648\u0645",
  "story.milestone5Title": "ARTSER \u0627\u0644\u064a\u0648\u0645",
  "story.milestone5Desc": "\u0623\u0643\u062b\u0631 \u0645\u0646 26 \u0639\u0627\u0645\u064b\u0627 \u0645\u0646 \u0627\u0644\u062e\u0628\u0631\u0629 \u0627\u0644\u0645\u064a\u062f\u0627\u0646\u064a\u0629. \u0647\u0646\u062f\u0633\u0629 \u0648\u062a\u0635\u0646\u064a\u0639 \u0648\u062a\u0631\u0643\u064a\u0628 \u0641\u064a \u062c\u0645\u064a\u0639 \u0623\u0646\u062d\u0627\u0621 \u0625\u064a\u0637\u0627\u0644\u064a\u0627.",
  "partners.sectionLabel": "06 \u2014 \u0627\u0644\u0634\u0631\u0643\u0627\u0621",
  "partners.title": "\u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u0634\u0631\u0643\u0627\u0621",
  "partners.subtitle": "ARTSER \u062a\u062c\u0645\u0639 \u0628\u064a\u0646 \u0623\u0646\u0638\u0645\u0629 \u0639\u0627\u0644\u064a\u0629 \u0627\u0644\u062c\u0648\u062f\u0629 \u0645\u0646 \u0643\u0628\u0627\u0631 \u0627\u0644\u0645\u0635\u0646\u0639\u064a\u0646 \u0645\u0639 \u062e\u0628\u0631\u062a\u0647\u0627 \u0627\u0644\u0647\u0646\u062f\u0633\u064a\u0629 \u0648\u0627\u0644\u062a\u0631\u0643\u064a\u0628\u064a\u0629 \u0627\u0644\u062e\u0627\u0635\u0629.",
  "partners.categoryAluminium": "\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0623\u0644\u0645\u0646\u064a\u0648\u0645",
  "partners.categoryPVC": "\u0623\u0646\u0638\u0645\u0629 PVC",
  "partners.categoryProtection": "\u0627\u0644\u062d\u0645\u0627\u064a\u0629 \u0645\u0646 \u0627\u0644\u0634\u0645\u0633",
  "partners.artserLabel": "ARTSER \u2014 \u0627\u0644\u0647\u0646\u062f\u0633\u0629 \u0648\u0627\u0644\u062a\u0631\u0643\u064a\u0628",
  "products.sectionLabel": "07 \u2014 \u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a",
  "products.homeTitle": "\u0627\u0644\u0645\u0646\u062a\u062c\u0627\u062a \u0648\u0627\u0644\u0623\u0646\u0638\u0645\u0629",
  "products.homeSubtitle": "\u0623\u0646\u0638\u0645\u0629 \u0645\u0639\u0645\u0627\u0631\u064a\u0629 \u0645\u062a\u0645\u064a\u0632\u0629 \u0645\u0646 \u0627\u0644\u0623\u0644\u0645\u0646\u064a\u0648\u0645 \u0648PVC \u0644\u0643\u0644 \u062a\u0637\u0628\u064a\u0642.",
  "products.viewDetails": "\u0639\u0631\u0636 \u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644",
  "products.application": "\u0627\u0644\u062a\u0637\u0628\u064a\u0642",
  "products.material": "\u0627\u0644\u0645\u0627\u062f\u0629",
  "cta.sectionLabel": "08 \u2014 \u062a\u0648\u0627\u0635\u0644",
  "cta.title": "\u0644\u0646\u0628\u0646\u0650 \u0634\u064a\u0626\u064b\u0627 \u0645\u0639\u064b\u0627.",
  "cta.subtitle": "\u0644\u062f\u064a\u0643 \u0645\u0634\u0631\u0648\u0639\u061f \u062f\u0639\u0646\u0627 \u0646\u0646\u0627\u0642\u0634 \u0643\u064a\u0641 \u064a\u0645\u0643\u0646 \u0644\u0640 ARTSER \u0627\u0644\u0645\u0633\u0627\u0647\u0645\u0629.",
  "cta.action": "\u0627\u0637\u0644\u0628 \u0627\u0633\u062a\u0634\u0627\u0631\u0629",
  "cta.secondaryAction": "\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627",
  "cta.email": "\u0623\u0648 \u0631\u0627\u0633\u0644\u0646\u0627 \u0645\u0628\u0627\u0634\u0631\u0629"
```

---

### Task 4: Add Phase 2 Translation Keys — Urdu

**Files:**
- Modify: `translations/ur.json`

- [ ] **Step 1: Add all new homepage translation keys to ur.json**

Add the following keys to the end of the JSON object (before the closing `}`):

```json
  "hero.headline": "\u0641\u0646\u0650 \u062a\u0639\u0645\u06cc\u0631 \u06a9\u06cc \u062a\u0634\u06a9\u06cc\u0644 \u06a9\u06d2 \u0644\u06cc\u06d2 \u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0688\u06d4",
  "hero.subheadline": "\u0622\u0631\u06a9\u06cc\u0679\u06cc\u06a9\u0686\u0631\u0644 \u0627\u06cc\u0644\u0648\u0645\u06cc\u0646\u06cc\u0645 \u0633\u0633\u0679\u0645\u0632 \u06a9\u06cc \u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af\u060c \u067e\u06cc\u062f\u0627\u0648\u0627\u0631 \u0627\u0648\u0631 \u062a\u0646\u0635\u06cc\u0628\u06d4",
  "hero.ctaPrimary": "\u0645\u0634\u0627\u0648\u0631\u062a \u06a9\u06cc \u062f\u0631\u062e\u0648\u0627\u0633\u062a",
  "hero.ctaSecondary": "\u06c1\u0645\u0627\u0631\u06d2 \u0645\u0646\u0635\u0648\u0628\u06d2 \u062f\u06cc\u06a9\u06be\u06cc\u06ba",
  "hero.scrollIndicator": "\u062f\u0631\u06cc\u0627\u0641\u062a \u06a9\u06d2 \u0644\u06cc\u06d2 \u0646\u06cc\u0686\u06d2 \u0633\u06a9\u0631\u0648\u0644 \u06a9\u0631\u06cc\u06ba",
  "material.sectionLabel": "01 \u2014 \u0645\u0648\u0627\u062f",
  "material.title": "\u0645\u0648\u0627\u062f \u0633\u06d2 \u0641\u0646\u0650 \u062a\u0639\u0645\u06cc\u0631 \u062a\u06a9",
  "material.subtitle": "\u06c1\u0631 \u062a\u0639\u0645\u06cc\u0631\u0627\u062a\u06cc \u0639\u0646\u0635\u0631 \u062f\u0642\u06cc\u0642 \u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af \u0627\u0648\u0631 \u0645\u0648\u0627\u062f \u06a9\u06cc \u0633\u0627\u0626\u0646\u0633 \u0633\u06d2 \u0634\u0631\u0648\u0639 \u06c1\u0648\u062a\u0627 \u06c1\u06d2\u06d4",
  "material.step1": "\u0645\u0648\u0627\u062f",
  "material.step1Desc": "\u0633\u0627\u062e\u062a\u06cc \u06a9\u0627\u0631\u06a9\u0631\u062f\u06af\u06cc \u0627\u0648\u0631 \u062f\u06cc\u0631\u067e\u0627\u0626\u06cc \u06a9\u06d2 \u0644\u06cc\u06d2 \u0645\u0646\u062a\u062e\u0628 \u067e\u0631\u06cc\u0645\u06cc\u0645 \u0627\u06cc\u0644\u0648\u0645\u06cc\u0646\u06cc\u0645 \u06a9\u06be\u0648\u0679\u06d4",
  "material.step2": "\u062f\u0642\u062a",
  "material.step2Desc": "CNC \u06a9\u0646\u0679\u0631\u0648\u0644\u0688 \u06a9\u0679\u0646\u06af \u0627\u0648\u0631 \u0645\u0634\u06cc\u0646\u0646\u06af \u062f\u0642\u06cc\u0642 \u062c\u06c1\u062a\u06cc \u062a\u0641\u0627\u0648\u062a \u06a9\u06d2 \u0633\u0627\u062a\u06be\u06d4",
  "material.step3": "\u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af",
  "material.step3Desc": "\u062d\u0631\u0627\u0631\u062a\u06cc\u060c \u0633\u0627\u062e\u062a\u06cc \u0627\u0648\u0631 \u062c\u0645\u0627\u0644\u06cc\u0627\u062a\u06cc \u0636\u0631\u0648\u0631\u06cc\u0627\u062a \u06a9\u0648 \u0645\u0631\u0628\u0648\u0637 \u06a9\u0631\u0646\u06d2 \u0648\u0627\u0644\u0627 \u062a\u06a9\u0646\u06cc\u06a9\u06cc \u0688\u06cc\u0632\u0627\u0626\u0646\u06d4",
  "material.step4": "\u0641\u06cc\u0628\u0631\u06cc\u06a9\u06cc\u0634\u0646",
  "material.step4Desc": "\u067e\u0631\u0648\u0641\u0627\u0626\u0644\u0632\u060c \u0634\u06cc\u0634\u06d2\u060c \u06af\u06cc\u0633\u06a9\u0679\u0633 \u0627\u0648\u0631 \u06c1\u0627\u0631\u0688\u0648\u06cc\u0626\u0631 \u06a9\u0648 \u0645\u06a9\u0645\u0644 \u0646\u0638\u0627\u0645\u0648\u06ba \u0645\u06cc\u06ba \u062c\u0648\u0691\u0646\u0627\u06d4",
  "material.step5": "\u0641\u0646\u0650 \u062a\u0639\u0645\u06cc\u0631",
  "material.step5Desc": "\u0645\u06a9\u0645\u0644 \u0646\u0638\u0627\u0645 \u0639\u0645\u0627\u0631\u062a \u06a9\u06d2 \u063a\u0644\u0627\u0641 \u06a9\u06d2 \u0644\u0627\u0632\u0645\u06cc \u0639\u0646\u0627\u0635\u0631 \u06a9\u06d2 \u0637\u0648\u0631 \u067e\u0631 \u0646\u0635\u0628\u06d4",
  "material.labelProfile": "\u0627\u06cc\u0644\u0648\u0645\u06cc\u0646\u06cc\u0645 \u067e\u0631\u0648\u0641\u0627\u0626\u0644",
  "material.labelGlass": "\u0634\u06cc\u0634\u06c1",
  "material.labelThermalBreak": "\u062a\u06be\u0631\u0645\u0644 \u0628\u0631\u06cc\u06a9",
  "material.labelGasket": "\u06af\u06cc\u0633\u06a9\u0679",
  "material.labelFrame": "\u0641\u0631\u06cc\u0645",
  "services.sectionLabel": "02 \u2014 \u062e\u062f\u0645\u0627\u062a",
  "services.homeTitle": "\u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af \u0627\u0648\u0631 \u062a\u0646\u0635\u06cc\u0628 \u06a9\u06cc \u062e\u062f\u0645\u0627\u062a",
  "services.homeSubtitle": "\u0627\u06cc\u0644\u0648\u0645\u06cc\u0646\u06cc\u0645 \u0627\u0648\u0631 PVC \u0633\u0633\u0679\u0645\u0632 \u0645\u06cc\u06ba \u0645\u06a9\u0645\u0644 \u0635\u0644\u0627\u062d\u06cc\u062a\u06cc\u06ba \u2014 \u067e\u06cc\u062f\u0627\u0648\u0627\u0631 \u0633\u06d2 \u062a\u0646\u0635\u06cc\u0628 \u062a\u06a9\u06d4",
  "services.learnMore": "\u0645\u0632\u06cc\u062f \u062c\u0627\u0646\u06cc\u06ba",
  "projects.sectionLabel": "03 \u2014 \u0645\u0646\u0635\u0648\u0628\u06d2",
  "projects.homeTitle": "\u0645\u0646\u062a\u062e\u0628 \u0645\u0646\u0635\u0648\u0628\u06d2",
  "projects.homeSubtitle": "ARTSER \u06a9\u06d2 \u0630\u0631\u06cc\u0639\u06d2 \u0688\u06cc\u0632\u0627\u0626\u0646\u060c \u062a\u06cc\u0627\u0631 \u0627\u0648\u0631 \u0646\u0635\u0628 \u06a9\u06cc\u06d2 \u06af\u0626\u06d2 \u062a\u0639\u0645\u06cc\u0631\u0627\u062a\u06cc \u0646\u0638\u0627\u0645\u06d4",
  "projects.viewProject": "\u0645\u0646\u0635\u0648\u0628\u06c1 \u062f\u06cc\u06a9\u06be\u06cc\u06ba",
  "projects.viewAll": "\u062a\u0645\u0627\u0645 \u0645\u0646\u0635\u0648\u0628\u06d2 \u062f\u06cc\u06a9\u06be\u06cc\u06ba",
  "projects.scope": "\u062f\u0627\u0626\u0631\u06c1 \u06a9\u0627\u0631",
  "projects.systems": "\u0646\u0638\u0627\u0645",
  "process.sectionLabel": "04 \u2014 \u0639\u0645\u0644",
  "process.title": "\u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af \u06a9\u0627 \u0639\u0645\u0644",
  "process.subtitle": "\u0645\u0634\u0627\u0648\u0631\u062a \u0633\u06d2 \u0645\u06a9\u0645\u0644 \u0641\u0646\u0650 \u062a\u0639\u0645\u06cc\u0631 \u062a\u06a9 \u2014 \u06c1\u0631 \u0645\u0646\u0635\u0648\u0628\u06d2 \u06a9\u06d2 \u0644\u06cc\u06d2 \u0645\u0646\u0638\u0645 \u0637\u0631\u06cc\u0642\u06c1 \u06a9\u0627\u0631\u06d4",
  "process.step1": "\u0645\u0634\u0627\u0648\u0631\u062a",
  "process.step1Desc": "\u0645\u0646\u0635\u0648\u0628\u06d2 \u06a9\u06cc \u0636\u0631\u0648\u0631\u06cc\u0627\u062a\u060c \u0633\u0627\u0626\u0679 \u06a9\u06d2 \u062d\u0627\u0644\u0627\u062a \u0627\u0648\u0631 \u062a\u0639\u0645\u06cc\u0631\u0627\u062a\u06cc \u0645\u0642\u0635\u062f \u06a9\u06cc \u0633\u0645\u062c\u06be\u06d4",
  "process.step2": "\u067e\u06cc\u0645\u0627\u0626\u0634",
  "process.step2Desc": "\u0633\u0627\u0626\u0679 \u067e\u0631 \u062f\u0642\u06cc\u0642 \u062c\u06c1\u062a\u06cc \u0633\u0631\u0648\u06d2 \u0627\u0648\u0631 \u062a\u06a9\u0646\u06cc\u06a9\u06cc \u062c\u0627\u0626\u0632\u06d2\u06d4",
  "process.step3": "\u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af \u0648 \u0688\u06cc\u0632\u0627\u0626\u0646",
  "process.step3Desc": "\u062a\u06a9\u0646\u06cc\u06a9\u06cc \u0688\u06cc\u0632\u0627\u0626\u0646\u060c \u0633\u0627\u062e\u062a\u06cc \u062d\u0633\u0627\u0628\u0627\u062a \u0627\u0648\u0631 \u0646\u0638\u0627\u0645 \u06a9\u06cc \u0648\u0636\u0627\u062d\u062a\u06d4",
  "process.step4": "\u0641\u06cc\u0628\u0631\u06cc\u06a9\u06cc\u0634\u0646",
  "process.step4Desc": "CNC \u06a9\u0679\u0646\u06af\u060c \u0645\u0634\u06cc\u0646\u0646\u06af\u060c \u0648\u06cc\u0644\u0688\u0646\u06af \u0627\u0648\u0631 \u06a9\u0648\u0627\u0644\u0679\u06cc \u06a9\u0646\u0679\u0631\u0648\u0644\u0688 \u067e\u06cc\u062f\u0627\u0648\u0627\u0631\u06d4",
  "process.step5": "\u0641\u0646\u0634\u0646\u06af",
  "process.step5Desc": "\u0633\u0637\u062d\u06cc \u0639\u0644\u0627\u062c\u060c \u067e\u0627\u0624\u0688\u0631 \u06a9\u0648\u0679\u0646\u06af\u060c \u0627\u06cc\u0646\u0648\u0688\u0627\u0626\u0632\u0646\u06af \u0627\u0648\u0631 \u06a9\u0648\u0627\u0644\u0679\u06cc \u0645\u0639\u0627\u0626\u0646\u06c1\u06d4",
  "process.step6": "\u0627\u0633\u0645\u0628\u0644\u06cc",
  "process.step6Desc": "\u067e\u0631\u0648\u0641\u0627\u0626\u0644\u0632\u060c \u0634\u06cc\u0634\u06d2\u060c \u06c1\u0627\u0631\u0688\u0648\u06cc\u0626\u0631\u060c \u06af\u06cc\u0633\u06a9\u0679\u0633 \u0627\u0648\u0631 \u0633\u06cc\u0644\u0646\u06af \u0633\u0633\u0679\u0645\u0632 \u06a9\u0627 \u0627\u0646\u062f\u0645\u0627\u062c\u06d4",
  "process.step7": "\u062a\u0646\u0635\u06cc\u0628",
  "process.step7Desc": "\u062a\u0635\u062f\u06cc\u0642 \u0634\u062f\u06c1 \u062d\u0641\u0627\u0638\u062a\u06cc \u0637\u0631\u06cc\u0642\u0648\u06ba \u06a9\u06d2 \u0633\u0627\u062a\u06be \u067e\u06cc\u0634\u06c1 \u0648\u0631\u0627\u0646\u06c1 \u0633\u0627\u0626\u0679 \u067e\u0631 \u0641\u0679\u0646\u06af\u06d4",
  "process.step8": "\u062d\u062a\u0645\u06cc \u0646\u062a\u06cc\u062c\u06c1",
  "process.step8Desc": "\u0645\u06a9\u0645\u0644 \u062a\u0639\u0645\u06cc\u0631\u0627\u062a\u06cc \u0639\u0646\u0627\u0635\u0631 \u2014 \u062c\u0627\u0646\u0686\u06d2 \u06af\u0626\u06d2\u060c \u0633\u06cc\u0644 \u06a9\u06cc\u06d2 \u06af\u0626\u06d2 \u0627\u0648\u0631 \u0645\u0639\u062a\u0645\u062f\u06d4",
  "story.sectionLabel": "05 \u2014 \u06a9\u0645\u067e\u0646\u06cc",
  "story.title": "26 \u0633\u0627\u0644 \u0633\u06d2 \u0632\u0627\u0626\u062f \u062a\u062c\u0631\u0628\u06c1",
  "story.subtitle": "\u062f\u0631\u0633\u062a\u06af\u06cc\u060c \u0642\u0627\u0628\u0644 \u0627\u0639\u062a\u0645\u0627\u062f\u06cc \u0627\u0648\u0631 \u0645\u0633\u0644\u0633\u0644 \u067e\u06cc\u0634\u06c1 \u0648\u0631\u0627\u0646\u06c1 \u062a\u0631\u0642\u06cc \u06a9\u06d2 \u0630\u0631\u06cc\u0639\u06d2 \u0627\u0639\u062a\u0645\u0627\u062f \u06a9\u06cc \u062a\u0639\u0645\u06cc\u0631\u06d4",
  "story.yearsLabel": "\u062a\u062c\u0631\u0628\u06d2 \u06a9\u06d2 \u0633\u0627\u0644",
  "story.since": "2001 \u0633\u06d2",
  "story.milestone1Year": "2001",
  "story.milestone1Title": "\u0622\u063a\u0627\u0632",
  "story.milestone1Desc": "Dal Bosco Serramenti srl \u06a9\u06d2 \u0633\u0627\u062a\u06be \u0627\u06cc\u0644\u0648\u0645\u06cc\u0646\u06cc\u0645 \u06a9\u06be\u0691\u06a9\u06cc \u0627\u0648\u0631 \u062f\u0631\u0648\u0627\u0632\u06d2 \u06a9\u06cc \u0635\u0646\u0639\u062a \u0645\u06cc\u06ba \u062f\u0627\u062e\u0644\u06c1\u06d4",
  "story.milestone2Year": "2001\u20132015",
  "story.milestone2Title": "\u062a\u062c\u0631\u0628\u06c1",
  "story.milestone2Desc": "\u0627\u06cc\u0644\u0648\u0645\u06cc\u0646\u06cc\u0645 \u0633\u0633\u0679\u0645\u0632 \u06a9\u06cc \u067e\u06cc\u062f\u0627\u0648\u0627\u0631\u060c \u0627\u0633\u0645\u0628\u0644\u06cc \u0627\u0648\u0631 \u062a\u0646\u0635\u06cc\u0628 \u0645\u06cc\u06ba \u0645\u06c1\u0627\u0631\u062a \u06a9\u0627 \u0627\u0631\u062a\u0642\u0627\u06d4",
  "story.milestone3Year": "2015",
  "story.milestone3Title": "\u0622\u0632\u0627\u062f\u06cc",
  "story.milestone3Desc": "\u0648\u06cc\u0631\u0648\u0646\u0627 \u0645\u06cc\u06ba ART SER \u06a9\u0648 \u0627\u06cc\u06a9 \u0622\u0632\u0627\u062f \u067e\u06cc\u0634\u06c1 \u0648\u0631\u0627\u0646\u06c1 \u0627\u062f\u0627\u0631\u06d2 \u06a9\u06d2 \u0637\u0648\u0631 \u067e\u0631 \u0642\u0627\u0626\u0645 \u06a9\u06cc\u0627\u06d4",
  "story.milestone4Year": "2015\u2013\u0627\u0628 \u062a\u06a9",
  "story.milestone4Title": "\u062a\u0631\u0642\u06cc",
  "story.milestone4Desc": "\u0631\u06c1\u0627\u0626\u0634\u06cc \u0627\u0648\u0631 \u0635\u0646\u0639\u062a\u06cc \u0645\u0646\u0635\u0648\u0628\u0648\u06ba \u0645\u06cc\u06ba \u0627\u0637\u0627\u0644\u0648\u06cc \u0633\u0631\u06a9\u0631\u062f\u06c1 \u06a9\u0645\u067e\u0646\u06cc\u0648\u06ba \u06a9\u06d2 \u0633\u0627\u062a\u06be \u062a\u0639\u0627\u0648\u0646\u06d4",
  "story.milestone5Year": "\u0622\u062c",
  "story.milestone5Title": "\u0622\u062c \u06a9\u0627 ARTSER",
  "story.milestone5Desc": "26 \u0633\u0627\u0644 \u0633\u06d2 \u0632\u0627\u0626\u062f \u0645\u06cc\u062f\u0627\u0646\u06cc \u062a\u062c\u0631\u0628\u06c1\u06d4 \u067e\u0648\u0631\u06d2 \u0627\u0679\u0644\u06cc \u0645\u06cc\u06ba \u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af\u060c \u0641\u06cc\u0628\u0631\u06cc\u06a9\u06cc\u0634\u0646 \u0627\u0648\u0631 \u062a\u0646\u0635\u06cc\u0628\u06d4",
  "partners.sectionLabel": "06 \u2014 \u0634\u0631\u06a9\u0627\u0621",
  "partners.title": "\u067e\u0627\u0631\u0679\u0646\u0631 \u0627\u06cc\u06a9\u0648 \u0633\u0633\u0679\u0645",
  "partners.subtitle": "ARTSER \u0633\u0631\u06a9\u0631\u062f\u06c1 \u0645\u06cc\u0646\u0648\u0641\u06cc\u06a9\u0686\u0631\u0631\u0632 \u06a9\u06d2 \u0627\u0639\u0644\u06cc\u0670 \u0645\u0639\u06cc\u0627\u0631 \u06a9\u06d2 \u0646\u0638\u0627\u0645\u0648\u06ba \u06a9\u0648 \u0627\u067e\u0646\u06cc \u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af \u0627\u0648\u0631 \u062a\u0646\u0635\u06cc\u0628 \u06a9\u06cc \u0645\u06c1\u0627\u0631\u062a \u06a9\u06d2 \u0633\u0627\u062a\u06be \u0645\u0644\u0627\u062a\u0627 \u06c1\u06d2\u06d4",
  "partners.categoryAluminium": "\u0627\u06cc\u0644\u0648\u0645\u06cc\u0646\u06cc\u0645 \u0633\u0633\u0679\u0645\u0632",
  "partners.categoryPVC": "PVC \u0633\u0633\u0679\u0645\u0632",
  "partners.categoryProtection": "\u0633\u0646 \u067e\u0631\u0648\u0679\u06cc\u06a9\u0634\u0646",
  "partners.artserLabel": "ARTSER \u2014 \u0627\u0646\u062c\u06cc\u0646\u0626\u0631\u0646\u06af \u0648 \u062a\u0646\u0635\u06cc\u0628",
  "products.sectionLabel": "07 \u2014 \u0645\u0635\u0646\u0648\u0639\u0627\u062a",
  "products.homeTitle": "\u0645\u0635\u0646\u0648\u0639\u0627\u062a \u0627\u0648\u0631 \u0646\u0638\u0627\u0645",
  "products.homeSubtitle": "\u06c1\u0631 \u0627\u0633\u062a\u0639\u0645\u0627\u0644 \u06a9\u06d2 \u0644\u06cc\u06d2 \u067e\u0631\u06cc\u0645\u06cc\u0645 \u0622\u0631\u06a9\u06cc\u0679\u06cc\u06a9\u0686\u0631\u0644 \u0627\u06cc\u0644\u0648\u0645\u06cc\u0646\u06cc\u0645 \u0627\u0648\u0631 PVC \u0633\u0633\u0679\u0645\u0632\u06d4",
  "products.viewDetails": "\u062a\u0641\u0635\u06cc\u0644\u0627\u062a \u062f\u06cc\u06a9\u06be\u06cc\u06ba",
  "products.application": "\u0627\u0633\u062a\u0639\u0645\u0627\u0644",
  "products.material": "\u0645\u0648\u0627\u062f",
  "cta.sectionLabel": "08 \u2014 \u0631\u0627\u0628\u0637\u06c1",
  "cta.title": "\u0622\u0626\u06cc\u06d2 \u06a9\u0686\u06be \u062a\u0639\u0645\u06cc\u0631 \u06a9\u0631\u06cc\u06ba\u06d4",
  "cta.subtitle": "\u06a9\u0648\u0626\u06cc \u0645\u0646\u0635\u0648\u0628\u06c1 \u0630\u06c1\u0646 \u0645\u06cc\u06ba \u06c1\u06d2\u061f \u0622\u0626\u06cc\u06d2 \u0628\u0627\u062a \u06a9\u0631\u06cc\u06ba \u06a9\u06c1 ARTSER \u06a9\u06cc\u0633\u06d2 \u062d\u0635\u06c1 \u0688\u0627\u0644 \u0633\u06a9\u062a\u0627 \u06c1\u06d2\u06d4",
  "cta.action": "\u0645\u0634\u0627\u0648\u0631\u062a \u06a9\u06cc \u062f\u0631\u062e\u0648\u0627\u0633\u062a",
  "cta.secondaryAction": "\u0631\u0627\u0628\u0637\u06c1 \u06a9\u0631\u06cc\u06ba",
  "cta.email": "\u06cc\u0627 \u06c1\u0645\u06cc\u06ba \u0628\u0631\u0627\u06c1 \u0631\u0627\u0633\u062a \u0627\u06cc \u0645\u06cc\u0644 \u06a9\u0631\u06cc\u06ba"
```

---

### Task 5: Create HeroSection Component

**Files:**
- Create: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Create the hero section component**

```typescript
// File: components/sections/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function HeroSection() {
  const { t } = useLanguage();
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  const scrollToContent = () => {
    document.getElementById("content-start")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden w-full bg-[#0B0B0B]">
      {/* Dark gradient background — Phase 3 will add 3D here */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0B] via-[#141414] to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(181,138,98,0.08),transparent)]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(184,184,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(184,184,184,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container-x relative z-10 flex min-h-[90vh] flex-col items-center justify-center py-16 md:py-24 text-center">
        {/* Logo */}
        <div className="mb-8 scroll-reveal">
          <Image
            src="/logo/ARTSER_logo.png"
            alt="ARTSER"
            width={200}
            height={72}
            className="mx-auto h-auto w-auto max-h-16 md:max-h-20"
            priority
          />
        </div>

        {/* Headline */}
        <h1 className="scroll-reveal max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#F5F5F2] leading-[1.1]">
          {t("hero.headline")}
        </h1>

        {/* Subheadline */}
        <p className="mt-6 md:mt-8 max-w-2xl text-base md:text-lg text-[#B8B8B8] leading-relaxed scroll-reveal">
          {t("hero.subheadline")}
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 md:mt-12 flex flex-wrap items-center justify-center gap-4 scroll-reveal">
          <div className="relative">
            <button
              onClick={() => setPortfolioOpen((o) => !o)}
              className="inline-flex items-center justify-center rounded-none border-2 border-[#B58A62] bg-[#B58A62] px-8 py-3.5 text-sm font-semibold text-[#0B0B0B] uppercase tracking-[0.15em] transition-all duration-300 hover:bg-transparent hover:text-[#B58A62]"
            >
              {t("hero.ctaPrimary")}
            </button>
            {portfolioOpen && (
              <div className="absolute start-0 top-full mt-2 z-20 min-w-[220px] rounded-sm border border-[#2A2A2A] bg-[#141414] p-2 shadow-xl">
                <a
                  href="/portfolio/ART_SER_Portfolio_EN .pdf"
                  download="ART_SER_Portfolio_EN.pdf"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#F5F5F2] transition hover:text-[#B58A62]"
                  onClick={() => setPortfolioOpen(false)}
                >
                  Portfolio — English
                </a>
                <a
                  href="/portfolio/ART_SER_Portafoglio_IT.pdf"
                  download="ART_SER_Portafoglio_IT.pdf"
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-[#F5F5F2] transition hover:text-[#B58A62]"
                  onClick={() => setPortfolioOpen(false)}
                >
                  Portafoglio — Italiano
                </a>
              </div>
            )}
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center rounded-none border-2 border-[#B8B8B8]/30 px-8 py-3.5 text-sm font-semibold text-[#F5F5F2] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B58A62] hover:text-[#B58A62]"
          >
            {t("hero.ctaSecondary")}
          </Link>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToContent}
          className="mt-16 md:mt-24 hidden sm:flex flex-col items-center gap-3 text-[#747474] transition hover:text-[#B58A62]"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-medium">
            {t("hero.scrollIndicator")}
          </span>
          <div className="scroll-indicator">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  );
}
```

---

### Task 6: Create MaterialSection Component

**Files:**
- Create: `components/sections/MaterialSection.tsx`

- [ ] **Step 1: Create the material/engineering flow section**

```typescript
// File: components/sections/MaterialSection.tsx
"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

const STEPS = [
  { key: "step1", number: "01" },
  { key: "step2", number: "02" },
  { key: "step3", number: "03" },
  { key: "step4", number: "04" },
  { key: "step5", number: "05" },
] as const;

const LABELS = ["labelProfile", "labelGlass", "labelThermalBreak", "labelGasket", "labelFrame"] as const;

export function MaterialSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 md:py-32 bg-[#0B0B0B] overflow-hidden">
      {/* Subtle accent glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/40 to-transparent" />

      <div className="container-x">
        {/* Section label */}
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("material.sectionLabel")}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("material.title")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("material.subtitle")}
        </p>

        {/* Material flow steps */}
        <div className="grid gap-0 md:grid-cols-5 stagger-children">
          {STEPS.map((step, i) => (
            <div key={step.key} className="relative group">
              {/* Connector line (not on last) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 start-full w-full h-px bg-gradient-to-r from-[#B58A62]/40 to-transparent z-0" />
              )}

              <div className="relative z-10 p-6 md:p-4 lg:p-6 border border-[#2A2A2A] bg-[#141414]/50 transition-all duration-500 hover:border-[#B58A62]/40 hover:bg-[#141414]">
                {/* Step number */}
                <span className="text-[10px] tracking-[0.3em] text-[#B58A62] font-medium">
                  {step.number}
                </span>

                {/* Step title */}
                <h3 className="mt-3 text-lg md:text-xl font-bold text-[#F5F5F2] tracking-wide">
                  {t(`material.${step.key}`)}
                </h3>

                {/* Step description */}
                <p className="mt-3 text-xs md:text-sm text-[#747474] leading-relaxed">
                  {t(`material.${step.key}Desc`)}
                </p>

                {/* Arrow indicator (mobile) */}
                {i < STEPS.length - 1 && (
                  <div className="md:hidden flex justify-center mt-4 text-[#B58A62]/40">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Technical labels — placeholder for Phase 3 3D */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-10 scroll-reveal">
          {LABELS.map((label) => (
            <div key={label} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#B58A62]/60" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#747474] font-medium">
                {t(`material.${label}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 7: Create ServicesSection Component

**Files:**
- Create: `components/sections/ServicesSection.tsx`

- [ ] **Step 1: Create the interactive services section**

```typescript
// File: components/sections/ServicesSection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getServices } from "@/lib/data";

const SERVICE_ICONS: Record<string, string> = {
  factory: "M2 20h20M4 20V10l4 3V10l4 3V6h8v14M14 10h.01M18 10h.01M14 14h.01M18 14h.01",
  building: "M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 13v.01M9 17v.01",
  wrench: "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
  compass: "M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18",
  road: "M4 19h4M16 19h4M5 5l2 14M19 5l-2 14M12 5v2M12 11v2M12 17v2",
  clipboard: "M12 3a9 9 0 100 18 9 9 0 000-18zM12 3v4M12 17v4M3 12h4M17 12h4",
};

export function ServicesSection() {
  const { t, localized } = useLanguage();
  const services = getServices().slice(0, 6);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="relative py-20 md:py-32 bg-[#141414]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      <div className="container-x">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("services.sectionLabel")}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("services.homeTitle")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("services.homeSubtitle")}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {services.map((s) => {
            const isHovered = hoveredId === s.id;
            const iconPath = SERVICE_ICONS[s.icon] || SERVICE_ICONS.wrench;

            return (
              <div
                key={s.id}
                className={`group relative border transition-all duration-500 cursor-pointer ${
                  isHovered
                    ? "border-[#B58A62]/50 bg-[#1E1E1E]"
                    : "border-[#2A2A2A] bg-[#0B0B0B]/50 hover:border-[#B58A62]/30"
                }`}
                onMouseEnter={() => setHoveredId(s.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="p-6 md:p-8">
                  {/* Icon */}
                  <div className={`mb-5 flex h-10 w-10 items-center justify-center transition-colors duration-300 ${isHovered ? "text-[#B58A62]" : "text-[#B8B8B8]"}`}>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d={iconPath} />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-[#F5F5F2] mb-3">
                    {localized(s.title)}
                  </h3>

                  {/* Description — reveals on hover */}
                  <div className={`overflow-hidden transition-all duration-500 ${isHovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0 md:max-h-20 md:opacity-70"}`}>
                    <p className="text-xs md:text-sm text-[#747474] leading-relaxed">
                      {localized(s.description)}
                    </p>
                  </div>

                  {/* Learn more link */}
                  <div className={`mt-4 transition-all duration-300 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
                    <span className="text-xs font-medium text-[#B58A62] tracking-wider uppercase">
                      {t("services.learnMore")} &rarr;
                    </span>
                  </div>
                </div>

                {/* Accent line at top on hover */}
                <div className={`absolute top-0 inset-x-0 h-[2px] bg-[#B58A62] transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`} />
              </div>
            );
          })}
        </div>

        <div className="mt-12 scroll-reveal">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-none border-2 border-[#B8B8B8]/30 px-8 py-3 text-sm font-semibold text-[#F5F5F2] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B58A62] hover:text-[#B58A62]"
          >
            {t("common.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 8: Create ProjectsSection Component

**Files:**
- Create: `components/sections/ProjectsSection.tsx`

- [ ] **Step 1: Create the full-width cinematic projects section**

```typescript
// File: components/sections/ProjectsSection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getProjects } from "@/lib/data";

export function ProjectsSection() {
  const { t, localized } = useLanguage();
  const projects = getProjects().slice(0, 3);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative py-20 md:py-32 bg-[#0B0B0B]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      <div className="container-x">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("projects.sectionLabel")}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("projects.homeTitle")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("projects.homeSubtitle")}
        </p>
      </div>

      {/* Full-width project cards */}
      <div className="space-y-2 stagger-children">
        {projects.map((p, i) => (
          <Link
            key={p.id}
            href="/portfolio"
            className="group relative block w-full overflow-hidden"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Background image */}
            <div className="relative h-[50vh] md:h-[70vh]">
              {p.image && (
                <img
                  src={p.image}
                  alt={localized(p.title)}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                    hoveredIdx === i ? "scale-[1.02]" : "scale-100"
                  }`}
                />
              )}

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-16">
                <div className="container-x">
                  {/* Project number */}
                  <span className="text-[10px] tracking-[0.4em] uppercase text-[#B58A62] font-medium">
                    PROJECT {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Title */}
                  <h3 className="mt-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#F5F5F2] tracking-tight max-w-3xl">
                    {localized(p.title)}
                  </h3>

                  {/* Location and year */}
                  <p className="mt-2 text-sm text-[#B8B8B8]">
                    {p.location} &middot; {p.year}
                  </p>

                  {/* Category */}
                  <p className="mt-1 text-xs text-[#747474] uppercase tracking-wider">
                    {localized(p.category)}
                  </p>

                  {/* Summary — shows on hover */}
                  <p className={`mt-4 max-w-2xl text-sm text-[#B8B8B8] leading-relaxed line-clamp-3 transition-all duration-500 ${
                    hoveredIdx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 md:opacity-60 md:translate-y-0"
                  }`}>
                    {localized(p.summary)}
                  </p>

                  {/* View project link */}
                  <div className={`mt-6 transition-all duration-300 ${
                    hoveredIdx === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}>
                    <span className="text-xs font-semibold text-[#B58A62] tracking-[0.2em] uppercase">
                      {t("projects.viewProject")} &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="container-x mt-12 scroll-reveal">
        <Link
          href="/portfolio"
          className="inline-flex items-center justify-center rounded-none border-2 border-[#B8B8B8]/30 px-8 py-3 text-sm font-semibold text-[#F5F5F2] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B58A62] hover:text-[#B58A62]"
        >
          {t("projects.viewAll")}
        </Link>
      </div>
    </section>
  );
}
```

---

### Task 9: Create ProcessSection Component

**Files:**
- Create: `components/sections/ProcessSection.tsx`

- [ ] **Step 1: Create the 8-step engineering process section**

```typescript
// File: components/sections/ProcessSection.tsx
"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

const STEPS = [
  { key: "step1", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { key: "step2", icon: "M9 7h6m-6 4h6m-3-8v2m0 12v2M5 12H3m18 0h-2M7.05 7.05L5.636 5.636m12.728 12.728L16.95 16.95M7.05 16.95l-1.414 1.414M18.364 5.636L16.95 7.05" },
  { key: "step3", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { key: "step4", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
  { key: "step5", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
  { key: "step6", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { key: "step7", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { key: "step8", icon: "M5 13l4 4L19 7" },
] as const;

export function ProcessSection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 md:py-32 bg-[#141414]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      <div className="container-x">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("process.sectionLabel")}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("process.title")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("process.subtitle")}
        </p>

        {/* Process steps grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
          {STEPS.map((step, i) => (
            <div
              key={step.key}
              className="group relative border border-[#2A2A2A] bg-[#0B0B0B]/50 p-6 transition-all duration-500 hover:border-[#B58A62]/40 hover:bg-[#0B0B0B]"
            >
              {/* Step number */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-2xl font-bold text-[#B58A62]/30 group-hover:text-[#B58A62]/60 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <svg
                  className="h-5 w-5 text-[#747474] group-hover:text-[#B58A62] transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={step.icon} />
                </svg>
              </div>

              {/* Step title */}
              <h3 className="text-sm font-bold text-[#F5F5F2] uppercase tracking-wider mb-3">
                {t(`process.${step.key}`)}
              </h3>

              {/* Step description */}
              <p className="text-xs text-[#747474] leading-relaxed">
                {t(`process.${step.key}Desc`)}
              </p>

              {/* Accent bar at bottom on hover */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#B58A62] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 10: Create StorySection Component

**Files:**
- Create: `components/sections/StorySection.tsx`

- [ ] **Step 1: Create the company story timeline section with animated counter**

```typescript
// File: components/sections/StorySection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const MILESTONES = [
  { yearKey: "milestone1Year", titleKey: "milestone1Title", descKey: "milestone1Desc" },
  { yearKey: "milestone2Year", titleKey: "milestone2Title", descKey: "milestone2Desc" },
  { yearKey: "milestone3Year", titleKey: "milestone3Title", descKey: "milestone3Desc" },
  { yearKey: "milestone4Year", titleKey: "milestone4Title", descKey: "milestone4Desc" },
  { yearKey: "milestone5Year", titleKey: "milestone5Title", descKey: "milestone5Desc" },
] as const;

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export function StorySection() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 md:py-32 bg-[#0B0B0B]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      <div className="container-x">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("story.sectionLabel")}
        </p>

        {/* Large counter */}
        <div className="mb-12 scroll-reveal">
          <div className="flex items-end gap-2">
            <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#B58A62] leading-none tracking-tighter">
              <AnimatedCounter target={26} />+
            </span>
          </div>
          <p className="mt-2 text-xs md:text-sm tracking-[0.3em] uppercase text-[#B8B8B8] font-medium">
            {t("story.yearsLabel")}
          </p>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("story.title")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("story.subtitle")}
        </p>

        {/* Timeline */}
        <div className="relative stagger-children">
          {/* Vertical line */}
          <div className="absolute start-4 md:start-[120px] top-0 bottom-0 w-px bg-[#2A2A2A]" />

          {MILESTONES.map((m) => (
            <div key={m.yearKey} className="relative flex gap-6 md:gap-10 mb-10 last:mb-0">
              {/* Year label */}
              <div className="shrink-0 w-8 md:w-[120px] pt-1">
                <span className="hidden md:block text-xs font-bold text-[#B58A62] tracking-wider text-end pe-6">
                  {t(`story.${m.yearKey}`)}
                </span>
              </div>

              {/* Dot */}
              <div className="relative shrink-0 flex items-start">
                <div className="absolute start-0 top-2 h-3 w-3 rounded-full border-2 border-[#B58A62] bg-[#0B0B0B]" />
              </div>

              {/* Content */}
              <div className="ps-4 md:ps-6 pb-2">
                <span className="md:hidden text-[10px] font-bold text-[#B58A62] tracking-wider">
                  {t(`story.${m.yearKey}`)}
                </span>
                <h3 className="text-sm md:text-base font-bold text-[#F5F5F2] mt-0.5">
                  {t(`story.${m.titleKey}`)}
                </h3>
                <p className="mt-2 text-xs md:text-sm text-[#747474] leading-relaxed max-w-lg">
                  {t(`story.${m.descKey}`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 11: Create PartnersSection Component

**Files:**
- Create: `components/sections/PartnersSection.tsx`

- [ ] **Step 1: Create the partner ecosystem section**

```typescript
// File: components/sections/PartnersSection.tsx
"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { getSuppliers } from "@/lib/data";

export function PartnersSection() {
  const { t, localized } = useLanguage();
  const suppliers = getSuppliers();

  // Group suppliers by type
  const aluminium = suppliers.filter((s) => s.type.en?.includes("Aluminium"));
  const pvc = suppliers.filter((s) => s.type.en?.includes("PVC"));
  const protection = suppliers.filter((s) => !s.type.en?.includes("Aluminium") && !s.type.en?.includes("PVC"));

  const groups = [
    { label: t("partners.categoryAluminium"), items: aluminium },
    { label: t("partners.categoryPVC"), items: pvc },
    { label: t("partners.categoryProtection"), items: protection },
  ].filter((g) => g.items.length > 0);

  return (
    <section className="relative py-20 md:py-32 bg-[#141414]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      <div className="container-x">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("partners.sectionLabel")}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("partners.title")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("partners.subtitle")}
        </p>

        {/* ARTSER center node */}
        <div className="mb-12 scroll-reveal">
          <div className="inline-flex items-center gap-3 border border-[#B58A62]/40 bg-[#B58A62]/5 px-6 py-3">
            <div className="h-3 w-3 rounded-full bg-[#B58A62]" />
            <span className="text-xs font-bold text-[#B58A62] uppercase tracking-[0.2em]">
              {t("partners.artserLabel")}
            </span>
          </div>
        </div>

        {/* Supplier groups */}
        <div className="space-y-12 stagger-children">
          {groups.map((group) => (
            <div key={group.label}>
              {/* Group label */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-[#2A2A2A]" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#747474] font-medium shrink-0">
                  {group.label}
                </span>
                <div className="h-px flex-1 bg-[#2A2A2A]" />
              </div>

              {/* Supplier logos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {group.items.map((s) => (
                  <a
                    key={s.id}
                    href={s.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 border border-[#2A2A2A] bg-[#0B0B0B]/50 p-6 transition-all duration-300 hover:border-[#B58A62]/40"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-sm bg-white p-2">
                      <img src={s.logo} alt={s.name} className="h-12 w-12 object-contain" />
                    </div>
                    <span className="text-xs font-medium text-[#F5F5F2] text-center">{s.name}</span>
                    <span className="text-[10px] text-[#747474]">{s.country}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 12: Create ProductsSection Component

**Files:**
- Create: `components/sections/ProductsSection.tsx`

- [ ] **Step 1: Create the premium products/systems section**

```typescript
// File: components/sections/ProductsSection.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getCategories } from "@/lib/data";

const PRODUCT_MATERIALS: Record<string, { application: string; material: string }> = {
  windows: { application: "Residential / Commercial", material: "Aluminium" },
  doors: { application: "Residential / Commercial", material: "Aluminium" },
  "sliding-folding": { application: "Residential / Commercial", material: "Aluminium" },
  facades: { application: "Commercial / Industrial", material: "Aluminium / Glass" },
  conservatories: { application: "Residential", material: "Aluminium / Glass" },
  "smart-buildings": { application: "Commercial", material: "Aluminium / Integrated Systems" },
};

export function ProductsSection() {
  const { t, localized } = useLanguage();
  const categories = getCategories().filter((c) => c.id !== "all-products");

  return (
    <section className="relative py-20 md:py-32 bg-[#0B0B0B]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      <div className="container-x">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-4 scroll-reveal">
          {t("products.sectionLabel")}
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F2] tracking-tight mb-4 scroll-reveal">
          {t("products.homeTitle")}
        </h2>

        <p className="max-w-2xl text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-16 scroll-reveal">
          {t("products.homeSubtitle")}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
          {categories.map((c) => {
            const meta = PRODUCT_MATERIALS[c.id] || { application: "—", material: "Aluminium" };

            return (
              <Link
                key={c.id}
                href={c.href}
                className="group relative border border-[#2A2A2A] bg-[#141414]/50 p-6 md:p-8 transition-all duration-500 hover:border-[#B58A62]/40 hover:bg-[#141414]"
              >
                {/* Product name */}
                <h3 className="text-base md:text-lg font-bold text-[#F5F5F2] mb-4 group-hover:text-[#B58A62] transition-colors duration-300">
                  {localized(c.name)}
                </h3>

                {/* Technical details */}
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between border-b border-[#2A2A2A] pb-2">
                    <span className="text-[#747474] uppercase tracking-wider">{t("products.application")}</span>
                    <span className="text-[#B8B8B8]">{meta.application}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#2A2A2A] pb-2">
                    <span className="text-[#747474] uppercase tracking-wider">{t("products.material")}</span>
                    <span className="text-[#B8B8B8]">{meta.material}</span>
                  </div>
                </div>

                {/* View details link */}
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#B58A62] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {t("products.viewDetails")} &rarr;
                  </span>
                </div>

                {/* Accent line */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-[#B58A62] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            );
          })}
        </div>

        <div className="mt-12 scroll-reveal">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-none border-2 border-[#B8B8B8]/30 px-8 py-3 text-sm font-semibold text-[#F5F5F2] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B58A62] hover:text-[#B58A62]"
          >
            {t("common.viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 13: Create CTASection Component

**Files:**
- Create: `components/sections/CTASection.tsx`

- [ ] **Step 1: Create the minimal contact CTA section**

```typescript
// File: components/sections/CTASection.tsx
"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { getContact } from "@/lib/data";

export function CTASection() {
  const { t } = useLanguage();
  const contact = getContact();

  return (
    <section className="relative py-24 md:py-40 bg-[#141414]">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B58A62]/30 to-transparent" />

      {/* Subtle accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(181,138,98,0.04),transparent)]" />

      <div className="container-x relative z-10 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#747474] font-medium mb-8 scroll-reveal">
          {t("cta.sectionLabel")}
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5F5F2] tracking-tight mb-6 scroll-reveal">
          {t("cta.title")}
        </h2>

        <p className="max-w-xl mx-auto text-[#B8B8B8] text-sm md:text-base leading-relaxed mb-12 scroll-reveal">
          {t("cta.subtitle")}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 scroll-reveal">
          <Link
            href="/request-quote"
            className="inline-flex items-center justify-center rounded-none border-2 border-[#B58A62] bg-[#B58A62] px-8 py-3.5 text-sm font-semibold text-[#0B0B0B] uppercase tracking-[0.15em] transition-all duration-300 hover:bg-transparent hover:text-[#B58A62]"
          >
            {t("cta.action")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-none border-2 border-[#B8B8B8]/30 px-8 py-3.5 text-sm font-semibold text-[#F5F5F2] uppercase tracking-[0.15em] transition-all duration-300 hover:border-[#B58A62] hover:text-[#B58A62]"
          >
            {t("cta.secondaryAction")}
          </Link>
        </div>

        {/* Email fallback */}
        <p className="mt-8 text-xs text-[#747474] scroll-reveal">
          {t("cta.email")}:{" "}
          <a href={`mailto:${contact.email}`} className="text-[#B58A62] hover:underline">
            {contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}
```

---

### Task 14: Create Sections Barrel Export

**Files:**
- Create: `components/sections/index.ts`

- [ ] **Step 1: Create the barrel export file for all section components**

```typescript
// File: components/sections/index.ts
export { HeroSection } from "./HeroSection";
export { MaterialSection } from "./MaterialSection";
export { ServicesSection } from "./ServicesSection";
export { ProjectsSection } from "./ProjectsSection";
export { ProcessSection } from "./ProcessSection";
export { StorySection } from "./StorySection";
export { PartnersSection } from "./PartnersSection";
export { ProductsSection } from "./ProductsSection";
export { CTASection } from "./CTASection";
```

---

### Task 15: Rewrite Homepage to Use New Sections

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the entire contents of app/page.tsx with the new homepage**

```typescript
// File: app/page.tsx
"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import {
  HeroSection,
  MaterialSection,
  ServicesSection,
  ProjectsSection,
  ProcessSection,
  StorySection,
  PartnersSection,
  ProductsSection,
  CTASection,
} from "@/components/sections";

export default function HomePage() {
  useScrollReveal();

  return (
    <>
      {/* 01 — HERO */}
      <HeroSection />

      <div id="content-start" />

      {/* 02 — MATERIAL / ENGINEERING */}
      <MaterialSection />

      {/* 03 — SERVICES */}
      <ServicesSection />

      {/* 04 — SELECTED PROJECTS */}
      <ProjectsSection />

      {/* 05 — ENGINEERING PROCESS */}
      <ProcessSection />

      {/* 06 — COMPANY STORY */}
      <StorySection />

      {/* 07 — PARTNERS / SUPPLIERS */}
      <PartnersSection />

      {/* 08 — PRODUCTS / SYSTEMS */}
      <ProductsSection />

      {/* 09 — CONTACT / CTA */}
      <CTASection />
    </>
  );
}
```

---

### Task 16: Add Homepage-Specific CSS

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add new homepage section styles at the end of globals.css (before the last closing comment or at the very end)**

Append the following CSS at the end of `app/globals.css`:

```css
/* ============================================
   PHASE 2 — HOMEPAGE SECTION STYLES
   ============================================ */

/* Section label style — small uppercase tracking */
.section-label {
  font-size: 10px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgb(var(--color-muted));
  font-weight: 500;
}

/* Project card image hover zoom */
.project-image-hover {
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.project-image-hover:hover {
  transform: scale(1.02);
}

/* Timeline connector line */
.timeline-line {
  position: absolute;
  width: 1px;
  background: linear-gradient(
    to bottom,
    rgb(var(--color-accent) / 0.4),
    rgb(var(--color-border)),
    rgb(var(--color-accent) / 0.4)
  );
}

/* Service card expand animation */
.service-card-expand {
  transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.4s ease;
}

/* Process step hover accent */
.process-step-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgb(var(--color-accent));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.group:hover .process-step-accent {
  transform: scaleX(1);
}

/* Counter animation support */
@keyframes countUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Reduced motion: simplify all homepage animations */
@media (prefers-reduced-motion: reduce) {
  .project-image-hover {
    transition: none;
  }
  .project-image-hover:hover {
    transform: none;
  }
  .service-card-expand {
    transition: none;
  }
  .process-step-accent {
    transition: none;
  }
}
```

---

### Task 17: Verify Build Compiles

**Files:**
- None (verification only)

- [ ] **Step 1: Run the TypeScript type checker to ensure no compilation errors**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser" && npx tsc --noEmit
```

- [ ] **Step 2: If there are type errors, fix them in the relevant files**

Common fixes:
- If `getContact()` return type is missing fields, check `lib/data.ts` for the Contact interface
- If translation keys are not found at runtime (but compile fine), that is expected — t() falls back to the key string
- If `localized()` type complaints, ensure the supplier `type` field is accessed as `s.type` (which is `Localized`)

- [ ] **Step 3: Run dev server to verify page renders**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser" && npx next dev --port 3000
```

Open `http://localhost:3000` and verify the 9 sections render in order.

---

### Task 18: Verify RTL Layout

**Files:**
- None (verification only)

- [ ] **Step 1: Switch to Arabic or Urdu in the language selector and verify**

Check each section for:
- Text alignment (should be start-aligned, which is right in RTL)
- Timeline vertical line positioning uses `start` not `left`
- CTA buttons maintain proper spacing in RTL
- Project hover `VIEW PROJECT` arrow direction is appropriate
- Scroll indicator is centered
- No horizontal overflow

- [ ] **Step 2: Fix any RTL issues by replacing physical CSS properties with logical ones**

If any component uses `left`/`right` directly in Tailwind, replace:
- `left-*` with `start-*`
- `right-*` with `end-*`
- `ml-*` with `ms-*`
- `mr-*` with `me-*`
- `pl-*` with `ps-*`
- `pr-*` with `pe-*`
- `text-left` with `text-start`
- `text-right` with `text-end`

---

### Task 19: Mobile Responsive Verification

**Files:**
- None (verification only)

- [ ] **Step 1: Test at 375px viewport width**

Verify:
- Hero headline wraps cleanly on small screens
- Material flow steps stack vertically
- Service cards are single-column on narrow screens
- Project cards maintain readable text
- Process grid collapses to 1-column
- Timeline is readable
- CTA buttons stack if needed
- No horizontal scrollbar appears

- [ ] **Step 2: Fix any overflow or layout issues found**

Common fixes:
- Add `break-words` to long text
- Adjust `min-h-[90vh]` to `min-h-[70vh]` on mobile if hero is too tall
- Ensure `container-x` padding is sufficient

---

### Task 20: Commit Phase 2 Homepage Redesign

**Files:**
- None (commit only)

- [ ] **Step 1: Stage all changed and new files**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser"
git add app/page.tsx components/sections/ translations/en.json translations/it.json translations/ar.json translations/ur.json app/globals.css
```

- [ ] **Step 2: Commit with descriptive message**

```bash
git commit -m "feat: Phase 2 — redesign homepage with 9-section architectural narrative

Replace the existing homepage (hero slideshow, flip cards, simple grids) with
a premium 9-section layout: Hero, Material/Engineering, Services, Selected
Projects, Engineering Process, Company Story, Partners, Products, Contact CTA.

Each section is a self-contained component under components/sections/.
All new translation keys added for EN, IT, AR, UR.
Scroll-reveal animations, hover interactions, animated counter.
RTL-compatible layout using logical CSS properties."
```

---

### Task 21: Post-Commit Smoke Test

**Files:**
- None (verification only)

- [ ] **Step 1: Run production build to verify no build errors**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser" && npm run build
```

- [ ] **Step 2: Verify the production build succeeds without errors**

If the build fails, check:
- Missing imports in section components
- Type mismatches in data loaders
- Invalid CSS syntax in the appended globals.css block
- Missing translation keys that cause runtime fallbacks (these should not cause build failures)

- [ ] **Step 3: Test with `npm start` and navigate through all 4 languages**

```bash
cd "C:/Users/ArwenTech/OneDrive/Desktop/Work/Project Folders/TSKC/art_ser/art_ser" && npm start
```

Verify in each language (EN, IT, AR, UR) that:
- All 9 sections display
- All text renders (no raw translation keys visible)
- Scroll reveals fire on scroll
- Service cards expand on hover
- Project images scale on hover
- Counter animates on scroll
- CTA buttons link to correct pages
