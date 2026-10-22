const RAW_SITE_URL = 'https://monsuiviscolaire.vercel.app'   // ← the ONLY place the address is written

export const SITE_URL        = RAW_SITE_URL.replace(/\/+$/, '')   // never ends with "/"
export const SITE_NAME       = 'Mon Suivi Scolaire'
export const SITE_SHORT_NAME = 'Mon Suivi'                        // installed-app label: keep it under ~12 characters
export const SITE_TAGLINE    = "Plateforme d'accompagnement scolaire"

export const CONTACT_EMAIL = 'monsuiviscolaire.web@gmail.com'
export const DEVELOPER_NAME = 'Anas NEJMI'


// Pages search engines should index → sitemap.xml
// Paths must match your router: your sitemap said /login, your robots.txt said /connexion
export const PUBLIC_PAGES = [
  { path: '/',          changefreq: 'monthly', priority: 1.0 },
  { path: '/a-propos',  changefreq: 'yearly',  priority: 0.8 },
  { path: '/methode',   changefreq: 'yearly',  priority: 0.9 },
  { path: '/contact',   changefreq: 'yearly',  priority: 0.7 },
  { path: '/connexion', changefreq: 'yearly',  priority: 0.6 },
] as const

// Private areas → robots.txt "Disallow"
export const PRIVATE_PATHS = ['/etudiant', '/animateur', '/association', '/api/'] as const