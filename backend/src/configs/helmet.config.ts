import helmet from "helmet";


const isDevelepment = process.env.NODE_ENV === 'development';

export const helmetConfig = helmet({
    contentSecurityPolicy : isDevelepment 
    ? false 
    : {
        directives : {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"], // only allow scripts from my domain
            styleSrc: ["'self'", "'unsafe-inline'"], // styles from my domain + inline (needed for Tailwind, styled-components)
            imgSrc: ["'self'", "data:", "https:"], // Images: ,mu domain + data URIs + HTTPS (for user uploads)
            fontSrc: ["'self'", "data:"],// Fonts: my domain + data URIs
            connectSrc: ["'self'"], // API calls: Your domain only
            frameSrc: ["'none'"], // Iframes: Block all
            objectSrc: ["'none'"], //// Objects (Flash, etc.): Block all
            mediaSrc: ["'self'"],// Media: Your domain only
            workerSrc: ["'self'", "blob:"], // Worker scripts: Your domain only
        }
     }
    ,hsts: isDevelepment 
    ? false 
    : {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      }
    ,
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    noSniff: true,
    dnsPrefetchControl: {
        allow: false,
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
})