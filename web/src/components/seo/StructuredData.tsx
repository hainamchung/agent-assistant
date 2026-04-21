import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://agent-assistant-ten.vercel.app'

interface SoftwareApplicationData {
  name: string
  description: string
  applicationCategory: string
  operatingSystem: string
  offers?: {
    price: string
    priceCurrency: string
  }
}

interface OrganizationData {
  name: string
  url: string
  logo: string
  description: string
  sameAs?: string[]
}

// Software Application Schema
export function SoftwareApplicationSchema({
  name = 'Agent Assistant',
  description = 'Multi-agent orchestration framework for AI coding assistants. 21 specialist agents, 310+ skills, and 50+ workflows.',
  applicationCategory = 'DeveloperApplication',
  operatingSystem = 'Any',
  offers = { price: '0', priceCurrency: 'USD' },
}: Partial<SoftwareApplicationData> = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory,
    operatingSystem,
    offers: {
      '@type': 'Offer',
      price: offers.price,
      priceCurrency: offers.priceCurrency,
    },
    url: SITE_URL,
    downloadUrl: 'https://www.npmjs.com/package/@namch/agent-assistant',
    softwareVersion: '1.0.0',
    author: {
      '@type': 'Organization',
      name: 'NamCH',
      url: 'https://github.com/hainamchung/agent-assistant.git',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// Organization Schema
export function OrganizationSchema({
  name = 'NamCH',
  url = 'https://github.com/hainamchung/agent-assistant.git',
  logo = `${SITE_URL}/assets/logo.png`,
  description = 'AI safety company building reliable, interpretable, and steerable AI systems.',
  sameAs = [
    'https://github.com/hainamchung/agent-assistant.git',
  ],
}: Partial<OrganizationData> = {}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    sameAs,
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// Website Schema
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Agent Assistant',
    url: SITE_URL,
    description: 'Multi-agent orchestration framework for AI coding assistants',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/docs?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// FAQ Schema
interface FAQItem {
  question: string
  answer: string
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

// Combined default structured data for the site
export function DefaultStructuredData() {
  return (
    <>
      <SoftwareApplicationSchema />
      <OrganizationSchema />
      <WebsiteSchema />
    </>
  )
}
