export const ErrorCodes = {
    REDIRECT : 'REDIRECT',
    NETWORK_ERROR : 'NETWORK_ERROR',
    // 400 - Bad Request
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    INVALID_INPUT: 'INVALID_INPUT',
    INVALID_JSON_BODY_ERROR : 'INVALID_JSON_BODY_ERROR',
    
    // 401 - Unauthorized
    UNAUTHORIZED: 'UNAUTHORIZED',
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    TOKEN_EXPIRED: 'TOKEN_EXPIRED',
    
    // 403 - Forbidden
    FORBIDDEN: 'FORBIDDEN',
    INSUFFICIENT_PERMISSIONS: 'INSUFFICIENT_PERMISSIONS',
    
    // 404 - Not Found
    ROUTE_NOT_FOUND : 'ROUTE_NOT_FOUND',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
    
    // 409 - Conflict
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
    EMAIL_ALREADY_IN_USE: 'EMAIL_ALREADY_IN_USE',

    PARSE_ERROR : 'PARSE_ERROR',

    UNKNOWN_ERROR : 'UNKNOWN_ERROR',
    
    // 500 - Internal Server Error
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    DATABASE_ERROR: 'DATABASE_ERROR',
    
} as const;


export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes]

export const ErrorStatusMap: Record<ErrorCode, number> = {
  NETWORK_ERROR : 0,

  REDIRECT : 302,

  // 400
  VALIDATION_ERROR: 400,
  INVALID_INPUT: 400,
  INVALID_JSON_BODY_ERROR : 400,
  
  // 401
  UNAUTHORIZED: 401,
  INVALID_CREDENTIALS: 401,
  TOKEN_EXPIRED: 401,
  
  // 403
  FORBIDDEN: 403,
  INSUFFICIENT_PERMISSIONS: 403,
  
  // 404
  ROUTE_NOT_FOUND: 404,
  USER_NOT_FOUND: 404,
  RESOURCE_NOT_FOUND: 404,
  
  // 409
  USER_ALREADY_EXISTS: 409,
  EMAIL_ALREADY_IN_USE: 409,

  PARSE_ERROR : 410,

  UNKNOWN_ERROR : 450,
  
  // 500
  INTERNAL_SERVER_ERROR: 500,
  DATABASE_ERROR: 500,
};

export const ErrorMessagesMap: Record<ErrorCode, string> = {
  NETWORK_ERROR : 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.',

  REDIRECT : '',
  // 400
  VALIDATION_ERROR: "Les données saisies ne sont pas valides.",
  INVALID_INPUT: "Les données saisies ne sont pas valides.",
  INVALID_JSON_BODY_ERROR : "Le corps de la requête a un format non valie.",
  
  // 401
  UNAUTHORIZED: "Accès non autorisé.",
  INVALID_CREDENTIALS: "Les identifiants ne sont pas valides.",
  TOKEN_EXPIRED: "Le jeton a expiré.",
  
  // 403
  FORBIDDEN: "Accès interdit.",
  INSUFFICIENT_PERMISSIONS: "Permissions insuffisantes.",
  
  // 404
  ROUTE_NOT_FOUND: "Ce lien est introuvable.",
  USER_NOT_FOUND: "Cet utilisateur est introuvable.",
  RESOURCE_NOT_FOUND: "Cette ressource est introuvable.",
  
  // 409
  USER_ALREADY_EXISTS: 'Cet utilisateur existe déjà.',
  EMAIL_ALREADY_IN_USE: 'Un utilisateur avec cet email existe déjà.',

  PARSE_ERROR : 'Impossible de lire la réponse du serveur',

  UNKNOWN_ERROR : 'Une erreur inconnue est survenue.',
  
  // 500
  INTERNAL_SERVER_ERROR: 'Une erreur interne est survenue.',
  DATABASE_ERROR: 'Une erreur de la base des données est survenue.',
};