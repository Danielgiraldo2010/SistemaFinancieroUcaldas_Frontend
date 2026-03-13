/**
 * Configuración de variables de entorno
 * Punto único de acceso a las variables de entorno de la aplicación
 */

export const env = {
  /**
   * URL base del backend API
   * Debe incluir el protocolo (http:// o https://)
   */
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL,

  /**
   * Entorno de ejecución
   */
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
} as const;
