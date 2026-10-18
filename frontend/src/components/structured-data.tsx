export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type':    'SoftwareApplication',
    name:       'Mon Suivi Scolaire',
    url:        'https://monsuiviscolaire.vercel.app/',
    description: "Plateforme d'accompagnement scolaire connectant animateurs, élèves et associations.",
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    inLanguage: 'fr-FR',
    offers: {
      '@type': 'Offer',
      price:   '0',
      priceCurrency: 'EUR',
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: ['student', 'teacher', 'administrator'],
    },
    provider: {
      '@type': 'Organization',
      name:    'Mon Suivi Scolaire',
      url:     'https://monsuiviscolaire.vercel.app/',
    },
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}