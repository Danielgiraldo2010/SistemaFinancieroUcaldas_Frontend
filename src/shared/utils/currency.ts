import { Decimal } from 'decimal.js';

/**
 * Utilidad centralizada para el manejo de dinero en el sistema de la U. de Caldas.
 * Basado en la arquitectura profesional definida.
 */
export const currency = {
  /**
   * Convierte un valor a formato de moneda COP: $ 1.250.000
   */
  format: (value: number | string | Decimal): string => {
    try {
      const val = new Decimal(value).toNumber();
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
      }).format(val);
    } catch (error) {
      console.error('Error formateando moneda:', error);
      return '$ 0';
    }
  },

  /**
   * Realiza sumas seguras evitando errores de precisión de JS
   */
  sumar: (a: number, b: number): number => {
    return new Decimal(a).plus(new Decimal(b)).toNumber();
  },
};
