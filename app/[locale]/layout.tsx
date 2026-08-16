import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DoorIntro } from "@/components/DoorIntro";
import { LOCALES, type Locale, directionFor, translate } from "@/lib/i18n";
import { BASE_URL } from "@/lib/locale";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) return {};

  const t = (key: string) => translate(locale as Locale, key);

  return {
    title: {
      default: t("meta.title"),
      template: "%s | ARTSER",
    },
    description: t("meta.description"),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE_URL}/${l}`])
      ),
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      siteName: "ARTSER",
      locale: locale,
      type: "website",
      images: [{ url: "/logo/ARTSER_logo.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
    },
  };
}

function StructuredData({ locale }: { locale: Locale }) {
  const t = (key: string) => translate(locale, key);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "ART SER",
        legalName: "ART SER DI SHEHEZAD TARIQ",
        url: BASE_URL,
        logo: `${BASE_URL}/logo/ARTSER_logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+3903482402248",
          email: "art_ser@outlook.it",
          contactType: "customer service",
        },
        sameAs: [
          "https://www.instagram.com/ts_khaan",
          "https://www.facebook.com/share/1QTyovYnxS/",
        ],
      },
      {
        "@type": "LocalBusiness",
        name: "ART SER",
        description: t("meta.description"),
        url: BASE_URL,
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
          latitude: 45.4175,
          longitude: 11.0964,
        },
        image: `${BASE_URL}/logo/ARTSER_logo.png`,
        priceRange: "$$",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const dir = directionFor(validLocale);

  return (
    <>
      <StructuredData locale={validLocale} />
      <div lang={validLocale} dir={dir} data-theme="artser">
        <ThemeProvider>
          <LanguageProvider initialLocale={validLocale}>
            <div className="flex min-h-screen flex-col overflow-x-hidden">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
        <DoorIntro />
      </div>
    </>
  );
}
