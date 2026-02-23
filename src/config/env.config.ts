/// <reference types="vite/client" />

export const ENV = {
  API_URL: (import.meta.env.VITE_API_URL || 'http://localhost:5000/api') as string,
  APP_NAME: (import.meta.env.VITE_APP_NAME || 'Financial System') as string,
};
