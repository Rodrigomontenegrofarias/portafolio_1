/**
 * AppVersion.js - Módulo para gestionar la versión de la aplicación
 * 
 * Este módulo centraliza la lógica para obtener la versión de la aplicación
 * desde diferentes fuentes posibles.
 */

import latestTagContent from './latestTag.txt';

/**
 * Obtiene la versión de la aplicación consultando diferentes fuentes en orden:
 * 1. window.APP_VERSION (definido por env.js)
 * 2. process.env.REACT_APP_VERSION (variables de entorno de Create React App)
 * 3. Contenido del archivo latestTag.txt
 * 4. Valor predeterminado "Desarrollo"
 * 
 * @returns {string} Versión de la aplicación
 */
export function getAppVersion() {
  // Verificar window.APP_VERSION (inyectado por el script env.js)
  if (typeof window !== 'undefined' && window.APP_VERSION) {
    return window.APP_VERSION;
  }
  
  // Verificar variable de entorno de React
  if (process.env.REACT_APP_VERSION) {
    return process.env.REACT_APP_VERSION;
  }
  
  // Verificar importación de latestTag.txt
  if (latestTagContent && typeof latestTagContent === 'string' && latestTagContent.trim() !== '') {
    return latestTagContent.trim();
  }
  
  // Usar un valor predeterminado como último recurso
  return 'Desarrollo';
}

// Exportar una constante con la versión para facilitar su uso
export const APP_VERSION = getAppVersion();

// También exportamos como default para permitir: import appVersion from './AppVersion'
export default getAppVersion();