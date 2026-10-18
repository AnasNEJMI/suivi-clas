import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/site.config'

interface SEOHeadProps {
  title?:            string
  description?:      string
  canonical?:        string
  noIndex?:          boolean
  ogImage?:          string
  type?:             'website' | 'article'
  includeOrgSchema?: boolean
}

const DEFAULT_OG   = `${SITE_URL}/og-image.png`
const DEFAULT_DESC = "Connectez animateurs, élèves et associations autour d'un suivi scolaire structuré et efficace."

const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type':    'SoftwareApplication',
  name:       SITE_NAME,
  url:        SITE_URL,
  description: `${SITE_TAGLINE} connectant animateurs, élèves et associations.`,
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  inLanguage: 'fr-FR',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  audience: {
    '@type': 'EducationalAudience',
    educationalRole: ['student', 'teacher', 'administrator'],
  },
  provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
}

export function SEOHead({
  title,
  description = DEFAULT_DESC,
  canonical = '/',
  noIndex = false,
  ogImage = DEFAULT_OG,
  type = 'website',
  includeOrgSchema = false,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`
  const url       = `${SITE_URL}${canonical}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <link rel='canonical'    href={url} />
      <meta name='robots' content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property='og:title'       content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:url'         content={url} />
      <meta property='og:image'       content={ogImage} />
      <meta property='og:type'        content={type} />

      <meta name='twitter:title'       content={fullTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image'       content={ogImage} />

      {includeOrgSchema && (
        <script type='application/ld+json'>{JSON.stringify(ORG_SCHEMA)}</script>
      )}
    </Helmet>
  )
}